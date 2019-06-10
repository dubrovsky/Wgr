Ext.define('TK.view.ky.yard.kont.Form', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kykontinyardform',

    width:800,
    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasekontform',
            itemId:'kykontform',
            buildItems: function(config) {
                TK.view.ky.BaseKontForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
                config.items[0].items.splice(1, 0, {
                    xtype:'fieldset',
                    title: 'Постановка',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    width:250,
                    items: [{
                        fieldLabel:'Дата',
                        name : 'dyardDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y'
                    },{
                        fieldLabel:'Время',
                        name : 'dyardTime',
                        xtype: 'timefield',
                        //snapToIncrement: true,
                        altFormats:'H:i'
                    }]
                });
            },
            initFieldsWithDefaultsValues: function(){
                var form = this.getForm(),
                    now = new Date();
                form.findField('dyardDate').setValue(now);
                form.findField('dyardTime').setValue(now);
            }
        },{
            xtype:'kyplombinyardlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kyplomblist'
        },{
            xtype:'kygruzinyardlist',
            hidden: true,
            margin:'10 0 0 0',
            itemId:'kygruzlist'
        }];
    }
});
