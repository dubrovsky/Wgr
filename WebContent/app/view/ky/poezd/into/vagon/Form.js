Ext.define('TK.view.ky.poezd.into.vagon.Form', {
    extend:'TK.view.ky.AbstractWindow',
    alias:'widget.kyvagonintoform',

    requires: [
        'TK.view.ky.poezd.BaseVagonForm'
    ],


    buildItems: function(config) {
        config.items = [
            {
                xtype: 'kybasevagonform',
                itemId: 'kyvagonform',
                buildItems: function(config) {
                    TK.view.ky.poezd.BaseVagonForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
                    //TK.Utils.findFieldBy('nvag', config.items).vTypes = [];

                    config.items[0].items.splice(1, 0, {
                        xtype: 'fieldcontainer',
                        layout: {
                            type: 'hbox',
                            defaultMargins: {top: 0, right: 5, bottom: 0, left: 0}
                        },
                        fieldLabel: 'Прибытие',
                        items: [{
                            name : 'dprbDate',
                            xtype: 'datefield',
                            altFormats:'d.m.y',
                            width: 80
                        },{
                            xtype: 'displayfield',
                            value: 'Дата'
                        },{
                            name : 'dprbTime',
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
                    form.findField('dprbDate').setValue(poezd.get('dprbDate'));
                    form.findField('dprbTime').setValue(poezd.get('dprbTime'));
                }
            }
        ];
    }
});
