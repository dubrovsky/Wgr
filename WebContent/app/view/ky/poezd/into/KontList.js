Ext.define('TK.view.ky.poezd.into.KontList', {
    extend: 'TK.view.ky.poezd.BaseKontList',
    alias:'widget.kykontlistforpoezdinto',

    buildItems: function (config) {
        this.callParent(arguments);

        config.items[0].buildStore = function (config) {
            config.store = 'ky.KontsListInPoezdInto';
        };
    }
});