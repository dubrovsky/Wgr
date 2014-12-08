Ext.define('TK.controller.Docs', {
    extend: 'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils',
        'TK.controller.print.Print'
    ],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
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
                click: this.onCreate
            },
            'viewport > tabpanel > grid[inPack=false] button[action="edit"]': {
                click: this.onEdit
            },
            'viewport > tabpanel > grid[inPack=false]': {
                itemdblclick: this.onEdit
            },
            'viewport > tabpanel > grid[inPack=false] button[action="copy"]': {
                click: this.onCopy
            },
            'viewport > tabpanel > grid[inPack=false] button[action="del"]': {
                click: this.onDelete
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
                itemdblclick: this.onEditInPack
            },
            'viewport > tabpanel > grid[inPack=true] button[action="copy"]': {
                click: this.onCopyInPack
            },
            'viewport > tabpanel grid[inPack=true] button[action="del"]': {
                click: this.onDeleteInPack
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
    onActivateForm:function(panel){
        var task = panel.getForm().findField('task'),
            params = {task: task.getValue()},
            form = panel.getForm(),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list'); // 2d may be when activate child of the list
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
    onCreate: function(btn){
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
    onDelete: function(btn){
        var list = btn.up('grid');
  		if(!TK.Utils.isRowSelected(list)){
  			return;
  		}
  		var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            initObj = function(prefix, data){
                var initObj = {task:'delete'};
                initObj[prefix + '.packDoc.hid'] = data.packId;
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
		Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
		    closable: false, icon: Ext.Msg.QUESTION, scope: this,
		    fn: function(buttonId) {
				if(buttonId == 'yes')
			    {
			        Ext.Ajax.request({
				    	url: Ext.String.capitalize(doc.prefix) + '_delete.do',
				        params: initObj(doc.prefix, data),
				        scope: list,
				        success: function(response, options) {
				            var text = Ext.decode(response.responseText);
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
    onDeleteInPack:function(btn){
        var list = btn.up('grid');
  		if(!TK.Utils.isRowSelected(list)){
  			return;
  		}
  		var data = list.selModel.getLastSelected().data,
            doc = tkUser.docs.getByKey(list.xtype) || tkUser.docs.getByKey(list.ownerCt.xtype),  // for graph panels
            initObj = function(prefix, data){
                var initObj = {task:'delete'};
                initObj[prefix + '.hid'] = data.hid;
                return initObj;
            };
		Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
		    closable: false, icon: Ext.Msg.QUESTION, scope: this,
		    fn: function(buttonId) {
				if(buttonId == 'yes')
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
        var store = btn.up('gridpanel').store,
//            doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]),
            win = Ext.create('Ext.window.Window',{
                title: this.titletStat,
                width: 350,
                y:1,
                layout:'fit',
	            items: {
		            xtype:'stat',
	                store:store,
		            scope: (btn.itemId && btn.itemId == 'global' ? 'global' : 'local')
	            }

            })
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
        var data = list.selModel.getLastSelected().data;
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
                columns: [
                    {text: this.headerData, dataIndex: 'datBegin', sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false, renderer: TK.Utils.renderLongStr},
                    {text: this.headerMsg, dataIndex: 'status', flex:1,    sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                    {text: this.headerWho, dataIndex: 'user', sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                ],
                store: Ext.create('Ext.data.Store', {
                    fields:['hid', 'datBegin', 'status', 'user'],
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
	    	panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: panel.prepareGridData4Save ? panel.prepareGridData4Save() : {},
	            scope:this,
			    success: function(form, action) {
                    if(form.findField(doc.prefix+'.packDoc.hid')) {
                        if(!form.findField(doc.prefix+'.packDoc.hid').getValue()){
                            this.setPackHids(action.result.hid[doc.prefix+'.packDoc.hid']);
                        }
                    } /*else if(!form.findField(doc.prefix+'.hid').getValue()){// 4 epd  packDoc.hid == hid
                        this.setPackHids(action.result.hid[doc.prefix+'.hid']);
                    }*/

                    panel.initServiceFields(action.result.hid, true);
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
	    	panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: panel.prepareGridData4Save ? panel.prepareGridData4Save() : {},
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
	    	panel.getForm().submit({
			    waitMsg:this.waitMsg1,
	            url: Ext.String.capitalize(doc.prefix) + '_save.do',
                params: panel.prepareGridData4Save ? panel.prepareGridData4Save() : {},
	            scope:this,
			    success: function(form, action) {
                    if(form.findField(doc.prefix+'.packDoc.hid')) {
                        if(!form.findField(doc.prefix+'.packDoc.hid').getValue()){
                            this.setPackHids(action.result.hid[doc.prefix+'.packDoc.hid']);
                        }
                    } /*else if(!form.findField(doc.prefix+'.hid').getValue()){// 4 epd  packDoc.hid == hid
                        this.setPackHids(action.result.hid[doc.prefix+'.hid']);
                    }*/

                    panel.initServiceFields(action.result.hid, true);
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
    onAviso2Smgs: function(btn){
        var grid = btn.up('grid'),
            record,
            data,
            params = {};
        if(!TK.Utils.isRowSelected(grid)){
            return;
        }
        record = grid.selModel.getLastSelected();
        data = record.data;
        if(btn.itemId == 'aviso2smgsAppend'){ // add data to smgs, don't create new
            if(data['npoezd']){
                params['search.npoezd'] = data['npoezd'];
                params['groupBy'] = '4';
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
            params['groupBy'] = '2';
        }
        Ext.apply(params, {'search.hid': data['hid'],'search.type': data['type'], 'status':'7', /*'typeFrom': data['type'], 'typeTo':2,*/ 'search.routeId':data['routeId']});
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
            panel.getForm().submit({
                waitMsg:this.waitMsg1,
                url: Ext.String.capitalize(doc.prefix) + '_doc2EpdRewrite.do',
                params: panel.prepareGridData4Save ? panel.prepareGridData4Save() : {},
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
    epd2DocRewrite: function(btn){
        var panel = btn.up('form'),
            doc = tkUser.docs.getByKey(panel.xtype) || tkUser.docs.getByKey(panel.xtype+'list');


        panel.getForm().submit({
            waitMsg:this.waitMsg1,
            url: Ext.String.capitalize(doc.prefix) + '_epd2DocRewrite.do',
            params: panel.prepareGridData4Save ? panel.prepareGridData4Save() : {},
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
    }
});