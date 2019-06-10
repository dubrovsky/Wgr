Ext.define('TK.model.ky.VagonOut', {
    extend: 'TK.model.ky.VagonBase',
    idProperty:'hid',
    fields: [
        {name:'dotp', type: 'string', persist: false},
        {name:'dotpDate', type: 'string', useNull:true},
        {name:'dotpTime', type: 'string', useNull:true, defaultValue: null}
    ],
    belongsTo:[{
        model:'TK.model.ky.PoezdOut',
        getterName:'getPoezd',
        setterName:'setPoezd',
        associationKey:'poezd',
        primaryKey:'hid',
        foreignKey:'poezd.hid'
    }],
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'vagonOut.hid',
        associationKey: 'kontsOut',
        name: 'konts',
        model: 'TK.model.ky.KontInPoezdOut'
    }]
});