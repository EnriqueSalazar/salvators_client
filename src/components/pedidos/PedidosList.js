import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {
  Button,
  Glyphicon
} from 'react-bootstrap';
const PedidosList = props => {
  let pedidos = props.children;
  const width = '150';
  let clienteFormatter = (cell, row) => {
    if (cell) {
      let cliente = props.clientes.find((cliente) => {
        return cliente.id == cell;
      });
      return cliente ? cliente.nombre : null;
    }
  }
  let direccionFormatter = (cell, row) => {
    if (cell) {
      let direccion = props.direcciones.find((direccion) => {
        return direccion.id == cell;
      });
      return direccion ? direccion.direccion : null;
    }
  }
  let restauranteFormatter = (cell, row) => {
    if (cell) {
      let restaurante = props.restaurantes.find((restaurante) => {
        return restaurante.id == cell;
      });
      return restaurante ? restaurante.nombre : null;
    }
  }
  let momentFormatter = (value, theFormat) =>
    (moment.utc(value, "YYYY-MM-DDTHH:mm:ssZ").format(theFormat));

  let dateFormatter = (cell, row) =>
    (cell ? momentFormatter(cell, 'D MMM YYYY') : null);

  let timeFormatter = (cell) =>
    (cell ? momentFormatter(cell, 'HH:mm') : null);

  let nowFormatter = (field, row, nextEstado) => {
    return (
      <Button
        onClick={() => props.handleUpdatePedido(field, row, nextEstado)}
        bsStyle="primary"
        disabled={row.id_estado != (nextEstado.id - 1)}
      >
        <Glyphicon glyph="plus"/>
      </Button>
    )
  }
  let estadoFormatter = (cell, row) => {
    for (let estado in props.estados) {
      if (props.estados[estado].id == cell) {
        return estado;
      }
    }
  }

  let cocinaFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_cocina', row, props.estados.cocina);
  }
  let barraFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_barra', row, props.estados.barra);
  }
  let domiciliarioFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_domiciliario', row, props.estados.domiciliario);
  }
  let entregadoFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_entregado', row, props.estados.entregado);
  }

  return (
    <div>
      <BootstrapTable
        style={{width: 2048}}
        data={pedidos}
        striped
        hover
        pagination
        search
        clearSearch
        options={{
          defaultSortName: "orden",
          sortOrder: "desc",
          sizePerPage: 20,
          sizePerPageList: [20, 50, 200, 1000],
          //onRowClick: props.onPedidosClick,
        }}
      >
        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fecha"
          dataAlign="center"
          width={width}
          dataFormat={dateFormatter}
        >
          Fecha Creacion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="factura"
          dataAlign="center"
          width={width}
        >
          Factura
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_inicio"
          dataAlign="center"
          width={width}
          dataFormat={timeFormatter}
        >
          Hora de Inicio
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_fin"
          dataAlign="center"
          width={width}
          dataFormat={timeFormatter}
        >
          Hora de Finalizacion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_cliente"
          dataAlign="center"
          width={width}
          dataFormat={clienteFormatter}
        >
          Cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_direccion"
          dataAlign="center"
          width={width}
          dataFormat={direccionFormatter}
        >
          Direccion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_estado"
          dataAlign="center"
          width={width}
          dataFormat={estadoFormatter}
        >
          Estado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_cocina"
          dataAlign="center"
          width={width}
          dataFormat={cocinaFormatter}
        >
          En Cocina (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_barra"
          dataAlign="center"
          width={width}
          dataFormat={barraFormatter}
        >
          En Barra (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_domiciliario"
          dataAlign="center"
          width={width}
          dataFormat={domiciliarioFormatter}
        >
          En Domiciliario (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_entregado"
          dataAlign="center"
          width={width}
          dataFormat={entregadoFormatter}
        >
          Entregado (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nota_pedido"
          dataAlign="center"
          width={width}
        >
          Nota Pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_domiciliario"
          dataAlign="center"
          width={width}
        >
          Domiciliario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_operario"
          dataAlign="center"
          width={width}
        >
          Operario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_forma_pago"
          dataAlign="center"
          width={width}
        >
          Forma de Pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nota_forma_pago"
          dataAlign="center"
          width={width}
        >
          Nota Forma de Pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_restaurante"
          dataAlign="center"
          width={width}
          dataFormat={restauranteFormatter}
        >
          Restaurante
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

PedidosList.propTypes = {};

export default PedidosList;
