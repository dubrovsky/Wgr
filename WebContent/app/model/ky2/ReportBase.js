Ext.define('TK.model.ky2.ReportBase', {
    extend: 'Ext.data.Model',

    fields: [
        {name:'startDate', type: 'string'},
        {name:'endDate', type: 'string'},
        {name:'tr_arrival', type: 'string'},
        {name:'tr_departure', type: 'string'},
        {name:'npprm', type: 'string'},
        {name:'gruzotpr', type: 'string'}
    ],

    proxy: {
        type: 'ajax',
        url: 'ky2/secure/Report.do',
        reader: {
            type: 'json',
            root: 'rows'
        },
        writer: {
            encode: true,
            root: 'jsonRequest',
            expandData: true
        },
        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Ошибка');}}
    }
});