Ext.define('TK.model.ky.PlombNoTrasp', {
    extend: 'TK.model.ky.PlombBase',

    belongsTo:[{
        model:'TK.model.ky.KontNoTrasp',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});