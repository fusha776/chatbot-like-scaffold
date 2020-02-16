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


/*
メッセージBOXの枠全体を制御
*/
class MsgWindow extends Component {
  inputMsg = "";
  preInquiryNo = "";

  constructor(props) {
    super(props);
    this.state = {
      msgLogs: [{msg: "初期値",
                 isAnswer: true}],
    }
    this.windowBox = React.createRef();
    this.changeMsg = this.changeMsg.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.scrollToLatest = this.scrollToLatest.bind(this);
  }

  changeMsg(event) {
    this.inputMsg = event.target.value;
  }

  sendMsg(event) {
    event.preventDefault();
    let nextLogs = this.state.msgLogs.slice();
    nextLogs.push({msg: this.inputMsg, isAnswer: false});
    axios.get(`/ajax/inquiry/?name_input_text=${this.inputMsg}&pre_inquiry_no=${this.preInquiryNo}`)
      .then((res) => {
        console.log(res);
        this.preInquiryNo = res.data.inquiry_no;
        nextLogs.push({msg: res.data.message, isAnswer: true});
        this.setState({msgLogs: nextLogs});
        this.scrollToLatest();
      });
  }

  scrollToLatest() {
    this.windowBox.current.scrollTop = this.windowBox.current.scrollHeight;
  }

  render() {
    return (
    <div className="section">
      <div className="container msg-window" ref={this.windowBox}>
        <Messages args={this.state} />
        <form name="name_form" onSubmit={this.sendMsg}>
          <input type="text" onChange={this.changeMsg} />
          <input className="button" type="submit" /> 
        </form>
      </div>
    </div>
    );
  }
}


/*
メッセージ内容のリストを制御
*/
class Messages extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let number = 1;
    let msgTags = this.props.args.msgLogs.map((msgLog) => (
      msgLog.isAnswer ?
        <div className="column is-8 answer-msg is-offset-1" key={number++}>{msgLog.msg}.</div>
      :
        <div className="column is-8 asking-msg is-offset-3" key={number++}>{msgLog.msg}.</div>
      )
    );
    console.log("--- listの中身 ---");
    console.log(msgTags);
    return (
      <div className="columns is-multiline">
        {msgTags}        
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
