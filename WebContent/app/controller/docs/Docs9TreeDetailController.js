Ext.define('TK.controller.docs.Docs9TreeDetailController', {
    extend: 'Ext.app.Controller',

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
    }],

    init:function () {
        this.listen({
            controller: {
                '*': {
                    showDocs9Win: this.onDocs9WinShow
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
            'docs9TreeFormWin > form > trigger[name=ncas]': {
                ontriggerclick: this.onNcasClick
            }
        });
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
            newVal = field.getSubmitValue();

        if(oldVal != newVal){
            rec.set(field.getName(), newVal);
            if( field.getName() == 'text1'){
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
        var ownerDoc = this.getWin().getOwnerDoc(),
            dataObj = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];

        if(this.getTreepanel().getRootNode().hasChildNodes() && dataObj){
            this.clearAllDocs9InDataObj();
            this.saveDocs9();
            ownerDoc.fireEvent('onChangeDocs9DisplField', ownerDoc);
        }
    },

    saveDocs9: function(){

        this.getTreepanel().getRootNode().eachChild(function(contNodeModel) {
            if(contNodeModel.hasChildNodes()){
                var docs9Index = 0,
                    contDataObj = contNodeModel.getContObj();
                    // contDataObj = this.findContInDataObj(contModel.getVagIndx(), contModel.getContIndx());

                if(contDataObj && !Ext.Object.isEmpty(contDataObj)){

                    contDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()] = {};

                    contNodeModel.eachChild(function(docs9Model) {
                        contDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index] = {};

                        this.getDocs9panel().items.each(function(docs9Item,index,length){
                            if(docs9Item.getName() == 'text1') {
                                contDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index]['text'] = docs9Model.get(docs9Item.getName());
                            } else {
                                contDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index][docs9Item.getName()] = docs9Model.get(docs9Item.getName());
                            }
                        }, this);
                        contDataObj[this.getWin().getOwnerDoc().getDocs9CollectionName()][docs9Index]['sort'] = docs9Index;
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

                var vag = vags[vagIndx],
                    conts = vag[this.getWin().getOwnerDoc().getContCollectionName()];

                if(conts && !Ext.Object.isEmpty(conts)){

                    for(var contIndx in conts){
                        var cont = conts[contIndx];

                        cont[this.getWin().getOwnerDoc().getDocs9CollectionName()] = {};
                    }
                }

            }
        }
    },

    onDocs9WinShow: function(widget, ownerDoc){
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
                docs9 = cont[this.getWin().getOwnerDoc().getDocs9CollectionName()],
                contModel = Ext.create('TK.model.Docs9TreeNode', {
                    who: 'cont',
                    text: cont['utiN'],
                    iconCls: 'cont3',
                    leaf: docs9 && docs9['0'] ? false : true,
                    expanded: vagIndx == 0 && docs9 && docs9['0'] && contIndx == 0
                });

            // contModel.setVagIndx(vagIndx);
            // contModel.setContIndx(contIndx);
            contModel.setContObj(cont);
            rootNode.appendChild(contModel);

            if(docs9 && !Ext.Object.isEmpty(docs9)){
                this.initDocs9Nodes(docs9, contModel);
            }
        }
    },

    initDocs9Nodes: function(docs9, contModel){
        for(var doc9Indx in docs9){
            var doc9 = docs9[doc9Indx],
                doc9Model = Ext.create('TK.model.Docs9TreeNode', {
                    who: 'docs9',
                    text: doc9['text'],
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

            contModel.appendChild(doc9Model);
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
            field.setValue(data['nsiFDsc3']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    }
});