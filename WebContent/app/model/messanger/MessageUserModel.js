Ext.define('TK.model.messanger.MessageUserModel', {
    extend: 'Ext.data.TreeModel',

    fields: [
        'groupId',
        'un',
        // tree node fields
        'iconCls',
        'who',
        {name: 'text'},
        {name: 'leaf', type: 'boolean'},
        {name: 'checked', type: 'boolean'},
        {name: 'expanded', type: 'boolean'}
    ]
});