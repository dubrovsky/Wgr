Ext.define('TK.model.Cim', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        'dattr','altered','un',
        'numClaim', 'konts',
        'g1', 'g4','src','npoezd',
        {name:'hid', type:'int'},
        'type','print',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});