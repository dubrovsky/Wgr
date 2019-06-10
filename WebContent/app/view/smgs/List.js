Ext.define('TK.view.smgs.List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.smgslist',
    mixins:{
        exchange: 'TK.controller.exchange.Viewers'
    },

    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],

    selModel:{mode:'MULTI'},
    buildStore: function(config) {
        config.store = 'Smgses';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerID, dataIndex:'hid', renderer: this.rendererLockedExch, /*flex:1, maxWidth:90, minWidth:70*/ width: 72},
                {
                    text:this.headerCreation,
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
                {text: this.headerSmgs, dataIndex: 'numClaim', width: 70, renderer: this.rendererPrint},
                {text: this.headerAvisoNum, dataIndex: 'aviso', width: 70}
            ],
            defaults:{}
        };

        if(tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG')  || tkUser.hasPriv('CIM_GREENRAIL')){
            var length = config.columns.items.push({
                text:this.btnExch,
                columns: []
            });

            var exchangeMenu = config.columns.items[length-1].columns;

            if(tkUser.hasPriv('CIM_IFTMIN')){
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

            if(tkUser.hasPriv('CIM_BTLC')){
                exchangeMenu.push(
                    {
                        text: this.btnExchBTLC,
                        dataIndex: 'iftminBtlc',
                        width: 80,
                        renderer: this.rendererBtlc
                    }
                );
            }

            if(tkUser.hasPriv('CIM_TDG')){
                exchangeMenu.push(
                    {
                        text: this.btnExchTdgFTS,
                        dataIndex: 'tdgFts',
                        width: 80,
                        renderer: this.rendererTdg
                    }
                );
            }

            if(tkUser.hasPriv('CIM_GREENRAIL')){
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
            {text: this.headerVagNum, dataIndex: 'vags', width: 95, renderer: TK.Utils.renderLongStr},
            {text: this.headerContNum, dataIndex: 'konts', width: 95, renderer: TK.Utils.renderLongStr},
            {text: this.headerSenderName, dataIndex: 'g1',flex:1, renderer: TK.Utils.renderLongStr},
            {text: this.headerReceiverName, dataIndex: 'g4',flex:1, renderer: TK.Utils.renderLongStr}
        );

        if(tkUser.hasPriv('CIM_DOC2DOC')  || tkUser.hasPriv('CIM_ADD_AVISO2DOC')){
            /*var controller = TK.app.getController('Docs'),
                menuItem = controller.getMenutree().lastSelectedLeaf;
            if(controller.docsInRoute(menuItem).getByKey('invoicelist')){
                config.columns.items.push({text: this.headerInv, dataIndex: 'invQty',width: 55, renderer: this.renderInvQty});
            }*/
            config.columns.items.push({text: this.headerInv, dataIndex: 'invQty',width: 55, renderer: this.renderInvQty});
            config.columns.items.push({text: this.headerNPoezd, dataIndex: 'npoezd', width: 85, renderer: TK.Utils.renderLongStr});
        }
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnPrint, action:'print', iconCls:'pdf_blank_off'},
                        {text: this.btnBindPrint, action:'bindPrintTmpl', iconCls:'bind'},
                        {text: this.btnSelectPrint, action:'selectPrintTmpl', iconCls:'select'}
                    ]
                },'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                //{text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {xtype:'splitbutton', text: this.btnCopy, iconCls:'copy', action:'copy',
                    menu: [
                        {text: this.btnCopy, action:'copy', iconCls:'copy'},
                        {text: 'Копия, выбрать...', action:'showCopySelectedWin', iconCls:'copySelected'}
                    ]
                },'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'

            ]
        });

        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }

        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }


        if(tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')){
            var length = config.dockedItems[0].items.push({
                text: this.btnExch, iconCls:'iftmin', action:'exchange',
                arrowAlign:'bottom',
                menu:[]
            },'-');

            var exchangeMenu = config.dockedItems[0].items[length-2].menu;

            if(tkUser.hasPriv('CIM_IFTMIN')){
                exchangeMenu.push(
                    {text: this.btnExchTBC, action:'tbc'},
                    {text: 'Выгрузить ТБЦ', action:'tbc_out'},
                    {text: 'Загрузить ТБЦ', action:'tbc_in'},

                    {text: 'ТБЦ новый', itemId: 'tdgFts_out', action:'tdgFts_out'},

                    {text: this.btnExchBCh, action:'iftmin'}
                );
            }
            if(tkUser.hasPriv('CIM_BTLC')){
                exchangeMenu.push(
                    {text: this.btnExchBTLC, itemId: 'btlc', action:'btlc'}
                );
            }
            if(tkUser.hasPriv('CIM_TDG')){
                exchangeMenu.push(
                    {text: this.btnExchTdgFTS, itemId: 'tdgFts', action:'tdgFts'}
                );
            }
            if(tkUser.hasPriv('CIM_GREENRAIL')){
                exchangeMenu.push(
                    {text: 'GreenRail', itemId: 'greenrail', action:'greenrail'}
                );
            }
        }

        if(tkUser.hasPriv('CIM_DOC2DOC') || tkUser.hasPriv('CIM_CONTS_LIST')){
            /*var controller = TK.app.getController('Docs'),
                menuItem = controller.getMenutree().lastSelectedLeaf;
            if(controller.docsInRoute(menuItem).getByKey('invoicelist')){
            }*/
            var length = config.dockedItems[0].items.push({
                text: this.btnPlusDocs, iconCls:'copy', action:'doc2doc',
                arrowAlign:'bottom',
                menu:[]
            },'-');

            var menu = config.dockedItems[0].items[length-2].menu;
            if(tkUser.hasPriv('CIM_CONTS_LIST')){
                menu.push(
                    {text: this.btnContsList,iconCls:'conts', action:'contsListSmgs'}
                );
            }

            if(tkUser.hasPriv('CIM_DOC2DOC')){
                menu.push(
                    {text: this.btnPlusSmgsInv, action:'doc2smgs_invoice', iconCls:'copy'},
                    {text: this.btnPlusInv, action:'smgs2invoice', iconCls:'copy'}
                );
            }
        }

        config.dockedItems[0].items.push({text: this.btnReports,iconCls:'report',itemId: 'report', action:'report'},'-');
        config.dockedItems[0].items.push({text: this.btnHistory,iconCls:'history',action:'history'},'-');

    },
    renderInvQty: function(val, meta, rec) {
        if(rec.data['invQty']){
            if (rec.data['invQty'] != '0') {
                meta.style = 'color:green;font-weight:bold;background:#F0DC82;';
            } else {
                val = '';
            }
        }
        return val;
    }
});