Ext.define('TK.model.ky2.Client', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'clNo', type: 'string', useNull: true},
        {name: 'fname', type: 'string', useNull: true},
        {name: 'sname', type: 'string', useNull: true},
        {name: 'noDog', type: 'string', useNull: true}
    ],

    idProperty: 'hid'
});