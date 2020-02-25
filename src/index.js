import React from "react";
import ReactDOM from "react-dom";
import { App as Main } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
