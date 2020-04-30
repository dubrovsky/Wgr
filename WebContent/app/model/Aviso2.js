Ext.define('TK.model.Aviso2', {
    extend: 'Ext.data.Model',

    fields: [
        'dattr', 'altered', 'un', 'status',
        'numClaim', 'profile', 'konts', 'gng', 'avizo_num', 'locked', 'comments', 'npoezd',
        'g1', 'g4', 'graf', 'src',
        {name: 'hid', type: 'int'},
        {name: 'ready', type: 'int'},
        'type',
        {name: 'trans', type: 'string', persist: false},
        {name: 'messCount', type: 'int', persist: false},
        {name: 'newMessCount', type: 'int', persist: false},
        {name: 'amount', type: 'int'},
        {name: 'packId', type: 'int'},
        {name: 'routeId', type: 'int'}
    ]
});