Ext.define('TK.view.cimsmgs.CimSmgsList', {
    extend: 'TK.view.DocsList',
    alias: 'widget.cimsmgslist',
    mixins: {
        exchange: 'TK.controller.exchange.Viewers'
    },

    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],
    itemId: 'cimsmgslistMain',

    buildStore: function (config) {
        config.store = 'CimSmgses';
    },
    buildColumns: function (config) {
        config.columns = {
            items: [
                {
                    text: this.headerID,
                    dataIndex: 'hid',
                    renderer: this.rendererLockedExch, /*flex:1, maxWidth:100, minWidth:70*/
                    width: 75
                },
                {
                    text: this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 85
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
                        renderer: this.rendererUn,
                        width: 80
                    }]
                },
                {text: this.headerCimsmgs, dataIndex: 'numClaim', width: 80, renderer: this.rendererPrint},
                {text: this.headerVagVed, dataIndex: 'vagVedNum', width: 70, renderer: this.rendererVagVed}
            ],
            defaults: {}
        };

        if (tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')) {
            var length = config.columns.items.push({
                text: this.btnExch,
                columns: []
            });

            var exchangeMenu = config.columns.items[length - 1].columns;

            if (tkUser.hasPriv('CIM_IFTMIN')) {
                exchangeMenu.push(
                    {
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
            {text: this.headerVagNum, dataIndex: 'vags', width: 85, renderer: TK.Utils.renderLongStr},
            {text: this.headerContNum, dataIndex: 'konts', width: 95, renderer: TK.Utils.renderLongStr},
            {text: this.headerDateTransp, dataIndex: 'g281', width: 85, renderer: TK.Utils.renderLongStr},
            {text: this.headerSenderName, dataIndex: 'g1', flex: 1, width: 180, renderer: TK.Utils.renderLongStr},
            {text: this.headerReceiverName, dataIndex: 'g4', flex: 1, width: 180, renderer: TK.Utils.renderLongStr}
        );

        if (tkUser.hasPriv('CIM_DOC2DOC')) {
            config.columns.items.push({
                text: this.headerNPoezd, dataIndex: 'npoezd', width: 90, renderer: TK.Utils.renderLongStr,
                beforeRender: function () {
                    this.getMenu().add({});
                }
            });
        }

        config.columns.items.push({
            text: 'Сообщения',
            dataIndex: 'messCount',
            width: 80,
            renderer: TK.Utils.renderMessCount
        });
    },
    buildTopToolbar: function (config) {
//        this.callParent(arguments);
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
                        // {text: this.btnPrintView, action:'printView', iconCls:'view'},
                        {text: this.btnPrint, action: 'print', iconCls: 'pdf_blank_off'},
                        {text: this.groupPrint, action: 'groupPrintTmpl', iconCls: 'pdfs_blank_off'},
                        {text: this.btnBindPrint, action: 'bindPrintTmpl', iconCls: 'bind'},
                        {text: this.btnSelectPrint, action: 'selectPrintTmpl', iconCls: 'select'}
                    ]
                }, '-',
                {
                    xtype: 'splitbutton', text: this.btnCreate, iconCls: 'doc_new', action: 'create',
                    menu: [
                        {text: this.btnCont, action: 'createCont', iconCls: 'doc_new'},
                        {text: this.btnVag, action: 'createVag', iconCls: 'doc_new'}
                    ]
                }, '-',
                // {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {
                    xtype: 'splitbutton', text: this.btnCopy, iconCls: 'copy', action: 'copy',
                    menu: [
                        {text: this.btnCopy, action: 'copy', iconCls: 'copy'},
                        {text: this.btnCopyAviso, action: 'copy2aviso', iconCls: 'copy'},
                        {text: this.btnCopySelect, action: 'showCopySelectedWin', iconCls: 'copySelected'},
                        {text: this.btnCopy2ArchSel, action: 'copy2archSel', iconCls: 'archive'},
                        {text: this.btnCopy2ArchTrN, action: 'copy2arch', iconCls: 'archive'},
                        //перенести/скопировать в другой маршрут выбранное
                        {text: this.btnCopy2RouteSel, action: 'copy2routeSel', iconCls: 'routes'},
                        //перенести/скопировать в другой маршрут по номеру поезда
                        {text: this.btnCopy2RouteTrN, action: 'copy2route', iconCls: 'routes'}
                    ]
                },
                // {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'
                {
                    xtype: 'splitbutton', text: this.btnEdit, itemId: 'edit', iconCls: 'edit', action: 'edit',
                    menu: [
                        {text: this.btnEdit, action: 'edit', iconCls: 'edit'},
                        {text: this.groupEdit, action: 'editgroup', iconCls: 'editgroup'}
                    ]
                }
            ]
        });

        if (tkUser.hasPriv('CIM_DELETE')) {
            config.dockedItems[0].items.push({
                text: this.btnDelete,
                iconCls: 'del',
                itemId: 'del',
                action: 'del'
            }, {xtype: 'tbseparator', itemId: 'del1'});
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
            var length = config.dockedItems[0].items.push(
                {
                    text: this.btnExch, iconCls: 'iftmin', action: 'exchange',
                    arrowAlign: 'bottom',
                    menu: []
                }, '-'
            );

            var exchangeMenu = config.dockedItems[0].items[length - 2].menu;

            if (tkUser.hasPriv('CIM_IFTMIN')) {
                exchangeMenu.push(
                    {text: this.btnExchBCh, action: 'iftmin'},
                    {text: 'IFTMIN DB OUT', action: 'iftmin_db_out'},
                    {text: 'XML DB OUT', action: 'xml_db_out'},
                    {text: 'IFTMIN 97A RZD OUT', action: 'iftmin_97a_rzd_out'},
                    {text: 'IFTMIN DB IN', action: 'iftmin_db_in'}
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

        config.dockedItems[0].items.push({
            text: this.btnPlusDocs, iconCls: 'copy', action: 'doc2doc',
            arrowAlign: 'bottom',
            menu: [
                {text: this.btnUploadPogruzList, iconCls: 'smgs', action: 'uploadPogruzList'},
                {text: this.btnUploadPogruzListPoezd, iconCls: 'smgs', action: 'uploadPogruzListTrain'},
                {text: this.btnUploadCSDocs9, iconCls: 'packet', action: 'uploadCimSmgsDocs9'},
                {text: this.btnDopList, iconCls: 'dop-list', action: 'dopList'},
                {text: "+ графические копии", action: 'uploadGrafCopies', iconCls: 'copy'}
            ]
        }, '-');

        if (tkUser.hasPriv('CIM_CONTS_LIST')) {
            var menu_length = config.dockedItems[0].items.length,
                menu = config.dockedItems[0].items[menu_length - 2].menu;
            menu.push({text: this.btnContsList, iconCls: 'conts', action: 'contsListCimSmgs'});
        }
        config.dockedItems[0].items.push({text: this.btnHistory, iconCls: 'history', action: 'history'}, '-');
        config.dockedItems[0].items.push({
            text: 'Messenger',
            iconCls: 'doc_new',
            itemId: 'messanger',
            action: 'showMessanger'
        }, '-');

    },
    listeners: {
        afterrender: function (c) {
            this.afterrenderFn(c);
        }
    },
    rendererVagVed: function (val) {
        if (val !== '')
            return this.titleVagVed;
        else
            return '';
    },

    /**
     * Добавляем поиск по поезду в список CimSmgs
     * @param c
     */
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
    }
});
