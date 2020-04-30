Ext.define('TK.model.PrintTemplate', {
    extend: 'Ext.data.Model',

    idProperty:'hid',
    fields: [
        'dattr','name','routes','fontFamily','blanks',
        {name:'defaults', type:'boolean'},
        {name:'sync', type:'boolean'},
        {name:'defaultable', type:'boolean'},
//        {name:'bold', type:'boolean'},
//        {name:'uppercase', type:'boolean'},
        {name:'fontSize', type:'int'},
        {name:'leading', type:'int'},
        {name:'paperWidth', type:'float'},
        {name:'paperHeight', type:'float'},
        {name:'docId', type:'int'},
        {name:'hid', type:'int'}
    ],
    hasMany:[
        {model:'TK.model.PrintData', name:'printData', foreignKey:'prnTempl_hid'}
//        {model:'TK.model.Route', name:'routes', foreignKey:'prnTmpl_hid', primaryKey:'hid', associationKey:'routs'}
    ]
});