Ext.define('TK.view.ky2.avto.out.AvtoZayavForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2avtozayavoutform',
    title: 'Авто, отправление',

    closable: false,
    layout: 'fit',
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'ky2baseavtozayavform',
        itemId: 'ky2avtozayavform',
        buildItems: function (config) {
            TK.view.ky2.avto.BaseAvtoZayavForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
        },

        initFieldsWithDefaultsValues: function () {
            // var form = this.getForm(),
            //     now = new Date();
            // //form.findField('dotp').setValue(now);
            // form.findField('dotpDate').setValue(now);
            // form.findField('dotpTime').setValue(now);
        },
        buildTopToolbar: function (config) {
            TK.view.ky2.avto.BaseAvtoZayavForm.prototype.buildTopToolbar.apply(this, arguments);
            config.tbar.push(
                // {xtype:'splitbutton', text: 'Печать', iconCls:'upload', action: 'print',
                //     menu: [
                //         {text: 'WZ', iconCls:'excel', action:'wz'},'-'
                //     ]
                // },
                {
                    text: '+Контейнер/Груз',
                    iconCls: 'edit',
                    action: 'editCtGr'
                }
            );

        }
    }
        // {
        //     region: 'south',
        //     xtype: 'kykontinavtooutlist',
        //     flex: 1,
        //     hidden: true,
        //     //split: true,
        //     itemId: 'kykontlist'
        // }
    ]
});
