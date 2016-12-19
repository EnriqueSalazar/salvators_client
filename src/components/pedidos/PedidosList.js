import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import {
  Button,
  Glyphicon,
  ProgressBar
} from 'react-bootstrap';
import _ from 'lodash';
import '../../styles/styles.css';
const PedidosList = props => {
  let pedidos = props.children;
  let clienteFormatter = (cell, row) => {
    if (cell) {
      let cliente = props.clientes.find((cliente) => {
        return cliente.id == cell;
      });
      return cliente ? cliente.nombre : null;
    }
  };
  let direccionFormatter = (cell, row) => {
    if (cell) {
      let direccion = props.direcciones.find((direccion) => {
        return direccion.id == cell;
      });
      return direccion ? direccion.direccion : null;
    }
  };
  let restauranteFormatter = (cell, row) => {
    if (cell) {
      let restaurante = props.restaurantes.find((restaurante) => {
        return restaurante.id == cell;
      });
      return restaurante ? restaurante.nombre : null;
    }
  };
  let momentFormatter = (value, theFormat) =>
    (moment.utc(value, "YYYY-MM-DDTHH:mm:ssZ").format(theFormat));

  let dateFormatter = (cell, row) =>
    (cell ? momentFormatter(cell, 'D MMM YYYY') : null);

  let timeFormatter = (cell) =>
    (cell ? momentFormatter(cell, 'HH:mm') : null);

  let nowFormatter = (field, row, nextEstado) => {
    return (<Glyphicon glyph="time"/>);
  };

  let estadoFormatter = (cell, row) => {

    let estadoKey = _.findKey(props.estados, ['id', cell]);
    let estado = props.estados[estadoKey];
    let nextEstado = _.findKey(props.estados, ['id', cell + 1]);
    nextEstado = props.estados[nextEstado]; //craaaaazy shit
    let isAnulado = cell == props.estados.anulado.id;
    return (  <Button
        onClick={isAnulado
          ? () => props.cancelacionFormOn(row.id)
          : () => props.handleUpdatePedido(nextEstado.field, row, nextEstado)}
        bsStyle={ isAnulado ? "danger" : "primary"}
        bsSize="large"
        disabled={row.id_estado == props.estados.entregado.id}
      >{estadoKey}
      </Button>
    );

  }

  let cocinaFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_cocina', row, props.estados.cocina);
  }
  let barraFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_barra', row, props.estados.barra);
  }
  let domiciliarioFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_domiciliario', row, props.estados.domiciliario);
  }
  let entregadoFormatter = (cell, row) => {
    return cell ?
      timeFormatter(cell) :
      nowFormatter('h_entregado', row, props.estados.entregado);
  }

  let notaFormatter = (cell, row) => {
    let trimmedCell = cell ? cell.substring(0, 60) : '';
    return (<div>
        {trimmedCell + ' '}
        <Button
          bsStyle={cell ? "default" : "primary"}
          onClick={() => props.notaModalOn(row)}
          bsSize={cell ? "xsmall" : "default"}
        >
          <Glyphicon glyph="edit"/>
        </Button>
      </div>
    )
  }

  let notaPagoFormatter = (cell, row) => {
    let trimmedCell = cell ? cell.substring(0, 60) : '';
    return (<div>
        {trimmedCell + ' '}
        <Button
          bsStyle={cell ? "default" : "primary"}
          onClick={() => props.notaPagoModalOn(row)}
          bsSize={cell ? "xsmall" : "default"}
        >
          <Glyphicon glyph="edit"/>
        </Button>
      </div>
    )
  }

  let domiciliarioNombreFormatter = (cell, row) => {
    let domiciliario = props.domiciliarios.find(
      (domiciliario) => {
        return domiciliario.id == cell;
      }
    )
    return (<div>
        {domiciliario ? domiciliario.nombre + ' ' : ''}
        <Button
          bsStyle={cell ? "default" : "primary"}
          onClick={() => props.domiciliarioModalOn(row)}
          bsSize={cell ? "xsmall" : "default"}
          disabled={row.id_estado != props.estados.barra.id &&
          row.id_estado != props.estados.domiciliario.id}
        >
          <Glyphicon glyph="edit"/>
        </Button>
      </div>
    )
  }

  let trClassFormat = (row, rowIndex) => {
    if (row.id_estado < 2) return 'onOperator';
    if (row.id_estado == 6) return 'anulado';
    let isAnuladoOrEntregado = (row.id_estado >= 5);
    let sinceCocinaMinutos = moment().diff(row.h_cocina, 'minutes');
    if (!isAnuladoOrEntregado && sinceCocinaMinutos > 30) return 'min30';
    if (!isAnuladoOrEntregado && sinceCocinaMinutos >25) return 'min25';
  }

  const width = '150';
  const widthHora = '60';

  return (
    <div>
      <BootstrapTable
        style={{width: 2048}}
        trClassName={trClassFormat}
        data={pedidos}
        hover
        pagination
        search
        clearSearch
        options={{
          defaultSortName: "orden",
          sortOrder: "desc",
          sizePerPage: 20,
          sizePerPageList: [20, 50, 200, 1000],
          onRowDoubleClick: props.onPedidosClick,
        }}
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
          dataField="id_estado"
          dataAlign="center"
          width={180}
          dataFormat={estadoFormatter}
        >
          Estado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_inicio"
          dataAlign="center"
          width={widthHora}
          dataFormat={timeFormatter}
        >
          Inicio Pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_fin"
          dataAlign="center"
          width={widthHora}
          dataFormat={timeFormatter}
        >
          Fin Pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_cocina"
          dataAlign="center"
          width={widthHora}
          dataFormat={cocinaFormatter}
        >
          Cocina
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_barra"
          dataAlign="center"
          width={widthHora}
          dataFormat={barraFormatter}
        >
          Barra
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_domiciliario"
          dataAlign="center"
          width={widthHora}
          dataFormat={domiciliarioFormatter}
        >
          Domiciliario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="h_entregado"
          dataAlign="center"
          width={widthHora}
          dataFormat={entregadoFormatter}
        >
          Entregado
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="fecha"
          dataAlign="center"
          width={widthHora}
          dataFormat={dateFormatter}
        >
          Fecha
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_cliente"
          dataAlign="center"
          width={width}
          dataFormat={clienteFormatter}
        >
          Cliente
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_domiciliario"
          dataAlign="center"
          width={width}
          dataFormat={domiciliarioNombreFormatter}
        >
          Domiciliario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_direccion"
          dataAlign="center"
          width={width}
          dataFormat={direccionFormatter}
        >
          Direccion
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="factura"
          dataAlign="center"
          width={width}
        >
          Factura
        </TableHeaderColumn>

        <TableHeaderColumn
          dataField="nota_pedido"
          dataAlign="center"
          width={width}
          dataFormat={notaFormatter}
        >
          Nota Pedido
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_operario"
          dataAlign="center"
          width={width}
        >
          Operario
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_forma_pago"
          dataAlign="center"
          width={width}
        >
          Forma de Pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="nota_forma_pago"
          dataAlign="center"
          dataFormat={notaPagoFormatter}
          width={width}
        >
          Nota Forma de Pago
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="id_restaurante"
          dataAlign="center"
          width={width}
          dataFormat={restauranteFormatter}
        >
          Restaurante
        </TableHeaderColumn>
      </BootstrapTable>
    </div>
  );
};

PedidosList.propTypes = {};

export default PedidosList;
