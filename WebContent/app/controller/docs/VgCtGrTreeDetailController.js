Ext.define('TK.controller.docs.VgCtGrTreeDetailController', {
    extend: 'Ext.app.Controller',

    stores:[
        'VgCtGrTreeNodes'
    ],
    models:[
        'VgCtGrTreeNode'
    ],

    refs:[{
        ref: 'win',
        selector: 'vgCtGrTreeFormWin'
    },{
        ref: 'treepanel',
        selector: 'vgCtGrTreeFormWin > treepanel'
    },{
        ref: 'tabpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel'
    },{
        ref: 'vagpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #vag'
    },{
        ref: 'contpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #cont'
    },{
        ref: 'gryzpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #gryz'
    },{
        ref: 'delBtn',
        selector: 'vgCtGrTreeFormWin button[action=del]'
    },{
        ref: 'addVagBtn',
        selector: 'vgCtGrTreeFormWin button[action=addVag]'
    },{
        ref: 'addContBtn',
        selector: 'vgCtGrTreeFormWin button[action=addCont]'
    },{
        ref: 'addGryzBtn',
        selector: 'vgCtGrTreeFormWin button[action=addGryz]'
    },{
        ref: 'saveBtn',
        selector: 'vgCtGrTreeFormWin button[action=save]'
    }],

    init:function () {
        this.listen({
            controller: {
                '*': {
                    showVgCtGrWin: this.onVgCtGrWinShow
                }
            }
        });

        this.control({
            'vgCtGrTreeFormWin > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'vgCtGrTreeFormWin > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            },
            'vgCtGrTreeFormWin button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'vgCtGrTreeFormWin button[action=addCont]': {
                click: this.onAddContClick
            },
            'vgCtGrTreeFormWin button[action=addVag]': {
                click: this.onAddVagClick
            },
            'vgCtGrTreeFormWin button[action=del]': {
                click: this.onDelClick
            },
            'vgCtGrTreeFormWin button[action=save]': {
                click: this.onSaveClick
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=kgvn]': {
                ontriggerclick: this.onKgvnClick
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=ekgvn]': {
                ontriggerclick: this.onEkgvnClick
            }
        });
    },

    onTreeNodeClick: function(treepanel, record, item, index){
        var tabBar = this.getTabpanel().getTabBar();
        if(tabBar.isHidden()){
            tabBar.show();
        }

        var oldTab = this.getTabpanel().getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if(oldTab.getItemId() != newTabItemId){ // new tab
            this.getTabpanel().items.each(function(tab){
                if(tab.getItemId() == newTabItemId){
                    newTab = tab;
                    return false;
                }
            });

            this.getTabpanel().setActiveTab(newTab);
            this.getTabpanel().items.first().tab.setText(newTab.title); // workaround to fix title bug
            oldTab.hide();
        }
        newTab.loadRecord(record);

        // change buttons visibillity
        if(this.getSaveBtn().isHidden()){
            this.getSaveBtn().show();
        }
        if(this.getDelBtn().isHidden()){
            this.getDelBtn().show();
        }

        switch(newTabItemId){
            case 'gryz':
                if(this.getAddGryzBtn().isHidden()){
                    this.getAddGryzBtn().show();
                }
                if(this.getAddContBtn().isHidden()){
                    this.getAddContBtn().show();
                }
                break;
            case 'cont':
                if(this.getAddGryzBtn().isHidden()){
                    this.getAddGryzBtn().show();
                }
                if(this.getAddContBtn().isHidden()){
                    this.getAddContBtn().show();
                }
                break;
            case 'vag':
                if(this.getAddGryzBtn().isVisible()){
                    this.getAddGryzBtn().hide();
                }
                if(this.getAddContBtn().isHidden()){
                    this.getAddContBtn().show();
                }
                break;
        }
    },

    onVgCtGrWinShow: function(widget, ownerDoc){
        var win = Ext.widget(widget),
            tree = this.getTreepanel(),
            treeStore = tree.getStore(),
            rootNode = treeStore.getRootNode();

        win.setOwnerDoc(ownerDoc);
        
        rootNode.removeAll();

        //// fill tree
        var vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];
        if(vags && !Ext.Object.isEmpty(vags)){
            this.initVagsNodes(vags, rootNode);
        }
        /// END fill tree
        
        win.show();
    },

    initVagsNodes: function(vags, rootNode){
        for(var vagIndx in vags){
            var vag = vags[vagIndx],
                conts = vag[this.getWin().getOwnerDoc().getContCollectionName()],
                vagModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    text: vag['nvag'],
                    who: 'vag',
                    leaf: conts && conts['0'] ? false : true,
                    iconCls: 'vag',
                    expanded: conts && conts['0'] && vagIndx == 0
                });

            this.getVagpanel().items.each(function(item,index,length){
                vagModel.set(item.getName(), vag[item.getName()]);
            });
            rootNode.appendChild(vagModel);

            if(conts && !Ext.Object.isEmpty(conts)){
                this.initContsNodes(conts, vagIndx, vagModel);
            }
        }
    },

    initContsNodes: function(conts, vagIndx, vagModel){
        for(var contIndx in conts){
            var cont = conts[contIndx],
                gryzy = cont[this.getWin().getOwnerDoc().getGryzCollectionName()],
                contModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    text: cont['utiN'],
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0
                });

            this.getContpanel().items.each(function(item,index,length){
                contModel.set(item.getName(), cont[item.getName()]);
            });
            contModel.setDocs9Obj(cont[this.getWin().getOwnerDoc().getDocs9CollectionName()]);   // save doc9 collection to preserve it when conts will be saved
            contModel.setPlombsObj(cont[this.getWin().getOwnerDoc().getPlombsCollectionName()]);   // save plombs collection to preserve it when conts will be saved
            vagModel.appendChild(contModel);

            if(gryzy && !Ext.Object.isEmpty(gryzy)){
                this.initGryzyNodes(gryzy, contModel);
            }
        }
    },

    initGryzyNodes: function(gryzy, contModel){
        for(var gryzIndx in gryzy){
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    text: gryz['kgvn'],
                    iconCls: 'gryz',
                    who: 'gryz',
                    leaf: true
                });

            this.getGryzpanel().items.each(function(item,index,length){
                gryzModel.set(item.getName(), gryz[item.getName()]);
            });
            contModel.appendChild(gryzModel);
        }
    },

    onVgCtGrFormUpdateData: function(field){
       var rec = field.up('form').getRecord(),
           oldVal = rec.get(field.getName()),
           newVal = field.getSubmitValue();

       if(oldVal != newVal){
           rec.set(field.getName(), newVal);
           if( field.getName() == 'kgvn' ||
               field.getName() == 'utiN' ||
               field.getName() == 'nvag'){
               rec.set('text', newVal);
           }
       }
    },

    onAddGryzClick: function(btn){
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')){
            case 'cont':
                parentModelNode = selectedModelNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode;
                break;
        }
        this.addVgCtGr(parentModelNode, 'gryz');
    },

    onAddContClick: function(btn){
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')){
            case 'vag':
                parentModelNode = selectedModelNode;
                break;
            case 'cont':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode.parentNode;
                break;
        }

        this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    },

    onAddVagClick: function(btn){
        this.addVgCtGr(this.getTreepanel().getRootNode(), 'vag');
    },

    addVgCtGr: function(parentModelNode, who, iconCls){
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.VgCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    onDelClick: function(btn){
        this.getTreepanel().getSelectionModel().getLastSelected().remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();
    },

    /*prepareData: function() {
        var data = {}, doc = this.doc, coll = this.coll;
        this.store.each(function(rec, ind, len){
            rec.fields.each(function(field, i, l){
                data[doc+'.'+coll+'['+ind+'].'+field.name] = rec.data[field.name];
            });
        }, this);
        return data;
    },*/

    // smgs.cimSmgsCarLists[0].hid
    // smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].notes
    // smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs[0].kgvn

    onSaveClick: function(btn){
        var dataObj = {};

        if(this.getTreepanel().getRootNode().hasChildNodes()){
            dataObj = this.saveVags();
        }

        var ownerDoc = this.getWin().getOwnerDoc();
        ownerDoc.dataObj[ownerDoc.getVagCollectionName()] = dataObj; // write results
        ownerDoc.fireEvent('onChangeVgCtGrDisplField', ownerDoc);
    },

    saveVags: function(){
        var vagIndex = 0,
            dataObj = {};
        
        this.getTreepanel().getRootNode().eachChild(function(vagNodeModel) { // write vags
            dataObj[vagIndex] = {};

            this.getVagpanel().items.each(function(vagItem,index,length){
                dataObj[vagIndex][vagItem.getName()] = vagNodeModel.get(vagItem.getName());
            }, this);
            dataObj[vagIndex]['sort'] = vagIndex;

            if(vagNodeModel.hasChildNodes()){
                this.saveConts(vagNodeModel, dataObj[vagIndex]);
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    saveConts: function(vagNodeModel, vagDataObj){
        var contIndex = 0;
        
        vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()] = {};
        vagNodeModel.eachChild(function(contNodeModel) {  // write conts
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex] = {};

            this.getContpanel().items.each(function(contItem,index,length){
                vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][contItem.getName()] = contNodeModel.get(contItem.getName());
            }, this);
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex]['sort'] = contIndex;
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][this.getWin().getOwnerDoc().getDocs9CollectionName()] = contNodeModel.getDocs9Obj(); // write back docs9 obj
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][this.getWin().getOwnerDoc().getPlombsCollectionName()] = contNodeModel.getPlombsObj(); // write back docs9 obj

            if(contNodeModel.hasChildNodes()){
                this.saveGryzy(contNodeModel, vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex]);
            }

            contIndex++;
        }, this);
    },

    saveGryzy: function(contNodeModel, contDataObj){
        var gryzIndex = 0;
        
        contDataObj[this.getWin().getOwnerDoc().getGryzCollectionName()] = {};
        contNodeModel.eachChild(function(gryzNodeModel) {
            contDataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex] = {};

            this.getGryzpanel().items.each(function(gryzItem,index,length){
                contDataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex][gryzItem.getName()] = gryzNodeModel.get(gryzItem.getName());
            }, this);
            contDataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex]['sort'] = gryzIndex;

            gryzIndex++;
        }, this);
    },

    onKgvnClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiGng(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectGng, this.getGryzpanel(), {single: true});
    },

    onSelectGng: function(view, record){
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('kgvn');
        if(field){
            field.setValue(data['code']);
            field.fireEvent('blur', field);
        }

        field = form.findField('nzgr');
        if(field){
            field.setValue(data['name']);
            field.fireEvent('blur', field);
        }

        field = form.findField('ohr');
        if(field){
            field.setValue(data['ohr']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    onEkgvnClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiEtsng(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectEtsng, this.getGryzpanel(), {single: true});
    },

    onSelectEtsng:function (view, record) {
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('ekgvn');
        if(field){
            field.setValue(data['code']);
            field.fireEvent('blur', field);
        }

        field = form.findField('enzgr');
        if(field){
            field.setValue(data['name']);
            field.fireEvent('blur', field);
        }

        field = form.findField('ohr');
        if(field){
            field.setValue(data['ohr']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    }
});