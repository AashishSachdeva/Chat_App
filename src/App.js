
import { BrowserRouter as Router, Route,  Switch } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat/Chat';
import Sidebar from './components/Sidebar/Sidebar';
import {  useState } from 'react'
import Login from './components/Login/Login';
import { useStateValue } from './StateProvider';

function App() {
 const [{user}, dispatch] = useStateValue();
  return (
    
    
    
    <div className="app">
     {!user ? (
      //  <h1>LOGIN</h1>
      <Login/>
     ):(
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>

            <Route path="/rooms/:roomId" >
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>)}
    </div>
  );
}

export default App;
