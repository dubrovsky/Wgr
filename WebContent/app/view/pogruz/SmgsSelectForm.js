/**
 * Created by Odmin on 19.02.2019.
 * Form for selecting numbers of smgs for processing with map peregruz
 */
Ext.define('TK.view.pogruz.SmgsSelectForm', {
    extend: 'Ext.window.Window',
    xtype: 'smgsselectform',
    alias: 'widget.smgsselectform',

    requires: [
        'TK.Utils',
        'TK.store.PeregruzSmgsSelectStore',
        'TK.view.components.CheckColumn',
        'TK.view.edit.GroupEdit',
        'TK.view.edit.UploadPogruzListFormWin'
    ],

    title: this.title,
    itemId:'smgsselectform',
    height: 500,
    width: 700,
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
                itemId:'smgsselectformPanel',
                items: [
                    {
                        xtype: 'grid',
                        itemId:'smgsselectformGrid',
                        columnLines: true,
                        store: this.localStore,
                        viewConfig: {
                            stripeRows: true,
                            singleSelect: true,
                            markDirty: false,
                            enableTextSelection: true
                        },

                        columns: [
                            {xtype: 'rownumberer', width: 40,sortable: false},
                            {
                                dataIndex: 'hid',
                                hidden: false,
                                flex: 2
                            },
                            {
                                text: this.headerG694,
                                dataIndex: 'g694',
                                sortable: true,
                                flex: 3
                            },

                            {
                                text: this.headerVagNum,
                                dataIndex: 'vags',
                                sortable: false,
                                flex: 4
                            },
                            {
                                text: this.headerContNum,
                                dataIndex: 'konts',
                                sortable: false,
                                flex: 4
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
                                xtype: 'checkallcheckcolumn',
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
    listeners: {
        'close': function closeWin(win) {
            Ext.ComponentQuery.query('poezdselectform')[0].localStore.reload();
        }
    },
    /**
     * нажатие кнопки Отмена
     * @param btn
     */
    onCancel: function (btn) {
        this.up().up().close();
    },
    /**
     * нажатие кнопки OK
     * @param btn
     */
    onOk:function (btn) {
        var sel=[];
        this.up('panel').localStore.each(function(record,id){
            if(record.get('isSelected'))
                sel.push(record.get('hid'));
        });
        if(sel.length===0)
            return;
        switch (this.up('smgsselectform').mode)
        {
            //слияние шаблона и документа
            case 'avisoXsmgses':
                this.up('smgsselectform').avisoXsmgses(sel); break;
            //групповая печать
            case 'groupPrintTmpl':
                this.up('smgsselectform').groupPrintTmpl(sel); break;
            //групповое редактирование
            case 'groupEdit':
                this.up('smgsselectform').groupEdit(sel); break;
            case 'copy2arch':
                    this.up('smgsselectform').copy2arch(sel); break;
            case 'copy2route':
                this.up('smgsselectform').copy2route(sel); break;
            default:this.up('smgsselectform').uploadMapPogruz(sel);
        }
    },
    /**
     *  слияние шаблона и документа
     * @param sel список ID выбранных записей
     */
    avisoXsmgses:function(sel)
    {
        var params = {};
        params['search.hid']=this.hid;
        params['query']=sel;
        params['name']='smgslist';
        TK.Utils.makeAjaxRequest('Doc2Doc_avisoxsmgses.do',params,TK.Utils.avisoXsmgsMsgText,this);
    },
    /**
     *  групповая печать
     * @param sel список ID выбранных записей
     */
    groupPrintTmpl:function(sel)
    {
        var params={};

        params['routeId'] = this.routeId;
        params['search.type'] = this.type;
        params['task'] = this.task;
        params['query'] = sel.join(",");
        params['isView'] = false;
        params['smgs.hid'] = sel[0];
        this.fireEvent('doGroupPrintTmpl', params);
    },
    /**
     * копировать в архив
     * @param sel список ID выбранных записей
     */
    copy2route:function(sel){
        this.fireEvent("copy2routesmgses", sel,this.routeId,this.parentStore);
    },
    /**
     * копировать в архив
     * @param sel список ID выбранных записей
     */
    copy2arch:function(sel){
        var initObj = {task:'copy2arch',query1:sel};
        TK.Utils.makeAjaxRequest('Smgs_copy2arch.do',initObj,function () {return 'OK';},this);
    },
    /**
     * групповое редактирование
     * @param sel список ID выбранных записей
     */
    groupEdit:function(sel)
    {
        if (sel.length > 0) {
            var url='Smgs_getGroupEdit.do',params={},me=this;
            params['query'] = sel.join(",");
            me.setLoading(true);
            Ext.Ajax.request({
                url: url,
                params: params,
                scope: me,
                success: function(response, options) {
                    var win = Ext.widget('groupedit'),
                        grid=Ext.ComponentQuery.query('#groupEditForm > #groupEditGrid')[0];
                    win.parentStore=Ext.ComponentQuery.query('#smgsselectform >#smgsselectformPanel> #smgsselectformGrid')[0].getStore();
                    grid.store.loadRawData(Ext.JSON.decode(response.responseText.replace('success: true,','')));
                    me.setLoading(false);
                    win.show();
                },
                failure: function(response){
                    TK.Utils.makeErrMsg(response, this.errorMsg);
                    me.setLoading(false);
                }
            });
        }
    },
    /**
     * Отображение диалога загрузки файла карты погрузки
     * @param btn
     */
    uploadMapPogruz:function (sel) {

        if (sel.length > 0) {
            var win = Ext.widget('uploadPogruzListFormWin');
            var form = win.down('form').getForm();
            form.findField('query').setValue(sel);
            form.findField('name').setValue('smgslist');

            win.show();
        }
    }
});
