import React, { PropTypes } from 'react';

const DescuentosList = props => {
  let descuentos = props.children;
  return (
    <div >
      <h3>Descuentos</h3>
      <BootstrapTable
        data={descuentos}
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
          onRowClick: props.selectDescuento,
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

DescuentosList.propTypes = {};

export default DescuentosList;
