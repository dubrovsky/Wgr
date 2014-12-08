Ext.define('TK.store.Slovnakls', {
    extend: 'Ext.data.Store',
    model: 'TK.model.Slovnakl',
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