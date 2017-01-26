import React, { Component, PropTypes } from 'react';

let PedidoItemList = props => {
  return (
    <div>
      {props.pedidoItems.map((item, h)=>{
        let itemComplete=props.items.find((i)=> i.id == item.id_item)
        return <div key={h}>
          <h2>{itemComplete && itemComplete.nombre}</h2>
              {props.modificadores.map((mod, i) => {
                let submodsSelected = item.selectedModSubmods.filter((m)=> m.id_modificador == mod.id)
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
      })}
    </div>
  )
}

PedidoItemList.propTypes = {};

export default PedidoItemList;
