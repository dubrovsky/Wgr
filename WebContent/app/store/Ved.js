Ext.define('TK.store.Ved', {
	extend: 'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.Ved'
    ],

    model: 'TK.model.Ved',
//    storeId:'Project',
    proxy: {
        type: 'ajax',
        url: 'Ved_view1.do',
        reader: {
            type: 'json',
            root: 'ved',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});