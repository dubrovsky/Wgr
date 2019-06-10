Ext.define('TK.view.ky.poezd.out.Form', {
    extend:'Ext.container.Container',
    alias:'widget.kypoezdoutform',

    closable: false,
    layout: 'border',
    items: [{
        xtype: 'kybasepoezdform',
        itemId: 'kypoezdform',
        buildItems: function(config) {
            TK.view.ky.poezd.BasePoezdForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            //this.callParent(arguments);
            config.items.splice(2, 0, {
                xtype:'fieldset',
                title: 'Отправление',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:250,
                items: [{
                    fieldLabel:'Дата',
                    name : 'dotpDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    fieldLabel:'Время',
                    name : 'dotpTime',
                    xtype: 'timefield',
                    altFormats:'H:i'
                }]
            });
        },
        initFieldsWithDefaultsValues: function(){
            var form = this.getForm(),
                now = new Date();
            form.findField('dotpDate').setValue(now);
            //form.findField('dprbTime').setValue(now);
        },
        buildTopToolbar: function(config){
            //config.tbar = this.buildButtons();
            TK.view.ky.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push('-',{
                text: 'Список по поезду',
                action: 'listForPoezdOut',
                iconCls:'train'
            });
        }
    },{
        region:'center',
        xtype: 'kyvagonoutlist',
        hidden: true,
        flex:3,
        itemId:'kyvagonlist'
    },{
        region: 'south',
        xtype: 'kykontinpoezdoutlist',
        flex:2,
        hidden: true,
        split: true,
        itemId:'kykontlist'
    }]
});
