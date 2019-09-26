Ext.define('TK.store.ky2.PoezdsIntoForPoezdOutDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.PoezdsIntoForPoezdOutDir',
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Poezd_getPoezdsIntoForPoezdOutDir.do',     // grid.getStore().getProxy().extraParams = {routeId: routeId}
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