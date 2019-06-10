Ext.define('TK.view.ky.nsi.avto.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsiavtoform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasensiform',
                itemId:'kybasensiavtoform',
                buildItems: function(config) {
                    config.items = [{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[{
                            fieldLabel: 'Номер',
                            xtype:'textfield',
                            name: 'noAvto',
                            itemId: 'noAvto',
                            maxLength: 20,
                            allowBlank: false
                        },{
                            fieldLabel: 'Тип',
                            xtype:'textarea',
                            name: 'typeAvto',
                            maxLength: 250
                        }]
                    },{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[{
                            fieldLabel: 'Номер прицепа',
                            xtype:'textfield',
                            name: 'noTrail',
                            maxLength: 20
                        },{
                            fieldLabel: 'Собственник',
                            xtype:'textarea',
                            name: 'ownCargo',
                            maxLength: 250
                        }]
                    }];
                }
            }
        ];
    }
});