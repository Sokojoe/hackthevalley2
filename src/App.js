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
      countryName: "France"
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
          <SearchButton onClick={() => this.clickButton()}></SearchButton>
        </div>
      </header>
      <p className="App-intro"></p>
    </div>);
  }

  clickButton() {
    this.getRandomCountry().then((res) =>{
        return this.queryImage(res)
      }).then((photos)=>{
        console.log(photos);
        var url = photos['photos']['photo'][0]['url_o']
        this.setBackground(url)
      });
  }

  setBackground(url){
    var newState = this.state;
    newState.bgUrl = url;
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
    + "+Landmark&sort=relevance&has_geo=1&extras=url_o&per_page=10&page=1&format=json&nojsoncallback=1";
    var promise = new Promise(function(resolve, reject) {
      console.log(query);
      xhr.open("GET", query);
      xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
          var json = JSON.parse(xhr.response)
          resolve(json)
        };
      }
      xhr.send();
    });
    return promise;
  }
}

export default App;
