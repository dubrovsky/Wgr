Ext.define('TK.view.ky2.poezd.into.PoezdVgCtGrBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2vgctgrtreebindformpoezdinto',

    buildTreeLeftPanelStore: function(){
        return 'ky2.PoezdVgCtGrBindTreeLeftNodes';
    },
    buildTreeRightPanelStore: function(){
        return 'ky2.PoezdVgCtGrBindTreeRightNodes';
    }


});
