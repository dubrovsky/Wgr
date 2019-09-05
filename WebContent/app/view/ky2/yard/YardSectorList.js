Ext.define('TK.view.ky2.yard.YardSectorList', {
    extend: 'TK.view.nsi.EditList',
    alias: 'widget.ky2yardsectorlist',

    width: 700,
    editPrivileg: 'CIM_KONT_YARD',
    itemId: 'ky2yardsectorlist',

    buildTitle: function (config) {
        config.title = 'Сектора';
    },

    buildStoreModel: function () {
        return 'TK.model.ky2.YardSector';
    },
    buildUrlPrefix: function () {
        return 'ky2/secure/YardSector';
    },
    buildColModel: function (config) {
        config.items.columns = [
            {
                xtype: 'actioncolumn',
                width: 55,
                items: [
                    {
                        icon: './resources/images/save.gif',
                        tooltip: this.ttipSave,
                        action: 'save',
                        handler: function (view, rowIndex, colIndex) {
                            var yardsectorlist = view.up('grid'),
                                yardsector = yardsectorlist.getStore().getAt(rowIndex);
                            yardsectorlist.fireEvent('saveYardSector', yardsectorlist, yardsector);
                        }
                    },
                    {
                        icon: './resources/images/delete.png',
                        tooltip: this.ttipDel,
                        action: 'delete',
                        handler: function (view, rowIndex, colIndex) {
                            var yardsectorlist = view.up('grid'),
                                yardsector = yardsectorlist.getStore().getAt(rowIndex);
                            yardsectorlist.fireEvent('deleteYardSector', yardsectorlist, yardsector);
                        }
                    }
                ]
            },
            {
                text: this.headerName,
                dataIndex: 'name',
                flex: 1,
                editor: {xtype: 'textfield', maxLength: 20},
                renderer: TK.Utils.renderLongStr
            },
            {
                text: this.headerDescr,
                dataIndex: 'descr',
                flex: 1,
                editor: {xtype: 'textfield', maxLength: 100},
                renderer: TK.Utils.renderLongStr
            }
        ];
    },
    newRecord: function () {
        return Ext.create('TK.model.ky.YardSector');
    }

});
