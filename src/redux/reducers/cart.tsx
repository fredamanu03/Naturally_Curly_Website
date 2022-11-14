import { ActionTypes, Cart, CartItem } from "../../types";
import * as actions from "../actions/types";
import { toast } from "react-hot-toast";

const initialState: Cart = {
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  showCart: false,
};

export const cart = (state = initialState, action: ActionTypes) => {
  switch (action.type) {
    case actions.ADD_TO_CART:
      //check if items is already in the cart
      const isInCart = state.cartItems.some((item) => {
        return item._id === action.payload._id;
      });

      // if its is already in the cart then this will be the updated cart items
      //For this iterate throught the cartItems and update the item's qty
      const updatedCartItems = state.cartItems.map((cartItem) => {
        if (cartItem._id === action.payload._id)
          return {
            ...cartItem,
            qty: cartItem.qty + action.payload.qty,
          };
        return {
          ...cartItem,
        };
      });

      //Now return state depending on if isInCart is true or false
      if (isInCart) {
        toast.success(
          `${action.payload.qty} ${action.payload.name} added to cart`,
          {
            icon: "👏",
            position: "bottom-left",
          }
        );
        return {
          ...state,
          totalPrice:
            state.totalPrice + action.payload.price * action.payload.qty,
          totalQuantities: state.totalQuantities + action.payload.qty,
          cartItems: updatedCartItems,
        };
      }
      toast.success(
        `${action.payload.qty} ${action.payload.name} added to cart`,
        {
          icon: "👏",
          position: "bottom-left",
        }
      );
      return {
        ...state,
        totalPrice:
          state.totalPrice + action.payload.price * action.payload.qty,
        totalQuantities: state.totalQuantities + action.payload.qty,
        cartItems: [action.payload, ...state.cartItems],
      };

    //Setting the state of show cart
    case actions.OPEN_CART:
      return {
        ...state,
        showCart: true,
      };

    case actions.CLOSE_CART:
      return {
        ...state,
        showCart: false,
      };

    //Setting the state of cart item quantity increase
    case actions.INCREASE_CART_ITEM_QUANTITY:
      //First find the item whose quanity you want to increase in the cartItems array
      const foundProduct = state.cartItems.find(
        (item) => item._id === action.payload
      ) as CartItem;

      // Now find the index of that item
      const indexOfFoundProduct = state.cartItems.indexOf(foundProduct);

      // Now update the quantity of the found item assigning it to a new variable
      let newProduct = { ...foundProduct, qty: foundProduct.qty + 1 };

      //replace the found item inside the cartItems array with the updated version
      state.cartItems.splice(indexOfFoundProduct, 1, newProduct);

      return {
        ...state,
        cartItems: [...state.cartItems],
        totalPrice: state.totalPrice + foundProduct.price,
        totalQuantities: state.totalQuantities + 1,
      };

    //Setting the state for reducing cart item quanity
    case actions.DECREASE_CART_ITEM_QUANTITY:
      //First find the item to be decrease with the cartItem array
      const foundProductToDecrease = state.cartItems.find(
        (item) => item._id === action.payload
      ) as CartItem;

      //Now find the index of the found item
      const indexOfFoundProductToDecrease = state.cartItems.indexOf(
        foundProductToDecrease
      );

      //Now update the found item and assign it to a new variable
      let newProductToDecrease = {
        ...foundProductToDecrease,
        qty: foundProductToDecrease.qty - 1,
      };

      //Now replace the found product with the updated one
      state.cartItems.splice(
        indexOfFoundProductToDecrease,
        1,
        newProductToDecrease
      );

      //Then check if the quanity of foundProduct is less than or greater than 1
      //If greater than one just return state with cartItems as a copy of the cartItems
      if (foundProductToDecrease.qty > 1) {
        return {
          ...state,
          cartItems: [
            // { ...foundProductToDecrease, qty: foundProductToDecrease.qty - 1 },
            // ...newCart2,
            ...state.cartItems,
          ],

          totalPrice: state.totalPrice - foundProductToDecrease.price,
          totalQuantities: state.totalQuantities - 1,
        };
      }
      //If qty is less than 1, confirm from user is they want to remove the item from the cart with window.confirm
      if (
        window.confirm(
          "Are you sure you want to remove this item from your cart?"
        )
      ) {
        toast.success(
          `${newProductToDecrease.qty} ${newProductToDecrease.name} removed from cart`,
          {
            icon: "😔",
            position: "bottom-left",
          }
        );
        //If positive response from the item from the array and adjust total price and total quanities
        state.cartItems.splice(indexOfFoundProductToDecrease, 1);
        return {
          ...state,
          cartItems: [...state.cartItems],
          totalPrice:
            state.totalPrice -
            foundProductToDecrease.price * foundProductToDecrease.qty,
          totalQuantities: state.totalQuantities - foundProductToDecrease.qty,
        };
      }
      //if negative response, reset the quanity of the found item to 1 and return a new state
      else {
        newProductToDecrease = {
          ...foundProductToDecrease,
          qty: 1,
        };
        state.cartItems.splice(
          indexOfFoundProductToDecrease,
          1,
          newProductToDecrease
        );
        toast.success(
          `${newProductToDecrease.qty} ${newProductToDecrease.name} was not removed from cart`,
          {
            icon: "🤝",
            position: "bottom-left",
          }
        );
        return {
          ...state,
          carItems: [...state.cartItems],
        };
      }

    case actions.REMOVE_FROM_CART:
      const foundProductToRemove = state.cartItems.find(
        (item) => item._id === action.payload
      ) as CartItem;

      const newCartItems3 = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      toast.success(
        `${foundProductToRemove.qty} ${foundProductToRemove.name} removed from cart`,
        {
          icon: "😔",
          position: "bottom-left",
        }
      );
      return {
        ...state,
        cartItems: [...newCartItems3],
        totalPrice:
          state.totalPrice -
          foundProductToRemove.price * foundProductToRemove.qty,
        totalQuantities: state.totalQuantities - foundProductToRemove.qty,
      };

    case actions.CART_RESET:
      return {
        ...state,
        cartItems: [],
        totalPrice: 0,
        totalQuantities: 0,
        showCart: false,
      };

    default:
      return state;
  }
};
