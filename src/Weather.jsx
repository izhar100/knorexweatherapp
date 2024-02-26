import React, { useEffect, useState } from 'react'

const Weather = () => {
    const [city, setCity] = useState('Ho Chi Minh');
    const [weatherData, setWeatherData] = useState(null);
    useEffect(() => {
        fetchData(city)
    }, [city])
    async function fetchData(city) {
        try {
            const res = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=2b600587bb67eb7c50acd42223fb035d&units=metric`)
            const data = await res.json()
            console.log(data)
            setWeatherData(data)

        } catch (error) {
            console.log(error)
        }
    }
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1

        const formattedDate = `${day}/${month}`
        return formattedDate;
    };

    return (
        <div style={{fontFamily:"sans-serif",width:"60%",margin:'auto'}}>
            <div style={{display:"flex",alignItems:"center", justifyContent:"space-between",gap:"20px"}}>
            <div style={{width:"16px", height:"16px",borderRadius:"50%",backgroundColor:"#00ff00"}}>

            </div>
            <p style={{fontWeight:"bold"}}>From :</p>
            <select style={{fontWeight:"bold",width:"80%", borderRadius:"5px", padding:"2px"}} value={city} onChange={(e) => {
                setCity(e.target.value)
            }}>
                <option value="Ho Chi Minh">Ho Chi Minh</option>
                <option value="Singapore">Singapore</option>
                <option value="Kuala Lumpur">Kuala Lumpur</option>
                <option value="Tokyo">Tokyo</option>
                <option value="Athens">Athens</option>
            </select>
            </div>
            {weatherData && (
                <div style={{display:"flex", gap:"40px", border:"2px solid #2bff00", padding:"20px", borderRadius:"10px"}}>
                    <div>
                    <h4 style={{fontStyle:"italic"}}>Current Weather :</h4>
                    <div style={{display:"flex",alignItems:"center", gap:"40px"}}>
                    <p>{weatherData.list[0].main.temp}°C</p>
                    <img src={`http://openweathermap.org/img/w/${weatherData.list[0].weather[0].icon}.png`} alt="current weather icon" />
                    </div>
                    </div>

                    <div>
                    <h4>Next 3 Days :</h4>
                    <div style={{display:"flex", gap:"20px"}}>
                        {[8, 16, 24].map((index) => {
                            const item = weatherData.list[index];
                            const date = formatDate(item.dt);
                            return (
                                <div key={date} style={{display:"flex"}}>
                                    <div>
                                    <p>{date}</p>
                                    <p>{item.main.temp}°C</p>
                                    </div>
                                    <div>
                                    <img style={{width:"100%",height:"50px",marginTop:"35px"}} src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="weather icon" />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Weather
