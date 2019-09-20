Ext.define('TK.store.ky2.YardFilterPoezdsDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.YardFilterDir',
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Yard_getPoezdsForFilter.do',
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