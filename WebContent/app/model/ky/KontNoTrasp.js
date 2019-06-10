Ext.define('TK.model.ky.KontNoTrasp', {
    extend: 'TK.model.ky.KontBase',

    fields: [
        //{name:'dotp', type: 'string', persist: false},

        /*{name:'yard.x', type:'int', useNull:true, persist: false},
        {name:'yard.y', type:'int', useNull:true, persist: false},
        {name:'yard.z', type:'int', useNull:true, persist: false},
        {name:'yard.sector.name', type:'string', useNull:true, persist: false},*/

       /* {name:'vagonOut.hid', type:'int', useNull:true, persist: false},
        {name:'vagonOut.nvag', type:'int', useNull:true, persist: false},
        {name:'poezdOut.hid', type:'int', useNull:true, persist: false},
        {name:'poezdOut.nppr', type:'int', useNull:true, persist: false}*/
    ],

    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'gruzs',
        name: 'gruzs',
        model: 'TK.model.ky.GruzNoTrasp'
    },{
        primaryKey:'hid',
        foreignKey: 'kont.hid',
        associationKey: 'plombs',
        name: 'plombs',
        model: 'TK.model.ky.PlombNoTrasp'
    }]/*,

    belongsTo:[{
        model:'TK.model.ky.VagonOut',
        getterName:'getVagonOut',
        setterName:'setVagonOut',
        associationKey:'vagonOut',
        primaryKey:'hid',
        foreignKey:'vagonOut.hid'
    },{
        model:'TK.model.ky.PoezdOut',
        getterName:'getPoezdOut',
        setterName:'setPoezdOut',
        associationKey:'poezdOut',
        primaryKey:'hid',
        foreignKey:'poezdOut.hid'
    }]*/
});