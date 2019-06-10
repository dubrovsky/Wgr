Ext.define('TK.view.ky.poezd.BasePoezdForm', {
    extend: 'TK.view.ky.AbstractForm',
    alias:'widget.kybasepoezdform',

    region: 'west',
    width: 400,
    split: true,
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
        },{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: 'Номер пути',
            name: 'line',
            itemId:'line',
            store: []
        }]
    },
    buildTopToolbar: function(config){
        config.tbar = this.buildButtons();
        config.tbar.push('-',{
            text: 'Контейнера',
            action: 'kontsInPoezd',
            iconCls:'cont1'
        });

    }

});
