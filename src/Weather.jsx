import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Styles.css'
const Weather = () => {


    const [weather, setWeather] = useState({})
    const [isFahrenheit, setIsFarenheit] = useState(false)

    useEffect(() => {

        function success(pos) {

            var crd = pos.coords;
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=16d04f54d6ca7c1c6bf30e910ee040df`)
                .then(res => setWeather(res.data))
        }
        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error);

    }, [])




    return (

        <div className='app'>
            <div className="content">
                <h2 className='location'><i className="fa-solid fa-location-dot "></i> {weather.name}, {weather.sys?.country}</h2>
                <div className="icon">
                    <h2>"{weather.weather?.[0].description}"</h2>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="" />
                </div>
                <div className="dates">
                    <p> <i className="fa-solid fa-wind"></i> <b>Speed winty:</b> {weather.wind?.speed} m/s</p>
                    <p> <i className="fa-solid fa-droplet"></i> <b>humidity: </b> {weather.main?.humidity} %</p>
                    <p> <i className="fa-solid fa-temperature-half"></i> <b>pressure: </b> {weather.main?.pressure}</p>
                    <p> <i className="fa-solid fa-cloud"></i> <b>clouds:</b> {weather.clouds?.all} % </p>
                    <p> <i className="fa-solid fa-temperature-arrow-up"></i> <b>temp max: </b>  {isFahrenheit ? weather.main?.temp_max : weather.main?.temp_max * 9 / 5 + 32} {isFahrenheit ? "°F" : "°C"}</p>
                    <p> <i className="fa-solid fa-temperature-arrow-down"></i> <b>temp min: </b> {isFahrenheit ? weather.main?.temp_min : weather.main?.temp_min * 9 / 5 + 32} {isFahrenheit ? "°F" : "°C"}</p>
                </div>

                <div className="temp">
                    <p id='title-text'> <b>Temp:</b> </p>
                    <p> {isFahrenheit ? "Fahrenheit" : "Celsius"}  </p>
                    <p> {isFahrenheit ? weather.main?.temp : weather.main?.temp * 9 / 5 + 32} {isFahrenheit ? "°F" : "°C"}</p>

                </div>

                <div className="buttom">
                    <button onClick={() => setIsFarenheit(!isFahrenheit)}>Degrees {isFahrenheit ? "°C" : "°F"}</button>
                </div>

            </div>

        </div>
    )
}

export default Weather