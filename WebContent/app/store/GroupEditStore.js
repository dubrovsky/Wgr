Ext.define('TK.store.GroupEditStore', {
    extend: 'Ext.data.Store',
    alias: 'store.groupeditstore',

    requires: [],

    fields: [
        {name: 'hid',    type: 'auto'},
        {name: 'nvag',    type: 'auto'},
        {name: 'sort',    type: 'auto'},
        {name: 'klientname',    type: 'auto'},
        {name: 'vagOtm',    type: 'auto'},
        {name: 'grPod',    type: 'auto'},
        {name: 'kolOs',    type: 'auto'},
        {name: 'taraVag',    type: 'auto'},
        {name: 'utiN',    type: 'auto'},
        {name: 'utiType',    type: 'auto'},
        {name: 'grPodKont',    type: 'auto'},
        {name: 'taraKont',    type: 'auto'},
        {name: 'massa',    type: 'auto'},
        {name: 'kgvn',type: 'auto'},
        {name: 'places',type: 'auto'},
        {name: 'upak',type: 'auto'},
        {name: 'g22',type: 'auto'},
        {name: 'gs_48',type: 'auto'},
        {name: 'g694',type: 'auto'},
        {name: 'g281',type: 'auto'},
        {name: 'npoezd',type: 'auto'},
        {name: 'plombs',type: 'auto'}
    ],
    sorters: [{
        property: 'hid',
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
