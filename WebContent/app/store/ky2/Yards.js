Ext.define('TK.store.ky2.Yards', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.YardBase',
    remoteFilter: true,
    pageSize: 200/*,
    proxy: {
        type: 'ajax',
        url: 'Kontyard_list.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }*/
});