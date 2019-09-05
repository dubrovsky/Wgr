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
                fieldLabel: 'Номер авто',
                items: [{
                    xtype: 'textfield',
                    name: 'no_avto',
                    itemId: 'no_avto',
                    maxLength: 25,
                    allowBlank: false
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
                fieldLabel: 'Номер прицепа',
                name: 'no_trail',
                maxLength: 250
            }, {
                xtype: 'textfield',
                fieldLabel: 'ФИО водителя',
                name: 'driver_fio',
                maxLength: 250
            }, {
                xtype: 'textfield',
                fieldLabel: 'Марка автотранспортного средства',
                name: 'type_avto',
                maxLength: 250
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Собственник',
                items: [{
                    xtype: 'textfield',
                    name: 'naim_sob',
                    maxLength: 128,
                    // rows: 3,
                    flex: 1
                    //allowBlank: false,
                    //readOnly: true
                }, {
                    xtype: 'button',
                    text: '...',
                    action: 'nsiOwner'
                }, {
                    xtype: 'hidden',
                    name: 'owner.hid'
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Клиент',
                items: [{
                    xtype: 'textfield',
                    name: 'client',
                    maxLength: 128,
                    // rows: 3,
                    flex: 1
                }, {
                    xtype: 'button',
                    text: '...',
                    itemId: 'clientDir',
                    action: 'nsiClient'
                }]
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Грузоотправитель',
                items: [{
                    xtype: 'textfield',
                    name: 'otp_cargo',
                    maxLength: 500,
                    // rows: 3,
                    flex: 1
                }, {
                    xtype: 'button',
                    text: '...',
                    action: 'nsiGruzOtpr'
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Пункт отправления',
                name: 'departure',
                maxLength: 500,
                // rows: 3
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Грузополучатель',
                items: [{
                    xtype: 'textfield',
                    name: 'pol_cargo',
                    maxLength: 500,
                    // rows: 3,
                    flex: 1
                }, {
                    xtype: 'button',
                    text: '...',
                    action: 'nsiGruzPol'
                }]
            },/*{
                            xtype: 'textarea',
                            fieldLabel: 'Грузополучатель',
                            name: 'pol_cargo',
                            maxLength: 500,
                            rows: 3
                        },*/{
                xtype: 'textfield',
                fieldLabel: 'Пункт назначения',
                name: 'destination',
                maxLength: 500,
                // rows: 3
            }, {
                xtype: 'textfield',
                fieldLabel: 'Примечание',
                name: 'prim_avto',
                maxLength: 500,
                // rows: 3
            }]
        }]
        // , {
        //     xtype: 'container',
        //     flex: 2,
        //     layout: 'anchor',
        //     defaults: {
        //         anchor: '100%'
        //     },
        //     items: [/*{
        //         xtype: 'textarea',
        //         fieldLabel: 'Грузоотправитель',
        //         name: 'otp_cargo',
        //         maxLength: 500,
        //         rows: 3
        //     },*/{
        //         xtype: 'fieldcontainer',
        //         layout: {
        //             type: 'hbox',
        //             defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        //         },
        //         fieldLabel: 'Грузоотправитель',
        //         items: [{
        //             xtype: 'textarea',
        //             name: 'otp_cargo',
        //             maxLength: 500,
        //             rows: 3,
        //             flex: 1
        //         }, {
        //             xtype: 'button',
        //             text: '...',
        //             action: 'nsiGruzOtpr'
        //         }]
        //     }, {
        //         xtype: 'textarea',
        //         fieldLabel: 'Пункт отправления',
        //         name: 'departure',
        //         maxLength: 500,
        //         rows: 3
        //     }, {
        //         xtype: 'fieldcontainer',
        //         layout: {
        //             type: 'hbox',
        //             defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
        //         },
        //         fieldLabel: 'Грузополучатель',
        //         items: [{
        //             xtype: 'textarea',
        //             name: 'pol_cargo',
        //             maxLength: 500,
        //             rows: 3,
        //             flex: 1
        //         }, {
        //             xtype: 'button',
        //             text: '...',
        //             action: 'nsiGruzPol'
        //         }]
        //     },/*{
        //         xtype: 'textarea',
        //         fieldLabel: 'Грузополучатель',
        //         name: 'pol_cargo',
        //         maxLength: 500,
        //         rows: 3
        //     },*/{
        //         xtype: 'textarea',
        //         fieldLabel: 'Пункт назначения',
        //         name: 'destination',
        //         maxLength: 500,
        //         rows: 3
        //     }, {
        //         xtype: 'textarea',
        //         fieldLabel: 'Примечание',
        //         name: 'prim_avto',
        //         maxLength: 500,
        //         rows: 3
        //     }]
        // }]
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
