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

    onPlombsWinShow: function(widget, ownerDoc){
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

    onSaveClick: function(btn){
        var ownerDoc = this.getWin().getOwnerDoc(),
            dataObj = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(this.getTreepanel().getRootNode().hasChildNodes() && dataObj){
            this.clearAllPlombsInDataObj();
            this.savePlombs();
            ownerDoc.fireEvent('onChangePlombsDisplField', ownerDoc);
        }
    },

    savePlombs: function(){

        this.getTreepanel().getRootNode().eachChild(function(parentNodeModel) {
            if(parentNodeModel.hasChildNodes()){
                var plombsIndex = 0,
                    parentDataObj = (this.isContOtpr() ? parentNodeModel.getContObj() : parentNodeModel.getVagObj());

                if(parentDataObj && !Ext.Object.isEmpty(parentDataObj)){

                    parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};

                    parentNodeModel.eachChild(function(plombsModel) {
                        parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex] = {};

                        this.getPlombspanel().items.each(function(plombsItem,index,length){
                            parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex][plombsItem.getName()] = plombsModel.get(plombsItem.getName());
                        }, this);
                        parentDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex]['sort'] = plombsIndex;
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

    setDisplayedPlombsFields: function(controller, docForm){
        controller.getDocForm().getComponent('smgs.g2012').setValue(docForm.dataObj['g2012']);
    },

    setG2012DataObj: function(controller, docForm){
        var vags = docForm.dataObj[docForm.getVagCollectionName()],
            plombsResult = '',
            delim = '',
            plombsCount = 0,
            vagsCount = 0,
            contsCount = 0;

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
    }
});