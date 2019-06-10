Ext.define('TK.view.ky.reports.Report6', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kyreport6',

    width:300,
    title: 'Priamy preklad',
    bodyPadding: 5,

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'textfield',
                fieldLabel: 'Номер поезда',
                labelWidth: 150,
                itemId:'nppr'
            },
            {
                xtype: 'hidden', itemId:'directionId', value: 1
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