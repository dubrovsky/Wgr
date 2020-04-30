Ext.define('TK.store.messanger.MessageStore', {
    extend: 'Ext.data.Store',
    model: 'TK.model.messanger.MessageModel',
    remoteFilter: true,
    proxy: {
        type: 'ajax',
        url: './messageList',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }
});