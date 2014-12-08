Ext.define('TK.controller.Logs', {
    extend: 'Ext.app.Controller',

    views:  ['logs.List'],
    stores: ['Logs'],
    models: ['Log'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > grid button[action="filterLogs"]': {
                click: this.onFilter
            }
        });
    },
    onFilter: function(btn){
        var store = btn.up('gridpanel').store,
	        me = this;
        Ext.create('Ext.window.Window',{
            title: this.titleFilter,
            width: 350,
            y:1,
            layout:'fit',
            items: {
                xtype:'form',
                labelAlign:'top',
                bodyPadding: 5,
                border: false,
                autoHeight:true,
                defaults:{anchor:'100%', xtype:'textfield'},
                items: [{
                    xtype:'fieldset',
                    title:this.lableDate,
                    defaults: {
                        anchor: '100%',
                        layout: {type: 'hbox'}
                    },
                    items:[{
                        xtype: 'fieldcontainer',
                        fieldLabel: this.lableDate1,
                        combineErrors: true,
                        msgTarget: 'under',
                        defaults: {
                            hideLabel: true
                        },
                        items:[
                            {xtype:'datefield',value: store.proxy.extraParams['search.date1'], name:'search.date1', width:80},
                            {xtype:'timefield', value: store.proxy.extraParams['search.date11'], format:'H:i', increment:5, name:'search.date11', width:70}
                        ]
                    },{
                        xtype: 'fieldcontainer',
                        fieldLabel: this.lableDate2,
                        combineErrors: false,
                        defaults: {
                            hideLabel: true
                        },
                        items:[
                            {xtype:'datefield',value: store.proxy.extraParams['search.date2'], name:'search.date2', width:80},
                            {xtype:'timefield', value: store.proxy.extraParams['search.date21'], format:'H:i', increment:5, name:'search.date21', width:70}
                        ]
                    }]},
                    {fieldLabel: this.labelUser, value:store.proxy.extraParams['search.un'], name:'search.un'}

                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->','-',{
                        text: this.btnFind,
                        handler: function(btn){
                            var fields = this.up('form').getForm().getValues();
                            Ext.apply(Ext.apply(store.proxy.extraParams, {'search.date1':'','search.date2':''}), fields);
                            store.load({params: {/*start: 0, */limit: 20}});
                        }
                    } ,'-']
                }]
            }
        }).show();
    }
});