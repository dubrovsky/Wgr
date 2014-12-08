Ext.define('TK.model.Slovnakl', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
        'numClaim', 'konts',
        'g1', 'g4','src',
        {name:'hid', type:'int'},
        'type','print',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});