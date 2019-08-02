Ext.define('TK.model.ky2.AvtoOut', {
    extend: 'TK.model.ky2.AvtoBase',

    fields: [
        {name:'dotp', type: 'string', persist: false},
        {name:'dotpDate', type: 'string', useNull:true},
        {name:'dotpTime', type: 'string', useNull:true, defaultValue: null}
    ]
    // hasMany:[{
    //     primaryKey:'hid',
    //     foreignKey: 'avtoOut.hid',
    //     associationKey: 'kontsOut',
    //     name: 'konts',
    //     model: 'TK.model.ky.KontInAvtoOut'
    // }]
});