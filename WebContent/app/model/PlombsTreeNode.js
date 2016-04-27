Ext.define('TK.model.PlombsTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},
        'type',
        'znak',
        {name: 'kpl', type: 'int', useNull: true},

        'who',
        // tree node fields
        'iconCls',
        {name: 'text', type: 'string', convert: function(v, rec){
            return v ? v : '...';
        }},
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean'}
    ],

    config: {
        contObj: undefined
    }
});