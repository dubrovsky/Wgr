Ext.define('TK.model.ky.GruzInPoezdInto', {
    extend: 'TK.model.ky.GruzBase',

    belongsTo:[{
        model:'TK.model.ky.KontInPoezdInto',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});