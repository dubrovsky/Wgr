Ext.define('TK.view.ky2.yard.Yard2YardBindTreeForm', {
    extend: 'TK.view.ky2.AbstractBindTreeForm',
    alias: 'widget.ky2yard2yardbindtreeform',

    buildTreeLeftPanelTopToolbarItems: function () {
        return [{
            xtype: 'vagkontsearch'
        }
        ];
    },
    buildTreeRightPanelTopToolbarZayavFilter: function () {
        return [];
    },
    buildTreeLeftPanelStore: function () {
        return 'ky2.YardBindTreeNodesLeft';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodesRight';
    },

    buildTreeRightPanelTopToolbarItems: function () {
        return [
            {xtype: 'vagkontsearch'},
            '-',
            {tooltip: 'Загрузить XLS файл', iconCls: 'excel', action: 'upload', margins: '0 0 0 40'},
            '-',
            {tooltip: this.btnFiltr, iconCls: 'filter', action:'clTrAvtoFilter'},
            '-',
            {text:this.btnRest, action:'clearFiltr', margins: '0 0 0 40'}

        ];
    },

    buildTopToolbarItems: function () {
        return [{
            xtype: 'tbfill',  // ->
            hidden: false
        }, {
            text: this.btnSave,
            iconCls: 'save',
            action: 'save'
        }, {
            text: this.btnSaveExit,
            iconCls: 'save_close',
            action: 'saveExit'
        }, {
            text: this.btnClose,
            iconCls: 'close1',
            action: 'close'
        }];
    }



});