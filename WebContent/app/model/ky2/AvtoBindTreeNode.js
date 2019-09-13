Ext.define('TK.model.ky2.AvtoBindTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'poezdHid', type: 'int', useNull: true},
        {name: 'avtoHid', type: 'int', useNull: true},
        {name: 'vagHid', type: 'int', useNull: true},
        {name: 'contHid', type: 'int', useNull: true},
        {name: 'yardHid', type: 'int', useNull: true},
        {name: 'yardSectorHid', type: 'int', useNull: true},

        {name: 'sort', type: 'int'},

        // avto
        {name:'direction', type:'int'},
        {name:'no_avto', type:'string'},
        {name:'hid_avto', type:'int'},

        // vag
        {name: 'nvag', type: 'string'},
        {name: 'otpravka', type: 'string', useNull: true, defaultValue: null},


        // kont
        {name: 'nkon', type: 'string'},
        {name: 'massa_tar', type: 'string'},
        {name: 'massa_brutto', type: 'string'},
        {name: 'massa_brutto_all', type: 'string'},
        {name: 'pod_sila', type: 'string'},
        {name: 'vid', type: 'string'},

        // gruz
        'kgvn',
        // 'nzgr',

        // sector
        {name:'name', type:'string'},

        // yard
        {name:'x', type:'int', useNull: true},
        {name:'y', type:'int', useNull: true},
        {name:'z', type:'int', useNull: true},
        {name:'contsInYardSector', type:'int'},
        {name:'placesInYardSector', type:'int'},

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