Ext.define('TK.store.CimSmgses', {
    extend:'Ext.data.Store',

    requires: [
        'TK.Utils',
        'TK.model.CimSmgs'
    ],

    model:'TK.model.CimSmgs',
    pageSize:20,
    proxy:{
        type:'ajax',
        url:'Smgs_list.do',
        reader:{
            type:'json',
            root:'rows',
            idProperty:'hid'
        },
        actionMethods:{
            create:'POST',
            read:'POST',
            update:'POST',
            destroy:'POST'
        },
        listeners:{exception:function (proxy, response, operation) {
            TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');
        }}
    }
});