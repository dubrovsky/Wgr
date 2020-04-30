Ext.define('TK.view.ky.avto.out.Form', {
    extend: 'Ext.container.Container',
    alias: 'widget.kyavtooutform',

    requires: [
        'TK.view.ky.avto.BaseAvtoForm',
        'TK.view.ky.avto.out.kont.List'
    ],

    title: 'Авто, отправление',

    closable: false,
    layout: 'border',
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'kybaseavtoform',
        itemId: 'kyavtoform',
        buildItems: function(config) {
            TK.view.ky.avto.BaseAvtoForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            //this.callParent(arguments);
            config.items[0].items.splice(0, 0, {
                xtype:'fieldset',
                title: '!Отправление',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:250,
                items: [{
                    fieldLabel:'Дата',
                    name : 'dotpDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    fieldLabel:'Время',
                    name : 'dotpTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    altFormats:'H:i'
                }]
            });
        },

            /*buildItems: function(config) {
                config.items = [{
                    xtype: 'container',
                    flex: 1,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    margin: '0 15 0 0',
                    items: [{
                        xtype:'fieldset',
                        title: 'Отправление',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        //width:250,
                        items: [{
                            fieldLabel:'Дата',
                            name : 'dotpDate',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel:'Время',
                            name : 'dotpTime',
                            xtype: 'timefield',
                            snapToIncrement: true,
                            altFormats:'H:i'
                        }]
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Номер авто',
                        name: 'no_avto',
                        maxLength: 250
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Номер прицепа',
                        name: 'no_trail',
                        maxLength: 250
                    },{
                        xtype: 'textfield',
                        fieldLabel: 'Марка автотранспортного средства',
                        name: 'type_avto',
                        maxLength: 250
                    }]
                },{
                    xtype: 'container',
                    flex: 2,
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        xtype: 'textarea',
                        fieldLabel: 'Грузоотправитель',
                        name: 'otp_cargo',
                        maxLength: 500,
                        rows: 3
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Пункт отправления',
                        name: 'departure',
                        maxLength: 500,
                        rows: 3
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Грузополучатель',
                        name: 'pol_cargo',
                        maxLength: 500,
                        rows: 3
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Пункт назначения',
                        name: 'destination',
                        maxLength: 500,
                        rows: 3
                    },{
                        xtype: 'textarea',
                        fieldLabel: 'Примечание',
                        name: 'prim_avto',
                        maxLength: 500,
                        rows: 3
                    }]
                }]
            },
            buildTopToolbar: function (config) {
                config.tbar = this.buildButtons();
            },*/
            initFieldsWithDefaultsValues: function() {
                var form = this.getForm(),
                    now = new Date();
                //form.findField('dotp').setValue(now);
                form.findField('dotpDate').setValue(now);
                form.findField('dotpTime').setValue(now);
            }
        },
        {
            region: 'south',
            xtype: 'kykontinavtooutlist',
            flex: 1,
            hidden: true,
            //split: true,
            itemId: 'kykontlist'
        }
    ]
});
