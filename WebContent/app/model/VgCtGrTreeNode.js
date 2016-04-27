Ext.define('TK.model.VgCtGrTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},

        // vag
        'nvag',
        {name: 'grPod', type: 'float'},
        {name: 'taraVag', type: 'float'},
        {name: 'kolOs', type: 'float'},

        // kont
        'notes',
        'utiN',
        {name: 'sizeFoot', type: 'int'},
        {name: 'taraKont', type: 'int'},
        {name: 'sizeMm', type: 'int'},

        // gruz
        'kgvn',
        'nzgr',
        'nzgrEu',
        'ekgvn',
        'enzgr',
        'upakForeign',
        'upak',
        {name: 'massa', type: 'float'},
        {name: 'places', type: 'int'},
        {name: 'ohr', type: 'boolean'},

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