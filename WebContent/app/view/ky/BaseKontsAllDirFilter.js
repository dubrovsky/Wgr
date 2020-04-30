Ext.define('TK.view.ky.BaseKontsAllDirFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kybasekontsalldirfilter',

    requires: [
        'TK.view.stamp.StampForm'
    ],

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
