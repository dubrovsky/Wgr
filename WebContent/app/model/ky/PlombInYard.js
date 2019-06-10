Ext.define('TK.model.ky.PlombInYard', {
    extend: 'TK.model.ky.PlombBase',

    belongsTo:[{
        model:'TK.model.ky.KontInYard',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});