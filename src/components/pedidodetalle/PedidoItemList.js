import React, {Component, PropTypes} from 'react';
import {
  Glyphicon,
  Badge,
  Label,
} from 'react-bootstrap';
let PedidoItemList = props => {
  let sum = 0;
  return (
  <div>
      {props.pedidoItems.map((item, h) => {
        let itemComplete = props.items.find((i) => i.id == item.id_item);
        const itemPrecio = itemComplete.precio || 0;
        return <div key={h}>
          <strong><Badge>{item.cantidad}</Badge>{itemComplete && itemComplete.nombre + ' [$' + item.precio + ']'}</strong>
          <a><Glyphicon glyph="remove-circle" onClick={() => props.handleRemoveItem(h)}/></a><br />
          {props.modificadores.map((mod, i) => {
            let submodsSelected = item.selectedModSubmods.filter((m) => m.id_modificador == mod.id)
            if (submodsSelected.length > 0) {
              return (
                <span key={i}>
                  <Label bsStyle="primary">{mod.nombre}</Label>
                    {submodsSelected.map((s, k) => {
                      let completeSubmod = props.submodificadores.find((sub) => sub.id == s.id_submodificador);
                      if (completeSubmod && completeSubmod.nombre) {
                        return (
                          <span>{' '}<Label bsStyle="info" key={k}>
                            {completeSubmod.nombre}
                          </Label>   </span>
                        )
                      }
                    })}
                </span>
              )

            }
          })}
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
