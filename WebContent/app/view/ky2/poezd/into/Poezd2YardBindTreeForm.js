Ext.define('TK.view.ky2.poezd.into.Poezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2poezd2yardbindtreeforminto',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    }
});
