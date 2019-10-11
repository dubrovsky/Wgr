Ext.define('TK.view.ky2.poezd.into.PoezdForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdintoform',

    closable: false,
    layout: 'fit',
    items: [{
        xtype: 'ky2basepoezdform',
        itemId: 'ky2poezdform',
        buildItems: function (config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            config.items.splice(2, 0, {
                xtype: 'fieldset',
                title: 'Прибытие',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel: 'Дата',
                    name: 'dprbDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '140px',
                    fieldLabel: 'Время',
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
                    xtype: 'splitbutton', text: 'Импорт', iconCls: 'upload', action: 'import',
                    menu: [
                        {text: 'XLS (карта погрузки)', iconCls: 'excel', action: 'upload'}, '-',
                        {text: 'ППВ', iconCls: 'train', action: 'showPoezdsImportDir'}
                    ]
                }, '-',
                {text: '+ Импорт из заявки', iconCls: 'train', action: 'getZajavIntoForPoezdInto'}, '-'
            );
        }
    }]
});
