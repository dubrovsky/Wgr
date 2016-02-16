Ext.define('TK.model.SmgsKon2', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        'utiN',
        'vid',
        'taraKont',

        {name: 'sort', type: 'int'},
        'hid','carHid'
    ]
});