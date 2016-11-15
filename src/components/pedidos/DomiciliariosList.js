import React, { PropTypes } from 'react';

const DomiciliariosList = props => {
  let domiciliarios = props.children;
  return (
    <div >
      <h3>Domiciliarios</h3>

      <BootstrapTable
        data={domiciliarios}
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
          onRowClick: props.selectDomiciliario,
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
      </BootstrapTable>
    </div>
  );
};

DomiciliariosList.propTypes = {};

export default DomiciliariosList;
