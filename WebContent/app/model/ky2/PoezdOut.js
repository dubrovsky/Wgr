Ext.define('TK.model.ky2.PoezdOut', {
    extend: 'TK.model.ky2.PoezdBase',

    fields: [
        {name:'dotp', type: 'string', persist: false},
        {name:'dotpDate', type: 'string', useNull:true},
        {name:'dotpTime', type: 'string', useNull:true, defaultValue: null},
        {name:'dpogr', type: 'string', persist: false},
        {name:'dpogrDate', type: 'string', useNull:true},
        {name:'dpogrTime', type: 'string', useNull:true, defaultValue: null},
        {name:'duved', type: 'string', persist: false},
        {name:'duvedDate', type: 'string', useNull:true},
        {name:'duvedTime', type: 'string', useNull:true, defaultValue: null}
    ]/*,
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
    }]*/
});