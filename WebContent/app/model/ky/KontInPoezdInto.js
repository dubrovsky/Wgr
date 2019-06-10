Ext.define('TK.model.ky.KontInPoezdInto', {
    extend: 'TK.model.ky.KontInTranspInto',

    fields: [
        {name:'vagonInto.hid', type:'int', useNull:true},
        {name:'poezdInto.hid', type:'int', useNull:true}
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzInPoezdInto'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombInPoezdInto'
    }],

    belongsTo:[{
        model:'TK.model.ky.VagonInto',
        getterName:'getVagon',
        setterName:'setVagon',
        associationKey:'vagonInto',
        primaryKey:'hid',
        foreignKey:'vagonInto.hid'
    },{
        model:'TK.model.ky.PoezdInto',
        getterName:'getPoezd',
        setterName:'setPoezd',
        associationKey:'poezdInto',
        primaryKey:'hid',
        foreignKey:'poezdInto.hid'
    }]
});