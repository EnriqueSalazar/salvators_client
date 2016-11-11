import React, { PropTypes } from 'react';

const RestaurantesList = props => {
  let restaurantes = props.children;
  let ciudadFormatter = (cell, row) => {
    if (cell) {
      let ciudad = props.ciudades.find((ciudad) => {
        return ciudad.id == cell;
      });
      return ciudad.nombre;
    }
  }
  return (
    <div >
      <h3>Restaurantes</h3>
      <BootstrapTable
        data={restaurantes}
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
          onRowClick: props.selectRestaurante,
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
          dataField="id_ciudad"
          dataAlign="center"
          dataFormat={ciudadFormatter}
      >
          Ciudad
        </TableHeaderColumn>
      <TableHeaderColumn
          dataField="valor"
          dataAlign="center"
        >
          Valor
        </TableHeaderColumn>

      </BootstrapTable>
    </div>
  );
};

RestaurantesList.propTypes = {};

export default RestaurantesList;
