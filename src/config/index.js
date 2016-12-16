/**
 * Created by enriq on 20/06/16.
 */

console.info('Server environment', process.env.NODE_ENV);

let isProduction = process.env.NODE_ENV === 'production';
let server;
let port;
if (isProduction) {
  server = '52.39.41.242';
  port = '80';
} else {
  server = '192.168.1.7';
  port = '1337';
}
export let serverUrl = 'http://' + server + ':' + port + '/';

let apiUrl = (model) => {
  return serverUrl + model + 'API/'
};

export const model = {
  grupomenu: apiUrl('grupomenu'),
  categoriamenu: apiUrl('categoriamenu'),
  itemmenu: apiUrl('itemmenu'),
  itemmod: apiUrl('itemmod'),
  modificador: apiUrl('modificador'),
  submodificador: apiUrl('submodificador'),
  modsubmod: apiUrl('modsubmod'),
  formapago: apiUrl('formapago'),
  domiciliario: apiUrl('domiciliario'),
  cliente: apiUrl('cliente'),
  pedidos: apiUrl('pedidos'),
  pedidoitem: apiUrl('pedidoitem'),
  pedidoitemparte: apiUrl('pedidoitemparte'),
  estado: apiUrl('estado'),
  direccion: apiUrl('direccion'),
  descuento: apiUrl('descuento'),
  ciudad: apiUrl('ciudad'),
  restaurante: apiUrl('restaurante'),
  cancelacion: apiUrl('cancelacion'),
  queja: apiUrl('queja')
};

export const estados = {
  inicio_pedido: {
    id: 0,
    alarma: 5,
    estilo: 'info',
    field:'h_inicio',
    nombre:'Inicio Pedido'
  },
  fin_pedido: {
    id: 1,
    alarma: 5,
    estilo: 'info',
    field:'h_fin',
    nombre: 'Fin Pedido'
  },
  cocina: {
    id: 2,
    alarma: 5,
    estilo: 'info',
    field:'h_cocina',
    nombre: 'Cocina'
  },
  barra: {
    id: 3,
    alarma: 5,
    estilo: 'info',
    field:'h_barra',
    nombre: 'Barra'
  },
  domiciliario: {
    id: 4,
    alarma: 5,
    estilo: 'info',
    field:'h_domiciliario',
    nombre: 'Domiciliario'
  },
  entregado: {
    id: 5,
    alarma: 5,
    estilo: 'info',
    field:'h_entregado',
    nombre: 'Entregado'
  },
  anulado: {
    id: 6,
    alarma: 5,
    estilo: 'info',
    nombre: 'Anulado'
  },
};
