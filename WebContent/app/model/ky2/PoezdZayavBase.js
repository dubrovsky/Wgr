Ext.define('TK.model.ky2.PoezdZayavBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'dattr', type: 'string', persist: false},
        {name: 'altered', type: 'string', persist: false},
        {name: 'un', type: 'string', persist: false},

        {name: 'hid', type: 'int', useNull: true},

        {name: 'vagCount', type: 'int'},
        {name: 'kontCount', type: 'int'},
        {name: 'kontCountDone', type: 'int'},
        {name: 'noZayav', type: 'string'},
        {name: 'nppr', type: 'string'},
        {name: 'npprm', type: 'string'},
        {name: 'gruzotpr', type: 'string'},
        {name: 'transport', type: 'string'},
        {name: 'direction', type: 'int'},
        {name: 'dateZayav', type: 'string', persist: false},
        {name: 'zayavDate', type: 'string', useNull: true},
        {name: 'zayavTime', type: 'string', useNull: true, defaultValue: null},

        {name: 'route.hid', type: 'int', useNull: true},
        {name: 'packDoc.hid', type: 'int', useNull: true},
        {name: 'client.hid', type: 'int', useNull: true},
        {name: 'client.sname', type: 'string', useNull: true}
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
        url: 'ky2/secure/PoezdZayav.do',
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