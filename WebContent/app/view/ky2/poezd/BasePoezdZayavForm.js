Ext.define('TK.view.ky2.poezd.BasePoezdZayavForm', {
    extend: 'TK.view.ky2.AbstractForm',
    alias: 'widget.ky2basepoezdzayavform',

    buildItems: function (config) {
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
                fieldLabel: this.lblOrderNum,
                items: [{
                    xtype: 'textfield',
                    name: 'noZayav',
                    itemId: 'noZayav',
                    maxLength: 50,
                    allowBlank: false
                }]
            }, {
                xtype: 'radiogroup',
                width: 400,
                labelWidth: 150,
                fieldLabel: this.lblOrderType,
                // itemId: 'koleya',
                // columns: 1,
                // vertical: true,
                allowBlank: false,
                items: [
                    {boxLabel: this.lblUnloading, name: 'direction', inputValue: 1},
                    {boxLabel: this.lblLoading, name: 'direction', inputValue: 2}
                ]
            }, {
                xtype: 'fieldset',
                title: this.titleDesigned,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 450,
                items: [{
                    labelWidth: '145px',
                    fieldLabel: this.lblDate,
                    name: 'zayavDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '145px',
                    fieldLabel: this.lblTime,
                    name: 'zayavTime',
                    xtype: 'timefield',
                    // altFormats:'H:i'
                    format: 'H:i'
                }]
            }, {
                xtype: 'textfield',
                width: 400,
                labelWidth: 150,
                fieldLabel: this.lblInternationalTrNum,
                //decimalPrecision: 0,
                name: 'npprm',
                maxLength: 50
            }, {
                xtype: 'textfield',
                width: 400,
                labelWidth: 150,
                fieldLabel: this.lblTrainNum,
                //decimalPrecision: 0,
                name: 'nppr',
                maxLength: 5
            }, {
                xtype: 'fieldcontainer',
                layout: {
                    type: 'hbox'
                },
                fieldLabel: this.lblClient,
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
        }]
    },
    buildTopToolbar: function (config) {
        config.tbar = this.buildButtons();
        config.tbar.splice(1, 0,
            '-',
            {
                text: this.btnSaveExit,
                formBind: true,
                disabled: true,
                iconCls: 'save_close',
                action: 'saveExit'
            }, '-', {
                text: this.btnVgCtGr,
                iconCls: 'edit',
                action: 'editVgCtGr'
            }, '-', {
                text: this.btnImportFromXLS,
                iconCls: 'excel',
                action: 'upload'
            }, '-', {
                text: this.btnClose,
                iconCls: 'close1',
                action: 'close'
            }, '-'
        );


    },
    initFieldsWithDefaultsValues: function () {
        var form = this.getForm(),
            now = new Date();
        //form.findField('dprb').setValue(now);
        form.findField('zayavDate').setValue(now);
        form.findField('zayavTime').setValue(now);
    }
});
