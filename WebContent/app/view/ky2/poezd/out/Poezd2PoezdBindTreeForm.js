Ext.define('TK.view.ky2.poezd.out.Poezd2PoezdBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2poezd2poezdbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.PoezdBindTreeRightNodes';
    }
});
