Ext.define('TK.view.ky2.poezd.into.PoezdForm', {
    extend:'Ext.container.Container',
    alias:'widget.ky2poezdintoform',

    closable: false,
    layout: 'fit',
    items: [{
        xtype: 'ky2basepoezdform',
        itemId: 'ky2poezdform',
        buildItems: function(config) {
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            /*config.items.splice(2, 0, {
                xtype:'fieldset',
                title: 'Прибытие',
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width:250,
                items: [{
                    fieldLabel:'Дата',
                    name : 'dprbDate',
                    xtype: 'datefield',
                    altFormats:'d.m.y'
                },{
                    fieldLabel:'Время',
                    name : 'dprbTime',
                    xtype: 'timefield',
                    //snapToIncrement: true,
                    altFormats:'H:i'
                }]
            });*/

            config.items.splice(2, 0, {
                fieldLabel:'Прибытие',
                name : 'dprbDate',
                xtype: 'datefield',
                altFormats:'d.m.y'
            });

            /*config.items.push({
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
            });*/
        },
        initFieldsWithDefaultsValues: function(){
            var form = this.getForm(),
                now = new Date();
            form.findField('dprbDate').setValue(now);
            //form.findField('dprbTime').setValue(now);
        },
        buildTopToolbar: function(config){
            TK.view.ky2.poezd.BasePoezdForm.prototype.buildTopToolbar.apply(this, arguments);
        }
    }]
});
