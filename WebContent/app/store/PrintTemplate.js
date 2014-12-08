Ext.define('TK.store.PrintTemplate', {
    extend: 'Ext.data.Store',
    model: 'TK.model.PrintTemplate',
    proxy: {
        type: 'ajax',
        url: 'PrintTemplates_view1.do',
        reader: {
            type: 'json',
            root: 'prnTempl',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});