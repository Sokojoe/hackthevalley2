import React, { Component } from 'react';
import './App.css';

class SearchButton extends Component {

  render(){
    return(
       <button type="button" onClick={this.handleClick()}> Search Again</button>
    )
  }

  handleClick(e){
    console.log("Button Clicked");
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {new SearchButton().render()}
        </header>
        <p className="App-intro">
        </p>
      </div>
    );
  }
}

export default App;
