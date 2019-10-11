Ext.define('TK.controller.ky2.ReportController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.ReportParams',
        'ky2.AbstractList'
    ],
    stores: [
        'ky2.ReportsForm',
        'ky2.ReportsPoezdsInInterval',
        'ky2.ReportsClientInterval'
    ],
    models: [
        'ky2.ReportForm',
        'ky2.ReportPoezdsInInterval',
        'ky2.ReportClientInterval'
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
                action: 'ParamsForm'
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
            window.open('ky2/secure/Report.do?reportParams=' + encodeURIComponent(Ext.encode(form.getValues())) + '&action=KontReport', '_self', '');
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
            var hid_clientCombo = form.down('combo#hid_client');
            poezdCombo.clearValue();
            hid_clientCombo.clearValue();
            poezdCombo.getStore().load({
                params: {
                    action: 'PoezdsInInterval',
                    reportParams: Ext.encode({startDate: values['startDate'], endDate: values['endDate']})
                },
                success: function (response, options) {
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
            });
            hid_clientCombo.getStore().load({
                params: {
                    action: 'ClientInterval',
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