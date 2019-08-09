Ext.define('TK.store.Avisos2', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.Aviso2'
    ],
    model: 'TK.model.Aviso2',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'Smgs_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});