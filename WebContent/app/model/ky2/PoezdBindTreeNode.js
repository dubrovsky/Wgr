Ext.define('TK.model.ky2.PoezdBindTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'poezdHid', type: 'int', useNull: true},
        {name: 'vagHid', type: 'int', useNull: true},
        {name: 'contHid', type: 'int', useNull: true},
        {name: 'yardHid', type: 'int', useNull: true},
        {name: 'yardSectorHid', type: 'int', useNull: true},
        {name: 'vagsInPoezd', type: 'int'},
        {name: 'contsInPoezd', type: 'int'},

        {name: 'sort', type: 'int'},

        // poezd
        {name: 'direction', type: 'int', useNull: true},
        {name: 'nppr', type: 'string'},
        {name: 'npprm', type: 'string'},

        // vag
        {name: 'nvag', type: 'string'},
        {name: 'podSila', type: 'string'},
        {name: 'masTar', type: 'string'},
        {name: 'kolOs', type: 'string'},
        {name: 'sobstv', type: 'string'},
        {name: 'otpravka', type: 'string', useNull: true, defaultValue: null},
        {name: 'updated', type: 'boolean', defaultValue: false},

        // kont
        {name: 'nkon', type: 'string'},
        {name: 'massa_tar', type: 'string'},
        {name: 'massa_brutto', type: 'string'},
        {name: 'massa_brutto_all', type: 'string'},
        {name: 'pod_sila', type: 'string'},
        {name: 'vid', type: 'string'},

        // gruz
        'kgvn',

        // sector
        {name: 'name', type: 'string'},
        {name: 'typeView', type: 'int'},

        // yard
        {name: 'x', type: 'int', useNull: true},
        {name: 'y', type: 'int', useNull: true},
        {name: 'z', type: 'int', useNull: true},
        {name: 'h', type: 'string'},
        {name: 'contsInYardSector', type: 'int'},
        {name: 'placesInYardSector', type: 'int'},

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