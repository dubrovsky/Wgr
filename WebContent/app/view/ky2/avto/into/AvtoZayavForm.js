Ext.define('TK.view.ky2.avto.into.AvtoZayavForm', {
    extend: 'Ext.container.Container',
    alias: 'widget.ky2avtozayavintoform',
    title: 'Заявка на авто, ввоз',

    closable: false,
    layout: 'fit',
    defaults: {
        autoScroll: true
    },
    items: [{
        xtype: 'ky2baseavtozayavform',
        itemId: 'ky2avtozayavform',
        buildItems: function(config) {
            TK.view.ky2.avto.BaseAvtoZayavForm.prototype.buildItems.apply(this, arguments);     // callParent doesn't work in inline override
            //this.callParent(arguments);
        },
        // initFieldsWithDefaultsValues: function() {
        //     var form = this.getForm(),
        //         now = new Date();
        //     //form.findField('dprb').setValue(now);
        //         form.findField('dprbDate').setValue(now);
        //         form.findField('dprbTime').setValue(now);
        // },
        buildTopToolbar: function(config){
            TK.view.ky2.avto.BaseAvtoZayavForm.prototype.buildTopToolbar.apply(this, arguments);
            // config.tbar.push(
            // );
            //
            // config.tbar.push(
                // {xtype:'splitbutton', text: 'Печать', iconCls:'upload', action: 'print',
                //     menu: [
                //         {text: 'PZ', iconCls:'excel', action:'pz'},'-'
                //     ]
                // },'-',
                // {
                //     text: '+Контейнер/Груз',
                //     iconCls: 'edit',
                //     action: 'editCtGr'
                // }
                // {text: '+ Авто по отправлению', iconCls:'truck', action:'createAvtoOutFromInto'},'-'
            // );

        }

    }
    // ,{
    //     region: 'south',
    //     xtype: 'kykontinavtointolist',
    //     flex: 1,
    //     hidden: true,
    //     //split: true,
    //     itemId: 'kykontlist'
    // }
    ]
});
