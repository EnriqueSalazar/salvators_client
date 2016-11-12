import React, { PropTypes } from 'react';

const EstadosList = props => {
  let estados = props.children;
  return (
    <div >
      <h3>Estados</h3>

      <BootstrapTable
        data={estados}
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
          onRowClick: props.selectEstado,
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
          dataField="nombre"
          dataAlign="center"
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="is_inactivo"
          dataAlign="center"
          dataFormat={(cell) => {
            return cell ? 'Inactivo' : 'Activo'
          }}
        >
          Inactivo
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

EstadosList.propTypes = {};

export default EstadosList;
