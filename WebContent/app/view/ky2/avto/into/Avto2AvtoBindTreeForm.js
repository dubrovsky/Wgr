Ext.define('TK.view.ky2.avto.into.Avto2AvtoBindTreeForm', {
    extend: 'TK.view.ky2.avto.AvtoBindTreeForm',
    alias: 'widget.ky2avto2avtobindtreeforminto',
    // xtype: 'testEvent',

    // controller : 'BindAvtoAndAvtoController',

    buildTreeLeftPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.AvtoBindTreeRightNodes';
    }



});
