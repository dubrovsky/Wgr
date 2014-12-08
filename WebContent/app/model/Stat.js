Ext.define('TK.model.Stat', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
	    'project','route','doc',
	    'vags', 'konts',
        'g1', 'g4',
        {name:'hid', type:'int'},
        'type',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});