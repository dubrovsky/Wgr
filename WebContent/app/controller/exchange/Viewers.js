Ext.define('TK.controller.exchange.Viewers', {
    extend: 'Ext.app.Controller',
    mixins: ['TK.controller.exchange.LockChecker'],

    iftminParam: 'IFTMIN',
    iftminBchParam: 'bch',
    iftminBtlcParam: 'btlc',

    init: function() {
        this.control({
            'docslist': {
                showIftmin: this.getIftminText,
                showAperak: this.getAperakText,
                showComnt: this.getComntText,
                showTbc: this.getTbcText,
                showTdgFts: this.getTdgFts,
                smgsListStatusChanged: this.smgsListStatusChanged,
                cimSmgsListStatusChanged: this.cimSmgsListStatusChanged
            }
        });
    },
    smgsListStatusChanged: function(grid) {
        this.tbcStatusCheck(grid);
        this.ftsStatusCheck(grid);

        var delBtn = grid.getDockedComponent('top').getComponent('del'),
            model = grid.getSelectionModel().getLastSelected();
        if(delBtn) {
            this.isStatusLocked(model.get('tbc'), model.get('status'), model.get('fts'), model.get('btlc'), model.get('tdgFts')) ?
                delBtn.disable() :
                delBtn.enable();
        }
    },
    cimSmgsListStatusChanged: function(grid) {
        this.ftsStatusCheck(grid);

        var delBtn = grid.getDockedComponent('top').getComponent('del'),
            model = grid.getSelectionModel().getLastSelected();

        if(delBtn) {
            this.isStatusLocked('', model.get('status'), model.get('fts'), model.get('btlc'), model.get('tdgFts')) ?
                delBtn.disable() :
                delBtn.enable();
        }
    },
    tbcStatusCheck: function(grid) {
        var tbc = grid.selModel.getLastSelected().get('tbc'),
            tbcBtn = grid.down('button[action="exchange"] menuitem[action="tbc"]'),
            tbcOutBtn = grid.down('button[action="exchange"] menuitem[action="tbc_out"]');

        switch (tbc) {
            case 8:  // ready
            case 5:
                if (tbcBtn)
                    tbcBtn.enable();
                if (tbcOutBtn)
                    tbcOutBtn.enable();
                break;
            case 1:   //send
            case 2:   // receive
            case 3:   // accepted
            case 4:   // done
                if (tbcBtn)
                    tbcBtn.disable();
                if (tbcOutBtn)
                    tbcOutBtn.enable();
                break;
            default :
                if (tbcBtn)
                    tbcBtn.disable();
                if (tbcOutBtn)
                    tbcOutBtn.disable();
                break;
        }
    },
    ftsStatusCheck: function(grid) {
        var fts = grid.selModel.getLastSelected().get('fts'),
            ftsBtn = grid.down('button[action="exchange"] menuitem[action="fts"]');

        switch (fts) {
            case 25:
                if (ftsBtn)
                    ftsBtn.enable();
                break;
            case 26:
                if (ftsBtn)
                    ftsBtn.disable();
                break;
            default :
                if (ftsBtn)
                    ftsBtn.disable();

        }
    },

    rendererIftmin: function (val, meta, rec/*, rowIndex, colIndex, store, view */) {
        var status = rec.data['status'];
        switch (status) {
            case 22:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'готов' + '</span>';
            case 23:
                return '<span style="color:red;white-space:normal;font-weight:bold;">' + 'отменена' + '</span>';
            case 37:
                return '<span style="color:#49080e;white-space:normal;font-weight:bold;">' + 'не принят' + '</span>';
            case 38:
                return '<span style="color:#a61120;white-space:normal;font-weight:bold;">' + 'не отправлен' + '</span>';
        }
        if (val) {
            var arr = val.split(','),
                markup = '';

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == 'Iftmin') {
                    markup += this.generateMarkup1(arr[i], 'showIftmin', rec.get('hid'), this.iftminBchParam);
                }
                else if (arr[i].indexOf('Contrl') != -1) {
                    markup += '<div>' + arr[i] + '</div>';
                }
                else if (arr[i] == 'Aperak') {
                    markup += this.generateMarkup1(arr[i], 'showAperak', rec.get('hid'), this.iftminBchParam);
                }
                else if (arr[i] == 'Comnt-') {
                    markup += this.generateMarkup1(arr[i], 'showComnt', rec.get('hid'), this.iftminBchParam);
                }
                else if (arr[i] == 'Comnt+') {
                    markup += '<div>' + arr[i] + '</div>';
                }
            }
            return markup;
        }
    },
    rendererBtlc: function (val, meta, rec) {
        var status = rec.data['btlc'];
        switch (status) {
            case 39:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'готов' + '</span>';
            case 40:
                return '<span style="color:red;white-space:normal;font-weight:bold;">' + 'отменена' + '</span>';
            case 42:
                return '<span style="color:#49080e;white-space:normal;font-weight:bold;">' + 'не принят' + '</span>';
            case 43:
                return '<span style="color:#a61120;white-space:normal;font-weight:bold;">' + 'не отправлен' + '</span>';
        }
        if (val) {
            var arr = val.split(','),
                markup = '';

            for (var i = 0; i < arr.length; i++) {
                if (arr[i] == 'Iftmin') {
                    markup += this.generateMarkup1(arr[i], 'showIftmin', rec.get('hid'), this.iftminBtlcParam);
                }
                else if (arr[i].indexOf('Contrl') != -1) {
                    markup += '<div>' + arr[i] + '</div>';
                }
                else if (arr[i] == 'Aperak') {
                    markup += this.generateMarkup1(arr[i], 'showAperak', rec.get('hid'), this.iftminBtlcParam);
                }
                else if (arr[i] == 'Comnt-') {
                    markup += this.generateMarkup1(arr[i], 'showComnt', rec.get('hid'), this.iftminBtlcParam);
                }
                else if (arr[i] == 'Comnt+') {
                    markup += '<div>' + arr[i] + '</div>';
                }
            }
            return markup;
        }
    },
    rendererTdg: function (status, meta, rec) {
        switch (status) {
            case 44:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'готов' + '</span>';
            case 45:
                return '<span style="color:red;white-space:normal;font-weight:bold;">' + 'отменена' + '</span>';
            case 47:
                return '<span style="color:#49080e;white-space:normal;font-weight:bold;">' + 'не отправлен' + '</span>';
            case 48:
                return '<span style="color:#a61120;white-space:normal;font-weight:bold;">' + 'не принят' + '</span>';
            case 46:
                if(rec.data['tdgFts1']){ //
                    if(!rec.data['tdgFtsHid']){
                        return '<span style="color:blue;white-space:normal;font-weight:bold;">' + rec.data['tdgFts1'] + '</span>';
                    } else {
                        return this.generateMarkup1(rec.data['tdgFts1'], 'showTdgFts', rec.get('tdgFtsHid'));
                    }
                } else {
                    return '<span style="color:gold;white-space:normal;font-weight:bold;">' + 'отправлен' + '</span>';
                }
            default :
                return '';
        }
    },
    getIftminText: function(hid, type, typeIftmin) {
        var me = this;
        var win = new Ext.Window({
            title: 'Iftmin',
            width: 700,
            height: 500,
            y: 1,
            modal: true,
            autoScroll: true,
            maximizable: true,
            bodyStyle: 'word-wrap: break-word;white-space: pre;',
            loader: {
                url: "SmgsIftmin_iftminText.do",
                autoLoad: true,
                params: {
                    "search.hid": hid, "search.docType":type, "search.code":typeIftmin
                },
                callback: function (el, success, response) {
                    if (!success) {
                        TK.Utils.makeErrMsg(response, me.errorMsg);
                    }
                }
            }/*,
             buttons: [{
             text: 'Закрыть',
             handler: function () {
             win.close();
             }
             }]*/
        });
        win.show();
    },
    getTdgFts: function(hid) {
        var me = this;
        new Ext.Window({
            title: 'ТДГ',
            width: 400,
            height: 100,
            y: 1,
            modal: true,
            autoScroll: true,
            maximizable: true,
            autoShow: true,
            bodyStyle: 'word-wrap: break-word;white-space: pre;',
            loader: {
                url: "Tdg_showTextMsg.do",
                autoLoad: true,
                params: {
                    "search.hid": hid
                },
                callback: function (el, success, response) {
                    if (!success) {
                        TK.Utils.makeErrMsg(response, me.errorMsg);
                    }
                }
            }
        });
    },
    getAperakText: function(hid, type, typeIftmin) {
        var win = new Ext.Window({
            title: 'Aperak',
            width: 700,
            y: 1,
            modal: true,
            autoHeight: true,
            layout: 'fit',
            maximizable: true,
            items: {
                xtype:'grid',
                columnLines: true,
                enableColumnHide:false,
                enableColumnMove:false,
                sortableColumns:false,
                store: Ext.create('Ext.data.Store', {
                    fields: ['errText2', 'errText', 'hid'],
                    proxy: {
                        type: 'ajax',
                        url: 'SmgsIftmin_aperakText.do',
                        reader: {
                            type: 'json',
                            root: 'rows',
                            idProperty: 'hid'
                        },
                        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                    }
                }),
                columns: {
                    items:[
                        { header: 'Род ошибки',  dataIndex: 'errText2', flex: 1, renderer: TK.Utils.renderLongStr },
                        { header: 'Ошибки', dataIndex: 'errText', flex: 1, renderer: TK.Utils.renderLongStr }
                    ],
                    defaults:{}
                }
            }
        });
        win.show();
        win.getComponent(0).getStore().load({params: {"search.hid": hid, "search.docType":type, "search.code":typeIftmin}});
    },
    getComntText: function(hid) {
        var win = new Ext.Window({
            title: 'Comnt',
            width: 700,
            y: 1,
            modal: true,
            autoHeight: true,
            layout: 'fit',
            maximizable: true,
            items: {
                xtype:'grid',
                columnLines: true,
                enableColumnHide:false,
                enableColumnMove:false,
                sortableColumns:false,
                store: Ext.create('Ext.data.Store', {
                    fields: ['seg', 'text', 'hid'],
                    proxy: {
                        type: 'ajax',
                        url: 'SmgsIftmin_comntText.do',
                        reader: {
                            type: 'json',
                            root: 'rows',
                            idProperty: 'hid'
                        },
                        listeners: {exception: function(proxy, response, operation) {TK.Utils.makeErrMsg(response, 'Внимание! Ошибка загрузки списка...');}}
                    }
                }),
                columns: {
                    items:[
                        { header: 'Графа',  dataIndex: 'seg', flex: 1},
                        { header: 'Замечание', dataIndex: 'text', flex: 3, renderer: TK.Utils.renderLongStr }
                    ],
                    defaults:{}
                }
            }
        });
        win.show();
        win.getComponent(0).getStore().load({params: {"search.hid": hid}});
    },
    rendererFts: function (status, meta, rec) {
        switch (status) {
            case 25:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'Готов' + '</span>';
            case 26:
                return '<span style="color:red;white-space:normal;font-weight:bold;">' + 'Отменен' + '</span>';
            case 27:
                return '<div style="white-space:normal;">Отправлен</div>';
            case 28:
                return '<div style="white-space:normal;">Получен</div>';
            case 29:
                return '<div style="white-space:normal;">Обработан</div>';
            case 30:
                return '<div style="white-space:normal;">Получен регистрационный номер</div>';
            case 31:
                return '<div style="white-space:normal;">Повторно отправлен</div>';
            case 32:
                return '<div style="white-space:normal;">Аннулирование отправки</div>';
            case 33:
                return '<div style="white-space:normal;">Ошибка проверки ЭЦП</div>';
            case 34:
                return '<div style="white-space:normal;">Ошибка обработки в ФТС</div>';
            default :
                return '';
        }
    },
    rendererGreenRail: function (status, meta, rec) {
        switch (status) {
            case 49:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'Отправлен' + '</span>';
            default :
                return '';
        }
    },
    rendererTbc: function(status, meta, rec) {
        var func = 'getTbcText';
        switch(status)
        {
            case 8:
                return '<span style="color:green;white-space:normal;font-weight:bold;">' + 'готов' + '</span>';
            case 9:
                return '<span style="color:red;white-space:normal;font-weight:bold;">' + 'отменена' + '</span>';
            case 1:
                return this.generateMarkup1('отправлен', 'showTbc', rec.get('packId'));
            case 2:
                return this.generateMarkup1('получен', 'showTbc', rec.get('packId'));
            case 3:
                return this.generateMarkup1('принят', 'showTbc', rec.get('packId'));
            case 4:
                return this.generateMarkup1('обработан', 'showTbc', rec.get('packId'));
            case 5:
                return this.generateMarkup1('отклонен', 'showTbc', rec.get('packId'));
            default :
                return '';
        }
    },
    getTbcText: function(packId){
        var me = this;
        var win = new Ext.Window({
            title: 'ТБЦ',
            width: 600,
            height: 500,
            y: 1,
            modal: true,
            autoScroll: true,
            maximizable: true,
            bodyStyle: 'word-wrap: break-word;white-space: pre;',
            autoLoad: {
                url: "SmgsIftmin_tbcText.do",
                params: {
                    "search.hid": packId
                },
                callback: function (el, success, response) {
                    if (!success) {
                        TK.Utils.makeErrMsg(response, me.errorMsg);
                    }
                }
            },
            buttons: [{
                text: 'Закрыть',
                handler: function () {
                    win.close();
                }
            }]
        });
        win.show();
    },
    /*generateMarkup: function(text, funcToCall, param1ForFunc, param2ForFunc, param3ForFunc) {

        if(param2ForFunc === undefined && param3ForFunc === undefined){
            return Ext.String.format(
                '<div class="view_tbc" onclick="TK.app.getController(\'{0}\').{1}({2})">{3}</div>',
                this.controllerName,
                funcToCall,
                param1ForFunc,
                text
            );
        } else {
            return Ext.String.format(
                '<div class="view_tbc" onclick="TK.app.getController(\'{0}\').{1}({2},\'{3}\',\'{4}\')">{5}</div>',
                this.controllerName,
                funcToCall,
                param1ForFunc,
                param2ForFunc,
                param3ForFunc,
                text
            );
        }

    },*/
    generateMarkup1: function(text, fireEvent, hid, iftminDirection) {
        if(iftminDirection === undefined){
            return Ext.DomHelper.markup({
                tag: 'div',
                cls: 'view_tbc',
                html: text,
                onclick: Ext.String.format('Ext.ComponentQuery.query(\'docslist\')[0].fireEvent(\'{0}\', \'{1}\')',
                    fireEvent,
                    hid
                )
            });
        } else {
            return Ext.DomHelper.markup({
                tag: 'div',
                cls: 'view_tbc',
                html: text,
                onclick: Ext.String.format('Ext.ComponentQuery.query(\'docslist\')[0].fireEvent(\'{0}\', \'{1}\', \'{2}\', \'{3}\')',
                    fireEvent,
                    hid,
                    this.iftminParam,
                    iftminDirection
                )
            });
        }
    },
    rendererLockedExch: function(val, meta, model) {
        var locked = this.isStatusLocked(model.get('tbc'), model.get('status'), model.get('fts'), model.get('btlc'), model.get('tdgFts'));
        if (locked) {
            return '<span class="locked">' + val + '</span>';
        } else {
            return val;
        }
    }

});
