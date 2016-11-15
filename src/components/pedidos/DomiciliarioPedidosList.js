import React, { PropTypes } from 'react';
import moment from 'moment';

const DomiciliarioPedidosList = props => {
  let pedidos = props.children;

  let ciudadFormatter = (cell, row) => {
    if (cell) {
      let ciudad = props.ciudades.find((ciudad) => {
        return ciudad.id == cell;
      });
      return ciudad.nombre;
    }
  }
  let selectRowProp = {
    mode: "radio",
    clickToSelect: true
  };

  let momentFormatter = (value, theFormat) =>
    (moment.utc(value, "YYYY-MM-DDTHH:mm:ssZ").format(theFormat));

  let dateFormatter = (cell, row) =>
    (cell ? momentFormatter(cell, 'D MMM YYYY') : null);

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
  let domiciliarioFormatter = (cell, row) => {
    return cell ? timeFormatter(cell) : null;
  }
  let timeFormatter = (cell) =>
    (cell ? momentFormatter(cell, 'HH:mm') : null);
  return (
    <div >
      <h3>DomiciliarioPedidos</h3>
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
          dataFormat={dateFormatter}
        >
          Fecha Creacion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_cliente"
          dataAlign="center"
          dataFormat={clienteFormatter}
        >
          Cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_direccion"
          dataAlign="center"
          dataFormat={direccionFormatter}
        >
          Direccion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_domiciliario"
          dataAlign="center"
          dataFormat={domiciliarioFormatter}
        >
          En Domiciliario (hora)
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

DomiciliarioPedidosList.propTypes = {};

export default DomiciliarioPedidosList;
