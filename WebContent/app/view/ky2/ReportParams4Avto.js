Ext.define('TK.view.ky2.ReportParams4Avto', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2reportparams4avto',

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
                        xtype: 'datefield',
                        name: 'startDate',
                        altFormats: 'd.m.y',
                        fieldLabel: this.labelFrom,
                        value: new Date()
                    },
                    {
                        xtype: 'datefield',
                        name: 'endDate',
                        itemId: 'endDate',
                        altFormats: 'd.m.y',
                        value: new Date(),
                        fieldLabel: this.labelTo
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
