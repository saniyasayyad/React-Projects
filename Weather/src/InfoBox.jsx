import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import "./InfoBox.css";


export default function InfoBox({info}){

    if (!info) return null;

    const Hot_URL = "https://media.istockphoto.com/id/1137759901/photo/summer-hot-weather-season-high-temperature-thermometer-with-city-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=mTWF-uHN6hawvdK0rvqiWAYt5Y8E7u_i3N0XTlRRo_Q=";
    const COLD_URL = "https://plus.unsplash.com/premium_photo-1664301524345-90a694774519?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y29sZCUyMHdlYXRoZXJ8ZW58MHx8MHx8fDA%3D";
    const Rainy = "https://images.pexels.com/photos/2582772/pexels-photo-2582772.jpeg?auto=compress&cs=tinysrgb&w=600";



    return (
        <div className='card'>
       
        <div className='cardinfo'> 
         <Card sx={{ maxWidth: 345 }}>
         
      <CardMedia
        sx={{ height: 120 }}
        image= {
            info.humidity > 60 
            ? Rainy 
            : info.temp > 10 
            ?Hot_URL 
            : COLD_URL}
        title="img"
      />
     <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {info.city}
       
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         <p>Temprature = {info.temp}&deg;C</p>
         <p>Humidity = {info.humidity}&deg;C</p>
         <p>Min Temp = {info.tempMin}&deg;C</p>
         <p>Max Temp = {info.tempMax}&deg;C</p>
         <p>The Weather Describe like <i>{info.weather} </i>and Fell like {info.feelsLike}&deg;C</p>


        </Typography>
      </CardContent>
      
    </Card>
    </div>
        </div>
    )
}