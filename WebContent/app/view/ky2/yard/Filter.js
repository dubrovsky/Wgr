Ext.define('TK.view.ky2.yard.Filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2yardfilter',
    autoShow: true,
    modal: true,
    y: 0,
    title: this.title,
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
                        fieldLabel: this.labelArrivalFrom
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        altFormats: 'd.m.y',
                        fieldLabel: this.labelArrivalTill
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.lblInternationalTrNum,
                        itemId: 'npprm',
                        // queryMode: 'local',
                        store: 'ky2.YardFilterPoezdsDir',
                        displayField: 'npprm',
                        valueField: 'npprm',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'npprm',
                        listConfig: {
                            loadingText: this.msgSearch,
                            emptyText: this.msgNothingFound
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.labelClient,
                        itemId: 'gruzotpr',
                        // queryMode: 'local',
                        store: 'ky2.YardFilterGruzotprsDir',
                        displayField: 'gruzotpr',
                        valueField: 'hid',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'gruzotpr',
                        listConfig: {
                            loadingText: this.msgSearch,
                            emptyText: this.msgNothingFound
                        }
                    },
                    // {xtype:'textfield', fieldLabel:'Международный номер поезда', name:"npprm"},
                    // {xtype:'textfield', fieldLabel:'Клиент', name:"gruzotpr"},
                    {
                        xtype: 'checkbox',
                        name: 'avto',
                        fieldLabel: 'AUTO',
                        inputValue: '1'
                    },
                    {
                        xtype: 'textfield',
                        name: 'nkon',
                        fieldLabel: this.labelContainer
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.labelSector,
                        itemId: 'kontsectors',
                        store: 'ky2.YardSectors',
                        displayField: 'name',
                        valueField: 'hid',
                        typeAhead: false,
                        // hideTrigger: true,
                        // minChars: 1,
                        forceSelection: true,
                        name: 'sector',
                        listConfig: {
                            loadingText: this.msgSearch,
                            emptyText: this.msgNothingFound
                        }
                    }/*,
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
                    }*/
                ],
                buttons: [
                    {
                        text: this.btnFilter,
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterKontYard'
                    },
                    {
                        text: this.btnClear,
                        handler: function (btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: this.btnClose,
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
