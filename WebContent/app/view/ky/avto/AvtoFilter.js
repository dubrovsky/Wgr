Ext.define('TK.view.ky.avto.AvtoFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kyavtofilter',
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
                        xtype: 'textfield',
                        name: 'no_avto',
                        minValue: 0,
                        allowDecimals: false,
                        fieldLabel: 'Номер авто',
                        maxLength: 250
                    }
                ],
                buttons: [
                    {
                        text: '!Фильтровать',
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
