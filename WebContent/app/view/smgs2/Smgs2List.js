Ext.define('TK.view.smgs2.Smgs2List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.smgs2list',
    mixins: {
        exchange: 'TK.controller.exchange.Viewers'
    },
    itemId: 'smgs2listMain',
    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],

    selModel: {mode: 'MULTI'},
    buildStore: function (config) {
        config.store = 'Smgses';
    },
    buildColumns: function (config) {
        config.columns = {
            items: [
                {
                    text: this.headerID,
                    dataIndex: 'hid',
                    renderer: this.rendererLockedExch, /*flex:1, maxWidth:90, minWidth:70*/
                    width: 72
                },
                // {text: '!Дата', dataIndex: 'dattr', renderer: TK.Utils.renderLongStr, width: 85},
                {
                    text: this.headerCreation, columns:
                        [
                            {
                                text: this.headerDateTime,
                                dataIndex: 'altered',
                                renderer: TK.Utils.renderLongStr,
                                width: 85
                            },
                            {text: this.headerUser, dataIndex: 'un', renderer: this.rendererUn, width: 80}
                        ]
                },
                {text: 'Сообщения', dataIndex: 'messCount', width: 80, renderer: TK.Utils.renderMessCount},
                {text: 'Att', dataIndex: 'newDoc', width: 28, renderer: this.rendererNewDoc}
            ],
            defaults: {}
        };
        if (tkUser.hasPriv('CIM_DOC2DOC')) {
            config.columns.items.push({
                text: this.headerInv,
                dataIndex: 'invQty',
                width: 60,
                renderer: this.renderInvQty
            });
        }

        config.columns.items.push(
            {text: this.headerVagVed, dataIndex: 'vagVedNum', width: 70, renderer: this.rendererVagVed},
            {text: this.headerSmgs, dataIndex: 'numClaim', width: 70, renderer: this.rendererPrint},
            {text: this.headerVagNum, dataIndex: 'vags', width: 95, renderer: TK.Utils.renderLongStr},
            {text: this.headerContNum, dataIndex: 'konts', width: 95, renderer: TK.Utils.renderLongStr},
            {text: this.headerSenderName, dataIndex: 'g1', minWidth: 150, flex: 1, renderer: TK.Utils.renderLongStr},
            {text: this.headerReceiverName, dataIndex: 'g4', minWidth: 120, flex: 1, renderer: TK.Utils.renderLongStr}
        );

        if (tkUser.hasPriv('CIM_DOC2DOC') || tkUser.hasPriv('CIM_ADD_AVISO2DOC')) {
            config.columns.items.push({
                text: this.headerNPoezd, dataIndex: 'npoezd', width: 85, renderer: TK.Utils.renderLongStr,
                beforeRender: function () {
                    this.getMenu().add({});
                }
            });
        }

        if (tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')) {
            var length = config.columns.items.push({
                text: this.btnExch,
                columns: []
            });

            var exchangeMenu = config.columns.items[length - 1].columns;

            if (tkUser.hasPriv('CIM_IFTMIN')) {
                exchangeMenu.push(
                    {
                        text: this.headerExchTBC,
                        dataIndex: 'tbc',
                        width: 80,
                        renderer: this.rendererTbc1
                    }, {
                        text: this.headerExchBch,
                        dataIndex: 'iftmin',
                        width: 80,
                        renderer: this.rendererIftmin
                    }/*, {
                        text: this.btnExchFTS,
                        dataIndex: 'fts',
                        width: 40,
                        renderer: this.rendererFts
                    }*/
                );
            }

            if (tkUser.hasPriv('CIM_BTLC')) {
                exchangeMenu.push(
                    {
                        text: this.btnExchBTLC,
                        dataIndex: 'iftminBtlc',
                        width: 80,
                        renderer: this.rendererBtlc
                    }
                );
            }

            if (tkUser.hasPriv('CIM_TDG')) {
                exchangeMenu.push(
                    {
                        text: this.btnExchTdgFTS,
                        dataIndex: 'tdgFts',
                        width: 80,
                        renderer: this.rendererTdg
                    }
                );
            }

            if (tkUser.hasPriv('CIM_GREENRAIL')) {
                exchangeMenu.push(
                    {
                        text: 'GreenRail',
                        dataIndex: 'greenRail',
                        width: 80,
                        renderer: this.rendererGreenRail
                    }
                );
            }
        }
        
        config.columns.items.push(
            {text: this.headerAvisoNum, dataIndex: 'aviso', width: 70}
        );
    },

    buildTopToolbar: function (config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            layout: 'column',
            itemId: 'top',
            items: [
                {
                    text: this.btnStat,
                    iconCls: 'filter',
                    action: 'filter',
                    itemId: 'local',
                    forDeleted: true,
                    forPresent: true
                },
                {xtype: 'tbseparator', itemId: 'filter1', forDeleted: true, forPresent: true},
                {
                    xtype: 'splitbutton', text: this.btnPrint, iconCls: 'pdf_blank_off', action: 'print',
                    menu: [
                        {text: this.btnPrint, action: 'print', iconCls: 'pdf_blank_off'},
                        {text: this.groupPrint, action: 'groupPrintTmpl', iconCls: 'pdfs_blank_off'},
                        {text: this.btnBindPrint, action: 'bindPrintTmpl', iconCls: 'bind'},
                        {text: this.btnSelectPrint, action: 'selectPrintTmpl', iconCls: 'select'}
                    ]
                }, '-',
                // {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {
                    xtype: 'splitbutton', text: this.btnCreate, iconCls: 'doc_new', action: 'create',
                    menu: [
                        {text: this.btnCont, action: 'createCont', iconCls: 'doc_new'},
                        {text: this.btnVag, action: 'createVag', iconCls: 'doc_new'}
                    ]
                }, '-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {
                    xtype: 'splitbutton', text: this.btnCopy, iconCls: 'copy', action: 'copy',
                    menu: [
                        {text: this.btnCopy, action: 'copy', iconCls: 'copy'},
                        //копировать документ в шаблон
                        {text: this.btnCopyAviso, action: 'copy2aviso', iconCls: 'copy'},
                        {text: this.btnCopySelect, action: 'showCopySelectedWin', iconCls: 'copySelected'},
                        //скопировать в архив выбранное
                        {text: this.btnCopy2ArchSel, action: 'copy2archSel', iconCls: 'archive'},
                        //скопировать в архив по номеру позде
                        {text: this.btnCopy2ArchTrN, action: 'copy2arch', iconCls: 'archive'},
                        //перенести/скопировать в другой маршрут выбранное
                        {text: this.btnCopy2RouteSel, action: 'copy2routeSel', iconCls: 'routes'},
                        //перенести/скопировать в другой маршрут по номеру поезда
                        {text: this.btnCopy2RouteTrN, action: 'copy2route', iconCls: 'routes'}
                    ]
                }, '-',
                {
                    xtype: 'splitbutton', text: this.btnEdit, itemId: 'edit', iconCls: 'edit', action: 'edit',
                    menu: [
                        {text: this.btnEdit, action: 'edit', iconCls: 'edit'},
                        {text: this.groupEdit, action: 'editgroup', iconCls: 'editgroup'}
                    ]
                }
                // {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'

            ]
        });

        if (tkUser.hasPriv('CIM_DELETE')) {
            config.dockedItems[0].items.push({text: this.btnDelete, iconCls: 'del', itemId: 'del', action: 'del'});
            config.dockedItems[0].items.push({
                text: this.btnArchive,
                iconCls: 'archive',
                itemId: 'delList',
                action: 'delList'
            }, {xtype: 'tbseparator', itemId: 'del1'});
        }

        if (tkUser.hasPriv('CIM_ADMIN_DELETE')) {
            config.dockedItems[0].items.push(
                {
                    text: this.btnRestore,
                    iconCls: 'restore',
                    itemId: 'restore',
                    action: 'restore',
                    forDeleted: true,
                    hidden: true
                },
                {xtype: 'tbseparator', itemId: 'restore1', forDeleted: true, hidden: true},
                {
                    text: this.btnDestroy,
                    iconCls: 'del',
                    itemId: 'destroy',
                    action: 'destroy',
                    forDeleted: true,
                    hidden: true
                },
                {xtype: 'tbseparator', itemId: 'destroy1', forDeleted: true, hidden: true}
            );
        }


        if (tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')) {
            var length = config.dockedItems[0].items.push({
                text: this.btnExch, iconCls: 'iftmin', action: 'exchange',
                arrowAlign: 'bottom',
                menu: []
            }, '-');

            var exchangeMenu = config.dockedItems[0].items[length - 2].menu;

            if (tkUser.hasPriv('CIM_IFTMIN')) {
                exchangeMenu.push(
                    {text: this.btnExchTBC, action: 'tbc'},
                    {text: 'Выгрузить ТБЦ', action: 'tbc_out'},
                    {text: 'Загрузить ТБЦ', action: 'tbc_in'},
                    {text: 'ТБЦ новый', itemId: 'tdgFts_out', action: 'tdgFts_out'},
                    {text: this.btnExchBCh, action: 'iftmin'},
                    {text: 'XML DB OUT', action: 'xml_db_out'},
                    {text: 'IFTMIN 97A RZD OUT', action: 'iftmin_97a_rzd_out'}
                );
            }
            if (tkUser.hasPriv('CIM_BTLC')) {
                exchangeMenu.push(
                    {text: this.btnExchBTLC, itemId: 'btlc', action: 'btlc'}
                );
            }
            if (tkUser.hasPriv('CIM_TDG')) {
                exchangeMenu.push(
                    {text: this.btnExchTdgFTS, itemId: 'tdgFts', action: 'tdgFts'}
                );
            }
            if (tkUser.hasPriv('CIM_GREENRAIL')) {
                exchangeMenu.push(
                    {text: 'GreenRail', itemId: 'greenrail', action: 'greenrail'}
                );
            }
            if (tkUser.hasPriv('UNLOAD_5_12')) {
                exchangeMenu.push(
                    {text: 'Выгрузка XML 5.12', itemId: 'unload_5_12', action: 'unload_5_12'}
                );
            }
        }

        if (tkUser.hasPriv('CIM_DOC2DOC') || tkUser.hasPriv('CIM_CONTS_LIST')) {
            /*var controller = TK.app.getController('Docs'),
                menuItem = controller.getMenutree().lastSelectedLeaf;
            if(controller.docsInRoute(menuItem).getByKey('invoicelist')){
            }*/
            var length = config.dockedItems[0].items.push({
                text: this.btnPlusDocs, iconCls: 'copy', action: 'doc2doc',
                arrowAlign: 'bottom',
                menu: []
            }, '-');

            var menu = config.dockedItems[0].items[length - 2].menu;
            if (tkUser.hasPriv('CIM_CONTS_LIST')) {
                menu.push(
                    {text: this.btnContsList, iconCls: 'conts', action: 'contsListSmgs'}
                );
            }

            if (tkUser.hasPriv('CIM_DOC2DOC')) {
                menu.push(
                    {text: this.btnUploadPogruzList, iconCls: 'smgs', action: 'uploadPogruzList'},
                    {text: this.btnUploadPogruzListPoezd, iconCls: 'smgs', action: 'uploadPogruzListTrain'},
                    {text: this.btnPlusSmgsInv, action: 'doc2smgs_invoice', iconCls: 'copy'},
                    {text: this.btnPlusInv, action: 'smgs2invoice', iconCls: 'copy'},
                    {text: "+ графические копии", action: 'uploadGrafCopies', iconCls: 'copy'}
                );
            }
        }

        config.dockedItems[0].items.push({
            text: this.btnReports,
            iconCls: 'report',
            itemId: 'report',
            action: 'report'
        }, '-');
        config.dockedItems[0].items.push({text: this.btnHistory, iconCls: 'history', action: 'history'}, '-');
        config.dockedItems[0].items.push({
            text: 'Messenger',
            iconCls: 'doc_new',
            itemId: 'messanger',
            action: 'showMessanger'
        }, '-');

    },
    renderInvQty: function (val, meta, rec) {
        if (rec.data['invQty']) {
            if (rec.data['invQty'] != '0') {
                meta.style = 'color:green;font-weight:bold;background:#F0DC82;';
            } else {
                val = '';
            }
        }
        return val;
    },
    rendererVagVed: function (val) {
        if (val !== '')
            return this.titleVagVed;
        else
            return '';

    },

    listeners: {
        afterrender: function (c) {
            this.afterrenderFn(c);
        }
    },
    afterrenderFn: function (c) {

        var menu = c.headerCt.getMenu();

        var menuItem = menu.add({
            itemid: 'searchTrainHeader',
            text: this.menuTrSearch,
            icon: './images/loupe.png',
            action: 'searchTrains'
        });
        menu.on('beforeshow', function () {
            var currentDataIndex = menu.activeHeader.dataIndex;
            if (currentDataIndex === 'npoezd') {
                menuItem.show();
            } else {
                menuItem.hide();
            }
        });
        this.callParent(arguments);
    },
    rendererNewDoc: function (value) {
        if (value === 1)
            return '<img src="./resources/images/doc.png" width="16" height="16">';
        else if (value === 2)
            return '<img src="./resources/images/doc_new.png" width="16" height="16">';
        else
            return '';

    }


});
