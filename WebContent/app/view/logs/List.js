Ext.define('TK.view.logs.List', {
    extend:'TK.view.DocsList',
    alias:'widget.logslist',

    buildStore:function (config) {
        config.store = 'Logs';
    },
    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerDate, dataIndex:'timestamp', width:90, renderer: TK.Utils.renderLongStr},
                {text:this.headerUser, dataIndex:'userName', width:90, renderer: TK.Utils.renderLongStr},
                {text:this.headerHost, dataIndex:'remoteHost', width:100},
//                {text:'Урл', dataIndex:'requestURI', width:160},
                {text:this.headerAgent, dataIndex:'userAgent', width:100, renderer: TK.Utils.renderLongStr},
                {text:this.headerLog, dataIndex:'formattedMessage', flex:1, renderer:TK.Utils.renderLongStr},
//                {text:'Логгер', dataIndex:'loggerName', width:200},
//                {text:'Уровень', dataIndex:'levelString', width:70},
                {text:this.headerThread, dataIndex:'threadName', width:160},
                {text:this.headerFile, dataIndex:'callerFilename', width:150},
//                {text:'Класс', dataIndex:'callerClass', width:200},
                {text:this.headerMethod, dataIndex:'callerMethod', width:50}
//                {text:'Строка', dataIndex:'callerLine', width:50}
            ],
            defaults:{}
        };
    },
    buildTopToolbar:function (config) {
        config.dockedItems = new Array({
            dock: 'top',
            xtype: 'toolbar',
            itemId: 'top',
            items: [
                {text: this.btnFilter, iconCls:'filter', action:'filterLogs'},'-'
            ]
        });
    },
    buildView: function(config) {
        config.viewConfig = {
            stripeRows: true
        };
    }
});