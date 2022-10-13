import React from 'react'

import { Footer, SignInForm, Navigation } from '../components'

const SignIn = () => {
  return (
    <div className="layout login-page">
      <Navigation />
      <main className="main-container" style={{ marginTop: 140}}>
        <SignInForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SignIn
