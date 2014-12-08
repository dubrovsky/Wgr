Ext.define('TK.store.RouteDocs', {
    extend: 'Ext.data.Store',
    model: 'TK.model.RouteDoc',
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'Nsi_routeDocs_view.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});