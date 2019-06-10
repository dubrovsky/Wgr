Ext.define('TK.model.ky.GruzInAvtoInto', {
    extend: 'TK.model.ky.GruzBase',

    belongsTo:[{
        model:'TK.model.ky.KontInAvtoInto',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});