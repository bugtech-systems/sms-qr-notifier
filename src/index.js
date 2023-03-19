import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//Redux
import { Provider } from 'react-redux';
import configureStore, { history } from './redux/store';


const store = configureStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter
         history={history}
    >
      <App />
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
