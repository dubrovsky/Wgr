/**
 * Created by Damned on 05.10.2019.
 */
Ext.define('TK.view.edit.GroupEdit', {
    extend: 'Ext.window.Window',
    xtype: 'groupedit',
    alias: 'widget.groupedit',

    requires: [
        'TK.Utils',
        'TK.Validators',
        'TK.store.GroupEditStore'
    ],

    itemId:'groupEditForm',
    title: this.title,
    height: 600,
    width: 1200,
    layout: 'fit',
    dateFilter: false,
    modal:true,
    widthMult:30,
    initComponent: function () {
        this.items = [

            {
                xtype: 'grid',
                itemId:'groupEditGrid',
                columnLines: true,
                lookDoc:this.lookDoc,
                plugins: [{
                    ptype: 'cellediting',
                    clicksToEdit: 1,
                    pluginId: 'cellplugin',

                    listeners: {
                         beforeedit: function(edit,e,opt)
                         {// не даем редактировать поле если его значение равно -2 или -1
                            if (e.value == -1||e.value == -2) {
                            return false;}
                        },
                        edit: function(edit,e,opt)
                        { // не даем ввести пользователю -2 и -1
                            if(e.value==='-2'||e.value==='-1')
                                e.record.reject();
                        }
                    }
                }],
                selModel: {
                    selType: 'cellmodel'
                },
                store: Ext.create('TK.store.GroupEditStore'),
                viewConfig: {
                    stripeRows: true,
                    singleSelect: true,
                    markDirty: true,
                    enableTextSelection: true
                },

                columns: [
                    // ID записи
                    {dataIndex: 'hid', hidden: true},
                    // номер по порядку
                    {xtype: 'rownumberer', sortable: false, width: this.widthMult},
                    // номер вагона
                    {text: this.nvagHdr, dataIndex: 'nvag', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 20},
                        renderer: function(value,metaData) {
                            if(value==-1)
                                return this.lookDoc;

                            var result = TK.Validators.vagNum(value);
                            if (Ext.isString(result)) {
                                metaData.innerCls = 'red';
                                metaData.tdAttr = 'data-qtip="'+result+'"';
                            }
                            return value;
                        }
                    },
                    // Порядковый номер вагона
                    {text: this.sortHdr, dataIndex: 'sort', sortable: true, width: 2*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 100,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                            }
                        },
                    //собственник вагона
                    {text: this.klientNameHdr, dataIndex: 'klientname', sortable: true, width: 4*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 124},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }
                    },
                    //вагон предосатвил
                    {text: this.vagOtmHdr, dataIndex: 'vagOtm', sortable: true, width: 3*this.widthMult,editor:
                            {
                                xtype:'combo',
                                editable: false,
                                itemId:'vagOtmCombo',
                                store: {fields: ['displ'],data:[
                                        {"displ":'П'},
                                        {"displ":'О'}
                                    ]},
                                queryMode: 'local',
                                valueField: 'displ',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{displ}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>')
                            },
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    //грузоподъемность вагона
                    {text: this.grPodHdr, dataIndex: 'grPod', sortable: true, width: 3*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 4000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    //количество осей
                    {text: this.kolOsHdr, dataIndex: 'kolOs', sortable: true, width: 2*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 100,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // тара вагона
                    {text: this.taraVagHdr, dataIndex: 'taraVag', sortable: true, width: 2*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 100000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    //контейнер
                    {text: this.utiNHdr, dataIndex: 'utiN', sortable: true, width: 3*this.widthMult,
                        renderer: function(value, metaData, record) {
                            if(value==-2)
                                return '';
                            if(value==-1)
                                return this.lookDoc;

                            var result = TK.Validators.kontNum(value);
                            if (Ext.isString(result)) {
                                metaData.innerCls = 'red';
                                metaData.tdAttr = 'data-qtip="'+result+'"';
                            }
                            return value;
                        },
                        editor:{xtype: 'textfield', maxLength: 16}},
                    //типоразмер контейнера
                    {text: this.utiTypeHdr, dataIndex: 'utiType', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 16},
                        renderer: function(value, metaData, record) {
                            if(value==-2)
                                return '';
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    //грузоподъемност контейнера
                    {text: this.grPodKontHdr, dataIndex: 'grPodKont', sortable: true, width: 3*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 4000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData, record) {
                            if(value==-2)
                                return '';
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    //тара контейнера
                    {text: this.taraKontHdr, dataIndex: 'taraKont', sortable: true, width: 3*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 1000000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData, record) {
                            if(value==-2)
                                return '';
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // масса нетто
                    {text: this.massaHdr, dataIndex: 'massa', sortable: true, width: 3*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 1000000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // масса брутто
                    {text: this.bruttoHdr,dataIndex: 'brutto', sortable: false, width: 3*this.widthMult,menuDisabled:true,
                        renderer: function(value, metaData, record) {
                        var netto=parseFloat(record.get('massa')),
                            tara=parseFloat(record.get('taraKont'));
                        var brutto= netto>0?(netto + tara).toFixed(3):0;
                        return  brutto>-1?brutto:this.lookDoc;
                    }},
                    //ГНГ
                    {text: this.kgvnHdr, dataIndex: 'kgvn', sortable: true, width: 2*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 9},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // места
                    {text: this.placesHdr, dataIndex: 'places', sortable: true, width: 2*this.widthMult,
                        editor: {xtype: 'numberfield',minValue: 0, maxValue: 100000,spinUpEnabled:false,spinDownEnabled:false,hideTrigger:true},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // род упаковки
                    {text: this.rodHdr, dataIndex: 'upak', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 50},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }},
                    // погружено
                    {text: this.g22Hdr, dataIndex: 'g22', sortable: true, width: 3*this.widthMult,
                        renderer: function(value, metaData,record)
                        {
                            if(value==='1') record.set('g22','Отправитель');
                            if(value==='0')  record.set('g22','Перевозчик');
                            if(value==='0'||value==='1')
                            {
                                record.dirty=false;
                                record.modified={};
                            }
                            return record.get('g22');
                        },
                        editor:
                        {
                            xtype:'combo',
                            editable: false,
                            itemId:'vagOtmCombo',
                            store: {fields: ['idx','displ'],data:[
                                {'idx':'1','displ':'Отправитель'},
                                {'idx':'0','displ':'Перевозчик'}
                                ]},
                            queryMode: 'local',
                            displayField:'displ',
                            valueField: 'displ',
                            tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{displ}</div>','</tpl>'),
                            displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>')
                        }
                    },
                    //способ определения массы
                    {text: this.gs_48Hdr, dataIndex: 'gs_48', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 50}},
                    // номер отправки
                    {text: this.g694Hdr, dataIndex: 'g694', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 50}},
                    // дата отправки
                    {text: this.g281Hdr, dataIndex: 'g281',xtype: 'datecolumn', format: 'd.m.Y',sortable: true, width: 3*this.widthMult,
                        editor: {xtype: 'datefield', format: 'd.m.Y'}},
                    //номер поезда
                    {text: this.npoezdHdr, dataIndex: 'npoezd', sortable: true, width: 3*this.widthMult,
                        editor:{xtype: 'textfield', maxLength: 32}},
                    //пломбы
                    {text: this.plombsHdr, dataIndex: 'plombs', sortable: false, width: 4*this.widthMult,menuDisabled:true,
                        editor:{xtype: 'textfield'},
                        renderer: function(value, metaData) {
                            if(value==-1)
                                return this.lookDoc;
                            return value;
                        }}
                    ],
                    listeners:{
                        afterrender: function(c) {
                            this.up().menuSetUp(c);
                        }
                    }
                },
            this.dockedItems = [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        '-',
                        {xtype: 'button', text: this.btnSave, border: 1, handler: this.onSave},
                        '-',
                        {xtype: 'button', text: this.btnCancel, border: 1, handler: this.onCancel}
                    ]
                }
            ]
        ], this.callParent();
    },
    listeners: {
        'close': function closeWin(win) {
            if(Ext.ComponentQuery.query('groupedit')[0].parentStore) {
                Ext.ComponentQuery.query('groupedit')[0].parentStore.reload();
            }
        }
    },
    /**
     * надатие на кнопку отмена
     * @param btn
     */
    onCancel: function (btn) {
        var form = this.up().up();
        form.close();
    },
    onSave: function (btn) {
        var sel = [], params = {}, form = Ext.ComponentQuery.query('#groupEditForm')[0],
            gridStore=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].getStore();
        gridStore.each(function (record, id) {
            if(record.dirty)
                sel.push(record);
        });
        params['query'] = Ext.encode(Ext.Array.pluck(sel, 'data'));
        if (sel.length > 0) {
            form.setLoading(true);
            Ext.Ajax.request({
                url: 'Smgs_groupEditSave.do',
                // jsonData: selJson,
                params: params,
                scope: this,
                success: function (response, options) {
                    form.setLoading(false);
                    Ext.Msg.show({
                        title: this.successMsgTitle,
                        msg: Ext.decode(response.responseText)['result'],
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO,
                        scope: this,
                        fn: function () {
                            // if(this.up('panel').parentStore) {
                            //     this.up('panel').parentStore.reload();
                            // }
                            form.close();
                        }
                    });
                },
                failure: function (response) {
                    form.setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
    },
    /**
     * Устнавливаем настройки выпадающих меню столбцов
     * @param c
     */
    menuSetUp:function(c)
    {
        //сделать все нулями
        var menu = c.headerCt.getMenu(),
            makeZeroes = menu.add({
            itemId:'makeZeroes',
            text: Ext.ComponentQuery.query('#groupEditForm')[0].makeAllZeroes,
            handler: this.onMakeZeros
        }),//сделать все пустыми строками
            makeEmptyStrings = menu.add({
            itemId:'makeEmty',
            text: Ext.ComponentQuery.query('#groupEditForm')[0].makeAllEmpty,
            handler: this.onMakeEmpty
        }),//заменить путые значения на выбранное
            makeEmtyCurrent = menu.add({
            itemId:'makeEmtyCurrent',
            text: '!заменить пустые на VAL',
            handler: this.onMakeEmptyCurrent
        }),//заменить все значения на выбранное
            makeAllCurrent = menu.add({
            itemId:'makeAllCurrent',
            text: '!заменить все на VAL',
            handler: this.onMakeAllCurrent
        });

        menu.on('beforeshow', function(btn) {
            var currentDataIndex = menu.activeHeader.dataIndex;

            if (currentDataIndex === 'grPod'||currentDataIndex === 'sort'||currentDataIndex === 'kolOs'||currentDataIndex === 'taraVag'||
                currentDataIndex === 'grPodKont'||currentDataIndex === 'taraKont'||currentDataIndex === 'massa'||currentDataIndex === 'places') {
                makeZeroes.show();
            } else {
                makeZeroes.hide();
            }

            if (currentDataIndex === 'nvag'||currentDataIndex === 'klientname'||currentDataIndex === 'utiN'||currentDataIndex === 'utiType'||
                currentDataIndex === 'upak'||currentDataIndex === 'gs_48'||currentDataIndex === 'g694'||currentDataIndex === 'npoezd'||currentDataIndex === 'plombs') {
                makeEmptyStrings.show();
            } else {
                makeEmptyStrings.hide();
            }

            var selection=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].selModel.getSelection()[0], val;
            if(selection)
                val= selection.data[currentDataIndex];
            if(selection&&val!==0&&val!=='') {
                if (val != -2 && val != -1) {
                    makeEmtyCurrent.setText(Ext.ComponentQuery.query('#groupEditForm')[0].changeEmpty+val);
                    makeAllCurrent.setText(Ext.ComponentQuery.query('#groupEditForm')[0].changeAll+val);
                    makeEmtyCurrent.show();
                    makeAllCurrent.show();
                }
            }
            else
            {
                makeEmtyCurrent.hide();
                makeAllCurrent.hide();
            }
        });
    },
    onMakeAllCurrent:function(btn)
    {
        var dataIndx=btn.ownerCt.ownerButton.dataIndex,
            selection=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].selModel.getSelection()[0];

        Ext.ComponentQuery.query('#groupEditForm')[0].changeAllClmnVals(btn,selection.data[dataIndx]);
    },

    onMakeEmptyCurrent:function(btn)
    {
        var dataIndx=btn.ownerCt.ownerButton.dataIndex,
            selection=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].selModel.getSelection()[0];
        Ext.ComponentQuery.query('#groupEditForm')[0].changeAllClmnEmptyVals(btn,selection.data[dataIndx]);
    },

    /**
     * Делает все нулями
     * @param btn кнопка вызова
     */
    onMakeZeros:function (btn) {
        Ext.ComponentQuery.query('#groupEditForm')[0].changeAllClmnVals(btn,0);
    },
    /**
     * Делает все пустыми строками
     * @param btn кнопка вызова
     */
    onMakeEmpty:function (btn) {
        Ext.ComponentQuery.query('#groupEditForm')[0].changeAllClmnVals(btn,'');
    },
    /**
     *  заменить все на выбранное значение
     * @param btn кнопка вызова
     * @param val значение замены
     */
    changeAllClmnVals:function (btn,val) {
        var gridStore=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].getStore(),
            dataIndx=btn.ownerCt.ownerButton.dataIndex;
        gridStore.each(function(record){
            if(record.get(dataIndx)!='-1'&&record.get(dataIndx)!='-2')
                record.set(dataIndx,val);
        });
    },
    /**
     *  заменить все пустые выбранное значение
     * @param btn кнопка вызова
     * @param val значение замены
     */
    changeAllClmnEmptyVals:function (btn,val) {
        var gridStore=Ext.ComponentQuery.query('#groupEditForm #groupEditGrid')[0].getStore(),
            dataIndx=btn.ownerCt.ownerButton.dataIndex;
        gridStore.each(function(record){
            if(record.get(dataIndx)!='-1'&&record.get(dataIndx)!='-2'&&(record.get(dataIndx)===0||record.get(dataIndx)===''))
                record.set(dataIndx,val);
        });
    }
});
