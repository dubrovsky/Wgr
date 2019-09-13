Ext.define('TK.view.ky2.avto.into.AvtoForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2avtointoform',
    title: 'Авто, прибытие',

    closable: false,
    layout: 'fit',
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'ky2baseavtoform',
        itemId: 'ky2avtoform',
        buildItems: function(config) {
            TK.view.ky2.avto.BaseAvtoForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            //this.callParent(arguments);
            config.items.splice(0, 0, {
                xtype:'fieldset',
                title: 'Прибытие',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:450,
                items: [{
                    labelWidth: '145px',
                    fieldLabel:'Дата',
                    name : 'dprbDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    labelWidth: '145px',
                    fieldLabel:'Время',
                    name : 'dprbTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    // altFormats:'H:i',
                    format:'H:i'
                }]
            });
            config.items.push(
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    width: 450,
                    labelWidth: 150,
                    fieldLabel: 'Заявка на контейнер',
                    items: [{
                        xtype: 'textfield',
                        name: 'ret_nkon',
                        maxLength: 15,
                        // rows: 3,
                        flex: 1
                    }, {
                        xtype: 'button',
                        text: '...',
                        action: 'retNkonFind'
                    }]
                }, {
                        xtype: 'label',
                        text: '',
                        id: 'kontSectorLocation',
                        margin: '0 0 0 160',
                        cls: 'green'
                    }
            );
            // config.items[0].items.splice(0, 0, {
            //     fieldLabel:'Прибытие',
            //     name : 'dprbDate',
            //     xtype: 'datefield',
            //     altFormats:'d.m.y'
            // });
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
                    title: 'Прибытие',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    //width:250,
                    items: [{
                        fieldLabel:'Дата',
                        name : 'dprbDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y'
                    },{
                        fieldLabel:'Время',
                        name : 'dprbTime',
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
        },*/
        /*buildTopToolbar: function (config) {
            config.tbar = this.buildButtons();
        },*/
        initFieldsWithDefaultsValues: function() {
            var form = this.getForm(),
                now = new Date();
            //form.findField('dprb').setValue(now);
                form.findField('dprbDate').setValue(now);
                form.findField('dprbTime').setValue(now);
        },
        buildTopToolbar: function(config){
            TK.view.ky2.avto.BaseAvtoForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
            );

            config.tbar.push(
                {xtype:'splitbutton', text: 'Печать', iconCls:'upload', action: 'print',
                    menu: [
                        {text: 'PZ', iconCls:'excel', action:'pz'},'-'
                    ]
                },{
                    text: '+Контейнер/Груз',
                    iconCls: 'edit',
                    action: 'editCtGr'
                }
            );

        }

    }
    // ,{
    //     region: 'south',
    //     xtype: 'kykontinavtointolist',
    //     flex: 1,
    //     hidden: true,
    //     //split: true,
    //     itemId: 'kykontlist'
    // }
    ]
});
