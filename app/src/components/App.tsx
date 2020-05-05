import * as React from "react";
import { hot } from "react-hot-loader";
import "./../assets/scss/App.scss";
const reactLogo = require("../assets/img/react_logo.svg");

class App extends React.Component<{}, undefined> {
  public render(): React.ReactElement {
    return (
      <div className="app">
        <h1>Hello World!</h1>
        <p>Foo to the barz</p>
        <img src={reactLogo.default} height="480" />
      </div>
    );
  }
}

declare let module: object;

export default hot(module)(App);
