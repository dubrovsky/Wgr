Ext.define('TK.store.ky.Yards', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.Yard',
    remoteFilter: true,
    pageSize: 20/*,
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