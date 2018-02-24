import React, {Component} from 'react';
import './App.css';

class SearchButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button type="button" onClick={this.props.onClick}>
        Search Again</button>
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
        bgUrl: "https://farm8.staticflickr.com/7368/15787518894_67d16cb3cd_k_d.jpg"
    };
  }

  render() {
    var bgStyle = {
      backgroundImage: "url(" + this.state.bgUrl + ")",
      backgroundPosition: "center center",
      position: 'absolute',
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      backgroundSize: "cover",
    }

    return (
      <div className="App" style={bgStyle}>
        <header className="App-header">
          <SearchButton onClick={()=>this.setBackground()}></SearchButton>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }

  setBackground() {
    var newState = this.state;
    newState.bgUrl = "https://farm5.staticflickr.com/4382/36695323441_29f4831549_k_d.jpg";
    this.setState(newState);
    //document.body.style.backgroundImage = "url(\"https://farm3.staticflickr.com/2950/33451394876_5b94edcd1c_o.jpg\")";
  }
}

export default App;
