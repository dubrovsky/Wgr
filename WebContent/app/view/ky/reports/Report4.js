Ext.define('TK.view.ky.reports.Report4', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kyreport4',

    width:300,
    title: 'Состояние широких вагонов на конец дня',
    bodyPadding: 5,

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'radiogroup',
                fieldLabel: 'Колея',
                columns: 1,
                vertical: true,
                allowBlank: false,
                itemId:'koleyaId',
                items: [
                    {boxLabel: 'Широкая', name: 'koleya', inputValue: 1, checked: true},
                    {boxLabel: 'Узкая', name: 'koleya', inputValue: 2}
                ]
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