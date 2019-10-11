Ext.define('TK.view.ky2.BasePoezdZayavsDir', {
    extend: 'TK.view.ky2.AbstractList',
    alias:'widget.ky2basepoezdzayavsdir',

    selType: 'checkboxmodel',
    selModel: {mode: 'SINGLE'},

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text: 'Номер заявки', dataIndex:'noZayav', flex:1}
            ]
        };
    },
    buildTopToolbar: function(config) {
        config.tbar = [
            {text: 'Выбрать', action:'addToPoezdFromZayav', iconCls:'check1'}, '-'
        ];
    }
});
