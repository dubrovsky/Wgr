Ext.define('TK.model.ky.NsiVagShir', {
    extend: 'Ext.data.Model',

    requires: [
        'TK.Utils',
        'TK.model.ky.NsiOwner'
    ],

    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'nvag', 'typeNo', 'yearB', 'factoryB', 'modelvag', 'dlvag', 'tara', 'gp', 'okpoOwn', 'nown', 'okpoArend', 'narend',
        'datePlanrem', 'prim', 'groupvag', 'owntypen', 'dparkIn', 'dparkOut', 'dateBVag', 'dProbegV', 'ostProbeg',
        {name:'owner.hid', type:'int', useNull:true}
    ],
    belongsTo:[{
        model:'TK.model.ky.NsiOwner',
        getterName:'getOwner',
        setterName:'setOwner',
        associationKey:'owner',
        primaryKey:'hid',
        foreignKey:'owner.hid'
    }],
    proxy: {
        type: 'ajax',
        url: 'ky/secure/NsiVagShir.do',
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
        //extraParams: {action: 'list'},
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});