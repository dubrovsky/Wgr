Ext.define('TK.controller.print.PrintTemplates', {
    extend: 'Ext.app.Controller',

    views: ['printtmpl.List', 'printtmpl.Form', 'printtmpl.TableForm', 'printtmpl.PhraseForm'],
    stores: ['PrintTemplates','PrintTemplate','PrnTmplRouteItems','PrintBlanks'],
    models: ['PrintTemplate','PrintData','PrintDataTable','PrintBlank','PrintDataPhrase'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'list',
            selector: 'viewport > tabpanel > printTemplateList'
        }, {
            ref: 'printDataList',
            selector: 'printTemplate > detailgrid#prnTemplData'
        }
    ],
    init: function() {
        this.control({
            'printTemplateList button[action="createTmpl"]': {
                click: this.onCreate
            },
            'printTemplateList button[action="editTmpl"]': {
                click: this.onEdit
            },
            'printTemplateList': {
                itemdblclick: this.onEdit,
                select: this.onRowclick
            },
            'printTemplateList button[action="copyTmpl"]': {
                click: this.onCopy
            },
            'printTemplateList button[action="delTmpl"]': {
                click: this.onDelete
            },
            'printTemplateList button[action="bindTmplToRoutes"]': {
                click: this.onBindTmplToRoutes
            },
            'printTemplateList button[action="editBlanks"]': {
                click: this.onEditBlanks
            },
            'printTemplateList button[action="bindBlanks"]': {
                click: this.onBindBlanks
            },
            'printTemplate button[action="saveTmpl"]': {
                click: this.onSave
            },
            'printTemplate button[action="saveExitTmpl"]': {
                click: this.onSaveExit
            },
            'printTemplate button[action="hShift"]': {
                click: this.onShift
            },
            'printTemplate button[action="vShift"]': {
                click: this.onShift
            },
            'printTemplate': {
                beforerender : this.onBeforerender,
                x_y_change : this.onChangeCoordFlds
            },
            'docslist button[action="print"] menuitem[action="bindPrintTmpl"]': {
                click: this.onBindUnPrintTempl
            },
            'detailgrid#prnTemplData' : {
                needTable: this.onNeedTable,
                needPhrases: this.onNeedPhrase
            },
            'printDataTable button[action="save"]' : {
                click: this.onSaveTable
            },
            'printDataPhrase button[action="save"]' : {
                click: this.onSavePhrase
            }

        });
    },
    initEvents: function(form){
//        var grid = form.getComponent('prnTemplData');
//        Ext.each(grid.query('button[action=change]'), function(item, index) {
//            item.on('click', Ext.bind(this.onChangeData, form));
//        }, this);
    },
    onBeforerender: function(form){
        var field = form.getComponent('prnTempl.defaults');
        if(Ext.getStore('PrintTemplate').first().get('defaultable')){
            field.setVisible(true);
        } else {
            form.getForm().findField('prnTempl.defaults').setValue(false);
        }
    },
    onCreate: function(btn){
        var docId = this.getMenutree().lastSelectedLeaf.id.split('_')[1],
            doc;
        this.getCenter().getEl().mask('Загрузка...','x-mask-loading');
        Ext.getStore('PrintTemplate').load({
            params:{'prnTempl.docDir.hid': docId, 'task':'create'},
            scope: this,
            callback: function(records, operation, success) {
                doc = this.getCenter().add({xtype:'printTemplate'/*, title:'Ред. Проект'*/});
//                Ext.getStore('PrintTemplate').removeAll();
                doc.initServiceFields({task:'create', 'prnTempl.docDir.hid': docId});
                doc.initForm();
                this.initEvents(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().getEl().unmask();
            }
        });
        /*Ext.Ajax.request({
            url: 'PrintTemplates_view1.do',
            params: {'prnTempl.docDir.hid': docId, 'task':'create'},
            scope: this,
            success: function(response) {
                doc = this.getCenter().add({xtype:'printTemplateSmgs'});
                Ext.getStore('PrintTemplate').removeAll();
                doc.initServiceFields({task:'create', 'prnTempl.docDir.hid': docId});
                doc.initForm();
                this.initEvents(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().getEl().unmask();
            },
            failure: function(response){
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });*/


    },
    onEditBlanks: function(btn){
        var list = btn.up('grid'),
            record = list.getStore().first(),
            win,
            store;
        if(record){
            store = Ext.getStore('PrintBlanks');
            store.removeAll();
            store.clearListeners();
            store.getProxy().extraParams = {query: record.get('docId')};
            store.load({
//                    params:{query: record.get('docId')},
                    callback: function(records, operation, success) {
                        win = Ext.create('Ext.window.Window', {
                            title: 'Загрузка и редактирование подложек/бланков',
                            width: 800, /*autoHeight:true, */ y:1, modal:true,
                            layout: 'anchor',
                            autoShow:true ,
                            maximizable:true,
                            bodyPadding: 5,
                            items: [{
                                xtype:'form',
                                title:'Загрузка',
                                defaults:{anchor: '100%'},
                                bodyPadding: 5,
                                items:[
                                    {xtype:'hidden', name:'blank.docDir.hid', value: record.data['docId']},
                                    {xtype:'textfield', fieldLabel: 'Описание', name:'blank.name', maxLength:'300', allowBlank: false},
                                    {xtype:'numberfield', fieldLabel: 'Страница', name:'blank.page', maxLength:'2', allowBlank: false, minValue:1, maxValue:99, decimalPrecision:0, anchor: '50%'},
                                    {xtype:'numberfield', fieldLabel: 'Копия', name:'blank.ncopy', maxLength:'2', allowBlank: false, minValue:1, maxValue:99, decimalPrecision:0, anchor: '50%'},
                                    {xtype:'filefield', fieldLabel: 'Файл', name: 'upload',  allowBlank: false, buttonText: 'Загрузить'}
                                ],
                                dockedItems: {
                                    dock: 'bottom',
                                    xtype: 'toolbar',
                                    items: ['->','-',{
                                        text: 'Сохранить',
                                        iconCls:'save',
                                        scope: this,
                                        handler: function(btn){
                                            var panel = btn.up('form');
                                            if(panel.getForm().isValid()){
                                                panel.getEl().mask('Запрос ...');
                                                panel.getForm().submit({
                                                    waitMsg:this.waitMsg1,
                                                    url: 'PrintTemplates_saveBlank.do',
                                                    scope:this,
                                                    success: function(form, action) {
                                                        panel.getEl().unmask();
                                                        panel.getForm().reset();
                                                        win.getComponent(1).store.load(/*{params:{query: record.get('docId')}}*/);
//                                                        win.close();
                                                    },
                                                    failure: function (form, action) {
                                                        panel.getEl().unmask();
                                                        TK.Utils.makeErrMsg(action.response, 'Внимание! Ошибка обработки данных...');
                                                    }
                                                });
                                            } else {
                                                TK.Utils.failureDataMsg();
                                            }

                                        }
                                    }]
                                }
                            },{
                                xtype: 'grid',
                                title:'Загруженные',
//                                height: 300,
                                margin: '10 0 0 0',
                                enableColumnHide:false,
                                enableColumnMove:false,
                                sortableColumns:false,
                                columnLines: true,
//                    frame: true,
                                viewConfig: {
                                    stripeRows: true,
                                    singleSelect:true
                                },
                                plugins: [
                                    Ext.create('Ext.grid.plugin.CellEditing', {
                                        clicksToEdit: 1/*,
                                         listeners: {
                                         edit: this.onEdit
                                         }*/
                                    })
                                ],
                                store: store,
                                columns: [
                                    {header: 'Наименование',  dataIndex: 'name', editor: {xtype: 'textfield',allowBlank: false, maxLength:300}, flex:1, renderer: TK.Utils.renderLongStr},
                                    {header: 'Страница', dataIndex: 'page', editor: {xtype: 'numberfield', maxLength:'2', allowBlank: false, minValue:1, maxValue:99, decimalPrecision:0}, width: 60},
                                    {header: 'Копия', dataIndex: 'ncopy', editor: {xtype: 'numberfield', maxLength:'2', allowBlank: false, minValue:1, maxValue:99, decimalPrecision:0}, width: 60},
                                    {
                                        text:"Файл",
                                        columns: [{
                                            text: 'Имя',
                                            dataIndex: 'fileName',
                                            width: 150
                                        }, {
                                            text: 'Тип',
                                            dataIndex: 'contentType',
                                            width: 75
                                        }, {
                                            text: 'Размер, байт',
                                            dataIndex: 'length',
                                            xtype: 'numbercolumn',
                                            format:'0,000',
                                            width: 70
                                        }]
                                    },
                                    {
                                        xtype: 'actioncolumn',
                                        width:70,
                                        items: [{
                                            icon: './resources/images/save.gif',
                                            tooltip: 'Сохранить',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var store = grid.getStore(),
                                                    errors = new Ext.data.Errors();
                                                store.each(function(record){
                                                    errors.addAll(record.validate().getRange());
                                                }, this);
                                                if(errors.isValid()){
                                                    var rec = grid.getStore().getAt(rowIndex),
                                                        params = {
                                                            'blank.hid':rec.get('hid'),
                                                            'blank.name':rec.get('name'),
                                                            'blank.ncopy':rec.get('ncopy'),
                                                            'blank.page':rec.get('page')
                                                        };
                                                    Ext.Ajax.request({
                                                        url: 'PrintTemplates_updateBlank.do',
                                                        params: params,
                                                        success: function(response, options) {
                                                            grid.store.load();
                                                        },
                                                        failure: function(response) {
                                                            TK.Utils.makeErrMsg(response, 'Error...');
                                                        }
                                                    });
                                                } else {
                                                    TK.Utils.failureDataMsg();
                                                }
                                            }
                                        },{
                                            icon: './resources/images/view.gif',
                                            tooltip: 'Посмотреть',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                window.open('PrintTemplates_viewBlank.do?hid=' + rec.get('hid'),'_self','');
                                            }
                                        },{
                                            icon: './resources/images/delete.png',
                                            tooltip: 'Удалить',
                                            handler: function(grid, rowIndex, colIndex) {
                                                Ext.Msg.show({title:'Удаление', msg: 'Удалить?', buttons: Ext.Msg.YESNO,
                                                    closable: false, icon: Ext.Msg.QUESTION, scope: this,
                                                    fn: function(buttonId) {
                                                        if(buttonId == 'yes')
                                                        {
                                                            var rec = grid.getStore().getAt(rowIndex);
                                                            Ext.Ajax.request({
                                                                url: 'PrintTemplates_deleteBlank.do',
                                                                params: {hid:rec.get('hid')},
                                                                success: function(response, options) {
                                                                    grid.store.load(/*{params:{query: record.get('docId')}}*/);
                                                                    list.store.load(/*{params:{query: record.get('docId')}}*/);
                                                                },
                                                                failure: function(response) {
                                                                    TK.Utils.makeErrMsg(response, 'Error...');
                                                                }
                                                            });
                                                        }
                                                    }
                                                });
                                            }
                                        }]
                                    }
                                ]
                            }],
                            dockedItems: {
                                dock: 'bottom',
                                xtype: 'toolbar',
                                items: ['->','-',{
                                    text: 'Закрыть',
                                    iconCls:'close1',
                                    handler: function(){
                                        win.close();
                                    }
                                }]
                            }}
                        );
                    }
                }
            );
        }
    },
    onBindBlanks: function(btn){
        var list = btn.up('grid'),
            model,
            store;
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        store = Ext.getStore('PrintBlanks');
        store.removeAll();
        store.clearListeners();
        model = list.selModel.getLastSelected();
        store.getProxy().extraParams = {query: model.get('docId')};
        var win = Ext.create('Ext.window.Window', {
            title: 'Привязка бланков к шаблонам печати',
            width: 600, /*height:500,*/ y:1, modal:true,
            autoHeight: true,
            layout: 'fit',
            autoShow:true ,
            maximizable:true,
            bodyPadding: 5,
            items:{
                xtype: 'itemselector',
                store: store,
                displayField: 'name',
                valueField: 'hid',
                msgTarget: 'side',
                width: 600,
                height: 250,
                listeners: {
                    beforerender : function(itemselector){
                        var fillToField = function(){
                            var blanks = list.selModel.getLastSelected().get('blanks');
                            if(blanks){
                                var arr = blanks.split(',');
                                for(var i = 0; i < arr.length; i++){
                                    itemselector.fromField.boundList.select(itemselector.fromField.boundList.store.findExact('hid', parseInt(arr[i])), true);
                                    itemselector.onAddBtnClick();
                                }
                            }
                        };

                        store.load({
                            scope: this,
                            callback: function () {
                                fillToField.call(this);
                            }/*,
                            params:{query: model.get('docId')}*/
                        });
                    }/*,
                    scope: this*/
                }
            },
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->','-',{
                    text: 'Сохранить',
                    iconCls:'save',
                    scope: this,
                    handler: function(btn){
                        var blanks = btn.up('window').getComponent(0).toField.store,
                            initObj = function(record){
                                var params = {hid : record.get('hid')};
                                blanks.each(function(model, ind){
                                    params['blanks[' + ind + '].hid'] = model.get('hid');
                                    params['blanks[' + ind + '].page'] = model.get('page');
                                    params['blanks[' + ind + '].docDir.hid'] = record.get('docId');
                                });
                                return params;
                            };
//                        win.getEl().mask('Запрос ...');
                        Ext.Ajax.request({
                            url: 'PrintTemplates_bindBlanks.do',
                            params: initObj(model),
                            scope: win,
                            success: function(response) {
//                                list.store.load();
//                                win.getEl().unmask();
                                win.close();
                                list.store.load();
                                /*Ext.Msg.show({
                                    title:'Ответ сервера',
                                    msg: 'Данные успешно сохранены',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO
                                });*/
                            },
                            failure: function(response) {
//                                win.getEl().unmask();
                                TK.Utils.makeErrMsg(response, 'Error...');
                            }
                        });
                    }
                }]
            }
        });

    },
    onBindTmplToRoutes: function(btn){
        var list = btn.up('grid'),
            data;
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        data = list.selModel.getLastSelected().data;
//        this.getCenter().getEl().mask('Загрузка...','x-mask-loading');
        var win = Ext.create('Ext.window.Window', {
            title: 'Привязка к маршрутам',
            width: 600, height:500, y:1, modal:true,
            layout: 'fit',
            autoShow:true ,
            maximizable:true,
            items: {
                xtype: 'treepanel',
                rootVisible:false,
//                root:{},
                store: 'PrnTmplRouteItems',
                listeners:{
                    beforerender: function(tree){
                        tree.store.load({params: {hid: data['hid'], type: data['docId']}});
                    }
                }
            },
            dockedItems: {
                dock: 'bottom',
                xtype: 'toolbar',
                items: ['->','-',{
                    text: 'Сохранить',
                    iconCls:'save',
                    scope: this,
                    handler: function(btn){
                        var checked = btn.up('window').getComponent(0).getChecked(),
                            params = {hid: data['hid']};

                        for(var i = 0; i < checked.length; i++){
                            params['routes[' + i + '].hid'] = checked[i].data.id.split('_')[2];
                        }
                        Ext.Ajax.request({
                            url: 'PrintTemplates_bindRoutes.do',
                            params: params,
                            scope:this,
                            success: function(response) {
                                win.close();
                                list.store.load();
                            },
                            failure: function(response) {
                                TK.Utils.makeErrMsg(response, 'Error...');
                            }
                        });
                    }
                }]
            }/*,
            listeners:{
                beforerender: function(win){
                    win.getComponent(0).store.load({params: {hid: data['hid']}});
//                    if(tree.getRootNode().isLoaded()){
//                        tree.store.load();
//                    }
                }
            }*/
        });
    },
    onEdit: function(btn){
        var list = btn.up('grid'),
            data,
            doc;
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        data = list.selModel.getLastSelected().data;
        this.getCenter().getEl().mask('Загрузка...','x-mask-loading');

        Ext.getStore('PrintTemplate').load({
            params:{'prnTempl.hid':data.hid, task:'edit'},
            scope: this,
            callback: function(records, operation, success) {
                doc = this.getCenter().add({xtype:'printTemplate', defaults:data['defaults']});
                doc.initServiceFields({
                    task:'edit',
                    'prnTempl.hid':data['hid'],
                    'prnTempl.docDir.hid':data['docId']
                });
                doc.initForm();
                this.initEvents(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().getEl().unmask();
            }
        });
    },
    onCopy: function(btn){
        var list = btn.up('grid'),
            data,
            doc;
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        data = list.selModel.getLastSelected().data;
        this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');

        Ext.getStore('PrintTemplate').load({
            params:{'prnTempl.hid':data.hid, task:'copy'},
            scope: this,
            callback: function(records, operation, success) {
                doc = this.getCenter().add({xtype:'printTemplate'/*, title:'Ред. Проект'*/});
                doc.initServiceFields({
                    task:'copy',
                    'prnTempl.docDir.hid':data['docId']
                });
                doc.initForm();
                this.initEvents(doc);
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().getEl().unmask();
            }
        });
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
                initObj['prnTempl.hid'] = data.hid;
                return initObj;
            };
        Ext.Msg.show({title:'Удаление', msg: 'Удалить?', buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes')
                {
                    Ext.Ajax.request({
                        url: 'PrintTemplates_delete.do',
                        params: initObj(data),
                        scope: list,
                        success: function(response, options) {
                            var text = Ext.decode(response.responseText);
                            this.store.load();
                        },
                        failure: function(response){
                            /*if (response.responseText){
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
                            }*/
                        }
                    });
                }
            }
        });
    },
    onSave: function(btn){
        var formPanel = btn.up('form');
        if(formPanel.getForm().isValid() && formPanel.isGridDataValid()){
            formPanel.getForm().submit({
                waitMsg:'Идет сохранение',
                url: 'PrintTemplates_save.do',
                params: formPanel.prepareGridData4Save(),
                scope:this,
                success: function(form, action) {
                    form.findField('task').setValue('edit');  // get rid of copy mode
                    formPanel.initServiceFields(action.result.hid, true);
                },
                failure: formPanel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    onSaveExit: function(btn){
        var formPanel = btn.up('form');
        if(formPanel.getForm().isValid() && formPanel.isGridDataValid()){
            formPanel.getForm().submit({
                waitMsg:'Идет сохранение',
                url: 'PrintTemplates_save.do',
                params: formPanel.prepareGridData4Save(),
                scope:this,
                success: function(form, action) {
                    var closeBtn = btn.up('panel').down('button[action="close"]');
                    closeBtn.fireEvent('click',closeBtn);
                },
                failure: formPanel.failureAlert
            });
        } else {
            TK.Utils.failureDataMsg();
        }
    },
    onRowclick: function(rowModel, record, index){
        var toolbar = this.getList().getDockedComponent('top'),
            bindBtn = toolbar.getComponent('bindRoutes'),
            delBtn = toolbar.getComponent('del'),
            defaults = this.getList().selModel.getLastSelected().data['defaults'];
        if(!defaults){
            bindBtn.enable();
            if(delBtn){
                delBtn.enable();
            }
        } else{
            bindBtn.disable();
            if(delBtn){
                delBtn.disable();
            }
        }

    },
    onChangeCoordFlds: function(field, newValue, oldValue){
        var sync = field.up('printTemplate').getForm().findField('prnTempl.sync');
        if(sync.getValue()){
            var model = field.up('detailgrid').selModel.getLastSelected();
            switch (field.name){
                case 'llx':
                    model.set('urx', model.get('urx') + newValue - oldValue);
                    break;
                case 'lly':
                    model.set('ury', model.get('ury') + newValue - oldValue);
                    break;
                case 'urx':
                    model.set('llx', model.get('llx') + newValue - oldValue);
                    break;
                case 'ury':
                    model.set('lly', model.get('lly') + newValue - oldValue);
                    break;
            }
        }
    },
    onShift: function(btn){
        var action = btn.action,
            formpanel = btn.up('form'),
            form = formpanel.getForm(),
            store = formpanel.getComponent('prnTemplData').getStore(),
            value;
        switch(action){
            case 'hShift':
                value = form.findField(action).getValue();
                if(!value) return;
                store.each(function(model){
                   model.set('llx', model.get('llx') + value);
                   model.set('urx', model.get('urx') + value);
                });

                break;
            case 'vShift':
                value = form.findField(action).getValue();
                if(!value) return;
                store.each(function(model){
                    model.set('ury', model.get('ury') + value);
                    model.set('lly', model.get('lly') + value);
                });
                break;
        }
    },
    onBindUnPrintTempl: function(btn){
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
                title: this.titleText,
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
                        {text: this.columnText, dataIndex:'name', flex:1, renderer:TK.Utils.renderLongStr}
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
                            text: this.btnBindText,
                            handler: function(btn) {
                                var grid = win.getComponent(0),
                                    params = {
                                        'search.routeId': model.get('routeId'),
                                        'search.docId': model.get('src')
                                    };
                                if(grid.selModel.getSelection().length > 0){
                                    params['hid'] =  grid.selModel.getSelection()[0].get('hid');
                                }
                                /*if (grid.selModel.getCount() == 0) {
                                 Ext.Msg.show({
                                 title: 'Предупреждение',
                                 msg: 'Следует выбрать строку из таблицы с данными',
                                 buttons: Ext.MessageBox.OK,
                                 icon: Ext.MessageBox.WARNING
                                 });
                                 return false;
                                 } else {*/

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
    },
    onNeedTable: function(grid, record){
        var win = Ext.widget('printDataTable'),
            store = win.child('grid').getStore();

        store.removeAll(true);
        if(record.table().count() > 0){
            store.add(record.table().getRange());
        }

        win['printDataRecord'] = record;
    },
    onSaveTable: function(btn){
        var win = btn.up('window'),
            printDataRecord  = win['printDataRecord'],
            tableStore = win.child('grid').getStore();

        printDataRecord.table().removeAll(true);
        if(tableStore.count() > 0){
            printDataRecord.table().add(tableStore.getRange());
        }
        this.getPrintDataList().getView().refresh();
        win.close();
    },
    onNeedPhrase: function(grid, record){
        var win = Ext.widget('printDataPhrase'),
            store = win.child('grid').getStore();

        store.removeAll(true);
        if(record.phrases().count() > 0){
            store.add(record.phrases().getRange());
        }

        win['printDataRecord'] = record;
    },
    onSavePhrase: function(btn){
        var win = btn.up('window'),
            printDataRecord  = win['printDataRecord'],
            phraseStore = win.child('grid').getStore();

        printDataRecord.phrases().removeAll(true);
        if(phraseStore.count() > 0){
            printDataRecord.phrases().add(phraseStore.getRange());
        }
        this.getPrintDataList().getView().refresh();
        win.close();
    }
});