Ext.define('TK.view.ky2.poezd.out.Poezd2YardBindTreeForm', {
    extend: 'TK.view.ky2.poezd.AbstractPoezd2YardBindTreeForm',
    alias: 'widget.ky2poezd2yardbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.PoezdBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    },

    buildTreeRightPanelTopToolbarZayavFilter: function() {
        return [
            {
            xtype: 'kontbyzayavfilter',
            store: 'ky2.PoezdZayavsFilter',
            displayField: 'noZayav'
            }, '-',
            {tooltip: 'Загрузить XLS файл' , iconCls: 'excel', action: 'upload'},
            '-',
            {xtype:'button', text:this.btnRest, action:'clearFiltr',margins: '0 0 0 40'},
            '-',
            {xtype:'button', text:this.lblOrder, action:'zayvlist'},
            '-',
            {xtype:'button', text:this.btnFiltr, action:'clTrAvtoFilter'}

        ];
    }

});
