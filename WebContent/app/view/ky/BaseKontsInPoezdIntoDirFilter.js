Ext.define('TK.view.ky.BaseKontsInPoezdIntoDirFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kybasekontsinpoezdintodirfilter',
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
                        name: 'nkon',
                        fieldLabel: 'Контейнер',
                        maxLength: 14
                    }
                    ,{
                     xtype: 'textfield',
                     name: 'nppr',
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
