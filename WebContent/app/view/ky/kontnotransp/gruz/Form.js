Ext.define('TK.view.ky.kontnotransp.gruz.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygruznotranspform',

    requires: [
        'TK.view.ky.BaseGruzForm'
    ],


    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasegruzform',
                itemId:'kygruzform'/*,
                buildItems: function(config) {
                    config.items = [{
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
                    }];
                },
                buildBottomToolbar: function(config){
                    config.buttons = this.buildButtons();
                }*/
            }
        ];
    }
});
