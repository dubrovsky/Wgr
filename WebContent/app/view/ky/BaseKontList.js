Ext.define('TK.view.ky.BaseKontList', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasekontlist',

    buildColumns:function (config) {
        config.columns = {
            items:[
                {text:'Номер контейнера', dataIndex:'nkon', flex:2}
            ]
        };

    }
});
