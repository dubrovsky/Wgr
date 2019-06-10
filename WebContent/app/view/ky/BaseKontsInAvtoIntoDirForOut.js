Ext.define('TK.view.ky.BaseKontsInAvtoIntoDirForOut', {
    extend: 'TK.view.ky.BaseKontsInAvtoIntoDir',
    alias:'widget.kybasekontsinavtointodirforout',

    buildTopToolbar: function(config) {
        this.callParent(arguments);
        config.tbar.push(
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
                    {text: 'Сохранить', action:'kontsAvtoIntoSave', iconCls:'save'}
                ]
            }
        );
    },
    initFieldsWithDefaultsValues: function(avto){
        this.down('datefield#dotpDate').setValue(avto.get('dotpDate'));
        this.down('timefield#dotpTime').setValue(avto.get('dotpTime'));
    }
});
