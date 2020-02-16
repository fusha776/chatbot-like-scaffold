import React, {Component} from "react";
import axios from "axios";

class Header extends Component {
  render() {
    return (
    <div className="header notification">
      <header>
        This is Header.
      </header>
    </div>
    );
  }
}

class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="columns is-multiline is-centered">
        <div className="column is-8">{this.props.msgs.answer}</div>
      </div>
    );
  }
}


class MsgWindow extends Component {
  inputMsg = "";

  constructor(props) {
    super(props);
    this.state = {
      msgLogs: [],
      answer: "初期値",
    }
    this.changeMsg = this.changeMsg.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }

  changeMsg(event) {
    this.inputMsg = event.target.value;
  }

  sendMsg(event) {
    event.preventDefault();
    axios.get(`/ajax/inquiry?name_input_text=${this.inputMsg}`)
      .then((res) => {
        console.log(res);
        this.setState({answer: res.data.message});
      });
  }

  render() {
    return (
    <div className="section">
      <div className="container">
        <Messages msgs={this.state} />
        <form name="name_form" onSubmit={this.sendMsg}>
          <input type="text" onChange={this.changeMsg} />
          <input className="button" type="submit" /> 
        </form>
      </div>
    </div>
    );
  }
}


class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <footer>
          This is Footer.
        </footer>
      </div>
    );
  }
}

export {Header, Footer, MsgWindow};
