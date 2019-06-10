Ext.define('TK.model.Invoice', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        'dattr','altered','un','src', 'utiN','notpr',
        'dat_inv','src',
        {name:'hid', type:'int'},
        'notd','npol','invoice','iftmin','btlc',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});