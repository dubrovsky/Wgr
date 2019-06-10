Ext.define('TK.view.ky.BaseKontOutForm', {
    extend: 'TK.view.ky.BaseKontForm',
    alias:'widget.kybasekontoutform',
    buildItems: function(config) {
        //TK.view.ky.BaseKontForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
        this.callParent(arguments);
        config.items[0].items.splice(1, 0, {
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
    initFieldsWithDefaultsValues: function(parent){
        var form = this.getForm();
        form.findField('dotpDate').setValue(parent.get('dotpDate'));
        form.findField('dotpTime').setValue(parent.get('dotpTime'));
    }
});
