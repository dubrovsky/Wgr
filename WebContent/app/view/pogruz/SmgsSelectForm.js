/**
 * Created by Odmin on 19.02.2019.
 * Form for selecting numbers of smgs for processing with map peregruz
 */
Ext.define('TK.view.pogruz.SmgsSelectForm', {
    extend: 'Ext.window.Window',
    xtype: 'smgsselectform',

    requires: [
        'TK.store.PeregruzSmgsSelectStore',
        'TK.view.edit.UploadPogruzListFormWin'
    ],

    title: this.title,
    height: 500,
    width: 650,
    layout: 'fit',
    dateFilter: false,
    modal:true,
    y: 0,
    localStore: Ext.create('TK.store.PeregruzSmgsSelectStore'),

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
                            enableTextSelection: true
                        },

                        columns: [
                            {xtype: 'rownumberer', width: 40,sortable: false},
                            {
                                dataIndex: 'hid',
                                 hidden: true
                            },
                            {
                                text: this.headerG694,
                                dataIndex: 'g694',
                                sortable: true,
                                flex: 2
                            },

                            {
                                text: this.headerVagNum,
                                dataIndex: 'vags',
                                sortable: false,
                                flex: 3
                            },
                            {
                                text: this.headerContNum,
                                dataIndex: 'konts',
                                sortable: false,
                                flex: 3
                            },
                            {
                                text: this.headertNstn,
                                dataIndex: 'g101',
                                sortable: true,
                                flex: 4
                            },
                            {
                                text: this.headerAltered,
                                dataIndex: 'altered',
                                sortable: true,
                                flex: 5
                            },
                            {
                                xtype: 'checkcolumn',
                                flex: 1,
                                dataIndex: 'isSelected'
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
        this.up().up().close();
    },
    onOk:function (btn) {
        var sel=[];
        this.up('panel').localStore.each(function(record,id){
            if(record.get('isSelected'))
                sel.push(record.get('hid'));
        });
        if (sel.length > 0) {
            var win = Ext.widget('uploadPogruzListFormWin');
            var form = win.down('form').getForm();
            form.findField('query').setValue(sel);
            form.findField('name').setValue('smgslist');

            win.show();
        }
    }
});