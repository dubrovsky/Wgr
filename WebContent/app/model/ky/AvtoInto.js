Ext.define('TK.model.ky.AvtoInto', {
    extend: 'TK.model.ky.AvtoBase',

    fields: [
        {name:'dprb', type: 'string', persist: false},
        {name:'dprbDate', type: 'string', useNull:true},
        {name:'dprbTime', type: 'string', useNull:true, defaultValue: null}
    ],
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'avtoInto.hid',
        associationKey: 'kontsInto',
        name: 'konts',
        model: 'TK.model.ky.KontInAvtoInto'
    }]
});