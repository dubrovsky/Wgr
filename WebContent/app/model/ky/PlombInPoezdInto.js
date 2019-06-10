Ext.define('TK.model.ky.PlombInPoezdInto', {
    extend: 'TK.model.ky.PlombBase',

    belongsTo:[{
        model:'TK.model.ky.KontInPoezdInto',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});