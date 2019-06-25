Ext.define('TK.view.ky2.poezd.BasePoezdForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2basepoezdform',

    // region: 'west',
    // width: 400,
    // split: true,

    buildItems: function(config) {
        config.items = [{
            xtype:'textfield',
            fieldLabel: 'Номер',
            //decimalPrecision: 0,
            name: 'nppr',
            maxLength: 5
        },{
            xtype:'textfield',
            fieldLabel: 'Международный номер',
            //decimalPrecision: 0,
            name: 'npprm',
            maxLength: 10
        },{
            xtype: 'radiogroup',
            fieldLabel: 'Колея',
            itemId:'koleya',
            columns: 1,
            vertical: true,
            allowBlank: false,
            items: [
                {boxLabel: 'Широкая', name: 'koleya', inputValue: 1},
                {boxLabel: 'Узкая', name: 'koleya', inputValue: 2}
            ]
        }/*,{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: 'Номер пути',
            name: 'line',
            itemId:'line',
            store: []
        }*/,{
            xtype:'textfield',
            fieldLabel: 'Клиент',
            name: 'gruzotpr',
            maxLength: 128,
            anchor: '99%'
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
            maxLength: 96,
            anchor: '99%'
        },{
            xtype:'textfield',
            fieldLabel: 'Пункт назначения',
            name: 'punkt_nazn',
            maxLength: 96,
            anchor: '99%'
        }]
    },
    buildTopToolbar: function(config){
        config.tbar = this.buildButtons();
    }

});
