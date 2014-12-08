Ext.define('TK.model.RouteDoc', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int'},
        'name',
        'descr',
        {name:'route_hid', type:'int', useNull:true}
    ],
    belongsTo: {
        model:'TK.model.Route', getterName:'getRoute', setterName:'setRoute'
    }
});