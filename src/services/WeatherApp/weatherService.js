
export const getWeatherForecast = async (cityName, unit = 'metric') => {
    const apiKey = '5caf59265a678ca70e57d4763ad8ddcc';
    const url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${cityName}&units=${unit}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            return data; // Return weather data
        } else {
            throw new Error(data.message || 'Error fetching weather data');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
};
