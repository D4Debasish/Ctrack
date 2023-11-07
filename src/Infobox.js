import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'
import './Infobox.css';


function Infobox({title, cases, isRed,isGrey, active, total, ...props}) {
  return (
    <Card onClick = {props.onClick} className={`infobox ${active && "infobox--selected"} ${isRed && "infobox--red"}` }>
    
      <CardContent >
        {/*title*/}
         <Typography className='infobox__title' color='textSecondary'>
         {title}
         </Typography>

        {/*+2000 cases*/}
         <h2 className={`infobox__cases ${!isRed && "infobox__cases--green" } ${isGrey && "infobox__cases--grey"}`}>{cases}</h2>

        {/*1.2M total*/}

         <h2 className={`infobox__total ${!isRed && "infobox__cases--green" } ${isGrey && "infobox__cases--grey"} ${isRed && "infobox--red"} `} >
         {total} Total cases
         </h2>
      </CardContent>
    </Card>
  )
}

export default Infobox
