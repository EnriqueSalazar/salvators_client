/**
 * Created by enriq on 6/02/17.
 */
import React, { Component, PropTypes } from 'react';
import geocoding from 'geocoding';
const Geo = props => {
  geocoding({address: 'carrera 54 # 64a - 75, Bogota'}).then(function(results){
    console.log(results);
debugger  })
  return (
   <div>
     Geocoder :
   </div>
  );
};

Geo.propTypes = {};

export default Geo;

