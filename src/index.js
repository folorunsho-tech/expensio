import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SpeechProvider } from "@speechly/react-client";
import { Provider } from "./context/context";
ReactDOM.render(
  <SpeechProvider appId="236858f9-cf5b-4ba0-a964-401262f6e3b2" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
