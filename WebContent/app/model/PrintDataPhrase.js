Ext.define('TK.model.PrintDataPhrase', {
    extend:'Ext.data.Model',

    requires: [
        'TK.model.PrintData'
    ],

    idProperty:'hid',
    fields:[
        'name',
        'descr',
        'fontFamily',
        {name:'fontSize', type:'int', useNull: true},
        {name:'leading', type:'int', useNull: true},
        {name:'sort', type:'int', useNull: true},
        {name:'rotate', type:'int', useNull: true},
        {name:'border', type:'boolean', defaultValue: false},
        {name:'underline', type:'boolean', defaultValue: false},
        {name:'bold', type:'boolean', defaultValue: false},
        {name:'uppercase', type:'boolean', defaultValue: false},
        {name:'hid', type:'int'}
    ],
    validations:[
        {type:'presence', field:'name'},

        {type:'length', field:'name', max:20},
        {type:'length', field:'descr', max:300},
        {type:'length', field:'fontFamily', max:30},
        {type:'format', field:'fontSize', matcher: /[0-9]{0,2}$/},
        {type:'format', field:'leading', matcher: /[0-9]{0,2}$/}
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