Ext.define('TK.view.ky.BaseGruzList', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasegruzlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerGruzCode, dataIndex:'kgvn', flex:1},
                {text:this.headerGruzName, dataIndex:'nzgr', flex:4}
            ]
        };
    }
});
