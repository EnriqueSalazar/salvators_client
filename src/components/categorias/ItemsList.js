import React, { Component, PropTypes } from 'react';
import ItemItem from './ItemItem';
import { Button, Glyphicon, ButtonGroup } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const ItemsList = props => {
  let items = props.children;

  let itemsFiltered;
  if (props.selectedCategoria == 0) {
    itemsFiltered = items;
  } else {
    itemsFiltered = items.filter((item) => {
      return (
        item.id_categoria_menu == props.selectedCategoria
      );
    });
  }
  const buttonFormatter = (cell, row) => {
    if (row.id) {
      return (
        <div>
          <Button
            className="play"
            onClick={() => {
              browserHistory.push('/edititems/' + row.id);
            }}
            bsSize="xsmall"
            bsStyle="info"
          >
            <Glyphicon glyph="menu-right"/>
            <Glyphicon glyph="menu-right"/>
          </Button>
        </div>);
    }
  };
  return (
    <div style={{height: 400}}>
      <h3>Items</h3>
      <BootstrapTable
        data={itemsFiltered}
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
          onRowClick: props.itemSelect,
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
          dataFormat={(cell, row) => (<ItemItem value={cell} data={row}/>)}
        >
          Nombre
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="codigo"
          dataAlign="center"
        >
          Codigo
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="precio"
          dataAlign="center"
        >
          Precio
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="button"
          dataAlign="center"
          dataFormat={buttonFormatter}
          headerAlign='center'
          editable={false}
          width="65"
        >
        </TableHeaderColumn>
      </BootstrapTable>
      <Button
        onClick={() => {
          browserHistory.push('/edititems/0');
        }}        bsStyle="primary"
      >
        <Glyphicon glyph="plus"/>{' Crear'}
      </Button>
    </div>
  );
};

ItemsList.propTypes = {};

export default ItemsList;
