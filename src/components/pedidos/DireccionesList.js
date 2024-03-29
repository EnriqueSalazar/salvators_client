import React, { PropTypes } from 'react';

const DireccionesList = props => {
  let direcciones = props.children;
  let selectRowProp = {
    mode: "radio", // or checkbox
    clickToSelect: true
  };
  let handleInsertRow = (direccion) => {
    delete direccion.id;
    direccion.id_cliente= props.cliente.id;
    props.createDireccion(direccion);
  }
  let handleDeleteRow = (direccion) => {
    debugger
    // props.destroyDireccion(direccion);
  }
  return (
    <div >

      <BootstrapTable
        data={direcciones}
        striped
        hover
        pagination
        options={{
          defaultSortName: "orden",
          defaultSortOrder: "asc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50],
          onRowClick: props.selectDireccion,
          insertText: 'Nuevo',
          afterInsertRow: handleInsertRow,
          deleteText: 'Eliminar',
          afterDeleteRow: props.handleDestroyDireccion
        }}
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
          dataField="direccion"
          dataAlign="center"
        >
          Direccion
        </TableHeaderColumn>
      <TableHeaderColumn
          dataField="interno"
          dataAlign="center"
        >

        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};


DireccionesList.propTypes = {};

export default DireccionesList;
