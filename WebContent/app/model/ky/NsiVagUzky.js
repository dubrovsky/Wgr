Ext.define('TK.model.ky.NsiVagUzky', {
    extend: 'Ext.data.Model',

    requires: [
        'TK.Utils',
        'TK.model.ky.NsiOwner'
    ],

    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'nvaguf', 'nvagu', 'dexpB', 'dexpEnd', 'podtv', 'koddor', 'kodadm', 'sobs', 'vidkod', 'aktnvagu', 'kodownvag', 'dparkIn',
        'osi', 'razvor', 'mnetvag', 'grpodvag', 'dlvag', 'typevag', 'dLastrem', 'dPlanrem',
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
        url: 'ky/secure/NsiVagUzky.do',
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