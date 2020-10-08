import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Home from './screens/home'
import SignIn from './screens/signin'
import SignUp from './screens/signup'

function App() {
  return(
    <BrowserRouter>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/signin">
        <SignIn/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
    </BrowserRouter>
  )
}

export default App