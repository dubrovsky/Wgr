Ext.define('TK.model.ky.YardBase', {
    extend: 'Ext.data.Model',

    fields: [

        {name:'x', type:'int', useNull:true},
        {name:'y', type:'int', useNull:true},
        {name:'z', type:'int', useNull:true},

        {name:'hid', type:'int', useNull:true},

        {name:'sector.hid', type:'int', useNull:true},
        {name:'sector.name', persist: false}

    ],
    belongsTo:[{
        model:'TK.model.ky.YardSector',
        getterName:'getSector',
        setterName:'setSector',
        associationKey:'sector',
        primaryKey:'hid',
        foreignKey:'sector.hid'
    }],

    idProperty:'hid',

    proxy: {
        type: 'ajax',
        url: 'ky/secure/Yard.do',
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
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}},
        encodeFilters: function(filters) {
             var min = [],
             length = filters.length,
             i = 0;

             for (; i < length; i++) {
             min[i] = {
//                 source: filters[i].property.split('.')[0],
                 property: filters[i].property.split('.')[0],
                 value   : filters[i].value
             };
             }
             return Ext.encode(min);

         }
    }
});