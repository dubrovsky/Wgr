Ext.define('TK.model.PrintData', {
    extend:'Ext.data.Model',

    idProperty:'hid',
    fields:[
        'name', 'descr','fontFamily',
        {name:'fontSize', type:'int', useNull: true},
        {name:'leading', type:'int', useNull: true},
        {name:'sort', type:'int', useNull: true},
        {name:'rotate', type:'int', useNull: true},
        {name:'page', type:'int', defaultValue: 1},
        {name:'print', type:'boolean', defaultValue: true},
        {name:'border', type:'boolean', defaultValue: false},
        {name:'underline', type:'boolean', defaultValue: false},
        //{name:'table', type:'boolean', defaultValue: true},
        {name:'bold', type:'boolean', defaultValue: false},
        {name:'uppercase', type:'boolean', defaultValue: false},
        {name:'llx', type:'float', useNull: true},
        {name:'lly', type:'float', useNull: true},
        {name:'urx', type:'float', useNull: true},
        {name:'ury', type:'float', useNull: true},
        //{name:'tableColumns', type:'int', useNull: true},
        {name:'prnTempl_hid', type:'int'},
        {name:'hid', type:'int'}
    ],
    validations:[
        {type:'presence', field:'name'},
        {type:'presence', field:'llx'},
        {type:'presence', field:'lly'},
        {type:'presence', field:'urx'},
        {type:'presence', field:'ury'},
        {type:'presence', field:'page'},
//        {type:'presence', field:'print'},

        {type:'length', field:'name', max:20},
        {type:'length', field:'page', max:2, min:1},
        {type:'length', field:'descr', max:300},
        {type:'length', field:'fontFamily', max:30},
        {type:'length', field:'llx', max:5},
        {type:'length', field:'lly', max:5},
        {type:'length', field:'urx', max:5},
        {type:'length', field:'ury', max:5},
        //{type:'length', field:'rotate', max:3},
        {type:'format', field:'llx', matcher: /^\d*$/},
        {type:'format', field:'lly', matcher: /^\d*$/},
        {type:'format', field:'urx', matcher: /^\d*$/},
        {type:'format', field:'ury', matcher: /^\d*$/},
        {type:'format', field:'fontSize', matcher: /[0-9]{0,2}$/},
        {type:'format', field:'leading', matcher: /[0-9]{0,2}$/}
//        {type:'length', field:'fontSize', max:2}
    ],
    belongsTo:[
        {model:'TK.model.PrintTemplate'/*, getterName:'getPrintTemplate', setterName:'setPrintTemplate'*/}
    ],
    hasMany:[{
        primaryKey:'hid',
        model: 'TK.model.PrintDataTable',
        associationKey: 'printDataTable',
        name: 'table',
        foreignKey: 'printData.hid'
    },{
        primaryKey:'hid',
        model: 'TK.model.PrintDataPhrase',
        associationKey: 'printDataPhrase',
        name: 'phrases',
        foreignKey: 'printData.hid'
    }]
});