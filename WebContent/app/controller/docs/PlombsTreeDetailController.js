Ext.define('TK.controller.docs.PlombsTreeDetailController', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.model.PlombsTreeNode'
    ],

    stores:[
        'PlombsTreeNodes'
    ],

    models:[
        'PlombsTreeNode'
    ],

    refs:[{
        ref: 'win',
        selector: 'plombsTreeFormWin'
    },{
        ref: 'treepanel',
        selector: 'plombsTreeFormWin > treepanel'
    },{
        ref: 'plombspanel',
        selector: 'plombsTreeFormWin > form'
    },{
        ref: 'delBtn',
        selector: 'plombsTreeFormWin button[action=del]'
    },{
        ref: 'addBtn',
        selector: 'plombsTreeFormWin button[action=add]'
    },{
        ref: 'saveBtn',
        selector: 'plombsTreeFormWin button[action=save]'
    },{
        ref: 'searchBtn',
        selector: 'plombsTreeFormWin button[action=search]'
    },{
        ref: 'searchField',
        selector: 'plombsTreeFormWin textfield#searchField'
    }],

    init:function () {
        this.listen({
            controller: {
                '*': {
                    showPlombsWin: this.onPlombsWinShow,
                    displayedPlombsFields: this.setDisplayedPlombsFields,
                    savePlombsToDataObj: this.setG2012DataObj
                }
            }
        });

        this.control({
            'plombsTreeFormWin > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'plombsTreeFormWin > form field': {
                blur: this.onPlombsFormUpdateData
            },
            'plombsTreeFormWin button[action=del]': {
                click: this.onDelClick
            },
            'plombsTreeFormWin button[action=add]': {
                click: this.onAddClick
            },
            'plombsTreeFormWin button[action=search]': {
                click: this.onSearchClick
            },
            'plombsTreeFormWin button[action=expandAll]': {
                click: this.onExpandAllClick
            },
            'plombsTreeFormWin button[action=collapseAll]': {
                click: this.onCollapseAllClick
            },
            'plombsTreeFormWin textfield#searchField': {
                keypress: this.onSearchFieldKeyPress
            },
            'plombsTreeFormWin button[action=save]': {
                click: this.onSaveClick
            }
        });
    },

    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },

    /**
     * Отображение окна пломб
     * @param widget виджет
     * @param ownerDoc основной документ
     * @param selPlombHid hid выбранной пломбы
     */
    onPlombsWinShow: function(widget, ownerDoc,record){
        var win = Ext.widget(widget),
            tree = this.getTreepanel(),
            treeStore = tree.getStore(),
            rootNode = treeStore.getRootNode();

        //проверка является ли форма документа вложеной или все компоненты находятся на формe
        if(ownerDoc.ownerCt.ownerCt.xtype&&ownerDoc.ownerCt.ownerCt.xtype==='tabpanel')
            ownerDoc=ownerDoc.ownerCt;

        win.setOwnerDoc(ownerDoc);

        rootNode.removeAll();

        //// fill tree
        var vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];
        if(vags && !Ext.Object.isEmpty(vags)){
            if(this.isContOtpr()) {
                this.loopVagsNodes(vags, rootNode);
            } else {
                this.initVagsNodes(vags, rootNode);
            }
        }
        /// END fill tree

        win.show();
        // делаем пломбы выбранной в дереве, если в окно попали через двойно мелчок по пломбе в графе 19
        if(typeof record==='object'&&record.self.getName( )==='TK.model.tables.Plomb')
        {
            rootNode.findChildBy(function(child){

                var treeHid = child.data.hid;
                // if((!child.data.kpl||record.data.kpl===child.data.kpl)&&(record.data.znak===child.data.znak)
                //     &&(record.data.sort===child.data.sort)&&(!child.data.c_hid||record.data.c_hid===child.data.c_hid))
                if(record.data['id'])
                {
                    if(child.data['id']===record.data['id'])
                    {
                        tree.getSelectionModel().select(child);
                        this.onTreeNodeClick(tree,child);
                    }
                }
                else
                {
                    if(child.data['hid']===record.data['hid'])
                    {
                        tree.getSelectionModel().select(child);
                        this.onTreeNodeClick(tree,child);
                    }
                }
            },this,true);
        }
        this.onExpandAllClick();
    },

    loopVagsNodes: function(vags, rootNode){
        for(var vagIndx in vags){
            var vag = vags[vagIndx],
                conts = vag[this.getWin().getOwnerDoc().getContCollectionName()];

            if(conts && !Ext.Object.isEmpty(conts)){
                this.initContsNodes(conts, vagIndx, rootNode);
            }
        }
    },

    initContsNodes: function(conts, vagIndx, rootNode){
        for(var contIndx in conts){
            var cont = conts[contIndx],
                plombs = cont[this.getWin().getOwnerDoc().getPlombsCollectionName()],
                contModel = Ext.create('TK.model.PlombsTreeNode', {
                    who: 'cont',
                    text: cont['utiN'],
                    iconCls: 'cont3',
                    leaf: plombs && plombs['0'] ? false : true,
                    expanded: vagIndx == 0 && plombs && plombs['0'] && contIndx == 0
                });

            contModel.setContObj(cont);
            rootNode.appendChild(contModel);

            if(plombs && !Ext.Object.isEmpty(plombs)){
                this.initPlombsNodes(plombs, contModel);
            }
        }
    },

    initVagsNodes: function(vags, rootNode){
        for(var vagIndx in vags){
            var vag = vags[vagIndx],
                plombs = vag[this.getWin().getOwnerDoc().getPlombsCollectionName()],
                vagModel = Ext.create('TK.model.PlombsTreeNode', {
                    who: 'vag',
                    text: vag['nvag'],
                    iconCls: 'vag',
                    leaf: plombs && plombs['0'] ? false : true,
                    expanded:  plombs && plombs['0'] && vagIndx == 0
                });

            vagModel.setVagObj(vag);
            rootNode.appendChild(vagModel);

            if(plombs && !Ext.Object.isEmpty(plombs)){
                this.initPlombsNodes(plombs, vagModel);
            }
        }
    },

    initPlombsNodes: function(plombs, contModel){
        for(var plombIndx in plombs){
            var plomb = plombs[plombIndx],
                plombModel = Ext.create('TK.model.PlombsTreeNode', {
                    who: 'plombs',
                    text: plomb['znak'],
                    iconCls: 'doc_new',
                    leaf: true
                });

            this.getPlombspanel().items.each(function(item,index,length){
                plombModel.set(item.getName(), plomb[item.getName()]);
            });

            contModel.appendChild(plombModel);
        }
    },

    onTreeNodeClick: function(treepanel, record, item, index){
        var who = record.get('who');

        if(this.getSaveBtn().isHidden()){
            this.getSaveBtn().show();
        }

        switch(who){
            case 'plombs':
                this.getPlombspanel().loadRecord(record);

                if(this.getPlombspanel().isHidden()){
                    this.getPlombspanel().show();
                }
                if(this.getDelBtn().isHidden()){
                    this.getDelBtn().show();
                }
                if(this.getAddBtn().isHidden()){
                    this.getAddBtn().show();
                }
                break;
            case 'cont':
            case 'vag':
                if(this.getAddBtn().isHidden()){
                    this.getAddBtn().show();
                }
                if(this.getDelBtn().isVisible()){
                    this.getDelBtn().hide();
                }
                if(this.getPlombspanel().isVisible()){
                    this.getPlombspanel().hide();
                }
                break;
        }
    },

    onPlombsFormUpdateData: function(field){
        var rec = this.getPlombspanel().getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue();

        if(oldVal != newVal){
            rec.set(field.getName(), newVal);
            if( field.getName() == 'znak'){
                rec.set('text', newVal);
            }
        }
    },

    onAddClick: function(btn){
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;

        switch (selectedModelNode.get('who')){
            case 'cont':
            case 'vag':
                parentModelNode = selectedModelNode;
                break;
            case 'plombs':
                parentModelNode = selectedModelNode.parentNode;
                break;
        }

        var plombsModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.PlombsTreeNode', {
                leaf: true,
                who: 'plombs',
                iconCls: 'doc_new'
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(plombsModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), plombsModelNode);
    },

    onDelClick: function(btn){
        this.getTreepanel().getSelectionModel().getLastSelected().remove(true, true);
        this.getDelBtn().hide();
        this.getAddBtn().hide();
    },

    onSearchFieldKeyPress:function(field, event){
        if(event.getKey() == event.ENTER) {
            this.getSearchBtn().fireEvent('click', this.getSearchBtn());
        }
    },

    onSearchClick: function(btn){
        var rootNode = this.getTreepanel().getRootNode(),
            searchVal = this.getSearchField().getValue(),
            foundNode;

        if(rootNode.hasChildNodes() && searchVal){
            var nodeToStart = this.getTreepanel().getSelectionModel().getLastSelected() || rootNode;

            if(nodeToStart){
                var isPassed = nodeToStart.isRoot();

                foundNode = rootNode.findChildBy(function(node) {
                    if(!isPassed && (nodeToStart == node)){
                        isPassed = true;
                        return false;
                    }
                    if(isPassed && (node.get('text').indexOf(searchVal) != -1) ) {
                        return true;
                    }
                    return false;
                }, this, true);
            }
        }

        if(foundNode){
            this.getTreepanel().getSelectionModel().select(foundNode);
            foundNode.expand();
            if(foundNode.parentNode) {
                foundNode.parentNode.expand();
            }
            this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), foundNode);
        }
        this.getSearchField().focus();
    },

    onExpandAllClick: function(btn){
        this.fireEvent('expandAllClick', this.getTreepanel(), this.getWin());
    },

    onCollapseAllClick: function(btn){
        this.fireEvent('collapseAllClick', this.getTreepanel(), this.getWin());
    },

    /**
     * Сохранение записей о пломбах
     * @param btn
     */
    onSaveClick: function(btn){

        // проверка на дубликаты и склейка номеров пломб
        this.checkField('znak',this.getTreepanel(),['kpl'],this);
    },
    /**
     * Удаление старых и сохранение новых пломб
     */
    saveFunc:function()
    {
        var ownerDoc = this.getWin().getOwnerDoc(),
            dataObj = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(this.getTreepanel().getRootNode().hasChildNodes() && dataObj){
            this.clearAllPlombsInDataObj();
            this.savePlombs();
            ownerDoc.fireEvent('onChangePlombsDisplField', ownerDoc);
        }
    },

    /**
     * checkField проверяет есть ли среди введенных записей выбранного поля записи разделенные , и ;
     * @param field имя поля
     * @param tree ссылка на дерево
     * @param fields массив остальных полей записи
     * @param controller контроллер дерева
     */
    checkField:function(field,tree,fields,controller)
    {
        var res='';
        tree.getRootNode().eachChild(function(parentNodeModel) {
            parentNodeModel.eachChild(function(plombsModel) {
                if(plombsModel.data[field])
                if((plombsModel.data[field].split(',').length>1)||plombsModel.data[field].split(';').length>1)
                {
                    res= res+plombsModel.data[field]+'<br>';
                }
            },this);
        },this);
        if(res) {
            Ext.Msg.show({
                title: this.msgTitle, msg: this.msgSplit + res, buttons: Ext.Msg.YESNO, height: 200, width: 410,
                closable: false, icon: Ext.Msg.QUESTION, scope: this, cls: 'overflowY',
                fn: function (buttonId) {
                    //подтверждение обработки записи
                    if (buttonId === 'yes') {
                        this.processRecords(field, tree, fields);
                        // очистка формы
                        tree.up().down('form').items.each(function (item, index, length) {
                            item.setValue('');
                            controller.saveFunc();
                        });
                    }
                }
            });
        }
        else
            controller.saveFunc();
    },

    /**
     * Ищем и обрабатываем записи введенные через разделительный знак
     * @param tree ссылка на дерево записей
     * @param field ключевое поле, в котром записи разделены разделительным знаком
     * @param fields массив остальных полей записи
     */
    processRecords:function(field,tree,fields)
    {
        var modelName=tree.getStore().model.modelName;
        tree.getRootNode().eachChild(function(parentNodeModel) {
            var plombs2tree=[]
            parentNodeModel.eachChild(function(model) {
                var mainField=model.data[field],
                    copyFields=[],
                    kpl=model.data['kpl'],
                    znakArr=[],
                    // вначале разбиваем по ,
                    znakArr2=mainField.split(','),
                    who= model.data['who'];

                fields.forEach(function (item) {
                    copyFields[item]=model.data[item];
                })

                for(var ix=0;ix<znakArr2.length;ix++)
                {
                    // потом разбиваем разбитое по ;
                    znakArr=znakArr.concat(znakArr2[ix].split(';'));
                }
                for(var ix=0;ix<znakArr.length;ix++)
                {
                    var exists=false;
                    for (dx=0;dx<plombs2tree.length;dx++)
                    {
                        if(plombs2tree[dx].data[field].toUpperCase()===znakArr[ix].toUpperCase())
                        {

                            if(who==='plombs')
                                plombs2tree[dx].data['kpl']=plombs2tree[dx].data['kpl']+kpl;

                            exists=true;
                            break;
                        }
                    }
                    if(!exists)
                    {
                        var newModel=Ext.create(modelName, {
                            leaf: true,
                            who: who,
                            iconCls: 'doc_new',
                            text:znakArr[ix].trim(),
                            kpl:kpl
                        })
                        newModel.data[field]=znakArr[ix].trim();

                        fields.forEach(function (item) {
                            newModel.data[item]=copyFields[item];
                        })

                        plombs2tree.push(newModel);
                    }
                }
            },this);
            // удаляем записи
            while (parentNodeModel.firstChild) {
                parentNodeModel.removeChild(parentNodeModel.firstChild);
            }
            // записываем новые записи
            for(var ix=0;ix<plombs2tree.length;ix++)
            {
                parentNodeModel.appendChild(plombs2tree[ix]);
                parentNodeModel.set('leaf', false);
                parentNodeModel.expand();
            }
        },this);
    },
    /**
     * сохранение пломб
     */
    savePlombs: function(){
        this.getTreepanel().getRootNode().eachChild(function(parentNodeModel) {
            if(parentNodeModel.hasChildNodes()){
                var plombsIndex = 0,
                    parentDataObj = (this.isContOtpr() ? parentNodeModel.getContObj() : parentNodeModel.getVagObj());

                if(parentDataObj && !Ext.Object.isEmpty(parentDataObj)){

                    parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};

                    parentNodeModel.eachChild(function(plombsModel) {
                        // console.log(plombsModel);
                        parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex] = {};

                        this.getPlombspanel().items.each(function(plombsItem,index,length){
                            parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex][plombsItem.getName()] = plombsModel.get(plombsItem.getName());
                        }, this);
                        parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex]['sort'] = plombsIndex;
                        parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex]['id'] = plombsModel.data['id'];
                        plombsIndex++;
                    }, this);
                }
            }
        }, this);

        this.getWin().getOwnerDoc().fireEvent('onSavePlombsToDataObj', this.getWin().getOwnerDoc());
    },

    clearAllPlombsInDataObj: function() {
        var ownerDoc = this.getWin().getOwnerDoc(),
            vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx];

                if(this.isContOtpr()) {
                    var conts = vag[this.getWin().getOwnerDoc().getContCollectionName()];

                    if (conts && !Ext.Object.isEmpty(conts)) {

                        for (var contIndx in conts) {
                            var cont = conts[contIndx];

                            cont[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};
                        }
                    }
                } else {
                    vag[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};
                }
            }
        }
    },
    /**
     * установка отображаемых значений пломб
     * @param controller контроллер
     * @param docForm основной документ
     */
    setDisplayedPlombsFields: function(controller, docForm){
        if(controller.getDocForm().getComponent('smgs.g2012').xtype==='textarea')
            controller.getDocForm().getComponent('smgs.g2012').setValue(docForm.dataObj['g2012']);
        else
        {
            this.setG2012DataObj(controller,controller.getDocForm());
        }
    },
    /**
     * Обход и перезаполнение хранилища пломб
     * @param controller контроллер
     * @param docForm основной документ
     */
    setG2012DataObj: function(controller, docForm){
        var vags = docForm.dataObj[docForm.getVagCollectionName()],
            plombsResult = '',
            delim = '',
            plombsCount = 0,
            vagsCount = 0,
            contsCount = 0,
            plStore;

        // очищаем таблицу пломб
        if(controller.getDocForm().getComponent('smgs.g2012')&&controller.getDocForm().getComponent('smgs.g2012').xtype==='g19plombsmgs2')
        {
            plStore=controller.getDocForm().getComponent('smgs.g2012').getComponent('g19grid').getStore();
            plStore.removeAll();
        }

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx],
                    plombs,
                    plomb;

                if(this.isContOtpr()) {
                    var conts = vag[docForm.getContCollectionName()];
                    if (conts && !Ext.Object.isEmpty(conts)) {

                        for (var contIndx in conts) {
                            var cont = conts[contIndx];

                            plombs = cont[docForm.getPlombsCollectionName()];
                            if(plombs && !Ext.Object.isEmpty(plombs)) {

                                for (var plombsIndx in plombs) {
                                    plomb = plombs[plombsIndx];
                                    if (vagIndx == 0 && !vags[1] && contIndx == 0 && !conts[1]) { // only 1 vag and 1 cont
                                        plombsResult += delim;
                                        plombsResult += (plomb['kpl'] ? plomb['kpl'] + 'x  ' : '');
                                        plombsResult += (plomb['znak'] ? plomb['znak'] : '');
                                        delim = ', ';
                                    }
                                    this.addPlomb2Store(plStore,plomb,cont);
                                    var kpl = parseInt(plomb['kpl']);
                                    plombsCount += isNaN(kpl) ? 0 : kpl;
                                }
                            }
                            contsCount++;
                        }

                    }
                } else {
                    plombs = vag[docForm.getPlombsCollectionName()];
                    if (plombs && !Ext.Object.isEmpty(plombs)) {

                        for (var plombsIndx in plombs) {
                            plomb = plombs[plombsIndx];

                            if (vagIndx == 0 && !vags[1]) { // only 1 vag
                                plombsResult += delim;
                                plombsResult += (plomb['kpl'] ? plomb['kpl'] + 'x  ' : '');
                                plombsResult += (plomb['znak'] ? plomb['znak'] : '');
                                delim = ', ';
                            }
                            this.addPlomb2Store(plStore,plomb);
                            var kpl = parseInt(plomb['kpl']);
                            plombsCount += isNaN(kpl) ? 0 : kpl;
                        }
                    }
                }
                vagsCount++;
            }
        }

        if(vagsCount > 1 || contsCount > 1){
            plombsResult = 'verschlüsse / пломбы ' + plombsCount + ' (Siehe Nachweisung / см.ведомость)';
        }
        docForm.dataObj['g2012'] = plombsResult;
    },
    /**
     * занечение пломбы в хранилище таблицы пломб
     * @param plStore хранилище мломб
     * @param plomb пломба
     */
    addPlomb2Store:function (plStore,plomb,cont) {
        if(plStore)
        {
            plStore.add(
                {
                    'hid':plomb['hid'],
                    'kpl':plomb['kpl'] ? plomb['kpl']: '',
                    'znak':plomb['znak'] ? plomb['znak']: '',
                    'sort':plomb['sort'],
                    'c_hid':cont?cont['hid']:null,
                    'id':plomb['id']
                }
            )
        }
    }
});
