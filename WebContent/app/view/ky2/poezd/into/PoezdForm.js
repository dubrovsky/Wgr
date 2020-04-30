Ext.define('TK.view.ky2.poezd.into.PoezdForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdintoform',

    requires: [
        'TK.view.ky2.poezd.BasePoezdForm'
    ],

    closable: false,
    layout: 'fit',
    items: [{
        xtype: 'ky2basepoezdform',
        itemId: 'ky2poezdform',
        buildItems: function (config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            config.items.splice(2, 0, {
                xtype: 'fieldset',
                title: this.labelArr,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel: this.labelDate,
                    name: 'dprbDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '140px',
                    fieldLabel: this.labelTime,
                    name: 'dprbTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    // altFormats:'H:i',
                    format: 'H:i'
                }]
            });
        },
        initFieldsWithDefaultsValues: function () {
            var form = this.getForm(),
                now = new Date();
            form.findField('dprbDate').setValue(now);
            form.findField('dprbTime').setValue(now);
        },
        buildTopToolbar: function (config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
                {
                    xtype: 'splitbutton', text: this.labelImport, iconCls: 'upload', action: 'import',
                    menu: [
                        {text: this.labelImportXLS, iconCls: 'excel', action: 'upload'}, '-',
                        {text: this.labelXLSrefresh, iconCls: 'excel', action: 'uploadUpdate'}, '-',
                        {text: this.labelPPV, iconCls: 'train', action: 'showPoezdsImportDir'}, '-',
                        {text: this.labelImportFromOrder, iconCls: 'train', action: 'getZajavIntoForPoezdInto'}
                    ]
                }, '-'
            );
        }
    }]
});
