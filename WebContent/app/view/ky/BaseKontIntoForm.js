Ext.define('TK.view.ky.BaseKontIntoForm', {
    extend: 'TK.view.ky.BaseKontForm',
    alias:'widget.kybasekontintoform',
    buildItems: function(config) {
        //TK.view.ky.BaseKontForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
        this.callParent(arguments);
        config.items[0].items.splice(1, 0, {
            xtype:'fieldset',
            title: '!!Прибытие',
            layout: 'anchor',
            defaults: {
                anchor: '100%'
            },
            width:250,
            items: [{
                fieldLabel:'!!Дата',
                name : 'dprbDate',
                xtype: 'datefield',
                altFormats:'d.m.y'
            },{
                fieldLabel:'!!Время',
                name : 'dprbTime',
                xtype: 'timefield',
                //snapToIncrement: true,
                altFormats:'H:i'
            }]
        });
    },
    initFieldsWithDefaultsValues: function(parent, poezdForm){
        var form = this.getForm();
        form.findField('dprbDate').setValue(parent.get('dprbDate'));
        form.findField('dprbTime').setValue(parent.get('dprbTime'));
        form.findField('gruzotpr').setValue(poezdForm.findField('gruzotpr').getValue());
        form.findField('punkt_otpr').setValue(poezdForm.findField('punkt_otpr').getValue());
        form.findField('punkt_nazn').setValue(poezdForm.findField('punkt_nazn').getValue());
    }
});
