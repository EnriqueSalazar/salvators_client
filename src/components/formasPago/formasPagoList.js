import React, { Component, PropTypes } from 'react';
import FormaPagoItem from './FormaPagoItem';

const FormasPagoList = props => {
  let formasPago = props.children;
  return (
    <div style={{height: 400}}>
      <BootstrapTable
        data={formasPago}
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
          onRowClick: props.formaPagoSelect,
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
          dataFormat={(cell) ? 'Inactivo' : 'Activo'}
        >
          Inactivo
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

FormasPagoList.propTypes = {};

export default FormasPagoList;
