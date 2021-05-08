import React, { useState } from "react"
import Axios from "axios"
import ReactMapGL, { Marker } from 'react-map-gl'
import "bulma/css/bulma.css"
import firebase from "./Firebase";
import GoogleMapReact from 'google-map-react';


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
  const [maxUV, setMaxUV] = useState("");
  const [aqi, setAqi] = useState("");
  const [wind, setWind] = useState("");
  const [elevation, setElevation] = useState("");


  const getWeatherData = () => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=42e75c3564f665404846ea321f25c74b";
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
      headers: { 'x-access-token': '9675ed048f59cc0c1d9f2550d1806cfd' },
    }).then(response => {
      setUv("The UV index is : " + response['data']['result']['uv']);
      setMaxUV("The Max UV index is : " + response['data']['result']['uv_max']);
    })
  }

  const getaq = () => {



    const parseUrl = "https://api.weatherbit.io/v2.0/current/airquality?lat=" + lat + "&lon=" + lon + "&key=c818a38dedb04e94904fffc129144319";
    Axios.get(parseUrl).then(
      (response) => {
        setAqi("The AQI is: " + response['data']['data'][0]['aqi']);
      });

  }

  const getWind = () => {
    const parseUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + lat + "," + lon + "?key=7MS79MED8EDRBE7HG6UK3SE2E"
    Axios.get(parseUrl).then(
      (response) => {
        setWind("Wind Speed: " + response["data"]['currentConditions']['windspeed'] + " mph");
      });
  }

  const getElevation = () => {
    const parseUrl = 'https://api.stormglass.io/v2/elevation/point?lat=' + lat + '&lng=' + lon;
    Axios({
      url: parseUrl,
      method: 'GET',
      headers: { 'Authorization': '0cd270b8-af6a-11eb-9f40-0242ac130002-0cd2713a-af6a-11eb-9f40-0242ac130002' },
    }).then(response => {
      setElevation("Elevation relative to sea level is " + response['data']['data']['elevation'] + " meters");
    })
  }

  function refreshPage() {
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
      <div class='column is-9'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD3gbMrVK_RYSqeTJXCPURuAiWikzfBh1Q' }}
          defaultCenter={{ lat: lat, lng: lon }}
          defaultZoom={8}
        >

        </GoogleMapReact>
      </div>

      <div class="column">
        <div class="box">
          <button class='button is-link' onClick={getWeatherData}>Get Weather</button>
          <div>{name}</div>
          <div>{weather}</div>
          <div>{temperature}</div>
        </div>
        <div class="box">
          <button class='button is-link' onClick={getUv}>Get UV Index</button>
          <div>{uv}</div>
          <div>{maxUV}</div>
        </div>
        <div class="box">
          <button class='button is-link' onClick={getaq}>Get Air Quality</button>
          <div>{aqi}</div>
        </div>
        <div class="box">
          <button class='button is-link' onClick={getWind}>Get Wind Speed</button>
          <div>{wind}</div>
        </div>
        <div class="box">
          <button class='button is-link' onClick={getElevation}>Get Elevation</button>
          <div>{elevation}</div>
        </div>
        <div class="box">
          <button class="button is-link mr-2" onClick={refreshPage}>Reload</button>
          <button class="button is-link" onClick={() => firebase.auth().signOut()}>Log Out</button>
        </div>
      </div>

    </div>
  )
}

export default Map