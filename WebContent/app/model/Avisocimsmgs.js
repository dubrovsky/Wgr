Ext.define('TK.model.Avisocimsmgs', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un','status',
        'numClaim', 'konts', 'gng', 'avizo_num','locked', 'comments', 'npoezd',
        'g1', 'g4','graf','src',
        {name:'hid', type:'int'},
        {name:'ready', type:'int'},
        'type',
        {name:'amount', type:'int'},
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});