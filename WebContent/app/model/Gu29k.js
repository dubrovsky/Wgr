Ext.define('TK.model.Gu29k', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
        'numClaim', 'vags', 'konts', 'aviso', 'avisoId',
		'g281',
        'g1', 'g4','src',
        {name:'hid', type:'int'},
        'iftmin',
        {name:'ready', type:'int'} ,
        {name: 'check', type: 'boolean', defaultValue:false},
        'type','print',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});