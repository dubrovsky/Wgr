Ext.define('TK.model.ky.VagonInto', {
    extend: 'TK.model.ky.VagonBase',
    idProperty:'hid',
    fields: [
        {name:'dprb', type: 'string', persist: false},
        {name:'dprbDate', type: 'string', useNull:true},
        {name:'dprbTime', type: 'string', useNull:true, defaultValue: null}
    ],
    belongsTo:[{
        model:'TK.model.ky.PoezdInto',
        getterName:'getPoezd',
        setterName:'setPoezd',
        associationKey:'poezd',
        primaryKey:'hid',
        foreignKey:'poezd.hid'
    }],
    hasMany:[{
        primaryKey:'hid',
        foreignKey: 'vagonInto.hid',
        associationKey: 'kontsInto',
        name: 'konts',
        model: 'TK.model.ky.KontInPoezdInto'
    }]
});