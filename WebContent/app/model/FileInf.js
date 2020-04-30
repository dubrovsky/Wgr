Ext.define('TK.model.FileInf', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr', 'un',
        {name:'hid', type:'int'},
        'type','nkon', 'numOtpr', 'numCont', 'dateOtpr', 'numWag', 'npoezd',
        {name:'packId', type:'int'},
        {name: 'trans', type: 'string', persist: false},
        {name:'routeId', type:'int'},
        {name: 'messCount', type: 'int', persist: false},
        {name: 'newMessCount', type: 'int', persist: false},
        {name:'newDoc', type:'int'}

    ]
});