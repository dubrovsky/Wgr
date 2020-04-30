Ext.define('TK.view.ky2.avto.into.AvtoList', {
    extend:'TK.view.ky2.avto.BaseAvtoList',
    alias:'widget.ky2avtointolist',

    requires: [],

    itemId:'ky2avtolist',

    buildColumns:function (config) {
        this.callParent(arguments);
        config.columns.items.splice(3, 0,
            {text:this.headerDateIn, dataIndex:'dprb', width:100, renderer: TK.Utils.renderLongStr}
        );
    },

    buildStore: function (config) {
        config.store = 'ky2.AvtosInto';
    },

    buildBottomToolbar: function (config) {
        this.callParent(arguments);
        config.bbar.store = 'ky2.AvtosInto';
    },
    buildTopToolbar: function (config) {
        this.callParent(arguments);
        config.tbar.splice(9, 0,
            {text: this.btnAddTrackByArr, iconCls: 'truck', action: 'createAvtoOutFromInto'}, '-',
            {tooltip: this.btnCopy, iconCls: 'copy', action: 'copyAvtoIntoToInto'}, '-',
            {tooltip: this.btnToAvto, iconCls: 'truck', action: 'showAvtosOutDir4AvtoIntoBind'}, '-',
            {tooltip: this.btnToPoezd, iconCls: 'train2', action: 'getAvtoAndPoezdForBind'}, '-',
            {tooltip: this.btnToYard, iconCls: 'cont', action: 'getAvtoAndYardForBind'}, '-'
        );
        config.tbar.splice(2, 0,
            {text: this.btnCreateFromOrder, iconCls: 'truck', action: 'importFromZayav'}, '-'
        );

        var splitbutton = Ext.create('Ext.button.Split', {
            tooltip: this.btnPrint, iconCls: 'print', action: 'print',
            menu: [
                {text: 'PZ', iconCls: 'excel', action: 'pz'}, '-'
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
        config.tbar.splice(21, 0, splitbutton);

    }
});
