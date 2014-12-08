Ext.define('TK.model.File', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'hid', type:'int'},
        'fileName','contentType',
        {name:'length', type:'int'}
    ]
});