Ext.define('TK.model.ky.KontIntoDir', {
    extend: 'TK.model.ky.KontAbstract',

    fields: [
        {name:'poezdInto.hid', type:'int', persist:false},
        {name:'poezdInto.nppr', persist:false}
    ]
});