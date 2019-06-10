Ext.define('TK.model.ky.PoezdOut', {
    extend: 'TK.model.ky.PoezdBase',

    fields: [
        {name:'dotp', type: 'string', persist: false},
        {name:'dotpDate', type: 'string', useNull:true},
        {name:'dotpTime', type: 'string', useNull:true, defaultValue: null}
    ],
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'poezdOut.hid',
        associationKey: 'kontsOut',
        name: 'konts',
        model: 'TK.model.ky.KontInPoezdOut'
    },{
        primaryKey:'hid',
        foreignKey: 'poezd.hid',
        associationKey: 'vagons',
        name: 'vagons',
        model: 'TK.model.ky.VagonOut'
    }]
});