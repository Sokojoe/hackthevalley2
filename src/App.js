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
  this.state = {imageUrl: null};
  this.state.imageUrl = "https://farm3.staticflickr.com/2950/33451394876_5b94edcd1c_o.jpg";
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchButton onClick={()=>this.setBackground()}></SearchButton>
        </header>
        <p className="App-intro"></p>
      </div>
    );
  }

  setBackground() {
    document.body.style.backgroundImage = "url("+this.state.imageUrl+")";
  }
}

export default App;
