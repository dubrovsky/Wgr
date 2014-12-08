Ext.define('TK.model.PrintBlank', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'hid', type:'int'},
        'name','fileName','contentType',
        {name:'page', type:'int'},
        {name:'ncopy', type:'int'},
        {name:'length', type:'int'}
    ],
    validations:[
        {type:'presence', field:'name'},
        {type:'presence', field:'page'},
        {type:'presence', field:'ncopy'},

        {type:'length', field:'name', max:300},
        {type:'length', field:'page', max:2, min:1},
        {type:'length', field:'ncopy', max:2, min:1}
    ]
});