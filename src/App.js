import React, {Component} from 'react';
import './App.css';

class SearchButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (<button className="SearchButton" type="button" onClick={this.props.onClick}>
      Search Again</button>)
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
      backgroundSize: "cover"
    }

    return (<div className="App" style={bgStyle}>
      <header className="App-header"></header>
      <div className="button-div">
        <SearchButton onClick={() => this.setBackground()}></SearchButton>
      </div>
      <p className="App-intro"></p>
    </div>);
  }

  setBackground() {
    var newState = this.state;
    newState.bgUrl = "https://farm5.staticflickr.com/4382/36695323441_29f4831549_k_d.jpg";
    this.setState(newState);
  }
}

export default App;
