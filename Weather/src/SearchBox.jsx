import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css";
import { useState } from 'react';

export default function SearchBox({updateInfo}) {

    let [city,setCity] = useState();
    let [err, seterror] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "617c5f545edbaee0fb59734540cfed65";

    let getWeatherInfo = async() => {
        try {
            let response =  await fetch (`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
       let jsonResponce = await response.json();
       console.log(jsonResponce);

       let result = {
        city: city,
        temp: jsonResponce.main.temp,
        tempMin: jsonResponce.main.temp_min,
        tempMax: jsonResponce.main.temp_max,
        humidity: jsonResponce.main.humidity,
        feelsLike: jsonResponce.main.feels_like,
        weather: jsonResponce.weather[0].description,
       }
       console.log(result);
       return result;
    } catch(err){
        throw err;
    }
        }
       
 

    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async(evt) => {
       try{
        evt.preventDefault();
        seterror(false)
        console.log(city);
        setCity("");
       let Newinfo =  await getWeatherInfo();
       updateInfo(Newinfo);
    } catch (err) {
        seterror(true);
    }setCity(""); // ✅ Reset input field
       } 


    return (
        <div className='search-box'>
        <form onSubmit={handleSubmit}>

            <TextField id="city" 
            label="Enter City" 
            variant="outlined" 
            onChange={handleChange}
            value={city} required />
            <br/><br/>
            <Button variant="contained" type='Submit'> Submit </Button>
            {err && <p style={{color:"red"}}>No such palce in our API</p>}

        </form>
           
        </div>
    )
}