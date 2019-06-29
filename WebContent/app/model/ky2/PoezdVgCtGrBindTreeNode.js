Ext.define('TK.model.ky2.PoezdVgCtGrBindTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},

        {name: 'sort', type: 'int'},

        // poezd
        {name:'direction', type:'int'},
        {name:'nppr', type:'string'},

        // vag
        {name: 'nvag', type: 'string'},
        {name: 'otpravka', type: 'string', useNull: true, defaultValue: null},


        // kont
        {name: 'nkon', type: 'string'},

        // gruz
        'kgvn',
        'nzgr',

        // tree node fields
        'who',
        'iconCls',
        {
            name: 'text', type: 'string', convert: function (v, rec) {
                return v ? v : '...';
            }
        },
        {name: 'leaf', type: 'boolean'},
        {name: 'expanded', type: 'boolean'}
    ]
});