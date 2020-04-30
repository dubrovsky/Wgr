/**
 * Created by Damned on 28.01.2020.
 */
Ext.define('TK.store.ky2.ClientFilterStore', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky2.ClientFilterModel'
    ],

    model: 'TK.model.ky2.ClientFilterModel',
    autoLoad: true,
    proxy: {
        type: 'memory'
    }
});
