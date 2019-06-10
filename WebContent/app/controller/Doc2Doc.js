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
        'TK.view.edit.UploadDoc9FormWin',
        'TK.view.edit.UploadPogruzListFormWin',
        'TK.view.pogruz.Map2BaseSelectForm',
        'TK.view.pogruz.PoezdSelectForm'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref: 'menutree',
        selector: 'viewport > menutree'
    },{
        ref: 'uploadDoc9Form',
        selector: 'uploadDoc9FormWin > form'
    },{
        ref: 'uploadPogruzListForm',
        selector: 'uploadPogruzListFormWin > form'
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
            'cimsmgslist button[action="doc2doc"] menuitem[action="dopList"]': {
                click: this.dopListOnList
            },
            'cimsmgslist button[action="doc2doc"] menuitem[action="uploadPogruzList"]': {
                click: this.uploadPogruzList
            },
            'cimsmgslist button[action="doc2doc"] menuitem[action="uploadPogruzListTrain"]': {
                click: this.uploadPogruzListTrain
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
            'uploadDoc9FormWin button[action="upload"]': {
                click: this.onUploadDoc9
            },
            'uploadPogruzListFormWin button[action="upload"]': {
                click: this.onUploadDocMapPeregruz
            }
        });
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
    onContListOnForm: function(btn){
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

        this.contsList(data);
    },
    contsList: function(data) {
        window.open(
            'Doc2Doc_download.do?' +
            'search.npoezd=' + (data['npoezd'] ? data['npoezd'] : '') +
            '&hid=' + (data['hid'] ? data['hid'] : '') +
            '&type=' + data['type']+
            '&docId=' + data['docId'] +
            '&token=1' +
            '&groupBy=7' +
            '&search.routeId=' + data['routeId'] +
            '&search.docType=filecimsmgs',
            '_self','');
        this.runProgressBar4LongOperation();
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

        this.getUploadPogruzListForm().getForm().findField('hid_cs').setValue(grid.getSelectionModel().getLastSelected().get('hid'));
        this.getUploadPogruzListForm().getForm().findField('name').setValue('');
        win.parent=this;
        win.show();
    },
    /**
     * Shows train find window to upload Pogruz list
     * @param btn
     */
    uploadPogruzListTrain:function(btn)
    {
        var win= Ext.create('TK.view.pogruz.PoezdSelectForm');
        var routeId=btn.up('docslist').getStore().getAt(0).get('routeId');
        var type=btn.up('docslist').getStore().getAt(0).get('type');

        win.parent=this;
        win.routeId=routeId;
        win.type=type;
        var btn= Ext.ComponentQuery.query('#poezdSeltopTBar > #buttonTrSrch')[0];
        btn.fireHandler();
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
                    // console.log(Ext.decode(action.response.responseText.replace('success: true,','')));
                    var win= Ext.create('TK.view.pogruz.Map2BaseSelectForm');
                    win.parent=this;
                    // decoding response and load to store of result table.
                    win.localStore.loadRawData(Ext.JSON.decode(action.response.responseText.replace('success: true,','')));
                      // win.localStore.load();
                    win.show();
                    this.getUploadPogruzListForm().up('window').close();
                    // Ext.Msg.show({
                    //         title: this.successMsgTitle,
                    //         msg: 'Ok',
                    //         buttons: Ext.Msg.OK,
                    //         icon: Ext.Msg.INFO,
                    //         scope: this,
                    //         fn: function(){
                    //             this.getUploadPogruzListForm().up('window').close();
                    //         }
                    // });
                },
                failure: function (form, action) {
                    this.getUploadPogruzListForm().setLoading(false);
                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                }
            });
        }

    }
});
