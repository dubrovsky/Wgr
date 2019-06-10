/**
 * Created by Odmin on 25.02.2019.
 * showing combination of data  from excel and db
 */
Ext.define('TK.view.pogruz.Map2BaseSelectForm', {
    extend: 'Ext.window.Window',

    requires: [
        'TK.Utils',
        'TK.store.PeregruzMap2Base'
    ],

    title: this.title,
    height: 700,
    width: 1200,
    layout: 'fit',
    dateFilter: false,
    modal: true,
    y: 0,
    localStore: Ext.create('TK.store.PeregruzMap2Base'),
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                layout: 'fit',
                items: [
                    {
                        xtype: 'grid',
                        columnLines: true,
                        store: this.localStore,
                        viewConfig: {
                            stripeRows: true,
                            singleSelect: true,
                            enableTextSelection: true,

                        },
                        columns: [
                            {xtype: 'rownumberer', width: 40,sortable: false },
                            {text: this.headerId,dataIndex: 'cs_hid',sortable: true,flex: 3,hidden: false},
                            {text: this.headerKonNdb, dataIndex: 'utin_db', sortable: true, flex: 5},
                            {text: this.headerKonN, dataIndex: 'utin', sortable: true, flex: 5},
                            {text: this.headerFoot, dataIndex: 'sizefoot', sortable: true, flex: 3},
                            {text: this.headerContSize, dataIndex: 'uti_type', sortable: false, flex: 4},
                            {text: this.headerTara, dataIndex: 'tarakont', sortable: true, flex: 3},
                            {text: this.headerMaxLoad, dataIndex: 'grpodkont', sortable: false, flex: 3},
                            {text: this.headerWagN, dataIndex: 'nvag', sortable: false, flex: 5},
                            {text: this.headerKlient, dataIndex: 'klientname', sortable: false, flex: 5},
                            {text: this.headerTaraVag, dataIndex: 'taravag', sortable: false, flex: 3},
                            {text: this.headerMaxLoadVag, dataIndex: 'grpod', sortable: false, flex: 3},
                            {text: this.headerKolOs, dataIndex: 'kolos', sortable: false, flex: 3},
                            {text: this.headerPlomb, dataIndex: 'znak', sortable: false, flex: 3},
                            {text: this.headerG694, dataIndex: 'g694', sortable: true, flex: 4},
                            {xtype: 'checkcolumn', flex: 1, dataIndex: 'isSelected',
                                listeners: {
                                    beforecheckchange: function (view, cell, cellIdx, record, row, rowIdx, eOpts) {
                                        var storeD = view.up().up().store.data.items[cell];
                                        if (storeD.get('utin') == '' || storeD.get('cs_hid') == 'null')
                                            return false;
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '-',
                        {
                            xtype: 'button',
                            text: this.btnOk,
                            border: 1,
                            handler: this.onOk

                        },
                        '-',
                        {
                            xtype: 'button',
                            text: this.btnCancel,
                            border: 1,
                            handler: this.onCancel
                        }
                    ]
                }
            ]
        ],
            this.callParent();
    },
    onCancel: function (btn) {
        var form = this.up().up();
        form.close();
    },
    onOk: function (btn) {
        var sel = [], params = {};
        var form = this.up().up();
        this.up('panel').localStore.each(function (record, id) {
            if (record.get('isSelected'))
                sel.push(record);
        });

        var selJson = Ext.encode(Ext.Array.pluck(sel, 'data'));
        // console.log(selJson);
        params['jsonData'] = selJson;
        if (sel.length > 0) {
            form.setLoading(true);
            Ext.Ajax.request({
                url: 'Doc2Doc_uploadPeregruz2BaseList.do',
                // jsonData: selJson,
                params: params,
                scope: this,
                success: function (response, options) {
                     form.setLoading(false);
                    this.up().up().parent.getCenter().getActiveTab().getStore().reload();
                    Ext.Msg.show({
                        title: this.successMsgTitle,
                        msg: 'OK',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        scope: this,
                        fn: function () {
                            this.up().up().close();
                        }
                    });
                },
                failure: function (response) {
                    form.setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    }
});