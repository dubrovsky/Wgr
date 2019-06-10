Ext.define('TK.view.ky.reports.Report1', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kyreport1',

    width:300,
    title: 'Список по поезду. Прибытие/Отправление',
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
                xtype: 'radiogroup',
                fieldLabel: 'Поезд по',
                columns: 1,
                vertical: true,
                allowBlank: false,
                itemId:'directionId',
                items: [
                    {boxLabel: 'Прибытии', name: 'direction', inputValue: 1, checked: true},
                    {boxLabel: 'Отправлении', name: 'direction', inputValue: 2}
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