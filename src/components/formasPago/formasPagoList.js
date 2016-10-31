import React, { PropTypes } from 'react';

const FormasPagoList = props => {
  let formasPago = props.children;
  return (
    <div >
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
          onRowClick: props.selectFormaPago,
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

FormasPagoList.propTypes = {};

export default FormasPagoList;
