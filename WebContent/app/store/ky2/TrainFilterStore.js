/**
 * Created by Odmin on 29.01.2020.
 */
Ext.define('TK.store.ky2.TrainFilterStore', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.ky2.TrainFilterModel'
    ],

    model: 'TK.model.ky2.TrainFilterModel',
    autoLoad: true,
    proxy: {
        type: 'memory'
    }
});