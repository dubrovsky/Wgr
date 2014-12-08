Ext.define('TK.store.InvoicesInPack', {
    extend: 'Ext.data.Store',
    model: 'TK.model.Invoice',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'Invoice_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        actionMethods: {
            create : 'POST',
            read   : 'POST',
            update : 'POST',
            destroy: 'POST'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});