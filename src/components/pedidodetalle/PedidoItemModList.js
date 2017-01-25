import React, { Component, PropTypes } from 'react';

let PedidoItemModList = props => {
  // modfiltered, allsubmods, selectedsubmods
  return (
    <div>
      {props.filteredMods.map((mod, i) => {
        let submodsSelected = props.selectedModSubmod.filter((m)=> m.id_modificador == mod.id)
        if (submodsSelected.length>0){
          return (
            <div key={i}>
              <h4> {mod.nombre} </h4>
              <ul>
              {submodsSelected.map((s, k)=>{
                let completeSubmod = props.submodificadores.find((sub)=> sub.id == s.id_submodificador);
                if (completeSubmod && completeSubmod.nombre){
                  return (
                    <li key={k}>
                      {completeSubmod.nombre}
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
