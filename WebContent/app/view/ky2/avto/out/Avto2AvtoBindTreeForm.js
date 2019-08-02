Ext.define('TK.view.ky2.avto.out.Avto2AvtoBindTreeForm', {
    extend: 'TK.view.ky2.avto.AvtoBindTreeForm',
    alias: 'widget.ky2avto2avtobindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.AvtoBindTreeRightNodes';
    }


});
