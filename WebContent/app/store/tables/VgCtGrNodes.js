/**
 * Created by Damned on 13.06.2019.
 */
Ext.define('TK.store.tables.VgCtGrNodes', {
    extend: 'Ext.data.Store',


    fields: ['hid','nvag','rod','klientName','vagOtm','grPod','kolOs','taraVag','sort'],
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
