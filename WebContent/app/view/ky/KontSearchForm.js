Ext.define('TK.view.ky.KontSearchForm', {
    extend: 'Ext.window.Window',
    alias:'widget.kykontsearchform',
    title: 'Поиск контейнера',
    autoShow: true,
    modal: true,
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
                        fieldLabel: 'Номер контейнера',
                        maxLength: 250,
                        allowBlank: false
                    }
                ],
                buttons: [
                    {
                        text: 'Поиск',
                        formBind: true,
                        disabled: true,
                        action: 'applySearchKont'
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
