Ext.define('TK.store.NsiDirs', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.NsiDir'
    ],

    model: 'TK.model.NsiDir',
    proxy: {
        type: 'ajax',
        url: 'NsiDir_listDir.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
    /*data : [
        {hid:1, name: 'nsiSta',    descr: 'Справочник станций'},
        {hid:2, name: 'nsiCountries', descr: 'Справочник стран'},
        {hid:3, name: 'nsiGng', descr: 'Справочник грузов'},
        {hid:4, name: 'nsiEtsng', descr: 'Справочник грузов ЕТ СНГ'}
    ],
    fields: [
        {name:'hid', type:'int', useNull:true},
        'name',
        'descr'

    ]*/

});