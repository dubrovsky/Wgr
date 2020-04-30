Ext.define('TK.store.PrintTemplates', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.PrintTemplate'
    ],

    model: 'TK.model.PrintTemplate',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'PrintTemplates_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});