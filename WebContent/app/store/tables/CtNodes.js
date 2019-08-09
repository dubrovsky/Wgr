/**
 * Created by Odmin on 16.07.2019.
 */
Ext.define('TK.store.tables.CtNodes', {
    extend: 'Ext.data.Store',


    fields: ['hid','utiN','sizeFoot','taraKont','utiType','grpod','sort'],
    autoLoad: true,
    data : [],
    sorters: [{
        property: 'sort',
        direction: 'asc'
    }],
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'rows'
        }
    }
});