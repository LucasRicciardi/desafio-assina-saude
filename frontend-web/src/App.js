
import { Redirect, Route, Switch } from 'react-router'

import AppointmentsView from './views/AppointmentsView'
import SchedulingConfirmationView from './views/SchedulingConfirmationView'
import SchedulingView from './views/SchedulingView'

import './App.css'
import { BrowserRouter } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/appointments">
            <AppointmentsView />
          </Route>
          <Route path="/scheduling">
            <SchedulingView />
          </Route>
          <Route path="/scheduling-confirmation">
            <SchedulingConfirmationView />
          </Route>
          <Redirect to="/appointments" />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
