Ext.define('TK.model.ky.GruzInYard', {
    extend: 'TK.model.ky.GruzBase',

    belongsTo:[{
        model:'TK.model.ky.KontInYard',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});