Ext.define('TK.store.Groups', {
    extend: 'Ext.data.Store',
    model: 'TK.model.Group',
    proxy: {
        type: 'ajax',
        url: 'Nsi_groups_view.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});