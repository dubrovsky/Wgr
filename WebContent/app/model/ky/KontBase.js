Ext.define('TK.model.ky.KontBase', {
    extend: 'TK.model.ky.KontAbstract',
    fields: [
        {name:'dattr', type: 'string', persist: false},
        {name:'altered', type: 'string', persist: false},
        {name:'un', type: 'string', persist: false},
        {name:'status', type:'string', persist: false},
        {name:'prevStatus', type:'string', persist: false},

        {name:'sort', type:'int'},
        {name:'datKyInto', type: 'string', persist: false},
        {name:'datKyOut', type: 'string', persist: false},

        {name:'ky_x', type:'int', useNull:true, persist: false},
        {name:'ky_y', type:'int', useNull:true, persist: false},
        {name:'ky_z', type:'int', useNull:true, persist: false},
        {name:'ky_sector', type:'string', useNull:true, persist: false},

        {name:'yard.hid', type:'int', useNull:true, persist: false},
        {name:'dyard', type: 'string', persist: false},
        {name:'owner.hid', type:'int', useNull:true}
    ],
    belongsTo:[{
        model:'TK.model.ky.NsiOwner',
        getterName:'getOwner',
        setterName:'setOwner',
        associationKey:'owner',
        primaryKey:'hid',
        foreignKey:'owner.hid'
    }],
    hasOne:[{
        primaryKey:'hid',
        foreignKey: 'yard.hid',
        getterName:'getYard',
        setterName:'setYard',
        associationKey:'yard',
        model: 'TK.model.ky.Yard'
    }]
});