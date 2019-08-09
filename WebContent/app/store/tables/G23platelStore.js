/**
 * Created by Odmin on 17.07.2019.
 */
Ext.define('TK.store.tables.G23platelStore', {
    extend: 'Ext.data.Store',

    fields: ['sort','text'],
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