Ext.define('TK.view.ky2.avto.AbstractAvto2YardBindTreeForm', {
    extend: 'TK.view.ky2.avto.AvtoBindTreeForm',
    alias: 'widget.ky2abstractavto2yardbindtreeform',

    buildTreeLeftPanelTopToolbarItems: function () {
        var items = this.callParent(arguments);
        // items.unshift( // в начало
        //     {
        //         text: 'Спрятать вагоны',
        //         action: 'hideVags'
        //     }, '-',
        //     {
        //         text: 'Показать вагоны',
        //         action: 'showVags'
        //     }, '-'
        // );
        // items.push('-', // в конец
        //     {
        //         text: 'Переместить все >>',
        //         action: 'moveRightAll'
        //     }
        // );
        return items;
    }
});