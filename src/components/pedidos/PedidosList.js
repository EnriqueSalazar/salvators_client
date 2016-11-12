import React, { Component, PropTypes } from 'react';
import moment from 'moment';

const PedidosList = props => {
  let pedidos = props.children;
  // if (_.isEmpty(pedidos)) {
  //   return null;
  // }
  // if (_.isEmpty(props.clientes)) {
  //   return null;
  // }
  // if (_.isEmpty(props.direcciones)) {
  //   return null;
  // }
  // if (_.isEmpty(props.restaurantes)) {
  //   return null;
  // }
  // if (_.isEmpty(props.estados)) {
  //   return null;
  // }
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
      return direccion ? direccion.nombre : null;
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
  let dateFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('D MMM YYYY')}
        </div>
      );
    }
  };
  let timeFormatter = (cell, row) => {
    if (cell) {
      return (
        <div>
          {moment.utc(cell, "YYYY-MM-DDTHH:mm:ssZ").format('HH:mm')}
        </div>
      );
    }
  };
  let rotateStatusFormatter = (cell, row) => {

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
        >
          Estado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_cocina"
          dataAlign="center"
          width={width}
          dataFormat={timeFormatter}
        >
          En Cocina (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_barra"
          dataAlign="center"
          width={width}
          dataFormat={timeFormatter}
        >
          En Barra (hora)
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_domiciliario"
          dataAlign="center"
          width={width}
          dataFormat={timeFormatter}
        >
          En Domiciliario (hora)
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
