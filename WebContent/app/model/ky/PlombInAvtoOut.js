Ext.define('TK.model.ky.PlombInAvtoOut', {
    extend: 'TK.model.ky.PlombBase',

    belongsTo:[{
        model:'TK.model.ky.KontInAvtoOut',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});