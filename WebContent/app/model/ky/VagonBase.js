Ext.define('TK.model.ky.VagonBase', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'dattr', type: 'string', persist: false},
        {name:'altered', type: 'string', persist: false},
        {name:'un', type: 'string', persist: false},

        {name:'hid', type:'int', useNull:true},

        {name:'nvag', type: 'string'},
        {name:'foot', type: 'string'},
        {name:'koleya', type:'int'},
        {name:'direction', type:'int'},
        {name:'sort', type:'int'},
        //{name:'kontSum', type:'int'},

        {name:'line', type: 'string'},

        {name:'kpv', type: 'string'},
        {name:'kolOs', type: 'int', useNull:true},
        {name:'masTar', type: 'int', useNull:true},
        {name:'sobstv', type: 'string'},
        {name:'bortDate', type: 'string'},
        {name:'prim', type: 'string'},
        {name:'probeg', type: 'int', useNull:true},
        {name:'podSila', type: 'float', useNull:true},

        {name:'plan_rem', type:'string'},
        {name:'reviz', type:'string'},
        {name:'type_no', type:'int', useNull:true},
        {name:'dlina', type:'float', useNull:true},
        {name:'model', type:'string'},

        {name:'poruz', type: 'boolean'},
        {name:'defective', type: 'boolean'},

        {name:'poezd.hid', type:'int', useNull:true},
        {name:'poezd.koleya', type:'int'},
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

    proxy: {
        type: 'ajax',
        url: 'ky/secure/Vagon.do',
        idParam:'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});