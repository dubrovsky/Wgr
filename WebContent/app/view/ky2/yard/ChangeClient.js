Ext.define('TK.view.ky2.yard.ChangeClient', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2yardchangeclient',
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
                        name: 'changeDate',
                        format: 'd.m.y',
                        fieldLabel: this.lblDateFrom,
                        allowBlank: false

                    },
                    {
                        fieldLabel:this.lbltimeFrom,
                        name : 'changeTime',
                        xtype: 'timefield',
                        //snapToIncrement: true,
                        format:'H:i',
                        allowBlank: false
                    },
                    {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox'
                        },
                        fieldLabel: this.lblClient,
                        items: [{
                            xtype: 'textfield',
                            name: 'gruzotpr',
                            itemId: 'gruzotpr',
                            maxLength: 128,
                            flex: 1,
                            allowBlank: false
                        }, {
                            xtype: 'hidden',
                            name: 'clientHid',
                            itemId: 'clientHid'
                        }, {
                            xtype: 'button',
                            margins: {top: 0, right: 0, bottom: 0, left: 3},
                            text: '...',
                            itemId: 'gruzotprDir',
                            action: 'nsiOtpr'
                        }]
                    }
                ],
                buttons: [
                    {
                        text: this.btnChangeCl,
                        formBind: true,
                        disabled: true,
                        action: 'changeClient'
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
