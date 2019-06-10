Ext.define('TK.view.ky.nsi.vagon.uzky.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsivagonuzkyform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasensiform',
                itemId:'kybasensivagonuzkyform',
                buildItems: function(config) {
                    config.items = [{
                        xtype: 'container',
                        flex:1,
                        layout:'anchor',
                        items:[{
                            fieldLabel: 'Полный номер',
                            xtype:'textfield',
                            name: 'nvaguf',
                            maxLength: 16,
                            allowBlank: false
                        },{
                            fieldLabel: 'Cокращенный номер',
                            xtype:'textfield',
                            name: 'nvagu',
                            maxLength: 7
                        },{
                            fieldLabel: 'Дата начала эксплуатации',
                            name : 'dexpB',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Дата окончания  эксплуатации',
                            name : 'dexpEnd',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            xtype: 'combo',
                            queryMode: 'local',
                            forceSelection: true,
                            fieldLabel: 'Подтвержден?',
                            name: 'podtv',
                            store: ['Y', 'N']
                        },{
                            fieldLabel: 'Kод дороги',
                            xtype:'textfield',
                            name: 'koddor',
                            maxLength: 2
                        },{
                            fieldLabel: 'Kод ЖД администрации',
                            xtype:'textfield',
                            name: 'kodadm',
                            maxLength: 2
                        },{
                            xtype: 'fieldcontainer',
                            layout: {
                                type: 'hbox',
                                defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                            },
                            fieldLabel: 'Собственник',
                            items: [{
                                xtype:'textarea',
                                name: 'sobs',
                                itemId: 'sobs',
                                maxLength: 450,
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
                            name: 'sobs',
                            maxLength: 450
                        }*/,{
                            fieldLabel: 'Kод вида вагона',
                            xtype:'textfield',
                            name: 'vidkod',
                            maxLength: 10
                        },{
                            xtype: 'combo',
                            queryMode: 'local',
                            forceSelection: true,
                            fieldLabel: 'Актуальный?',
                            name: 'aktnvagu',
                            store: ['Y', 'N']
                        },{
                            fieldLabel: 'Kод держателя вагона',
                            xtype:'textfield',
                            name: 'kodownvag',
                            maxLength: 10
                        }]
                    },{
                        xtype: 'container',
                        flex:1,
                        layout:'anchor',
                        items:[{
                            fieldLabel: 'Дата включения в парк',
                            name : 'dparkIn',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Количество осей',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'osi',
                            maxLength: 2
                        },{
                            fieldLabel: 'Колесная база',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'razvor',
                            maxLength: 2
                        },{
                            fieldLabel: 'Масса тары(вагона)',
                            xtype:'numberfield',
                            minValue: 1,
                            name: 'mnetvag',
                            maxLength: 13
                        },{
                            fieldLabel: 'Грузоподъемность',
                            xtype:'numberfield',
                            minValue: 1,
                            name: 'grpodvag',
                            maxLength: 13
                        },{
                            fieldLabel: 'Длина',
                            xtype:'numberfield',
                            minValue: 1,
                            name: 'dlvag',
                            maxLength: 13
                        },{
                            fieldLabel: 'Kод типа вагона',
                            xtype:'textfield',
                            name: 'typevag',
                            maxLength: 10
                        },{
                            fieldLabel: 'Дата последнего ремонта',
                            name : 'dLastrem',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        },{
                            fieldLabel: 'Дата очередного план. ремонта',
                            name : 'dPlanrem',
                            xtype: 'datefield',
                            altFormats:'d.m.y'
                        }]
                    }];
                }
            }
        ];
    }
});