Ext.define('TK.model.SmgsPlat', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: ['hid','dorR','platR','primR','kplat','kplat1','kplat2'],
    validations: [
        {type: 'length', field: 'dorR', max: 5},
        {type: 'length', field: 'platR', max: 45},
        {type: 'length', field: 'primR', max: 70},
        {type: 'length', field: 'kplat', max: 50},
        {type: 'length', field: 'kplat1', max: 50},
        {type: 'length', field: 'kplat2', max: 50}
    ]
});