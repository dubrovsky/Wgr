Ext.define('TK.model.ky2.ReportForm', {
    extend: 'TK.model.ky2.ReportBase',

    fields: [
        {name:'startDate', type: 'string'},
        {name:'endDate', type: 'string'},
        {name:'status_ad', type: 'string'},
        {name:'tr_arrival', type: 'string'},
        {name:'tr_departure', type: 'string'},
        {name:'npprm', type: 'string'},
        {name:'hid_client', type: 'int'}
    ]

});