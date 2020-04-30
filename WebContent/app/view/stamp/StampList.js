/**
 * Панель списка штампов
 */
Ext.define('TK.view.stamp.StampList', {
    extend: 'TK.view.DocsList',
    alias: 'widget.stampList',

    requires: [
        'TK.Utils'
    ],
    title:this.title,

    buildStore: function(config) {
        config.store = 'stamp.Stamps';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text: 'HID', dataIndex:'hid', flex:1,maxWidth:100},
                {text: this.hdrTrans, dataIndex: 'trans', flex:1},
                {text: this.hdrdescr, dataIndex: 'descr', renderer: TK.Utils.renderLongStr, flex:4},
                {text: this.hdrCodePer, dataIndex: 'codePer', flex:1},
                {text: this.hdrAltered,xtype: 'datecolumn', dataIndex: 'altered',format:'d.m.Y', flex:1},
                {text: this.hdrDattr,xtype: 'datecolumn', dataIndex: 'altered',format:'d.m.Y', flex:1},
                {text: 'llx', dataIndex: 'llx', flex:1},
                {text: 'lly', dataIndex: 'lly', flex:1},
                {text: 'urx', dataIndex: 'urx', flex:1},
                {text: 'ury', dataIndex: 'ury', flex:1}
            ],
            defaults:{}
        };
    },
    buildTopToolbar: function(config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            layout: 'column',
            itemId: 'top',
            items: []
        });
        if(tkUser.hasPriv('CIM_PRINT_TEMPLATES_ADMIN')){
            config.dockedItems[0].items.push(
                {text: this.btnCreate,iconCls:'doc_new', action:'addStamp'},'-',
                {text: this.btnEdit,iconCls:'edit', action:'editStamp'},'-',
                {text: this.btnCopy,iconCls:'copy', action:'copyStamp'},'-',
                {text: this.btnDelete,iconCls:'del', action:'delStamp'},'-'
            );
        }
    },
    buildView: function(config) {}
});
