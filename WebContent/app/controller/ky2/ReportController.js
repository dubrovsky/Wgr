Ext.define('TK.controller.ky2.ReportController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.ReportParams'
    ],

    init: function () {
       this.control({
           'ky2basepoezdlist button[action="showReportParams"]': {
               click: this.showReportParams
           },
           'ky2reportparams button[action="getReport"]': {
               click: this.getReport
           }
       })
    },

    showReportParams: function (btn) {
        var win = Ext.widget('ky2reportparams');
    },

    getReport: function (btn) {
        var form = btn.up('form');
        if(form.isValid()) {
            btn.up('ky2reportparams').setLoading(true);

            Ext.Ajax.request({
                url: "ky2/secure/Report.do",
                params: {
                    action: 'get_report',
                    reportParams: Ext.encode(form.getValues())
                },
                scope: this,
                success: function (response, options) {
                    btn.up('ky2reportparams').setLoading(false);
                },
                failure: function (response) {
                    btn.up('ky2reportparams').setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }

        // window.open('Report_viewReport1.do?' + form.getForm().getValues(true) + urlParams, '_self', '');
    }
});