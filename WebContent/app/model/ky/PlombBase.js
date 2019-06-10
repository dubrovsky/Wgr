Ext.define('TK.model.ky.PlombBase', {
    extend: 'Ext.data.Model',
    idProperty:'hid',
    fields: [
        {name:'dattr', type: 'string', persist: false},
        {name:'altered', type: 'string', persist: false},
        {name:'un', type: 'string', persist: false},

        'znak',
        {name:'kpl', type:'int', useNull:true},
        {name:'hid', type:'int', useNull:true},
        {name:'kont.hid', type:'int', useNull:true}
    ],
    proxy: {
        type: 'ajax',
        url: 'ky/secure/Plomb.do',
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