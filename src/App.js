import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Menu from './Menu';
import React from "react";


function App() {
  return (
    <div className="">
      <nav className="navbar headerBackground">
        <a className="navbar-brand" href="#">
          Restaurant Menu
        </a>
      </nav>
      <div>
                <Menu  />
      </div>
    </div>
  );
}

export default App;
