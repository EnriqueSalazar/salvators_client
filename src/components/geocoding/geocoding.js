/**
 * Created by enriq on 6/02/17.
 */
import React, {Component, PropTypes} from 'react';
import geocoding from 'geocoding';
import inside from 'point-in-polygon';
import GoogleMap from 'google-map-react';

const Geo = props => {
  geocoding({address: 'carrera 54 # 64a - 75, Bogota'}).then(function (results) {
    console.log(results);

  })
  let polygon = [[25.774, -80.19],
    [18.466, -66.118],
    [32.321, -64.757]];
  console.info('inside polygon', inside([32.210477226433824, -64.86740112304688], polygon));
  return (
  <div style={{height: 300}}>
    <GoogleMap
      bootstrapURLKeys={{key:'AIzaSyDB_jeDJCNUIDNwSkD8MaLWeUuHlB2wNE8'}}
      center={[59.744465, 30.042834]}
      defaultZoom={9}>
    </GoogleMap>

  </div>
  );
};

Geo.propTypes = {};

export default Geo;

