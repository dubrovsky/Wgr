Ext.define('TK.view.ky2.avto.out.AvtoList', {
    extend:'TK.view.ky2.avto.BaseAvtoList',
    alias:'widget.ky2avtooutlist',
    itemId:'ky2avtolist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.splice(3, 0,
            {text:this.headerDateOut, dataIndex:'dotp', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtosOut';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtosOut';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(9, 0,
            {tooltip: this.btnToAvto, iconCls:'truck', action:'showAvtosIntoDir4AvtoOutBind'},'-' ,
            {tooltip: this.btnToPoezd, iconCls:'train2', action:'getAvtoAndPoezdForBind'},'-',
            {tooltip: this.btnToYard, iconCls:'cont', action:'getAvtoAndYardForBind'},'-'
        );

        var splitbutton = Ext.create('Ext.button.Split', {
            tooltip: this.btnPrint, iconCls: 'print', action: 'print',
            menu: [
                {text: 'WZ', iconCls: 'excel', action: 'wz'}, '-'
            ]
        });

        if (tkUser.hasPriv('KY_AKT')) {
            splitbutton.menu.add(
                {text: 'Акт', iconCls: 'excel', action: 'addAct'}
            );
        }
        if (tkUser.hasPriv('KY_INTERCHANGE')) {
            splitbutton.menu.add(
                {text: 'INTERCHANGE', iconCls: 'excel', action: 'addInterchange'}
            );
        }
        config.tbar.splice(15, 0, splitbutton);
        if (tkUser.hasPriv('KY_AVTO_REP_OUT')) {
            config.tbar.push(
                {tooltip: 'Отчет по отправлению', iconCls: 'excel', action: 'avtoReportOut'}
            );
        }

    }
});
