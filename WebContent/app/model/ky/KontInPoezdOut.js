Ext.define('TK.model.ky.KontInPoezdOut', {
    extend: 'TK.model.ky.KontInTranspOut',

    fields: [
        {name:'vagonOut.hid', type:'int', useNull:true},
        {name:'poezdOut.hid', type:'int', useNull:true}
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzInPoezdOut'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombInPoezdOut'
    }],

    belongsTo:[{
        model:'TK.model.ky.VagonOut',
        getterName:'getVagon',
        setterName:'setVagon',
        associationKey:'vagonOut',
        primaryKey:'hid',
        foreignKey:'vagonOut.hid'
    },{
        model:'TK.model.ky.PoezdOut',
        getterName:'getPoezd',
        setterName:'setPoezd',
        associationKey:'poezdOut',
        primaryKey:'hid',
        foreignKey:'poezdOut.hid'
    }]
});