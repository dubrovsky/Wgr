Ext.define('TK.model.ky.KontInTranspInto', {
    extend: 'TK.model.ky.KontInTransp',

    fields: [
        {name:'dprbDate', type: 'string', useNull:true},
        {name:'dprbTime', type: 'string', useNull:true, defaultValue: null},

        {name:'vagonOut.hid', type:'int', useNull:true, persist: false},
        {name:'vagonOut.nvag', type:'string', useNull:true, persist: false},
        {name:'poezdOut.hid', type:'int', useNull:true, persist: false},
        {name:'poezdOut.nppr', type:'string', useNull:true, persist: false},

        {name:'avtoOut.hid', type:'int', useNull:true, persist: false},
        {name:'avtoOut.no_avto', type:'string', useNull:true, persist: false}
    ],

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
    },{
        model:'TK.model.ky.AvtoOut',
        getterName:'getAvtoOut',
        setterName:'setAvtoOut',
        associationKey:'avtoOut',
        primaryKey:'hid',
        foreignKey:'avtoOut.hid'
    }]
});