import React, { useState, useEffect } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ImSpinner9 } from "react-icons/im";
import { weather_url, weather_key } from "../api";
import clouds from "../img/clouds.jpg";
import rain from "../img/rain.jpg";
import thunderstorm from "../img/thunderstorm.jpg";
import snow from "../img/snow.jpg";
import mainbg from "../img/mainbg.jpg";
import { Grid } from "uikit-react";

import { formatDistance, subDays } from "date-fns";

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time =
        date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
    return time;
}

const City = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let { lon, lat, city } = useParams();
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);

    const fetchWeather = async () => {
        setIsLoading(true);
        let currentWeather = `${weather_url}/weather?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;
        let forecast = `${weather_url}/forecast?lat=${lat}&lon=${lon}&appid=${weather_key}&units=metric`;

        if (lon && lat) {
            let currentWeatherReq = fetch(currentWeather);
            let forecastReq = fetch(forecast);

            Promise.all([currentWeatherReq, forecastReq])
                .then(async (response) => {
                    const currentWeatherRes = await response[0].json();
                    const forecastRes = await response[1].json();

                    setWeather(currentWeatherRes);
                    setForecast(forecastRes);
                    let weatherType =
                        currentWeatherRes.weather[0].main.toLowerCase();
                    let bg = mainbg;
                    if (weatherType === "thunderstorm") {
                        bg = thunderstorm;
                    } else if (
                        weatherType === "rain" ||
                        weatherType === "drizzle"
                    ) {
                        bg = rain;
                    } else if (weatherType === "snow") {
                        bg = snow;
                    } else if (weatherType === "clouds") {
                        bg = clouds;
                    }

                    props.setBgImg(bg);
                    // props.setBgImg
                    setIsLoading(false);
                })
                .catch((e) => {
                    setError("Error fetching weather");
                    setIsLoading(false);
                });
        } else {
            navigate("/");
        }
    };

    useEffect(() => {
        //componentDidMount
        fetchWeather();
    }, []);

    return (
        <>
            {isLoading && (
                <>
                    <div className="uk-text-center">
                        <ImSpinner9 className="spin" color="white" size="30" />
                    </div>
                </>
            )}

            {!isLoading && weather && forecast && (
                <>
                    {/* <h1>{city}</h1> */}
                    <div className="temp">
                        <div>{Math.floor(weather.main.temp)}</div>
                    </div>
                    <h4>{city}</h4>
                    <div className="weather">{weather.weather[0].main}</div>

                    <hr />
                    <h6>Forecast</h6>
                    <Grid>
                        {forecast.list.slice(0, 7).map((item, i) => (
                            <>
                                <p>
                                    {item.dt_txt} - {item.weather[0].main}
                                </p>
                            </>
                        ))}
                    </Grid>
                </>
            )}
        </>
    );
};

export default City;
