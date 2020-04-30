Ext.define('TK.view.ky2.poezd.AbstractPoezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2abstractpoezd2yardbindtreeform',

    buildTreeLeftPanelTopToolbarItems: function () {
        var items = this.callParent(arguments);
        /*items.unshift( // в начало
            {
                text: 'Спрятать вагоны',
                action: 'hideVags'
            }, '-',
            {
                text: 'Показать вагоны',
                action: 'showVags'
            }, '-'
        );*/
        items.push('-', // в конец
            {
                tooltip: this.labelMoveAll,
                action: 'moveRightAll',
                iconCls: 'd_arrow_r'
            }
        );
        return items;
    },
    buildTreeRightPanelTopToolbarZayavFilter: function () {
        return [
                '-',
                {xtype:'button', text:this.btnRest, action:'clearFiltr', margins: '0 0 0 40'},
                '-',
                {xtype:'button', text:this.lblOrder, action:'zayvlist'},
                '-',
                {xtype:'button', text:this.btnFiltr, action:'clTrAvtoFilter'}
            ];
    }
});