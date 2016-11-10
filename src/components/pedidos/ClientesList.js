import React, { PropTypes } from 'react';

const ClientesList = props => {
  let clientes = props.children;
  let handleInsertRow = (cliente) => {
    cliente.cedula=parseInt(cliente.cedula,10);
    cliente.telefono=parseInt(cliente.telefono,10);
    delete cliente.id;
    props.createCliente(cliente);
  }
  let handleDeleteRow = (cliente) => {
    // props.destroyCliente(cliente);
  }
  return (
    <div >
      <h3>Clientes</h3>

      <BootstrapTable
        data={clientes}
        striped
        hover
        pagination
        search
        clearSearch
        options={{
          defaultSortName: "orden",
          defaultSortOrder: "asc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50],
          onRowClick: props.selectCliente,
          insertText: 'Nuevo',
          afterInsertRow: handleInsertRow,
          deleteText: 'Eliminar',
          afterDeleteRow: handleDeleteRow
        }}
        insertRow={true}
        deleteRow={true}      >
        <TableHeaderColumn
          dataField="id"
          isKey
          dataAlign="center"
          hidden
          hiddenOnInsert={true}
          autoValue={true}
        >
          ID
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre"
          dataAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="cedula"
          dataAlign="center"
        >
          Cedula
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="telefono"
          dataAlign="center"
        >
          Telefono
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

ClientesList.propTypes = {};

export default ClientesList;
