/**
 * Контроллер Штампов печати
 */
Ext.define('TK.controller.print.PrintStamps', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils',
        'TK.model.stamp.PrintDataStamp',
        'TK.model.stamp.PrintDataStampBorder',
        'TK.model.stamp.PrintDataStampPicture',
        'TK.model.stamp.PrintDataStampText',
        'TK.view.stamp.StampBorderForm',
        'TK.view.stamp.StampForm',
        'TK.view.stamp.StampPictureForm',
        'TK.view.stamp.StampTxtForm'
    ],


    views:['stamp.StampList','stamp.StampForm','stamp.StampBorderForm','stamp.StampPictureForm'],
    stores:['stamp.Stamps','stamp.Texts','stamp.Pictures','stamp.Borders'],
    models:['stamp.PrintDataStamp','stamp.PrintDataStampBorder','stamp.PrintDataStampText','stamp.PrintDataStampPicture'],
    refs: [
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        },
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'stampList',
            selector: 'viewport > tabpanel > stampList'
        }
    ],

    init: function() {
        this.control(
            {
                'stampList button[action="addStamp"]': {
                    click: this.onAddStamp
                },
                'stampList button[action="editStamp"]': {
                    click: this.onEditStamp
                },
                'stampList': {
                    itemdblclick: this.onEditStamp
                },
                'stampList button[action="delStamp"]': {
                    click: this.onDeleteStamp
                },
                'stampList button[action="copyStamp"]': {
                    click: this.onCopyStamp
                },
                'stampform button[action="stampSaveStampExit"]': {
                    click: this.onSaveExitStamp
                },
                'stampform button[action="saveStamp"]': {
                    click: this.onSaveStamp
                },
                'stampform button[action="previewStamp"]': {
                    click: this.onPreViewStamp
                },
                'stampform #stampTabs #code_per_gr button[action="showPer"]': {
                    click: this.onShowPer
                },
                //раамки-------------------------------
                'stampform #stampTabs #bordersTab button[action="addBorder"]': {
                    click: this.onAddBorder
                },
                'stampform #stampTabs #bordersTab button[action="editBorder"]': {
                    click: this.onEditBorder
                },
                'stampform #stampTabs #bordersTab #bordersGrid': {
                    itemdblclick: this.onEditBorder
                },
                'stampform #stampTabs #bordersTab button[action="delBorder"]': {
                    click: this.onDelBorder
                },
                'stampborderform button[action="saveBorder"]': {
                    click: this.onSaveBorder
                },
                //картинки-------------------------------
                'stampform #stampTabs #picsTab button[action="addPic"]': {
                    click: this.onAddPic
                },
                'stampform #stampTabs #picsTab button[action="editPic"]': {
                    click: this.onEditPic
                },
                'stampform #stampTabs #picsTab #picsGrid': {
                    itemdblclick: this.onEditPic
                },
                'stampform #stampTabs #picsTab button[action="delPic"]': {
                    click: this.onDelPic
                },
                'stamppictureform button[action="savePic"]': {
                    click: this.onSavePic
                },
                'stamppictureform #dataform #picFile button[action="selFile"]': {
                    click: this.showPicSelWindow
                },
                //текст-------------------------------
                'stampform #stampTabs #txtTab button[action="addPic"]': {
                    click: this.onAddTxt
                },
                'stampform #stampTabs #txtTab button[action="editPic"]': {
                    click: this.onEditTxt
                },
                'stampform #stampTabs #txtTab #txtGrid': {
                    itemdblclick: this.onEditTxt
                },
                'stampform #stampTabs #txtTab button[action="delPic"]': {
                    click: this.onDelTxt
                },
                'stamptxtform button[action="saveTxt"]': {
                    click: this.onSaveTxt
                }
            }
        );
    },
    /**
     * показываем окно добавления штампа
     * @param btn кнопка вызова
     */
    onAddStamp:function (btn) {
        Ext.getStore('stamp.Texts').removeAll();
        Ext.getStore('stamp.Pictures').removeAll();
        Ext.getStore('stamp.Borders').removeAll();


        var win=Ext.widget('stampform'),
            form=win.down('#stampTab #mainStampForm').getForm(),
            rec= Ext.create('TK.model.stamp.PrintDataStamp');
        form.loadRecord(rec);

        win.down('#stampSaveBtn').setDisabled(true);
        win.down('#stampSaveExitBtn').setDisabled(true);
        win.show();
    },
    /**
     * показываем окно редактирования штампа
     * @param btn кнопка вызова
     */
    onEditStamp:function (btn) {
        Ext.getStore('stamp.Texts').removeAll();
        Ext.getStore('stamp.Pictures').removeAll();
        Ext.getStore('stamp.Borders').removeAll();
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        var win=Ext.widget('stampform'),
            form=win.down('#stampTab #mainStampForm').getForm(),
            hid = list.selModel.getLastSelected().data['hid'],
            store=list.getStore(),
            idx=  store.findExact('hid', hid),
            recFromStore=store.getAt(idx),
            stamptabs=win.getComponent('stampTabs'),
            borderstab=stamptabs.getComponent('bordersTab'),
            bordersGrid=borderstab.getComponent('bordersGrid'),
            picstab=stamptabs.getComponent('picsTab'),
            picsGrid=picstab.getComponent('picsGrid'),
            textstab=stamptabs.getComponent('txtTab'),
            txtGrid=textstab.getComponent('txtGrid');
        // заполняем окно
        rec=list.selModel.getLastSelected();
       form.loadRecord(rec);

        bordersGrid.getStore().loadData(recFromStore.get('borders'));
        picsGrid.getStore().loadData(recFromStore.get('pics'));
        txtGrid.getStore().loadData(recFromStore.get('texts'));

        win.down('#stampSaveBtn').setDisabled(!win.down('#mainStampForm').getForm().isValid());
        win.show();
    },
    /**
     * удаление штампа
     * @param btn кнопка вызова
     */
    onDeleteStamp:function (btn) {
        var list = btn.up('grid'),initObj={};
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        var
            rec=list.selModel.getLastSelected(),
            hid = list.selModel.getLastSelected().data['hid'],
            responseHandler = function (response) {
                return 'Ok';
            },
            afterMsgHandler = function (grid) {
                grid.getStore().reload();
            };

        initObj.hid= hid;

        Ext.Msg.show({
            title: this.delTitle,
            msg:this.delMsg,
            buttons: Ext.Msg.YESNO,
            closable: false,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    if(hid)
                    {
                        //отправляем запрос на сервер для сохранени настроек
                        TK.Utils.makeAjaxRequest('PrintStamp_del.do', initObj, responseHandler, list,afterMsgHandler,list);
                    }
                    else
                    {
                        list.getStore().remove(rec);
                    }
                }
            }
        });
    },
    /**
     * Создает копию выбранного штампа
     * @param btn кнопка вызова
     * @returns {boolean}
     */
    onCopyStamp:function(btn)
    {
        Ext.getStore('stamp.Texts').removeAll();
        Ext.getStore('stamp.Pictures').removeAll();
        Ext.getStore('stamp.Borders').removeAll();
        var list = btn.up('grid');
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        var win=Ext.widget('stampform'),
            form=win.down('#stampTab #mainStampForm').getForm(),
            hid = list.selModel.getLastSelected().data['hid'],
            store=list.getStore(),
            idx=  store.findExact('hid', hid),
            recFromStore=store.getAt(idx),
            stamptabs=win.getComponent('stampTabs'),
            borderstab=stamptabs.getComponent('bordersTab'),
            bordersGrid=borderstab.getComponent('bordersGrid'),
            picstab=stamptabs.getComponent('picsTab'),
            picsGrid=picstab.getComponent('picsGrid'),
            textstab=stamptabs.getComponent('txtTab'),
            txtGrid=textstab.getComponent('txtGrid');
        // заполняем окно
        rec=list.selModel.getLastSelected();

        // убиваем хиды
        rec.data['hid']=null;

        Ext.each(recFromStore.get('borders'), function (item, idx, a) {
            item['hid']=null
        });
        Ext.each(recFromStore.get('pics'), function (item, idx, a) {
            item['hid']=null
        });
        Ext.each(recFromStore.get('texts'), function (item, idx, a) {
            item['hid']=null
        });

        form.loadRecord(rec);

        bordersGrid.getStore().loadData(recFromStore.get('borders'));
        picsGrid.getStore().loadData(recFromStore.get('pics'));
        txtGrid.getStore().loadData(recFromStore.get('texts'));

        win.down('#stampSaveBtn').setDisabled(!win.down('#mainStampForm').getForm().isValid());
        win.show();
    },
    /**
     * СОхраняем штам
     * @param btn кнопка вызова
     */
    onSaveStamp:function(btn)
    {
        var stampRec=btn.up('stampform').down('#mainStampForm').getForm().getRecord(),
            borderData=[],
            picData=[],
            txtData=[],
            grid=Ext.ComponentQuery.query('stampList gridview')[0],
            initObj={};

        btn.up('stampform').down('#mainStampForm').getForm().updateRecord(stampRec);

        Ext.each(Ext.getStore('stamp.Borders').getRange(), function (item, idx, a) {
            borderData.push(item.data);
        });
        Ext.each(Ext.getStore('stamp.Pictures').getRange(), function (item, idx, a) {
            picData.push(item.data);
        });
        Ext.each(Ext.getStore('stamp.Texts').getRange(), function (item, idx, a) {
            txtData.push(item.data);
        });

        stampRec.set('borders',borderData);
        stampRec.set('pics',picData);
        stampRec.set('texts',txtData);

        initObj.jsonData = Ext.encode(stampRec.data);
        var responseHandler = function (response) {
            // return Ext.decode(response.responseText)['result']
            return 'Ok';
        };
        var afterMsgHandler = function (grid) {
            grid.getStore().reload();
        };
        //отправляем запрос на сервер для сохранени настроек
        TK.Utils.makeAjaxRequest('PrintStamp_persist.do', initObj, responseHandler, grid,afterMsgHandler,grid);
    },
    /**
     * Сохраняет печать в базу данных
     * @param btn кнопка вызова
     */
    onSaveExitStamp:function (btn) {
        this.onSaveStamp(btn);
        Ext.ComponentQuery.query('stampform')[0].destroy();
    },
    /**
     * Создает окно выбора перевозчика
     * @param btn кнопка вызова
     */
    onShowPer:function (btn) {
        var curPer=Ext.ComponentQuery.query('stampform #stampTabs #code_per_gr #codePer')[0],
            nsiGrid = this.getController('Nsi').nsiCarrier(curPer.value).getComponent(0),
            buttn=Ext.create('Ext.Button', {text:'!Выбрать'});

        //добавляем кнопку выбора перевозчика
        buttn.on('click', this.onSelectPer, this,curPer,curPer,curPer);
        nsiGrid.dockedItems.items[1].add(buttn);

        //привязываем действия на двойной щелчок по записи
        nsiGrid.on('itemdblclick', this.onSelectPer, this,curPer);
    },
    /**
     * Присваивает полю перевозчика выбранный код
     * @param form форма
     * @param rec запись
     * @param opt2
     * @param opt3
     * @param opt4
     * @param curPer поле отправителя
     */
    onSelectPer:function (form,rec,opt2,opt3,opt4,curPer) {
        if(form.xtype==='button')
        {
            form=form.up('nsieditlist').down('gridview');
            curPer=opt2;
        }
        rec=form.getSelectionModel().getLastSelected();

        if(!rec.data['carrNo'])
            return;

        curPer.setValue(rec.data['carrNo']);
        form.up('nsieditlist').destroy();
    },
    /**
     * Добавление границы штампа
     * @param btn кнопка вызова
     */
    onAddBorder:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stampborderform')[0];
        if(winOpened)
            winOpened.destroy();
        var win=Ext.widget('stampborderform'),
            form=win.getComponent('dataform').getForm(),
            rec= Ext.create('TK.model.stamp.PrintDataStampBorder');
            form.loadRecord(rec);
        win.show();
    },
    /**
     * Редактирование границы штампа
     * @param btn кнопка вызова
     */
    onEditBorder:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stampborderform')[0];
        if(winOpened)
            winOpened.destroy();

        this.genericEditFn(btn,'stampborderform');
    },
    /**
     * Удаление границы штампа
     * @param btn кнопка вызова
     */
    onDelBorder:function (btn) {
        this.genericDelFn(btn);
    },
    /**
     * Сохранения границы штампа
     * @param btn кнопка вызова
     */
    onSaveBorder:function(btn)
    {
        this.genericSaveFn(btn,'stamp.Borders');
    },
    /**
     * Отображение окно загрузки изображения
     * @param btn btn кнопка вызова
     */
    showPicSelWindow:function(btn)
    {
        Ext.create('Ext.window.Window', {
            title: this.uploadtitle,
            width: 400,
            itemId:'picSelWindow',
            layout:'fit',
            modal:true,
            items: [
                {
                    xtype:'form',
                    itemId:'picUpload',
                    bodyPadding: 5,
                    items:{
                        xtype: 'filefield',
                        name: 'photo',
                        fieldLabel: this.labelPic,
                        labelAlign: 'top',
                        msgTarget: 'side',
                        allowBlank: false,
                        anchor: '100%',
                        buttonText: this.btnSelectPic,
                        vtype:'file'
                    },
                    buttons: [{
                        text: this.btnUpload,
                        handler: function() {
                            var form = this.up('form').getForm();
                            if(form.isValid()){
                                // считываем изображение из файла
                                var file = this.up('form').down('filefield').el.down('input[type=file]').dom.files[0],
                                reader = new FileReader();
                                reader.onload = (function(theFile) {
                                    return function(e) {
                                        var fileForm=Ext.ComponentQuery.query('#picSelWindow #picUpload filefield')[0],
                                            picForm=Ext.ComponentQuery.query('stamppictureform #dataform')[0],
                                            picField=picForm.down('#pict'),
                                            fnameField=picForm.down('#fname'),
                                            preView=Ext.ComponentQuery.query('stamppictureform #preview')[0];

                                        // устанавливаем поля
                                        picField.setValue(e.target.result.split(',')[1]);// отрезаем часть формата data:image/jpeg;base64,
                                        preView.setSrc(e.target.result);
                                        preView.updateLayout();
                                        fnameField.setValue(fileForm.getValue());
                                        Ext.ComponentQuery.query('#picSelWindow')[0].destroy();
                                    };
                                })(file);
                                reader.readAsDataURL(file);
                            }
                        }
                    }]
                }]
        }).show()
    },
    /**
     * Добавление изображение штампа
     * @param btn кнопка вызова
     */
    onAddPic:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stamppictureform')[0];
        if(winOpened)
            winOpened.destroy();

        var win=Ext.widget('stamppictureform'),
            form=win.getComponent('dataform').getForm(),
            rec= Ext.create('TK.model.stamp.PrintDataStampPicture');
        form.loadRecord(rec);
        win.show();
    },
    /**
     * Редактирование изображение штампа
     * @param btn кнопка вызова
     */
    onEditPic:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stamppictureform')[0];
        if(winOpened)
            winOpened.destroy();

        this.genericEditFn(btn,'stamppictureform');
    },
    /**
     * Удаление изображение штампа
     * @param btn кнопка вызова
     */
    onDelPic:function (btn) {
        this.genericDelFn(btn);
    },
    /**
     * Сохранения изображение штампа
     * @param btn кнопка вызова
     */
    onSavePic:function(btn)
    {
        this.genericSaveFn(btn,'stamp.Pictures');
    },
    /**
     * Добавление текст штампа
     * @param btn кнопка вызова
     */
    onAddTxt:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stamptxtform')[0];
        if(winOpened)
            winOpened.destroy();

        var win=Ext.widget('stamptxtform'),
            form=win.getComponent('dataform').getForm(),
            rec= Ext.create('TK.model.stamp.PrintDataStampText');
        form.loadRecord(rec);
        win.show();
    },
    /**
     * Редактирование текст штампа
     * @param btn кнопка вызова
     */
    onEditTxt:function (btn) {
        var winOpened=Ext.ComponentQuery.query('stamptxtform')[0];
        if(winOpened)
            winOpened.destroy();

        this.genericEditFn(btn,'stamptxtform');
    },
    /**
     * Удаление текст штампа
     * @param btn кнопка вызова
     */
    onDelTxt:function (btn) {
        this.genericDelFn(btn);
    },
    /**
     * Сохранения текст штампа
     * @param btn кнопка вызова
     */
    onSaveTxt:function(btn)
    {
        this.genericSaveFn(btn,'stamp.Texts');
    },
    /**
     * Функция сохранения объяекта в хранилище
     * @param btn кнопка вызова
     * @param storeName хранилище
     */
    genericSaveFn:function (btn,storeName) {
        var store = Ext.getStore(storeName),
            recFrom=btn.up('form').getForm().getRecord(),
            idx=btn.up('window').editIdx;

        if(idx===-1) {
            btn.up('form').getForm().updateRecord(recFrom);
            store.add(recFrom);
        }
        else
        {
            var rec=store.getAt(idx);
            btn.up('form').getForm().updateRecord(recFrom);
            for (var propertyName in rec) {
                rec[propertyName]=recFrom[propertyName];
            }
        }
        btn.up('window').destroy();
    },
    /**
     * Функция удаления объяекта в хранилище
     * @param btn кнопка вызова
     */
    genericDelFn:function(btn)
    {
        var list = btn.up().up().down('grid');
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        Ext.Msg.show({
            title: this.delTitle,
            msg:this.delMsg,
            buttons: Ext.Msg.YESNO,
            closable: false,
            icon: Ext.Msg.QUESTION,
            scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    list.getStore().remove(list.selModel.getLastSelected());
                    //list.getStore().commitChanges( );
                }
            }
        });
    },
    /**
     * Функция редактирования объяекта
     * @param btn кнопка вызова
     * @param widget форма редактирования
     */
    genericEditFn:function (btn,widget) {
        var list = btn.up().up().down('grid');
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        var win=Ext.widget(widget),
            form=win.getComponent('dataform').getForm(),
            rec=list.selModel.getLastSelected();
        form.loadRecord(rec);
        win.editIdx=list.getStore().indexOf(rec);
        win.show();
    },
    /**
     * Создаем окно предпросмотра штампа с введенными элементами
     * @param btn кнопка вызова
     */
    onPreViewStamp:function (btn) {
        var previewWin=Ext.ComponentQuery.query('#previewWin')[0],
            winHeight=500,winWidth=500,maxY=0;
        if(previewWin)
            previewWin.destroy();
        var
            stampRec=btn.up('stampform').down('#mainStampForm').getForm().getRecord(),
            drawItems=[];

        btn.up('stampform').down('#mainStampForm').getForm().updateRecord(stampRec);

        Ext.each(Ext.getStore('stamp.Borders').getRange(), function (item, idx, a) {
            var data=item.data;
            if(data['rury']>maxY)maxY=data['rury'];
        });
        Ext.each(Ext.getStore('stamp.Texts').getRange(), function (item, idx, a) {
            var data=item.data;
            if(data['rury']>maxY)maxY=data['rury'];
        });
        Ext.each(Ext.getStore('stamp.Pictures').getRange(), function (item, idx, a) {
            var data=item.data;
            if(data['rury']>maxY)maxY=data['rury'];
        });

        Ext.each(Ext.getStore('stamp.Borders').getRange(), function (item, idx, a) {
          //  borderData.push(item.data);
            var data=item.data,
                x=data['rllx'],
                y=maxY-data['rury'],
                w=data['rurx']-data['rllx'],
                h=data['rury']-data['rlly'],
                r=data['radius'],
                color=data['color'],
                border=data['border'],
                itemB={
                    x:x,
                    y:y,
                    type: 'rect',
                    width: w,
                    height: h,
                    radius: r,
                    opacity: 0.5,
                    stroke: color?('#'+color):'red',
                    'stroke-width': border
                };
                console.log(y);
                drawItems.push(itemB);
        });
        Ext.each(Ext.getStore('stamp.Texts').getRange(), function (item, idx, a) {
            var data=item.data,y=0
                x=data['rllx'],
                w=data['rurx']-data['rllx'],
                h=data['rury']-data['rlly'],
                degree=data['rotate'],
                color=data['color'],
                txt=data['uppercase']? data['txt'].toUpperCase():data['txt'],
                fontFamily=data['fontFamily'],

            font=(data['italic']?'italic ':'')+(data['bold']?'bold ':'')+(data['fontSize']?data['fontSize']:5)+'px '+(fontFamily?fontFamily:''),
            textDecor=data['underline']?{textDecoration: "underline"}:'';

            if(degree===0)
                y=maxY-data['rlly']-(data['fontSize']?data['fontSize']:5);
            else
                y=maxY-data['rlly'];


            itemT={
                x:x,
                y:y,
                width: w,
                height: h,
                type: "text",
                text: txt,
                fill: color?('#'+color):'red',
                font: font?font:"5px monospace",
                rotate: {
                    degrees:360-degree
                },
                style:textDecor
            };
            console.log(y);
            drawItems.push(itemT);
        });
        Ext.each(Ext.getStore('stamp.Pictures').getRange(), function (item, idx, a) {
            var data=item.data,
                x=data['rllx'],
                y=maxY-data['rury'],
                w=data['rurx']-data['rllx'],
                h=data['rury']-data['rlly'],
                itemP={
                    x:x,
                    y:y,
                    width: w,
                    height: h,
                    type: "image",
                    src: 'data:image/jpeg;base64,'+data['pict']
                    };
            console.log(y);
            drawItems.push(itemP);
        });

        previewWin=Ext.create('Ext.window.Window', {
            title: this.btnPreView,
            itemId: 'previewWin',
            height: winHeight,
            width: winWidth,
            layout: 'absolute',
            items: [
                {
                    xtype:'draw',
                    x:0,
                    y:0,
                    height: winHeight,
                    width: winWidth,
                    itemId:'drawField',
                    layout: 'absolute',
                    items:drawItems
                }
            ]
        });

        previewWin.show();
    }
});
