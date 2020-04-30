Ext.define('TK.view.ky2.poezd.out.PoezdForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2poezdoutform',

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
                title: 'Окончание погрузки',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel: this.labelDate,
                    name: 'dpogrDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '140px',
                    fieldLabel: this.labelTime,
                    name: 'dpogrTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    // altFormats:'H:i',
                    format: 'H:i'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Уведомления',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel: this.labelDate,
                    name: 'duvedDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '140px',
                    fieldLabel: this.labelTime,
                    name: 'duvedTime',
                    xtype: 'timefield',
                    // altFormats:'H:i'
                    format: 'H:i'
                }]
            }, {
                xtype: 'fieldset',
                title: 'Отправление',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel: this.labelDate,
                    name: 'dotpDate',
                    xtype: 'datefield',
                    altFormats: 'd.m.y'
                }, {
                    labelWidth: '140px',
                    fieldLabel: this.labelTime,
                    name: 'dotpTime',
                    xtype: 'timefield',
                    // altFormats:'H:i'
                    format: 'H:i'
                }]
            });

            // config.items.splice(2, 0, {
            //     fieldLabel:'Отправление',
            //     name : 'dotpDate',
            //     xtype: 'datefield',
            //     altFormats:'d.m.y'
            // });
        },
        initFieldsWithDefaultsValues: function () {
            var form = this.getForm(),
                now = new Date();
            form.findField('dotpDate').setValue(now);
            form.findField('dotpTime').setValue(now);
        },
        buildTopToolbar: function (config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
            // config.tbar.push(
            //     '-',
            //     {text: this.labelImportFromOrder, iconCls: 'train', action: 'getZajavOutForPoezdOut'}, '-'
            // );
            config.tbar.push(
                {
                    xtype: 'splitbutton', text: this.labelImport, iconCls: 'upload', action: 'import',
                    menu: [
                        {text: 'XLS (Обновить)', iconCls: 'excel', action: 'uploadUpdate'}, '-',
                        {text: this.labelImportFromOrder, iconCls: 'train', action: 'getZajavOutForPoezdOut'}
                    ]
                }, '-'
            );

        }
    }]
});
