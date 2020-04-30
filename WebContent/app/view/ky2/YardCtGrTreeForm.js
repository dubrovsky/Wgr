Ext.define('TK.view.ky2.YardCtGrTreeForm', {
    extend: 'TK.view.ky2.AbstractTreeForm',
    alias: 'widget.ky2yardctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel',
        'TK.Validators'
    ],

    /*config: {
        poezdId: undefined
    },*/

    buildMainPanel: function(){
        return [{
            xtype: 'tabpanel',
            flex: 3,
            defaults: {
                xtype: 'form',
                defaults: {
                    anchor: '100%'
                },
                hidden: true,
                bodyPadding: 5
            },
            tabBar: {
                hidden: true
            },
            items:[{
                hidden: false,
                xtype: 'component'
            }].concat(this.buildTabPanelItems())
        }];
    },

    buildTabPanelItems: function(){
        return [{
            title: this.title,
            itemId: 'cont',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'combo',
                    itemId:'kontsectors',
                    store: 'ky2.YardSectors',
                    displayField: 'name',
                    valueField:'hid',
                    typeAhead: false,
                    forceSelection: true,
                    allowBlank: false,
                    name: 'sector',
                    fieldLabel: this.lblSector
                },{
                    fieldLabel: this.lblKontN,
                    xtype:'textfield',
                    name: 'nkon',
                    itemId: 'nkon',
                    maxLength: 11,
                    enableKeyEvents: true,
                    allowBlank: false,
                    validator: TK.Validators.kontNum2
                },{
                    fieldLabel: this.lblOtprN,
                    xtype:'textfield',
                    name: 'notp',
                    itemId: 'notp',
                    maxLength: 11,
                    enableKeyEvents: true,
                    allowBlank: false
                },{
                    xtype:'fieldset',
                    title: this.lblArrival,
                    layout: 'anchor',
                    width:305,
                    defaults: {
                        labelWidth: 138
                    },
                    items: [{
                        fieldLabel:this.lblDate,
                        name : 'dprbDate',
                        xtype: 'datefield',
                        format:'d.m.y'
                    },{
                        fieldLabel:this.lblTime,
                        name : 'dprbTime',
                        xtype: 'timefield',
                        //snapToIncrement: true,
                        format:'H:i'
                    }]
                }, {
                    xtype: 'fieldset',
                    title: this.lblOrderN,
                    layout: 'anchor',
                    width:305,
                    defaults: {
                        labelWidth: 138
                    },
                    items: [{
                        fieldLabel: this.lblArrival,
                        xtype: 'textfield',
                        name: 'zayav_in',
                        itemId: 'zayav_in',
                        maxLength: 50
                    }, {
                        fieldLabel: this.lblDeparture,
                        xtype: 'textfield',
                        name: 'zayav_out',
                        itemId: 'zayav_out',
                        maxLength: 50
                    }]
                },{
                    xtype:'checkbox',
                    name: 'poruz',
                    fieldLabel: this.lblEmpty,
                    inputValue: true,
                    uncheckedValue: false
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblBrutto,
                    decimalPrecision: 3,
                    name: 'massa_brutto',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblMasTara,
                    decimalPrecision: 3,
                    name: 'massa_tar',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblTotalBrutto,
                    decimalPrecision: 3,
                    minValue: 0,
                    name: 'massa_brutto_all',
                    itemId: 'massa_brutto_all',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel:this.lblMaxWeight ,
                    decimalPrecision: 2,
                    minValue: 0,
                    name: 'pod_sila',
                    maxLength: 20
                },{
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: this.labelSize,
                    name: 'type',
                    store: ['20','30','40','40HC','45']
                },{
                    xtype:'textfield',
                    fieldLabel: this.lblType,
                    name: 'vid',
                    maxLength: 28
                }/*,{
                    xtype:'textfield',
                    fieldLabel: 'Признак собственности',
                    name: 'prizn_sob',
                    maxLength: 128,
                    width:400
                },{
                    xtype:'textfield',
                    fieldLabel: 'Собственник',
                    name: 'naim_sob',
                    width:400,
                    maxLength: 128
                },{
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Собственник',
                    items: [{
                        xtype:'textarea',
                        name: 'naim_sob',
                        maxLength: 128
                        //allowBlank: false,
                       // readOnly: true
                    },{
                        xtype: 'button',
                        text: '...',
                        action: 'nsiOwner'
                    },{
                        xtype: 'hidden',
                        name: 'owner.hid'
                    }]
                }*/,{
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox'
                    },
                    fieldLabel: this.lblClient,
                    labelWidth: 150,
                    width:400,
                    items: [{
                        xtype:'textfield',
                        name: 'gruzotpr',
                        itemId: 'gruzotpr',
                        maxLength: 128,
                        flex:1
                    },{
                        xtype: 'button',
                        margins: {top: 0, right: 0, bottom: 0, left: 3},
                        text: '...',
                        itemId: 'gruzotprDir',
                        action: 'nsiOtpr'
                    }]
                }/*,{
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Клиент',
                    items: [{
                        xtype:'textarea',
                        name: 'gruzotpr',
                        maxLength: 128,
                        flex:1
                    },{
                        xtype: 'button',
                        text: '...',
                        itemId: 'gruzotprDir',
                        action: 'nsiOtpr'
                    }]
                },{
                    xtype:'textfield',
                    fieldLabel: 'Пункт отправления',
                    name: 'punkt_otpr',
                    width:400,
                    maxLength: 96
                },{
                    xtype:'textfield',
                    fieldLabel: 'Пункт назначения',
                    name: 'punkt_nazn',
                    width:400,
                    maxLength: 96
                }*/,{
                    name : 'prim',
                    xtype: 'textarea',
                    fieldLabel: this.lblNotes,
                    width:400,
                    maxLength: 128
                },
                {xtype: 'hidden', name: "clientHid"},
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: this.titleCargo,
            itemId: 'gryz',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: this.lblCodeGng,
                    name: 'kgvn',
                    maxLength: 10
                },
                /*{
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Код груза ГНГ',
                    items: [{
                        xtype:'textfield',
                        name: 'kgvn',
                        maxLength: 10
                    },{
                        xtype: 'button',
                        text: '...',
                        itemId: 'nsiGng',
                        action: 'nsiGng'
                    }]
                },*/{
                    xtype:'textarea',
                    fieldLabel: this.lblnameGng,
                    name: 'nzgr',
                    width:400,
                    maxLength: 4000
                },{
                    xtype:'textfield',
                    fieldLabel: this.lblPackege,
                    name: 'upak',
                    maxLength: 50
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblPlaces,
                    name: 'places',
                    minValue: 0,
                    decimalPrecision: 0,
                    maxLength: 8
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblWeight,
                    name: 'massa',
                    itemId: 'massa',
                    minValue: 0,
                    decimalPrecision: 3,
                    maxLength: 14
                },
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: this.lblPlomb,
            itemId: 'plomb',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: this.lblPlomb,
                    name: 'znak',
                    width: 400,
                    maxLength: 128
                },{
                    xtype:'textfield',
                    fieldLabel: this.lblSealingStation,
                    name: 'station',
                    width: 400,
                    maxLength: 100
                },{
                    xtype:'numberfield',
                    fieldLabel: this.lblQuantity,
                    name: 'kpl',
                    minValue: 0,
                    decimalPrecision: 0,
                    maxLength: 2
                },
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        }];
    },

    buildTreePanelStore: function () {
        return 'ky2.AvtoCtGrTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [
            {
            //     text: '+ Контейнер',
            //     action: 'addCont',
            //     iconCls: 'cont3',
            //     hidden: false
            // }, {
                text: this.btnAddCargo,
                action: 'addGryz',
                iconCls: 'gryz'
                // hidden: false
            }, {
                text: this.btnAddPlomb,
                action: 'addPlomb',
                iconCls: 'doc_new'
            }];
    }
});
