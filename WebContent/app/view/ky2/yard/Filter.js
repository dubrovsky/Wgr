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
                        hideTrigger: true,
                        minChars: 1,
                        forceSelection: true,
                        name: 'sector',
                        listConfig: {
                            loadingText: "Поиск",
                            emptyText: "Не найдено"
                        }
                    },
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
                    }
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
