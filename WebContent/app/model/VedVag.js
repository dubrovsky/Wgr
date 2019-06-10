Ext.define('TK.model.VedVag', {
    extend: 'Ext.data.Model',

    requires: [
        // 'TK.model.vedper.VedPerVagModel',
        'Ext.util.Format'
    ],

    idProperty: 'hid',
    fields: [
        {name: 'hid', type: 'int', useNull:true},
        {name: 'hidCs', type: 'int', useNull:true},
        {name: 'vedPerHid', type: 'int', useNull:true},
        {name: 'num', type: 'string', useNull:true},
        /*{name: 'datePer', type: 'date', useNull:true,
            serialize: function (val) {
                return Ext.util.Format.date(val);
            },
            convert: function (val) {
                if(Ext.isDate(val)) return val;
                return Ext.Date.parse(val, Ext.Date.defaultFormat);
            }
        },*/
        {name: 'indexNum', type: 'int'},
        {name: 'kontTara', type: 'number'},
        {name: 'mbrt', type: 'number'},
        {name: 'nvag'},
        {name: 'owner'},
        {name: 'kind'},
        {name: 'gp'},
        {name: 'axes'},
        {name: 'tara'},
        'numClaim','g281','ksto','nsto','kstn','nstn', 'kpl', 'znak',
        'kont','kontKind','kontGp',
        'places','upak','gng','gngn','places','upak','gng','gngn', 'prim', 'perVed'
    ],
    sorters: ['indexNum'],
    belongsTo: {
        model:'TK.model.Ved', getterName:'getVed', setterName:'setVed'
    }
    // hasMany:[{
    //     primaryKey:'hid',
    //     foreignKey:'naklHid',
    //     associationKey: 'vags',
    //     name: 'vags',
    //     model: 'BE.model.vedper.VedPerVagModel'
    // }]
});