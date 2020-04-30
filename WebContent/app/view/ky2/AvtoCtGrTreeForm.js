Ext.define('TK.view.ky2.AvtoCtGrTreeForm', {
    extend: 'TK.view.ky2.AbstractTreeForm',
    alias: 'widget.ky2avtoctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel'
    ],

    buildMainPanel: function () {
        return [{
            xtype: 'tabpanel',
            flex: 2,
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
            items: [{
                hidden: false,
                xtype: 'component'
            }].concat(this.buildTabPanelItems())
        }];
    },

    buildTabPanelItems: function () {
        return [{
            title: this.titleCont,
            itemId: 'cont',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'fieldcontainer',
                    width: 520,
                    layout: {
                        type: 'table',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    defaults: {
                        columnWidth: 0.5
                    },
                    items: [{
                        xtype: 'fieldset',
                        title: this.labelNum,
                        layout: 'anchor',
                        defaults: {
                            labelWidth: 80
                        },
                        items: [{
                            fieldLabel: this.labelCont,
                            xtype: 'textfield',
                            name: 'nkon',
                            itemId: 'nkon',
                            maxLength: 11,
                            enableKeyEvents: true,
                            allowBlank: false,
                            validator: TK.Validators.kontNum2
                        }, {
                            fieldLabel: this.labalOtpr,
                            xtype: 'textfield',
                            name: 'notp',
                            itemId: 'notp',
                            maxLength: 11
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: this.labelNorder,
                        layout: 'anchor',
                        defaults: {
                            labelWidth: 80
                        },
                        items: [{
                            fieldLabel: this.labelArrival,
                            xtype: 'textfield',
                            name: 'zayav_in',
                            itemId: 'zayav_in',
                            maxLength: 50
                        }, {
                            fieldLabel: this.labelDeparture,
                            xtype: 'textfield',
                            name: 'zayav_out',
                            itemId: 'zayav_out',
                            maxLength: 50
                        }]
                    }]
                },
                {
                    xtype: 'fieldcontainer',
                    width: 500,
                    layout: {
                        type: 'table',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    defaults: {
                        columnWidth: 0.5
                    },
                    items: [{
                        xtype: 'fieldset',
                        title: this.labelArrival,
                        layout: 'anchor',
                        defaults: {
                            labelWidth: 80
                        },

                        items: [{
                            fieldLabel: this.labelDate,
                            name: 'dprbDate',
                            xtype: 'datefield',
                            altFormats: 'd.m.y'
                        }, {
                            fieldLabel: this.labelTime,
                            name: 'dprbTime',
                            xtype: 'timefield',
                            //snapToIncrement: true,
                            format: 'H:i'
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: this.labelDeparture,
                        layout: 'anchor',
                        defaults: {
                            labelWidth: 80
                        },
                        items: [{
                            fieldLabel: this.labelDate,
                            name: 'dotpDate',
                            xtype: 'datefield',
                            format: 'd.m.y'
                        }, {
                            fieldLabel: this.labelTime,
                            name: 'dotpTime',
                            xtype: 'timefield',
                            //snapToIncrement: true,
                            format: 'H:i'
                        }]
                    }]
                }, {
                    xtype: 'checkbox',
                    name: 'poruz',
                    fieldLabel: this.labelEmtyWag,
                    inputValue: true,
                    uncheckedValue: false
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelBrutto,
                    decimalPrecision: 3,
                    name: 'massa_brutto',
                    itemId: 'massa_brutto',
                    maxLength: 20
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelTara,
                    decimalPrecision: 3,
                    name: 'massa_tar',
                    itemId: 'massa_tar',
                    maxLength: 20
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelTotalBrutto,
                    decimalPrecision: 3,
                    minValue: 0,
                    name: 'massa_brutto_all',
                    itemId: 'massa_brutto_all',
                    maxLength: 20
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelTonnage,
                    decimalPrecision: 2,
                    minValue: 0,
                    name: 'pod_sila',
                    itemId: 'pod_sila',
                    maxLength: 20
                }, {
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: this.labelSize,
                    name: 'type',
                    itemId: 'type',
                    store: ['20', '30', '40', '40HC', '45']
                }, {
                    xtype: 'textfield',
                    fieldLabel: this.labelContSize,
                    name: 'vid',
                    itemId: 'vid',
                    maxLength: 28
                }, {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: this.labelClient,
                    labelWidth: 150,
                    width: 400,
                    items: [{
                        xtype: 'textfield',
                        name: 'gruzotpr',
                        maxLength: 128,
                        flex: 1,
                        allowBlank: false
                    }, {
                        xtype: 'button',
                        text: '...',
                        itemId: 'gruzotprDir',
                        action: 'nsiOtpr'
                    }]
                }, {
                    name: 'prim',
                    xtype: 'textarea',
                    fieldLabel: this.labelNotes,
                    width: 400,
                    maxLength: 128
                },

                {xtype: 'hidden', name: "clientHid"},
                {xtype: 'hidden', name: "sort"},
                {xtype: 'hidden', name: "hid"}
            ]
        }, {
            title: this.titleCargo,
            itemId: 'gryz',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: this.labelCodeGng,
                    name: 'kgvn',
                    maxLength: 10
                },
                {
                    xtype: 'textarea',
                    fieldLabel: this.labelNameGng,
                    name: 'nzgr',
                    width: 400,
                    maxLength: 4000
                }, {
                    xtype: 'textfield',
                    fieldLabel: this.labelPackage,
                    name: 'upak',
                    maxLength: 50
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelPlaces,
                    name: 'places',
                    minValue: 0,
                    decimalPrecision: 0,
                    maxLength: 8
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelMassa,
                    name: 'massa',
                    minValue: 0,
                    decimalPrecision: 3,
                    maxLength: 14
                },
                {xtype: 'hidden', name: "sort"},
                {xtype: 'hidden', name: "hid"}
            ]
        }, {
            title: "Пломба",
            itemId: 'plomb',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: this.titlePlomb,
                    name: 'znak',
                    width: 400,
                    maxLength: 128
                }, {
                    xtype: 'textfield',
                    fieldLabel: this.labelSealingStation,
                    name: 'station',
                    width: 400,
                    maxLength: 100
                }, {
                    xtype: 'numberfield',
                    fieldLabel: this.labelQuantity,
                    name: 'kpl',
                    minValue: 0,
                    decimalPrecision: 0,
                    maxLength: 2
                },
                {xtype: 'hidden', name: "sort"},
                {xtype: 'hidden', name: "hid"}
            ]
        }];
    },

    buildTreePanelStore: function () {
        return 'ky2.AvtoCtGrTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [
            {
                text: this.btnAddCont,
                action: 'addCont',
                iconCls: 'cont3',
                hidden: false
            }, {
                text: this.btnAddCorgo,
                action: 'addGryz',
                iconCls: 'gryz',
                hidden: false
            }, {
                text: this.btnAddPlomb,
                action: 'addPlomb',
                iconCls: 'doc_new'
            // }, {
            //     text: this.btnAct,
            //     action: 'addAct',
            //     iconCls: 'doc_new'
            // }, {
            //     text: this.btnInterchange,
            //     action: 'addInterchange',
            //     iconCls: 'doc_new'
            }];
    }
});
