Ext.define('TK.model.VgCtGrTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},

        // vag
        'nvag', 'vagOtm','klientName','rod',
        {name: 'grPod', type: 'float', useNull: true},
        {name: 'taraVag', type: 'float', useNull: true},
        {name: 'kolOs', type: 'float', useNull: true},

        // kont
        'notes',
        'utiN',
        {name: 'sizeFoot', type: 'int', useNull: true},
        {name: 'taraKont', type: 'int', useNull: true},
        {name: 'sizeMm', type: 'int', useNull: true},
        {name: 'grpod', type: 'float', useNull: true},
        'utiType',

        // gruz
        'kgvn',
        'nzgr',
        'nzgrEu',
        'ekgvn',
        'enzgr',
        'upakForeign',
        'upak',
        {name: 'massa', type: 'float', useNull: true},
        {name: 'places', type: 'int', useNull: true},
        {name: 'ohr', type: 'boolean'},

        // danGruz
        'carDName',
        'carDNameDe',
        'codDanger',
        'numOon',
        'numOonDe',
        'clazz',
        'dangSign',
        'groupPack',
        'emergenC',
        'stampDName',
        'dopInfo',

        // tree node fields
        'who',
        'iconCls',
        {name: 'text', type: 'string', convert: function(v, rec){
             return v ? v : '...';
        }},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean'}
    ],

    config: {
        docs9Obj: undefined,
        plombsObj: undefined
    }
});