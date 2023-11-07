import React from 'react'
import { useState, useEffect } from 'react'
import {Line} from 'react-chartjs-2'
import numeral from "numeral";

const options ={
    Legend :{
      display:false
    },
    elements:{
        point:{
            radius:0,
        },
    },
    maintainAspectRatio:false,
    tooltips:{
        mode:"index",
        intersect:false,
        callbacks:{
            label:function(tooltipItem,data){
                return numeral(tooltipItem.value).format("+0,0")
            },
        },
    },
    scales:{
        xAxes:[
            {
                type: "time",
                time:{
                    format:"MM/DD/YY",
                    tooltipFormat: "ll"

                },

        },],
        yAxes:[
            {
                gridLines:{
                    display:false,
                },
                ticks:{
                    callback:function (value, index,values){
                        return numeral((value).format("0a"))
                    },
                },
            },
        ],
    }

}
const buildChartData =(data,casesType='cases')=>{
    const chartdata =[];
    let lastDataPoint;
    for(let date in data.cases) {
        if(lastDataPoint){
            const newDataPoint ={
                x: date,
                y: data[casesType][date]-lastDataPoint
            }
            chartdata.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    }
    return chartdata;
}

function Linegraph({casesType="cases"}) {

    const [data, setData] = useState({});
    

    useEffect(() => {
        const fetchData =async()=>{
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=20").then((response)=>response.json())
        .then(data=>{
            let chardata = buildChartData(data,"cases");
            setData(chardata);
        });
    };
        fetchData();
    }, []);

    

  return (
    <div>
    {data.length?.length >0 && (
        <Line
    options ={options} 
    data={{
        datasets: [
            {
                backgroundColor:"red",
                borderColor:"#CC1034",
                data : data
            },
        ],
    }}
    
    
    />
    )}
    
    
      
    </div>
 ) 
}
  

export default Linegraph
