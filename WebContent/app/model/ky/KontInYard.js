Ext.define('TK.model.ky.KontInYard', {
    extend: 'TK.model.ky.KontBase',

    fields: [
        {name:'dyardDate', type: 'string', useNull:true},
        {name:'dyardTime', type: 'string', useNull:true, defaultValue: null},
        {name:'yard.hid', type:'int', useNull:true, persist: true}
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzInYard'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombInYard'
    }]
});