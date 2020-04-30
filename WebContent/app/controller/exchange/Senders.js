Ext.define('TK.controller.exchange.Senders', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.form.Panel',
        'Ext.form.field.Date',
        'Ext.form.field.File',
        'Ext.form.field.Hidden',
        'Ext.form.field.Text',
        'Ext.layout.container.Fit',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator',
        'Ext.toolbar.Toolbar',
        'Ext.window.Window',
        'TK.Utils'
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

    init: function () {
        this.control({
            'docslist button[action="exchange"] menuitem[action="tbc"]': {
                click: this.sendTBC
            },
            'docslist button[action="exchange"] menuitem[action="tbc_out"]': {
                click: this.sendTBCOut
            },
            'docslist button[action="exchange"] menuitem[action="tbc_in"]': {
                click: this.sendTBCIn
            },
            'docslist button[action="exchange"] menuitem[action="iftmin"]': {
                click: this.sendIftmin
            },

            'docslist button[action="exchange"] menuitem[action="iftmin_db_out"]': {
                click: this.sendIftminDBOut
            },
            'cimsmgslist button[action="exchange"] menuitem[action="xml_db_out"]': {
                click: this.sendXmlDBOut
            },
            'cimsmgslist button[action="exchange"] menuitem[action="iftmin_97a_rzd_out"]': {
                click: this.sendIftmin97aRzdOut
            },
            'smgs2list button[action="exchange"] menuitem[action="xml_db_out"]': {
                click: this.sendXmlDBOut
            },
            'smgs2list button[action="exchange"] menuitem[action="iftmin_97a_rzd_out"]': {
                click: this.sendIftmin97aRzdOut
            },

            'docslist button[action="exchange"] menuitem[action="iftmin_db_in"]': {
                click: this.sendIftminDBIn
            },
            'docslist button[action="exchange"] menuitem[action="fts"]': {
                click: this.sendFts
            },
            'docslist button[action="exchange"] menuitem[action="btlc"]': {
                click: this.sendBtlc
            },
            'docslist button[action="exchange"] menuitem[action="tdgFts"]': {
                click: this.sendTdg
            },
            'docslist button[action="exchange"] menuitem[action="tdgFts_out"]': {
                click: this.sendTdgOut
            } ,
            'docslist button[action="exchange"] menuitem[action="greenrail"]': {
                click: this.sendGreenRail
            },
            'docslist button[action="exchange"] menuitem[action="unload_5_12"]': {
                click: this.unload_5_12
            }
        });
    },
    unload_5_12: function(btn) {
        var list = btn.up('grid');
        if (!TK.Utils.isRowSelected(list)) {
            return;
        }
        var hid_cs = list.selModel.getLastSelected().get('hid');
        window.open('Astana1_unLoad_5_12.do?' + 'hid_cs=' + hid_cs, '_blank', '');
    },
    sendGreenRail: function(btn){
        var grid = btn.up('docslist'),
            store = grid.getStore();

        if(store && store.count() > 0 ) {
            var model = store.first();
            var win = Ext.widget('window', {
//                title: this.titleContList,
                width: 400, y:0,
                autoShow: true,
                modal:true,
                items: {
                    xtype:'form',
                    bodyPadding: 10,
                    items: [
                        {xtype:'textfield', fieldLabel:this.labelWagenNums, name:'search.npoezd', maxLength:32, width:350, allowBlank:false}
                    ],
                    buttons: [{
                        text:'OK',
                        formBind: true,
                        scope: this,
                        handler: function(btn1){
                            var form = btn1.up('form').getForm();

                            if(form.isValid()){
                                win.setLoading(true);
                                form.submit({
                                    url: 'GreenRail_send.do',
                                    params: {'search.type': model.get('type'), 'search.routeId': model.get('routeId')},
                                    scope: this,
                                    success: function(form1, action) {
                                        win.setLoading(false);
                                        win.close();
                                        Ext.Msg.show({title: this.showTitle,msg: action.result['msg'], buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                        store.load();
                                    }
                                    ,failure: function (form, action) {
                                        win.setLoading(false);
                                        if(action.result && action.result['err']){
                                            Ext.Msg.show({title: this.showTitle,msg: action.result['err'], buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                                        } else {
                                            TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                        }
                                    }
                                });
                            }
                        }
                    },{
                        text:this.btnClose,
                        handler: function(){
                            win.close();
                        }
                    }]
                }
            });

        } else {
            Ext.Msg.show({title: 'Ошибка', msg: 'Нет документов в данном маршруте', buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
        }
    },
    sendTBC: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data;
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'SmgsIftmin_sendTBC.do',
            params: {'hid': data['packId'], 'status':18, 'smgs.hid':data['hid']},
            scope:this,
            success: function (response, options) {
                if(Ext.decode(response.responseText).success){
                    Ext.Msg.show({title: this.showTitle,msg: this.showMsg1, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                    list.store.load();
                } else {
                    Ext.Msg.show({title: this.showTitle,msg: this.showMsg2, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                }
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    sendTBCOut: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var model = list.selModel.getLastSelected();
        window.open(
            'SmgsIftmin_sendTBCOut.do?' +
                'status=36&' +
                'hid=' + model.get('packId') + '&' +
                'smgs.hid=' + model.get('hid'),
            '_self',''
        );
    },

    sendXmlDBOut: function(btn){
       this.sendIftminOut(btn, 2);
    },

    sendIftmin97aRzdOut: function(btn){
        this.sendIftminOut(btn, 3);
    },

    sendIftminDBOut: function(btn){
        this.sendIftminOut(btn, 1);
    },

    sendIftminOut: function(btn, type){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var model = list.selModel.getLastSelected();
        window.open(
            'SmgsIftmin_sendIftminDBOut.do?' +
            'hid_cs=' + model.get('hid') + '&type=' + type,
            '_self',''
        );
    },

    sendIftminDBIn: function(btn){
        var list = btn.up('grid');
         /*if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var model = list.selModel.getLastSelected();*/
        var routeId = this.getMenutree().lastSelectedLeaf.id.split('_')[2],
        win = Ext.widget('window', {
            title: 'Загрузка Iftmin',
            width: 500, y:0,
            autoShow: true,
            modal:true,
            items: {
                xtype:'form',
                bodyPadding: 10,
                items: [
                    {xtype: 'filefield', emptyText: 'Выбор файла для загрузки...', fieldLabel: 'Файл', name: 'upload', buttonText: 'Обзор...', anchor: '100%', allowBlank: false, labelWidth: 50},
                    {xtype: 'hidden', name:'route.hid', value: routeId}
                ],
                buttons: [{
                    text: this.btnSave,
                    handler: function(btn) {
                        var form = btn.up('form').getForm();
                        if(form.isValid()){
                            form.submit({
                                url: 'SmgsIftmin_sendIftminDBIn.do',
                                waitMsg: 'Загрузка',
                                scope: this,
                                success: function(form, action) {
                                    win.close();
                                    Ext.Msg.show({title: 'Операция прошла успешно',msg: 'Iftmin успешно загружен', buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                    list.getStore().reload();
                                }
                                ,failure: function(form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    }
                }]
            }
        });

    },

    sendTBCIn: function(btn1){
        var routeId = this.getMenutree().lastSelectedLeaf.id.split('_')[2],
            win = Ext.widget('window', {
                title: 'Загрузка ТБЦ',
                width: 500, y:0,
                autoShow: true,
                modal:true,
                items: {
                    xtype:'form',
                    bodyPadding: 10,
                    items: [
                        {xtype: 'filefield', emptyText: 'Выбор файла для загрузки...', fieldLabel: 'Файл', name: 'upload', buttonText: 'Обзор...', anchor: '100%', allowBlank: false, labelWidth: 50},
                        {xtype: 'hidden', name:'route.hid', value: routeId}
                    ],
                    buttons: [{
                        text: this.btnSave,
                        handler: function(btn) {
                            var form = btn.up('form').getForm();
                            if(form.isValid()){
                                form.submit({
                                    url: 'File_uploadTBC.do',
                                    waitMsg: 'Загрузка',
                                    scope: this,
                                    success: function(form, action) {
                                        win.close();
                                        Ext.Msg.show({title: 'Операция прошла успешно',msg: 'ТБЦ успешно загружен', buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                        btn1.up('grid').store.load();
                                    }
                                    ,failure: function(form, action) {
                                        TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                    }
                                });
                            }
                        }
                    }]
                }
            });
    },
    sendFts: function(btn){
        var store = btn.up('gridpanel').store, me = this;
        var model = store.first();
        var win = Ext.create('Ext.window.Window',{
            title: this.titleFTS,
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
                    {xtype:'textfield', fieldLabel:this.labelWagenNum, name: 'npoezd', maxLength:32},
                    {xtype:'textfield', fieldLabel:this.labelWagenInd, name: 'index_p', maxLength:32},
                    {xtype:'textfield', fieldLabel:this.labelPPVInd, name: 'n_ppv', maxLength:32},
                    {xtype:'datefield', fieldLabel:this.labelInputDate, name: 'dprb', maxLength:32, width:80}
                ],
                dockedItems: [{
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: ['->','-',{
                        text: this.btnSave
                        ,handler: function(btn){
                            var fields = this.up('form').getForm().getValues();
                            Ext.Ajax.request({
                                url: 'SmgsIftmin_saveFts.do',
                                params: {'smgs.type': model.get('type'), 'smgs.route.hid': model.get('routeId'), 'smgs.npoezd': fields.npoezd, 'smgs.index_p':fields.index_p, 'smgs.n_ppv':fields.n_ppv, 'smgs.dprb':fields.dprb},
                                scope:this,
                                success: function (response, options) {
                                    if(Ext.decode(response.responseText).success){
                                        Ext.Msg.show({title: me.showTitle,msg: me.showMsg3, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                    } else {
                                        Ext.Msg.show({title: me.showTitle,msg: me.showMsg2, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                                    }
                                },
                                failure: function (response, options) {
                                    TK.Utils.makeErrMsg(response, me.errorMsg);
                                }
                            });

                        }},'-'
                        ,{
                            text: this.btnExport
                            ,handler: function(btn){
                                var fields = this.up('form').getForm().getValues();
                                Ext.Ajax.request({
                                    url: 'SmgsIftmin_sendFts.do',
                                    params: {'smgs.type': model.get('type'), 'smgs.route.hid': model.get('routeId'), 'smgs.npoezd': fields.npoezd, 'smgs.index_p':fields.index_p, 'smgs.n_ppv':fields.n_ppv, 'smgs.dprb':fields.dprb},
                                    scope:this,
                                    success: function (response, options) {
                                        if(Ext.decode(response.responseText).success){
                                            Ext.Msg.show({title: me.showTitle,msg: me.showMsg1, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                                            this.up('window').close();
                                            store.load();
                                        } else {
                                            Ext.Msg.show({title: me.showTitle,msg: me.showMsg2, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                                        }
                                    },
                                    failure: function (response, options) {
                                        TK.Utils.makeErrMsg(response, me.errorMsg);
                                    }
                                });

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
    /*sendFts: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var data = list.selModel.getLastSelected().data;
        this.getCenter().getEl().mask(this.maskMsg,'x-mask-loading');
        Ext.Ajax.request({
            url: 'SmgsIftmin_sendFts.do',
            params: {'hid': data['packId'], 'status':27, 'smgs.hid':data['hid']},
            scope:this,
            success: function (response, options) {
                if(Ext.decode(response.responseText).success){
                    Ext.Msg.show({title: this.showTitle,msg: this.showMsg1, buttons: Ext.Msg.OK, icon: Ext.Msg.INFO});
                    list.store.load();
                } else {
                    Ext.Msg.show({title: this.showTitle,msg: this.showMsg2, buttons: Ext.Msg.OK, icon: Ext.Msg.ERROR});
                }
                this.getCenter().getEl().unmask();
            },
            failure: function (response, options) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },*/
    sendIftmin: function(btn){
        var list = btn.up('grid'),
            model = list.store.first();
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'SmgsIftmin_send.do',
            params: {'smgs.type': model.get('type'), 'smgs.route.hid': model.get('routeId'), 'status':24},
            scope:this,
//            timeout: 1000,
            success: function (response, options) {
                this.getCenter().getEl().unmask();
                var text = Ext.decode(response.responseText);
                if (text.success) {
                    Ext.Msg.show({title: 'Внимание',msg: text.msg,buttons: Ext.Msg.OK,icon: Ext.Msg.INFO,
                        fn: function () {list.store.load();}, scope:this
                    });
                } else {
                    Ext.Msg.show({title: 'Внимание',msg: 'Не удалось отправить IFTMINы(инвойсы) - ' + text.err,buttons: Ext.Msg.OK,icon: Ext.Msg.ERROR/*,
                     fn: function () {list.store.load();}*/});
                }
            },
            failure: function (response) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    sendBtlc: function(btn){
        var list = btn.up('grid'),
            model = list.store.first(),
            btlcSendedStatus = 41;
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Btlc_sendBtlc.do',
            params: {'smgs.type': model.get('type'), 'smgs.route.hid': model.get('routeId'), 'status': btlcSendedStatus},
            scope:this,
            success: function (response, options) {
                this.getCenter().getEl().unmask();
                var text = Ext.decode(response.responseText);
                if (text.success) {
                    Ext.Msg.show({title: 'Внимание',msg: text.msg,buttons: Ext.Msg.OK,icon: Ext.Msg.INFO,
                        fn: function () {list.store.load();}, scope:this
                    });
                } else {
                    Ext.Msg.show({title: 'Внимание',msg: 'Не удалось отправить документы - ' + text['err'],buttons: Ext.Msg.OK,icon: Ext.Msg.ERROR/*,
                     fn: function () {list.store.load();}*/});
                }
            },
            failure: function (response) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    sendTdg: function(btn){
        var list = btn.up('grid'),
            model = list.store.first();
        this.getCenter().getEl().mask(this.maskMsg);
        Ext.Ajax.request({
            url: 'Tdg_send.do',
            params: {'smgs.type': model.get('type'), 'smgs.route.hid': model.get('routeId')},
            scope:this,
            success: function (response, options) {
                this.getCenter().getEl().unmask();
                var text = Ext.decode(response.responseText);
                if (text.success) {
                    Ext.Msg.show({title: 'Внимание',msg: text.msg,buttons: Ext.Msg.OK,icon: Ext.Msg.INFO,
                        fn: function () {list.store.load();}, scope:this
                    });
                } else {
                    Ext.Msg.show({title: 'Внимание',msg: 'Не удалось отправить документы - ' + text['err'],buttons: Ext.Msg.OK,icon: Ext.Msg.ERROR/*,
                     fn: function () {list.store.load();}*/});
                }
            },
            failure: function (response) {
                this.getCenter().getEl().unmask();
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });
    },
    sendTdgOut: function(btn){
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return;
        }
        var model = list.selModel.getLastSelected();
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'Tdg_sendOut.do',
            params: {hid: model.get('hid')},
            scope:this,
            success: function (response, options) {
                this.getCenter().setLoading(false);
                Ext.Msg.show({title: 'Внимание',msg: 'Идет обрабока запроса',buttons: Ext.Msg.OK,icon: Ext.Msg.INFO,
                    fn: function () {list.getStore().reload();}, scope:this
                });
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, this.errorMsg);
            }
        });

        /*window.open(
            Ext.String.format('Tdg_sendOut.do?hid={0}', model.get('hid')),
            '_self'
        );*/
    }

});
