import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Html from './pages/Html';
import Css from './pages/Css';
import Js from './pages/Js';
import registerPage from './pages/registerPage';
import LoginPage from './pages/LoginPage';
import NavbarContainer from './container/NavbarContainer';
import PostWritePage from './pages/PostWritePage';
import PostDetailPage from './pages/PostDetailPage';

function App() {
  return (
    <>
      <NavbarContainer />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/html" component={Html} />
        <Route path="/css" component={Css} />
        <Route path="/javascript" component={Js} />
        <Route path="/register" component={registerPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/write" component={PostWritePage} />
        <Route path="/post/:id" component={PostDetailPage} />
      </Switch>
    </>
  );
}

export default App;
