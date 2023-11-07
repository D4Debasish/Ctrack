import React from "react";
import numeral from 'numeral';
import { Circle, Popup } from "react-leaflet";

const casesTypeColor = {

  cases:{
    hex: "#CC1034",
    
    
    multiplier:100,
  },
  recovered:{
    hex: "#e8f5e9",
    
    
    multiplier:200,
  },
  deaths:{
    hex: "#fb4443",
    
    
    multiplier:300,
  },
}


export const sortData = (data) =>{
    const sortedData = [...data];
  
  return  sortedData.sort((a,b) =>((a.cases > b.cases ? -1:1)))


}

export const showDataOnMap=(data, casesType='cases') => (
  data.map(country=>(

    <Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    fillOpacity={0.4}
    color={casesTypeColor[casesType].hex}
    fillColor={casesTypeColor[casesType].hex}
    radius={
      Math.sqrt(country[casesType])*casesTypeColor[casesType].multiplier
    }
    >
    <Popup>
    <div className="infoContainer">
      <div className="infoflag" style={{backgroundImage:`url(${country.countryInfo.flag})`}}/>
      <div className="infoCountry" >{country.country}</div>
      <div className="infoCases">Cases:{numeral(country.cases).format("0,0")}</div>
      <div className="infoRec">Recovered:{numeral(country.recovered).format("0,0")}</div>
      <div className="infoDeath">Deaths:{numeral(country.deaths).format("0,0")}</div>
    </div>
    </Popup>
     
    
    
    </Circle>
  ))
);
        