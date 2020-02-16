import React, {Component} from "react";
import {Header, Footer, MsgWindow} from "./base";

class App extends Component {
  render() {
    return (
    <div>
      <Header />
      <MsgWindow />
      <Footer />
    </div>
    );
  }
}

export default App;
