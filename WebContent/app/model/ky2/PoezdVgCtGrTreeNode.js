Ext.define('TK.model.ky2.PoezdVgCtGrTreeNode', {
    extend: 'Ext.data.TreeModel',

    fields: [
        {name: 'hid', type: 'int', useNull: true},
        {name: 'clientHid', type: 'int', useNull: true},
        {name: 'routeHid', type: 'int', useNull: true},

        {name: 'sort', type: 'int'},

        // poezd
        {name: 'direction', type: 'int'},

        // vag
        {name: 'nvag', type: 'string'},
        {name: 'otpravka', type: 'string', useNull: true, defaultValue: null},
        {name: 'dprb', type: 'string', useNull: true},
        {name: 'dotp', type: 'string', useNull: true},
        {name: 'line', type: 'string'},
        {name: 'kpv', type: 'string'},
        {name: 'podSila', type: 'float', useNull: true},
        {name: 'kolOs', type: 'int', useNull: true},
        {name: 'masTar', type: 'float', useNull: true},
        {name: 'foot', type: 'string'},
        {name: 'sobstv', type: 'string'},
        {name: 'poruz', type: 'boolean'},
        {name: 'defective', type: 'boolean'},
        {name: 'bortDate', type: 'string'},
        {name: 'probeg', type: 'int', useNull: true},
        {name: 'plan_rem', type: 'string'},
        {name: 'reviz', type: 'string'},
        {name: 'type_no', type: 'int', useNull: true},
        {name: 'dlina', type: 'float', useNull: true},
        {name: 'model', type: 'string'},
        {name: 'prim', type: 'string'},

        // kont
        {name: 'nkon', type: 'string'},
        {name: 'notp', type: 'string'},
        {name: 'dprbDate', type: 'string', useNull: true},
        {name: 'dprbTime', type: 'string', useNull: true, defaultValue: null},
        {name: 'dotpDate', type: 'string', useNull: true},
        {name: 'dotpTime', type: 'string', useNull: true, defaultValue: null},
        {name: 'dprb', type: 'string', useNull: true},
        {name: 'poruz', type: 'boolean'},
        {name: 'massa_tar', type: 'float', useNull: true},
        {name: 'massa_brutto', type: 'float', useNull: true},
        {name: 'massa_brutto_all', type: 'float', useNull: true},
        {name: 'pod_sila', type: 'float', useNull: true},
        {name: 'type', type: 'int', useNull: true},
        {name: 'vid', type: 'string'},
        {name: 'prizn_sob', type: 'string'},
        {name: 'naim_sob', type: 'string'},
        {name: 'gruzotpr', type: 'string'},
        // {name: 'punkt_otpr', type: 'string'},
        // {name: 'punkt_nazn', type: 'string'},
        // {name: 'teh_obsl', type: 'string'},
        {name: 'zayav_in', type: 'string'},
        {name: 'zayav_out', type: 'string'},
        {name: 'prim', type: 'string'},
        {name: 'isZayav', type: 'int', defaultValue: 1},

        // gruz
        'kgvn',
        'nzgr',
        'upak',
        {name: 'places', type: 'int', useNull: true},
        {name: 'massa', type: 'int', useNull: true},

        // plomb
        'znak',
        'station',
        {name: 'kpl', type: 'int', useNull: true},

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
    ]/*,,

    idProperty: 'hid' // if present, server side call will be made
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/PoezdVgCtGr.do',
        idParam: 'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        listeners: {
            exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }
        }
    }*/
});