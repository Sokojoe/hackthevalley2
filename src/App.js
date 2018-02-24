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
      bgUrl: "https://c1.staticflickr.com/6/5611/15632179232_385c77cbca_h.jpg",
      location: "Canada",
      weather: "empty",
      source: "empty",
      time: "empty",
      population: 300000,
      subregion: "North America",
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
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-offset-0 col-md-12 info location">
            <header className="App-header">
              <h1>{this.state.location}</h1>
            </header>
          </div>
        </div>
        <div className="row">
          <div className="info col-md-offset-4 col-md-4">
            {this.state.population}
          </div>
        </div>
        <div className="row">
          <div className="info col-md-offset-4 col-md-2">
            {this.state.weather}
          </div>
          <div className="info col-md-2">
            {this.state.time}
          </div>
        </div>
        <div className="row">
          <div className="col-md-offset-4 col-md-4 button-div">
            <SearchButton onClick={() => this.clickButton()}></SearchButton>
          </div>
        </div>
      </div>
    </div>);
  }

  clickButton() {
    this.getRandomCountry().then((res) => {
      return this.queryImage(res)
    }).then((photos) => {
      console.log(photos)
      var photoinfo;
      if (photos){
        photoinfo = photos['photos']['photo'][0];
      }
      else{
         photoinfo = {'url_o':"c1.staticflickr.com/1/66/203162060_5e9db072ab_b.jpg"}
      }
      var url;
        if (photoinfo['url_o']) {
          console.log(photoinfo)
          console.log(url = photoinfo['url_o'])
        } else {
          url = "https://farm" + photoinfo['farm'] + ".staticflickr.com/" + photoinfo['server'] + "/" + photoinfo['id'] + "_" + photoinfo['secret'] + "_b.jpg"
        }

      this.queryImageLocation(photoinfo['id']).then((res)=>{
        console.log(res)
        var locationJSON = res["photo"]["location"];
        if (locationJSON["country"]){
          var country = locationJSON["country"]["_content"];
        }
        var place;
        if (locationJSON["region"]){
          place = locationJSON["region"]["_content"] + ", ";
        } else if (locationJSON["locality"]){
          place = ", " + locationJSON["locality"]["_content"] + ", ";
        } else if (locationJSON["county"]){
          place = ", " + locationJSON["county"]["_content"] + ", ";
        } else {
          place = ""
        }
        var title = place + country;
        console.log(title);
        this.setLocation(title);
      })
      this.setBackground(url);

    });
  }

  setBackground(url) {
    var newState = this.state;
    newState.bgUrl = url;
    this.setState(newState);
  }

  setLocation(title) {
    var newState = this.state;
    newState.location = title;
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
      this.countryPromise.then((countryList) => {
        newState.countryName = countryList[countryID]["name"]
        newState.population = countryList[countryID]['population'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        this.setState(newState);
        resolve(newState.countryName);
      })
    })
    return promise;
  }

  queryImage(country) {
    var xhr = new XMLHttpRequest();
    var query = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=f60a9176ead0ea9e3cf7d70b0a4353c7&text=" + country + "+landscape&sort=relevance&has_geo=1&extras=url_o&per_page=10&page=1&format=json&nojsoncallback=1";
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

  queryImageLocation(id) {
    var xhr = new XMLHttpRequest();
    var query = "https://api.flickr.com/services/rest/?method=flickr.photos.geo.getLocation&api_key=f60a9176ead0ea9e3cf7d70b0a4353c7&photo_id=" + id + "&format=json&nojsoncallback=1";
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
