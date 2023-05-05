import express, { Request, Response } from 'express'; 
import validateSchema from '../middleware/validateSchema';
import { getWeather } from '../service/weather.service';
import { getWeatherSchema } from '../schema/weather.schema';
const weatherHandler = express.Router();
const axios = require('axios')

weatherHandler.get("/", validateSchema(getWeatherSchema), async (req: Request, res: Response) => {
    console.log("Getting weather");
    const params = `?latitude=52.52&longitude=13.41&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`
    const weatherApiurl = `https://api.open-meteo.com/v1/forecast`
    const response = await getWeather()
    return res.status(200).send(response)
    
    
    // try{
    //     const weather = await getWeather();
    //     console.log("in weatherHandler");
    //     console.log(weather)
    //     return res.status(200).send(weather.statusText);
    // }catch (err) {
    //     return res.status(500).send(err);
    // } 
});

export default weatherHandler;