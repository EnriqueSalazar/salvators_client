import React, {Component, PropTypes} from 'react';
import ModificadorItem from './ModificadorItem';


const ModificadoresList = props => {
  let modificadores = props.children;
  return (
    <div style={{height: 400}}>
      <BootstrapTable
        data={modificadores}
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
          dataField="codigo"
          dataAlign="center"
        >
          Codigo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nombre"
          dataAlign="center"
          dataFormat={(cell, row)=>(<ModificadorItem value={cell} data={row}/>)}
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="maximo"
          dataAlign="center"
          hiddenOnInsert={true}
        >
          Maximo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="minimo"
          dataAlign="center"
          hiddenOnInsert={true}
        >
          Minimo
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

ModificadoresList.propTypes = {};

export default ModificadoresList;
