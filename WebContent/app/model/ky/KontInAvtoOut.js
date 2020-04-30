Ext.define('TK.model.ky.KontInAvtoOut', {
    extend: 'TK.model.ky.KontInTranspOut',

    requires: [
        'TK.model.ky.AvtoOut',
        'TK.model.ky.GruzInAvtoOut',
        'TK.model.ky.PlombInAvtoOut'
    ],


    fields: [
        {name:'avtoOut.hid', type:'int', useNull:true}
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzInAvtoOut'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombInAvtoOut'
    }],

    belongsTo:[{
        model:'TK.model.ky.AvtoOut',
        getterName:'getAvto',
        setterName:'setAvto',
        associationKey:'avtoOut',
        primaryKey:'hid',
        foreignKey:'avtoOut.hid'
    }]
});