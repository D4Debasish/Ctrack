
import './App.css';
import { Card,CardContent, FormControl, MenuItem, Select } from '@mui/material';
import { useState, useEffect } from 'react';
import Infobox from './Infobox';

import Table from './Table';
import { sortData } from './utils';
import Map1 from './Map1';
//import Linegraph from './Linegraph';
import "leaflet/dist/leaflet.css";



function App() {
    
  const [countries1, setCountries] = useState([]);  // for the arrays of countries 
  const [contry, setContry] = useState('Worldwide'); // to stick to the name of the contry
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796});
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases")
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response)=>response.json())
    .then(data => {
      setCountryInfo(data)
    })
    
  }, []);

  useEffect(() => {
    // the code here will run once when the component loads and not again
    const getCountryData =async()=>{
      await fetch("https://disease.sh/v3/covid-19/countries").then((response)=>response.json())
      .then((data)=>{
        const countries =data.map((countrypara)=>(
          {
            name:countrypara.country,
            value: countrypara.countryInfo.iso3 
          }
        ));

         const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
        
      })
    };
    getCountryData();
    
  }, []); 

  const onContryChange = async(Event) => {
    const contryCode = Event.target.value;
  
     
  const url = contryCode==="Worldwide" ? 'https://disease.sh/v3/covid-19/all':`https://disease.sh/v3/covid-19/countries/${contryCode}`
     await fetch(url).then((response)=>response.json())
     .then(data =>{
          setContry(contryCode);
          setCountryInfo(data);
          setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
          setMapZoom(5);
     });
  };
 
  
  return (

    
    <div className="app">
    <div className="app__left">   {/****************************************/}
    <div className="app_header"> 
    <h1>Covid 19 Tracker by - Debasish</h1>
    <FormControl className="app_dropdown">
    <Select
    variant='outlined'
    onChange={onContryChange}
    value={contry}>
    <MenuItem value="Worldwide">Worldwide</MenuItem>
    {countries1.map(country=>
      (
        <MenuItem value={country.value}>{country.name}</MenuItem>

  ))}

    </Select> 

    
    
    
    </FormControl>
    </div>
    <div className="app_stats">
     {/*Covid cases inbox*/}
     <Infobox isRed active={casesType==="cases"} onClick={e=>setCasesType('cases')} title="coronaVirus"  total={countryInfo.cases}/>
      {/*cobid recov inbox*/}
      <Infobox active={casesType==="recovered"} onClick={e=>setCasesType('recovered')} title="Recovered"  total={countryInfo.recovered}/>
       {/*covid deaths inbox */}
       <Infobox isGrey active={casesType==="deaths"} onClick={e=>setCasesType('deaths')} title="Deaths"  total={countryInfo.deaths}/>
      

    </div>
    
    {/* Map */}
     <Map1 casesType={casesType}
     center={mapCenter}
     zoom={mapZoom}
     countries={mapCountries}
     
     />
    
     </div>cd
     <Card className="app__right">
     <CardContent>
     <h3 >COUNTRIES WITH MOST CASES</h3>
       {/* Table )))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/}
       
       <Table countries={tableData}/>
       <h3>This order from most to least</h3>
       {/* Graph ))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))*/}
       
     </CardContent>
     
     </Card>
     
    </div>
    
  );
}

export default App;
