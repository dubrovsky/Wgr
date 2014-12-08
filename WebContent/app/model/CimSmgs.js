Ext.define('TK.model.CimSmgs', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
        'numClaim', 'vags', 'konts','npoezd',
		{name:'g281'},
        'g1', 'g4','src',
        {name:'hid', type:'int'},
        'iftmin','status','fts','btlc','iftminBtlc','tdgFts','tdgFts1','tdgFtsHid','greenRail',
        {name:'ready', type:'int'} ,
        {name: 'check', type: 'boolean', defaultValue:false},
        'type','print','locked',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}]
});