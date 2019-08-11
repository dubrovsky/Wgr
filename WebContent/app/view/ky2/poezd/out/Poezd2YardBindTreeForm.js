Ext.define('TK.view.ky2.poezd.out.Poezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.poezd.AbstractPoezd2YardBindTreeForm',
    alias: 'widget.ky2poezd2yardbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    }
});
