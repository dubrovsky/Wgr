Ext.define('TK.view.ky.nsi.owner.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kynsiownerform',

    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasensiform',
                itemId:'kybasensiownerform',
                buildItems: function(config) {
                    config.items = [{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[{
                            fieldLabel: 'Наименование',
                            xtype:'textarea',
                            name: 'nameown',
                            itemId: 'nameown',
                            maxLength: 1500
                        },{
                            fieldLabel: 'Адрес',
                            xtype:'textarea',
                            name: 'adress',
                            maxLength: 1500
                        }]
                    },{
                        xtype: 'container',
                        flex: 1,
                        layout: 'anchor',
                        items:[/*{
                            xtype:'checkbox',
                            name: 'ownkont',
                            fieldLabel: 'Контейнер?',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype:'checkbox',
                            name: 'ownvag',
                            fieldLabel: 'Вагон?',
                            inputValue: true,
                            uncheckedValue: false
                        },{
                            xtype:'checkbox',
                            name: 'ownauto',
                            fieldLabel: 'Авто?',
                            inputValue: true,
                            uncheckedValue: false
                        },*/{
                            fieldLabel: 'Примечание',
                            xtype:'textarea',
                            name: 'prim',
                            maxLength: 2500
                        }]
                    }];
                }
            }
        ];
    }
});