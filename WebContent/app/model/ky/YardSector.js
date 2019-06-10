Ext.define('TK.model.ky.YardSector', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'name',
        'descr'
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
    ]
});