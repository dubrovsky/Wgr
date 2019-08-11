Ext.define('TK.view.ky2.poezd.AbstractPoezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2abstractpoezd2yardbindtreeform',

    buildTreeLeftPanelTopToolbarItems: function () {
        var items = this.callParent(arguments);
        items.unshift( // в начало
            {
                text: 'Спрятать вагоны',
                action: 'hideVags'
            }, '-',
            {
                text: 'Показать вагоны',
                action: 'showVags'
            }, '-'
        );
        items.push('-', // в конец
            {
                text: 'Переместить все >>',
                action: 'moveRightAll'
            }
        );
        return items;
    }
});