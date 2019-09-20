Ext.define('TK.view.ky2.yard.Filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2yardfilter',
    autoShow: true,
    modal: true,
    y: 0,
    title: "Фильтр",
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
                        fieldLabel: 'Прибытие, с'
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        altFormats: 'd.m.y',
                        fieldLabel: 'Прибытие, по'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Международный номер поезда',
                        itemId: 'npprm',
                        // queryMode: 'local',
                        store: 'ky2.YardFilterPoezdsDir',
                        displayField: 'npprm',
                        valueField: 'npprm',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'npprm',
                        listConfig: {
                            loadingText: "Поиск",
                            emptyText: "Не найдено"
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Клиент',
                        itemId: 'gruzotpr',
                        // queryMode: 'local',
                        store: 'ky2.YardFilterGruzotprsDir',
                        displayField: 'gruzotpr',
                        valueField: 'gruzotpr',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'gruzotpr',
                        listConfig: {
                            loadingText: "Поиск",
                            emptyText: "Не найдено"
                        }
                    },
                    // {xtype:'textfield', fieldLabel:'Международный номер поезда', name:"npprm"},
                    // {xtype:'textfield', fieldLabel:'Клиент', name:"gruzotpr"},
                    {
                        xtype: 'textfield',
                        name: 'nkon',
                        fieldLabel: 'Контейнер'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: 'Сектор',
                        itemId: 'kontsectors',
                        store: 'ky2.YardSectors',
                        displayField: 'name',
                        valueField: 'hid',
                        typeAhead: false,
                        // hideTrigger: true,
                        // minChars: 1,
                        forceSelection: true,
                        name: 'sector',
                        listConfig: {
                            loadingText: "Поиск",
                            emptyText: "Не найдено"
                        }
                    }/*,
                    {
                        xtype: 'radiogroup',
                        fieldLabel: 'Места',
                        columns: 1,
                        vertical: true,
                        items: [
                            {boxLabel: 'Все', name: 'place', inputValue: '-1', checked: true},
                            {boxLabel: 'Пустые', name: 'place', inputValue: '0'},
                            {boxLabel: 'Заполненные', name: 'place', inputValue: '1'}
                        ]
                    }*/
                ],
                buttons: [
                    {
                        text: "Фильтровать",
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterKontYard'
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
