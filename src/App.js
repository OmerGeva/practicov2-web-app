import React from 'react';
import { useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import SideNavbar from './components/side-navbar/side-navbar.component'
import SignInPage from './pages/sign-in/sign-in.component'
import DashboardPage from './pages/dashboard/dashboard.component'
import PracticesPage from './pages/practices/practices.component'

function App() {
  const currentUser = useSelector(state => state.user.currentUser);
  
  console.log(currentUser)
  return (
    <div className="App">
      {
        currentUser ? 
        // SIGNED IN
        <header className="App-header">
        <SideNavbar />

        <Switch>
          <Route exact path='/practices' render={(props) => currentUser ? <PracticesPage {...props} /> : <SignInPage  {...props} />} />
          <Route exact path='/' render={(props) => currentUser ? <DashboardPage {...props} /> : <SignInPage  {...props} />} />

        </Switch>
        </header>
        :
        // NOT SIGNED IN
      <header className="App-header">
        <SignInPage />
      </header>
      }
    </div>
  );
}

export default App;
