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
                    },
                    {xtype:'textfield', fieldLabel:'Международный номер поезда', name:"npprm", allowBlank: true},
                    {xtype:'textfield', fieldLabel:'Клиент', name:"gruzotpr", allowBlank: true},
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        forceSelection: true,
                        fieldLabel: 'Транспорт по прибытию',
                        name:'tr_arrival',
                        allowBlank: true,
                        store: [['-', 'Все'], ['w', 'Вагон'], ['a', 'Авто']]
                    },
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        forceSelection: true,
                        fieldLabel: 'Транспорт по отправлению',
                        name:'tr_departure',
                        allowBlank: true,
                        store: [['-', 'Все'], ['w', 'Вагон'], ['a', 'Авто']]
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
