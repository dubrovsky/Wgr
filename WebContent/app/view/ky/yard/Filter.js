Ext.define('TK.view.ky.yard.Filter', {
    extend: 'Ext.window.Window',
    alias:'widget.kyyardfilter',
//    title: 'Фильтр',
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
                        name : 'nkon',
                        fieldLabel: 'Контейнер'
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.labelSector,
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
                            loadingText: this.msgSearch,
                            emptyText: this.msgNothingFound
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
                    ,{
                        xtype: 'radiogroup',
                        fieldLabel: 'Места',
                        columns: 1,
                        vertical: true,
                        items: [
                            { boxLabel: 'Все', name: 'place', inputValue: '-1', checked: true},
                            { boxLabel: 'Пустые', name: 'place', inputValue: '0'},
                            { boxLabel: 'Заполненные', name: 'place', inputValue: '1' }
                        ]
                    }
                    /*{
                        xtype: 'checkbox',
                        name : 'loaded',
                        fieldLabel: this.labelLoaded,
                        inputValue:true,
                        uncheckedValue:false
                    },
                    {
                        xtype: 'checkbox',
                        name : 'notLoaded',
                        fieldLabel: this.labelNotLoaded,
                        inputValue:true,
                        uncheckedValue:false
                    },*/
                    /*{
                        xtype: 'combo',
                        queryMode: 'local',
                        name : 'storageType',
                        fieldLabel: this.labelStorageType,
                        store:[
                            ['VACANT',this.labelStorageVACANT],
                            ['TEMPORALLY',this.labelStorageTEMPORALLY],
                            ['STORAGE',this.labelStorageSTORAGE]
                        ]
                    },
                    ,{
                        xtype   :'fieldset',
                        title   :this.labelDateIn,
                        defaults:{
                            layout:{type:'hbox'},
                            labelWidth: 25
                        },
                        items:[
                            {
                                xtype: 'fieldcontainer',
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                },
                                fieldLabel: this.labelDateFrom,
                                items: [
                                    {
                                        name : 'dateInDate1',
                                        xtype: 'datefield',
                                        altFormats:'d.m.y',
                                        width: 85
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelDate,
                                        submitValue: false
                                    },
                                    {
                                        name : 'dateInTime1',
                                        xtype: 'timefield',
                                        altFormats:'H:i',
                                        width: 80
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelTime,
                                        submitValue: false
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                },
                                fieldLabel: this.labelDateTo,
                                items: [
                                    {
                                        name : 'dateInDate2',
                                        xtype: 'datefield',
                                        altFormats:'d.m.y',
                                        width: 85
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelDate,
                                        submitValue: false
                                    },
                                    {
                                        name : 'dateInTime2',
                                        xtype: 'timefield',
                                        altFormats:'H:i',
                                        width: 80
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelTime,
                                        submitValue: false
                                    }
                                ]
                            }
                        ]
                    }
                    ,
                    {
                        xtype   :'fieldset',
                        title   :this.labelDateOut,
                        defaults:{
                            layout:{type:'hbox'},
                            labelWidth: 25
                        },
                        items:[
                            {
                                xtype: 'fieldcontainer',
                                anchor: '100%',
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                },
                                fieldLabel: this.labelDateFrom,
                                items: [
                                    {
                                        name : 'dateOutDate1',
                                        xtype: 'datefield',
                                        altFormats:'d.m.y',
                                        width: 85
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelDate
                                    },
                                    {
                                        name : 'dateOutTime1',
                                        xtype: 'timefield',
                                        altFormats:'H:i',
                                        width: 80
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelTime
                                    }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                anchor: '100%',
                                layout: {
                                    type: 'hbox',
                                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                                },
                                fieldLabel: this.labelDateTo,
                                items: [
                                    {
                                        name : 'dateOutDate2',
                                        xtype: 'datefield',
                                        altFormats:'d.m.y',
                                        width: 85
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelDate
                                    },
                                    {
                                        name : 'dateOutTime2',
                                        xtype: 'timefield',
                                        altFormats:'H:i',
                                        width: 80
                                    },
                                    {
                                        xtype: 'displayfield',
                                        value: this.labelTime
                                    }
                                ]
                            }
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
                        handler: function(btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: this.btnClose,
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
