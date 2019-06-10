Ext.define('TK.model.ky.PlombInPoezdOut', {
    extend: 'TK.model.ky.PlombBase',

    belongsTo:[{
        model:'TK.model.ky.KontInPoezdOut',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});