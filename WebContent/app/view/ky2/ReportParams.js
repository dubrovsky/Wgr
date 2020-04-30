Ext.define('TK.view.ky2.ReportParams', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2reportparams',

    requires: [
        'TK.store.ky2.ReportsForm'
    ],

    autoShow: true,
    modal: true,
    y: 0,
    title: this.title,
    initComponent: function () {
        this.items = [
            {
                xtype: 'form',
                store: Ext.create('TK.store.ky2.ReportsForm'),
                bodyPadding: 5,
                items: [
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        forceSelection: true,
                        fieldLabel: this.labelDepArr,
                        name:'status_ad',
                        allowBlank: true,
                        store: [['-', this.storeTxtAll], ['a', this.storeTxtArrival], ['d', this.storeTxtDeparture]]
                    },
                    {
                        xtype: 'datefield',
                        name: 'startDate',
                        altFormats: 'd.m.y',
                        fieldLabel: this.labelFrom
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        itemId: 'endDate',
                        altFormats: 'd.m.y',
                        fieldLabel: this.labelTo
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.labelIntTrainNumber,
                        itemId: 'npprm',
                        multiSelect: true,
                        queryMode: 'local',
                        store: 'ky2.ReportsPoezdsInInterval',
                        displayField: 'npprm',
                        valueField: 'hid',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'npprm',
                        listConfig: {
                            loadingText: this.loadintTxt,
                            emptyText: this.emptyText
                        }
                    },
                    {
                        xtype: 'combo',
                        fieldLabel: this.labelClient,
                        itemId: 'hid_client',
                        queryMode: 'local',
                        store: 'ky2.ReportsClientInterval',
                        displayField: 'name',
                        valueField: 'hid_client',
                        typeAhead: false,
                        forceSelection: true,
                        name: 'hid_client',
                        listConfig: {
                            loadingText: this.loadintTxt,
                            emptyText: this.emptyText
                        }
                    },
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        forceSelection: true,
                        fieldLabel: this.labelVehicleByArr,
                        name:'tr_arrival',
                        allowBlank: true,
                        store: [['-', this.storeTxtAll], ['w', this.storeTxtVagon], ['a', this.storeTxtTruck]]
                    },
                    {
                        xtype: 'combo',
                        queryMode: 'local',
                        forceSelection: true,
                        fieldLabel: this.labelVehicleByDep,
                        name:'tr_departure',
                        allowBlank: true,
                        store: [['-', this.storeTxtAll], ['w', this.storeTxtVagon], ['a', this.storeTxtTruck]]
                    }

                ],
                buttons: [
                    {
                        text: this.buttonOk,
                        formBind: true,
                        disabled: true,
                        action: 'getReport'
                    },
                    {
                        text: this.buttonClear,
                        handler: function (btn) {
                            btn.up('form').getForm().reset();
                        }
                    },
                    {
                        text: this.buttonClose,
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
