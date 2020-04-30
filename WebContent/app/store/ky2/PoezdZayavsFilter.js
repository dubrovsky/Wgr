Ext.define('TK.store.ky2.PoezdZayavsFilter', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky2.PoezdZayavBase'
    ],

    model: 'TK.model.ky2.PoezdZayavBase',
    autoLoad: false
});