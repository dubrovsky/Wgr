Ext.define('TK.model.PackDoc', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true}
    ]
});