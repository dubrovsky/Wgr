Ext.define('TK.view.ky2.poezd.BasePoezdZayavForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias:'widget.ky2basepoezdzayavform',

    buildItems: function(config) {
        config.items = [{
            xtype: 'container',
            flex: 1,
            layout: 'anchor',
            defaults: {
                width: 450,
                labelWidth: 150
            },
            margin: '0 15 0 0',
            items: [{
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox',
                    defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                },
                fieldLabel: 'Номер заявки',
                items: [{
                    xtype: 'textfield',
                    name: 'noZayav',
                    itemId: 'noZayav',
                    maxLength: 50,
                    allowBlank: false
                }]
            }]
        }]
    },
    buildTopToolbar: function (config) {
        config.tbar = this.buildButtons();
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
