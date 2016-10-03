import React, {Component, PropTypes} from 'react';

const ModificadoresList = props => {
  let modificadores = props.children;
  var selectRowProp = {
    mode: "radio", // or checkbox
    clickToSelect: true
  };
  return (
    <div>
      <BootstrapTable
        data={modificadores}
        striped
        hover
        pagination
        search
        clearSearch
        options={{
          defaultSortName: "orden",
          sortOrder: "desc",
          sizePerPage: 5,
          sizePerPageList: [5, 10, 20, 50],
          onRowClick: props.modificadorClick,
          deleteText: 'Eliminar',
          afterDeleteRow : props.destroyModificador
        }}
        deleteRow={true}
        selectRow={selectRowProp}
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
          dataField="codigo"
          dataAlign="center"
        >
          Codigo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre"
          dataAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="maximo"
          dataAlign="center"
        >
          Maximo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="minimo"
          dataAlign="center"
        >
          Minimo
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

ModificadoresList.propTypes = {};

export default ModificadoresList;
