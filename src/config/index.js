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
  server = '192.168.178.248';
  port = '1337';
}
;
export let serverUrl = 'http://' + server + ':' + port + '/';

let apiUrl = (model) => {
  return serverUrl + model + 'API/'
};

export const tokenUrl = 'https://www.arcgis.com/sharing/rest/oauth2/token/?client_id=ZKpIf9sIkasqBBz8&client_secret=842edfa1a476440b8675f70379844c2f&grant_type=client_credentials&expiration=120';
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

export const polys = [
  {
    nombre: 'principal',
    poly: [
      [10.999563, -74.814313],
      [11.007851, -74.809603],
      [11.015002, -74.819270],
      [11.003565, -74.824259]
    ]
  }
];

export const estados = {
  inicio_pedido: {
    id: 0,
    alarma: 5,
    estilo: 'info',
    field: 'h_inicio',
    nombre: 'Inicio Pedido'
  },
  fin_pedido: {
    id: 1,
    alarma: 5,
    estilo: 'info',
    field: 'h_fin',
    nombre: 'Fin Pedido'
  },
  cocina: {
    id: 2,
    alarma: 5,
    estilo: 'info',
    field: 'h_cocina',
    nombre: 'Cocina'
  },
  barra: {
    id: 3,
    alarma: 5,
    estilo: 'info',
    field: 'h_barra',
    nombre: 'Barra'
  },
  domiciliario: {
    id: 4,
    alarma: 5,
    estilo: 'info',
    field: 'h_domiciliario',
    nombre: 'Domiciliario'
  },
  entregado: {
    id: 5,
    alarma: 5,
    estilo: 'info',
    field: 'h_entregado',
    nombre: 'Entregado'
  },
  anulado: {
    id: 6,
    alarma: 5,
    estilo: 'info',
    nombre: 'Anulado'
  },
};
