Ext.define('TK.view.ky2.client.Filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2clientfilter',
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
                        name: 'dprbStart',
                        altFormats: 'd.m.y',
                        fieldLabel: 'Прибытие, с'
                    },
                    {
                        xtype: 'datefield',
                        name: 'dprbEnd',
                        altFormats: 'd.m.y',
                        fieldLabel: 'Прибытие, по'
                    },
                    {
                        xtype: 'textfield',
                        name: 'nkon',
                        fieldLabel: 'Контейнер'
                    },
                    {
                        xtype: 'radiogroup',
                        fieldLabel: 'Место положения',
                        columns: 1,
                        vertical: true,
                        items: [
                            {boxLabel: 'Все', name: 'location', inputValue: '0', checked: true},
                            {boxLabel: 'Вагон', name: 'location', inputValue: '1'},
                            {boxLabel: 'Авто', name: 'location', inputValue: '2'}
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        minValue: 1,
                        allowDecimals: false,
                        name: 'kyDays',
                        fieldLabel: 'Кол-во дней'
                    }
                ],
                buttons: [
                    {
                        text: "Фильтровать",
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterClient'
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
