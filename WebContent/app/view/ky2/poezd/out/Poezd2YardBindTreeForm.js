Ext.define('TK.view.ky2.poezd.out.Poezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2poezd2yardbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    },

    buildTreeLeftPanelTopToolbarItems: function () {
        var items = this.callParent(arguments);
        items.push('-',
            {
                text: 'Переместить все >>',
                action: 'moveRightAll'
            }
        );
        return items;
    }
});
