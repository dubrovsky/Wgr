Ext.define('TK.view.ky.poezd.into.Form', {
    extend:'Ext.container.Container',
    alias:'widget.kypoezdintoform',

    requires: [
        'TK.view.ky.poezd.BasePoezdForm',
        'TK.view.ky.poezd.into.vagon.List',
        'TK.view.ky.poezd.into.vagon.kont.List'
    ],


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
                title: '!!!!!!Прибытие',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:250,
                items: [{
                    fieldLabel:'!!!!!!Дата',
                    name : 'dprbDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    fieldLabel:'!!!!!!Время',
                    name : 'dprbTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    altFormats:'H:i'
                }]
            });

            config.items.push({
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
                fieldLabel: 'Пункт отправления',
                name: 'punkt_otpr',
                maxLength: 96,
                anchor: '99%'
            },{
                xtype:'textfield',
                fieldLabel: 'Пункт назначения',
                name: 'punkt_nazn',
                maxLength: 96,
                anchor: '99%'
            });
        },
        initFieldsWithDefaultsValues: function(){
            var form = this.getForm(),
                now = new Date();
            form.findField('dprbDate').setValue(now);
            //form.findField('dprbTime').setValue(now);
        },
        buildTopToolbar: function(config){
            TK.view.ky.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
            //config.tbar = this.buildButtons();
            config.tbar.push('-',{
                text: 'Список по поезду',
                action: 'listForPoezdInto',
                iconCls:'train'
            });
        }
    },{
        region:'center',
        xtype: 'kyvagonintolist',
        hidden: true,
        flex:3,
        itemId:'kyvagonlist'
    },{
        region: 'south',
        xtype: 'kykontinpoezdintolist',
        flex:2,
        hidden: true,
        split: true,
        itemId:'kykontlist'
    }]
});
