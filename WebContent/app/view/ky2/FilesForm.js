Ext.define('TK.view.ky2.FilesForm', {
    // extend: 'Ext.panel.Panel',
    extend: 'TK.view.ky2.AbstractWindow',
    alias: 'widget.filesform',
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
    width: 700,
    title: 'Список документов на авто',

    buildItems:function(config) {
        config.items = [{
            xtype: 'docsform',
            closable: false,
            title: this.labelDownloadFile,
            bodyPadding: 5,
            fieldDefaults: {labelWidth: 100},
            frame: true,
            // margin: '20 0 0 0',
            itemId:'file',
            layout:'anchor',
            buildItems:function(config){
                config.items = [
                    {xtype: 'hidden', name:'hid', itemId:'avtoHid'},
                    {
                        xtype: 'filefield',
                        name: 'upload',
                        fieldLabel: this.labelFile,
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: this.labelFileSearch
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
            buildStore: function(config) {
                config.store = this.store;
            },
            buildColumns: function(config) {
                config.columns = [
                    {text: this.headerID, dataIndex: 'hid', width: 35, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: 'Дата создания', dataIndex: 'uploaded', flex: 2, maxWidth: 95, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerFileName, dataIndex: 'fileName', flex: 4, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerContentType, dataIndex: 'contentType', flex: 2, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerSizeByte, dataIndex: 'length', flex: 1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                ];
            },
            buildTopToolbar: function(config) {
                config.dockedItems = new Array({
                    dock: 'top',
                    xtype: 'toolbar',
                    itemId: 'top',
                    items: [
                        {text: this.btnView, iconCls:'doc_view', itemId:'view', action:'view', forDeleted: true, forPresent: true},{xtype: 'tbseparator', forDeleted: true, forPresent: true}
                    ]
                });
                // if(tkUser.hasPriv('CIM_DELETE')){
                //     config.dockedItems[0].items.push(
                //         {text: this.btnDelete,iconCls:'del',itemId:'del', action:'deleteFile'},{xtype: 'tbseparator', itemId:'del1'});
                // }
            },
            buildView: function(config) {
                config.viewConfig = {
                    stripeRows: true
                };
            }
        }];
    },
    
    initServiceFields: function(data){
        var form = this.getComponent('file'),
            grid = this.getComponent('filesList');
        // data['file.type'] = this.xtype;
    	form.initServiceFields(data);
        // this.getComponent('file').initServiceFields(data);
        // grid.reconfigure(Ext.data.StoreManager.lookup(this.xtype) ||  Ext.create('TK.store.Files', {storeId: this.xtype}));// one store for multiple grids
        grid.reconfigure(Ext.create(data['store']));// one store for multiple grids
        grid.store.removeAll(true);
        grid.store.proxy.extraParams = {hid: data['hid'], action: data['action']};
        grid.store.load();
        grid.getDockedItems('pagingtoolbar')[0].bindStore(grid.store);

    }
});