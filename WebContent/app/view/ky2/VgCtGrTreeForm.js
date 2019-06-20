Ext.define('TK.view.ky2.VgCtGrTreeForm', {
    extend: 'TK.view.ky2.AbstractTreeForm',
    alias: 'widget.ky2vgctgrtreeform',

    requires: [
        'Ext.form.Panel',
        'Ext.tab.Panel'
    ],

    config: {
        vagId: undefined
    },

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
            items: [
                {xtype:'textfield', fieldLabel:'№ вагона', name:"nvag", maxLength:13, allowBlank: false},
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Прибытие',
                    items: [{
                        name : 'dprbDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        width: 80
                    },{
                        xtype: 'displayfield',
                        value: 'Дата'
                    },{
                        name : 'dprbTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        width: 80
                    },{
                        xtype: 'displayfield',
                        value: 'Время'
                    }]
                },
                {
                    xtype: 'combo',
                    queryMode: 'local',
                    forceSelection: true,
                    fieldLabel: 'Номер пути',
                    name:'line',
                    allowBlank: false,
                    store: [[1, '1'], [2, '2']]
                },{
                    xtype:'textfield',
                    fieldLabel: 'Код принадлежности',
                    name: 'kpv',
                    maxLength: 28
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Подъемная сила',
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
                    fieldLabel: 'Масса тары',
                    decimalPrecision: 0,
                    name: 'masTar',
                    maxLength: 20
                },{
                    xtype: 'combo',
                    queryMode: 'local',
                    fieldLabel: 'Футовость',
                    name: 'foot',
                    store: ['20','40','60','80','2x20']
                },{
                    xtype:'textarea',
                    fieldLabel: 'Собственник',
                    name: 'sobstv',
                    maxLength: 128
                },{
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
                },
                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"otpravka"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: 'Контейнер',
            itemId: 'cont',
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
                    xtype:'fieldset',
                    title: 'Прибытие',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    width:250,
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
                },{
                    xtype:'checkbox',
                    name: 'poruz',
                    fieldLabel: 'Порожний?',
                    inputValue: true,
                    uncheckedValue: false
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Масса тары',
                    decimalPrecision: 0,
                    name: 'massa_tar',
                    maxLength: 20
                },{
                    xtype:'numberfield',
                    fieldLabel: 'Подъемная сила',
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
                    fieldLabel: 'Вид',
                    name: 'vid',
                    maxLength: 28
                },{
                    xtype:'textfield',
                    fieldLabel: 'Признак собственности',
                    name: 'prizn_sob',
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
                        maxLength: 128,
                        //allowBlank: false,
                        readOnly: true
                    },{
                        xtype: 'button',
                        text: '...',
                        action: 'nsiOwner'
                    },{
                        xtype: 'hidden',
                        name: 'owner.hid'
                    }]
                },{
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
                    maxLength: 96,
                    anchor: '99%'
                },{
                    xtype:'textfield',
                    fieldLabel: 'Пункт назначения',
                    name: 'punkt_nazn',
                    maxLength: 96,
                    anchor: '99%'
                },{
                    name : 'teh_obsl',
                    xtype: 'datefield',
                    fieldLabel: 'След. тех. обсл.',
                    altFormats:'d.m.y'
                },{
                    name : 'prim',
                    xtype: 'textarea',
                    fieldLabel: 'Примечание',
                    maxLength: 128,
                    anchor: '90%'
                },

                {xtype:'hidden', name:"sort"},
                {xtype:'hidden', name:"hid"}
            ]
        },{
            title: "Груз",
            itemId: 'gryz',
            items: [
                {
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
                },{
                    xtype:'textarea',
                    fieldLabel: 'Наименование груза ГНГ',
                    name: 'nzgr',
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
        }];
    },

    buildTreePanelStore: function () {
        return 'ky2.VgCtGrTreeNodes';
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
        }];
    }
});
