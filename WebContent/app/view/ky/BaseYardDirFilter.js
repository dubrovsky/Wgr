Ext.define('TK.view.ky.BaseYardDirFilter', {
    extend: 'Ext.window.Window',
    alias:'widget.kybaseyarddirfilter',
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
                        xtype: 'combo',
                        fieldLabel: 'Сектор',
                        itemId:'kontsectors',
                        store: 'ky.YardSectors',
                        displayField: 'name',
                        valueField:'hid',
                        typeAhead: false,
                        hideTrigger:true,
                        minChars:1,
                        forceSelection:true,
                        name : 'sector',
                        listConfig: {
                            loadingText: 'Поиск...',
                            emptyText: 'Найдено 0 совпадений'
                        }
                    },
                    {
                        fieldLabel: 'Позиция',
                        xtype: 'numberfield',
                        name: 'x',
                        minValue: 1,
                        allowDecimals: false
                    },
                    {
                        fieldLabel: 'Ряд',
                        xtype: 'numberfield',
                        name: 'y',
                        minValue: 1,
                        allowDecimals: false
                    },
                    {
                        fieldLabel: 'Ярус',
                        xtype: 'numberfield',
                        name: 'z',
                        minValue: 1,
                        allowDecimals: false
                    }
                ],
                buttons: [
                    {
                        text: '!Фильтровать',
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterYardDir'
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
