Ext.define('TK.store.PrintBlanks', {
    extend: 'Ext.data.Store',
    model: 'TK.model.PrintBlank',
//    autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'PrintTemplates_viewBlanks.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});
