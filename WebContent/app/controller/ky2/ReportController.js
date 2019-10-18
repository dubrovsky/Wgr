Ext.define('TK.controller.ky2.ReportController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.ReportParams',
        'ky2.ReportParams02',
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
    refs: [{
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }],
    init: function () {
       this.control({
           'ky2basepoezdlist button[action="reports"] menuitem[action="showReportParams"]': {
               click: this.showReportParams
           },
           'ky2basepoezdlist button[action="showReportParams"]': {
               click: this.showReportParams
           },
           'ky2basepoezdlist button[action="reports"] menuitem[action="kartaPrzeladunkowa"]': {
               click: this.kartaPrzeladunkowa
           },
           'ky2reportparams button[action="getReport"]': {
               click: this.getReport
           },
           'ky2reportparams02 button[action="getReport"]': {
               click: this.getReport02
           },
           'ky2reportparams datefield[name="startDate"]': {
               select: this.selectFilterStartDate
           },
           'ky2reportparams datefield[name="endDate"]': {
               select: this.selectFilterEndDate
           },

       })
    },

    kartaPrzeladunkowa: function (btn) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        var win = Ext.widget('ky2reportparams02');
        var hid_clientCombo = win.down('combo#hid_client');
        hid_clientCombo.clearValue();
        hid_clientCombo.getStore().load({
            params: {
                action: 'ClientNpprm',
                hid: poezdlist.getSelectionModel().getLastSelected().get('hid')
            },
            scope: this,
            callback : function(records, options, success) {
                if(hid_clientCombo.getStore().getAt(0)) {
                    hid_clientCombo.setValue(hid_clientCombo.getStore().getAt(0).get(hid_clientCombo.valueField));
                }
            },
            success: function (response, options) {
            },
            failure: function (response, options) {
                TK.Utils.makeErrMsg(response, 'Error!..');
            }
        });
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
                this.selectFilterDate(xform);
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
    getReport02: function (btn) {
        var poezdlist = this.getPoezdlist();
        var form = btn.up('form');
        var values = form.getValues();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        if(values['hid_client']) {
            window.open('ky2/secure/Report.do?hid_client=' + values['hid_client'] + '&hid=' + poezdlist.getSelectionModel().getLastSelected().get('hid') + '&action=KartaPrzeladunkowa', '_blank', '');
        }
        else {
            Ext.Msg.show({
                title: 'Предупреждение',
                msg: 'Для формирования отчёта укажите Клиента',
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
            return false;
        }
    },

    selectFilterStartDate: function (combo, records) {
        this.selectFilterDate(combo.up('form'));
    },
    selectFilterEndDate: function (combo, records) {
        this.selectFilterDate(combo.up('form'));
    },
    selectFilterDate: function (form) {
        var values = form.getValues();

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