Ext.define('TK.view.ky.poezd.BaseVagonList', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasevagonlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:this.headerVagonNum, dataIndex:'nvag', flex:2},
                {text:'Кол-во контейнеров', dataIndex:'kontSum', flex:1, renderer: function(val, meta, vagon){
                    return vagon.konts().count();
                }},
                {text:'Номер пути', dataIndex: 'line', flex:2},
                {text:'Подъемная сила', dataIndex: 'podSila', flex:2},
                {text:'Масса тары', dataIndex: 'masTar', flex:2}
            ]
        };
    }
});
