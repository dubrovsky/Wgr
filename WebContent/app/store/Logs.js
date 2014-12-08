Ext.define('TK.store.Logs', {
    extend: 'Ext.data.Store',
    model: 'TK.model.Log',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: 'Status_logs.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'eventId'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});