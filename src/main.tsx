import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.css";
import { App } from "./App";
import { AuthProvider } from "./contexts/auth";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
const options: AlertTemplate = {
  // you can also just use 'bottom center'
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.FADE,
  
}

ReactDOM.render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} {...options}>
    <AuthProvider>
      <App />
    </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
