Ext.define('TK.controller.Doc2Doc', {
    extend: 'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils'
    ],

    requires: [
        'Ext.button.Button',
        'Ext.form.FieldContainer',
        'Ext.form.Panel',
        'Ext.form.action.Action',
        'Ext.form.field.File',
        'Ext.form.field.Text',
        'Ext.layout.container.HBox',
        'Ext.resizer.Splitter',
        'TK.Utils',
        'TK.Validators',
        'TK.model.VgCtGrTreeNode',
        'TK.view.edit.UploadDoc9FormWin',
        'TK.view.edit.UploadGrafCopiesWin',
        'TK.view.edit.UploadFormWin',
        'TK.view.edit.UploadPogruzListFormWin',
        'TK.view.edit.UploadGrafCopiesPart2Win',
        'TK.view.pogruz.Map2BaseSelectForm',
        'TK.view.pogruz.PoezdSelectForm'
    ],

    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },{
            ref: 'menutree',
            selector: 'viewport > menutree'
        },{
            ref: 'uploadGrafCopiesFormPart2',
            selector: 'uploadGrafCopiesFormPart2Win > form'
        },{
            ref: 'uploadGrafCopiesForm',
            selector: 'uploadGrafCopiesFormWin > form'
        },{
            ref: 'uploadDoc9Form',
            selector: 'uploadDoc9FormWin > form'
        },{
            ref: 'uploadPogruzListForm',
            selector: 'uploadPogruzListFormWin > form'
        }, {ref: 'vgCtGrTreeWin',
            selector: 'vgCtGrTreeFormWin'
        }, {
            ref: 'vgCtGrTree',
            selector: 'vgCtGrTreeFormWin > treepanel'
        },
        {
            ref:'grid',
            selector: 'viewport > tabpanel > grid'
        }
    ],
    init: function() {
        this.control({
            'smgslist button[action="doc2doc"] menuitem[action="smgs2invoice"]': {
                click: this.onSmgs2Invoice
            },
            'smgslist button[action="doc2doc"] menuitem[action="doc2smgs_invoice"]': {
                click: this.onSmgs2Invoice
            },
            'docslist button[action="doc2doc"] menuitem[action="contsListSmgs"]': {
                click: this.onContListOnList
            },
            'docslist button[action="doc2doc"] menuitem[action="contsListCimSmgs"]': {
                click: this.onContListOnList
            },
            'cimsmgs button[action="contsListCimSmgs"]': {
                click: this.onContListOnForm
            },
            'smgs2 menuitem[action="vagsListSmgs2"]': {
                click: this.onContListOnForm
            },
            'smgs2 menuitem[action="contsListSmgs2"]': {
                click: this.onContListOnForm
            },
            'uploadFormWin button[action="uploadXLSvags"]': {
                click: this.onUploadXLSvags
            },
            'uploadFormWin button[action="uploadAviso2smgsXLS"]': {
                click: this.onUploadAviso2smgsXLS
            },
            'uploadFormWin button[action="uploadInvXlsCargo"]': {
                click: this.onUploadInvoiceXlsCargo
            },
            'uploadFormWin button[action="importInvXls"]': {
                click: this.onUploadInvoiceXls
            },
            'uploadFormWin button[action="downloaduploadContsXLS"]': {
                click: this.onDownloadTpl
            },
            'uploadFormWin button[action="downloaduploadVagsXLS"]': {
                click: this.onDownloadTpl
            },
            'uploadFormWin button[action="downloadaviso2smgsXLS"]': {
                click: this.onDownloadTpl
            },
            'uploadFormWin button[action="downloaduploadInvoiceXlsCargo"]': {
                click: this.onDownloadTpl
            },
            'uploadFormWin button[action="downloadimportInvoiceXls"]': {
                click: this.onDownloadTpl
            },
            'vgCtGrTreeFormWin button[action="uploadContsXLS"]': {
                click: this.onUploadXLSfile
            },
            'vgCtGrTreeFormWin button[action="uploadVagsXLS"]': {
                click: this.onUploadXLSfile
            },
            'invoice button[action="uploadInvoiceXlsCargo"]': {
                click: this.onUploadXLSfile
            },
            'cimsmgslist button[action="doc2doc"] menuitem[action="dopList"]': {
                click: this.dopListOnList
            },
            'docslist button[action="doc2doc"] menuitem[action="uploadPogruzList"]': {
                click: this.uploadPogruzList
            },
            'docslist button[action="doc2doc"] menuitem[action="uploadPogruzListTrain"]': {
                click: this.uploadPogruzListTrain
            },
            'docslist button[action="doc2doc"] menuitem[action="uploadGrafCopies"]': {
                click: this.uploadGrafCopies
            },
            'cimsmgslist button[action="doc2doc"] menuitem[action="uploadCimSmgsDocs9"]': {
                click: this.uploadCimSmgsDocs9OnList
            },
            'cimsmgs button[action="dopList"]': {
                click: this.dopListOnForm
            },
            'uploadDoc9FormWin > form > trigger[name="cimSmgsDoc.ncas"]': {
                ontriggerclick: this.onNcasClick
            },
            // 'uploadGrafCopiesFormWin field[name="type"]': {
            //     change: this.onUploadTypeChange
            // },
            'uploadDoc9FormWin button[action="upload"]': {
                click: this.onUploadDoc9
            },
            'uploadGrafCopiesFormWin button[action="upload"]': {
                click: this.onUploadGrafCopies
            },
            'uploadGrafCopiesFormPart2Win button[action="upload"]': {
                click: this.onUploadGrafCopiesPart2
            },
            'uploadPogruzListFormWin button[action="upload"]': {
                click: this.onUploadDocMapPeregruz
            }
        });
    },
    onUploadGrafCopiesPart2: function(btn) {
        var form = this.getUploadGrafCopiesFormPart2(),
            store = form.down('grid').getStore(),
            params = [];
        store.each(function (record) {
            params.push({'id': record.get('id'), 'nkon': record.get('nkon')});
        }, this);
        this.getUploadGrafCopiesFormPart2().setLoading(true);
        Ext.Ajax.request({
            url: 'Doc2Doc_uploadGrafCopiesPart2.do',
            params:  {'name' : Ext.encode(params), 'search.routeId': this.getMenutree().lastSelectedLeaf.id.split('_')[2], 'search.docType': this.getMenutree().lastSelectedLeaf.id.split('_')[3]},
            scope: this,
            success: function (response) {
                Ext.Msg.show({
                    title: this.successMsgTitle,
                    msg: 'Ok',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    scope: this,
                    fn: function () {
                        setTimeout(this.reloadGrid.bind(this), 1000);
                        this.getUploadGrafCopiesFormPart2().up('window').close();
                    }
                });
            },
            failure: function (response) {
                this.getUploadGrafCopiesFormPart2().up('window').close();
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    onUploadGrafCopies: function(btn){
        var form = this.getUploadGrafCopiesForm().getForm();
        if(form.isValid()){
            this.getUploadGrafCopiesForm().setLoading(true);
            form.submit({
                url: 'Doc2Doc_uploadGrafCopies.do',
                scope:this,
                success: function(form, action) {
                    this.getUploadGrafCopiesForm().setLoading(false);
                    var msg = Ext.decode(action.response.responseText)['msg'];
                    if (msg == null || msg.length === 0) {
                        Ext.Msg.show({
                            title: this.successMsgTitle,
                            msg: 'Ok',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                            scope: this,
                            fn: function () {
                                this.getUploadGrafCopiesForm().up('window').close();
                            }
                        });
                    } else {
                        this.getUploadGrafCopiesForm().up('window').close();
                        var win = Ext.widget('uploadGrafCopiesFormPart2Win'),
                            store = win.down('#uploadGraf').getStore();
                        Ext.Array.each(msg, function (file) {
                            store.add({fileName: file.file, nkon: '', id: file.id})
                        });
                        win.show();
                    }
                    setTimeout(this.reloadGrid.bind(this), 1000);
                },
                failure: function (form, action) {
                    this.getUploadGrafCopiesForm().setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },

    reloadGrid: function () {
        this.getCenter().down('grid').store.reload();
    },

    // onUploadTypeChange: function (radio, newVal) {
    //     if (newVal && radio.itemId === 'grafTypeNew')
    //         radio.up('form').down('#poezdNum').setDisabled(false);
    //     if (newVal && radio.itemId === 'grafTypeRefresh')
    //         radio.up('form').down('#poezdNum').setDisabled(true);
    //
    //
    // },
    uploadGrafCopies: function (btn) {
        var win = Ext.widget('uploadGrafCopiesFormWin');
        this.getUploadGrafCopiesForm().getForm().findField('search.routeId').setValue(this.getMenutree().lastSelectedLeaf.id.split('_')[2]);
        this.getUploadGrafCopiesForm().getForm().findField('search.docType').setValue(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
        win.show();
    },

    onSmgs2Invoice: function(btn){
        var list = btn.up('grid'),
            selectedModels,
            params = {},
            win, filefield, onChange;

        if(btn.action === 'doc2smgs_invoice') { // Excel to invoice & smgs
            params['groupBy'] = '3';
        } else {
            if(!TK.Utils.isRowSelected(list)){
                return false;
            }
            selectedModels = list.selModel.getSelection();

            for(var i = 0; i < selectedModels.length; i++){
                params['smgsIds[' + i + ']'] = selectedModels[i].get('hid');
            }
            params['groupBy'] = '1';
        }
        params['search.routeId'] = this.getMenutree().lastSelectedLeaf.id.split('_')[2];

        onChange = function(field, value){
            var form = field.up('form'),
                filefields = form.query('filefield');
            for(var y = 0; y < filefields.length; y++){
                filefields[y].un('change', onChange); // only last filefield can fire change event
            }
            form.add(filefield);
            filefields = form.query('filefield');
            for(var i = 0; i < filefields.length; i++){
                filefields[y].allowBlank = true;
                if(!filefields[i].ownerCt.getComponent('del')){    // if  filefield doesn't have del btn, add it, if we hav only one filefield - we don't need any del btn
                    filefields[i].ownerCt.add(
                        {xtype: 'splitter', itemId:'delSplitter'},
                        {xtype:'button',iconCls:'del', itemId:'del',
                            handler: function(btn){
                                var form = btn.up('form'),
                                    fieldcontainers;
                                form.remove(btn.up('fieldcontainer'));
                                fieldcontainers = form.query('fieldcontainer');
                                if(fieldcontainers.length == 1){
                                    fieldcontainers[0].remove(fieldcontainers[0].getComponent('del'));
                                    fieldcontainers[0].remove(fieldcontainers[0].getComponent('delSplitter'));
                                    fieldcontainers[0].getComponent('fileUpload').allowBlank = false;
                                }
                                fieldcontainers[fieldcontainers.length - 1].getComponent('fileUpload').on("change", onChange);
                            }
                        }
                    );
                }
            }
        };
        filefield =
        {
            xtype: 'fieldcontainer',
            layout: 'hbox',
            fieldLabel: 'Файл',
            labelWidth: 40,
            items: [
                {xtype: 'filefield', emptyText: 'Выбор файла для загрузки...', name: 'fileUpload', buttonText: 'Обзор...', flex: 1, allowBlank: false, listeners:{change: onChange}, itemId:'fileUpload'}
            ]
        };
        win = Ext.widget('window', {
            title: this.titleDownldInv,
            width: 500, y:0,
            autoShow: true,
            modal:true,
            items: {
                xtype:'form',
                bodyPadding: 10,
                items: [
                    filefield
                ],
                buttons: [{
                    text: this.btnSave,
                    handler: function(btn) {
                        var form = btn.up('form').getForm();
                        if(form.isValid()){
                            form.submit({
                                url: 'Doc2Doc_upload.do',
    //                                url: 'Doc2Doc.do',
                                params: params,
                                waitMsg: 'Загрузка',
                                scope: this,
                                success: function(form, action) {
                                    win.close();
                                    Ext.Msg.show({
                                        title: 'Операция завершена успешно',
                                        msg: Ext.decode(action.response.responseText)['result'],
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.INFO,
                                        fn: function(){
                                            list.getStore().reload();
                                        }
                                    });
                                }
                                ,failure: function(form, action) {
                                    win.close();
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    }
                }]
            }
        });
    },
    onContListOnList: function(btn){
        var win,
            me = this,
            grid = btn.up('docslist'),
            store = grid.getStore(),
            groupBy/* = btn.itemId.split('_')[1]*/,
            failure = function(form, action){
                win.close();
                if(action.failureType == Ext.form.action.Action.SERVER_INVALID && action.result && action.result['success'] === false){
                    Ext.Msg.show({
                        title: 'Предупреждение',
                        msg: 'Информация для формирования документа не найдена',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.WARNING
                    });
                } else {
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            },
            conListBtn = {
                text: this.btnContList,
                iconCls: 'conts',
                scope: this,
                handler: function(btn1) {
                    var form = btn1.up('form').getForm(),
                        docType;

                    switch(btn.action){
                        case 'contsListSmgs':
                            docType = 'filesmgs';
                            groupBy = 6;
                            break;
                        case 'contsListCimSmgs':
                            docType = 'filecimsmgs';
                            groupBy = 7;
                            break;
                    }
                    if(form.isValid()){
                        form.submit({
                            url: 'Doc2Doc_download.do',
                            params: {type: store.getAt(0).get('type'), docId: store.getAt(0).get('src'), 'search.routeId': store.getAt(0).get('routeId'), groupBy:groupBy},
                            waitMsg: 'Загрузка',
                            scope: this,
                            success: function(form1, action) {

                               this.contsList({
                                   npoezd: form1.findField('search.npoezd').getValue(),
                                   type: store.getAt(0).get('type'),
                                   docId: store.getAt(0).get('src'),
                                   routeId: store.getAt(0).get('routeId')
                               });
                                /*window.open('Doc2Doc_download.do?' +
                                    'search.npoezd=' + form1.findField('search.npoezd').getValue() + '&type=' + store.getAt(0).get('type')+
                                    '&docId=' + store.getAt(0).get('src') + '&token=1&'+'groupBy=' + groupBy +
                                    '&search.routeId=' + store.getAt(0).get('routeId') + '&search.docType=' + docType,
                                    '_self','');*/
                                win.close();
                                // me.runProgressBar4LongOperation();

                            }
                            ,failure: failure
                        });
                    }
                }
            },
            smgsBtn = {
                text: this.btnSmgs,
                iconCls:'doc_new',
                handler: function(btn1) {
                    var form = btn1.up('form').getForm();
                    switch(btn.action){
                        case 'contsListSmgs':
                            groupBy = 5;
                            break;
                        case 'contsListCimSmgs':
                            groupBy = 8;
                            break;
                    }
                    if(form.isValid()){
                        form.submit({
                            url: 'Doc2Doc.do',
                            params: {'search.type': store.getAt(0).get('type'), 'search.docId': store.getAt(0).get('src'), 'search.routeId': store.getAt(0).get('routeId'), groupBy: groupBy, status:10},
                            waitMsg: 'Загрузка',
                            scope: this,
                            success: function(form, action) {
                                win.close();
                                Ext.Msg.show({
                                    title: 'Операция завершена успешно',
                                    msg: Ext.decode(action.response.responseText)['result'],
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.INFO,
                                    fn: function(){
                                        grid.getStore().reload();
                                    }
                                });
                            }
                            ,failure: failure
                        });
                    }
                }
            };

        if(store && store.count() > 0 ) {
            win = Ext.widget('window', {
                title: this.titleContList,
                width: 400, y:0,
                autoShow: true,
                modal:true,
                items: {
                    xtype:'form',
                    bodyPadding: 10,
                    items: [
                        {xtype:'textfield', fieldLabel:this.labelWagenNums, name:'search.npoezd', maxLength:32, width:350, allowBlank:false}
                    ],
                    buttons: [
                        conListBtn,
                        smgsBtn,
                        {
                            text:this.btnClose,
                            handler: function(){
                                win.close();
                            }
                        }
                    ]
                }
            });

        } else {
            Ext.Msg.show({title: 'Ошибка', msg: 'Нет документов в данном маршруте', buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
        }
    },
    /**
     * Заполнени еданных для генерации XLS файла контейнеров/вагонов
     * @param btn кнопка вызова
     */
    onContListOnForm: function(btn){
        var form = btn.up('form').getForm(),
            hid = form.findField('smgs.hid').getValue();

        if(!hid){
            Ext.Msg.show({title: this.warnTitle, msg: this.saveMgs, buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING});
            return;
        }

        var data = {
            type: form.findField('smgs.type').getValue(),
            hid: hid,
            docId: form.findField('smgs.docType1').getValue(),
            routeId: form.findField('smgs.route.hid').getValue(),
            groupBy:''
        };
        switch (btn.action) {
            case 'contsListCimSmgs':
                data['groupBy']=7;
                break;
            case 'vagsListSmgs2':
                data['groupBy']=12;
                break;
            case 'contsListSmgs2':
                data['groupBy']=11;
        }
        this.contsList(data);
    },
    /**
     * отправка запроса и загрузка сгененрированного XLS файла
     * @param data
     */
    contsList: function(data) {

        var url=            'Doc2Doc_download.do?' +
            'search.npoezd=' + (data['npoezd'] ? data['npoezd'] : '') +
            '&hid=' + (data['hid'] ? data['hid'] : '') +
            '&type=' + data['type']+
            '&docId=' + data['docId'] +
            '&token=1' +
            '&groupBy='+ data['groupBy'] +
            '&search.routeId=' + data['routeId'] +
            (data['docType']?'&search.docType='+data['docType']:'&search.docType=filecimsmgs');
        window.open(url,'_self','');
        this.runProgressBar4LongOperation();
    },
    /**
     * скачиваем шаблон для импорта через EXCEL данных о вагон/контейнер/груз
     * @param btn кнопка вызова
     */
    onDownloadTpl:function(btn)
    {
        var data={
            'groupBy':13
        };
        switch (btn.action) {
            case 'downloaduploadVagsXLS':
            {
                data['docType']='VAG_TEMPLATE_CS2.xls';
            }break;
            case 'downloaduploadContsXLS':
            {
                data['docType']='CONTS_TEMPLATE_CS2.xls';
            }break;
            case 'downloadaviso2smgsXLS':
            {
                data['docType']='AVISO2SMGS_TEMPLATE_CS2.xls';
            }break;
            case 'downloaduploadInvoiceXlsCargo':
            {
                data['docType']='INVOICE_CARGO_TEMPLATE.xls';
            }break;
            case 'downloadimportInvoiceXls':
            {
                data['docType']='INVOICE_TEMPLATE.xls';
            }break;

        }
        this.contsList(data);
    },
    dopListOnList: function(btn){
        var grid = btn.up('docslist');
        if(!TK.Utils.isRowSelected(grid)){
            return false;
        }

        var store = grid.getStore(),
            data = {
                type: store.getAt(0).get('type'),
                hid: grid.selModel.getLastSelected().get('hid'),
                docId: store.getAt(0).get('src'),
                routeId: store.getAt(0).get('routeId')
            };

        this.dopList(data);
        /*window.open('Doc2Doc_downloadExcel.do?' +
            'type=' + store.getAt(0).get('type')+
            '&hid=' + hid +
            '&docId=' + store.getAt(0).get('src') +
            '&groupBy=' + groupBy +
            '&search.routeId=' + store.getAt(0).get('routeId') +
            '&search.docType=' + docType,
            '_self','');*/

    },
    dopListOnForm: function(btn){
        var form = btn.up('form').getForm(),
            hid = form.findField('smgs.hid').getValue();

        if(!hid){
            Ext.Msg.show({title: 'Предупреждение', msg: 'Сохраните документ', buttons: Ext.Msg.OK, icon: Ext.Msg.WARNING});
            return;
        }

        var data = {
            type: form.findField('smgs.type').getValue(),
            hid: hid,
            docId: form.findField('smgs.docType1').getValue(),
            routeId: form.findField('smgs.route.hid').getValue()
        };

        this.dopList(data);
    },
    dopList: function(data){
        window.open('Doc2Doc_downloadExcel.do?' +
            'type=' + data['type']+
            '&hid=' + data['hid'] +
            '&docId=' + data['docId'] +
            '&groupBy=9' +
            '&search.routeId=' + data['routeId'] +
            '&search.docType=filecimsmgs',
            '_self','');

        this.runProgressBar4LongOperation();
    },

    onNcasClick: function(field) {
        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectDoc9, this.getUploadDoc9Form(), {single: true});
    },

    onSelectDoc9: function(view, record) {
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('cimSmgsDoc.ncas');
        if(field){
            field.setValue(data['nsiFNcas']);
        }

        field = form.findField('cimSmgsDoc.text');
        if(field){
            field.setValue(data['nsiFDesc']);
        }

        field = form.findField('cimSmgsDoc.text2');
        if(field){
            field.setValue(data['nsiFDsc2']);
        }

        view.up('window').close();
    },

    uploadCimSmgsDocs9OnList: function (btn) {
        var grid = btn.up('docslist');
        if(!TK.Utils.isRowSelected(grid)){
            return false;
        }

        var win = Ext.widget('uploadDoc9FormWin');

        this.getUploadDoc9Form().getForm().findField('hid_cs').setValue(grid.getSelectionModel().getLastSelected().get('hid'));
        win.show();
    },
    /**
     * loading excel file form
     * @param btn
     * @returns {boolean}
     */
    uploadPogruzList:function(btn)
    {
        var grid = btn.up('docslist');
        if(!TK.Utils.isRowSelected(grid)){
            return false;
        }
        var win = Ext.widget('uploadPogruzListFormWin');
        win.down('form').getComponent('uploadField').validator=TK.Validators.validExcel;
        this.getUploadPogruzListForm().getForm().findField('hid_cs').setValue(grid.getSelectionModel().getLastSelected().get('hid'));
        this.getUploadPogruzListForm().getForm().findField('name').setValue('');
        win.parent=this;
        win.show();
    },
    /**
     * Shows train find window to upload Pogruz list
     * @param btn brn caller
     * @param opts options
     */
    uploadPogruzListTrain:function(btn,opts)
    {
        var win= Ext.create('TK.view.pogruz.PoezdSelectForm'),
            routeId=btn.up('docslist').getStore().getAt(0).get('routeId'),
            type=btn.up('docslist').getStore().getAt(0).get('type'),hid;
        win.parentStore=btn.up('docslist').getStore();
        if(btn.up('docslist').selModel.getLastSelected())
            hid = btn.up('docslist').selModel.getLastSelected().data['hid'];
        if(opts['aviso2doc'])
        {
            switch (type)
            {
                case '11':type='12';break;
            }
        }

        win.parent=this;
        win.routeId=routeId;
        win.type=type;
        win.hid=hid;
        win.opts=opts;
        if(opts['mode']&&typeof opts['mode']==='string') {
            win.mode = opts['mode'];
            if(opts['task'])
                win.task = opts['task'];
        }
        else
            win.mode='uploadPogruzList';

        var btn2fire= Ext.ComponentQuery.query('#poezdSeltopTBar > #buttonTrSrch')[0];
        btn2fire.fireHandler();
        // win.localStore.load();
        win.show();
    },

    onUploadDoc9: function(btn){
        var form = this.getUploadDoc9Form().getForm();
        if(form.isValid()){
            this.getUploadDoc9Form().setLoading(true);
            form.submit({
                url: 'Doc2Doc_uploadDoc9.do',
                scope:this,
                success: function(form, action) {
                    this.getUploadDoc9Form().setLoading(false);
                    Ext.Msg.show({
                        title: this.successMsgTitle,
                        msg: 'Ok',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        scope: this,
                        fn: function(){
                            this.getUploadDoc9Form().up('window').close();
                        }
                    });
                },
                failure: function (form, action) {
                    this.getUploadDoc9Form().setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },
    /**
     * Upload excel file and shows table with results.
     */
    onUploadDocMapPeregruz:function () {
        var url='Doc2Doc_uploadPogruzList.do';
        var form = this.getUploadPogruzListForm().getForm();
        if(form.isValid()){
            this.getUploadPogruzListForm().setLoading(true);
            form.submit({
                url: url,
                scope:this,
                success: function(form, action) {
                    this.getUploadPogruzListForm().setLoading(false);
                    var win= Ext.create('TK.view.pogruz.Map2BaseSelectForm');
                    win.parent=this;
                    // decoding response and load to store of result table.
                    win.localStore.loadRawData(Ext.JSON.decode(action.response.responseText.replace('success: true,','')));
                    win.show();
                    this.getUploadPogruzListForm().up('window').close();
                },
                failure: function (form, action) {
                    this.getUploadPogruzListForm().setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }

    },
    /**
     * создание окна загрузки XLS файлами c контейнерами/вагонами
     * @param btn
     */
    onUploadXLSfile:function (btn) {
        var win = Ext.widget('uploadFormWin'),
            downloadTplActions=[
                'uploadContsXLS','uploadVagsXLS','aviso2smgsXLS','uploadInvoiceXlsCargo','importInvoiceXls'
            ];
        win.down('form').getComponent('uploadField').validator=TK.Validators.validExcel;
        win.down('form').getComponent('uploadName').setValue(btn.action);
        win.actionBtn=btn;

        switch (btn.action) {
            //загружаем XLS контейнерной/вагонной перевозки
            case 'uploadContsXLS':
            case 'uploadVagsXLS':
            {
                win.dockedItems.items[0].getComponent('savebtn').action='uploadXLSvags';
            }break;
            case  'aviso2smgsXLS': // загружаем XLS c данными для генерации СМГС из шаблона
            {
                win.dockedItems.items[0].getComponent('savebtn').action='uploadAviso2smgsXLS';
            }break;
            case  'uploadInvoiceXlsCargo': // загружаем XLS c грузами для добавления в Invoice
            {
                win.dockedItems.items[0].getComponent('savebtn').action='uploadInvXlsCargo';
            }break;
            case  'importInvoiceXls': // загружаем XLS c invoice
            {
                var doc= this.getMenutree().lastSelectedLeaf.id.split('_')[3],
                    routeId = this.getMenutree().lastSelectedLeaf.id.split('_')[2],
                    cimsmgsForm,packHid,packHidtmp,smgs2Form,cimHidForm;
                if(doc!=='invoicelist') {
                    var cimsmgs=Ext.ComponentQuery.query('viewport > tabpanel >cimsmgs')[0];
                    // проверяем есть ли закладка cimsmgs
                    if(cimsmgs) {
                        cimsmgsForm =cimsmgs.getForm();
                        packHid=cimsmgsForm.findField('smgs.packDoc.hid').value;
                    }
                    // проверяем есть ли закладка smgs2
                    var smgs2=Ext.ComponentQuery.query('viewport > tabpanel >smgs2')[0];
                    if(smgs2&&!packHid) {
                        smgs2Form = smgs2.getForm();
                        packHid=smgs2Form.findField('smgs.packDoc.hid').value;
                    }
                    // проверяем есть ли закладка cim
                    var cim=Ext.ComponentQuery.query('viewport > tabpanel >cim')[0];
                    if(cim&&!packHid) {
                        cimHidForm = cim.getForm();
                        packHid=cimsmgsForm.findField('smgs.packDoc.hid').value;
                    }
                    if(packHid)
                        win.down('form').getComponent('hid').setValue(packHid);
                    else
                    {
                        Ext.Msg.show({
                            title: this.titleWarning,
                            msg: this.msgSaveBeforeImport,
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO
                        });
                        return;
                    }
                }
                win.down('form').getComponent('query').setValue(routeId);
                win.dockedItems.items[0].getComponent('savebtn').action='importInvXls';
            }break;
        }

        // скачать шаблон документа
        if( downloadTplActions.indexOf(btn.action)!==-1)
        {
            win.dockedItems.items[0].getComponent('downloadTpl').hidden=false;
            win.dockedItems.items[0].getComponent('downloadTpl').action='download'+btn.action;
        }
        win.show();
    },


    /**
     * Отправляем XLS файл c вагонами/контейнерами на сервер
     * @param btn
     */
    onUploadXLSvags:function(btn)
    {
        var url='Doc2Doc_uploadXLS.do';
        var form = btn.up().up().down('form');
        if(form.isValid()){
            form.setLoading(true);
            form.submit({
                url: url,
                scope:this,
                success: function(form2, action) {
                    var response=Ext.JSON.decode(action.response.responseText.replace('success: true,','')),
                        vagsConts=response['rows'],type=response['type'];

                    this.importContsVagsFromXLS(vagsConts,type);
                    form.setLoading(false);
                    form.up('window').close();
                },
                failure: function (form2, action) {
                    form.setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },
    /**
     * загрузка XLS файла с доукументами и слияние его с шаблоном СМГС
     * @param btn кнопка вызова
     */
    onUploadAviso2smgsXLS:function(btn)
    {
        var grid=this.getGrid(),
            record=this.getGrid().selModel.getSelection()[0],
            params={};
        Ext.apply(params, {'search.hid': record.get('hid'),'search.type': record.get('type'), 'status': '7', 'search.routeId':record.get('routeId')});
        record = grid.selModel.getLastSelected();
        var data = record.data;
        var url='Doc2Doc_uploadXLS.do';
        var form = btn.up().up().down('form');
        if(form.isValid()){
            form.setLoading(true);
            form.submit({
                url: url,
                scope:this,
                params: params,
                success: function(form2, action) {
                    this.getCenter().getEl().unmask();
                    form.setLoading(false);
                    var response=action.response;
                    Ext.Msg.show({
                        title: this.successMsgTitle,
                        msg: this.processed+' '+Ext.decode(response.responseText)['result']+' '+this.docs,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        fn: function(){
                            grid.getSelectionModel().deselect(record, true);
                        }
                    });
                },
                failure: function (form2, action) {
                    form.setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },
    /**
     * Отправляем XLS файл грузов для Invoice на сервер и записываем ответ в хранилище грузов или выводим сообщение об ошибке
     * @param btn внопка вызова
     */
    onUploadInvoiceXlsCargo:function(btn)
    {
        console.log('onUploadInvoiceXlsCargo');

        var url='Doc2Doc_uploadXLS.do',
            actionBtn=btn.up('window').actionBtn, // кнопка которая запустила процесс загрузки XLS файла
            form = btn.up().up().down('form');
        if(form.isValid()){
            form.setLoading(true);
            form.submit({
                url: url,
                scope:this,
                success: function(form2, action) {
                    var response=Ext.JSON.decode(action.response.responseText.replace('success: true,','')),
                        cargo=response['rows'];

                    var store=actionBtn.up().up().getStore(), arr= store.getRange();

                    arr=arr.concat(cargo);
                    store.loadData(arr);

                   // this.importContsVagsFromXLS(vagsConts,type);
                    form.setLoading(false);
                    form.up('window').close();
                },
                failure: function (form2, action) {
                    form.setLoading(false);
                    var response=Ext.JSON.decode(action.response.responseText.replace('success: true,','')),
                        cargo=response['rows'];
                    if(cargo)
                    {
                        var store=Ext.ComponentQuery.query('invoice #gruz')[0].getStore(), arr= store.getRange();

                        arr=arr.concat(cargo);
                        store.loadData(arr);

                        // this.importContsVagsFromXLS(vagsConts,type);
                        form.setLoading(false);
                        form.up('window').close();
                    }
                    else
                        TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },
    /**
     * Отправляем XLS файл с данными Invoice и грузов  на сервер, где они после прочтения из файла будут записаны в базу данных
     * @param btn кнопка вызова
     */
    onUploadInvoiceXls:function(btn)
    {
        console.log('onUploadInvoiceXls');

        var url='Doc2Doc_uploadXLS.do',
            actionBtn=btn.up('window').actionBtn, // кнопка которая запустила процесс загрузки XLS файла
            form = btn.up().up().down('form');
        if(form.isValid()){
            form.setLoading(true);
            form.submit({
                url: url,
                scope:this,
                success: function(form2, action) {
                    actionBtn.up().up().getStore().reload();
                    form.setLoading(false);
                    form.up('window').close();
                },
                failure: function (form2, action) {
                    form.setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }
    },
    /**
     * Ипортирует данные вагонов/контейнеров полученные от сервера в результате обработки XLS файла
     * @param conts список записей
     * @param type тип перевозки
     */
    importContsVagsFromXLS:function(conts,type)
    {
        var rootNode=this.getVgCtGrTree().getStore().getRootNode(),
            rootVag=rootNode.childNodes[0],
            rootVagData=rootVag?rootVag.data:{},
            rootCont,
            rootContData,
            rootGruzData;

        if(type==='uploadContsXLS')
        {
            rootCont= rootVag?rootVag.childNodes[0]:null;
            rootContData=rootCont?rootCont.data:{};
            rootGruzData=rootCont?rootCont.childNodes[0].data:{};
        }
        if(type==='uploadVagsXLS') {
            rootGruzData=rootVag?rootVag.childNodes[0].data:{};
        }

            rootNode.removeAll();

        for(var i=0;i<conts.length;i++)
        {
            var cont=conts[i],vagModel=null;

            for(var n=0;n<rootNode.childNodes.length;n++)
            {
                if(cont['nvag']===rootNode.childNodes[n].data['nvag'])
                {
                    vagModel=rootNode.childNodes[n];
                    break;
                }
            }
            // вагон нет в дереве
            if(!vagModel)
            {
                var nvagT=cont['nvag'] ? cont['nvag'] : 'xxxxx';
                //создаем вагон
                vagModel= Ext.create('TK.model.VgCtGrTreeNode', {

                    nvag:nvagT,
                    klientName:cont['klientName']?cont['klientName']:rootVagData['klientName']?rootVagData['klientName']:'',
                    vagOtm:rootVagData['vagOtm']?rootVagData['vagOtm']:'',
                    grPod:cont['grPod']?cont['grPod']:(rootVagData['grPod']?rootVagData['grPod']:''),
                    taraVag:cont['taraVag']?cont['taraVag']:rootVagData['taraVag']?rootVagData['taraVag']:'',
                    kolOs:cont['kolOs']?cont['kolOs']:rootVagData['kolOs']?rootVagData['kolOs']:'',
                    rod:rootVagData['rod']?rootVagData['rod']:'',

                    text: nvagT,
                    who: 'vag',
                    leaf: false,
                    iconCls: 'vag' + (i + 1),
                    style: {
                        'color': 'red'
                    },
                    expanded:true
            });
            rootNode.appendChild(vagModel);
            }
            if(type==='uploadContsXLS')
            {
            var utiNT=cont['utiN']?cont['utiN']:rootContData['utiN']?rootContData['utiN']:'xxxxx',
                //создаем контейнер
                contModel = Ext.create('TK.model.VgCtGrTreeNode', {
                utiN:utiNT,
                sizeFoot:cont['sizeFoot']?cont['sizeFoot']:rootVagData['sizeFoot']?rootVagData['sizeFoot']:'',
                taraKont:cont['taraKont']?cont['taraKont']:rootVagData['taraKont']?rootVagData['taraKont']:'',
                utiType:cont['utiType']?cont['utiType']:rootVagData['utiType']?rootVagData['utiType']:'',
                grpod:cont['grPodCont']?cont['grPodCont']:cont['grPodCont']?cont['grPodCont']: rootVagData['grPod']?rootVagData['grPod']:'',

                text: utiNT,
                who: 'cont',
                iconCls: 'cont3',
                expanded:true,
                style: {
                    'color': 'red'
                }
            });
            vagModel.appendChild(contModel);
            }

            // создаем груз
            var kgvnT= rootGruzData['kgvn']?rootGruzData['kgvn']:'',
                gruzModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    kgvn: kgvnT,
                    nzgr: rootGruzData['nzgr']?rootGruzData['nzgr']:'',
                    nzgrEu: rootGruzData['nzgrEu']?rootGruzData['nzgrEu']:'',
                    ekgvn: rootGruzData['ekgvn']?rootGruzData['ekgvn']:'',
                    enzgr: rootGruzData['enzgr']?rootGruzData['enzgr']:'',
                    massa: cont['netto']?cont['netto']:rootGruzData['massa']?rootGruzData['massa']:'',
                    upak:rootGruzData['upak']?rootGruzData['upak']:'',
                    places:cont['places']?cont['places']:rootGruzData['places']?rootGruzData['places']:'',

                    text: kgvnT,
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf:true
                });
            var plombObj;
            if(type==='uploadContsXLS') {
                contModel.appendChild(gruzModel);
                plombObj=contModel;
            }
            if(type==='uploadVagsXLS') {
                vagModel.appendChild(gruzModel);
                plombObj=vagModel;
            }

            if(cont['znak']) {
                for (var pl = 0; pl < cont['znak'].length; pl++)
                {
                    plombObj.plombsObj = {};
                    plombObj.plombsObj[pl]={hid:'',kpl:1,sort:pl,type:null,znak:cont['znak'][pl]};
                }
            }
        }

        // Выбираем первый вагон в дереве
        rootNode=this.getVgCtGrTree().getStore().getRootNode();
        if(rootNode.childNodes[0])
        {
            this.getVgCtGrTree().getSelectionModel().select(rootNode.childNodes[0]);
            this.getController('docs.VgCtGrTreeDetailController').onTreeNodeClick( this.getVgCtGrTree(),rootNode.childNodes[0]);
        }
    }
});

