Ext.define('TK.model.Project', {
    extend:'Ext.data.Model',

    idProperty:'hid',
    fields:[
        {name:'hid', type:'int'},
        'name',
        'grps',
        'rts'
    ],
    hasMany:[
        {model:'TK.model.Group', name:'groups', foreignKey:'project_hid', primaryKey:'hid'},
        {model:'TK.model.Route', name:'routes', foreignKey:'project_hid', primaryKey:'hid', associationKey:'routs'}
    ]/*,
    proxy: {
        type: 'ajax',
        url: 'Project_view1.do',
        reader: {
            type: 'json',
            root: 'project',
            idProperty: 'hid'
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }*/
});