Ext.define('TK.view.ky.poezd.BaseVagonForm', {
    extend: 'TK.view.ky.AbstractForm',
    alias:'widget.kybasevagonform',

    layout: {
        type: 'hbox'/*,
         align: 'stretch'*/
    },
    prepareForm: function(koleyaValue, lineValue){
        var form = this.getForm(),
            lineField = form.findField('line'),
            nvagField = form.findField('nvag'),
            nvagCheckBtn = this.down('fieldcontainer button#nvagCheck'),
            nvagDirBtn = this.down('fieldcontainer button#nvagDir');
        if(koleyaValue == 1) {
            lineField.getStore().loadData(
                [['948S'], ['949S'], ['950S'], ['951S'], ['Ciern/T']]
            );

            nvagField.vTypes.push('vagShirNum');
            nvagCheckBtn.action = 'getVagonShir';
            nvagDirBtn.action = 'nsiVagShir';
        } else if(koleyaValue == 2){
            lineField.getStore().loadData(
                [['880'], ['881'], ['882'], ['883'], ['884'], ['948']]
            );

            nvagField.vTypes.push('vagUzkyNum');
            nvagCheckBtn.action = 'getVagonUzky';
            nvagDirBtn.action = 'nsiVagUzky';
        }
    },
    buildItems: function(config) {
        config.items = [{
            xtype: 'container',
            flex:1,
            layout:'anchor',
            items:[
                {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Номер вагона',
                    items: [{
                        xtype:'textfield',
                        name: 'nvag',
                        itemId: 'nvag',
                        maxLength: 13,
                        allowBlank: false,
                        vTypes: [
                            'vagUnique'
                        ]
                    },{
                        xtype: 'button',
                        iconCls: 'check1',
                        itemId: 'nvagCheck'
                    },{
                        xtype: 'button',
                        text: '...',
                        itemId: 'nvagDir'
                    }]
                },
            /*{
                xtype: 'fieldcontainer',
                itemId: 'zhirVagCont',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Номер широкого вагона',
                items: [{
                    xtype:'textfield',
                    name: 'nvag',
                    maxLength: 12,
                    allowBlank: false,
                    vTypes: [
                        'vagShirNum',
                        'vagUnique'
                    ]
                },{
                    xtype: 'button',
                    iconCls: 'check1',
                    action: 'getVagonShir'
                },{
                    xtype: 'button',
                    text: '...',
                    action: 'nsiVagShir'
                }]
            },{
                xtype: 'fieldcontainer',
                itemId: 'uzkyVagCont',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Номер узкого вагона',
                items: [{
                    xtype:'textfield',
                    name: 'nvag',
                    maxLength: 12,
                    allowBlank: false,
                    vTypes: [
                        'vagUzkyNum',
                        'vagUnique'
                    ]
                },{
                    xtype: 'button',
                    iconCls: 'check1',
                    action: 'getVagonUzky'
                },{
                    xtype: 'button',
                    text: '...',
                    action: 'nsiVagUzky'
                }]
            },*/{
                xtype: 'combo',
                queryMode: 'local',
                forceSelection: true,
                fieldLabel: 'Номер пути',
                name: 'line',
                allowBlank: false,
                store: []
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
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Собственник',
                    items: [{
                        xtype:'textarea',
                        name: 'sobstv',
                        maxLength: 128,
                        // allowBlank: false,
                        readOnly: true
                    },{
                        xtype: 'button',
                        text: '...',
                        action: 'nsiOwner'
                    },{
                        xtype: 'hidden',
                        name: 'owner.hid'
                    }]
            }/*,{
                xtype:'textarea',
                fieldLabel: 'Собственник',
                name: 'sobstv',
                maxLength: 128
            }*/,{
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
            }]
        },{
            xtype: 'container',
            flex:1,
            layout:'anchor',
            items:[{
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
            }]
        }];
    },
    buildBottomToolbar: function(config){
        config.buttons = this.buildButtons();

        config.buttons.push({
            text: '+ Контейнер',
            disabled: true,
            action: 'plusKont',
            iconCls: 'doc_new'
        });
    }/*,
    initFieldsWithDefaultsValues: function(poezdContainer){
        var form = this.getForm(),
            lineField = form.findField('line'),
            koleya =  poezdContainer.down('radiogroup#koleya').getValue().koleya;

        if(koleya == 1) {
            lineField.getStore().loadData(
                [['948S'], ['949S'], ['950S'], ['951S'], ['Ciern/T']]
            );
        } else if(koleya == 2){
            lineField.getStore().loadData(
                [['880'], ['881'], ['882'], ['883'], ['884'], ['948']]
            );
        }

    }*/
});
