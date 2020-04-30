Ext.define('TK.view.ky2.avto.FilterAvto', {
    extend: 'Ext.window.Window',
    alias: 'widget.ky2avtofilter',
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
                        fieldLabel: this.labelFateFrom
                    },
                    {
                        xtype: 'textfield',
                        name: 'no_avto',
                        fieldLabel: this.labelNTruck
                    },
                    {
                        xtype: 'textfield',
                        name: 'no_trail',
                        fieldLabel: this.labelNTrailer
                    },
                    {
                        xtype: 'textfield',
                        name: 'driver_fio',
                        fieldLabel: this.labelDriverFam
                    },
                    {
                        xtype: 'textfield',
                        name: 'nkon',
                        fieldLabel: this.labelContainer
                    }
                ],
                buttons: [
                    {
                        text: this.btnFilter,
                        formBind: true,
                        disabled: true,
                        action: 'applyFilterAvto'
                    },
                    {
                        text: this.btnClear,
                        action: 'clearFilterAvto'
                        // handler: function (btn) {
                        //     btn.up('form').getForm().reset();
                        // }
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
