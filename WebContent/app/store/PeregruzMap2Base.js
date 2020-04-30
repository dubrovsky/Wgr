/**
 * Created by Odmin on 25.02.2019.
 * store combination of data  from excel and db
 */
Ext.define('TK.store.PeregruzMap2Base', {
    extend: 'Ext.data.Store',

    fields: [
        {name: 'cs_hid',    type: 'auto'},
        {name: 'nvag',    type: 'auto'},
        {name: 'utin',    type: 'auto'},
        {name: 'utin_db',    type: 'auto'},
        {name: 'g694',    type: 'auto'},
        {name: 'klientname',    type: 'auto'},
        {name: 'sizefoot',    type: 'auto'},
        {name: 'uti_type',    type: 'auto'},
        {name: 'znak',    type: 'auto'},
        {name: 'tarakont',    type: 'auto'},
        {name: 'grpodkont',    type: 'auto'},
        {name: 'taravag',    type: 'auto'},
        {name: 'grpod',    type: 'auto'},
        {name: 'kolos',    type: 'auto'},
        {name: 'isSelected',type: 'auto'}
    ],
    sorters: [{
        property: 'cs_hid',
        direction: 'desc'
    }],
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
