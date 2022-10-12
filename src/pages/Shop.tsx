import React from 'react'

import {
  FilteredProducts,
  Footer,
  Navigation,
} from '../components'


export default function Shop() {
  return (
    <div className="layout">
      <header>
        <Navigation />
      </header>
      <main className="main-container">
        <>
          <div className="shop-banner"></div>
          <FilteredProducts />
        </>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
