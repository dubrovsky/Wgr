Ext.define('TK.model.ky2.AvtoBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'dattr', type: 'string', persist: false},
        {name:'altered', type: 'string', persist: false},
        {name:'un', type: 'string', persist: false},

        {name:'hid', type:'int', useNull:true},

        {name:'type_avto', type: 'string'},
        {name:'client', type: 'string'},
        {name:'no_avto', type: 'string'},
        {name:'no_trail', type: 'string'},
        {name:'otp_cargo', type: 'string'},
        {name:'pol_cargo', type: 'string'},
        {name:'departure', type: 'string'},
        {name:'destination', type: 'string'},
        {name:'driver_nm', type: 'string'},
        {name:'prim_avto', type: 'string'},
        {name:'direction', type:'int'},
        {name:'naim_sob', type: 'string'},
        {name:'route.hid', type:'int', useNull:true},
        {name:'packDoc.hid', type:'int', useNull:true},
        {name:'owner.hid', type:'int', useNull:true}
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
    },{
        model:'TK.model.ky.NsiOwner',
        getterName:'getOwner',
        setterName:'setOwner',
        associationKey:'owner',
        primaryKey:'hid',
        foreignKey:'owner.hid'
    }],

    idProperty:'hid',

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Avto.do',
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