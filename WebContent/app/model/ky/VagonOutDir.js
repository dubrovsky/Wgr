Ext.define('TK.model.ky.VagonOutDir', {
    extend: 'TK.model.ky.VagonBase',
    idProperty:'hid',
    fields: [
        {name:'poezd.hid', type: 'string', persist: false},
        {name:'poezd.nppr', type: 'string', persist: false}
    ],
    belongsTo:[{
        model:'TK.model.ky.PoezdOut',
        getterName:'getPoezd',
        setterName:'setPoezd',
        associationKey:'poezd',
        primaryKey:'hid',
        foreignKey:'poezd.hid'
    }]
});