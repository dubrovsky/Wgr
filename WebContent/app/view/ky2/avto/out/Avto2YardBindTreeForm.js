Ext.define('TK.view.ky2.avto.out.Avto2YardBindTreeForm', {
    extend: 'TK.view.ky2.avto.AbstractAvto2YardBindTreeForm',
    alias: 'widget.ky2avto2yardbindtreeformout',

    buildTreeLeftPanelStore: function () {
        return 'ky2.AvtoBindTreeLeftNodes';
    },

    buildTreeRightPanelStore: function () {
        return 'ky2.YardBindTreeNodes';
    },

    buildTreeRightPanelTopToolbarZayavFilter: function() {
        return [
            {
        //     xtype: 'combo',
        //     margin: '0 0 0 20',
        //     fieldLabel: 'Заявка',
        //     labelWidth: 35,
        //     itemId: 'zayav',
        //     queryMode: 'local',
        //     store: 'ky2.AvtoZayavsFilter',
        //     displayField: 'no_zayav',
        //     valueField: 'hid',
        //     typeAhead: false,
        //     editable: false,
        //     name: 'zayav',
        //     listConfig: {
        //         loadingText: "Поиск",
        //         emptyText: "Не найдено"
        //     }
        // }, {
            xtype: 'kontbyzayavfilter',
            store: 'ky2.AvtoZayavsFilter',
            displayField: 'no_zayav'
        }];
    }
});
