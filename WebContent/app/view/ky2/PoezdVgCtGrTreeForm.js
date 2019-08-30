Ext.define('TK.view.ky2.PoezdVgCtGrTreeForm', {
    extend: 'TK.view.ky2.AbstractTreeForm',
    alias: 'widget.ky2vgctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel'
    ],

    /*config: {
        poezdId: undefined
    },*/

    buildMainPanel: function(){
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
            items:[{
                hidden: false,
                xtype: 'component'
            }].concat(this.buildTabPanelItems())
        }];
    },

    buildTabPanelItems: function(){
        return [{
            title: 'Вагон',
            itemId: 'vag',
            defaults: {
                labelWidth: 150
            },
            items: [
                {xtype:'textfield', fieldLabel:'№ вагона', name:"nvag", maxLength:13, allowBlank: false},
                {
                    name : 'dprb',
                    xtype: 'datefield',
                    fieldLabel: 'Прибытие',
                    altFormats:'d.m.y H:i',
                    format:'d.m.y H:i',
                    readOnly: true
                },
                // {
                //     xtype:'fieldset',
                //     title: 'Прибытие',
                //     layout: 'anchor',
                //     defaults: {
                //         labelWidth: 138
                //     },
                //     width:305,
                //     items: [{
                //         fieldLabel:'Дата',
                //         name : 'dprbDate',
                //         xtype: 'datefield',
                //         altFormats:'d.m.y'
                //     },{
                //         fieldLabel:'Время',
                //         name : 'dprbTime',
                //         xtype: 'timefield',
                //         //snapToIncrement: true,
                //         altFormats:'H:i'
                //     }]
                // },
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    fieldLabel: 'Номер пути',
                    name:'line',
                    allowBlank: false,
                    store: [['1', '1'], ['2', '2']]
                }/*,{
                    xtype:'textfield',
                    fieldLabel: 'Код принадлежности',
                    name: 'kpv',
                    maxLength: 28
                }*/,{
                    xtype:'numberfield',
                    fieldLabel: 'Грузоподъемность',
                    decimalPrecision: 2,
                    minValue:0,
                    name: 'podSila',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Количество осей',
                    decimalPrecision: 0,
                    name: 'kolOs',
                    maxLength: 2
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Тара вагона',
                    decimalPrecision: 0,
                    name: 'masTar',
                    maxLength: 20
                }/*,{
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: 'Футовость',
                    name: 'foot',
                    store: ['20','40','60','80','2x20']
                }*/,{
                    xtype:'textarea',
                    fieldLabel: 'Собственник',
                    name: 'sobstv',
                    width:400,
                    maxLength: 128
                },/*{
                    xtype:'checkbox',
                    name: 'poruz',
                    fieldLabel: 'Порожний?',
                    inputValue: true,
                    uncheckedValue: false
                },{
                    xtype:'checkbox',
                    name: 'defective',
                    fieldLabel: 'Не исправен?',
                    inputValue: true,
                    uncheckedValue: false
                },{
                    name : 'bortDate',
                    xtype: 'datefield',
                    fieldLabel: 'Дата с борта',
                    altFormats:'d.m.y'
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Оставшийся пробег',
                    decimalPrecision: 0,
                    name: 'probeg',
                    maxLength: 20
                },{
                    name : 'plan_rem',
                    xtype: 'datefield',
                    fieldLabel: 'След. план. ремонт',
                    altFormats:'d.m.y'
                },{
                    name : 'reviz',
                    xtype: 'datefield',
                    fieldLabel: 'Ревизия',
                    altFormats:'d.m.y'
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Числовой тип',
                    decimalPrecision: 0,
                    minValue: 0,
                    name: 'type_no',
                    maxLength: 4
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Длина',
                    decimalPrecision: 2,
                    minValue: 0,
                    name: 'dlina',
                    maxLength: 12
                },{
                    xtype:'textfield',
                    fieldLabel: 'Модель',
                    name: 'model',
                    maxLength: 32
                },{
                    xtype:'textarea',
                    fieldLabel: 'Примечание',
                    name: 'prim',
                    maxLength: 512
                },*/
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"otpravka"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: 'Контейнер',
            itemId: 'cont',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    fieldLabel: 'Номер контейнера',
                    xtype:'textfield',
                    name: 'nkon',
                    itemId: 'nkon',
                    maxLength: 11,
                    enableKeyEvents: true,
                    allowBlank: false
                },{
                    fieldLabel: 'Отправка №',
                    xtype:'textfield',
                    name: 'notp',
                    itemId: 'notp',
                    maxLength: 11,
                    enableKeyEvents: true,
                    allowBlank: false
                },{
                    name : 'dprb',
                    xtype: 'datefield',
                    fieldLabel: 'Прибытие',
                    altFormats:'d.m.y H:i',
                    format:'d.m.y H:i',
                    readOnly: true

                }/*,{
                    xtype:'fieldset',
                    title: 'Прибытие',
                    layout: 'anchor',
                    defaults: {
                        labelWidth: 138
                    },
                    width:305,
                    items: [{
                        fieldLabel:'Дата',
                        name : 'dprbDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y'
                    },{
                        fieldLabel:'Время',
                        name : 'dprbTime',
                        xtype: 'timefield',
                        //snapToIncrement: true,
                        altFormats:'H:i'
                    }]
                }*/,{
                    xtype:'checkbox',
                    name: 'poruz',
                    fieldLabel: 'Порожний',
                    inputValue: true,
                    uncheckedValue: false
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Брутто груза',
                    decimalPrecision: 0,
                    name: 'massa_brutto',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Масса тары контейнера',
                    decimalPrecision: 0,
                    name: 'massa_tar',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Общая масса брутто',
                    decimalPrecision: 2,
                    minValue: 0,
                    name: 'massa_brutto_all',
                    itemId: 'massa_brutto_all',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Грузоподъемность',
                    decimalPrecision: 2,
                    minValue: 0,
                    name: 'pod_sila',
                    maxLength: 20
                },{
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: 'Футовость',
                    name: 'type',
                    store: ['20','30','40','40HC','45']
                },{
                    xtype:'textfield',
                    fieldLabel: 'Типоразмер контейнера',
                    name: 'vid',
                    maxLength: 28
                },{
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
                }/*,{
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
                    xtype:'textfield',
                    fieldLabel: 'Клиент',
                    name: 'gruzotpr',
                    width:400,
                    maxLength: 128
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
                }*/,{
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
                },{
                    name : 'prim',
                    xtype: 'textarea',
                    fieldLabel: 'Примечание',
                    width:400,
                    maxLength: 128
                },

                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: "Груз",
            itemId: 'gryz',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'Код груза ГНГ',
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
                    fieldLabel: 'Наименование груза ГНГ',
                    name: 'nzgr',
                    width:400,
                    maxLength: 4000
                },{
                    xtype:'textfield',
                    fieldLabel: 'Упаковка',
                    name: 'upak',
                    maxLength: 50
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Места',
                    name: 'places',
                    minValue: 0,
                    decimalPrecision: 0,
                    maxLength: 8
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Масса',
                    name: 'massa',
                    minValue: 0,
                    decimalPrecision: 3,
                    maxLength: 14
                },
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: "Пломба",
            itemId: 'plomb',
            defaults: {
                labelWidth: 150
            },
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'Пломба',
                    name: 'znak',
                    width: 400,
                    maxLength: 10
                },{
                    xtype:'textfield',
                    fieldLabel: 'Станция наложения',
                    name: 'station',
                    width: 400,
                    maxLength: 100
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Количество',
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
        return 'ky2.PoezdVgCtGrTreeNodes';
    },

    buildTreeToolbarItems: function () {
        return [{
            text: '+ Вагон',
            action: 'addVag',
            iconCls: 'vag',
            hidden: false
        },{
            text: '+ Контейнер',
            action: 'addCont',
            iconCls: 'cont3'
        },{
            text: '+ Груз',
            action: 'addGryz',
            iconCls: 'gryz'
        },{
            text: '+ Пломба',
            action: 'addPlomb',
            iconCls: 'doc_new'
        }];
    }
});
