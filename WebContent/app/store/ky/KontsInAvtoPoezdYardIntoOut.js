Ext.define('TK.store.ky.KontsInAvtoPoezdYardIntoOut', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky.KontInAvtoPoezdYardIntoOut'
    ],

    model: 'TK.model.ky.KontInAvtoPoezdYardIntoOut',
    storeId: 'kontsInAvtoPoezdYardIntoOut'
});