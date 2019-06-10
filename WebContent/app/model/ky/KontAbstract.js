Ext.define('TK.model.ky.KontAbstract', {
    extend: 'Ext.data.Model',
    fields: [
        {name:'nkon', type: 'string'},
        {name:'poruz', type: 'boolean'},
        {name:'hid', type:'int', useNull:true},
        {name:'massa_tar', type:'int', useNull:true},
        {name:'pod_sila', type:'float', useNull:true},
        {name:'type', type:'int', useNull:true},
        {name:'vid', type:'string'},
        {name:'prizn_sob', type:'string'},
        {name:'naim_sob', type:'string'},
        {name:'gruzotpr', type:'string'},
        {name:'teh_obsl', type:'string'},
        {name:'prim', type:'string'},
        {name:'punkt_otpr', type:'string'},
        {name:'punkt_nazn', type:'string'}
    ],

    idProperty:'hid',
    proxy: {
        type: 'ajax',
        url: 'ky/secure/Kont.do',
        idParam:'hid',
        reader: {
            type: 'json',
            root: 'rows',
            idProperty: 'hid'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
    }
});