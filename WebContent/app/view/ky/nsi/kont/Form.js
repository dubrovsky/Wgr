Ext.define('TK.view.ky.nsi.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsikontform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasensiform',
                itemId:'kybasensikontform',
                buildItems: function(config) {
                    config.items = [{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[{
                            fieldLabel: 'Номер',
                            xtype:'textfield',
                            name: 'nkont',
                            itemId: 'nkont',
                            maxLength: 11,
                            allowBlank: false
                        },{
                            fieldLabel: 'Год постройки',
                            xtype:'textfield',
                            name: 'yearbuild',
                            maxLength: 9
                        },{
                            fieldLabel: 'Тип',
                            xtype:'textfield',
                            name: 'type',
                            maxLength: 10
                        },{
                            fieldLabel: 'Футовость',
                            xtype:'textfield',
                            name: 'sizeFoot',
                            maxLength: 4
                        }]
                    },{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[{
                            fieldLabel: 'Масса тары',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'massaTar',
                            maxLength: 20
                        },{
                            fieldLabel: 'Грузоподъемность',
                            xtype:'numberfield',
                            allowDecimals: false,
                            minValue: 1,
                            name: 'podSila',
                            maxLength: 20
                        },{
                            fieldLabel: 'Объем',
                            xtype:'numberfield',
                            minValue: 1,
                            name: 'vol',
                            maxLength: 7
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
                                itemId: 'naim_sob',
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
                        }]
                    }];
                }
            }
        ];
    }
});