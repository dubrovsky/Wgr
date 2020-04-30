Ext.define('TK.model.PlombsTreeNode', {
    extend: 'Ext.data.TreeModel',
    requires: ['Ext.data.SequentialIdGenerator'],
    idgen: 'sequential',
    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},
        'type',
        'znak',
        'id',
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
        contObj: undefined,
        vagObj: undefined
    },
    proxy: {
        type: 'memory'
    }
});