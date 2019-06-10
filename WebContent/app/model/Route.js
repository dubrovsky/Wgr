Ext.define('TK.model.Route', {
    extend: 'Ext.data.Model',

    requires: [
        'TK.model.Group',
        'TK.model.Project',
        'TK.model.RouteDoc'
    ],

    idProperty:'hid',
    fields: [
        {name:'hid', type:'int', useNull:true},
        'name',
        'grps', 'dcs','tbc_st_code','customCode', 'emailMask',
        // {name:'forDeleted', type:'boolean'},
        {name:'project_hid', type:'int', useNull:true}/*,
        {name:'prnTmpl_hid', type:'int', useNull:true}*/
    ],
    belongsTo: {
        model:'TK.model.Project', getterName:'getProject', setterName:'setProject'/*,
        model:'TK.model.PrintTemplate', getterName:'getPrintTemplate', setterName:'setPrintTemplate'*/
    },
    hasMany:[
        {model:'TK.model.Group', name:'groups', foreignKey:'route_hid', primaryKey:'hid'},
        {model:'TK.model.RouteDoc', name:'docs', foreignKey:'route_hid', primaryKey:'hid'}
    ]
});