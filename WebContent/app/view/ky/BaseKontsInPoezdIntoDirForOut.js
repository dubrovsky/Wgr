Ext.define('TK.view.ky.BaseKontsInPoezdIntoDirForOut', {
    extend: 'TK.view.ky.BaseKontsInPoezdIntoDir',
    alias:'widget.kybasekontsinpoezdintodirforout',

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
                    {text: 'Сохранить', action:'kontsIntoSave', iconCls:'save'}
                ]
            }
        );
    },
    initFieldsWithDefaultsValues: function(poezd){
        this.down('datefield#dotpDate').setValue(poezd.get('dotpDate'));
        this.down('timefield#dotpTime').setValue(poezd.get('dotpTime'));
    }
});
