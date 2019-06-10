Ext.define('TK.model.ky.KontInAvtoIntoDir', {
    extend: 'TK.model.ky.KontAbstract',

    fields: [
        {name:'avtoInto.hid', type:'int', persist: false},
        {name:'avtoInto.no_avto', type:'string', persist: false}
    ]
});