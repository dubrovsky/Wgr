Ext.define('TK.model.ky.KontInAvtoInto', {
    extend: 'TK.model.ky.KontInTranspInto',

    fields: [
        {name:'avtoInto.hid', type:'int', useNull:true}
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzInAvtoInto'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombInAvtoInto'
    }],

    belongsTo:[{
        model:'TK.model.ky.AvtoInto',
        getterName:'getAvto',
        setterName:'setAvto',
        associationKey:'avtoInto',
        primaryKey:'hid',
        foreignKey:'avtoInto.hid'
    }]
});