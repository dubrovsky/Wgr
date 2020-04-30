Ext.define('TK.view.ky2.poezd.FilterPPV', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2poezdfilterppv',
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
                        fieldLabel: 'Дата, с'
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        altFormats: 'd.m.y',
                        fieldLabel: 'Дата, по'
                    },
                    {
                        xtype: 'textfield',
                        name: 'nwag',
                        fieldLabel: 'Номер вагона'
                    }
                ],
                buttons: [
                    {
                        text: "Фильтровать",
                        formBind: true,
                        disabled: true,
                        action: 'applyFilter'
                    },
                    {
                        text: "Очистить",
                        action: 'clearFilter',
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
