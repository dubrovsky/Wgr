Ext.define('TK.view.avisocimsmgs.AvisoCimSmgsList', {
    extend: 'TK.view.DocsList',
    alias: 'widget.avisocimsmgslist',

    requires: [
        'Ext.button.Split',
        'TK.Utils'
    ],

    buildStore: function(config) {
        config.store = 'Avisocimsmgss';
    },
    buildColumns: function(config) {
        config.columns = {
            items:[
                {text: this.headerID, dataIndex: 'hid', renderer:this.rendererLocked, flex:1, maxWidth:100, minWidth:70},
                {
                    text:this.headerCreation,
                    columns: [{
                        text: this.headerDateTime,
                        dataIndex: 'altered',
                        renderer: TK.Utils.renderLongStr,
                        width: 90
                    }, {
                        text: this.headerUser,
                        dataIndex: 'un',
                        renderer: this.rendererUn,
                        width: 85
                    }]
                },
                {text: this.headerStatus, dataIndex: 'status', renderer: this.renderStatus},
                {text: this.headerInstrNum, dataIndex: 'avizo_num', renderer: this.rendererGraph},
                {text: this.headerContNum, dataIndex: 'konts'},
                {text: this.headerGNG, dataIndex: 'gng'},
                {text: this.headerSenderName, dataIndex: 'g1', flex:1, renderer: TK.Utils.renderLongStr},
                {text: this.headerReceiverName, dataIndex: 'g4',  flex:1, renderer: TK.Utils.renderLongStr}/*,
                {text: 'Замечания', dataIndex: 'comments',  width:67, renderer: this.renderComments}*/
            ],
            defaults: {}
        };
        if(tkUser.hasPriv('CIM_DOC2DOC') || tkUser.hasPriv('CIM_ADD_AVISO2DOC')){
            config.columns.items.push({text: this.headerNPoezd, dataIndex: 'npoezd', width: 60, renderer: TK.Utils.renderLongStr});
        }
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            defaults:{iconAlign:'top', arrowAlign:'bottom'},
            items: [
                {text: this.btnStat, iconCls:'filter', action:'filter', forDeleted: true, forPresent: true},
                {xtype: 'tbseparator', itemId:'filter1', forDeleted: true, forPresent: true},
                {xtype:'splitbutton', text: this.btnCreate, iconCls:'doc_new', action:'create',
                    menu: [
                        {text: this.btnCont, action:'createCont', iconCls:'doc_new'},
                        {text: this.btnVag, action:'createVag', iconCls:'doc_new'}
                    ]
                },'-',
                // {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-',
                {text: this.btnMakeCimSmgs,iconCls:'smgs1', itemId:'aviso2smgs',action:'aviso2cimsmgs', disabled:true},'-',
                // {text: this.btnDownload,iconCls:'upload',action:'upload'},'-',
                // {text: this.btnDownload+'DB',iconCls:'upload',action:'uploadDB'},'-',
                {text: this.btnHistory,iconCls:'history',action:'history'},'-'
            ]
        });
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del', disabled:true},'-');
        }
        if(tkUser.hasPriv('CIM_ADMIN_DELETE')){
            config.dockedItems[0].items.push(
                {text: this.btnRestore,iconCls:'restore',itemId:'restore', action:'restore', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'restore1', forDeleted: true, hidden: true},
                {text: this.btnDestroy,iconCls:'del',itemId:'destroy', action:'destroy', forDeleted: true, hidden: true},
                {xtype: 'tbseparator', itemId:'destroy1', forDeleted: true, hidden: true}
            );
        }
        /*if(tkUser.hasPriv('CIM_EXPORT_AVISO')){
            config.dockedItems[0].items.push({text: 'Export',iconCls:'export2Xls',itemId:'export2Excel', action:'export2Excel', disabled:true},'-');
        }
        if(tkUser.hasPriv('CIM_ADD_AVISO2DOC')){
            config.dockedItems[0].items.push({text: this.btnAppend2CimSmgs,iconCls:'smgs1', itemId:'aviso2smgsAppend',action:'aviso2smgsAppend', disabled:true},'-');
        }*/
    },
    rendererGraph: function(val, meta, rec) {
        if (rec.data['graf']) {
            return '<span class="graph_copy">' + val + '</span>';
        } else {
            return val;
        }
    },
    renderStatus: function(val) {
        switch(val){
            case '3':
                return '<span style="color:#daa520;white-space:normal;font-weight:bold;">'+ this.txtForApproval+ '</span>';
            case '4':
                return '<span style="color:green;white-space:normal;font-weight:bold;">'+ this.txtApproved+ '</span>';
            case '6':
                return '<span style="color:red;white-space:normal;font-weight:bold;">'+ this.txtNotApproved+ '</span>';
            case '7':
                return '<span style="color:#828a98;white-space:normal;font-weight:bold;">'+ this.txtBlocked+ '</span>';
            case '':
                return '<span style="color:green;white-space:normal;font-weight:bold;">'+ this.txtWork+ '</span>';
        }
        return '';
    }/*,
    renderComments: function(value, metaData) {
        if (value) {
            metaData.style = 'font-weight:bold; background:#A60C00;color:white';
        } else {
            value = '';
        }
        return value;
    }*/

});