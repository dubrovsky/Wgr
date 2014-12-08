Ext.define('TK.model.SmgsKon', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        'utiN',
        'sizeFoot',
        'vid',
        {name: 'sort', type: 'int'},
        'hid','carHid'
    ]
});