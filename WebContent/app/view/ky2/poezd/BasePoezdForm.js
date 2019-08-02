Ext.define('TK.view.ky2.poezd.BasePoezdForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2basepoezdform',

    // region: 'west',
    // width: 400,
    // split: true,

    buildItems: function(config) {
        config.items = [{
            xtype:'textfield',
            labelWidth: '150px',
            fieldLabel: this.labelNppr,
            //decimalPrecision: 0,
            name: 'nppr',
            maxLength: 5
        },{
            xtype:'textfield',
            labelWidth: '150px',
            fieldLabel: this.labelNpprm,
            //decimalPrecision: 0,
            name: 'npprm',
            maxLength: 10
        },{
            xtype: 'radiogroup',
            labelWidth: '150px',
            fieldLabel: this.labelKoleya,
            itemId:'koleya',
            columns: 1,
            vertical: true,
            allowBlank: false,
            items: [
                {boxLabel: this.labelKoleyaWide, name: 'koleya', inputValue: 1},
                {boxLabel: this.labelKoleyaNarow, name: 'koleya', inputValue: 2}
            ]
        }/*,{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: 'Номер пути',
            name: 'line',
            itemId:'line',
            store: []
        },{
            xtype:'textfield',
            fieldLabel: this.labelClient,
            name: 'gruzotpr',
            maxLength: 128,
            anchor: '99%'
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
        }*/,{
            xtype:'textfield',
            labelWidth: '150px',
            fieldLabel: this.labelDep,
            name: 'punkt_otpr',
            maxLength: 96
            // anchor: '99%'
        },{
            xtype:'textfield',
            labelWidth: '150px',
            fieldLabel: this.labelDest,
            name: 'punkt_nazn',
            maxLength: 96
            // anchor: '99%'
        }]
    },
    buildTopToolbar: function(config){
        config.tbar = this.buildButtons();
    }

});
