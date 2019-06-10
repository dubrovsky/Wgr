Ext.define('TK.model.ky.NsiKont', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'nkont', 'yearbuild', 'type', 'sizeFoot','naim_sob',
        {name:'massaTar', type:'int', useNull:true},
        {name:'podSila', type:'int', useNull:true},
        {name:'vol', type:'float', useNull:true},
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
        url: 'ky/secure/NsiKont.do',
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