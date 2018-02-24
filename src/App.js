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
      bgUrl: "https://farm8.staticflickr.com/7368/15787518894_67d16cb3cd_k_d.jpg",
      countryName: "hackthevalley2"
    };
    this.countryPromise = this.setCountryList();
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
      <header className="App-header">
        <h1>{this.state.countryName}</h1>
        <div className="button-div">
          <SearchButton onClick={() => this.setBackground()}></SearchButton>
        </div>
      </header>
      <p className="App-intro"></p>
    </div>);
  }

  setBackground() {
    var newState = this.state;
    this.getRandomCountry().then((valid)=>this.queryImage(valid));
    newState.bgUrl = "https://farm5.staticflickr.com/4382/36695323441_29f4831549_k_d.jpg";
    this.setState(newState);
  }

  setCountryList() {
    var xhr = new XMLHttpRequest();
    var list;
    var countryList;
    var promise = new Promise(function(resolve, reject) {
      xhr.open("GET", "https://restcountries.eu/rest/v2/all");
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response))
        };
      }
      xhr.send();
    });
    return promise;
  }

  getRandomCountry() {
    var promise = new Promise((resolve, reject) => {
      var numCountries = 250;
      var countryID = Math.floor(Math.random() * numCountries);
      var newState = this.state;
      this.countryPromise.then((countryList)=>{
        newState.countryName = countryList[countryID]["name"]
        this.setState(newState);
        resolve(newState.countryName);
      })
    })

    return promise;
  }
  
  queryImage(country){
    var xhr = new XMLHttpRequest();
    var query = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f60a9176ead0ea9e3cf7d70b0a4353c7&text="
    + country
    + "+Landmark&sort=relevance&has_geo=1&extras=url_o&format=json&nojsoncallback=1";
    var promise = new Promise(function(resolve, reject) {
      console.log(query);
      xhr.open("GET", query);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          resolve(console.log(JSON.parse(xhr.response)))
        };
      }
      xhr.send();
    });
  }
}

export default App;
