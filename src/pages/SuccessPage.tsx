import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


import { Success } from '../components'
import { cartReset } from '../redux/actions/cart'
import Fireworks from '../utils/Fireworks'

export default function SuccessPage() {
  const dispatch = useDispatch<any>()
  useEffect(() => {
    localStorage.clear()
    dispatch(cartReset())
    Fireworks()
  }, [dispatch])

  return (
    <Success/>
  )
}
