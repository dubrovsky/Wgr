Ext.define('TK.view.ky.BaseAvtosOutDir', {
    extend: 'TK.view.ky.BaseList',
    alias:'widget.kybaseavtosoutdir',

    selType: 'checkboxmodel',

    buildColumns: function (config) {
        config.columns = {
            items:[
                {text:'Авто', dataIndex:'no_avto', flex:1}
            ]
        };
    },
    buildStore:function (config) {
        config.store = 'ky.AvtosOutDir';
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
            {text: 'Фильтр', iconCls:'filter', action:'filterAvtosOutDir'},'-',
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
                    {text: 'Сохранить', action:'saveKontInAvtoOut', iconCls:'save'}
                ]
            }
        ];
    },
    initFieldsWithDefaultsValues: function(avto){
        this.down('datefield#dotpDate').setValue(avto.get('dotpDate'));
        this.down('timefield#dotpTime').setValue(avto.get('dotpTime'));
    }

});
