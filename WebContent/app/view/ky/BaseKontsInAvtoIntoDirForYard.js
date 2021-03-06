Ext.define('TK.view.ky.BaseKontsInAvtoIntoDirForYard', {
    extend: 'TK.view.ky.BaseKontsInAvtoIntoDir',
    alias:'widget.kybasekontsinavtointodirforyard',

    buildTopToolbar: function(config) {
        this.callParent(arguments);
        config.tbar.push(
            {
                xtype: 'buttongroup',
                columns: 4,
                title:'Дата размещения',
                items:[
                    {
                        fieldLabel:'Дата',
                        name : 'dyardDate',
                        itemId: 'dyardDate',
                        xtype: 'datefield',
                        altFormats:'d.m.y',
                        labelWidth: 30,
                        width: 120,
                        value: new Date()
                    },{
                        fieldLabel:'Время',
                        name : 'dyardTime',
                        itemId: 'dyardTime',
                        xtype: 'timefield',
                        altFormats:'H:i',
                        labelWidth: 40,
                        width: 110,
                        value: new Date()
                    },
                    {text: 'Сохранить', action:'kontsAvtoIntoSave', iconCls:'save'}
                ]
            }
        );
    }
});
