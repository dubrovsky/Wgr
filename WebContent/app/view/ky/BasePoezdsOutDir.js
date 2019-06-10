Ext.define('TK.view.ky.BasePoezdsOutDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybasepoezdsoutdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Поезд', dataIndex:'poezd.nppr', flex:1},
                {text:'Вагон', dataIndex:'nvag', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.VagonsOutDir';
    },
    buildBottomToolbar: function(config) {
        config.bbar = {
            xtype: 'pagingtoolbar',
            store: config.store,
            displayInfo: true
        };
    },
    buildTopToolbar: function(config) {
        config.tbar = [
            {text: 'Фильтр', iconCls:'filter', action:'filterPoezdsOutDir'},'-',
            {
                xtype: 'buttongroup',
                columns: 4,
                title:'Дата отправления',
                items:[
                    {
                        fieldLabel:'Дата',
                        name : 'dotpDate',
                        itemId: 'dotpDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        labelWidth: 30,
                        width: 120
                    },{
                        fieldLabel:'Время',
                        name : 'dotpTime',
                        itemId: 'dotpTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        labelWidth: 40,
                        width: 110
                    },
                    {text: 'Сохранить', action:'saveKontInPoezdOut', iconCls:'save'}
                ]
            }

        ];
    },
    initFieldsWithDefaultsValues: function(poezd){
        //var poezd = this.getStore().first().getPoezd();
        this.down('datefield#dotpDate').setValue(poezd.get('dotpDate'));
        this.down('timefield#dotpTime').setValue(poezd.get('dotpTime'));
    }
});
