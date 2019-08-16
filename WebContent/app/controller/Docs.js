Ext.define('TK.controller.Docs', {
    extend: 'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils',
        'TK.controller.print.Print'
    ],

    requires: [
        'Ext.data.ArrayStore',
        'Ext.data.Errors',
        'Ext.data.Store',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.form.FieldContainer',
        'Ext.form.FieldSet',
        'Ext.form.Panel',
        'Ext.form.RadioGroup',
        'Ext.form.field.ComboBox',
        'Ext.form.field.Date',
        'Ext.form.field.File',
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.form.field.Time',
        'Ext.grid.Panel',
        'Ext.grid.column.Action',
        'Ext.grid.plugin.CellEditing',
        'Ext.layout.container.Anchor',
        'Ext.layout.container.Fit',
        'Ext.layout.container.HBox',
        'Ext.layout.container.VBox',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Paging',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Toolbar',
        'Ext.util.MixedCollection',
        'Ext.window.Window',
        'TK.Utils',
        'TK.view.edit.SelectCopy2AvisoElements',
        'TK.view.pogruz.PoezdSelectForm',
        'TK.view.stat.Form'
    ],

    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }, {
            ref: 'menutree',
            selector: 'viewport > menutree'
        }, {
            ref: 'langCombo',
            selector: 'viewport #localeCombo #langCombo'
        }
    ],
    init: function() {
    /*
    [rendered]:not([destroying]):not([isDestroyed]):not([disabled]){isVisible(true)}{el && c.el.dom && c.el.isVisible()}
    {locked !== undefined}{processed != true}
    >gridcolumn:not([hidden])
    tableview:not([lockableInjected])
    */
        this.prefixDir = 'docs';
        this.control({
            'viewport > tabpanel > grid[inPack=false] button[action="create"]': {
                click: this.onCreateCont
            },
            'viewport > tabpanel > grid[inPack=false] button[action="create"] menuitem[action="createCont"]': {
                click: this.onCreateCont
            },
            'viewport > tabpanel > grid[inPack=false] button[action="create"] menuitem[action="createVag"]': {
                click: this.onCreateVag
            },
            'viewport > tabpanel > grid[inPack=false] button[action="edit"]': {
                click: this.onEdit
            },
            'viewport > tabpanel > grid[inPack=false]': {
                itemdblclick: this.onEdit,
                render: this.onPrepareGridToRender,
                prepareGridToRender: this.onPrepareGridToRender
            },
            'viewport > tabpanel > grid[inPack=false] button[action="copy"]': {
                click: this.onCopy
            },
            'viewport > tabpanel > grid[inPack=false] button[action="copy"] menuitem[action="copy"]': {
                click: this.onCopy
            },
            'viewport > tabpanel > grid[inPack=false] button[action="copy"] menuitem[action="copy2aviso"]': {
                click: this.onCopy2AvisoInit
            },
            'viewport > tabpanel > grid[inPack=true] button[action="copy"]': {
                click: this.onCopyInPack
            },
            'viewport > tabpanel > grid[inPack=true] button[action="copy"] menuitem[action="copy"]': {
                click: this.onCopyInPack
            },
            'viewport > tabpanel > grid[inPack=false] button[action="copy"] menuitem[action="showCopySelectedWin"]': {
                click: this.showCopySelectedWin
            },
            'viewport > tabpanel > grid[inPack=true] button[action="copy"] menuitem[action="showCopySelectedWin"]': {
                click: this.showCopySelectedWin
            },
            'viewport > tabpanel > grid[inPack=false] button[action="del"]': {
                click: this.onDelete
            },
            'viewport > tabpanel > grid[inPack=false] button[action="restore"]': {
                click: this.onRestore
            },
            'viewport > tabpanel > grid[inPack=false] button[action="destroy"]': {
                click: this.onDestroy
            },
            /*'docslist button[action="print"]': {
                click: this.onPrint1
            },
            'docslist button[action="print"] menuitem[action="print"]': {
                click: this.onPrint1
            },
            'docslist button[action="print"] menuitem[action="bindPrintTmpl"]': {
                click: this.onBindUnPrintTempl
            },*/

            'viewport > tabpanel > grid button[action=upload]': {
                click: this.onUpload
            },
            'viewport > tabpanel > grid button[action=uploadDB]': {
                click: this.onUploadDB
            },
            'viewport > tabpanel > grid button[action=uploadGU]': {
                click: this.onUploadGU
            },
            'viewport > tabpanel > grid button[action="report"]': {
                click: this.onReport
            },
            'viewport > tabpanel > grid button[action="filter"]': {
                click: this.onFilter
            },
            'viewport > tabpanel > grid button[action="history"]': {
                click: this.onHistory
            },
            'viewport > tabpanel > grid[inPack=true] button[action="create"]': {
                click: this.onCreateInPack
            },
            'viewport > tabpanel > grid[inPack=true] button[action="edit"]': {
                click: this.onEditInPack
            },
            'viewport > tabpanel > grid[inPack=true]': {
                itemdblclick: this.onEditInPack,
                prepareGridToRender: this.onPrepareGridToRender
            },
            'viewport > tabpanel > panel > grid[inPack=true]': {
                prepareGridToRender: this.onPrepareGridToRender
            },

            'viewport > tabpanel grid[inPack=true] button[action="del"]': {
                click: this.onDeleteInPack
            },
            'viewport > tabpanel grid[inPack=true] button[action="restore"]': {
                click: this.onRestoreInPack
            },
            'viewport > tabpanel grid[inPack=true] button[action="destroy"]': {
                click: this.onDestroyInPack
            },
            'viewport > tabpanel > docsform button[action="save"]': {
                click: this.onSave
            },
            'viewport > tabpanel > docsform button[action="save_close"]': {
                click: this.onSaveExit
            },
            'viewport > tabpanel > docsform button[action="save_print2"]': {
                click: this.onSavePDF
            },
            'viewport > tabpanel > form button[action="close"]': {
                click: this.onExit
            },

            'viewport > tabpanel > docsform button[action="forAgree"]': {
                click: this.onAgreed
            },
            'viewport > tabpanel > docsform button[action="agreed"]': {
                click: this.onAgreed
            },
            'viewport > tabpanel > docsform button[action="notAgreed"]': {
                click: this.onAgreed
            },

            'viewport > tabpanel > docsform button[action="comments"]': {
                click: this.onComments
            },
            'viewport > tabpanel > grid button[action="aviso2cimsmgs"]': {
                click: this.onAviso2CimSmgs
            },
            'viewport > tabpanel > grid button[action="aviso2smgs"]': {
                click: this.onAviso2Smgs
            },
            'viewport > tabpanel > grid button[action="aviso2smgsAppend"]': {
                click: this.onAviso2Smgs
            },
            'viewport > tabpanel > grid button[action="export2Excel"]': {
                click: this.onExport2Excel
            },
            'viewport > tabpanel > form button[action="doc2EpdRewrite"]': {
                click: this.doc2EpdRewrite
            },
            'viewport > tabpanel > form button[action="epd2DocRewrite"]': {
                click: this.epd2DocRewrite
            },

            // поиск поезда
            'docslist menuitem[action=searchTrains]': {
                click: this.trainSearch
            },
            'window > grid button[action="copySelectedDocs"]': {
                click: this.onCopySelected
            },
            'cimsmgs':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'cim':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'avisocimsmgs':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'smgs2':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'aviso2':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'avisocim':{
                prepareData4RemoteSave: this.onPrepareData4RemoteSave
            },
            'ky2poezdoutform button[action="close"]': {
                click: this.onExit
            },
            'ky2poezdintoform button[action="close"]': {
                click: this.onExit
            },
            'ky2avtooutform button[action="close"]': {
                click: this.onExit
            },
            'ky2avtointoform button[action="close"]': {
                click: this.onExit
            },
            'ky2vgctgrtreeform button[action=close]': {
                click: this.onExit
            },
            'ky2bindtreeform button[action=close]': {
                click: this.onExit
            }


        });
    },
    onActivateList:function(panel){
        panel.getStore().loadPage(1, {
            callback:function(){
                if(panel.hasListener('activate')){
                    panel.un('activate', this.onActivateList, this);
                }
        }, scope:this});

    },
    /**
     * запуск действия при активации формы
     * @param panel
     */
    onActivateForm:function(panel){
        var task = panel.getForm().findField('task'),
            params = {task: task.getValue()},
            form = panel.getForm(),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list'), // 2d may be when activate child of the list
            unSel = panel.getForm().findField('unSel'),unSelArr;

        if(unSel)// создание массива невыбранных полей при трансформации документа в шаблон
            unSelArr=unSel.getValue().split(',');

        this.getCenter().getEl().mask('Request...','x-mask-loading');
        if(form.findField(doc.prefix+'.hid').getValue()){
            params[doc.prefix + '.hid'] = form.findField(doc.prefix+'.hid').getValue();
        }
        if(form.findField(doc.prefix+'.packDoc.hid') && form.findField(doc.prefix+'.packDoc.hid').getValue()){
            params[doc.prefix + '.packDoc.hid'] = form.findField(doc.prefix+'.packDoc.hid').getValue();
        }
        if(form.findField(doc.prefix+'.type') && form.findField(doc.prefix+'.type').getValue()){
            params[doc.prefix + '.type'] = form.findField(doc.prefix+'.type').getValue();
        }
        if(form.findField('status') && form.findField('status').getValue()){
            params['status'] = form.findField('status').getValue();
        }
        Ext.Ajax.request({
            url: Ext.String.capitalize(doc.prefix) + '_view1.do',
            params: params,
            scope:this,
            success: function(response) {
                if(!response.responseText){
                    panel.dataObj = {};
                } else {
                    panel.dataObj = Ext.decode(response.responseText)['doc'];

                    // убираем невыбранные поля при создании шаблона из докуента
                    if(unSelArr) // инициализация массива говорит о то, что мы трансформируем документ в шаблон
                    switch (doc.name) {
                        case 'aviso2':
                            this.clear2aviso2Fields(panel.dataObj,unSelArr);
                            break;
                        case 'avisocim':
                            break;
                        case 'avisocimsmgs':
                            break;
                    }
                    panel.initForm(doc.prefix);
                }

                panel.un('activate', this.onActivateForm, this);
                this.getCenter().getEl().unmask();
            },
            failure: function(response) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    onActivatePanel:function(panel){
        var forms = panel.query('form'),
            grids = panel.query('grid'),
            field,
            params = {},
            form,
            doc = tkUser.docs.getByKey(panel.xtype),
            formpanel,
            controller = this;

        for(var i = 0; i < forms.length; i++){
            if(forms[i].initForm) {  // not all forms needed to be initialiased
                formpanel = forms[i];
                form = formpanel.getForm();
                if(field = form.findField('task')){
                    params['task'] = field.getValue();
                }
                if((field = form.findField(doc.prefix+'.hid')) && field.getValue()){
                    params[doc.prefix + '.hid'] = field.getValue();
                }
                if((field = form.findField(doc.prefix+'.packDoc.hid')) && field.getValue()){
                    params[doc.prefix + '.packDoc.hid'] = field.getValue();
                }
                if((field = form.findField(doc.prefix+'.type')) && field.getValue()){
                    params[doc.prefix + '.type'] = field.getValue();
                }

                Ext.Ajax.request({
                    url: Ext.String.capitalize(doc.prefix) + '_view1.do',
                    params: params,
                    scope:formpanel,
                    success: function(response) {
                        if(!response.responseText){
                            this.dataObj = {};
                        } else {
                            this.dataObj = Ext.decode(response.responseText)['doc'];
                            this.initForm(doc.prefix);
                        }
                        panel.un('activate', controller.onActivatePanel, this);
                    },
                    failure: function(response) {
                        TK.Utils.makeErrMsg(response, 'Error...');
                    }
                });
            }
        }

        for(i = 0; i < grids.length; i++){
            grids[i].store.load();
        }
    },
    docsInRoute: function(record){
        var nodes = record.parentNode.childNodes,
            docsArr = new Ext.util.MixedCollection(false, function(docName){
               return docName; // keys for collection
            });
        for(var i = 0; i < nodes.length; i++){
           docsArr.add(nodes[i].id.split('_')[3]);
        }
        return docsArr;
    },
    findController: function(controller){
        return this.getController(this.prefixDir + '.' + Ext.String.capitalize(controller));
    },
    onCreateCont: function(btn) {
        this.create(btn, 2);
    },
    onCreateVag: function(btn) {
        this.create(btn, 1);
    },
    // создание формы документа
    create: function(btn, perevozType){
        this.getCenter().getEl().mask('Request ...','x-mask-loading');
        var focus,
            doc,
            menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem)),
            routeId = menuItem.id.split('_')[2],
            controller,
            initObj = function(prefix){
                var initObj = {task:'create'};
                initObj[prefix + '.route.hid'] = routeId;
                initObj[prefix + '.g25'] = (perevozType ? perevozType : 2);
//                initObj[prefix + '.status'] = 15;
                return initObj;
            };

        this.getCenter().suspendLayouts();
        docsInPack.each(function(item,index,length){
            controller = this.findController(item.alias);

            if(item.range == 'form'){
                doc = this.getCenter().add({xtype:item.name, title:item.descr, closable:false});
                doc.initServiceFields(initObj(item.prefix));
                controller.initEvents(doc);
                doc.dataObj = {};
                if(docName == item.name){
                    focus = doc;
                }
            } else if(item.range == 'list&form'){
                doc = this.getCenter().add({xtype:item.name, title:this.titleList+item.descr, inPack:true});
                doc.store.removeAll(true);
                doc.getView().refresh();
                doc.initGrid({'search.routeId':routeId,'search.packId': -1,'task':'create'});
                if(docName == item.name){
                    doc = this.getCenter().add({xtype:item.alias, title:item.descr, closable:false});
                    doc.initServiceFields(initObj(item.prefix));
                    doc.dataObj = {};
                    controller.initEvents(doc);
                    focus = doc;
                }
            } else if(item.range == 'panel'){
                doc = this.getCenter().add({xtype:item.name, title:item.descr, closable:false, inPack:true});
                var grids = doc.query('grid');
                for(var i = 0; i < grids.length; i++){
                    grids[i].store.removeAll(true);
                    grids[i].getView().refresh();
                }
                doc.initServiceFields(initObj(item.prefix));
                doc.dataObj = {};
                if(docName == item.name){
                    focus = doc;
                }
            }
        }, this);
        this.getCenter().getEl().unmask();
        this.getCenter().setActiveTab(focus);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().resumeLayouts(true);
    },
    onCreateInPack: function(btn){
		var list = btn.up('grid'),
            routeId = this.getMenutree().lastSelectedLeaf.id.split('_')[2],
            extraParams = list.store.proxy.extraParams,
            doc = tkUser.docs.getByKey(list.xtype),
            initObj = function(prefix){
                var initObj = {task:'create'};
                initObj[prefix + '.route.hid'] = routeId;
                initObj[prefix + '.packDoc.hid'] = extraParams['search.packId'] > 0 ? extraParams['search.packId'] : '';
                return initObj;
            },
            form = this.getCenter().add({xtype:doc.alias, title:doc.descr, closable:false});
        form.initServiceFields(initObj(doc.prefix));
        form.dataObj = {};
        this.findController(doc.alias).initEvents(form);
	  	this.getCenter().setActiveTab(form);
    },
    onEdit: function(btn){
        var list = btn.up('grid') || this.getCenter().getComponent(0);   // second choice for context menu
		if(!TK.Utils.isRowSelected(list)){
		  	return false;
		}
//        this.getCenter().getEl().mask('Запрос ...','x-mask-loading');
		var menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem)),
            data = list.selModel.getLastSelected().data,
            focus, //will be set for context menu
            contextFocus = btn.focusedItem,
            doc,
            controller,
            initObj = function(item, data){
                var initObj = {task:'edit',status:15},
                    prefix = item.prefix;
                initObj[prefix + '.route.hid'] = data['routeId'];
                if(docName == item.name){
                    initObj[prefix + '.hid'] = data['hid'];
                }
                initObj[prefix + '.packDoc.hid'] = data['packId'] || data['hid']; /*data.hid - if go throught EPD */

                if(data.avisoId){
                    initObj[prefix + '.cimSmgs.hid'] = data['avisoId'];
                }
                return initObj;
            };
        this.getCenter().suspendLayouts();
        docsInPack.each(function(item,index,length){
            controller = this.findController(item.alias);
            if(item.range == 'form'){  // only form tab
                doc = this.getCenter().add({xtype:item.name, title:this.titleEdit+item.descr, closable:false});
                doc.initServiceFields(initObj(item, data));
                controller.initEvents(doc);
                doc.on('activate', this.onActivateForm, this);
                if((contextFocus && contextFocus == item.name) || (!contextFocus && docName == item.name)){
                    focus = doc;
                }
            } else if(item.range == 'list&form'){    // list tab & form tab - invoices
                doc = this.getCenter().add({xtype:item.name, title:this.titleList+item.descr, inPack:true});
                doc.initGrid({'search.routeId':data.routeId,'search.packId': data.packId,'task':'edit'});
                doc.on('activate', this.onActivateList, this);
                if(contextFocus && contextFocus == item.name){
                    focus = doc;
                } else if(docName == item.name){
                    doc = this.getCenter().add({xtype:item.alias, title:item.descr, closable:false});
                    doc.initServiceFields(initObj(item, data));
                    controller.initEvents(doc);
                    doc.on('activate', this.onActivateForm, this);
                    focus = doc;
                }
            } else if(item.range == 'panel'){   // tabpanel with list and form on it - for uploaded files
                doc = this.getCenter().add({xtype:item.name, title:this.titleEdit+item.descr, closable:false, inPack:true});
                doc.initServiceFields(initObj(item, data));
                doc.on('activate', this.onActivatePanel, this);
                if((contextFocus && contextFocus == item.name) || (!contextFocus && docName == item.name)){
                    focus = doc;
                }
            }
        }, this);
        this.getCenter().setActiveTab(focus);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().resumeLayouts(true);
    },
    onEditInPack: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
		  	return false;
		}
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(list.xtype),
            forms = this.getCenter().query(doc.alias),
            form,
            initObj = function(prefix, data){
                var initObj = {task:'edit',status:15};
                initObj[prefix + '.hid'] = data.hid;
                initObj[prefix + '.route.hid'] = data.routeId;
                initObj[prefix + '.packDoc.hid'] = data.packId;
                return initObj;
            };
        for(var i = 0; i < forms.length; i++){
            var field = forms[i].getForm().findField(doc.prefix+'.hid');
            if(field.getValue() == data.hid){
                form = forms[i];
                break;
            }
        }
        if(!form) {
            form = this.getCenter().add({xtype:doc.alias, title:this.titleEdit+doc.descr});
            form.initServiceFields(initObj(doc.prefix, data));
//            this.getController(Ext.String.capitalize(doc.alias)).initEvents(form);
            this.findController(doc.alias).initEvents(form);
            form.on('activate', this.onActivateForm, this);
        }
        this.getCenter().setActiveTab(form);
    },
    onCopy: function(btn){
        var list = btn.up('grid');
		if(!TK.Utils.isRowSelected(list)){
		  	return false;
		}
//        this.getCenter().getEl().mask('Запрос ...','x-mask-loading');
		var menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem)),
            data = list.selModel.getLastSelected().data,
            focus,
            doc,
            controller,
            initObj = function(item, data){
                var initObj, prefix = item.prefix;
                if(docName == item.name){
                    initObj = {task:'copy'};
                    initObj[prefix + '.hid'] = data.hid;
                } else {
                    initObj = {task:'create'};
                }
                initObj[prefix + '.route.hid'] = data.routeId;
                return initObj;
            };
        this.getCenter().suspendLayouts();
        docsInPack.each(function(item,index,length){
//            controller = this.getController(Ext.String.capitalize(item.alias));
            controller = this.findController(item.alias);
            if(item.range == 'form'){
                doc = this.getCenter().add({xtype:item.name, title:this.titleCopy+item.descr, closable:false});
                doc.initServiceFields(initObj(item, data));
                controller.initEvents(doc);
                if(docName == item.name){
                    doc.on('activate', this.onActivateForm, this);
                    focus = doc;
                }
            } else if(item.range == 'list&form'){
                doc = this.getCenter().add({xtype:item.name, title:this.titleList+item.descr, inPack:true});
	            doc.store.removeAll(true);
                doc.getView().refresh();
	            doc.initGrid({'search.routeId':data.routeId,'search.packId': -1,'task':'create'});
                if(docName == item.name){
                    doc = this.getCenter().add({xtype:item.alias, title:this.titleCopy+item.descr, closable:false});
                    doc.initServiceFields(initObj(item, data));
                    controller.initEvents(doc);
                    doc.on('activate', this.onActivateForm, this);
                    focus = doc;
                }
            } else if(item.range == 'panel'){   // tabpanel with list and form on it - for uploaded files
                doc = this.getCenter().add({xtype:item.name, title:this.titleEdit+item.descr, closable:false, inPack:true});
                doc.initServiceFields(initObj(item, data));
//                doc.on('activate', this.onActivatePanel, this);
//                if(docName == item.name){
//                    focus = doc;
//                }
            }
        }, this);
//        this.getCenter().getEl().unmask();
        this.getCenter().setActiveTab(focus);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().resumeLayouts(true);
    },
    /**
     * выводим меню копирования документа в шаблон
     * @param btn
     */
    onCopy2AvisoInit:function(btn)
    {
        var list = btn.up('grid'),
            menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem));
        if(!TK.Utils.isRowSelected(list)){
            return;
        }

        var win= Ext.create('TK.view.edit.SelectCopy2AvisoElements',{
            btn:btn,
            controller:this
        });
        var selStore=win.getComponent('sel2avisoGrid').getStore(),num=1,textName=docName+'_'+num;

        while(this[textName])
        {
            var txt=this[textName].split('|');
            selStore.add(
                {
                    'num' :txt[0],
                    'text':txt[1],
                    'nGraph':txt[2],
                    'isSelected':false
                }
            )
            num++;
            textName=docName+'_'+num;
        }
        if(selStore.getCount()===0)
        {
            selStore.add(
                {
                    'num' :-1,
                    'text':this.all,
                    'nGraph':'',
                    'isSelected':false
                });
        }
        win.show();
    },
    /**
     * создает копию документа в шаблон с выбранными графами
     * @param btn
     * @param unSel
     */
    onCopy2Aviso:function(btn,unSel)
    {
        var list = btn.up('grid'),
            menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem)),
            data = list.selModel.getLastSelected().data,controller, avisoName='',doc,focus,item;
        if(docName!=='smgs2'&&docName!=='cim'&&docName!=='cimsmgs')
            return;
        switch (docName) {
            case 'smgs2':
                controller = this.findController('Aviso2');
                avisoName='aviso2';
                item=docsInPack.items[0];
                break;
            case 'cim':
                controller = this.findController('Avisocim');
                item=docsInPack.items[2];
                avisoName='avisocim';
                break;
            case 'cimsmgs':
                controller = this.findController('Avisocimsmgs');
                item=docsInPack.items[3];
                avisoName='avisocimsmgs';
            break;
        }
        this.getCenter().suspendLayouts();

        initObj = function(item, data,unSel){
            var initObj, prefix = item.prefix;
            if(docName === item.name){
                initObj = {task:'copy',unSel:unSel};
                initObj[prefix + '.hid'] = data.hid;
            } else {
                initObj = {task:'create'};
            }
            initObj[prefix + '.route.hid'] = data.routeId;
            return initObj;
        };

        doc = this.getCenter().add({xtype:avisoName, title:this.titleCopy2Aviso, closable:false});
        doc.initServiceFields(initObj(item, data,unSel));
        controller.initEvents(doc);
        if(docName === item.name){
            doc.on('activate', this.onActivateForm, this);
            focus = doc;
        }

        this.getCenter().setActiveTab(focus);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().resumeLayouts(true);
    },
    /**
     * очищает не выбранные поля документа при преобразовании его в шаблон
     * @param doc документ
     * @param unSel массив невыбранных полей
     */
    clear2aviso2Fields:function (doc,unSel) {
        var
            g1smgs2=['g1r','g2_E','g15_1','g16r','g18r_1','g19r','g17_1','g1_dop_info','g2','g2_','g_2inn','g14'],
            g2smgs2=['g162r','g163r','g171','g17','g16_dop_info'],
            g3smgs2=['zayav_otpr'],
            g4smgs2=['g4r','g5_E','g45_1','g46r','g48r','g49r','g47_1','g4_dop_info','g5','g5_','g_5inn'],
            g5smgs2=['g101r','g102r','g12','g121','g2017'],
            g15smgs2=['g11_prim'],
            g25smgs2=['g15r'],
            g28smgs2=['g26'],
            additinal=['g694','g281','g281Disp'];
        for(var i=0;i<unSel.length;i++)
        {
            // удаляем вагоны полностью если не выбраны одновременно Вагон, Груз, Контейнер, Приложенные документы
            if(unSel.indexOf('7')!==-1&&unSel.indexOf('8')!==-1&&unSel.indexOf('10')!==-1&&unSel.indexOf('11')!==-1&&unSel.indexOf('14')!==-1)
            {
                doc.cimSmgsCarLists={};
            }

            // удаляем невыбранные пункты
            switch (unSel[i]) {
                case '1': //Отправитель
                    this.clearField(doc,g1smgs2);
                    break;
                case '2'://Станция отправления
                    this.clearField(doc,g2smgs2);
                    break;
                case '3'://Заявления отправителя
                    this.clearField(doc,g3smgs2);
                    break;
                case '4'://Получатель
                    this.clearField(doc,g4smgs2);
                    break;
                case '5'://Станция назначения
                    this.clearField(doc,g5smgs2);
                    break;
                case '6'://Погранпереходы
                    doc.cimSmgsDocses13={};
                    break;
                case '7'://Вагон
                    this.clearCars(doc);
                    break;
                case '8'://Груз
                    this.clearCargo(doc);
                    break;
                case '9'://Груз дополнительная информация
                    this.clearField(doc,g15smgs2);
                    break;
                case '10'://Контейнер
                    this.clearConts(doc);
                    break;
                case '11'://Пломбы
                    this.clearPlombs(doc);
                    break;
                case '12'://Перевозчики
                    doc.cimSmgsPerevoz={};
                    break;
                case '13'://Провозные платежи
                    doc.cimSmgsPlatels={};
                    break;
                case '14'://Приложенные документы
                    this.clearAdditionalDocs(doc);
                    break;
                case '15'://Информация не предназначенная для перевозчика
                    this.clearField(doc,g25smgs2);
                    break;
                case '16'://Отметки таможни
                    this.clearField(doc,g28smgs2);
                    break;
            }
        }
        this.clearField(doc,additinal);
    },
    /**
     * функция очистки полей по списку
     * @param doc документ
     * @param field список полей
     */
    clearField:function(doc,field)
    {
        for(var i=0;i<field.length;i++)
        {
            doc[field[i]]='';
        }
    },
    /**
     * очистка записей о вагоне
     * @param doc документ
     */
    clearCars:function(doc)
    {
        var carList=doc.cimSmgsCarLists;

        for (var carNum in carList) {
           var car=carList[carNum];
            for (var propertyName in car) {

                if(propertyName!=='cimSmgsKonLists'&&propertyName!=='sort')
                {
                    car[propertyName]=null;
                }
            }
            car['nvag']='xxxxx';
        }

    },
    /**
     * очистка записей о контейнерах
     * @param doc документ
     */
    clearConts:function(doc)
    {
        var carList=doc.cimSmgsCarLists;
        for (var carNum in carList) {
            var conList = carList[carNum].cimSmgsKonLists;
            for (var conNum in conList) {
                var cont=conList[conNum];
                for (var propertyName in cont) {

                    if((propertyName!=='cimSmgsDocses9')&&(propertyName!=='cimSmgsGruzs')&&(propertyName!=='cimSmgsPlombs')&&propertyName!=='sort')
                    {
                        cont[propertyName]=null;
                    }
                }
                cont['utiN']='xxxxx';
            }
        }
    },
    /**
     * очистка записей о грузах
     * @param doc документ
     */
    clearCargo:function(doc)
    {
        var carList=doc.cimSmgsCarLists;
        for (var carNum in carList) {
            var conList = carList[carNum].cimSmgsKonLists;
            for (var conNum in conList) {
                conList[conNum].cimSmgsGruzs={};
            }
        }
    },
    /**
     * очистка записей о пломбах
     * @param doc документ
     */
    clearPlombs:function(doc)
    {
        var carList=doc.cimSmgsCarLists;
        for (var carNum in carList) {
            var conList = carList[carNum].cimSmgsKonLists;
            for (var conNum in conList) {
                conList[conNum].cimSmgsPlombs={};
            }
        }
    },
    /**
     * удаление дополнительных докуентов
     * @param doc документ
     */
    clearAdditionalDocs:function(doc)
    {
        var carList=doc.cimSmgsCarLists;
        for (var carNum in carList) {
            var conList = carList[carNum].cimSmgsKonLists;
            for (var conNum in conList) {
                conList[carNum].cimSmgsDocses9={};
            }
        }
    },
    onCopyInPack:function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
		  	return false;
		}
	  	var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(list.xtype),
            initObj = function(prefix, data){
                var initObj = {task:'copy'};
                initObj[prefix + '.hid'] = data.hid;
                initObj[prefix + '.route.hid'] = data.routeId;
                initObj[prefix + '.packDoc.hid'] = data.packId;
                return initObj;
            },
            form;
        form = this.getCenter().add({xtype:doc.alias, title:this.titleCopy+doc.descr, closable:false});
        form.initServiceFields(initObj(doc.prefix, data));
//        this.getController(Ext.String.capitalize(doc.alias)).initEvents(form);
        this.findController(doc.alias).initEvents(form);
        form.on('activate', this.onActivateForm, this);
        this.getCenter().setActiveTab(form);
    },
    // generates parames to send to backend
    initDelRstrObj: function(prefix, list,operation)
    {
        var initObj = {task:operation},data= {packId:'',hid:''},
        sel_data = list.selModel.getSelection();
        Ext.Array.each(list.selModel.getSelection(), function (item) {

            if(data.packId.length>0)
                data.packId+=',';
            data.packId+=item.data.packId;

            if(data.hid.length>0)
                data.hid+=',';
            data.hid+=item.data.hid;
        });
        if(sel_data.length>1)
        {
            initObj['query'] = data.packId;
            initObj['query1'] = data.hid;
        }
        else
        {
            initObj[prefix + '.packDoc.hid'] = data.packId;
            initObj[prefix + '.hid'] = data.hid;
        }
        return initObj;
    },
    // delete records
    onDelete: function(btn){
        var list = btn.up('grid');
  		if(!TK.Utils.isRowSelected(list)){
  			return;
  		}
  		var doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
		Ext.Msg.show({title:this.delTitle, msg: this.delMsg+'('+list.selModel.getSelection().length+')', buttons: Ext.Msg.YESNO,
		    closable: false, icon: Ext.Msg.QUESTION, scope: this,
		    fn: function(buttonId) {
		    //delete confirmation
				if(buttonId === 'yes')
			    {
			        Ext.Ajax.request({
				    	url: Ext.String.capitalize(doc.prefix) + '_delete.do',
				        params: this.initDelRstrObj(doc.prefix, list,'delete'),
				        scope: list,
				        success: function(response, options) {
				            this.store.load();
				        },
				        failure: function(response){
				            TK.Utils.makeErrMsg(response, 'Error...');
				        }
			        });
			    }
		    }
		});
    },
    onDestroy: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'destroy'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes')
                {
                    Ext.Ajax.request({
                        url: Ext.String.capitalize(doc.prefix) + '_destroy.do',
                        params: initObj(doc.prefix, data),
                        scope: list,
                        success: function(response, options) {
                            // var text = Ext.decode(response.responseText);
                            this.getStore().reload();
                        },
                        failure: function(response){
                            TK.Utils.makeErrMsg(response, 'Error...');
                        }
                    });
                }
            }
        });
    },
    onRestore: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
        // var data = list.selModel.getLastSelected().data,
        //     doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
        //     initObj = function(prefix, data){
        //         var initObj = {task:'restore'};
        //         initObj[prefix + '.packDoc.hid'] = data.packId;
        //         initObj[prefix + '.hid'] = data.hid;
        //         return initObj;
        //     };
        Ext.Ajax.request({
            url: Ext.String.capitalize(doc.prefix) + '_restore.do',
            // params: initObj(doc.prefix, data),
            params: this.initDelRstrObj(doc.prefix, list,'restore'),
            scope: list,
            success: function(response, options) {
                // var text = Ext.decode(response.responseText);
                this.getStore().reload();
            },
            failure: function(response){
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    onRestoreInPack: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'restoreInPack'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };

        Ext.Ajax.request({
            url: Ext.String.capitalize(doc.prefix) + '_restore.do',
            params: initObj(doc.prefix, data),
            scope: list,
            success: function(response, options) {
                // var text = Ext.decode(response.responseText);
                this.getStore().reload();
            },
            failure: function(response){
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    onDeleteInPack:function(btn){
        var list = btn.up('grid');
  		if(!TK.Utils.isRowSelected(list)){
  			return;
  		}
  		var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(list.xtype) || tkUser.docs.getByKey(list.ownerCt.xtype),  // for graph panels
            initObj = function(prefix, data){
                var initObj = {task:'deleteInPack'};
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
		Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
		    closable: false, icon: Ext.Msg.QUESTION, scope: this,
		    fn: function(buttonId) {
				if(buttonId === 'yes')
			    {
			        Ext.Ajax.request({
				    	url: Ext.String.capitalize(doc.prefix) + '_delete.do',
				        params: initObj(doc.prefix, data),
				        scope: this,
				        success: function(response) {
				            list.store.load();
                            var forms = this.getCenter().query(doc.alias);
                            for(var i = 0; i < forms.length; i++){
                                var field = forms[i].getForm().findField(doc.prefix+'.hid');
                                if(field.getValue() == data.hid){
                                    this.getCenter().remove(forms[i], true);
                                    break;
                                }
                            }
				        },
				        failure: function(response){
				            TK.Utils.makeErrMsg(response, 'Error...');
				        }
			        });
			    }
		    }
		});
    },
    onDestroyInPack:function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(list.xtype) || tkUser.docs.getByKey(list.ownerCt.xtype),  // for graph panels
            initObj = function(prefix, data){
                var initObj = {task:'destroyInPack'};
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId === 'yes')
                {
                    Ext.Ajax.request({
                        url: Ext.String.capitalize(doc.prefix) + '_destroy.do',
                        params: initObj(doc.prefix, data),
                        scope: this,
                        success: function(response) {
                            list.getStore().reload();
                            var forms = this.getCenter().query(doc.alias);
                            for(var i = 0; i < forms.length; i++){
                                var field = forms[i].getForm().findField(doc.prefix+'.hid');
                                if(field.getValue() === data.hid){
                                    this.getCenter().remove(forms[i], true);
                                    break;
                                }
                            }
                        },
                        failure: function(response){
                            TK.Utils.makeErrMsg(response, 'Error...');
                        }
                    });
                }
            }
        });
    },
   /* doPrintGU: function(doc, datas){
        var data = {};
        data.hid = datas.hid || datas[doc.prefix+'.hid'];
        data.type = datas.type || datas[doc.prefix+'.type'];
        Ext.create('Ext.window.Window',{
            title: this.titletPrint,
            width: 280,
            autoShow: true,
            items:{
                xtype:'form',
                bodyPadding: 5,
                items:{
                    xtype: 'checkboxgroup',
                    fieldLabel: this.lableSettings,
                    vertical: true,
                    columns: 1,
                    allowBlank: false,
                    items: [
                        {boxLabel: this.lableFace, name: 'print.page1', inputValue: true},
                        {boxLabel: this.lableBack, name: 'print.page1Back', inputValue: true}
                    ]
                }
            },
            dockedItems: [{
                xtype: 'toolbar',
                dock: 'bottom',
                items: ['->','-',{
                    text: this.btnPrint,
                    handler: function(btn){
                        var panel = btn.up('window').down('form');
                        if(panel.getForm().isValid()){
                            *//*window.open(
                                Ext.String.capitalize(doc.prefix) + '_view.do?status=17&'+
                                    doc.prefix+'.hid=' + data.hid +
                                    '&task=' + doc.name +
                                    (data.type ? '&search.type='+data.type : '') +
                                    '&' + Ext.Object.toQueryString(panel.getComponent(0).getValue()),
                                'DOC'+Math.ceil(100000*Math.random()),''
                            );*//*

                            window.open(
                                'Pdf.do?status=17&'+
                                    doc.prefix+'.hid=' + data.hid +
                                    '&task=' + doc.name +
                                    (data.type ? '&search.type='+data.type : '') +
                                    '&' + Ext.Object.toQueryString(panel.getComponent(0).getValue()) +
                                    '&doc.hid=' + doc.hid + '&route.hid=' + (datas.routeId ? datas.routeId : datas[doc.prefix+'.route.hid']),
                                '_blank',''
                            );
                        } else {
                            TK.Utils.failureDataMsg();
                        }
                    }
                },'-',{
                    text: this.btnClose,
                    handler: function(btn){
                        btn.up('window').close();
                    }
                }]
            }]
        });
    },*/
    /*doPrint: function(doc, datas){    // 4 Invoices Print through JSP
        var data = {};
        data.hid = datas.hid || datas[doc.prefix+'.hid'];
        data.type = datas.type || datas[doc.prefix+'.type'];
        window.open(
            Ext.String.capitalize(doc.prefix) + '_view.do?status=17&'+
            doc.prefix+'.hid=' + data.hid + '&task=' + doc.name + (data.type ? '&search.type='+data.type : '') ,
            '_blank',''
        );
    },*/
    /*onPrint: function(btn){
        var list = btn.up('grid');
    	if(TK.Utils.isRowSelected(list))
      	{
        	var data = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
              this.getController('Docs').doPrint(doc, data);
      	}
    },*/
    /*doPrint1: function(doc, datas){
        Ext.Ajax.request({
            url: 'PrintTemplates_printWinParams.do',
            params: {
                'doc.hid': datas['docId'],
                'route.hid': datas['routeId']
            },
            success: function(response, options) {
                var winParams = Ext.decode(response.responseText),
                    pagesArr = winParams['pages'],
                    nBlanks = winParams['nBlanks'],
//                    data = {},
                    pdfParams = {};
//                data.hid = datas.hid || datas[doc.prefix+'.hid'];
//                data.type = datas.type || datas[doc.prefix+'.type'];
                pdfParams['status'] = 17;
                pdfParams[doc.prefix+'.hid'] = datas[doc.prefix+'.hid'];
                pdfParams['task'] = datas['task'];
                if(datas['search.type']){
                    pdfParams['search.type'] = datas['search.type'];
                }
                pdfParams['doc.hid'] = datas['docId'];
                pdfParams['route.hid'] = datas['routeId'];

                if(pagesArr.length == 1 && nBlanks == 0){
                    window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
                } else {
                    var formItems = new Array(),
                        isEven = function(num) {return (num%2)==0;};
                    if(pagesArr.length > 1){
                        var checkboxItems = new Array(pagesArr.length);
                        for(var i = 0; i < pagesArr.length; i++){
                            checkboxItems.push({boxLabel: 'Страница ' + pagesArr[i] + (isEven(pagesArr[i]) ? '(оборот)' : ''), name: 'print.pages', inputValue: pagesArr[i]});
                        }
                        formItems.push({
                            xtype: 'checkboxgroup',
                            fieldLabel: 'Страницы на печать',
                            vertical: true,
                            columns: 1,
                            allowBlank: false,
                            cls: 'x-check-group-alt',
                            items: checkboxItems
                        });
                    }
                    if(nBlanks > 0){
                        formItems.push({xtype:'checkbox', boxLabel:'С бланком?', name:'print.useBlanks', inputValue:true, uncheckedValue:false});
                    }
                    Ext.create('Ext.window.Window',{
                        title: 'Настройка печати',
                        width: 280,
                        autoShow: true,
                        modal:true,
                        items:{
                            xtype:'form',
                            bodyPadding: 5,
                            items:formItems
                        },
                        dockedItems: [{
                            xtype: 'toolbar',
                            dock: 'bottom',
                            items: ['->','-',{
                                text: 'Печать',
                                handler: function(btn){
                                    var panel = btn.up('window').down('form');
                                    if(panel.getForm().isValid()){
                                        Ext.apply(pdfParams, panel.getValues());
                                        window.open('Pdf.do?' + Ext.Object.toQueryString(pdfParams),'_blank','');
                                    } else {
                                        TK.Utils.failureDataMsg();
                                    }
                                }
                            }]
                        }]
                    });
                }
            },
            failure: function(response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },*/
    /*onPrint1: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var datas = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
                params = {};

            params['docId'] = doc['hid'];
            params['routeId'] = datas['routeId'] || datas[doc.prefix+'.route.hid'];
            params['search.type'] = datas['type'] || datas[doc.prefix+'.type'];
            params[doc.prefix+'.hid'] = datas['hid'] || datas[doc.prefix+'.hid'];
            params['task'] = doc['name'];

            this.doPrint1(doc, params);
        }
    },*/
    onFilter: function(btn){
        var grid = btn.up('gridpanel'),
//            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            win = Ext.create('Ext.window.Window',{
                title: this.titletStat,
                width: 350,
                y:1,
                layout:'fit',
	            items: {
		            xtype:'stat',
	                store:grid.getStore(),
                    grid:grid,
		            scope: (btn.itemId && btn.itemId == 'global' ? 'global' : 'local')
	            }

            });

        win.show();
	    this.getController('Stat').initEvents(win.getComponent(0));
    },
    onReport: function(btn){
        var store = btn.up('gridpanel').store,
            routeId = this.getMenutree().lastSelectedLeaf.id.split('_')[2],
            win = Ext.create('Ext.window.Window',{
                title: this.titleReports,
                width: 300,
                layout:'fit',
                items: {
                    xtype:'form',
                    labelAlign:'top',
                    bodyPadding: 5,
                    border: false,
                    autoHeight:true,
                    defaults:{anchor:'100%', xtype:'textfield'},
                    items: [
                        {xtype:'hidden', name:'search.type', value:'2'},
                        {xtype:'hidden', name:'search.routeId', value:routeId},
                        {
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
                                    {xtype:'datefield',name:'search.date1', width:80},
                                    {xtype:'timefield', format:'H:i', increment:5, name:'search.date11', width:70}
                                ]
                            },{
                                xtype: 'fieldcontainer',
                                fieldLabel: this.lableDate2,
                                combineErrors: false,
                                defaults: {
                                    hideLabel: true
                                },
                                items:[
                                    {xtype:'datefield',name:'search.date2', width:80},
                                    {xtype:'timefield', format:'H:i', increment:5, name:'search.date21', width:70}
                                ]
                            }]
                        },
                        {xtype:'textfield', fieldLabel:this.lableTraneNum, name: 'search.npoezd', maxLength:32}
                    ],
                    dockedItems: [{
                        xtype: 'toolbar',
                        dock: 'bottom',
                        items: ['->','-',{
                            text: 'Excel',
                            handler: function(btn){
                                var params = store.proxy.extraParams;
                                window.open('Report_viewReport.do?' +
                                    this.up('form').getForm().getValues(true),
                                    '_self','');
                            }
                        },'-',{
                            text: this.btnClose,
                            handler: function(btn){
                                this.up('window').close();
                            }
                        }]
                    }]
                }
            }),
            form = win.getComponent(0);

        win.show();
    },
    onHistory:function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data,
            lang = this.getLangCombo().getValue();

        var columns = [
            {text: this.headerData, dataIndex: 'datBegin', sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: TK.Utils.renderLongStr},
            {text: this.headerWho, dataIndex: 'user', sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
        ];

        switch(lang) {
            case 'de':
                columns.splice(1, 0, {text: this.headerMsg, dataIndex: 'statusDe', flex:1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false});
                break;
            default:
                columns.splice(1, 0, {text: this.headerMsg, dataIndex: 'status', flex:1, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false});
        }

        Ext.create('Ext.window.Window', {
            title: this.titleHistory,
            height: 500,
            width: 500,
            layout: 'fit',
            y:0,
            items: {
                xtype: 'grid',
                border: false,
                viewConfig: {
                    stripeRows: true,
                    singleSelect:true
                },
                columnLines: true,
                columns: columns,
                store: Ext.create('Ext.data.Store', {
                    fields:['hid', 'datBegin', 'status', 'user', 'statusDe'],
                    autoLoad:true,
                    proxy: {
                        type: 'ajax',
                        url: 'Status_history.do',
                        extraParams: {'search.hid': data.hid,'search.docType': data.src},
                        reader: {
                            type: 'json',
                            root: 'rows',
                            idProperty: 'hid'
                        },
                        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                    }
                })
            }
        }).show();
    },
    onUpload: function(btn){
       this.uploadAviso(btn, 'File_uploadAviso.do');
    },
    onUploadDB: function(btn){
        this.uploadAviso(btn, 'File_uploadAvisoDB.do');
    },
    uploadAviso: function(btn, url){
        var menuItem    = this.getMenutree().lastSelectedLeaf,
            routeId     = menuItem.id.split('_')[2],
            avisoType   = menuItem.id.split('_')[3],
            doc = tkUser.docs.get(avisoType),
            grid        = btn.up('grid');
        var win = Ext.create('Ext.window.Window', {
            title: this.titleUpload,
            width: 600, y:1, modal:true,
            layout: 'fit',
            items: {
                xtype:'form',
                autoHeight:true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {xtype: 'filefield',emptyText: this.labelSelectFile,fieldLabel: this.labelFile,name: 'upload',buttonText: this.btnSearch,anchor: '100%'},
                    {xtype: 'hidden', name:'search.routeId', value: routeId},
                    {xtype: 'hidden', name:'search.docId', value: doc['hid']},
                    {xtype: 'hidden', name:'search.type', value: doc['type']},
                    {xtype: 'hidden', name:'status', value: 2}
                ],
                buttons: [{
                    text: this.btnSave,
                    handler: function(btn) {
                        var form = btn.up('form').getForm();
                        if(form.isValid()){
                            form.submit({
                                url: url,
                                waitMsg: this.waitMsg,
                                scope: this,
                                success: function(form, action) {
                                    form.reset();
                                    grid.store.load();
                                }
                                ,failure: function(form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope:this
                }, {
                    text: this.btnClose,
                    handler: function(btn){btn.up('window').close();}
                }]
            }
        }).show();
    },
    onUploadGU: function(btn){
        var menuItem    = this.getMenutree().lastSelectedLeaf,
            routeId     = menuItem.id.split('_')[2],
            avisoType   = menuItem.id.split('_')[3],
            doc = tkUser.docs.get(avisoType),
            grid        = btn.up('grid');

            Ext.create('Ext.window.Window', {
            title: this.titleUpload,
            width: 600, y:1, modal:true,
            layout: 'fit',
            items: {
                xtype:'form',
                autoHeight:true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {xtype:'radiogroup',fieldLabel:this.labelGU,width:270,allowBlank:false,
                        items: [
                            { boxLabel: this.labelGU29, name: 'search.kod', inputValue: 4},
                            { boxLabel: this.labelGU27, name: 'search.kod', inputValue: 8}
                        ]
                    },
                    {xtype: 'filefield',emptyText: this.labelSelectFile,fieldLabel: this.labelFile,name: 'upload',buttonText: this.btnSearch,anchor: '100%',allowBlank:false},
                    {xtype: 'hidden', name:'search.routeId', value: routeId},
                    {xtype: 'hidden', name:'search.docId', value: doc['hid']},
                    {xtype: 'hidden', name:'search.type', value: doc['type']},
                    {xtype: 'hidden', name:'status', value: 2}
                ],
                buttons: [{
                    text: this.btnSave,
                    handler: function(btn) {
                        var form = btn.up('form').getForm();
                        if(form.isValid()){
                            form.submit({
                                url: 'File_uploadAviso.do',
                                waitMsg: this.waitMsg,
                                scope: this,
                                success: function(form, action) {
                                    form.reset();
                                    grid.store.load();
                                }
                                ,failure: function(form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope:this
                }, {
                    text: this.btnClose,
                    handler: function(btn){btn.up('window').close();}
                }]
            }
        }).show();
    },
    setPackHids:function(hid){

         for(var i = 0; i < this.getCenter().items.getCount(); i++){
            var cmp =   this.getCenter().getComponent(i),
                field,
                doc =   tkUser.docs.getByKey(cmp.xtype) ||
                        tkUser.docs.getByKey(cmp.xtype+'list');
            if(cmp.isXType('form')) {   // form
                field = cmp.getForm().findField(doc.prefix+'.packDoc.hid') /*|| cmp.getForm().findField(doc.prefix+'.hid')*/;  // last 4 epd
                if(field) // on doc.prefix=ved FIX
                field.setRawValue(hid);
            } else if(cmp.isXType('grid')){  // invoices
                cmp.store.proxy.extraParams['search.packId'] = hid;
            } else if(cmp.isXType('panel')){  // files
                var forms = cmp.query('form') || [],
                    grids = cmp.query('grid') || [];
                for(var y = 0; y < forms.length; y++){
                    if(field = forms[y].getForm().findField(doc.prefix+'.packDoc.hid')){
                        field.setRawValue(hid);
                    }
                }
                for(y = 0; y < grids.length; y++){
                    if('search.packId' in grids[y].store.proxy.extraParams){
                        grids[y].store.proxy.extraParams['search.packId'] = hid;
                    }
                }
            }
         }
    },
    // сохранение документа
    onSave:function(btn){
        var panel = btn.up('form'),
            doc =   tkUser.docs.getByKey(panel.xtype) ||
                    tkUser.docs.getByKey(panel.xtype+'list') || // invoices
                    tkUser.docs.getByKey(panel.ownerCt.xtype),  // files
            buildStatus = function(){
                var form = panel.getForm(),
                    statusFid = form.findField('status');

                if(!form.findField(doc.prefix+'.hid').getValue()){
                    statusFid.setRawValue(1);
                } else {
                    statusFid.setRawValue(13);
                }
            };


        if(panel.getForm().isValid() && panel.isGridDataValid()){
            buildStatus();

            var params = panel.prepareGridData4Save ? panel.prepareGridData4Save() : {};
            // if(panel.prepareData4Save) {
            panel.fireEvent('prepareData4RemoteSave', panel, params);
            // }

            panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: params,
	            scope:this,
			    success: function(form, action) {
                    if(form.findField(doc.prefix+'.packDoc.hid')) {
                        if(!form.findField(doc.prefix+'.packDoc.hid').getValue()){
                            this.setPackHids(action.result.hid[doc.prefix+'.packDoc.hid']);
                        }
                    } /*else if(!form.findField(doc.prefix+'.hid').getValue()){// 4 epd  packDoc.hid == hid
                        this.setPackHids(action.result.hid[doc.prefix+'.hid']);
                    }*/

                    panel.initServiceFields(action.result.hid, true, action.result.doc);
                    if(form.findField('task') /*&& form.findField('task').getValue() == 'copy'*/){
                        form.findField('task').setRawValue('edit');
                    }
                    if(panel.doStatus) panel.doStatus();
                    // if panel child of list doc type
                    var list= this.getCenter().child(panel.xtype+'list');
                    if(list){
                        list.on('activate', this.onActivateList, this);
                    }

                    // activate epd if saved doc is not epd
                    var docTypeHidField = form.findField(doc.prefix+'.docType1'),
                        epdTypeHid = 0;
                    if(docTypeHidField && docTypeHidField.getValue() != epdTypeHid){  // doc is not epd
                        var epdTab = this.findDocInPackByFieldValue('form', 'smgs.docType1', epdTypeHid);
                        if(epdTab && !epdTab.hasListener('activate')){
                            epdTab.on('activate', this.onActivateForm, this);
                        }
                    }
			    },
			    failure: panel.failureAlert
			});
		} else {
    		TK.Utils.failureDataMsg();
    	}
    },
    onSaveExit:function(btn){
        var panel = btn.up('form'),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list'),
            buildStatus = function(){
                var form = panel.getForm(),
                    statusFid = form.findField('status');

                if(!form.findField(doc.prefix+'.hid').getValue()){
                    statusFid.setRawValue(1);
                } else {
                    statusFid.setRawValue(13);
                }
            };
    	if(panel.getForm().isValid() && panel.isGridDataValid()){
            buildStatus();

            var params = panel.prepareGridData4Save ? panel.prepareGridData4Save() : {};
            // if(panel.prepareData4Save) {
            panel.fireEvent('prepareData4RemoteSave', panel, params);
            // }

            panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: params,
	            scope:this,
			    success: function(form, action) {
                    this.onExit(btn);
			    },
			    failure: this.failureAlert
			});
		}else {
    		TK.Utils.failureDataMsg();
    	}
    },
    onSavePDF:function(btn){
        var panel = btn.up('form'),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list'),
            controller,
            buildStatus = function(){
                var form = panel.getForm(),
                    statusFid = form.findField('status');

                if(!form.findField(doc.prefix+'.hid').getValue()){
                    statusFid.setRawValue(1);
                } else {
                    statusFid.setRawValue(13);
                }
            };
        if(panel.getForm().isValid() && panel.isGridDataValid()){
            buildStatus();

            var params = panel.prepareGridData4Save ? panel.prepareGridData4Save() : {};
            // if(panel.prepareData4Save) {
            panel.fireEvent('prepareData4RemoteSave', panel, params);
            // }
            //

            panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: params,
	            scope:this,
			    success: function(form, action) {
                    if(form.findField(doc.prefix+'.packDoc.hid')) {
                        if(!form.findField(doc.prefix+'.packDoc.hid').getValue()){
                            this.setPackHids(action.result.hid[doc.prefix+'.packDoc.hid']);
                        }
                    } /*else if(!form.findField(doc.prefix+'.hid').getValue()){// 4 epd  packDoc.hid == hid
                        this.setPackHids(action.result.hid[doc.prefix+'.hid']);
                    }*/

                    panel.initServiceFields(action.result.hid, true, action.result.doc);
                    if(form.findField('task') /*&& form.findField('task').getValue() == 'copy'*/){
                        form.findField('task').setRawValue('edit');
                    }
                    if(panel.doStatus) panel.doStatus();
                    // if panel child of list doc type
                    var list= this.getCenter().child(panel.xtype+'list');
                    if(list){
                        list.on('activate', this.onActivateList, this);
                    }

                    // activate epd if saved doc is not epd
                    var docTypeHidField = form.findField(doc.prefix+'.docType1'),
                        epdTypeHid = 0;
                    if(docTypeHidField && docTypeHidField.getValue() != epdTypeHid){  // doc is not epd
                        var epdTab = this.findDocInPackByFieldValue('form', 'smgs.docType1', epdTypeHid);
                        if(epdTab && !epdTab.hasListener('activate')){
                            epdTab.on('activate', this.onActivateForm, this);
                        }
                    }

                    var params = {};
                    params['docId'] = doc['hid'];
                    // smgs hid
                    params['query'] = form.findField('smgs.hid').getValue();

                    params['routeId'] = form.findField(doc.prefix+'.route.hid').getValue();
                    params['search.type'] = form.findField(doc.prefix+'.type') ? form.findField(doc.prefix+'.type').getValue() : '';
                    params[doc.prefix+'.hid'] = form.findField(doc.prefix+'.hid').getValue();
                    params['task'] = doc['name'];

//                    this.doPrint1(doc, params);
//                    controller = this.getController(Ext.String.capitalize(doc.alias));
                    controller = this.findController(doc.alias);
                    controller.onPrint ? this.doPrint(doc, params) : this.doPrint1(doc, params);

			    },
			    failure: this.failureAlert
			});
		} else {
    		TK.Utils.failureDataMsg();
    	}
    },
    onExit:function(btn){
	    var menu = this.getMenutree(),
            node = menu.lastSelectedLeaf;

        menu.selModel.select(node, false, true);
        menu.fireEvent('itemclick', menu.view, node);


    },
    onAgreed:function(btn){
        var formpanel = btn.up('form'),
            form = formpanel.getForm(),
            statusDir = function(){
                switch(btn.itemId){
                    case 'forAgree':
                        return 3;
                    case 'agreed':
                        return 4;
                    case 'notAgreed':
                        return 6;
                }
            },
            paramsObj = {
                'status1.hidCs':   form.findField('smgs.hid').getValue(),
                'status1.statusDir.hid': statusDir(),
                'status1.packDoc.hid':   form.findField('smgs.packDoc.hid').getValue(),
                'status1.docDir.hid':    form.findField('smgs.docType1').getValue()
            };
        this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');
        Ext.Ajax.request({
            url: 'Status_agreed.do',
            params: paramsObj,
            scope:this,
            success: function (response, options) {
                form.findField('smgs.status').setRawValue(statusDir());
                formpanel.doStatus();
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
	unText: function(un){
	    var me = this;
        var win = new Ext.Window({
            title: un,
            width: 400,
//            height: 500,
            y: 1,
            modal: true,
            autoHeight: true,
//            maximizable: true,
//            bodyStyle: 'word-wrap: break-word;white-space: pre;',
            /*autoLoad: {
                url: "User_unText.do",
                params: {
                    "search.un": un
                },
                callback: function (el, success, response) {
                    if (!success) {
	                    TK.Utils.makeErrMsg(response, me.errorMsg);
                    }
                }
            },*/
	        items:{
		        xtype:'form',
		        plain: true,
                border: 0,
                bodyPadding: 5,
		        layout: {
                    type: 'vbox',
			        align: 'stretch'
                },
		        defaults:{
			        xtype: 'textfield',
			        readOnly:true,
			        labelWidth: 55
		        },
		        items: [{
	                fieldLabel: me.labelUn,
	                name: 'un'
	            }, {
	                fieldLabel: me.labelUnName,
	                name: 'name'
	            },{
                    fieldLabel: me.labelUnEmail,
                    name: 'email'
                },{
                    fieldLabel: me.labelUnGroup,
                    name: 'group'
                }]
	        }
        });
        win.show();
		win.getComponent(0).getForm().load({
		    url: 'User_unText.do',
		    params: {
			    "search.un": un
		    },
		    failure: function(form, action) {
			    TK.Utils.makeErrMsg('Error', me.errorMsg);
		    }
		});
    },
    /*onBindUnPrintTempl: function(btn){
        var model = btn.up('grid').store.first(),
            store = Ext.create('Ext.data.Store', {
                pageSize: 10,
                fields:['name', 'hid', 'docId', {name: 'selected', type: 'boolean'}],
                proxy: {
                    type: 'ajax',
                    url: 'PrintTemplates_templs_view.do',
                    reader: {
                        type: 'json',
                        root: 'rows',
                        totalProperty: 'total'
                    },
                    extraParams: {
                        'search.docType': model.get('src'),
                        'search.routeId': model.get('routeId')
                    },
                    listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                }
            }),
            win =  Ext.widget('window', {
                title: 'Привязать шаблон печати',
                y:1,
                modal:true,
                layout: 'fit',
                autoShow: true,
                width:500, height:500,
                maximizable:true,
                items: {
                    xtype:'grid',
                    selModel:Ext.create('Ext.selection.CheckboxModel',{
                        mode:'SINGLE',
                        showHeaderCheckbox: false,
                        allowDeselect:true
                    }),
                    enableColumnHide:false,
                    enableColumnMove:false,
                    sortableColumns:false,
                    columnLines: true,
                    viewConfig: {
                        stripeRows: true,
                        singleSelect:true
                    },
                    store: store,
                    columns: [
                        {text:'Наименование', dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
                    ],
                    dockedItems: [{
                        dock: 'bottom',
                        xtype: 'pagingtoolbar',
                        store: store,
                        displayInfo: true
                    }],
                    listeners:{
                        render: function(grid){
                            grid.store.load(function(records) {
                                if(grid.store.getCount() > 0){
                                    var rec;
                                    Ext.Object.each(records, function(key, record) {
                                        if (record.get('selected')) {
                                            rec = record;
                                            return false;
                                        }
                                    });
                                    if(rec){
                                        grid.selModel.select(rec);
                                    }
                                }
                            });
                        }
                    }
                },
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items: [
                        '->',
                        '-', {
                            text: 'Привязать',
                            handler: function(btn) {
                                var grid = win.getComponent(0),
                                    params = {
                                        'search.routeId': model.get('routeId'),
                                        'search.docId': model.get('src')
                                    };
                                if(grid.selModel.getSelection().length > 0){
                                    params['hid'] =  grid.selModel.getSelection()[0].get('hid');
                                }
                                *//*if (grid.selModel.getCount() == 0) {
                                    Ext.Msg.show({
                                        title: 'Предупреждение',
                                        msg: 'Следует выбрать строку из таблицы с данными',
                                        buttons: Ext.MessageBox.OK,
                                        icon: Ext.MessageBox.WARNING
                                    });
                                    return false;
                                } else {*//*

                                    Ext.Ajax.request({
                                        url: 'PrintTemplates_bindUnRoutes.do',
                                        params: params,
                                        scope:this,
                                        success: function (response, options) {
                                            win.close();
                                        },
                                        failure: function (response, options) {
                                            TK.Utils.makeErrMsg(response, this.errorMsg);
                                        }
                                    });
//                                }
                            }
                        },
                        '-', {
                            text: this.btnClose,
                            handler: function() {
                                win.close();
                            }
                        }
                    ]
                }]
            });
//            store.load();
    }*/
    onComments:function(btn){
        var formpanel = btn.up('form'),
            gridModel =
                Ext.ModelManager.getModel('Comments') ||
                Ext.define('Comments', {
                    extend: 'Ext.data.Model',
                    fields: [
                        'dattr','un','comment','fieldName','fieldPath','fieldDescr',
                        {name:'hid', type:'int'}
                    ],
                    validations: [
                        {type: 'presence',  field: 'fieldDescr'},
                        {type: 'presence',  field: 'comment'}
                    ]
                }),
            gridStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                pageSize: 20,
                model: gridModel,
                proxy: {
                    type: 'ajax',
                    url: 'Fields_listComments.do',
                    reader: {
                        type: 'json',
                        root: 'rows',
                        idProperty: 'hid'
                    },
                    listeners: {exception: function(proxy, response) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                }
            }),
            comboFieldsStore = Ext.create('Ext.data.Store', {
                autoDestroy: true,
                fields: [
                    'name','descr',
                    {name:'hid', type:'int'}
                ],
                proxy: {
                    type: 'ajax',
                    url: 'Fields_listFields.do',
                    reader: {
                        type: 'json',
                        root: 'rows',
                        idProperty: 'hid'
                    },
                    listeners: {exception: function(proxy, response) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                }
            }),
            renderFieledDescr = function(value, meta){
                comboFieldsStore.each(function(record){
                    if(record.get('hid') === value){
                        value = record.get('descr');
                        return false;
                    }
                });
                meta.style = 'white-space:normal;';
                return value;
            },
            win =  Ext.widget('window', {
                title: 'Замечания',
                y:1,
                modal:true,
                layout: 'fit',
                autoShow: true,
                width:700, height:500,
                maximizable:true,
                items: {
                    xtype:'grid',
                    enableColumnHide:false,
                    enableColumnMove:false,
                    sortableColumns:false,
                    columnLines: true,
                    viewConfig: {
                        stripeRows: true,
                        singleSelect:true
                    },
                    store: gridStore,
                    columns: [
                        {header: 'Кто?',  dataIndex: 'un', width: 60},
                        {header: 'Когда?',  dataIndex: 'dattr', width:80, renderer: TK.Utils.renderLongStr},
                        {header: 'Поле',  dataIndex: 'fieldDescr', flex:1, renderer: renderFieledDescr,
                            editor: {
                                xtype:'combo',
                                store: comboFieldsStore,
                                displayField: 'descr',
                                valueField: 'hid',
                                forceSelection:true,
                                typeAhead:true,
                                queryMode:'local',
                                allowBlank:false
                            }
                        },
                        {header: 'Замечание',  dataIndex: 'comment', editor: {xtype:'textfield', allowBlank:false, maxLength:200}, flex:2, renderer: TK.Utils.renderLongStr},
                        {
                            xtype: 'actioncolumn',
                            width:50,
                            items: [{
                                icon: './resources/images/save.gif',
                                tooltip: 'Сохранить',
//                                getClass: Ext.bind(formpanel.onGetClass4CommentsGridBtns, formpanel),
                                handler: function(grid, rowIndex, colIndex) {
                                    var store = grid.getStore(),
                                        errors = new Ext.data.Errors();
                                    store.each(function(record){
                                        errors.addAll(record.validate().getRange());
                                    }, this);
                                    if(errors.isValid()){
                                        var rec = grid.getStore().getAt(rowIndex),
                                            form = formpanel.getForm(),
                                            prefix = tkUser.docs.get(this.getMenutree().lastSelectedLeaf.data['id'].split('_')[3])['prefix'],
                                            params = {
                                                'fieldComments.hid':rec.get('hid') ? rec.get('hid') : '', // convert 0 to '' for new records
                                                'fieldComments.comments':rec.get('comment'),
                                                'fieldComments.fieldsDir.hid':rec.get('fieldDescr'),
                                                'fieldComments.packDoc.hid':form.findField(prefix + '.packDoc.hid').getValue(),
                                                'fieldComments.usr.un':tkUser['un']
                                            };
                                        Ext.Ajax.request({
                                            url: 'Fields_saveComments.do',
                                            params: params,
                                            success: function(response, options) {
                                                grid.store.reload();
                                            },
                                            failure: function(response) {
                                                TK.Utils.makeErrMsg(response, 'Error...');
                                            }
                                        });
                                    } else {
                                        TK.Utils.failureDataMsg();
                                    }
                                },
                                scope:this
                            },
                            {
                                icon: './resources/images/delete.png',
                                tooltip: 'Удалить',
//                                getClass: Ext.bind(formpanel.onGetClass4CommentsGridBtns, formpanel),
                                handler: function(grid, rowIndex, colIndex) {
                                    Ext.Msg.show({title:'Удаление', msg: 'Удалить?', buttons: Ext.Msg.YESNO,
                                        closable: false, icon: Ext.Msg.QUESTION, scope: this,
                                        fn: function(buttonId) {
                                            if(buttonId == 'yes')
                                            {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                if(rec.phantom){
                                                    grid.store.remove(rec);
                                                } else {
                                                    Ext.Ajax.request({
                                                         url: 'Fields_deleteComments.do',
                                                         params: {hid:rec.get('hid')},
                                                         success: function(response, options) {
                                                             grid.store.reload();
                                                         },
                                                         failure: function(response) {
                                                            TK.Utils.makeErrMsg(response, 'Error...');
                                                         }
                                                    });
                                                }

                                            }
                                        }
                                    });
                                }
                            }]
                        }
                    ],
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1,
                            listeners:{
                                beforeedit: Ext.bind(formpanel.onBeforeEdit4CommentsCellEditingPlgn, formpanel)
                            }
                        })
                    ],
                    dockedItems: [{
                        dock: 'top',
                        xtype: 'toolbar',
                        items: [{
                            text: 'Добавить',
                            iconCls:'add1',
                            action:'add',
    //                        scope: win.child('grid'),
                            handler: function(btn){
                                var grid = btn.up('grid'),
                                    rowEditing = grid.plugins[0],
                                    selectedRec = grid.selModel.getSelection()[0],
                                    ind = selectedRec ? grid.store.indexOf(selectedRec) + 1 : grid.store.getCount();
                                rowEditing.cancelEdit();
                                grid.store.insert(ind, {});
                                rowEditing.startEditByPosition({row: ind, column: 0});
                            }
                        }, '-']
                    },{
                        dock: 'bottom',
                        xtype: 'pagingtoolbar',
                        store: gridStore,
                        displayInfo: true
                    }],
                    listeners:{
                        beforerender: function(grid){
                            var form = formpanel.getForm(),
                                prefix = tkUser.docs.get(this.getMenutree().lastSelectedLeaf.data['id'].split('_')[3])['prefix'];
                            formpanel.onBeforeRender4CommentsGrid.call(formpanel, grid);
                            gridStore.load({params:{'search.packId':form.findField(prefix + '.packDoc.hid').getValue(), 'search.docId':form.findField(prefix + '.docType1').getValue(), 'search.hid':form.findField(prefix + '.hid').getValue()}});
                            comboFieldsStore.load({params:{'search.docId':form.findField(prefix + '.docType1').getValue()}});
                        },
                        scope: this
                    }
                },
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'toolbar',
                    items: [
                        '->',
                        '-', {
                            text: this.btnClose,
                            handler: function() {
                                win.close();
                            }
                        }
                    ]
                }]
        });
    },
    onAviso2CimSmgs: function (btn) {
       this.aviso2Doc(btn, 10);
    },
    onAviso2Smgs: function(btn){
        // var groupBy = btn.itemId === 'aviso2smgsAppend' ? 4 : 2;
        this.aviso2Doc(btn, 10);
    },
    aviso2Doc: function(btn, groupBy){
        var grid = btn.up('grid'),
            record,
            data,
            params = {};
        if(!TK.Utils.isRowSelected(grid)){
            return;
        }
        record = grid.selModel.getLastSelected();
        data = record.data;

        if(btn.itemId === 'aviso2smgsAppend'){ // add data to smgs, don't create new
            if(data['npoezd']){
                params['search.npoezd'] = data['npoezd'];
                params['groupBy'] = groupBy;
            } else {
                Ext.Msg.show({
                    title: 'Внимание, ошибка!',
                    msg: 'Не задан номер поезда',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return;
            }
        } else {
            params['groupBy'] = groupBy;
        }
        Ext.apply(params, {'search.hid': data['hid'],'search.type': data['type'], 'status': '7', 'search.routeId':data['routeId']});
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Doc2Doc.do',
            params: params,
            scope: this,
            success: function(response, options) {
                this.getCenter().getEl().unmask();
                Ext.Msg.show({
                    title: 'Операция завершена успешно',
                    msg: Ext.decode(response.responseText)['result'],
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function(){
                        grid.getSelectionModel().deselect(record, true);
                        grid.getStore().reload();
                    }
                });
            },
            failure: function(response){
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    onExport2Excel: function(btn){
        var list = btn.up('grid'),
            model,
            me,
            win;
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        me = this;
        model = list.getSelectionModel().getLastSelected();

        win = Ext.widget('window', {
            title: 'Экспорт документа',
            y:1,
            modal:true,
            layout: 'fit',
            autoShow: true,
            autoHeight: true,
            width:500,
//             height:400,
            items: {
                xtype:'form',
                bodyPadding: 5,
                defaults: {
                    anchor: '100%'
                },
                items:[
                    {
                        fieldLabel: 'Получатель, e-mail',
                        xtype:'textfield',
                        name: 'receivers',
                        vtype: 'email',
                        allowBlank: false
                    },{
                        fieldLabel: 'Текст сообщения',
                        xtype:'textarea',
                        name: 'msg',
                        allowBlank: false
                    }
                ]
            },
            dockedItems: [{
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                    '->',
                    '-', {
                        text: 'Отправить по почте',
                        handler: function(btn) {
                            var form = btn.up('window').getComponent(0);
                            if(form.getForm().isValid()){
                                me.getCenter().getEl().mask('Идет формирование файла...');
                                Ext.Ajax.request({
                                    url: 'Report_exportAviso2Excel2Mail.do',
    //                                params: {'status':7},
                                    params: Ext.apply({docId: model.get('src'), hid: model.get('hid'), status:8}, form.getForm().getValues()),
                                    success: function(response) {
                                        me.getCenter().getEl().unmask();
                                        Ext.Msg.show({
                                            title: 'Операция выполнена',
                                            msg: Ext.decode(response.responseText)['msg'],
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO,
                                            fn: function(){
                                                win.close();
                                            }
                                        });
                                    },
                                    failure: function(response){
                                        me.getCenter().getEl().unmask();
                                        TK.Utils.makeErrMsg(response, me.errorMsg);
                                    }
                                });
                            } else {
                                TK.Utils.failureDataMsg();
                            }
                        }
                    },
                    '-', {
                        text: 'Сохранить на диск',
                        handler: function() {
                            win.close();
                            window.open('Report_exportAviso2Excel.do?' +
                                'docId=' + model.get('src') + '&hid=' + model.get('hid') + '&status=5',
                                '_self','');
                            this.runProgressBar4LongOperation();
                        }
                    },
                    '-', {
                        text: this.btnClose,
                        handler: function() {
                            win.close();
                        }
                    }
                ]
            }]
        });
    },
    doc2EpdRewrite: function(btn){
        var panel = btn.up('form'),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list');

        if(panel.getForm().isValid() && panel.isGridDataValid()){

            var params = panel.prepareGridData4Save ? panel.prepareGridData4Save() : {};
            // if(panel.prepareData4Save) {
            panel.fireEvent('prepareData4RemoteSave', panel, params);
            // }

            panel.getForm().submit({
                waitMsg:this.waitMsg1,
                url: Ext.String.capitalize(doc.prefix) + '_doc2EpdRewrite.do',
                params: params,
                scope:this,
                success: function(form, action) {
//                    var epdHid = action['result']['result'];
//                    panel.fireEvent("epd2DocStateDefine", {panel: panel, epdHid: epdHid});

                    if(form.findField(doc.prefix+'.packDoc.hid')) {
                        if(!form.findField(doc.prefix+'.packDoc.hid').getValue()){
                            this.setPackDocHids(action.result.hid[doc.prefix+'.packDoc.hid']);
                        }
                    }

                    var epdTypeHid = 0,
                        epdTab = this.findDocInPackByFieldValue('form', 'smgs.docType1', epdTypeHid);

                    if(epdTab && !epdTab.hasListener('activate')){
                        epdTab.on('activate', this.onActivateForm, this);
                    }

                    Ext.Msg.show({
                        title: 'Внимание',
                        msg: 'Копирование выполнено успешно',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                },
                failure: panel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    //trainSearch диалог поиск поезда по дате
    trainSearch:function()
    {
        var win= Ext.create('TK.view.pogruz.PoezdSelectForm');
        var routeId=Ext.ComponentQuery.query('docslist')[0].getStore().getAt(0).get('routeId');
        var type=Ext.ComponentQuery.query('docslist')[0].getStore().getAt(0).get('type');

        win.routeId=routeId;
        win.type=type;
        win.mode='listsearch';
        win.parentStore=Ext.ComponentQuery.query('docslist')[0].getStore();

        var btn= Ext.ComponentQuery.query('#poezdSeltopTBar > #buttonTrSrch')[0];
        btn.fireHandler();
        win.localStore.load();
        win.show();
    },
    epd2DocRewrite: function(btn){
        var panel = btn.up('form'),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list');

        var params = panel.prepareGridData4Save ? panel.prepareGridData4Save() : {};
        // if(panel.prepareData4Save) {
        panel.fireEvent('prepareData4RemoteSave', panel, params);
        // }

        panel.getForm().submit({
            waitMsg:this.waitMsg1,
            url: Ext.String.capitalize(doc.prefix) + '_epd2DocRewrite.do',
            params: params,
            scope:this,
            success: function(form, action) {
                panel.dataObj = action['result']['doc'];
                panel.initForm(doc.prefix);

                Ext.Msg.show({
                    title: 'Внимание',
                    msg: 'Копирование выполнено успешно',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            },
            failure: panel.failureAlert
        });
    },
    setPackDocHids:function(hid){
        for(var i = 0; i < this.getCenter().items.getCount(); i++){
            var cmp =   this.getCenter().getComponent(i),
                field,
                doc =   tkUser.docs.getByKey(cmp.xtype) ||
                    tkUser.docs.getByKey(cmp.xtype+'list');
            if(cmp.isXType('form')) {   // form
                field = cmp.getForm().findField(doc.prefix+'.packDoc.hid') /*|| cmp.getForm().findField(doc.prefix+'.hid')*/;  // last 4 epd
                field.setRawValue(hid);
            } else if(cmp.isXType('grid')){  // invoices
                cmp.store.proxy.extraParams['search.packId'] = hid;
            } else if(cmp.isXType('panel')){  // files
                var forms = cmp.query('form') || [],
                    grids = cmp.query('grid') || [];
                for(var y = 0; y < forms.length; y++){
                    if(field = forms[y].getForm().findField(doc.prefix+'.packDoc.hid')){
                        field.setRawValue(hid);
                    }
                }
                for(y = 0; y < grids.length; y++){
                    if('search.packId' in grids[y].store.proxy.extraParams){
                        grids[y].store.proxy.extraParams['search.packId'] = hid;
                    }
                }
            }
        }
    },
    findDocInPackByFieldValue: function(xtype, fieldName, value){
        for(var i = 0; i < this.getCenter().items.getCount(); i++){
            var cmp =  this.getCenter().getComponent(i);
            if(cmp.isXType(xtype)){
                var field = cmp.getForm().findField(fieldName);
                if(field && field.getValue() == value){ // found epd
                    return cmp;
                }
            }
        }
        return null;
    },
    showCopySelectedWin:function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        var menuItem = this.getMenutree().lastSelectedLeaf,
            docName = menuItem.id.split('_')[3],
            docsInPack = tkUser.docsInPack(docName, this.docsInRoute(menuItem));

        var docs = docsInPack.filterBy(function(doc){
            return doc['range'] == 'form' || doc['range'] == 'list&form'; // select docs forms and invoices, deselect - files forms (range - panel)
        });

        if(docs.getCount() > 0){
            var store = Ext.data.StoreManager.lookup('docsForCopy');
            if(!store) {
                store = Ext.create('Ext.data.ArrayStore', {
                    storeId: 'docsForCopy',
                    fields: [
                        'hid','descr'
                    ]
                });
            }

            store.loadData(docs.getRange());

            Ext.widget('window', {
                title: this.titleDocsCopy,
                autoShow: true,
                y: 0,
                modal: true,
                layout: 'anchor',
                defaults: {
                    anchor: '100%'
                },
                width: 400,
                items: [{
                    xtype: 'grid',
                    enableColumnHide:false,
                    enableColumnMove:false,
                    enableColumnResize:true,
                    sortableColumns:false,
                    viewConfig: {
                        stripeRows: true,
                        singleSelect:true,
                        emptyText: 'Нет данных'
                    },
                    selType: 'checkboxmodel',
                    columns: {
                        items:[
                            {text:this.headerName, dataIndex:'descr', flex:1}
                        ]
                    },
                    store: store,
                    tbar: [
                        {text: this.btnCopy, iconCls:'copySelected', action:'copySelectedDocs'},'-'
                    ]
                }],
                buttons: [{
                    text: this.btnClose,
                    scope: this,
                    iconCls:'exit',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
            });

        } else {
            Ext.Msg.alert('Предупреждение', 'Список пуст.');
        }

    },
    onCopySelected:function(btn){
        var list = btn.up('grid'),
            selected = list.getSelectionModel().getSelection();

        if(selected.length == 0){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбраны документы',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        list.setLoading(true);
        var selectedHids = [];
        for(var i = 0; i < selected.length; i++){
            selectedHids.push(selected[i].get('hid'));
        }

        var mainList =  this.getCenter().getActiveTab(), // main grids or invoices in package
            doc = mainList.getSelectionModel().getLastSelected();
        Ext.Ajax.request({
            url: 'Smgs_copySelectedDocs.do',
            params: {jsonRequest: Ext.encode(selectedHids), 'search.packId': doc.get('packId'), 'type': doc.get('type')},
            scope: this,
            success: function (response, options) {
                list.setLoading(false);
                list.up('window').close();
                mainList.getStore().reload();
                Ext.Msg.show({
                    title: 'Внимание',
                    msg: 'Копирование выполнено успешно',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            },
            failure: function (response, options) {
                list.setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error!..');
            }
        });
    },
    onPrepareData4RemoteSave: function(formPanel, objData) {

        var vags = formPanel.dataObj[formPanel.getVagCollectionName()],
            data = {};

        if(vags && !Ext.Object.isEmpty(vags)){
            data = this.prepareVags(formPanel, vags);
        }

        Ext.apply(objData, data);
        // return data;
    },

    isContOtpr: function () {
        return this.getController('docs.VgCtGrTreeDetailController').isContOtpr();
    },

    prepareVags: function(formPanel, vags){
        var data = {};
        for(var vagIndx in vags){
            var vag = vags[vagIndx],
                vagPath = formPanel.getPrefix() + '.' + formPanel.getVagCollectionName() + '[' + vagIndx + '].';

            for(var vagPropName in vag){
                if (this.isContOtpr() && vagPropName == formPanel.getContCollectionName()) {
                    var conts = vag[formPanel.getContCollectionName()];
                    if (conts && !Ext.Object.isEmpty(conts)) {
                        var contsData = this.prepareConts(vagPath, formPanel, conts);
                        Ext.apply(data, contsData);
                    }
                } else if(!this.isContOtpr() && vagPropName == formPanel.getDocs9CollectionName()){
                    var docs9 = vag[formPanel.getDocs9CollectionName()];
                    if(docs9 && !Ext.Object.isEmpty(docs9)){
                        var docs9Data = this.prepareDosc9(vagPath, formPanel, docs9);
                        Ext.apply(data, docs9Data);
                    }
                } else if(!this.isContOtpr() && vagPropName == formPanel.getPlombsCollectionName()){
                    var plombs = vag[formPanel.getPlombsCollectionName()];
                    if(plombs && !Ext.Object.isEmpty(plombs)){
                        var plombsData = this.preparePlombs(vagPath, formPanel, plombs);
                        Ext.apply(data, plombsData);
                    }
                } else if(!this.isContOtpr() && vagPropName == formPanel.getGryzCollectionName()){
                    var gryzy = vag[formPanel.getGryzCollectionName()];
                    if(gryzy  && !Ext.Object.isEmpty(gryzy)){
                        var gryzyData = this.prepareGryzy(vagPath, formPanel, gryzy);
                        Ext.apply(data, gryzyData);
                    }
                } else {
                    data[vagPath + vagPropName] = vag[vagPropName];
                }
            }

        }

        return data;
    },

    prepareConts: function(vagPath, formPanel, conts){
        var data = {};

        for(var contIndx in conts){
            var cont = conts[contIndx],
                contPath = vagPath + formPanel.getContCollectionName() + '[' + contIndx + '].';

            for(var contPropName in cont){
                if(contPropName == formPanel.getGryzCollectionName()){
                    var gryzy = cont[formPanel.getGryzCollectionName()];
                    if(gryzy  && !Ext.Object.isEmpty(gryzy)){
                        var gryzyData = this.prepareGryzy(contPath, formPanel, gryzy);
                        Ext.apply(data, gryzyData);
                    }
                } else if(contPropName == formPanel.getDocs9CollectionName()){
                    var docs9 = cont[formPanel.getDocs9CollectionName()];
                    if(docs9 && !Ext.Object.isEmpty(docs9)){
                        var docs9Data = this.prepareDosc9(contPath, formPanel, docs9);
                        Ext.apply(data, docs9Data);
                    }
                } else if(contPropName == formPanel.getPlombsCollectionName()){
                    var plombs = cont[formPanel.getPlombsCollectionName()];
                    if(plombs && !Ext.Object.isEmpty(plombs)){
                        var plombsData = this.preparePlombs(contPath, formPanel, plombs);
                        Ext.apply(data, plombsData);
                    }
                } else {
                    data[contPath + contPropName] = cont[contPropName];
                }
            }
        }
        return data;
    },

    prepareGryzy: function(contPath, formPanel, gryzy){
        var data = {};

        for(var gryzIndx in gryzy){
            var gryz = gryzy[gryzIndx],
                gryzPath = contPath + formPanel.getGryzCollectionName() + '[' + gryzIndx + '].';

            for(var gryzPropName in gryz){
                if(gryzPropName == formPanel.getDanGryzCollectionName()){
                    var danGryzy = gryz[formPanel.getDanGryzCollectionName()];
                    if(danGryzy && !Ext.Object.isEmpty(danGryzy)){
                        var danGryzyData = this.prepareDanGryzy(gryzPath, formPanel, danGryzy);
                        Ext.apply(data, danGryzyData);
                    }
                } else {
                    data[gryzPath + gryzPropName] = gryz[gryzPropName];
                }
            }
        }
        return data;
    },

    prepareDanGryzy: function(gruzPath, formPanel, danGryzy){
        var data = {};

        for(var danGryzIndx in danGryzy){
            var danGryz = danGryzy[danGryzIndx],
                danGryzPath = gruzPath + formPanel.getDanGryzCollectionName() + '[' + danGryzIndx + '].';

            for(var danGryzPropName in danGryz){
                data[danGryzPath + danGryzPropName] = danGryz[danGryzPropName];
            }
        }
        return data;
    },

    prepareDosc9: function(contPath, formPanel, docs9){
        var data = {};

        for(var docs9Indx in docs9){
            var doc9 = docs9[docs9Indx],
                docs9Path = contPath + formPanel.getDocs9CollectionName() + '[' + docs9Indx + '].';

            for(var doc9PropName in doc9){
                data[docs9Path + doc9PropName] = doc9[doc9PropName];
            }
        }
        return data;
    },

    preparePlombs: function(contPath, formPanel, plombs){
        var data = {};

        for(var plombsIndx in plombs){
            var plomb = plombs[plombsIndx],
                plombsPath = contPath + formPanel.getPlombsCollectionName() + '[' + plombsIndx + '].';

            for(var plombsPropName in plomb){
                data[plombsPath + plombsPropName] = plomb[plombsPropName];
            }
        }
        return data;
    },

    onPrepareGridToRender: function (grid) {
        var toolbar = grid.getDockedItems('toolbar[dock="top"]')[0],
            extraParams = grid.getStore().getProxy().extraParams || {},
            showDeleted = extraParams['search.deleted'] === undefined || extraParams['search.deleted'] === null ? 0 : extraParams['search.deleted'];

        toolbar.items.each(function(item) {
            if(item.forPresent === undefined && item.forDeleted === undefined){
                item.forPresent = true;
                item.forDeleted = false;
            }

            var forPresentOnly = item.forPresent && !item.forDeleted,
                forDeleteOnly = item.forDeleted && !item.forPresent,
                forAll = item.forDeleted && item.forPresent;

            if(showDeleted === 0){ // show present docs
                item.setVisible(forPresentOnly || forAll);
            } else {  // show deleted docs
                item.setVisible(forDeleteOnly || forAll);
            }

        })
    },
    dragTabs:function () {
        console.log('drug');
    }
});