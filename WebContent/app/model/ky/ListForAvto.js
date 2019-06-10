Ext.define('TK.model.ky.ListForAvto', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'no_avto', type: 'int', useNull: true},
        {name:'type_avto', type: 'string'},
        {name:'nkon', type: 'string'},
        {name:'poruz', type: 'string'}
    ]
});
