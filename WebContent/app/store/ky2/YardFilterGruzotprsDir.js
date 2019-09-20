Ext.define('TK.store.ky2.YardFilterGruzotprsDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.YardFilterDir',
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Yard_getGruzotprsForFilter.do',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }
});