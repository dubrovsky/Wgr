Ext.define('TK.controller.Doc2Doc', {
    extend: 'Ext.app.Controller',
    mixins: [
        'TK.controller.Utils'
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
        this.control({
            'smgslist button[action="doc2doc"] menuitem[action="smgs2invoice"]': {
                click: this.onSmgs2Invoice
            },
            'smgslist button[action="doc2doc"] menuitem[action="doc2smgs_invoice"]': {
                click: this.onSmgs2Invoice
            },
            'docslist button[action="doc2doc"] menuitem[action="contsListSmgs"]': {
                click: this.onContList
            },
            'docslist button[action="doc2doc"] menuitem[action="contsListCimSmgs"]': {
                click: this.onContList
            },
            'cimsmgslist button[action="doc2doc"] menuitem[action="dopList"]': {
                click: this.onDopList
            }
        });
    },
    onSmgs2Invoice: function(btn){
        var list = btn.up('grid'),
            selectedModels,
            params = {},
            win, filefield, onChange;

        if(btn.action == 'doc2smgs_invoice') { // Excel to invoice & smgs
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
    onContList: function(btn){
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
                iconCls:'conts',
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
                            params: {type: store.getAt(1).get('type'), docId: store.getAt(1).get('src'), 'search.routeId': store.getAt(1).get('routeId'), groupBy:groupBy},
                            waitMsg: 'Загрузка',
                            scope: this,
                            success: function(form1, action) {

                                window.open('Doc2Doc_download.do?' +
                                    'search.npoezd=' + form1.findField('search.npoezd').getValue() + '&type=' + store.getAt(1).get('type')+
                                    '&docId=' + store.getAt(1).get('src') + '&token=1&'+'groupBy=' + groupBy +
                                    '&search.routeId=' + store.getAt(1).get('routeId') + '&search.docType=' + docType,
                                    '_self','');
                                win.close();
                                me.runProgressBar4LongOperation();

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
                            params: {'search.type': store.getAt(1).get('type'), 'search.docId': store.getAt(1).get('src'), 'search.routeId': store.getAt(1).get('routeId'), groupBy: groupBy, status:10},
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
            }
        /*,toolbar*/;

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
    onDopList: function(btn){
        var grid = btn.up('docslist');
        if(!TK.Utils.isRowSelected(grid)){
            return false;
        }

        var store = grid.getStore(),
            groupBy = 9,
            docType = 'filecimsmgs',
            hid = grid.selModel.getLastSelected().get('hid');

        window.open('Doc2Doc_downloadExcel.do?' +
            'type=' + store.getAt(1).get('type')+
            '&hid=' + hid +
            '&docId=' + store.getAt(1).get('src') +
            '&groupBy=' + groupBy +
            '&search.routeId=' + store.getAt(1).get('routeId') +
            '&search.docType=' + docType,
            '_self','');

        this.runProgressBar4LongOperation();
    }
});
