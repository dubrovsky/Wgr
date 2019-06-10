Ext.define('TK.view.ky.reports.Report2', {
    extend: 'TK.view.ky.AbstractWindow',
    alias: 'widget.kyreport2',

    width:400,
    title: 'Текущее расположение контейнеров на площадке',
    bodyPadding: 5,

    buildItems: function (config) {
        config.items = [
            {
                xtype: 'combo',
                fieldLabel: 'Сектор',
                itemId:'sector',
                store: 'ky.YardSectors',
                displayField: 'name',
                valueField:'hid',
                typeAhead: false,
                hideTrigger:true,
                minChars:1,
                forceSelection:true,
                name : 'sector',
                listConfig: {
                    loadingText: 'Поиск...',
                    emptyText: 'Найдено 0 совпадений'
                }
            },
            {
                fieldLabel: 'Позиция',
                xtype: 'numberfield',
                itemId:'x',
                name: 'x',
                minValue: 1,
                allowDecimals: false
            },
            {
                fieldLabel: 'Ряд',
                xtype: 'numberfield',
                itemId:'y',
                name: 'y',
                minValue: 1,
                allowDecimals: false
            },
            {
                fieldLabel: 'Ярус',
                xtype: 'numberfield',
                itemId:'z',
                name: 'z',
                minValue: 1,
                allowDecimals: false
            }
        ];
    },
    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.buttons.splice(0,0,{
            text: 'Excel',
            scope: this,
            iconCls:'export2Xls',
            action: 'excel'
        });
    }
});