Ext.define('TK.controller.Project', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.grid.Panel',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Toolbar',
        'Ext.ux.form.ItemSelector',
        'TK.Utils'
    ],

    views:  ['project.List','project.Form'],
    stores: ['Projects','Project','RouteDocs',"Groups"],
    models: ['Project','Group','Route','RouteDoc'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    init: function() {
        this.control({
            'viewport > tabpanel > projectlist button[action="edit"]': {
                click: this.onEdit
            },
            'viewport > tabpanel > projectlist': {
                itemdblclick: this.onEdit
            },
            'viewport > tabpanel > projectlist button[action="create"]': {
                click: this.onCreate
            },
            'viewport > tabpanel > projectlist button[action="del"]': {
                click: this.onDelete
            },
            'viewport > tabpanel > project button[action="save"]': {
                click: this.onSave
            },
            'viewport > tabpanel > project button[action="save_close"]': {
                click: this.onSaveExit
            }
        });
    },
    initEvents: function(form){
        form.getComponent('groups').down('gridcolumn[dataIndex=name]').editor.onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiGroups().getComponent(0);
            nsiGrid.on('itemdblclick', this.getController('Nsi').selectGroup, form.getComponent('groups'));
        }, this);
        form.getComponent('routes').down('gridcolumn[dataIndex=grps]').editor.onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.nsiGroupsMulti.call(form);
            nsiGrid.down('button[action=select]').on(
                'click',
                Ext.bind(this.selectGroups, form.getComponent('routes'))
            );
        }, this);
        form.getComponent('routes').down('gridcolumn[dataIndex=dcs]').editor.onTriggerClick = Ext.bind(function(){
            var docs = this.nsiRouteDocs.call(form);
            docs.down('button[action=select]').on(
                'click',
                Ext.bind(this.selectDocs, form.getComponent('routes'))
            );
        }, this);
    },
    onCreate: function(btn){
        var doc = this.getCenter().add({xtype:'project'/*, title:'Проект'*/});
        doc.initServiceFields({task:'create'});
        Ext.getStore('Project').removeAll();
        doc.initForm();
        this.initEvents(doc);
        this.getCenter().setActiveTab(doc);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
    },
    onEdit: function(btn){
        var list = btn.up('grid'),
            data,
            doc,
            store;
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');
        doc = this.getCenter().add({xtype:'project'/*, title:'Ред. Проект'*/});
        data = list.selModel.getLastSelected().data;
        doc.initServiceFields({
            task:'edit',
            'project.hid':data.hid
        });
        store = Ext.getStore('Project'); /*||  Ext.create('Ext.data.Store', {model:'TK.model.Project', storeId: 'Projects1'})*/
        store.load({
            params:{'project.hid':data.hid},
            scope: this,
            callback: function(records, operation, success) {
                doc.initForm();
                this.initEvents(doc);
                this.getCenter().getEl().unmask();
                this.getCenter().setActiveTab(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
            }
        });

        /*Ext.Ajax.request({
         url: 'Project_view1.do',
         params: {'project.hid':data.hid},
         scope:this,
         success: function(response) {
         if(!response.responseText){
         doc.dataObj = {};
         } else {
         doc.dataObj = Ext.decode(response.responseText);
         doc.initForm();
         }
         this.getCenter().getEl().unmask();
         this.getCenter().remove(this.getCenter().getComponent(0), true);
         },
         failure: function(response) {
         this.getCenter().getEl().unmask();
         TK.Utils.makeErrMsg(response, 'Внимание! Ошибка...');
         }
         });*/

    },
    onDelete: function(btn){
        var list = btn.up('grid'),
	        me = this;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            initObj = function(data){
                var initObj = {task:'delete'};
                initObj['project.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:list.delMsg1, msg: list.delMsg2, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes')
                {
                    Ext.Ajax.request({
                        url: 'Project_delete.do',
                        params: initObj(data),
                        scope: list,
                        success: function(response, options) {
                            var text = Ext.decode(response.responseText);
                            this.store.load();
                        },
                        failure: function(response){
                            if (response.responseText){
                                var errors = Ext.decode(response.responseText);
                                if(errors.cause && errors.cause.indexOf('ConstraintViolationException') != -1){
                                    Ext.MessageBox.show({
                                        title: me.showTitle,
                                        msg: me.showMsg,
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.ERROR
                                    });
                                } else {
                                    TK.Utils.makeErrMsg(response, me.errorMsg);
                                }
                            }
                        }
                    });
                }
            }
        });
    },
    onSave:function(btn){
        var panel = btn.up('form');  // files
        if(panel.getForm().isValid()){
            panel.getForm().submit({
                waitMsg:panel.saveMsg,
                url: 'Project_save.do',
                params: panel.prepareGridData4Save(),
                scope:this,
                success: function(form, action) {
                    panel.initServiceFields(action.result.hid, true);
                },
                failure: panel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    onSaveExit:function(btn){
        var panel = btn.up('form');
        if(panel.getForm().isValid()){
            panel.getForm().submit({
                waitMsg:panel.saveMsg,
                url: 'Project_save.do',
                params: panel.prepareGridData4Save(),
                scope:this,
                success: function(form, action) {
                    var closeBtn = btn.up('panel').down('button[action="close"]');
                    closeBtn.fireEvent('click',closeBtn);
                },
                failure: this.failureAlert
            });
        }else {
            TK.Utils.failureDataMsg();
        }
    },
    selectGroups: function(btn) {
        var window =  btn.up('window'),
            grid = window.getComponent(0),
            toStore =   this.selModel.getLastSelected().groups();
        toStore.removeAll();
        toStore.add(grid.selModel.getSelection());
        this.getView().refresh();
        window.close();
    },
    nsiGroupsMulti: function(){
        return Ext.widget('window', {
            title: this.labelGroups,
            width:500, y:1,
            height:500,
            modal:true,
            layout: 'fit',
            autoShow: true,

            items:[{
                xtype: 'grid',
                enableColumnResize: false,
                columnLines: true,
//                forceFit: true,
//                autoHeight:true,
                selType:     'checkboxmodel',
                selModel: {mode : 'MULTI'},
                viewConfig: {
                    stripeRows: true,
                    singleSelect:true
                },
                store:'Groups',
                columns: {
                    items:[
                        {text: this.headerName,dataIndex: 'name',flex:1},
                        {text: this.headerDescr, dataIndex: 'descr', flex:2, renderer: TK.Utils.renderLongStr}
                    ],
                    defaults:{
                        sortable:false,
                        hideable:false,
                        menuDisabled:true,
                        draggable:false,
                        groupable:false
                    }
                },
                listeners: {
                    render : function(grid){
                        grid.ownerCt.el.mask(/*'Загрузка...'*/);
                        grid.store.load({
                            scope: this,
                            callback: function () {
                                var fromStore = this.up('viewport').down('detailgrid[itemId="routes"]').selModel.getLastSelected().groups();

                                fromStore.each(function(record){
                                    grid.selModel.select(grid.store.findExact('name', record.get('name')), true);
                                });
//                                grid.selModel.select(fromStore.getRange());
                                grid.ownerCt.el.unmask();
                            }
                        });
                    },
                    scope: this
                }
            }],
            dockedItems: [{
                dock:   'bottom',
                xtype:  'toolbar',
                items: ['->',
                    '-', {
                        text:    this.btnSelect,
                        action:  'select'
                    },
                    '-', {
                        text:   this.btnClose,
                        handler:function(btn) {
                            btn.up('window').close();
                        }
                    }]
            }]
        });
    },
    nsiRouteDocs: function(){
        var store = Ext.getStore('RouteDocs');
        store.removeAll();
        store.clearListeners();

        return Ext.widget('window', {
            title: this.labelRoutes,
            y:1,
            modal:true,
            autoShow: true,
            bodyPadding: 5,
            layout: 'fit',
            items:[{
                xtype: 'itemselector',
                store: store,
                displayField: 'descr',
                valueField: 'hid',
                allowBlank: false,
                msgTarget: 'side',
                width: 600,
                height: 300,
                listeners: {
                    beforerender : function(itemselector){
                        var fillToField = function(){
                            var fromStore = this.up('viewport').down('detailgrid[itemId="routes"]').selModel.getLastSelected().docs();

                            fromStore.each(function(record){
                                itemselector.fromField.boundList.select(record);
                                itemselector.onAddBtnClick();
                            });
                        };

                        itemselector.getStore().load({
                            scope: this,
                            callback: function () {
                                fillToField.call(this);
                            }
                        });
                    },
                    scope: this
                }
            }],
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->',
                    '-', {
                        text: this.btnSelect,
                        action: 'select'
                    },
                    '-', {
                        text: this.btnClose,
                        handler: function(btn) {
                            btn.up('window').close();
                        }
                    }]
            }]
        });
    },
    /*nsiRouteDocs: function(){
        var store = Ext.getStore('RouteDocs');

        store.load({
            callback: function () {

                var itemselector =  Ext.widget('itemselector', {
                    store: store,
                    displayField: 'descr',
                    valueField: 'hid',
                    allowBlank: false,
                    msgTarget: 'side',
                    width: 600,
                    height: 300

                });
//                itemselector.bindStore(store);
                var fromStore = this.up('viewport').down('detailgrid[itemId="routes"]').selModel.getLastSelected().docs();

                fromStore.each(function(record){
                    itemselector.fromField.boundList.select(itemselector.fromField.boundList.store.findExact('hid', record.get('hid')), true);
                    itemselector.onAddBtnClick();
                });

//                fromStore.each(function(record){
//                    itemselector.moveRec(true, record);
//                });
//                itemselector.fromField.boundList.refresh();

                //copy from data loaded from my principal store to the ItemSelector's main store
//                itemselector.store.add(store.getRange());

                //Also copy data to Available Item Store
//                itemselector.fromField.store.add(store.getRange());

                Ext.widget('window', {
                    title: this.labelRoutes,
                    y:1,
                    modal:true,
                    autoShow: true,
                    bodyPadding: 5,
                    layout: 'fit',
                    items: itemselector,
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'toolbar',
                        items: ['->',
                            '-', {
                                text: this.btnSelect,
                                action: 'select'
                            },
                            '-', {
                                text: this.btnClose,
                                handler: function(btn) {
                                    btn.up('window').close();
                                }
                            }]
                    }]
                });
            },
            scope:this
        });

    },*/
    selectDocs: function(btn) {
        var window =  btn.up('window'),
            selector = window.getComponent(0),
            fromStore = selector.toField.store,
            toStore =   this.selModel.getLastSelected().docs();
        toStore.removeAll();
        toStore.add(fromStore.getRange());
        this.getView().refresh();
        window.close();
    }
});