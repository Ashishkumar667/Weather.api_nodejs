const express = require('express');
const axios = require('axios');
const dotenv= require('dotenv');

dotenv.config();
const app =express();
const port=8000;
const API_KEY= process.env.API_KEY;
const BASE_URL='https://api.weatherapi.com/v1/current.json';

app.get('/', async(req,res)=>{
    const city = req.query.city;

    if(!city){
        return res.status(400).json({error:'city is required'});
    }

    try{
        const response =await axios.get (BASE_URL,{
            params:{
                key:API_KEY,
                q:city,
            }
        });
        const weatherData = response.data;

        return res.json({
            city :weatherData.location.name,
            temperature:weatherData.current.temp_c,
            description: weatherData.current.condition.text,
            windSpeed: weatherData.current.wind_kph,
            humidity:weatherData.current.humidity
        })
    }catch (error){
        if(error.response){
            return res.status(error.response.status).json({error:error.response.data.error.message});
        }
        return res.status(500).json({error:'server Error'});
    }
});

app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
    
});