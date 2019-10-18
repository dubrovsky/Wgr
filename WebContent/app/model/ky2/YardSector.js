Ext.define('TK.model.ky2.YardSector', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'name',
        'descr',
        'groups',
        'routeHid'
    ],
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'sector.hid',
        associationKey: 'yards',
        name: 'yards',
        model: 'TK.model.ky.Yard'
    }],
    validations: [
        {type: 'length', field: 'name', max: 20},
        {type: 'length', field: 'descr', max: 100}
    ],
    proxy: {
        type: 'ajax',
        url: 'ky2/secure/YardSector.do',
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
        listeners: {exception: function (proxy, response, operation) {
                TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
            }}
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
});