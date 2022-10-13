import React from 'react'
import { Footer, Navigation, SignUpForm } from '../components'

const SignUp = () => {
  return (
    <div className="layout login-page">
      <Navigation />
      <main className="main-container" style={{ marginTop: 140}}>
        <SignUpForm />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default SignUp
