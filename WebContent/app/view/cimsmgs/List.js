Ext.define('TK.view.cimsmgs.List', {
    extend:'TK.view.DocsList',
    alias:'widget.cimsmgslist',
    mixins:{
        exchange: 'TK.controller.exchange.Viewers'
    },

    buildStore:function (config) {
        config.store = 'CimSmgses';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerID, dataIndex:'hid', renderer: this.rendererLockedExch, /*flex:1, maxWidth:100, minWidth:70*/ width: 75},
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
                {text:this.headerCimsmgs, dataIndex:'numClaim', width:80, renderer: this.rendererPrint}
            ],
            defaults:{}
        };

        if(tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')){
            var length = config.columns.items.push({
                text:this.btnExch,
                columns: []
            });

            var exchangeMenu = config.columns.items[length-1].columns;

            if(tkUser.hasPriv('CIM_IFTMIN')){
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
            {text:this.headerVagNum, dataIndex:'vags', width:85, renderer:TK.Utils.renderLongStr},
            {text:this.headerContNum, dataIndex:'konts', width:85, renderer:TK.Utils.renderLongStr},
            {text:this.headerDateTransp, dataIndex:'g281', width:85, renderer:TK.Utils.renderLongStr},
            {text:this.headerSenderName, dataIndex:'g1', flex:1, width:200, renderer:TK.Utils.renderLongStr},
            {text:this.headerReceiverName, dataIndex:'g4', flex:1, width:200, renderer:TK.Utils.renderLongStr}
        );

        if(tkUser.hasPriv('CIM_DOC2DOC')){
            config.columns.items.push({text: this.headerNPoezd, dataIndex: 'npoezd', width: 60, renderer: TK.Utils.renderLongStr});
        }
    },
    buildTopToolbar:function (config) {
//        this.callParent(arguments);
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', itemId:'local'},'-',
                {xtype:'splitbutton', text: this.btnPrint, iconCls:'pdf_blank_off', action:'print',
                    menu: [
                        {text: this.btnPrint, action:'print', iconCls:'pdf_blank_off'},
                        {text: this.btnBindPrint, action:'bindPrintTmpl', iconCls:'bind'}
                    ]
                },'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-'

            ]
        });

        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del'},{xtype: 'tbseparator', itemId:'del1'});
        }

        if(tkUser.hasPriv('CIM_IFTMIN') || tkUser.hasPriv('CIM_BTLC') || tkUser.hasPriv('CIM_TDG') || tkUser.hasPriv('CIM_GREENRAIL')){
            var length = config.dockedItems[0].items.push(
                {text: this.btnExch, iconCls:'iftmin', action:'exchange',
                    arrowAlign:'bottom',
                    menu:[]
                },'-'
            );

            var exchangeMenu = config.dockedItems[0].items[length-2].menu;

            if(tkUser.hasPriv('CIM_IFTMIN')){
                exchangeMenu.push(
                    {text: this.btnExchBCh, action:'iftmin'},
                    {text: 'IFTMIN DB', action:'iftmin_db'}
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

        config.dockedItems[0].items.push({
            text: this.btnPlusDocs, iconCls:'copy', action:'doc2doc',
            arrowAlign:'bottom',
            menu:[
                {text:this.btnDopList, iconCls:'dop-list', action:'dopList'}
            ]
        },'-');

        if(tkUser.hasPriv('CIM_CONTS_LIST')){
            var menu_length = config.dockedItems[0].items.length,
                menu = config.dockedItems[0].items[menu_length-2].menu;
            menu.push({text: this.btnContsList,iconCls:'conts', action:'contsListCimSmgs'});
        }
        config.dockedItems[0].items.push({text:this.btnHistory, iconCls:'history', action:'history'}, '-');

    }
});