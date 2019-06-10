Ext.define('TK.model.ky.Yard', {
    extend: 'TK.model.ky.YardBase',

    fields: [
        {name:'dattr', persist: false},
        {name:'altered', persist: false},
        {name:'un', persist: false},

        'notes',
        {name:'empty', type: 'boolean', defaultValue: true},

          // view only in grid
        {name:'kont.hid', type:'int', persist: false, useNull: true},
        {name:'kont.nkon', persist: false},
        {name:'kont.dyard', persist: false}

    ],
    belongsTo:[{
        primaryKey:'hid',
//        foreignKey: 'yard.hid',
        getterName:'getKont',
        setterName:'setKont',
        associationKey:'kont',
        model:'TK.model.ky.KontInYard'
//        model: 'TK.model.ky.KontInPoezdInto'
//        model: 'TK.model.ky.KontYard'
    }]
});