Ext.define('TK.model.ky2.PoezdInto', {
    extend: 'TK.model.ky2.PoezdBase',

    fields: [
        {name:'dprb', type: 'string', persist: false},
        {name:'dprbDate', type: 'string', useNull:true},
        {name:'dprbTime', type: 'string', useNull:true, defaultValue: null},
        {name:'punkt_otpr', type: 'string'},
        {name:'punkt_nazn', type: 'string'},
        {name:'gruzotpr', type: 'string'}
    ]/*,
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'poezdInto.hid',
        associationKey: 'kontsInto',
        name: 'konts',
        model: 'TK.model.ky.KontInPoezdInto'
    },{
        primaryKey:'hid',
        foreignKey: 'poezd.hid',
        associationKey: 'vagons',
        name: 'vagons',
        model: 'TK.model.ky.VagonInto'
    }]*/
});