import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Html from './pages/Html';
import Css from './pages/Css';
import Js from './pages/Js';
import registerPage from './pages/registerPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/html" component={Html}/>
        <Route path="/css" component={Css}/>
        <Route path="/javascript" component={Js}/>
        <Route path="/register" component={registerPage}/>
        <Route path="/login" component={LoginPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
