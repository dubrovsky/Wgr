Ext.define('TK.controller.docs.PlombsTreeDetailController', {
    extend: 'Ext.app.Controller',

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
    }],

    init:function () {
        this.listen({
            controller: {
                '*': {
                    showPlombsWin: this.onPlombsWinShow
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
            'plombsTreeFormWin button[action=save]': {
                click: this.onSaveClick
            }
        });
    },

    onPlombsWinShow: function(widget, ownerDoc){
        var win = Ext.widget(widget),
            tree = this.getTreepanel(),
            treeStore = tree.getStore(),
            rootNode = treeStore.getRootNode();

        win.setOwnerDoc(ownerDoc);

        rootNode.removeAll();

        //// fill tree
        var vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];
        if(vags && !Ext.Object.isEmpty(vags)){
            this.loopVagsNodes(vags, rootNode);
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
        // var g2012DataObj = '';

        // this.getCimsmgs().dataObj['g2012']
        this.getTreepanel().getRootNode().eachChild(function(contNodeModel) {
            if(contNodeModel.hasChildNodes()){
                var plombsIndex = 0,
                    contDataObj = contNodeModel.getContObj();

                if(contDataObj && !Ext.Object.isEmpty(contDataObj)){

                    contDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};

                    contNodeModel.eachChild(function(plombsModel) {
                        contDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex] = {};

                        this.getPlombspanel().items.each(function(plombsItem,index,length){
                            contDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex][plombsItem.getName()] = plombsModel.get(plombsItem.getName());
                        }, this);
                        contDataObj[this.getWin().getOwnerDoc().getPlombsCollectionName()][plombsIndex]['sort'] = plombsIndex;
                        plombsIndex++;
                    }, this);
                }
            }
        }, this);

        this.getWin().getOwnerDoc().fireEvent('onSavePlombsToDataObj', this.getWin().getOwnerDoc());
        // this.getWin().getOwnerDoc().dataObj['']
    },

    clearAllPlombsInDataObj: function() {
        var ownerDoc = this.getWin().getOwnerDoc(),
            vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(vags && !Ext.Object.isEmpty(vags)){
            for(var vagIndx in vags){

                var vag = vags[vagIndx],
                    conts = vag[this.getWin().getOwnerDoc().getContCollectionName()];

                if(conts && !Ext.Object.isEmpty(conts)){

                    for(var contIndx in conts){
                        var cont = conts[contIndx];

                        cont[this.getWin().getOwnerDoc().getPlombsCollectionName()] = {};
                    }
                }

            }
        }
    }
});