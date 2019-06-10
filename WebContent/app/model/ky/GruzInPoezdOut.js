Ext.define('TK.model.ky.GruzInPoezdOut', {
    extend: 'TK.model.ky.GruzBase',

    belongsTo:[{
        model:'TK.model.ky.KontInPoezdOut',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});