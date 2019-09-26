Ext.define('TK.controller.ky2.ReportController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.ReportParams',
        'ky2.AbstractList'
    ],
    stores: [
        'ky2.ReportsForm',
        'ky2.ReportsPoezdsInInterval',
        'ky2.ReportsGruzotprInterval'
    ],
    models: [
        'ky2.ReportForm',
        'ky2.ReportPoezdsInInterval',
        'ky2.ReportGruzotprInterval'
    ],

    init: function () {
       this.control({
           'ky2basepoezdlist button[action="showReportParams"]': {
               click: this.showReportParams
           },
           'ky2reportparams button[action="getReport"]': {
               click: this.getReport
           },
           'ky2reportparams datefield[name="startDate"]': {
               select: this.selectFilterStartDate
           },
           'ky2reportparams datefield[name="endDate"]': {
               select: this.selectFilterEndDate
           },

       })
    },

    showReportParams: function (btn) {
        var win = Ext.widget('ky2reportparams');

        var xform = win.down('form');

        xform.store.load({
            params: {
                action: 'params_form'
            },
            scope: this,
            callback : function(records, options, success) {
                xform.loadRecord(records[0]);
                this.selectFilterEndDate(xform.down('combo'));
            }
        });
        // window.open('ky2/secure/Report.do?hid=2686&action=sostojanie_kont_avto', '_blank', '');
    },

    getReport: function (btn) {
        var form = btn.up('form');
        if(form.isValid()) {
            window.open('ky2/secure/Report.do?reportParams=' + encodeURIComponent(Ext.encode(form.getValues())) + '&action=get_report', '_self', '');
        }


    },

    selectFilterStartDate: function (combo, records) {
        this.selectFilterDate(combo);
    },
    selectFilterEndDate: function (combo, records) {
        this.selectFilterDate(combo);
    },
    selectFilterDate: function (combo) {
        var form = combo.up('form'),
            values = form.getValues();

        if (values['startDate'] && values['endDate']) {
            var poezdCombo = form.down('combo#npprm');
            var gruzotprCombo = form.down('combo#gruzotpr');
            poezdCombo.clearValue();
            gruzotprCombo.clearValue();
            poezdCombo.getStore().load({
                params: {
                    action: 'poezds_in_interval',
                    reportParams: Ext.encode({startDate: values['startDate'], endDate: values['endDate']})
                },
                success: function (response, options) {
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
            gruzotprCombo.getStore().load({
                params: {
                    action: 'gruzotpr_interval',
                    reportParams: Ext.encode({startDate: values['startDate'], endDate: values['endDate']})
                },
                success: function (response, options) {
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
        }
    }
});