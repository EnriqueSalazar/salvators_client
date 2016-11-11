import React, {Component, PropTypes} from 'react';

const PedidosList = props => {
  let pedidos = props.children;
  const width = '150';
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
          onRowClick: props.onPedidosClick,
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
        >
          fecha
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="factura"
          dataAlign="center"
          width={width}
        >
          factura
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_inicio"
          dataAlign="center"
          width={width}
        >
          h_inicio
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_fin"
          dataAlign="center"
          width={width}
        >
          h_fin
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_cliente"
          dataAlign="center"
          width={width}
        >
          id_cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_direccion"
          dataAlign="center"
          width={width}
        >
          id_direccion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_estado"
          dataAlign="center"
          width={width}
        >
          id_estado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_digitado"
          dataAlign="center"
          width={width}
        >
          h_digitado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_cocina"
          dataAlign="center"
          width={width}
        >
          h_cocina
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_barra"
          dataAlign="center"
          width={width}
        >
          h_barra
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_domiciliario"
          dataAlign="center"
          width={width}
        >
          h_domiciliario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_forma_pago"
          dataAlign="center"
          width={width}
        >
          id_forma_pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nota_pedido"
          dataAlign="center"
          width={width}
        >
          nota_pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_domiciliario"
          dataAlign="center"
          width={width}
        >
          id_domiciliario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_operario"
          dataAlign="center"
          width={width}
        >
          id_operario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nota_forma_pago"
          dataAlign="center"
          width={width}
        >
          nota_forma_pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_restaurante"
          dataAlign="center"
          width={width}
        >
          id_restaurante
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

PedidosList.propTypes = {};

export default PedidosList;
