Ext.define('TK.model.FileInf', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr',
        {name:'hid', type:'int'},
        'type','nkon', 'numOtpr', 'numCont', 'dateOtpr',
        {name:'packId', type:'int'},
        {name:'routeId', type:'int'}
    ]
});