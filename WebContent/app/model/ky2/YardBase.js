Ext.define('TK.model.ky2.YardBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'x', type: 'int', useNull: true},
        {name: 'y', type: 'int', useNull: true},
        {name: 'z', type: 'int', useNull: true},
        {name: 'konts'},
        {name: 'hid', type: 'int', useNull: true},
        {name: 'sector.hid', type: 'int', useNull: true},
        {name: 'sector.name', persist: false},
        {name: 'trans', type: 'string', persist: false},
        {name: 'packId', type: 'int', useNull: true},
        {name: 'messCount', type: 'int', persist: false},
        {name: 'newMessCount', type: 'int', persist: false}
    ],
    belongsTo: [{
        model: 'TK.model.ky.YardSector',
        getterName: 'getSector',
        setterName: 'setSector',
        associationKey: 'sector',
        primaryKey: 'hid',
        foreignKey: 'sector.hid'
    }],

    idProperty: 'hid',

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Yard.do',
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
        },
        encodeFilters: function (filters) {
            var filtersForServer = [],
                length = filters.length;

            for (var i = 0; i < length; i++) {
                filtersForServer[i] = {
                    property: filters[i].property.split('.')[0],
                    value: filters[i].value
                };
            }
            return Ext.encode(filtersForServer);
        }
    }
});