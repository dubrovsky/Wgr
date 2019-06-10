Ext.define('TK.controller.ky.Report', {
    extend: 'Ext.app.Controller',

    mixins: [
        'TK.controller.Utils'
    ],

    views: [
        'ky.reports.Report1',
        'ky.reports.Report2',
        'ky.reports.Report3',
        'ky.reports.Report4',
        'ky.reports.Report5',
        'ky.reports.Report6'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'report1',
        selector: 'kyreport1'
    }, {
        ref: 'report2',
        selector: 'kyreport2'
    }, {
        ref: 'report3',
        selector: 'kyreport3'
    }, {
        ref: 'report4',
        selector: 'kyreport4'
    }, {
        ref: 'report5',
        selector: 'kyreport5'
    }, {
        ref: 'report6',
        selector: 'kyreport6'
    }],

    init: function () {
        this.control({
            'kyreport1 button[action="excel"]': {
                click: this.createReport1
            },
            'kyreport2 button[action="excel"]': {
                click: this.createReport2
            },
            'kyreport3 button[action="excel"]': {
                click: this.createReport3
            },
            'kyreport4 button[action="excel"]': {
                click: this.createReport4
            },
            'kyreport5 button[action="excel"]': {
                click: this.createReport5
            },
            'kyreport6 button[action="excel"]': {
                click: this.createReport6
            }
        })
    },

    createReport1: function(btn){
        var report = this.getReport1(),
            nppr = report.down('#nppr').getValue(),
//            isInto = report.down('#isInto').getValue()['isInto'];
            direction = report.down('#directionId').getValue()['direction'];

        if(!nppr || !Ext.String.trim(nppr)){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбран номер поезда',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        btn.up('window').close();
        window.open('ky/secure/Report_report1.do?' +
            'nppr=' + Ext.String.trim(nppr) + '&direction='+direction,
            '_blank','');
        this.runProgressBar4LongOperation();
    },
    createReport2: function(btn){
        var report = this.getReport2(),
            sectorHid = report.down('#sector').getValue(),
            x = report.down('#x').getValue(),
            y = report.down('#y').getValue(),
            z = report.down('#z').getValue();

        btn.up('window').close();
        window.open('ky/secure/Report_report2.do?' +
            'sectorHid=' + sectorHid + '&x='+ x + '&y='+ y + '&z=' + z,
            '_self','');
        this.runProgressBar4LongOperation();
    },
    createReport3: function(btn){
        var report = this.getReport3()
            ,dat1 = report.down('#dat1').getRawValue()
            ,dat2 = report.down('#dat2').getRawValue()
        /*
         ,
         x = report.down('#x').getValue(),
         y = report.down('#y').getValue(),
         z = report.down('#z').getValue()
         */
            ;

        btn.up('window').close();
        window.open('ky/secure/Report_report3.do?'
                + 'dat1=' + dat1 + '&dat2=' + dat2
//                + '&x='+ x + '&y='+ y + '&z=' + z
            ,
            '_blank','');
        this.runProgressBar4LongOperation();
    },
    createReport4: function(btn){
        var report = this.getReport4()
            ,koleya = report.down('#koleyaId').getValue()['koleya'];

        btn.up('window').close();
        window.open('ky/secure/Report_report4.do?koleya=' + koleya,'_blank','');
        this.runProgressBar4LongOperation();
    },
    createReport5: function(btn){
        var report = this.getReport5()
            ,koleya = report.down('#koleyaId').getValue()['koleya'];

        btn.up('window').close();
        window.open('ky/secure/Report_report5.do?koleya=' + koleya, '_blank', '');
        this.runProgressBar4LongOperation();
    },
    createReport6: function(btn){
        var report = this.getReport6(),
            nppr = report.down('#nppr').getValue(),
            direction = report.down('#directionId').getValue();
        if(!nppr || !Ext.String.trim(nppr)){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбран номер поезда',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }
        btn.up('window').close();
        window.open('ky/secure/Report_report6.do?nppr=' + Ext.String.trim(nppr) + '&direction='+direction, '_blank', '');
        this.runProgressBar4LongOperation();
    }

});


