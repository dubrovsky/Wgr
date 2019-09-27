Ext.define('TK.store.ky2.PoezdZayavsBase', {
    extend: 'Ext.data.Store',
    model: 'TK.model.ky2.PoezdZayavBase',
    remoteFilter: true,
    pageSize: 20
});