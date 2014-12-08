Ext.define('TK.model.InvoiceGruz', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        'tnved','nzgr',/*'znak',*/'nzyp','kypk',
        {name: 'kolm', type: 'int', useNull:true},
        {name: 'mbrt', type: 'float', useNull:true},
        {name: 'mnet', type: 'float', useNull:true},
        {name: 'kole', type: 'int', useNull:true},
        'eizm',
        {name: 'cost', type: 'float', useNull:true},
        {name: 'itogo', type: 'float', useNull:true},
        'type','hid'
    ],
    validations: [
        {type: 'length', field: 'tnved', max: 12},
        {type: 'length', field: 'nzgr', max: 2500},
        {type: 'length', field: 'nzyp', max: 30},
        {type: 'length', field: 'kypk', max: 5},
        /*{type: 'length', field: 'kolm', max: 10},
        {type: 'length', field: 'mbrt', max: 13},
        {type: 'length', field: 'mnet', max: 13},
        {type: 'length', field: 'kole', max: 10},*/
        {type: 'length', field: 'eizm', max: 10}
        /*{type: 'length', field: 'cost', max: 10},
        {type: 'length', field: 'itogo', max: 20},
        {type: 'length', field: 'type', max: 50}*/
    ]
});