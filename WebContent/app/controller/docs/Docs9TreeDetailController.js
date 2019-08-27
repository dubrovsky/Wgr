Ext.define('TK.controller.docs.Docs9TreeDetailController', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.model.Docs9TreeNode'
    ],

    stores:[
        'Docs9TreeNodes'
    ],
    
    models:[
        'Docs9TreeNode'
    ],

    refs:[{
        ref: 'win',
        selector: 'docs9TreeFormWin'
    },{
        ref: 'treepanel',
        selector: 'docs9TreeFormWin > treepanel'
    },{
        ref: 'docs9panel',
        selector: 'docs9TreeFormWin > form'
    },{
        ref: 'delBtn',
        selector: 'docs9TreeFormWin button[action=del]'
    },{
        ref: 'addBtn',
        selector: 'docs9TreeFormWin button[action=add]'
    },{
        ref: 'saveBtn',
        selector: 'docs9TreeFormWin button[action=save]'
    },{
        ref: 'langCombo',
        selector: 'viewport #localeCombo #langCombo'
    },{
        ref: 'searchBtn',
        selector: 'docs9TreeFormWin button[action=search]'
    },{
        ref: 'searchField',
        selector: 'docs9TreeFormWin textfield#searchField'
    }],

    init:function () {
        this.listen({
            controller: {
                '*': {
                    showDocs9Win: this.onDocs9WinShow,
                    displayedDocs9Fields: this.setDisplayedDocs9Fields
                }
            }
        });

        this.control({
            'docs9TreeFormWin > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'docs9TreeFormWin > form field': {
                blur: this.onDocs9FormUpdateData
            },
            'docs9TreeFormWin button[action=del]': {
                click: this.onDelClick
            },
            'docs9TreeFormWin button[action=add]': {
                click: this.onAddClick
            },
            'docs9TreeFormWin button[action=save]': {
                click: this.onSaveClick
            },
            'docs9TreeFormWin button[action=search]': {
                click: this.onSearchClick
            },
            'docs9TreeFormWin button[action=expandAll]': {
                click: this.onExpandAllClick
            },
            'docs9TreeFormWin button[action=collapseAll]': {
                click: this.onCollapseAllClick
            },
            'docs9TreeFormWin textfield#searchField': {
                keypress: this.onSearchFieldKeyPress
            },
            'docs9TreeFormWin > form > trigger[name=ncas]': {
                ontriggerclick: this.onNcasClick
            }
        });
    },

    isContOtpr: function () {
        return this.getController("docs.VgCtGrTreeDetailController").isContOtpr();
    },

    onTreeNodeClick: function(treepanel, record, item, index){
        var who = record.get('who');

        if(this.getSaveBtn().isHidden()){
            this.getSaveBtn().show();
        }

        switch(who){
            case 'docs9':
                this.getDocs9panel().loadRecord(record);

                if(this.getDocs9panel().isHidden()){
                    this.getDocs9panel().show();
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
                if(this.getDocs9panel().isVisible()){
                    this.getDocs9panel().hide();
                }
                break;
        }
    },

    onDocs9FormUpdateData: function(field){

        var rec = this.getDocs9panel().getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue(),
            lang = this.getLangCombo().getValue();

        if(oldVal != newVal){
            rec.set(field.getName(), newVal);
            var textFieldName = (lang == 'de' ? 'text2' : 'text1');
            if(field.getName() == textFieldName || field.getName() == 'ndoc'){
                rec.set(
                    'text',
                    rec.get(textFieldName) +
                    (rec.get('ndoc') ? ' ' + rec.get('ndoc') : '')
                );
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
            case 'docs9':
                parentModelNode = selectedModelNode.parentNode;
                break;
        }

        var docs9ModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.Docs9TreeNode', {
                leaf: true,
                who: 'docs9',
                iconCls: 'doc_new'
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(docs9ModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), docs9ModelNode);
    },

    onDelClick: function(btn){
        this.getTreepanel().getSelectionModel().getLastSelected().remove(true, true);
        this.getDelBtn().hide();
        this.getAddBtn().hide();
    },

    onSaveClick: function(btn){
        // проверка на дубликаты и склейка номеров документов
        this.getController("docs.PlombsTreeDetailController").checkField('ndoc',this.getTreepanel(),['ncas','text1','text2','dat','ncopy','code','fieldNum'],this);
    },
    /**
     * Удаление старых и сохранение новых документов
     */
    saveFunc:function()
    {
        var ownerDoc = this.getWin().getOwnerDoc(),
            dataObj = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];
        if(this.getTreepanel().getRootNode().hasChildNodes() && dataObj){
            this.clearAllDocs9InDataObj();
            this.saveDocs9();
            ownerDoc.fireEvent('onChangeDocs9DisplField', ownerDoc);
        }
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

    saveDocs9: function(){

        this.getTreepanel().getRootNode().eachChild(function(parentNodeModel) {
            if(parentNodeModel.hasChildNodes()){
                var docs9Index = 0,
                    parentDataObj = (this.isContOtpr() ? parentNodeModel.getContObj() : parentNodeModel.getVagObj());

                if(parentDataObj && !Ext.Object.isEmpty(parentDataObj)){

                    parentDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()] = {};

                    parentNodeModel.eachChild(function(docs9Model) {
                        parentDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index] = {};

                        this.getDocs9panel().items.each(function(docs9Item,index,length){
                            if(docs9Item.getName() == 'text1') {
                                parentDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index]['text'] = docs9Model.get(docs9Item.getName());
                            } else {
                                parentDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index][docs9Item.getName()] = docs9Model.get(docs9Item.getName());
                            }
                        }, this);
                        parentDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index]['sort'] = docs9Index;
                        docs9Index++;
                    }, this);
                }
            }
        }, this);
    },

    /*findContInDataObj: function(searchVagIndx, searchContIndx){
        var ownerDoc = this.getWin().getOwnerDoc(),
            vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){
                
                if(vagIndx == searchVagIndx){  // found vag
                    var vag = vags[vagIndx],
                        conts = vag[this.getWin().getOwnerDoc().getContCollectionName()];

                    if(conts && !Ext.Object.isEmpty(conts)){
                        
                        for(var contIndx in conts){
                            if(contIndx == searchContIndx){ // found cont
                                return conts[contIndx];
                            }    
                        }
                    }
                }
                
            }
        }
        return undefined; 
    },*/

    clearAllDocs9InDataObj: function() {
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

                            cont[this.getWin().getOwnerDoc().getDocs9CollectionName()] = {};
                        }
                    }
                } else {
                    vag[this.getWin().getOwnerDoc().getDocs9CollectionName()] = {};
                }
            }
        }
    },

    onDocs9WinShow: function(widget, ownerDoc){
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
                docs9 = cont[this.getWin().getOwnerDoc().getDocs9CollectionName()],
                contModel = Ext.create('TK.model.Docs9TreeNode', {
                    who: 'cont',
                    text: cont['utiN'],
                    iconCls: 'cont3',
                    leaf: docs9 && docs9['0'] ? false : true,
                    expanded: vagIndx == 0 && docs9 && docs9['0'] && contIndx == 0
                });

            contModel.setContObj(cont);
            rootNode.appendChild(contModel);

            if(docs9 && !Ext.Object.isEmpty(docs9)){
                this.initDocs9Nodes(docs9, contModel);
            }
        }
    },

    initVagsNodes: function(vags, rootNode){
        for(var vagIndx in vags){
            var vag = vags[vagIndx],
                docs9 = vag[this.getWin().getOwnerDoc().getDocs9CollectionName()],
                vagModel = Ext.create('TK.model.Docs9TreeNode', {
                    who: 'vag',
                    text: vag['nvag'],
                    iconCls: 'vag',
                    leaf: docs9 && docs9['0'] ? false : true,
                    expanded:  docs9 && docs9['0'] && vagIndx == 0
                });

            vagModel.setVagObj(vag);
            rootNode.appendChild(vagModel);

            if(docs9 && !Ext.Object.isEmpty(docs9)){
                this.initDocs9Nodes(docs9, vagModel);
            }
        }
    },

    initDocs9Nodes: function(docs9, parentModel){
        var lang = this.getLangCombo().getValue();

        for(var doc9Indx in docs9){
            var doc9 = docs9[doc9Indx],
                doc9Model = Ext.create('TK.model.Docs9TreeNode', {
                    who: 'docs9',
                    text:   (lang == 'de' ? (doc9['text2'] ? doc9['text2'] : '') : (doc9['text'] ? doc9['text'] : '')) +
                            (doc9['ndoc'] ? ' ' + doc9['ndoc'] : ''),
                    iconCls: 'doc_new',
                    leaf: true
                });

            this.getDocs9panel().items.each(function(item,index,length){
                if(item.getName() == 'text1'){
                    doc9Model.set(item.getName(), doc9['text']);
                } else {
                    doc9Model.set(item.getName(), doc9[item.getName()]);
                }
            });

            parentModel.appendChild(doc9Model);
        }
    },

    onNcasClick: function(field) {
        var nsiGrid = this.getController('Nsi').nsiDocG23().getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectDocG23, this.getDocs9panel(), {single: true});
    },

    onSelectDocG23: function(view, record) {
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('code');
        if(field){
            field.setValue(data['nsiFNn']);
            field.fireEvent('blur', field);
        }

        field = form.findField('ncas');
        if(field){
            field.setValue(data['nsiFNcas']);
            field.fireEvent('blur', field);
        }

        field = form.findField('text1');
        if(field){
            field.setValue(data['nsiFDesc']);
            field.fireEvent('blur', field);
        }

        field = form.findField('text2');
        if(field){
            field.setValue(data['nsiFDsc2']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    setDisplayedDocs9Fields: function(controller, docForm){
        docForm=docForm.title?docForm:docForm.ownerCt;
        var vags = docForm.dataObj[docForm.getVagCollectionName()],
            // docs9DisplField = this.getCimsmgs().getComponent('disp.g9'),

            docs9DisplField = controller.getDoc9DispField(),
            docs9Result = '';

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx],
                    docs9;

                if(this.isContOtpr()) {
                    var conts = vag[docForm.getContCollectionName()];

                    if (conts && !Ext.Object.isEmpty(conts)) {

                        for (var contIndx in conts) {

                            var cont = conts[contIndx];

                            docs9 = cont[docForm.getDocs9CollectionName()];
                            docs9Result += this.buildDisplayedDocs9String(docs9);
                        }
                    }
                } else {
                    docs9 = vag[docForm.getDocs9CollectionName()];
                    docs9Result += this.buildDisplayedDocs9String(docs9);
                }
            }
        }

        docs9DisplField.setValue(docs9Result);
    },

    buildDisplayedDocs9String: function(docs9) {
        var docs9Result = '';
        if(docs9 && !Ext.Object.isEmpty(docs9)){
            var len=Object.keys(docs9).length,
                used=[],count=0;
            used.length=len;
            used.fill(false);
            for(var docs9Indx in docs9){
                var doc9 = docs9[docs9Indx];
                if(!used[count++])
                {
                    used[count-1]=true;
                    var str='';
                    str += (doc9['text'] ? doc9['text'] + ':' : '');
                    str += (doc9['text2'] ? doc9['text2'] + '  ' : '');
                    str += (doc9['ndoc'] ? doc9['ndoc'] + '  ' : '');
                    str += (doc9['dat'] ? 'от ' + doc9['dat'] + '  ' : '');
                    str += (doc9['ncopy'] ? doc9['ncopy'] + ' экз '  : '');
                    if(doc9['text']&&doc9['ncas']&&(doc9['text'].toLowerCase()===doc9['ncas'].toLowerCase()))
                    {
                        var count2=0;
                        for(var docs9Indx2 in docs9){
                            var doc9_2=docs9[docs9Indx2];
                            if(!used[count2++]&&doc9_2['text']&&doc9_2['ncas']&&(doc9['text'].toLowerCase()===doc9_2['text'].toLowerCase())&&(doc9_2['text'].toLowerCase()===doc9_2['ncas'].toLowerCase()))
                            {
                                used[count2-1]=true;
                                var str_tmp='';
                                str_tmp += (doc9_2['text2'] ? doc9_2['text2'] + '  ' : '');
                                str_tmp += (doc9_2['ndoc'] ? doc9_2['ndoc'] + '  ' : '');
                                str_tmp += (doc9_2['dat'] ? 'от ' + doc9_2['dat'] + '  ' : '');
                                str_tmp += (doc9_2['ncopy'] ? doc9_2['ncopy'] + ' экз '  : '');
                                if(str.length>0&&str_tmp.length>0)
                                    str+=',';
                                str+=str_tmp;
                            }
                        }
                    }
                    docs9Result+=str+'\n'
                }

                // docs9Result += (doc9['text'] ? doc9['text'] + '  ' : '');
                // docs9Result += (doc9['text2'] ? doc9['text2'] + '  ' : '');
                // docs9Result += (doc9['ndoc'] ? doc9['ndoc'] + '  ' : '');
                // docs9Result += (doc9['dat'] ? 'от ' + doc9['dat'] + '  ' : '');
                // docs9Result += (doc9['ncopy'] ? doc9['ncopy'] + ' экз '  : '');
                // docs9Result += '\n';
            }
        }

        return docs9Result;
    }
});