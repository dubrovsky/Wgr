Ext.define('TK.view.ky.poezd.out.KontList', {
    extend: 'TK.view.ky.poezd.BaseKontList',
    alias:'widget.kykontlistforpoezdout',

    buildItems: function (config) {
        this.callParent(arguments);

        config.items[0].buildStore = function (config) {
            config.store = 'ky.KontsListInPoezdOut';
        };
    }
});