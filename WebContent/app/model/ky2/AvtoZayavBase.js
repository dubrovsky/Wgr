Ext.define('TK.model.ky2.AvtoZayavBase', {
    extend: 'Ext.data.Model',

    requires: [
        'TK.Utils',
        'TK.model.PackDoc',
        'TK.model.Route',
        'TK.model.ky2.Client'
    ],


    fields: [
        {name: 'dattr', type: 'string', persist: false},
        {name: 'altered', type: 'string', persist: false},
        {name: 'un', type: 'string', persist: false},
        {name: 'trans', type: 'string', persist: false},

        {name: 'hid', type: 'int', useNull: true},

        {name: 'no_zayav', type: 'string'},
        {name:'noZayav', mapping:'no_zayav', type: 'string'},
        {name: 'kontCount', type: 'int'},
        {name: 'kontCountDone', type: 'int'},

        // {name:'transport', type: 'string'},
        {name: 'direction', type: 'int'},
        {name: 'no_avto', type: 'string'},
        {name: 'no_trail', type: 'string'},
        {name: 'driver_fio', type: 'string'},
        {name: 'driver_pasp', type: 'string'},
        {name: 'dateZayav', type: 'string', persist: false},
        {name: 'prim', type: 'string'},
        {name: 'zayavDate', type: 'string', useNull: true},
        {name: 'zayavTime', type: 'string', useNull: true, defaultValue: null},
        {name: 'client.hid', type: 'int', useNull: true},
        {name: 'client.sname', type: 'string', useNull: true},
        {name:'gruzotpr', mapping:'client.sname', type: 'string', useNull: true},
        {name: 'client_sname', type: 'string', useNull: true},
        {name: 'kont_s', type: 'string', useNull: true},
        {name: 'repeatNkon', type: 'int'},
        {name: 'isZayavDone', type: 'int'},
        {name: 'route.hid', type: 'int', useNull: true},
        {name: 'routeId', type: 'int', useNull: true},
        {name: 'packDoc.hid', type: 'int', useNull: true},
        {name: 'packId', type: 'int', useNull: true},
        // {name: 'konts' },
        {name: 'client'},
        {name: 'messCount', type: 'int', persist: false},
        {name: 'newMessCount', type: 'int', persist: false}

    ],
    belongsTo: [{
        model: 'TK.model.Route',
        getterName: 'getRoute',
        setterName: 'setRoute',
        associationKey: 'route',
        primaryKey: 'hid',
        foreignKey: 'route.hid'
    }, {
        model: 'TK.model.PackDoc',
        getterName: 'getPackDoc',
        setterName: 'setPackDoc',
        associationKey: 'packDoc',
        primaryKey: 'hid',
        foreignKey: 'packDoc.hid'
    }, {
        model: 'TK.model.ky2.Client',
        getterName: 'getClient',
        setterName: 'setClient',
        associationKey: 'client',
        primaryKey: 'hid',
        foreignKey: 'client.hid'
    }],

    idProperty: 'hid',

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/AvtoZayav.do',
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
    }
});