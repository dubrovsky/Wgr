Ext.define('TK.view.ky2.poezd.BasePoezdIntoForPoezdOut', {
    extend: 'TK.view.ky2.AbstractList',
    alias: 'widget.ky2basepoezdintoforpoezdout',

    selType: 'checkboxmodel',
    selModel: {mode: 'MULTI'},

    config: {
        poezdHid: undefined
    },

    buildColumns: function (config) {
        config.columns = {
            items: [
                {text: this.labelNWag, dataIndex: 'nvag', flex: 1}
            ]
        };
    },
    buildTopToolbar: function (config) {
        config.tbar = [
            {text: this.btnChoose, action: 'createPoezdOutFromPoezdInto', iconCls: 'check1'}, '-'
        ];
    }
});
