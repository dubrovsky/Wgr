Ext.define('TK.view.ky2.avto.into.Avto2PoezdBindTreeForm', {
    extend: 'TK.view.ky2.avto.AvtoBindTreeForm',
    alias: 'widget.ky2avto2poezdbindtreeforminto',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeRightNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    }
});