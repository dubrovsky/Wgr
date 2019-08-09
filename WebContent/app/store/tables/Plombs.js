/**
 * Created by Odmin on 12.07.2019.
 */
Ext.define('TK.store.tables.Plombs', {
    extend: 'Ext.data.Store',

    requires: [
        'TK.model.tables.Plomb'
    ],

    model:'TK.model.tables.Plomb',
    autoLoad: true,
    data : [],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});