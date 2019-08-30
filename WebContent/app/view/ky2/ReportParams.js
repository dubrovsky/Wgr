Ext.define('TK.view.ky2.ReportParams', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2reportparams',
    autoShow: true,
    modal: true,
    y: 0,
    title: "Параметры отчета",
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'datefield',
                        name: 'startDate',
                        altFormats: 'd.m.y',
                        allowBlank: false,
                        fieldLabel: 'Прибытие, с'
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        altFormats: 'd.m.y',
                        allowBlank: false,
                        fieldLabel: 'Прибытие, по'
                    }
                ],
                buttons: [
                    {
                        text: "Ок",
                        formBind: true,
                        disabled: true,
                        action: 'getReport'
                    },
                    {
                        text: "Очистить",
                        handler: function (btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: "Закрыть",
                        scope: this,
                        handler: function (btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
