Ext.define('TK.view.avisocimsmgs.List', {
    extend: 'TK.view.DocsList',
    alias: 'widget.avisocimsmgslist',

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
        }
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
                {text: this.btnStat, iconCls:'filter', action:'filter'},'-',
                {text: this.btnCreate,iconCls:'doc_new', action:'create'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copy'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'edit'},'-',
                {text: this.btnMakeCimSmgs,iconCls:'smgs1', itemId:'aviso2smgs',action:'aviso2smgs', disabled:true},'-',
                {text: this.btnDownload,iconCls:'upload',action:'upload'},'-',
                {text: this.btnHistory,iconCls:'history',action:'history'},'-'
            ]
        });
        if(tkUser.hasPriv('CIM_DELETE')){
            config.dockedItems[0].items.push({text: this.btnDelete,iconCls:'del',itemId:'del', action:'del', disabled:true},'-');
        }
        if(tkUser.hasPriv('CIM_EXPORT_AVISO')){
            config.dockedItems[0].items.push({text: 'Export',iconCls:'export2Xls',itemId:'export2Excel', action:'export2Excel', disabled:true},'-');
        }
        if(tkUser.hasPriv('CIM_ADD_AVISO2DOC')){
            config.dockedItems[0].items.push({text: this.btnAppend2CimSmgs,iconCls:'smgs1', itemId:'aviso2smgsAppend',action:'aviso2smgsAppend', disabled:true},'-');
        }
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
                return '<span style="color:#daa520;white-space:normal;font-weight:bold;">'+ 'Для согласования'+ '</span>';
            case '4':
                return '<span style="color:green;white-space:normal;font-weight:bold;">'+ 'Согласована'+ '</span>';
            case '6':
                return '<span style="color:red;white-space:normal;font-weight:bold;">'+ 'НЕ Согласована'+ '</span>';
            case '7':
                return '<span style="color:#828a98;white-space:normal;font-weight:bold;">'+ 'Заблокирована'+ '</span>';
        }
        return '';
    },
    renderComments: function(value, metaData) {
        if (value) {
            metaData.style = 'font-weight:bold; background:#A60C00;color:white';
        } else {
            value = '';
        }
        return value;
    }

});