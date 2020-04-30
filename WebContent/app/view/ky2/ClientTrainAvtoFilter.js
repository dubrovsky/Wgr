/**
 * Created by Odmin on 27.01.2020.
 */
Ext.define('TK.view.ky2.ClientTrainAvtoFilter', {
    extend: 'Ext.window.Window',
    alias: 'widget.cltravtofilter',

    requires: [
        'TK.store.ky2.ClientFilterStore',
        'TK.store.ky2.TrainFilterStore',
        'TK.view.components.SearchFieldLocal'
    ],

    title: this.title,
    height: 400,
    width: 700,
    modal: true,
    layout: 'fit',
    clientStore:Ext.create('TK.store.ky2.ClientFilterStore'),
    trainStore:Ext.create('TK.store.ky2.TrainFilterStore'),
    extraFnTrains: this.onExtraFnTrains,
    initComponent: function() {
        var config = {};
        this.buildConfig(config);
        Ext.apply(this, config);
        this.callParent(arguments);
    },
    buildConfig: function(config) {
        this.buildItems(config);
        this.buildDockedItems(config);
    },
    buildItems:function(config){
        config.items = [
            {
                layout: 'border',
                items: [
                    {
                        title: this.panelClients,
                        itemId:'clPanel',
                        region:'west',
                        layout: 'fit',
                        width: 350,
                        split:true,
                        collapsible: false,
                        items:[
                        {
                            xtype: 'grid',
                            itemId:'clientGrid',
                            store:this.clientStore,
                            columnLines: true,
                            viewConfig: {
                                stripeRows: true,
                                singleSelect: true,
                                enableTextSelection: true
                            },
                            selModel : {mode:'MULTI', checkOnly: true},
                            selType: 'checkboxmodel',
                            columns: [
                                {text: '!hid', dataIndex: 'hid',flex:1,hidden: true},
                                {text: this.clmnClient, dataIndex: 'sname',flex:1, menuDisabled:true},
                            ],
                            listeners:{
                                select: this.onSelectClient,
                                deselect:this.onDeselectClient
                            }
                        }
                    ],
                    dockedItems:[
                        {
                            xtype: 'toolbar',
                            dock: 'top',
                            layout: 'column',
                            items: [
                                {xtype: 'searchfieldlocal', store: this.clientStore, paramName: 'sname',columnWidth:1}
                                ]
                        }
                    ]
                },{
                    title: this.panelTrains,
                        itemId:'trPanel',
                        region: 'center',
                        layout: 'fit',
                        width: 350,
                        items:[
                            {
                                xtype: 'grid',
                                itemId:'trainGrid',
                                columnLines: true,
                                store: this.trainStore,
                                viewConfig: {
                                    stripeRows: true,
                                    singleSelect: true,
                                    enableTextSelection: true
                                },
                                selModel : {mode:'MULTI', checkOnly: true},
                                selType: 'checkboxmodel',
                                columns: [
                                    {text: '!hid', dataIndex: 'hid', sortable: true,flex:1,hidden: true},
                                    {text: this.clmnTrNum, dataIndex: 'npprm', sortable: true,flex:1, menuDisabled:true},
                                    {text: '!Клиент', dataIndex: 'sname', sortable: true,flex:1,hidden: true}
                                ],
                            }
                        ],
                        dockedItems:[
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                layout: 'column',
                                items: [
                                    {xtype: 'searchfieldlocal', store: this.trainStore, paramName: 'npprm',itemId:'trainSearch',filterOverride:true,overrideFn:this.onExtraFnTrains,extraParams:[this.clientStore,this.trainStore],columnWidth:0.6},
                                    {xtype: 'checkbox',boxLabel: this.ckeckByTruck,itemId:'includeTrucks',inputValue:false, uncheckedValue:false, checked:false,columnWidth:0.4}
                                ]
                            }
                        ]
                }]
            }

        ]
    },
    buildDockedItems:function (config) {
        config.dockedItems = [
            {
                dock: 'bottom',
                itemId:'bottomTB',
                xtype: 'toolbar',
                items: ['->',
                    '-',
                    {text: this.btnFilter, itemId:'filterBtn', scope: this, action: 'filterKY'},
                    '-',
                    {text:this.btnCancel, handler: this.onCancel,scope: this}
                ]
            }
        ]
    },
    onCancel: function (btn) {
        btn.up('cltravtofilter').destroy();
    },
    onExtraFnTrains:function(me,value,extraParams)
    {
        me.store.remoteFilter = false;
        var trStore=extraParams[1],
            clStore=extraParams[0];
        trStore.filter(
                {id: 'npprm', property: 'npprm', value: value, anyMatch:true},
                {id: 'sname', property: 'sname', value: clStore.filters.items[0]?clStore.filters.items[0].value:'', anyMatch:true}
                );
        me.hasSearch = true;
    },
    onSelectClient:function (btn,opt1,opt2) {
        var form=Ext.ComponentQuery.query('cltravtofilter')[0], trStore=form.trainStore,
            clGrid=Ext.ComponentQuery.query('cltravtofilter #clientGrid')[0],sel=[],trSearchVal=form=Ext.ComponentQuery.query('cltravtofilter #trainSearch')[0].value;
        Ext.Array.each(clGrid.selModel.getSelection(), function (item) {
            sel.push(item.data.sname)
        });

        var filterValue = new RegExp('^(?:' + Ext.Array.map(sel, function(value){return Ext.escapeRe(value)}).join('|') + ')$');
        trStore.remoteFilter=false;
        if(trSearchVal)
        {
            trStore.filter(
                {id: 'sname', property: 'sname', value: filterValue, anyMatch: false},
                {id: 'npprm', property: 'npprm', value: trSearchVal, anyMatch: true}
            );
        }
        else
        {
            trStore.filter(
                {id: 'sname', property: 'sname', value: filterValue, anyMatch: true}
            );
        }
    },
    onDeselectClient:function () {
        var form=Ext.ComponentQuery.query('cltravtofilter')[0], trStore=form.trainStore,
            clGrid=Ext.ComponentQuery.query('cltravtofilter #clientGrid')[0],sel=[],trSearchVal=form=Ext.ComponentQuery.query('cltravtofilter #trainSearch')[0].value;
        Ext.Array.each(clGrid.selModel.getSelection(), function (item) {
            sel.push(item.data.sname)
        });

        var filterValue = new RegExp('^(?:' + Ext.Array.map(sel, function(value){return Ext.escapeRe(value)}).join('|') + ')$');

        if(!trSearchVal&&sel.length===0)
        {
            trStore.clearFilter();
            trStore.remoteFilter=true;
            return;
        }

        trStore.remoteFilter=false;
        if(trSearchVal)
        {
            if(sel.length===0)
            {
                trStore.clearFilter();
                trStore.filter(
                    {id: 'npprm', property: 'npprm', value: trSearchVal, anyMatch: true}
                );
            }
            else
            {
                trStore.filter(
                    {id: 'npprm', property: 'npprm', value: trSearchVal, anyMatch: true},
                    {id: 'sname', property: 'sname', value: filterValue, anyMatch: true}
                );
            }
        }
        else
        {
            trStore.filter(
                {id: 'sname', property: 'sname', value: filterValue, anyMatch: true}
            );
        }
    }
});
