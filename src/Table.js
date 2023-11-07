import React from 'react'
import './Table.css';


function Table({countries}) {
  
  return (
    <div className="scrollableC">
    <table className='table'>
    <tbody>
      {countries.map(({country,cases,continent})=>(
        <tr>
            <td>{country}</td>
            <td><strong>{cases}</strong></td>
            <td>{continent}</td>
            
        </tr>
        ))}
        </tbody>
    </table>
    </div>
    
  )
}

export default Table
