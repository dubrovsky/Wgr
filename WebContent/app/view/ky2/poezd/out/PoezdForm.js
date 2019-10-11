Ext.define('TK.view.ky2.poezd.out.PoezdForm', {
    extend:'Ext.container.Container',
    alias:'widget.ky2poezdoutform',

    closable: false,
    layout: 'fit',

    items: [{
        xtype: 'ky2basepoezdform',
        itemId: 'ky2poezdform',
        buildItems: function(config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            config.items.splice(2, 0, {
                xtype:'fieldset',
                title: 'Отправление',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:400,
                items: [{
                    labelWidth: '140px',
                    fieldLabel:'Дата',
                    name : 'dotpDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    labelWidth: '140px',
                    fieldLabel:'Время',
                    name : 'dotpTime',
                    xtype: 'timefield',
                    // altFormats:'H:i'
                    format:'H:i'
                }]
            });

            // config.items.splice(2, 0, {
            //     fieldLabel:'Отправление',
            //     name : 'dotpDate',
            //     xtype: 'datefield',
            //     altFormats:'d.m.y'
            // });
        },
        initFieldsWithDefaultsValues: function(){
            var form = this.getForm(),
                now = new Date();
            form.findField('dotpDate').setValue(now);
            form.findField('dotpTime').setValue(now);
        },
        buildTopToolbar: function(config){
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
                 '-',
                {text: '+ Импорт из заявки', iconCls: 'train', action: 'getZajavOutForPoezdOut'}, '-'
            );
        }
    }]
});
