Ext.define('TK.model.ky.GruzNoTrasp', {
    extend: 'TK.model.ky.GruzBase',

    belongsTo:[{
        model:'TK.model.ky.KontNoTrasp',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        primaryKey:'hid',
        foreignKey:'kont.hid'
    }]
});
