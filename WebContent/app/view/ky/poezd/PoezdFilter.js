Ext.define('TK.view.ky.poezd.PoezdFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kypoezdfilter',
    title: 'Фильтр',
    autoShow: true,
    y:0,
    initComponent: function() {
        this.items = [
            {
                xtype: 'form',
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'numberfield',
                        name: 'nppr',
                        minValue: 0,
                        allowDecimals: false,
                        fieldLabel: 'Поезд',
                        maxLength: 5
                    }
                ],
                buttons: [
                    {
                        text: 'Фильтровать',
                        formBind: true,
                        disabled: true,
                        action: 'applyFilter'
                    },
                    {
                        text: 'Сбросить',
                        handler: function(btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: 'Закрыть',
                        scope: this,
                        handler: function(btn) {
                            btn.up('window').close();
                        }
                    }
                ]
            }
        ];

        this.callParent(arguments);
    }
});
