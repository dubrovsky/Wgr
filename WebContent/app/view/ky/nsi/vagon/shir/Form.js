Ext.define('TK.view.ky.nsi.vagon.shir.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsivagonshirform',

    requires: [
        'TK.view.ky.nsi.BaseForm'
    ],


    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasensiform',
                itemId:'kybasensivagonshirform',
                buildItems: function(config) {
                    config.items = [{
                        xtype: 'container',
                        flex:1,
                        layout:'anchor',
                        items:[{
                            fieldLabel: 'Номер',
                            xtype:'textfield',
                            name: 'nvag',
                            itemId: 'nvag',
                            maxLength: 14,
                            allowBlank: false
                        },{
                            fieldLabel: 'Тип',
                            xtype:'textfield',
                            name: 'typeNo',
                            itemId: 'typeNo',
                            maxLength: 4
                        },{
                            fieldLabel: 'Год постройки',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1980,
                            maxValue: 2100,
                            name: 'yearB',
                            itemId: 'yearB',
                            maxLength: 4
                        },{
                            fieldLabel: 'Модель',
                            xtype:'textfield',
                            name: 'modelvag',
                            itemId: 'modelvag',
                            maxLength: 12
                        },{
                            fieldLabel: 'Длина',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'dlvag',
                            itemId: 'dlvag',
                            maxLength: 8
                        },{
                            fieldLabel: 'Тара',
                            xtype:'numberfield',
                            decimalPrecision: 3,
                            minValue: 1,
                            name: 'tara',
                            itemId: 'tara',
                            maxLength: 16
                        },{
                            fieldLabel: 'Грузоподъемность',
                            xtype:'numberfield',
                            decimalPrecision: 3,
                            minValue: 1,
                            name: 'gp',
                            itemId: 'gp',
                            maxLength: 16
                        },{
                            fieldLabel: 'Группа',
                            xtype:'textfield',
                            name: 'groupvag',
                            itemId: 'groupvag',
                            maxLength: 20
                        },{
                            fieldLabel: 'Наименование принадлежности',
                            xtype:'textfield',
                            name: 'owntypen',
                            itemId: 'owntypen',
                            maxLength: 20
                        },{
                            fieldLabel: 'Пробег',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'ostProbeg',
                            itemId: 'ostProbeg',
                            maxLength: 12
                        },{
                            fieldLabel: 'Дата добавления в вагонный парк',
                            name : 'dparkIn',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Дата вывода из вагонного парка',
                            name : 'dparkOut',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        }]
                    },{
                        xtype: 'container',
                        flex:1,
                        layout:'anchor',
                        items:[{
                            fieldLabel: 'Код ОКПО собственника',
                            xtype:'textfield',
                            name: 'okpoOwn',
                            itemId: 'okpoOwn',
                            maxLength: 10
                        },{
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                            },
                            fieldLabel: 'Собственник',
                            items: [{
                                xtype:'textarea',
                                name: 'nown',
                                itemId: 'nown',
                                maxLength: 250,
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
                        }/*,{
                            fieldLabel: 'Наименование собственника',
                            xtype:'textarea',
                            name: 'nown',
                            itemId: 'nown',
                            maxLength: 250
                        }*/,{
                            fieldLabel: 'Код ОКПО арендатора',
                            xtype:'textfield',
                            name: 'okpoArend',
                            itemId: 'okpoArend',
                            maxLength: 10
                        },{
                            fieldLabel: 'Наименование арендатора',
                            xtype:'textarea',
                            name: 'narend',
                            itemId: 'narend',
                            maxLength: 250
                        },{
                            fieldLabel: 'Дата очередного план. ремонта',
                            name : 'datePlanrem',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Дата постройки',
                            name : 'dateBVag',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Дата ревизии',
                            name : 'dProbegV',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Примечание',
                            xtype:'textarea',
                            name: 'prim',
                            itemId: 'prim',
                            maxLength: 250
                        }]
                    }];
                }
            }
        ];
    }
});