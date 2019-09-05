Ext.define('TK.view.ky2.avto.out.Avto2YardBindTreeForm', {
    extend: 'TK.view.ky2.avto.AbstractAvto2YardBindTreeForm',
    alias: 'widget.ky2avto2yardbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    }
});
