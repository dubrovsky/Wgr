Ext.define('TK.view.ky2.poezd.into.Poezd2AvtoBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2poezd2avtobindtreeforminto',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.AvtoBindTreeRightNodes';
    }
});