Ext.define('TK.view.ky2.ReportParams02', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2reportparams02',
    autoShow: true,
    modal: true,
    y: 0,
    title: "Параметры отчета",
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                store: Ext.create('TK.store.ky2.ReportsForm'),
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'combo',
                        fieldLabel: 'Клиент',
                        itemId: 'hid_client',
                        queryMode: 'local',
                        store: 'ky2.ReportsClientInterval',
                        displayField: 'name',
                        valueField: 'hid_client',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'hid_client',
                        listConfig: {
                            loadingText: "Поиск",
                            emptyText: "Не найдено"
                        }
                    },
                    {xtype:'hidden', name:'rep_action', itemId:'rep_action'}
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
