/**
 * Created by Odmin on 04.07.2019.
 */
Ext.define('TK.store.tables.CtGrNodes', {
    extend: 'Ext.data.Store',


    fields: ['hid','nzgr','rod','places','massa','sort'],
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