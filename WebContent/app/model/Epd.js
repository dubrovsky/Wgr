Ext.define('TK.model.Epd', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr','altered','un',
        'konts',
        'g1', 'g4','src',
        {name:'hid', type:'int'},
        'type',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});