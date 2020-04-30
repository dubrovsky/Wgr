Ext.define('TK.view.ky2.avto.BaseAvtoForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2baseavtoform',

    // region: 'center',
    // split: true,
    // layout: {
    //     type: 'hbox'
    // },
    // fieldDefaults: {labelWidth: 150},
    // flex: 2,
    buildItems: function(config) {
        config.items = [{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaults: {
                // anchor: '100%',
                width: 450,
                labelWidth: 150
            },
            margin: '0 15 0 0',
            items: [{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: this.lblTruckN,
                items: [{
                    xtype: 'textfield',
                    name: 'no_avto',
                    itemId: 'no_avto',
                    maxLength: 25,
                    allowBlank: true
                // }, {
                //     xtype: 'button',
                //     iconCls: 'check1',
                //     action: 'getAvto'
                // }, {
                //     xtype: 'button',
                //     text: '...',
                //     action: 'nsiAvto'
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: this.lblTrailerN,
                name: 'no_trail',
                maxLength: 250
            }, {
                xtype: 'textfield',
                fieldLabel: this.lblDriverFullName,
                name: 'driver_fio',
                maxLength: 250
            }, {
                xtype: 'textfield',
                fieldLabel: this.lblDriversPasport,
                name: 'driver_pasp',
                maxLength: 25
            },{
                name : 'prim',
                xtype: 'textarea',
                fieldLabel: this.lblNotes,
                width:450,
                maxLength: 500
            // }, {
            //     xtype: 'fieldcontainer',
            //     layout: {
            //         type: 'hbox',
            //         defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
            //     },
            //     fieldLabel: 'Клиент',
            //     items: [{
            //         xtype: 'textfield',
            //         name: 'client.sname',
            //         maxLength: 128,
            //         // rows: 3,
            //         flex: 1,
            //         readOnly: true,
            //         allowBlank: false
            //     }, {
            //         xtype: 'button',
            //         text: '...',
            //         itemId: 'gruzotprDir',
            //         action: 'nsiOtpr'
            //     }]
            }]
        }]
    },
    buildTopToolbar: function (config) {
        config.tbar = this.buildButtons();
        config.tbar.splice(1, 0,
            {
                text: this.btnSaveExit,
                formBind: true,
                disabled: true,
                iconCls: 'save_close',
                action: 'saveExit'
            }, '-'
            , {
                text:this.btnClose,
                iconCls:'close1',
                action:'close'
            } ,'-'
        );


    }/*,
    initFieldsWithDefaultsValues: function() {
        var form = this.getForm(),
            now = new Date();
        //form.findField('dprb').setValue(now);
        form.findField('dprbDate').setValue(now);
        form.findField('dprbTime').setValue(now);
    }*/
});
