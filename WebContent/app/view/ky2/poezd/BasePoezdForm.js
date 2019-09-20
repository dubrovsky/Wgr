Ext.define('TK.view.ky2.poezd.BasePoezdForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2basepoezdform',

    // region: 'west',
    // split: true,
    //     width: 400

    buildItems: function(config) {
        config.items = [{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelNpprm,
            //decimalPrecision: 0,
            name: 'npprm',
            maxLength: 10
        },{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelNppr,
            //decimalPrecision: 0,
            name: 'nppr',
            maxLength: 5
        }/*,{
            xtype: 'radiogroup',
            hidden: true,
            // width:400,
            // labelWidth: 150,
            // fieldLabel: this.labelKoleya,
            itemId:'koleya',
            // columns: 1,
            // vertical: true,
            // allowBlank: false,
            items: [
                {boxLabel: this.labelKoleyaWide, name: 'koleya', inputValue: 1},
                {boxLabel: this.labelKoleyaNarow, name: 'koleya', inputValue: 2}
            ]
        }*//*,{
            xtype: 'combo',
            queryMode: 'local',
            forceSelection: true,
            fieldLabel: 'Номер пути',
            name: 'line',
            itemId:'line',
            store: []
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
        },{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelKstf,
            name: 'ksto_f',
            maxLength: 6
            // anchor: '99%'
        },{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelNstf,
            name: 'nsto_f',
            maxLength: 100
            // anchor: '99%'
        },{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelAdmf,
            name: 'admon_f',
            maxLength: 3
            // anchor: '99%'
        },{
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelKstn,
            name: 'kstn',
            maxLength: 6
            // anchor: '99%'
        }, {
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelNstn,
            name: 'nstn',
            maxLength: 100
            // anchor: '99%'
        }, {
            xtype:'textfield',
            width:400,
            labelWidth: 150,
            fieldLabel: this.labelAdmn,
            name: 'admnn',
            maxLength: 3
            // anchor: '99%'
        }*/,{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            fieldLabel: this.labelClient,
            labelWidth: 150,
            width:400,
            items: [{
                xtype:'textfield',
                name: 'gruzotpr',
                itemId: 'gruzotpr',
                maxLength: 128,
                flex:1
            },{
                xtype: 'button',
                margins: {top: 0, right: 0, bottom: 0, left: 3},
                text: '...',
                itemId: 'gruzotprDir',
                action: 'nsiOtpr'
            }]
        }]
    },
    buildTopToolbar: function(config) {
        config.tbar = this.buildButtons();
        config.tbar.push({text: '+Вагон/Контейнер/Груз', iconCls: 'edit', action: 'editVgCtGr'});
        config.tbar.splice(1, 0,
            {
                text: this.btnSaveExit,
                formBind: true,
                disabled: true,
                iconCls: 'save_close',
                action: 'saveExit'
            }, '-'
            , {
                text:this.btnClose,
                iconCls:'close1',
                action:'close'
            } ,'-'
        );

    }

});
