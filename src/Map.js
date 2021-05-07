import React, { useState } from "react"
import Axios from "axios"
import ReactMapGL, { Marker } from 'react-map-gl'
import "bulma/css/bulma.css"
import firebase from "./Firebase";


let lat = getRandomIntInclusive(24, 49);
let lon = getRandomIntInclusive(-124, -66);

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function Map() {
  //weather apis
  const [temperature, setTemperature] = useState("");
  const [weather, setWeather] = useState("");
  const [name, setName] = useState("");
  const [uv, setUv] = useState("");
  const [maxUV,setMaxUV] = useState("");
  const [aqi, setAqi] = useState("");
  const [category, setCategory] = useState("");
  const [wind,setWind] = useState("");
  const [elevation,setElevation] = useState("");


  const getWeatherData = () => {
    const url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=42e75c3564f665404846ea321f25c74b";
    Axios.get(url).then(
      (response) => {
        setName("The weather in " + response.data.name + ":")
        setTemperature(((response.data.main.temp - 273) * (9 / 5) + 32).toFixed() + "°F");
        setWeather(response.data['weather'][0]['main']);
      });

  };

  const getUv = () => {
    const parseUrl = 'https://api.openuv.io/api/v1/uv?lat=' + lat + '&lng=' + lon;
    Axios({
      url: parseUrl,
      method: 'GET',
      headers: {'x-access-token': '9675ed048f59cc0c1d9f2550d1806cfd'},
    }).then(response => {
      setUv("The UV index is : " + response['data']['result']['uv']);
      setMaxUV("The Max UV index is : " + response['data']['result']['uv_max']);
   }) 
  }

  const getaq = () => {
    const parseUrl = "https://api.aerisapi.com/airquality/[" + lat + "," + lon + "]?format=json&client_id=AcxJ7pqDEeRA8kcDUOTPS&client_secret=7tOA7yRcLFb40YCCoXq0ccUMtD4ZZJarCgNjOrtL";
    Axios.get(parseUrl).then(
      (response) => {
        setAqi("The AQI is: " + response['data']['response'][0]['periods'][0]['aqi']);
        setCategory("The Air Category is: " + response['data']['response'][0]['periods'][0]['category']);
      });

  }

  const getWind = () => {
    const parseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + lat +","+lon+"?key=7MS79MED8EDRBE7HG6UK3SE2E"
    Axios.get(parseUrl).then(
      (response) => {
        console.log(response)
        setWind("Wind Speed: " + response["data"]['currentConditions']['windspeed']+ " mph");
      });
  }

  const getElevation = () => {
    const parseUrl = 'https://api.stormglass.io/v2/elevation/point?lat='+lat+'&lng='+lon;
    Axios({
      url: parseUrl,
      method: 'GET',
      headers: {'Authorization': '0cd270b8-af6a-11eb-9f40-0242ac130002-0cd2713a-af6a-11eb-9f40-0242ac130002'},
    }).then(response => {
      setElevation("Elevation relative to sea level is " + response['data']['data']['elevation'] + " meters");
   }) 
  }

  function refreshPage(){ 
    window.location.reload(); 
}

  const [viewport, setViewport] = useState({
    latitude: lat,
    longitude: lon,
    width: '75vw',
    height: '100vh',
    zoom: 10
  });


  return (
    <div class='columns'>
      <ReactMapGL
        {...viewport}
        //map api
        mapboxApiAccessToken={"pk.eyJ1IjoiZWRkeXhpYW8iLCJhIjoiY2tvNjJyOWk4MTJvbjJucGRkaDg2cHBnZyJ9.A5nBAVaLyyjd00Kyu9QvxQ"}
        mapStyle="mapbox://styles/eddyxiao/cko63lit92mj917rtnmkmxdp6"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}

        style={{ float: 'left' }}

      >

        <Marker
          latitude={lat}
          longitude={lon}
          offsetTop={(-viewport.zoom * 2)}
        >
          <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png"
            width={viewport.zoom * 4}
            height={viewport.zoom * 4} />
        </Marker>

      </ReactMapGL>

      <div class="column" style={{ float: 'right' }}>
        <div class="box">
          <button class='button is-link' onClick={getWeatherData}>Get Weather</button>
          <div>{name}</div>
          <div>{weather}</div>
          <div>{temperature}</div>
        </div>
        <div class="box">
          <button class = 'button is-link' onClick={getUv}>Get UV Index</button>
          <div>{uv}</div>
          <div>{maxUV}</div>
        </div>
        <div class="box">
          <button class = 'button is-link' onClick={getaq}>Get Air Quality</button>
          <div>{aqi}</div>
          <div>{category}</div>
        </div>
        <div class="box">
          <button class = 'button is-link' onClick={getWind}>Get Wind Speed</button>
          <div>{wind}</div>
        </div>
        <div class="box">
          <button class = 'button is-link' onClick={getElevation}>Get Elevation</button>
          <div>{elevation}</div>
        </div>
        <div class = "box">
          <button class = "button is-link mr-2" onClick={refreshPage}>Reload</button>
          <button class = "button is-link" onClick={()=>firebase.auth().signOut()}>Log Out</button>
        </div>
      </div>

    </div>
  )
}

export default Map