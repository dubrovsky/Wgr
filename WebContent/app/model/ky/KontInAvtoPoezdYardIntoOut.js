Ext.define('TK.model.ky.KontInAvtoPoezdYardIntoOut', {
    extend: 'TK.model.ky.KontInTransp',

    fields: [
        {name:'dprbDate', type: 'string', useNull:true},
        {name:'dprbTime', type: 'string', useNull:true, defaultValue: null},

        {name:'vagonInto.hid', type:'int', useNull:true, persist: false},
        {name:'vagonInto.nvag', type:'string', useNull:true, persist: false},
        {name:'poezdInto.hid', type:'int', useNull:true, persist: false},
        {name:'poezdInto.nppr', type:'string', useNull:true, persist: false},

        {name:'vagonOut.hid', type:'int', useNull:true, persist: false},
        {name:'vagonOut.nvag', type:'string', useNull:true, persist: false},
        {name:'poezdOut.hid', type:'int', useNull:true, persist: false},
        {name:'poezdOut.nppr', type:'string', useNull:true, persist: false},

        {name:'avtoInto.hid', type:'int', useNull:true, persist: false},
        {name:'avtoInto.no_avto', type:'string', useNull:true, persist: false},
        {name:'avtoOut.hid', type:'int', useNull:true, persist: false},
        {name:'avtoOut.no_avto', type:'string', useNull:true, persist: false}
    ],

    belongsTo:[{
        model:'TK.model.ky.VagonInto',
        getterName:'getVagonInto',
        setterName:'setVagonInto',
        associationKey:'vagonInto',
        primaryKey:'hid',
        foreignKey:'vagonInto.hid'
    },{
        model:'TK.model.ky.PoezdInto',
        getterName:'getPoezdInto',
        setterName:'setPoezdInto',
        associationKey:'poezdInto',
        primaryKey:'hid',
        foreignKey:'poezdInto.hid'
    },{
        model:'TK.model.ky.AvtoInto',
        getterName:'getAvtoInto',
        setterName:'setAvtoInto',
        associationKey:'avtoInto',
        primaryKey:'hid',
        foreignKey:'avtoInto.hid'
    },{
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