Ext.define('TK.store.Veds', {
	extend: 'Ext.data.Store',
    model: 'TK.model.Ved',
    // pageSize: 20,
	proxy: {
        type: 'ajax',
        url: 'Ved_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }
});