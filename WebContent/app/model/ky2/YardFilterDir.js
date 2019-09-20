Ext.define('TK.model.ky2.YardFilterDir', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'hid', type:'int', useNull:true},
        {name:'nppr', type: 'string', useNull:true},
        {name:'npprm', type: 'string', useNull:true},
        {name:'gruzotpr', type: 'string', useNull:true}
    ]
});