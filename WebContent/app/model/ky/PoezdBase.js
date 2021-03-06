Ext.define('TK.model.ky.PoezdBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'dattr', type: 'string', persist: false},
        {name:'altered', type: 'string', persist: false},
        {name:'un', type: 'string', persist: false},

        {name:'hid', type:'int', useNull:true},
        {name:'nppr', type: 'string', useNull:true},
        {name:'npprm', type: 'string', useNull:true},

        {name:'koleya', type:'int'},
        {name:'direction', type:'int'},
        {name:'route.hid', type:'int', useNull:true},
        {name:'packDoc.hid', type:'int', useNull:true}
    ],
    belongsTo:[{
        model:'TK.model.Route',
        getterName:'getRoute',
        setterName:'setRoute',
        associationKey:'route',
        primaryKey:'hid',
        foreignKey:'route.hid'
    },{
        model:'TK.model.PackDoc',
        getterName:'getPackDoc',
        setterName:'setPackDoc',
        associationKey:'packDoc',
        primaryKey:'hid',
        foreignKey:'packDoc.hid'
    }],

    idProperty:'hid',

    proxy: {
        type: 'ajax',
        url: 'ky/secure/Poezd.do',
        idParam:'hid',
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
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});