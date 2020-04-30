Ext.define('TK.view.ky2.client.Filter', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2clientfilter',
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
                        name: 'dprbStart',
                        altFormats: 'd.m.y',
                        fieldLabel: this.lblArrivalFrom
                    },
                    {
                        xtype: 'datefield',
                        name: 'dprbEnd',
                        altFormats: 'd.m.y',
                        fieldLabel: this.lblArrivalTo
                    },
                    {
                        xtype: 'textfield',
                        name: 'nkon',
                        fieldLabel: this.lblContainer
                    },
                    {
                        xtype: 'radiogroup',
                        fieldLabel: this.lblPlace,
                        columns: 1,
                        vertical: true,
                        items: [
                            {boxLabel: this.lblAll, name: 'location', inputValue: '0', checked: true},
                            {boxLabel: this.lblVagon, name: 'location', inputValue: '1'},
                            {boxLabel: this.lblTruck, name: 'location', inputValue: '2'}
                        ]
                    },
                    {
                        xtype: 'numberfield',
                        minValue: 1,
                        allowDecimals: false,
                        name: 'kyDays',
                        fieldLabel: this.lblDaysQuantity
                    }
                ],
                buttons: [
                    {
                        text: this.btnFilter,
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterClient'
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
