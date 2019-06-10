Ext.define('TK.model.ky.KontInTranspOut', {
    extend: 'TK.model.ky.KontInTransp',

    fields: [
        {name:'dotpDate', type: 'string', useNull:true},
        {name:'dotpTime', type: 'string', useNull:true, defaultValue: null},

        {name:'avtoInto.hid', type:'int', useNull:true, persist: false},
        {name:'avtoInto.no_avto', type:'string', useNull:true, persist: false},

        {name:'vagonInto.hid', type:'int', useNull:true, persist: false},
        {name:'vagonInto.nvag', type:'string', useNull:true, persist: false},
        {name:'poezdInto.hid', type:'int', useNull:true, persist: false},
        {name:'poezdInto.nppr', type:'string', useNull:true, persist: false}
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
    }]
});