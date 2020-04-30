Ext.define('TK.store.Groups', {
    extend: 'Ext.data.Store',

    model: 'TK.model.Group',
    proxy: {
        type: 'ajax',
        url: 'Nsi_groups_view.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'name'
        },
        actionMethods: {create: "POST", read: "POST", update: "POST", destroy: "POST"},
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});