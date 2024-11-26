import './App.css';
import {  useState } from 'react';
import Form from './Form';
import './App.css';
import Result from './Result';

const APIKey = 'efa2ef11f117f7485b2fca8e87a3a2f5'

const App = () => {
  const [city, setCity] = useState('')

  const [state, setState] = useState({
    value: '',
    date: '',
    city: city ?? '',
    sunrise: '',
    sunset: '',
    temp: '',
    pressure: '',
    wind: '',
    err: false,
  })


  const handleInputChange = (e) => {
    setCity(e.target.value)
  }

  const handleCitySubmit = e => {
    e.preventDefault()
    console.log("Potwierdzony formularz");
    const API = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APIKey}&units=metric`


    fetch(API)
      .then(response => {
        if (response.ok) {
          return response
        }
        throw Error("Nie udało się")
      })
      .then(response => response.json())
      .then(data => {
        const time = new Date().toLocaleString()
        setState(prev=> ({
          error: false,
          date: time,
          city: city,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind,
        }))
      })
      .catch(err => {
        console.log(err);
        setState(prev=>({
          err: true,
          ...prev
        }))
      })

  }

    return (
    <div className='App'>
      <Form 
        value={city} 
        change={handleInputChange}
        submit={handleCitySubmit}  
      />
      <Result weather ={state} />
    </div>
    );
  
}

export default App;
