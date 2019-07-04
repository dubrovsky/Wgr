Ext.define('TK.view.ky2.poezd.out.PoezdVgCtGrBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2vgctgrtreebindformpoezdout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdVgCtGrBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.PoezdVgCtGrBindTreeRightNodes';
    }
});
