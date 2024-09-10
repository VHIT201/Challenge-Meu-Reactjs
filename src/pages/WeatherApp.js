import React, { useState, useEffect } from "react";
import "./styles/WeatherApp.css";
import DateWeatherComponent from "../components/Weather/DateWeatherComponent";
import HighlightComponent from "../components/Weather/HighLightsComponent/HighlightComponent";
import { getWeatherForecast } from "../services/WeatherApp/weatherService";
import Slider from "../components/Slider/Slider";
import { render } from "@testing-library/react";

function WeatherApp() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [unitOfDegree, setUnitOfDegree] = useState('℃');
    const [cityName, setCityName] = useState('Ho Chi Minh');
    const [searchInput, setSearchInput] = useState(''); // To store user input
    const [searchedCities, setSearchedCities] = useState([]); // To store searched cities

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Call API for the current cityName
    useEffect(() => {
        const fetchWeather = async () => {
            setLoading(true);
            const data = await getWeatherForecast(cityName);
            if (data) {
                setWeatherData(data);
            } else {
                setError('Could not fetch weather data');
            }
            setLoading(false);
        };
        fetchWeather();
    }, [cityName]); // Fetch new data when cityName changes

    // Handle search input change
    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Handle search button click
    const handleSearch = () => {
        if (searchInput.trim()) {
            setCityName(searchInput); // Set the city name and trigger useEffect

            // Cập nhật danh sách các thành phố đã tìm kiếm
            if (!searchedCities.includes(searchInput)) {
                setSearchedCities(prevCities => [...prevCities, searchInput]);
            }

            setIsModalOpen(false); // Close the modal
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Format date
    const currentDate = new Date(weatherData.list[0].dt_txt);
    const options = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = currentDate.toLocaleDateString('en-US', options);

    const getDailyWeather = (index) => {
        const dayData = weatherData.list[index];
        const date = new Date(dayData.dt_txt).toLocaleDateString('en-US', options);
        const iconUrl = `http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;
        const maxTemp = Math.round(dayData.main.temp_max);
        const minTemp = Math.round(dayData.main.temp_min);

        return { date, iconUrl, maxTemp, minTemp };
    };

    const dailyWeather = [
        getDailyWeather(8),
        getDailyWeather(16),
        getDailyWeather(24),
        getDailyWeather(32),
        getDailyWeather(39),
    ];

    const windStatus = `${weatherData.list[0].wind.speed} m/s`;
    const humidity = `${weatherData.list[0].main.humidity}%`;
    const visibility = `${weatherData.list[0].visibility / 1000} km`;
    const airPressure = `${weatherData.list[0].main.pressure} hPa`;

    return (
        <div className="container">
            <div className="left-container">
                <div className="top-left-container">
                    <div className="search-container" onClick={toggleModal}>
                        <span>Search for places</span>
                    </div>
                    <span className="material-icons">my_location</span>
                </div>
                <div className="middle-left-container">
                    <div className="icon-container">
                        <img src={`http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@4x.png`} alt="Weather Icon" />
                    </div>
                </div>
                <div className="left-degree-container">
                    <span style={{ fontSize: 60 }}>{Math.round(weatherData.list[0].main.temp)}{unitOfDegree}</span>
                </div>
                <div className="bottom-left-container">
                    <div className="date-location-container">
                        <span>Today</span>
                        <span>•</span>
                        <span>{formattedDate}</span>
                    </div>
                    <div className="location-container">
                        <span className="material-icons" style={{ fontSize: 12 }}>location_on</span>
                        <span>{weatherData.city.name}</span>
                    </div>
                </div>
            </div>

            <div className="right-container">
            <div className="change-unitofdegree-container">
                <div onClick={()=>setUnitOfDegree('℃')} className="change-unitofdegree-button celsius">
                    <h3>℃</h3>
                </div>
                <div onClick={()=>setUnitOfDegree('℉')} className="change-unitofdegree-button fahrenheit">
                    <h3>℉</h3>
                </div>
            </div>

                <div className="date-weather-container">
                    {dailyWeather.map((day, index) => (
                        <DateWeatherComponent
                            key={index}
                            date={day.date}
                            icon={day.iconUrl}
                            maxTemp={day.maxTemp}
                            minTemp={day.minTemp}
                            unitOfDegree={unitOfDegree}
                        />
                    ))}
                </div>

                <div className="today-highlight-container">
                    <text style={{ fontSize: 20, color: 'white', fontWeight: '500' }}>Today's HighLights</text>
                    <div className="highlight-container">
                        <HighlightComponent title={'Wind status'} value={windStatus} />
                        <HighlightComponent title={'Humidity'} value={`${humidity}`} children={<Slider value={humidity} unit={unitOfDegree} />} />
                        <HighlightComponent title={'Visibility'} value={visibility} />
                        <HighlightComponent title={'Air Pressure'} value={airPressure} />
                    </div>
                </div>

                {/* Danh sách các thành phố đã tìm kiếm */}
                <div className="searched-cities">
                    <h4>Searched Cities:</h4>
                    <ul>
                        {searchedCities.map((city, index) => (
                            <li key={index}>{city}</li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Modal */}
            <div className={`modal ${isModalOpen ? "show" : ""}`}>
                <div className="modal-content">
                    <div className="modal-header">
                        <span></span>
                        <span className="material-icons close-icon" onClick={toggleModal}>close</span>
                    </div>
                    <div className="modal-search">
                        <div className="modal-search-container">
                            <div className="search-container-icon">
                                <span className="material-icons search-container-icon">search</span>
                            </div>
                            <div className="search-container">
                                <input
                                    type="text"
                                    color="white"
                                    placeholder="Search"
                                    className="search-input"
                                    value={searchInput}
                                    onChange={handleSearchInputChange}
                                />
                            </div>
                        </div>
                        <div className="search-button-container">
                            <span className="search-button" onClick={handleSearch}>
                                Search
                            </span>
                        </div>
                    </div>
                    <div className="search-list-container">
                        {
                            searchedCities.map((item, index) => (
                            <div className="city-button" key={index} onClick={() => setCityName(item)}>
                                <h3>{item}</h3>
                            </div>
                            ))
                        }  
                    </div>

                </div>
            </div>
        </div>
    );
}

export default WeatherApp;
