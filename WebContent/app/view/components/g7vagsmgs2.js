Ext.define('TK.view.components.g7vagsmgs2', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.g7vagsmgs2',
    xtype: 'g7vagsmgs2',

    requires: [
        'TK.Validators',
        'TK.store.tables.VgCtGrNodes',
        'TK.view.components.RowEditingMy'
    ],


    layout: 'fit',
    border: false,

    initComponent: function () {
        var rowEditing = Ext.create('TK.view.components.RowEditingMy', {
            clicksToMoveEditor: 1,
            autoCancel: true,
            errorSummary:false,
            pluginId:'g7plugin',
            listeners: {
                canceledit:function()
                {
                    // отмена изменений
                    var bstore=Ext.ComponentQuery.query('#g7grid')[0].backstore,
                        str=Ext.ComponentQuery.query('#g7grid')[0].getStore();
                    if(bstore.data.length>0)
                        str.removeAll();
                        bstore.data.each(function(record) {
                            str.add(record);
                        });
                    bstore.removeAll();
                },

                beforeedit: function (editor, context, eOpts ) {

                    if (editor.getEditor().floatingButtons.items.length === 2) {
                        editor.getEditor().floatingButtons.add(
                            {xtype: 'button',
                                text: editor.getEditor().floatingButtons.items.items[0].text,
                                itemId: 'update2',
                                listeners: {
                                    click: function () {
                                        editor.completeEdit();
                                    }
                                }
                            });
                        editor.getEditor().floatingButtons.add(
                            {
                                xtype: 'button',
                                text: editor.getEditor().floatingButtons.items.items[1].text,
                                itemId: 'cancel2',
                                listeners: {
                                    click: function () {
                                        editor.cancelEdit();
                                    }
                                }
                            });
                        editor.getEditor().floatingButtons.items.items[0].hide();
                        editor.getEditor().floatingButtons.items.items[1].hide();
                    }

                    var propes=Object.getOwnPropertyNames(editor.grid.getSelectionModel().getSelection()[0].data);

                    for(var i=0;i<propes.length;i++)
                    {
                        var comboStore=Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0]?Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0].store:null,
                            propVal=context.record.data[propes[i]];
                        if(comboStore)
                        {
                            comboStore.removeAll();
                            if(propVal)
                            {
                                // показать тригер Combobox
                                if(propes[i]==='vagOtm')
                                {
                                    Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0].hideTrigger=false;
                                    comboStore.add(
                                        {"idx":-1, "displ":'П',"name":'П'},
                                        {"idx":0, "displ":'О',"name":'О'},
                                        {"idx":1, "displ":propVal, "name":this.chEvery+propVal},
                                        {"idx":2, "displ":propVal, "name":this.chEmpty+propVal}
                                    );
                                }
                                else
                                {
                                 Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0].hideTrigger=false;
                            comboStore.add(
                                {"idx":0, "displ":propVal,"name":propVal},
                                {"idx":1, "displ":propVal, "name":this.chEvery+propVal},
                                {"idx":2, "displ":propVal, "name":this.chEmpty+propVal}
                            );}
                            }
                            else
                            {
                                if(propes[i]==='vagOtm')
                                {
                                    Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0].hideTrigger=false;
                                    comboStore.add(
                                        {"idx":-1, "displ":'П',"name":'П' },
                                        {"idx":0, "displ":'О',"name":'О'}
                                    );
                                }
                                else
                                {
                                // спрятать тригер пустого combobox
                                Ext.ComponentQuery.query('#'+propes[i]+'Combo')[0].hideTrigger=true;
                                }
                            }
                        }
                    }
                }
            }
        });
        this.items = [
            {
                xtype: 'grid',
                plugins: rowEditing,
                itemId: 'g7grid',
                columnLines: true,
                border: false,
                // hideHeaders: true,
                backstore: Ext.create('TK.store.tables.VgCtGrNodes'),
                store: Ext.create('TK.store.tables.VgCtGrNodes'),
                viewConfig: {
                    markDirty: false,
                    stripeRows: true,
                    plugins: {
                        ptype: 'gridviewdragdrop',
                        dragText: this.drophlp
                    }
                },
                listeners: {
                    drop: function(node, data, dropRec, dropPosition) {
                        var num=1,
                            edtPlug=this.getPlugin('g7plugin');
                        this.getStore().data.each(function(record) {
                            record.set('sort', num);
                            num++;
                        });
                        edtPlug.fireEvent('edit',this,dropRec);
                    }
                },
                columns: [
                    {text: '!Номер', dataIndex: 'sort', height: 2, width:20,sortable: false},
                    {text: '!Номер вагона', dataIndex: 'nvag', height: 2, width:124,sortable: false, editor:
                            {   maxLength:160,
                                validator: TK.Validators.vagNum,
                                xtype:'combo',
                                itemId:'nvagCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Род вагона', dataIndex: 'rod', height: 2, width:60,sortable: false, editor:
                            {   maxLength:20,
                                xtype:'combo',
                                itemId:'rodCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Владелец вагона', dataIndex: 'klientName', height: 2, width:59,sortable: false, editor:
                            {   maxLength:124,
                                xtype:'combo',
                                itemId:'klientNameCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Вагон представлен', dataIndex: 'vagOtm', height: 2, width:47,sortable: false, editor:
                            {   xtype:'combo',
                                editable: false,
                                itemId:'vagOtmCombo',
                                store: {fields: ['idx','displ','name']},
                                data:[
                                    {"idx":-1, "displ":'П',"name":'П'},
                                    {"idx":0, "displ":'О',"name":'О'}
                                ],
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Тоннаж', dataIndex: 'grPod', height: 2, width:58,sortable: false, editor:
                            {   maxLength:9,
                                xtype:'combo',
                                itemId:'grPodCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Оси', dataIndex: 'kolOs', height: 2, width:47,sortable: false, editor:
                            {
                                maxLength:2,
                                xtype:'combo',
                                itemId:'kolOsCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }},
                    {text: '!Тара', dataIndex: 'taraVag', height: 2, width:88,sortable: false, editor:
                            {   maxLength:5,
                                xtype:'combo',
                                itemId:'taraVagCombo',
                                store: {fields: ['idx','displ','name']},
                                queryMode: 'local',
                                valueField: 'name',
                                tpl: Ext.create('Ext.XTemplate','<tpl for=".">','<div class="x-boundlist-item">{name}</div>','</tpl>'),
                                displayTpl: Ext.create('Ext.XTemplate','<tpl for=".">','{displ}','</tpl>'),
                                listeners:{
                                    scope: this,
                                    select: this.onSelect
                                }
                            }}
                ]
            }
        ];
        this.callParent(arguments);
    },
        /**
         * switchBack return combo box to entered value
         * @param combo
         * @param name
         */
        switchBack:function (combo,name) {
            var pos=0;

            if(combo.name==='vagOtm')
            {
                if(combo.getValue().indexOf(combo.store.getAt(pos).data[name])===-1)
                {
                    pos=1;
                }
            }

            if (combo.getValue() !=='П' &&combo.getValue() !== 'О') {
                var displayValue = combo.store.getAt(pos).data[name];
                combo.setValue(displayValue);
                combo.setRawValue(displayValue);
                combo.selectedIndex = pos;
            }
        },
        /**
         *onSelect выбоор действий
         * @param combo
         * @param record
         */
        onSelect:function (combo,record) {
            //клонирование хранилища таблицы, для отмены действий
            var bstore=Ext.ComponentQuery.query('#g7grid')[0].backstore,
                str=combo.up().up().getStore().data;
                 records = [];
            str.each(function(r){
                records.push(r.copy());
            });
            if(bstore.data.length===0)
            bstore.add(records);

            // выбор дествия 1) заменить все на выбранное поло 2) заменить пустные поля на выбранное
            switch (record[0].data['idx']) {
                case 1:{this.setAll(record[0].data['displ'],combo.up().up().getStore(),combo.name)}break;
                case 2:{this.setEmpty(record[0].data['displ'],combo.up().up().getStore(),combo.name)}break;
            }
            this.switchBack(combo,'name');
        },
        setAll:function (val,store,name) {
            store.data.each(function(record) {
                record.set(name, val)
            });
        },
        setEmpty:function (val,store,name) {
            store.data.each(function(record) {
                if(!record.get(name))
                    record.set(name, val)
            });
        }
}

);
