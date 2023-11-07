import React from 'react'
import {MapContainer as LeafletMap, TileLayer } from 'react-leaflet';
import "./Map1.css";
import { showDataOnMap } from './utils';

function Map1({countries,casesType,center,zoom}) {
  return (
    <div className="map">
    <h3>WorldWide Map</h3>
      <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
        <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />


       {showDataOnMap(countries,casesType)}
      </LeafletMap>
    </div>
  )
}

export default Map1


