Ext.define('TK.view.ky.poezd.out.vagon.Form', {
    extend:'TK.view.ky.AbstractWindow',
    alias:'widget.kyvagonoutform',

    buildItems: function(config) {
        config.items = [{
            xtype: 'kybasevagonform',
            itemId: 'kyvagonform',
            buildItems: function(config) {
                TK.view.ky.poezd.BaseVagonForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
                config.items[0].items.splice(1, 0, {
                    xtype: 'fieldcontainer',
                    layout: {
                        type: 'hbox',
                        defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                    },
                    fieldLabel: 'Отправление',
                    items: [{
                        name : 'dotpDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        width: 80
                    },{
                        xtype: 'displayfield',
                        value: 'Дата'
                    },{
                        name : 'dotpTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        width: 80
                    },{
                        xtype: 'displayfield',
                        value: 'Время'
                    }]
                });
            },
            initFieldsWithDefaultsValues: function(poezd){
                var form = this.getForm();
                form.findField('dotpDate').setValue(poezd.get('dotpDate'));
                form.findField('dotpTime').setValue(poezd.get('dotpTime'));
            }
        }];
    }
});
