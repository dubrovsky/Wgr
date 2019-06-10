Ext.define('TK.store.ky.KontsAllDir', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky.KontAllDir',
    remoteFilter: true,
    pageSize: 20
});