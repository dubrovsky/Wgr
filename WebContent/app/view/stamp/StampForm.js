/**
 * Форма редактирования/добавления штампа
 */
Ext.define('TK.view.stamp.StampForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.stampform',

    requires: [
        'TK.Utils'
    ],

    title: this.title,
    width: 1250,
    height:700,
    modal: true,
    layout: 'fit',
    initComponent: function () {
        this.items = [
            {
                xtype: 'panel',
                itemId:'stampTabs',
                overflowY: 'auto',
                items: [
                    {
                        title: this.mainTitle,
                        itemId:'stampTab',
                        layout: 'fit',
                        items:[
                            {
                                xtype:'form',
                                itemId:'mainStampForm',
                                layout: 'hbox',
                                bodyPadding: 5,
                                defaults:{anchor:'100%'},
                                items:[
                                    {xtype:'hidden', name:'hid'},
                                    {xtype:'hidden', name:'dattr'},
                                    {xtype:'hidden', name:'un'},
                                    {xtype: 'textfield', name: 'descr',itemId: 'descr', fieldLabel: this.hdrdescr, maxLength: 100,minWidth:500,margins: '0 5 0 0'},
                                    {
                                        xtype: 'fieldcontainer',
                                        fieldLabel: this.labelCodePer,
                                        layout: 'hbox',
                                        itemId: 'code_per_gr',
                                        items: [
                                            {xtype: 'textfield', name: 'codePer',itemId: 'codePer', maxLength: 4, allowBlank: false},
                                            {xtype:'button', text:'...', action:'showPer',margins: '0 0 0 5'}
                                        ]
                                    },
                                    // {xtype: 'numberfield', name: 'llx',itemId: 'llx', fieldLabel: this.labelllx,maxValue: 999999, minValue: 0,maxWidth:200, allowBlank: true},
                                    // {xtype: 'numberfield', name: 'lly',itemId: 'lly', fieldLabel: this.labellly,maxValue: 999999, minValue: 0,maxWidth:200, allowBlank: true},
                                    // {xtype: 'numberfield', name: 'urx',itemId: 'urx', fieldLabel: this.labelurx,maxValue: 999999, minValue: 0,maxWidth:200, allowBlank: true},
                                    // {xtype: 'numberfield', name: 'ury',itemId: 'ury', fieldLabel: this.labelury,maxValue: 999999, minValue: 0,maxWidth:200, allowBlank: true}
                                ],
                                listeners: {
                                    // fires when validity of any field is changed
                                    // -> use this event, because validitychange event won't work
                                    fieldvaliditychange: function (form) {
                                        var formIsValid = form.isValid(),
                                            parentPanel = form.up('stampform'),
                                            buttonToBind = parentPanel.down('#stampSaveBtn'),
                                            buttonToBind2 = parentPanel.down('#stampSaveExitBtn');

                                        buttonToBind.setDisabled(!formIsValid);
                                        buttonToBind2.setDisabled(!formIsValid);
                                    }
                                }
                            }
                        ]
                    },
                    {
                        title: this.bordersTitle,
                        itemId:'bordersTab',
                        items:[
                            {
                                xtype: 'grid',
                                itemId:'bordersGrid',
                                store:'stamp.Borders',
                                viewConfig: {
                                    stripeRows: true,
                                    singleSelect:true
                                },
                                columnLines: true,
                                columns:[
                                    {text:'hid', dataIndex:'hid', flex:1},
                                    {text: this.hdrBorder, dataIndex: 'border', flex:1},
                                    {text: 'rllx', dataIndex: 'rllx', flex:1},
                                    {text: 'rlly', dataIndex: 'rlly', flex:1},
                                    {text: 'rurx', dataIndex: 'rurx', flex:1},
                                    {text: 'rury', dataIndex: 'rury', flex:1},
                                    {text: this.hdrColor, dataIndex: 'color', flex:1},
                                    {text: this.hdrRadius, dataIndex: 'radius', flex:1}
                                ]
                            }],
                        dockedItems:[
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                layout: 'column',
                                items: [
                                    '-',
                                    {xtype: 'button', text: this.btnAdd, border: 1, action:'addBorder'},
                                    '-',
                                    {xtype: 'button', text: this.btnEdit, border: 1, action:'editBorder'},
                                    '-',
                                    {xtype: 'button', text: this.btnDel, border: 1, action:'delBorder'}
                                ]
                            }
                        ]
                    },
                    {
                        title: this.txtTitle,
                        itemId:'txtTab',
                        items:[
                            {
                                xtype: 'grid',
                                itemId:'txtGrid',
                                store:'stamp.Texts',
                                viewConfig: {
                                    stripeRows: true,
                                    singleSelect:true
                                },
                                columnLines: true,
                                columns:[
                                    {text:'hid', dataIndex:'hid', flex:1},
                                    {text: this.hdrName, dataIndex: 'name', flex:1},
                                    {text: this.hdrText, dataIndex: 'txt', flex:4, renderer: TK.Utils.renderLongStr},
                                    {text: 'rllx', dataIndex: 'rllx', flex:1},
                                    {text: 'rlly', dataIndex: 'rlly', flex:1},
                                    {text: 'rurx', dataIndex: 'rurx', flex:1},
                                    {text: 'rury', dataIndex: 'rury', flex:1},
                                    {text: this.hdrColor, dataIndex: 'color', flex:1},
                                    {text: this.hdrfontFamily, dataIndex: 'fontFamily', flex:2, renderer: TK.Utils.renderLongStr},
                                    {text: this.hdrFontSize, dataIndex: 'fontSize', flex:2},
                                    {text: this.hdrLeading, dataIndex: 'leading', flex:2},
                                    {text: this.hdrBold, xtype : 'checkcolumn',dataIndex: 'bold', flex:2,listeners: {beforecheckchange: function(){return false;}},editor: {xtype: 'checkbox'}},
                                    {text: this.hdrItalic, xtype : 'checkcolumn', dataIndex: 'italic', flex:2,listeners: {beforecheckchange: function(){return false;}},editor: {xtype: 'checkbox'}},
                                    {text: this.hdrUnderline, xtype : 'checkcolumn', dataIndex: 'underline', flex:2,listeners: {beforecheckchange: function(){return false;}},editor: {xtype: 'checkbox'}},
                                    {text: this.hdrUppercase, xtype : 'checkcolumn', dataIndex: 'uppercase', flex:2,listeners: {beforecheckchange: function(){return false;}},editor: {xtype: 'checkbox'}},
                                    {text: this.hdrRotate, dataIndex: this.hdrRotate, flex:2},
                                    {text: this.hdrTabular, xtype : 'checkcolumn', dataIndex: 'tabular', flex:2,listeners: {beforecheckchange: function(){return false;}},editor: {xtype: 'checkbox'}},
                                    {text: this.hdrMask, dataIndex: 'mask', flex:2}
                                ]
                            }],
                        dockedItems:[
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                layout: 'column',
                                items: [
                                    '-',
                                    {xtype: 'button', text: this.btnAdd, border: 1, action:'addPic'},
                                    '-',
                                    {xtype: 'button', text: this.btnEdit, border: 1, action:'editPic'},
                                    '-',
                                    {xtype: 'button', text: this.btnDel, border: 1, action:'delPic'}
                                ]
                            }
                        ]
                    },
                    {
                        title: this.imgTitle,
                        itemId:'picsTab',
                        store:'stamp.Pictures',
                        defaultType: 'container',
                        layout: 'hbox',
                        items:[
                            {
                                xtype: 'grid',
                                store:'stamp.Pictures',
                                itemId:'picsGrid',
                                flex:2,
                                viewConfig: {
                                    stripeRows: true,
                                    singleSelect:true
                                },
                                columnLines: true,
                                columns:[
                                    {text:'hid', dataIndex:'hid', flex:1},
                                    {text: this.hdrdescr, dataIndex: 'descr', flex:4},
                                    {text: 'rllx', dataIndex: 'rllx', flex:1},
                                    {text: 'rlly', dataIndex: 'rlly', flex:1},
                                    {text: 'rurx', dataIndex: 'rurx', flex:1},
                                    {text: 'rury', dataIndex: 'rury', flex:1},
                                    {text: 'pict', dataIndex: 'pict', flex:1,hidden: true}
                                ],
                                listeners: {
                                    select:function (grid,record) {
                                        var imagevwr=Ext.ComponentQuery.query("stampform #picsTab #preview")[0];
                                        if( record.get('pict')) {
                                            imagevwr.setSrc('data:image/jpeg;base64,' + record.get('pict'));
                                            imagevwr.updateLayout();
                                        }
                                    }
                                }
                            },
                            {
                                xtype:'panel',
                                flex:1,
                                layout: 'hbox',
                                items:[
                                    {xtype: 'image',itemId:'preview',flex:1,height: 200}
                                ]
                            }

                        ],
                        dockedItems:[
                            {
                                xtype: 'toolbar',
                                dock: 'top',
                                layout: 'column',
                                items: [
                                    '-',
                                    {xtype: 'button', text: this.btnAdd, border: 1, action:'addPic'},
                                    '-',
                                    {xtype: 'button', text: this.btnEdit, border: 1, action:'editPic'},
                                    '-',
                                    {xtype: 'button', text: this.btnDel, border: 1, action:'delPic'}
                                ]
                            }
                        ]

                    }
                ]
            }
        ];
            this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '-', {xtype: 'button', text: this.btnSaveExit,itemId:'stampSaveExitBtn',action:'stampSaveStampExit', border: 1, handler: this.onSave},
                        '-', {xtype: 'button', text: this.btnSave,itemId:'stampSaveBtn',action:'saveStamp', border: 1, handler: this.onSave},
                        { xtype: 'tbfill' },
                        '-', {xtype: 'button', text: this.btnPreView, border: 1, action: 'previewStamp'},
                        '-', {xtype: 'button', text: this.btnExit, border: 1, handler: this.onCancel}
                    ]
                }
            ];
            this.callParent();
    },
    onCancel: function (btn) {
        var previewWin=Ext.ComponentQuery.query('#previewWin')[0];
        if(previewWin)
            previewWin.destroy();
        btn.up('window').destroy();
    }
});
