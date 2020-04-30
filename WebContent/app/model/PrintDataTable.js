Ext.define('TK.model.PrintDataTable', {
    extend:'Ext.data.Model',

    idProperty:'hid',
    fields:[
        'name', 'descr',
        {name:'width', type:'float', useNull: true},
        {name:'sort', type:'int', useNull: true},
        //{name:'prnData_hid', type:'int'},
        {name:'hid', type:'int'}
    ],
    validations:[
        //{type:'presence', field:'name'},
        {type:'presence', field:'width'},

        //{type:'length', field:'name', max:20},
        {type:'length', field:'width', max:5},
        {type:'length', field:'descr', max:300},
        {type:'format', field:'width', matcher: /^\d*$/}
    ],
    belongsTo:[{
        model:'TK.model.PrintData',
        getterName:'getPrintData',
        setterName:'setPrintData',
        associationKey:'printData',
        primaryKey:'hid',
        foreignKey:'printData.hid'
    }]
});