Ext.define('TK.model.AvisoGu29k', {
    extend: 'Ext.data.Model',

    fields: [
      'dattr','altered','un','status','comments','npoezd',
      'numClaim', 'konts', 'avizo_num',
      'g1', 'g4','graf','src','locked',
      {name:'hid', type:'int'},
      {name:'ready', type:'int'},
      'type',
      {name:'amount', type:'int'},
      {name:'packId', type:'int'},
      {name:'routeId', type:'int'}
    ]
});