Ext.define('TK.view.ky2.poezd.BasePoezdForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias: 'widget.ky2basepoezdform',

    // region: 'west',
    // split: true,
    //     width: 400

    buildItems: function (config) {
        config.items = [{
            xtype: 'textfield',
            width: 400,
            labelWidth: 150,
            fieldLabel: this.labelNpprm,
            //decimalPrecision: 0,
            name: 'npprm',
            maxLength: 50
        }, {
            xtype: 'textfield',
            width: 400,
            labelWidth: 150,
            fieldLabel: this.labelNppr,
            //decimalPrecision: 0,
            name: 'nppr',
            maxLength: 5
        }, {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox'
            },
            fieldLabel: this.labelClient,
            labelWidth: 150,
            width: 400,
            items: [{
                xtype: 'textfield',
                name: 'gruzotpr',
                itemId: 'gruzotpr',
                maxLength: 128,
                flex: 1,
                readOnly: true,
                allowBlank: false
            }, {
                xtype: 'button',
                margins: {top: 0, right: 0, bottom: 0, left: 3},
                text: '...',
                itemId: 'gruzotprDir',
                action: 'nsiOtpr'
            }]
        }]
    },
    buildTopToolbar: function (config) {
        config.tbar = this.buildButtons();
        config.tbar.push({text: this.labelVgCtGr, iconCls: 'edit', action: 'editVgCtGr'});
        config.tbar.splice(1, 0,
            {
                text: this.btnSaveExit,
                formBind: true,
                disabled: true,
                iconCls: 'save_close',
                action: 'saveExit'
            }, '-'
            , {
                text: this.btnClose,
                iconCls: 'close1',
                action: 'close'
            }, '-'
        );

    }

});
