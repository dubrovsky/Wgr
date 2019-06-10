Ext.define('TK.view.ky2.poezd.BasePoezdForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2basepoezdform',

    // region: 'west',
    // width: 400,
    // split: true,
    closable: false,
    layout: 'fit',
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
            store: [1,2]
        }]
    },
    buildTopToolbar: function(config){
        config.tbar = this.buildButtons();
        /*config.tbar.push('-',{
            text: 'Контейнера',
            action: 'kontsInPoezd',
            iconCls:'cont1'
        });*/

    }

});
