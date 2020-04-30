Ext.define('TK.store.ky.KontsNoTransp', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky.KontNoTrasp'
    ],

    model: 'TK.model.ky.KontNoTrasp',
    remoteFilter: true,
    pageSize: 20
});