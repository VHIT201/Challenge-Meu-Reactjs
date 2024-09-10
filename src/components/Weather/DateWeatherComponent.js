import React from 'react';
import './DataWeatherComponentStyles.css'
const DateWeatherComponent = ({ date, weather,icon ,maxTemp, minTemp, unitOfDegree }) => {
  return (
    <div className='component-date-container'>
      <h3 className='component-date-text'>{date}</h3>
      <div className='componnet-date-image'>
        <img src={icon} alt="Weather Icon" />
      </div>
      <div className='component-date-degree'>
        <h3 className='component-date-text'>{maxTemp}{unitOfDegree}</h3>
        <h3 className='component-date-text'>{minTemp}{unitOfDegree}</h3>
      </div>
    </div>
  );
};

export default DateWeatherComponent;
