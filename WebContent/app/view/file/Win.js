Ext.define('TK.view.file.Win', {
    extend: 'TK.view.ky2.AbstractWindow',
    alias: ['widget.filewininvoice'],
    requires: [
        'Ext.data.StoreManager',
        'Ext.form.field.Checkbox',
        'Ext.form.field.File',
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.layout.container.Anchor',
        'Ext.toolbar.Separator',
        'TK.store.Files',
        'TK.view.DocsForm',
        'TK.view.DocsList'
    ],
    closable: false,
    bodyPadding: 5,
    width: 800,
    title:'Список документов',

    // initComponent: function() {
    //     var config = {};
    //     this.buildConfig(config);
    //     Ext.apply(this, config);
    //     this.callParent(arguments);
    // },
    // buildConfig: function(config) {
    //     this.buildItems(config);
    // },
    buildItems:function(config) {
        config.items = [{
            xtype: 'docsform',
            title: this.labelGeneralInfo,
            bodyPadding: 5,
            fieldDefaults: {labelWidth: 100},
            defaults: {anchor: '100%'},
            closable: false,
            hidden: true,
            frame: true,
            width: 700,
            itemId:'fileInf',
            layout:'anchor',
            buildItems:function(config){
                config.items = [
                    {xtype: 'hidden', name:'file.hid', itemId:'file.hid'},
                    {xtype: 'hidden', name:'file.packDoc.hid', itemId:'file.packDoc.hid'},
                    {xtype: 'hidden', name:'file.route.hid', itemId:'file.route.hid'},
                    {xtype: 'hidden', name:'file.type', itemId:'file.type'},
                    {xtype:'textfield', fieldLabel:this.labelDescr, name: 'file.nkon', itemId:'file.nkon', maxLength:100}
                ];
            },
            buildDockedItems:function(config) {
                config.dockedItems = [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: []
                }];
                if(tkUser.hasPriv('CIM_SAVE')){
                    config.dockedItems[0].items.push(
                        '->',{
                            text: this.btnSave,
                            iconCls: 'save',
                            action:'save'
                        }
                    );
                }

            },
            initForm: function(prefix){
                this.getForm().setValues(this.addPrefix(prefix));
//                this.ownerCt.getComponent('file').getForm().setValues(this.addPrefix(prefix));
            },
            initServiceFields: function(data){
                this.getForm().setValues(data);
            }
        }, {
            xtype: 'docsform',
            title: this.labelDownloadFile,
            bodyPadding: 5,
            fieldDefaults: {labelWidth: 100},
            closable: false,
            frame: true,
            margin: '20 0 0 0',
            itemId:'file',
            layout:'anchor',
            buildItems:function(config){
                config.items = [
                    {xtype: 'hidden', name:'file.hid', itemId:'file.hid'},
                    {xtype: 'hidden', name:'file.packDoc.hid', itemId:'file.packDoc.hid'},
                    {xtype: 'hidden', name:'file.route.hid', itemId:'file.route.hid'},
                    {xtype: 'hidden', name:'file.type', itemId:'file.type'},
                    {
                        xtype: 'filesfield',
                        name: 'upload',
                        fieldLabel: this.labelFile,
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: this.labelFileSearch,
                        listeners: {
                            afterrender: function (cmp) {
                                cmp.fileInputEl.dom.setAttribute('multiple', '1');
                            }
                        }
                    }
                ];
            },
            buildDockedItems:function(config) {
                config.dockedItems = [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    ui: 'footer',
                    items: []
                }];
                if(tkUser.hasPriv('CIM_SAVE')){
                    config.dockedItems[0].items.push(
                        '->',{
                            text: this.btnSave,
                            iconCls: 'save',
                            action:'saveFile'
                        }
                    );
                }

            },
            initForm: function(prefix){
                this.getForm().setValues(this.addPrefix(prefix));
            },
            initServiceFields: function(data){
                this.getForm().setValues(data);
            }
        }, {
            xtype:'docslist',
            itemId:'filesList',
            inPack:true,
            buildStore: function(config) {
//                config.store = Ext.data.StoreManager.lookup(Ext.id(this.xtype)) ||  Ext.create('TK.store.Files', {storeId: Ext.id(this.xtype)});
            },
            buildColumns: function(config) {
                config.columns = [
                    {text: this.headerID, dataIndex: 'hid', width: 45, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: '', dataIndex: 'newDoc', width: 28, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: TK.Utils.rendererNewDoc},
                    {text: '', dataIndex: 'userFlag', width: 28, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: this.rendererUserFlag},
                    {text: this.headerFileName, dataIndex: 'fileName', flex: 1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerDateTime, dataIndex: 'altered', renderer: TK.Utils.renderLongStr, width: 125},
                    {text: this.headerUser, dataIndex: 'un', width: 110},
                    {text: this.headerContentType, dataIndex: 'contentType', width: 100, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerSizeByte, dataIndex: 'length', width: 100, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                ];
            },
            buildTopToolbar: function(config) {
                config.dockedItems = new Array({
                    dock: 'top',
                    xtype: 'toolbar',
                    itemId: 'top',
                    items: [
                        {text: 'Флаг', iconCls:'flag_3', itemId:'flag', action:'flag', forDeleted: true, forPresent: true},{xtype: 'tbseparator', forDeleted: true, forPresent: true},
                        {text: this.btnView, iconCls:'doc_view',itemId:'view', action:'view', forDeleted: true, forPresent: true},{xtype: 'tbseparator', forDeleted: true, forPresent: true}
                    ]
                });
                if(tkUser.hasPriv('CIM_DELETE')){
                    config.dockedItems[0].items.push(
                        {text: this.btnDelete,iconCls:'del',itemId:'del', action:'deleteFile'},{xtype: 'tbseparator', itemId:'del1'});
                }
                if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
                    config.dockedItems[0].items.push(
                        {boxLabel:this.lableDeleted, xtype:'checkbox', inputValue:1, uncheckedValue: 0, itemId:'viewDeleted', action:'viewDeletedFiles', hideLabel: true, forDeleted: true, forPresent: true},
                        {xtype: 'tbseparator', itemId:'viewDeleted1', forDeleted: true, forPresent: true},
                        {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restoreFile', forDeleted: true, hidden: true},
                        {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                        {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroyFile', forDeleted: true, hidden: true},
                        {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
                    );
                }
            },
            buildView: function(config) {
                config.viewConfig = {
                    stripeRows: true
                };
            },
            rendererUserFlag: function (value) {
                return value != null ? '<img src="./resources/images/flag-' + value + '.png" width="16" height="16">' : '';
            }
        }];
    },
    initServiceFields: function(data){
        Ext.Ajax.request({
            url: 'File_view1.do',
            params: data,
            scope: this.getComponent('file'),
            success: function(response) {
                if(!response.responseText){
                    this.dataObj = {};
                } else {
                    this.dataObj = Ext.decode(response.responseText)['doc'];
                    this.initForm('file');
                }
            },
            failure: function(response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
        var form = this.getComponent('fileInf'),
            grid = this.getComponent('filesList');
        // data['file.type'] = ''this.xtype'';
    	form.initServiceFields(data);
        this.getComponent('file').initServiceFields(data);
        grid.reconfigure(Ext.data.StoreManager.lookup(data['file.type']) ||  Ext.create('TK.store.Files', {storeId: data['file.type']}));// one store for multiple grids
        grid.store.removeAll(true);
        grid.getView().refresh();
        grid.store.proxy.extraParams = {'search.docType':data['file.type'], 'search.packId':data['file.packDoc.hid']};
        grid.store.load();
        grid.getDockedItems('pagingtoolbar')[0].bindStore(grid.store);
    },

    buildBottomToolbar: function (config) {
        config.buttons = [{
            text: this.btnClose,
            scope: this,
            iconCls:'exit',
            action: 'close'
        }];
    }

});