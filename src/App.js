import React from 'react'
import Map from './Map'
import PrivateRoute from './PrivateRoute'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AuthProvider } from './Auth'
import Login from './Login'
import Signup from './Signup'



function App() {


  return (
    <AuthProvider>
      <Router>
        <div>
          <PrivateRoute exact path="/weather-rock" component={Map} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </div>
      </Router>
    </AuthProvider>
  )


}

export default App;