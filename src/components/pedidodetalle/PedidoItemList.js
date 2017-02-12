import React, {Component, PropTypes} from 'react';
import {
  Glyphicon,
} from 'react-bootstrap';
let PedidoItemList = props => {
  let sum = 0;
  return (
    <div>
      {props.pedidoItems.map((item, h) => {
        let itemComplete = props.items.find((i) => i.id == item.id_item);
        const itemPrecio = itemComplete.precio || 0;
        return <div key={h}>
          <strong>{itemComplete && itemComplete.nombre + ' [$' + itemPrecio + ']'}</strong>
          <a><Glyphicon glyph="remove-circle" onClick={() => props.handleRemoveItem(h)}/></a>
          {props.modificadores.map((mod, i) => {
            let submodsSelected = item.selectedModSubmods.filter((m) => m.id_modificador == mod.id)
            if (submodsSelected.length > 0) {
              return (
                <div key={i}>
                  {mod.nombre+ ' [$' + (mod.precio? mod.precio:'0') + ']'}
                  <ul>
                    {submodsSelected.map((s, k) => {
                      let completeSubmod = props.submodificadores.find((sub) => sub.id == s.id_submodificador);
                      if (completeSubmod && completeSubmod.nombre) {
                        return (
                          <li key={k}>
                            {completeSubmod.nombre+ ' [$' + (completeSubmod.precio? completeSubmod.precio:'0')+ ']'}
                          </li>
                        )
                      }
                    })}
                  </ul>
                </div>
              )

            }
          })}
          {'Item : $'+item.precio}
          <div style={{textColor:'gray'}}>
            {item.nota}
          </div>
        </div>
      })}
    </div>
  )
}

PedidoItemList.propTypes = {};

export default PedidoItemList;
