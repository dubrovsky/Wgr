Ext.define('TK.model.SmgsPlomb', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name: 'kpl', type: 'int', useNull:true},
        'znak','type',
        {name: 'sort', type: 'int'},
        'hid'
    ]
});