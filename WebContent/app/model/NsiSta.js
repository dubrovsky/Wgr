Ext.define('TK.model.NsiSta', {
    extend: 'Ext.data.Model',
    idProperty:'stUn',
    fields: ['staName','staNameCh','staNameEn','staNo','stUn','ro', 'roadun','roadno','roadname', 'managno','managun', 'mnamerus','countryname'],
    validations: [
//        {type: 'presence',  field: 'roadun'},
        {type: 'presence',  field: 'managun'}
    ]
});