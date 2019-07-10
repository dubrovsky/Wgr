Ext.define('TK.view.ky2.poezd.into.Poezd2PoezdBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2poezd2poezdbindtreeforminto',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.PoezdBindTreeRightNodes';
    }
});
