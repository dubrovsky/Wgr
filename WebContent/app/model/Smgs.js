Ext.define('TK.model.Smgs', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
        'numClaim', 'vags', 'konts', 'aviso', 'avisoId', 'tbc2log', 'vagVedNum',
		'g281',
        'g1', 'g4','src','print','locked','npoezd',
        {name:'hid', type:'int'},
        'iftmin','tbc','status','fts','btlc','iftminBtlc','tdgFts','tdgFts1','tdgFtsHid','greenRail',
        {name:'ready', type:'int'} ,
        {name: 'check', type: 'boolean', defaultValue:false},
        'type','invQty',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'},
        'gng', 'nstn', 'route','dop_info'
    ]
});