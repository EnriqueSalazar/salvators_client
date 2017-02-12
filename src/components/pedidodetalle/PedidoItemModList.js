import React, {Component, PropTypes} from 'react';
import {
  Badge,
  Glyphicon
} from 'react-bootstrap';
let PedidoItemModList = props => {

  return (
    <div>
      {props.filteredMods.map((mod, i) => {
        let submodsSelected = props.selectedModSubmod.filter((m) => m.id_modificador == mod.id)
        if (submodsSelected.length > 0) {
          const threshold = <span><Glyphicon glyph="arrow-down"/>{mod.minimo}{' '}
            <Glyphicon glyph="arrow-up"/>{mod.maximo}</span>;
          let counterColor = 'black';
          if (submodsSelected.length < mod.minimo || submodsSelected.length > mod.maximo) {
            counterColor = 'red';
          }
          return (
            <div key={i}>
              <strong> {mod.nombre} </strong>
              <Badge>{submodsSelected.length}</Badge>
              <span
              style={{whiteSpace: 'nowrap', color: counterColor}}
              >
                {threshold}
                </span>
              {' [$'+(mod.precio? mod.precio: '0')+']'}
              <ul>
                {submodsSelected.map((s, k) => {
                  let completeSubmod = props.submodificadores.find((sub) => sub.id == s.id_submodificador);
                  if (completeSubmod && completeSubmod.nombre) {
                    return (
                      <li key={k}>
                        {completeSubmod.nombre+' [$'+(completeSubmod.precio? completeSubmod.precio: '0')+']'}
                      </li>
                    )
                  }
                })}
              </ul>
            </div>
          )

        }
      })}
    </div>
  )
}

PedidoItemModList.propTypes = {};

export default PedidoItemModList;
