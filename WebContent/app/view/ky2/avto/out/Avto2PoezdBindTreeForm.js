Ext.define('TK.view.ky2.avto.out.Avto2PoezdBindTreeForm', {
    extend: 'TK.view.ky2.avto.AvtoBindTreeForm',
    alias: 'widget.ky2avto2poezdbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeRightNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    }
});