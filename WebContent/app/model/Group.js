Ext.define('TK.model.Group', {
    extend: 'Ext.data.Model',
    idProperty:'name',
    fields: [
        {name:'name', type:'string', defaultValue:''},
        {name:'descr', type:'string', defaultValue:''},
        {name:'project_hid', type:'int', useNull:true},
        {name:'route_hid', type:'int', useNull:true}
    ],
    belongsTo: [
        {model:'TK.model.Project', getterName:'getProject', setterName:'setProject'},
        {model:'TK.model.Route', getterName:'getRoute', setterName:'setRoute'}
    ]
});