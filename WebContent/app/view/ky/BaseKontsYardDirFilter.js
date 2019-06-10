Ext.define('TK.view.ky.BaseKontsYardDirFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kybasekontsyarddirfilter',
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
                    },{
                        xtype: 'combo',
                        fieldLabel: 'Сектор',
                        itemId:'kontsectors',
                        store: 'ky.YardSectors',
                        displayField: 'name',
                        valueField:'name',
                        typeAhead: false,
                        hideTrigger:true,
                        minChars:2,
                        name : 'ky_sector',
                        listConfig: {
                            loadingText: this.msgSearch,
                            emptyText: this.msgNothingFound
                        }
                    }
                    ,{
                        xtype: 'numberfield',
                        name: 'ky_y',
                        minValue: 1,
                        allowDecimals: false,
                        fieldLabel: 'Ряд'
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
