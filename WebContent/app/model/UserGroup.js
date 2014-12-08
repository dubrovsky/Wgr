Ext.define('TK.model.UserGroup', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'usrGr.name', mapping:'name'},
        {name:'usrGr.descr', mapping:'descr'}
    ]
});