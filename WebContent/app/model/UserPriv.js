Ext.define('TK.model.UserPriv', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'usrPriv.name', mapping:'name'},
        {name:'usrPriv.descr', mapping:'descr'}
    ]
});