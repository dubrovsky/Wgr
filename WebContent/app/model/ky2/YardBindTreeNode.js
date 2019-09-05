Ext.define('TK.model.ky2.YardBindTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'yardHid', type: 'int', useNull: true},
        {name: 'yardSectorHid', type: 'int', useNull: true},
        {name: 'sort', type: 'int'},

        // sector
        {name:'name', type:'string'},

        // yard
        {name:'x', type:'int'},
        {name:'y', type:'int'},
        {name:'z', type:'int'},
        {name:'contsInYardSector', type:'int'},
        {name:'placesInYardSector', type:'int'},

        // kont
        {name: 'nkon', type: 'string'},
        {name: 'massa_tar', type: 'string'},
        {name: 'massa_brutto', type: 'string'},
        {name: 'massa_brutto_all', type: 'string'},
        {name: 'pod_sila', type: 'string'},
        {name: 'vid', type: 'string'},

        // gruz
        'kgvn',

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