import SearchBox from './SearchBox'
import InfoBox from "./InfoBox"; // ✅ Ensure the correct relative path

import { useState } from 'react'
export default function WeatherApp(){

    


    const [weatherInfo, setweatherInfo] = useState({
        city : "Pune",
            feelslike: 24.82,
            temp: 25.05,
            tempMin: 25.05,
            tempMax: 25.05,
            humidity: 47,
            weather: "haze",

    });

    let updateInfo = (result) =>{
        setweatherInfo(result);
    }

    return (
        <div style={{textAlign:"center"}}>
            <h2>Welcome To Weather Forecasting App</h2>
            <SearchBox updateInfo ={updateInfo}/>
            <InfoBox info ={weatherInfo}/>
        </div>
    )
}