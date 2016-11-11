import React, { PropTypes } from 'react';

const ClientesList = props => {
  let clientes = props.children;
  let handleInsertRow = (cliente) => {
    cliente.cedula = parseInt(cliente.cedula, 10);
    cliente.telefono = parseInt(cliente.telefono, 10);
    cliente.id_ciudad = props.ciudad.id
    delete cliente.id;
    props.createCliente(cliente);
  }

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
          afterDeleteRow: props.handleDestroyCliente
        }}
        insertRow={!_.isEmpty(props.ciudad)}
        deleteRow={true}
        selectRow={selectRowProp}
      >
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
        <TableHeaderColumn
          dataField="id_ciudad"
          dataAlign="center"
          dataFormat={ciudadFormatter}
          hiddenOnInsert
        >
          Ciudad
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

ClientesList.propTypes = {};

export default ClientesList;
