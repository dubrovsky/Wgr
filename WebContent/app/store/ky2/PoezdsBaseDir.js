Ext.define('TK.store.ky2.PoezdsBaseDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.PoezdBaseDir',
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Poezd.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {exception: function (proxy, response, operation) {
            TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
        }}
    }
});