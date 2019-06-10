Ext.define('TK.view.ky.reports.Report3', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kyreport3',

    width:300,
    title: 'Таблица накопления о вагонах',
    bodyPadding: 5,

    buildItems: function (config) {
        var d2 = new Date(), d1 = new Date();
        d1.setFullYear(d2.getFullYear() - 1);
        config.items = [
            {
                xtype: 'datefield',
                altFormats:'d.m.y',
                format:'d.m.y',
                fieldLabel: 'с',
                labelWidth: 100,
                itemId:'dat1',
                value: d1
            },
            {
                xtype: 'datefield',
                altFormats:'d.m.y',
                format:'d.m.y',
                fieldLabel: 'по',
                labelWidth: 100,
                itemId:'dat2',
                value: d2
            }
        ];
    },
    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.buttons.splice(0,0,{
            text: 'Excel',
            scope: this,
            iconCls:'export2Xls',
            action: 'excel'
        });
    }
});