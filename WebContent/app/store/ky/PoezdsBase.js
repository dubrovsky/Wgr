Ext.define('TK.store.ky.PoezdsBase', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky.PoezdBase'
    ],

    model: 'TK.model.ky.PoezdBase',
    remoteFilter: true,
    pageSize: 20
});