Ext.define('TK.controller.docs.VgCtGrTreeDetailController', {
    extend: 'Ext.app.Controller',

    requires: [
        'Ext.util.DelayedTask',
        'Ext.util.MixedCollection',
        'TK.Utils',
        'TK.model.VgCtGrTreeNode'
    ],

    stores: [
        'VgCtGrTreeNodes'
    ],
    models: [
        'VgCtGrTreeNode'
    ],

    refs: [{
        ref: 'win',
        selector: 'vgCtGrTreeFormWin'
    }, {
        ref: 'treepanel',
        selector: 'vgCtGrTreeFormWin > treepanel'
    }, {
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'tabpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel'
    }, {
        ref: 'vagpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #vag'
    }, {
        ref: 'contpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #cont'
    }, {
        ref: 'gryzpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #gryz'
    }, {
        ref: 'danGryzpanel',
        selector: 'vgCtGrTreeFormWin > tabpanel > #danGryz'
    }, {
        ref: 'delBtn',
        selector: 'vgCtGrTreeFormWin button[action=del]'
    }, {
        ref: 'searchBtn',
        selector: 'vgCtGrTreeFormWin button[action=search]'
    }, {
        ref: 'searchField',
        selector: 'vgCtGrTreeFormWin textfield#searchField'
    }, {
        ref: 'uploadVagsSmgs2',
        selector: 'vgCtGrTreeFormWin button#uploadVagsSmgs2'
    }, {
        ref: 'uploadContsSmgs2',
        selector: 'vgCtGrTreeFormWin button#uploadContsSmgs2'
    }, {
        ref: 'addVagBtn',
        selector: 'vgCtGrTreeFormWin button[action=addVag]'
    }, {
        ref: 'addContBtn',
        selector: 'vgCtGrTreeFormWin button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'vgCtGrTreeFormWin button[action=addGryz]'
    }, {
        ref: 'addDanGryzBtn',
        selector: 'vgCtGrTreeFormWin button[action=addDanGryz]'
    }, {
        ref: 'saveBtn',
        selector: 'vgCtGrTreeFormWin button[action=save]'
    }, {
        ref: 'langCombo',
        selector: 'viewport #localeCombo #langCombo'
    }/*,{
        ref: 'g25_kField',
        selector: 'viewport > tabpanel > docsform field[itemId="smgs.g25_k"]'
    },{
        ref: 'g25Field',
        selector: 'viewport > tabpanel > docsform field[name="smgs.g25"]'
    }*/],

    init: function () {
        this.listen({
            controller: {
                '*': {
                    showVgCtGrWin: this.onVgCtGrWinShow,
                    expandAllClick: this.expandAllTreeClick,
                    collapseAllClick: this.collapseAllTreeClick,
                    hideVag: this.hideVags,
                    displayedVgCtGrFields: this.setDisplayedVgCtGrFields
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
            'vgCtGrTreeFormWin button[action=addDanGryz]': {
                click: this.onAddDanGryzClick
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
            'vgCtGrTreeFormWin button[action=search]': {
                click: this.onSearchClick
            },
            'vgCtGrTreeFormWin button[action=expandAll]': {
                click: this.onExpandAllClick
            },
            'vgCtGrTreeFormWin button[action=collapseAll]': {
                click: this.onCollapseAllClick
            },
            'vgCtGrTreeFormWin button[action=hideVag]': {
                click: this.hideVags
            },
            'vgCtGrTreeFormWin button[action=showVag]': {
                click: this.showVags
            },
            'vgCtGrTreeFormWin textfield#searchField': {
                keypress: this.onSearchFieldKeyPress
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=kgvn]': {
                ontriggerclick: this.onKgvnClick
            },
            'vgCtGrTreeFormWin > tabpanel > #danGryz > trigger[name=carDName]': {
                ontriggerclick: this.onCarDNameClick
            },
            'vgCtGrTreeFormWin > tabpanel > #danGryz > trigger[name=carDNameDe]': {
                ontriggerclick: this.onCarDNameDeClick
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=ekgvn]': {
                ontriggerclick: this.onEkgvnClick
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=upakForeign]': {
                ontriggerclick: this.onUpakClick
            },
            'vgCtGrTreeFormWin > tabpanel > #gryz > trigger[name=upak]': {
                ontriggerclick: this.onUpakClick
            },
            'cimsmgsVgCtGrTreeformWin > treepanel > tableview': {
                drop: this.onDropContToVag,
                beforedrop: this.onBeforedropContToVag
            }
        });
    },

    isContOtpr: function () {
        // return this.getG25_kField().getValue();
        var g25Field = this.getCenter().getActiveTab().getForm().findField('smgs.g25');
        var value = g25Field.getGroupValue ? g25Field.getGroupValue() : g25Field.getValue();

        if (!value) value = 2;
        return parseInt(value) === 2;
    },

    isGroupContOtpr: function (controller, vags) {
        return (this.isContOtpr() && ((vags && Ext.Object.getSize(vags) > 1) || this.countConts(controller, vags) > 1));
    },

    countConts: function (controller, vags) {
        var count = 0;
        if (vags) {
            for (var vagIndx in vags) {
                var vag = vags[vagIndx],
                    conts = vag[controller.getDocForm().getContCollectionName()];

                if (conts) {
                    count += Ext.Object.getSize(conts);
                }
            }
        }
        return count;
    },

    onTreeNodeClick: function (treepanel, record, item, index) {
        var tabBar = this.getTabpanel().getTabBar();
        if (tabBar.isHidden()) {
            tabBar.show();
        }

        var oldTab = this.getTabpanel().getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if (oldTab.getItemId() != newTabItemId) { // new tab
            this.getTabpanel().items.each(function (tab) {
                if (tab.getItemId() == newTabItemId) {
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
        if (this.getSaveBtn().isHidden()) {
            this.getSaveBtn().show();
        }
        if (this.getDelBtn().isHidden()) {
            this.getDelBtn().show();
        }
        switch (newTabItemId) {
            case 'danGryz':
                if (this.getAddDanGryzBtn().isHidden()) {
                    this.getAddDanGryzBtn().show();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.isContOtpr() && this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                break;
            case 'gryz':
                if (this.getAddDanGryzBtn().isHidden()) {
                    this.getAddDanGryzBtn().show();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.isContOtpr() && this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                break;
            case 'cont':
                if (this.getAddDanGryzBtn().isVisible()) {
                    this.getAddDanGryzBtn().hide();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                break;
            case 'vag':
                if (this.getAddDanGryzBtn().isVisible()) {
                    this.getAddDanGryzBtn().hide();
                }
                if (this.isContOtpr()) {
                    if (this.getAddGryzBtn().isVisible()) {
                        this.getAddGryzBtn().hide();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                } else {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                }
                break;
        }
    },

    onVgCtGrWinShow: function (widget, ownerDoc, record) {
        var win = Ext.widget(widget),
            tree = this.getTreepanel(),
            treeStore = tree.getStore(),
            rootNode = treeStore.getRootNode();
        //проверка является ли форма документа вложеной или все компоненты находятся на формe
        if (ownerDoc.ownerCt.ownerCt.xtype && ownerDoc.ownerCt.ownerCt.xtype === 'tabpanel')
            ownerDoc = ownerDoc.ownerCt;

        win.setOwnerDoc(ownerDoc);

        rootNode.removeAll();

        //// fill tree
        var vags = ownerDoc.dataObj[ownerDoc.getVagCollectionName()];
        if (vags && !Ext.Object.isEmpty(vags)) {
            this.initVagsNodes(vags, rootNode);
        }
        /// END fill tree

        win.show();
        // делаем пломбы выбранной в дереве, если в окно попали через двойно мелчок по пломбе в графе 19
        if (typeof record === 'object' && record.data) {
            rootNode.findChildBy(function (child) {
                var treeHid = child.data.hid;

                if (record.data.hid === treeHid) {
                    tree.getSelectionModel().select(child);
                    this.onTreeNodeClick(tree, child);
                }
            }, this, true);
        }
        this.onExpandAllClick();

        if (this.isContOtpr()) {
            this.getUploadVagsSmgs2().hide();
            this.getUploadContsSmgs2().show();
        } else {
            this.getUploadVagsSmgs2().show();
            this.getUploadContsSmgs2().hide();
        }
    },

    initVagsNodes: function (vags, rootNode) {
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag[this.getWin().getOwnerDoc().getContCollectionName()],
                gruzy = vag[this.getWin().getOwnerDoc().getGryzCollectionName()],
                vagText = vag['nvag'] ? vag['nvag'] : '',
                vagModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    // text: vag['sort']+1+'-'+ vagText,
                    text: vagText,
                    who: 'vag',
                    leaf: false,
                    iconCls: 'vag' + (vag['sort'] + 1),
                    expanded: ((conts && conts['0']) || (gruzy && gruzy['0'])) && vagIndx == 0
                });
            this.getVagpanel().items.each(function (item, index, length) {
                vagModel.set(item.getName(), vag[item.getName()]);
            });
            if (!this.isContOtpr()) {
                vagModel.setDocs9Obj(vag[this.getWin().getOwnerDoc().getDocs9CollectionName()]);   // save doc9 collection to preserve it when conts will be saved
                vagModel.setPlombsObj(vag[this.getWin().getOwnerDoc().getPlombsCollectionName()]);   // save plombs collection to preserve it when conts will be saved
            }
            rootNode.appendChild(vagModel);

            if (this.isContOtpr()) {
                if (conts && !Ext.Object.isEmpty(conts)) {
                    this.initContsNodes(conts, vagIndx, vagModel);
                }
            } else {
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyNodes(gruzy, vagModel, vagIndx);
                }
            }
        }
    },

    initContsNodes: function (conts, vagIndx, vagModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont[this.getWin().getOwnerDoc().getGryzCollectionName()];
            contModel = Ext.create('TK.model.VgCtGrTreeNode', {
                text: cont['utiN'],
                who: 'cont',
                iconCls: 'cont3',
                leaf: gryzy && gryzy['0'] ? false : true,
                expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0,
                style: {
                    'color': 'red'
                }
            });

            this.getContpanel().items.each(function (item, index, length) {
                contModel.set(item.getName(), cont[item.getName()]);
            });
            contModel.setDocs9Obj(cont[this.getWin().getOwnerDoc().getDocs9CollectionName()]);   // save doc9 collection to preserve it when conts will be saved
            contModel.setPlombsObj(cont[this.getWin().getOwnerDoc().getPlombsCollectionName()]);   // save plombs collection to preserve it when conts will be saved
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx);
            }
        }
    },

    initGryzyNodes: function (gryzy, contModel, contIndx) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                danGryzy = gryz[this.getWin().getOwnerDoc().getDanGryzCollectionName()],
                gryzModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf: danGryzy && danGryzy['0'] ? false : true,
                    expanded: contIndx == 0 && danGryzy && danGryzy['0'] && gryzIndx == 0
                });

            this.getGryzpanel().items.each(function (item, index, length) {
                gryzModel.set(item.getName(), gryz[item.getName()]);
            });
            contModel.appendChild(gryzModel);

            if (danGryzy && !Ext.Object.isEmpty(danGryzy)) {
                this.initDanGryzyNodes(danGryzy, gryzModel);
            }
        }
    },

    initDanGryzyNodes: function (danGryzy, gryzModel) {
        for (var danGryzIndx in danGryzy) {
            var danGryz = danGryzy[danGryzIndx],
                danGryzModel = Ext.create('TK.model.VgCtGrTreeNode', {
                    text: danGryz['numOon'],
                    who: 'danGryz',
                    iconCls: 'danGryz',
                    leaf: true
                });

            this.getDanGryzpanel().items.each(function (item, index, length) {
                danGryzModel.set(item.getName(), danGryz[item.getName()]);
            });
            gryzModel.appendChild(danGryzModel);
        }
    },

    onVgCtGrFormUpdateData: function (field) {
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue();

        if (oldVal != newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() == 'kgvn' ||
                field.getName() == 'utiN' ||
                field.getName() == 'nvag' ||
                field.getName() == 'numOon') {
                // if(field.getName() =='nvag')
                // {
                //     newVal=rec.data['sort']+1+'-'+newVal;
                // }

                rec.set('text', newVal);
            }
        }
    },

    onAddDanGryzClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'danGryz':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode;
                break;
        }
        this.addVgCtGr(parentModelNode, 'danGryz');
    },

    onAddGryzClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                break;
            case 'cont':
                parentModelNode = selectedModelNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'danGryz':
                parentModelNode = selectedModelNode.parentNode.parentNode;
                break;
        }
        this.addVgCtGr(parentModelNode, 'gryz');
    },

    onAddContClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                break;
            case 'cont':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode.parentNode;
                break;
            case 'danGryz':
                parentModelNode = selectedModelNode.parentNode.parentNode.parentNode;
                break;
        }

        this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    },

    onAddVagClick: function (btn) {
        this.addVgCtGr(this.getTreepanel().getRootNode(), 'vag');
    },
    /**
     * добавляет элемент в дерево вагонов
     * @param parentModelNode родительский узел
     * @param who тип элемента
     * @param iconCls иконка
     */
    addVgCtGr: function (parentModelNode, who, iconCls) {
        var srt = 0,
            icnCls = '';
        if (who === 'vag' && parentModelNode.lastChild) {
            srt = parentModelNode.lastChild.data['sort'] + 1;
            icnCls = 'vag' + (srt + 1);
        } else
            icnCls = iconCls ? iconCls : who;

        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.VgCtGrTreeNode', {
                leaf: true,
                who: who,
                sort: srt,
                // text:srt+1+'-',
                iconCls: icnCls
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    onDelClick: function (btn) {
        this.getTreepanel().getSelectionModel().getLastSelected().remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();
        this.getAddDanGryzBtn().hide();
    },

    onSearchFieldKeyPress: function (field, event) {
        if (event.getKey() == event.ENTER) {
            this.getSearchBtn().fireEvent('click', this.getSearchBtn());
        }
    },

    onSearchClick: function (btn) {
        var rootNode = this.getTreepanel().getRootNode(),
            searchVal = this.getSearchField().getValue(),
            foundNode;

        if (rootNode.hasChildNodes() && searchVal) {
            var lastSelectedNode = this.getTreepanel().getSelectionModel().getLastSelected(),
                nodeToStart;

            if (lastSelectedNode) {
                if (lastSelectedNode.get('who') == 'vag' || lastSelectedNode.get('who') == 'cont') {
                    nodeToStart = lastSelectedNode;
                } else {
                    switch (lastSelectedNode.get('who')) {
                        case 'danGryz':
                            nodeToStart = lastSelectedNode.parentNode.parentNode;
                            break;
                        case 'gryz':
                            nodeToStart = lastSelectedNode.parentNode;
                            break;
                    }
                }
            } else {
                nodeToStart = rootNode;
            }

            if (nodeToStart) {
                var isPassed = nodeToStart.isRoot();

                foundNode = rootNode.findChildBy(function (node) {
                    if (!isPassed && (nodeToStart == node)) {
                        isPassed = true;
                        return false;
                    }
                    /*if(isPassed && ((node.get('nvag').indexOf(searchVal) != -1) || (this.isContOtpr() && node.get('utiN').indexOf(searchVal) != -1)) ) {
                        return true;
                    }*/
                    if (isPassed && (node.get('text').indexOf(searchVal) != -1)) {
                        return true;
                    }
                    return false;
                }, this, true);
            }
        }

        if (foundNode) {
            this.getTreepanel().getSelectionModel().select(foundNode);
            foundNode.expand();
            if (!foundNode.parentNode.isRoot()) {
                foundNode.parentNode.expand();
            }
            this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), foundNode);
        }
        this.getSearchField().focus();
    },

    onExpandAllClick: function (btn) {
        this.fireEvent('expandAllClick', this.getTreepanel(), this.getWin());
    },

    expandAllTreeClick: function (treepanel, win) {
        var rootNode = treepanel.getRootNode();

        if (rootNode.hasChildNodes()) {
            win.setLoading(true);
            new Ext.util.DelayedTask(function () {
                treepanel.expandAll(function () {
                    win.setLoading(false);
                });
            }).delay(100);
        }
    },

    onCollapseAllClick: function (btn) {
        this.fireEvent('collapseAllClick', this.getTreepanel(), this.getWin());
    },

    collapseAllTreeClick: function (treepanel, win) {
        var rootNode = treepanel.getRootNode();

        if (rootNode.hasChildNodes()) {
            win.setLoading(true);
            treepanel.collapseAll(function () {
                win.setLoading(false);
            });
        }
    },
    hideVags: function (treepanel, win) {
        var rootNode = this.getTreepanel().getStore().getRootNode();
        rootNode.eachChild(function (vagNodeModel) { // write vags
            if (vagNodeModel.get('who') === 'vag')
                vagNodeModel.set('cls', 'hideTreeNode');
        }, this);
    },
    showVags: function (treepanel, win) {
        var rootNode = this.getTreepanel().getStore().getRootNode();
        rootNode.eachChild(function (vagNodeModel) { // write vags
            if (vagNodeModel.get('who') === 'vag')
                vagNodeModel.set('cls', 'showTreeNode');
        }, this);
    },
    onSaveClick: function (btn) {
        var dataObj = {};

        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            dataObj = this.saveVags();
        }

        var ownerDoc = this.getWin().getOwnerDoc();
        ownerDoc.dataObj[ownerDoc.getVagCollectionName()] = dataObj; // write results
        ownerDoc.fireEvent('onChangeVgCtGrDisplField', ownerDoc);
        ownerDoc.fireEvent('onChangeDocs9DisplField', ownerDoc);
        ownerDoc.fireEvent('onSavePlombsToDataObj', ownerDoc);
        ownerDoc.fireEvent('onChangePlombsDisplField', ownerDoc);
    },

    saveVags: function () {
        var vagIndex = 0,
            dataObj = {};

        this.getTreepanel().getRootNode().eachChild(function (vagNodeModel) { // write vags
            dataObj[vagIndex] = {};

            this.getVagpanel().items.each(function (vagItem, index, length) {
                dataObj[vagIndex][vagItem.getName()] = vagNodeModel.get(vagItem.getName());
            }, this);
            dataObj[vagIndex]['sort'] = vagIndex;
            if (!this.isContOtpr()) {
                dataObj[vagIndex][this.getWin().getOwnerDoc().getDocs9CollectionName()] = vagNodeModel.getDocs9Obj(); // write back docs9 obj
                dataObj[vagIndex][this.getWin().getOwnerDoc().getPlombsCollectionName()] = vagNodeModel.getPlombsObj(); // write back plombs obj
            }

            if (vagNodeModel.hasChildNodes()) {
                if (this.isContOtpr()) {
                    this.saveConts(vagNodeModel, dataObj[vagIndex]);
                } else {
                    this.saveGryzy(vagNodeModel, dataObj[vagIndex]);
                }
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    saveConts: function (vagNodeModel, vagDataObj) {
        var contIndex = 0;

        vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()] = {};
        vagNodeModel.eachChild(function (contNodeModel) {  // write conts
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex] = {};

            this.getContpanel().items.each(function (contItem, index, length) {
                vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][contItem.getName()] = contNodeModel.get(contItem.getName());
            }, this);
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex]['sort'] = contIndex;
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][this.getWin().getOwnerDoc().getDocs9CollectionName()] = contNodeModel.getDocs9Obj(); // write back docs9 obj
            vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex][this.getWin().getOwnerDoc().getPlombsCollectionName()] = contNodeModel.getPlombsObj(); // write back plombs obj

            if (contNodeModel.hasChildNodes()) {
                this.saveGryzy(contNodeModel, vagDataObj[this.getWin().getOwnerDoc().getContCollectionName()][contIndex]);
            }

            contIndex++;
        }, this);
    },

    // called from cont or vag
    saveGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj[this.getWin().getOwnerDoc().getGryzCollectionName()] = {};
        nodeModel.eachChild(function (gryzNodeModel) {
            dataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex] = {};

            this.getGryzpanel().items.each(function (gryzItem, index, length) {
                dataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex][gryzItem.getName()] = gryzNodeModel.get(gryzItem.getName());
            }, this);
            dataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex]['sort'] = gryzIndex;

            if (gryzNodeModel.hasChildNodes()) {
                this.saveDanGryzy(gryzNodeModel, dataObj[this.getWin().getOwnerDoc().getGryzCollectionName()][gryzIndex]);
            }

            gryzIndex++;
        }, this);
    },

    saveDanGryzy: function (gryzNodeModel, gruzDataObj) {
        var danGryzIndex = 0;

        gruzDataObj[this.getWin().getOwnerDoc().getDanGryzCollectionName()] = {};
        gryzNodeModel.eachChild(function (danGryzNodeModel) {
            gruzDataObj[this.getWin().getOwnerDoc().getDanGryzCollectionName()][danGryzIndex] = {};

            this.getDanGryzpanel().items.each(function (danGryzItem, index, length) {
                gruzDataObj[this.getWin().getOwnerDoc().getDanGryzCollectionName()][danGryzIndex][danGryzItem.getName()] = danGryzNodeModel.get(danGryzItem.getName());
            }, this);
            gruzDataObj[this.getWin().getOwnerDoc().getDanGryzCollectionName()][danGryzIndex]['sort'] = danGryzIndex;

            danGryzIndex++;
        }, this);
    },

    onKgvnClick: function (field) {
        var lang = this.getLangCombo().getValue(),
            nsiGrid;
        switch (lang) {
            case 'de':
                nsiGrid = this.getController('Nsi').nsiGngDe(field.getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.onSelectGngDe, this, {single: true});
                break;
            default:
                nsiGrid = this.getController('Nsi').nsiGng(field.getValue()).getComponent(0);
                nsiGrid.on('itemdblclick', this.onSelectGng, this, {single: true});
        }
    },

    onCarDNameClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiCargoDanV(field.ownerCt.child('[name=numOon]').getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectCarD, this, {single: true});
    },

    onCarDNameDeClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiCargoDanDe(field.ownerCt.child('[name=numOon]').getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectCarDDe, this, {single: true});
    },

    onSelectGng: function (view, record) {
        var data = record.data,
            form = this.getGryzpanel().getForm(),
            field;

        field = form.findField('kgvn');
        if (field) {
            field.setValue(data['code']);
            field.fireEvent('blur', field);
        }

        field = form.findField('nzgr');
        if (field) {
            field.setValue(data['name']);
            field.fireEvent('blur', field);
        }

        field = form.findField('ohr');
        if (field) {
            field.setValue(data['ohr']);
            field.fireEvent('blur', field);
        }

        this.findMoreGng(data['code'], 'nzgrEu');

        view.up('window').close();
    },

    onSelectCarD: function (view, record) {
        var data = record.data,
            form = this.getDanGryzpanel().getForm(),
            field;

        field = form.findField('carDName');
        if (field) {
            field.setValue(data['carDName']);
            field.fireEvent('blur', field);
        }

        field = form.findField('codDanger');
        if (field) {
            field.setValue(data['codDanger']);
            field.fireEvent('blur', field);
        }

        field = form.findField('numOon');
        if (field) {
            field.setValue(data['numOon']);
            field.fireEvent('blur', field);
        }

        field = form.findField('clazz');
        if (field) {
            field.setValue(data['clazz']);
            field.fireEvent('blur', field);
        }

        field = form.findField('dangSign');
        if (field) {
            field.setValue(data['dangSign']);
            field.fireEvent('blur', field);
        }

        field = form.findField('groupPack');
        if (field) {
            field.setValue(data['groupPack']);
            field.fireEvent('blur', field);
        }

        field = form.findField('emergenC');
        if (field) {
            field.setValue(data['emergenCard']);
            field.fireEvent('blur', field);
        }

        field = form.findField('stampDName');
        if (field) {
            field.setValue(data['stamps']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    onSelectCarDDe: function (view, record) {
        var data = record.data,
            form = this.getDanGryzpanel().getForm(),
            field;

        field = form.findField('carDNameDe');
        if (field) {
            field.setValue(data['carDNameDe']);
            field.fireEvent('blur', field);
        }

        field = form.findField('numOon');
        if (field) {
            field.setValue(data['numOonDe']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    onSelectGngDe: function (view, record) {
        var data = record.data,
            form = this.getGryzpanel().getForm(),
            field;

        field = form.findField('kgvn');
        if (field) {
            field.setValue(data['kgvn']);
            field.fireEvent('blur', field);
        }

        field = form.findField('nzgrEu');
        if (field) {
            field.setValue(data['nzgr']);
            field.fireEvent('blur', field);
        }

        this.findMoreGng(data['kgvn'], 'nzgr');

        view.up('window').close();
    },

    findMoreGng: function (kgvnVal, fieldName) {
        Ext.Ajax.request({
            url: 'Nsi_gngWithCode_view.do',
            params: {query: kgvnVal},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                if (respObj['nzgr']) {
                    var field = this.getGryzpanel().getForm().findField(fieldName);
                    if (field) {
                        field.setValue(respObj['nzgr']);
                        field.fireEvent('blur', field);
                    }
                }
            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    onEkgvnClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiEtsng(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectEtsng, this.getGryzpanel(), {single: true});
    },

    onUpakClick: function (field) {
        var nsiGrid = this.getController('Nsi').nsiUpak(field.getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.onSelectUpak, this.getGryzpanel(), {single: true});
    },

    onSelectEtsng: function (view, record) {
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('ekgvn');
        if (field) {
            field.setValue(data['code']);
            field.fireEvent('blur', field);
        }

        field = form.findField('enzgr');
        if (field) {
            field.setValue(data['name']);
            field.fireEvent('blur', field);
        }

        field = form.findField('ohr');
        if (field) {
            field.setValue(data['ohr']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    onSelectUpak: function (view, record) {
        var data = record.data,
            form = this.getForm(),
            field;

        field = form.findField('upakForeign');
        if (field) {
            field.setValue(data['nameDe']);
            field.fireEvent('blur', field);
        }

        field = form.findField('upak');
        if (field) {
            field.setValue(data['name']);
            field.fireEvent('blur', field);
        }

        view.up('window').close();
    },

    onDropContToVag: function (node, data, vagModelNode) {

        var contModelNode = data.records[0];
        if (contModelNode.parentNode.get('who') !== 'vag') {
            contModelNode.remove();
            if (vagModelNode.get('who') === 'vag') {
                vagModelNode.appendChild(contModelNode);
            }
        }

        if (vagModelNode.get('who') === 'vag' && contModelNode.get('who') === 'cont') {
            contModelNode.set('hid', null);
            if (contModelNode.hasChildNodes()) {
                contModelNode.eachChild(function (gryzModel) {
                    gryzModel.set('hid', null);
                    if (gryzModel.hasChildNodes()) {
                        gryzModel.eachChild(function (danGryzModel) {
                            danGryzModel.set('hid', null);
                        }, this);
                    }
                }, this);
            }

            var doc9Obj = contModelNode.getDocs9Obj();
            if (!Ext.Object.isEmpty(doc9Obj)) {
                Ext.Object.each(doc9Obj, function (key, value) {
                    doc9Obj[key]['hid'] = null;
                });
            }

            var plombsObj = contModelNode.getPlombsObj();
            if (!Ext.Object.isEmpty(plombsObj)) {
                Ext.Object.each(plombsObj, function (key, value) {
                    plombsObj[key]['hid'] = null;
                });
            }

            if (this.getSaveBtn().isHidden()) {
                this.getSaveBtn().show();
            }

            if (!vagModelNode.isExpanded()) {
                vagModelNode.expand();
            }

        }
    },
    /**
     * действия перед перетаскиванием узла в дереве
     * @param node
     * @param data
     * @param overModel
     * @returns {boolean}
     */
    onBeforedropContToVag: function (node, data, overModel) {
        var rootNode = this.getTreepanel().getStore().getRootNode(),
            totalNodes = rootNode.childNodes.length;

        // изменение порядка вагонов в дереве.
        if ((overModel.get('who') === 'vag') && (data.records[0].get('who') === 'vag')) {
            var whereSrt = overModel.data['sort'],
                sortIdx = 0;
            rootNode.insertChild(whereSrt === totalNodes - 1 ? totalNodes : whereSrt, data.records[0]);
            rootNode.eachChild(function (vagNodeModel) { // write vags
                // var vagTxt=vagNodeModel.data['nvag']?vagNodeModel.data['nvag']:'';
                vagNodeModel.set('sort', sortIdx);
                vagNodeModel.set('iconCls', 'vag' + (sortIdx + 1));
                // vagNodeModel.set('text',sortIdx+1+'-'+vagTxt);
                vagNodeModel.commit();
                sortIdx++;
            }, this);
            return false;
        }

        return ((overModel.get('who') === 'vag') && (data.records[0].get('who') === 'cont') && (overModel.id !== data.records[0].parentNode.id));
    },

    setDisplayedVgCtGrFields: function (controller, docForm) {

        //проверка является ли форма документа вложеной или все компоненты находятся на формe
        docForm = docForm.title ? docForm : docForm.ownerCt;

        var vags = docForm.dataObj[docForm.getVagCollectionName()],
            vagDisplField = controller.getVagDispField();
        if (vags) {
            this.setDisplayedVagFields(controller, vags, vagDisplField);
        } else {
            vagDisplField.setValue('');
            controller.getKontDispField().setValue('');
            controller.getGruzDispField().setValue('');
        }
    },

    // генерирует отображаемые поля с вагонами
    setDisplayedVagFields: function (controller, vags, vagDisplField) {
        var vagResult = '',
            contResult = '',
            gryzResult = '',
            gryzyGngMap = new Ext.util.MixedCollection(),
            contsGryzyResult = {},
            vag,
            conts,
            contsMassa = 0,
            contDisplField = controller.getKontDispField(),
            gryzDisplField = controller.getGruzDispField(),
            vagStoreTab, grStore, kontStore, ctCount = 0, plCount = 0;
        // очищаем хранилище компонента g7vagsmgs2, если он присутствует на форме
        if (controller.getDocForm().getComponent('disp.g7v') && controller.getDocForm().getComponent('disp.g7v').xtype === 'g7vagsmgs2') {
            vagStoreTab = controller.getDocForm().getComponent('disp.g7v').getComponent('g7grid').getStore();
            vagStoreTab.removeAll();
        }
        if (controller.getDocForm().getComponent('disp.g7g') && controller.getDocForm().getComponent('disp.g7g').xtype === 'g15gruzsmgs2') {
            grStore = controller.getDocForm().getComponent('disp.g7g').getComponent('g15grid').getStore();
            grStore.removeAll();
        }
        if (controller.getDocForm().getComponent('disp.g7k') && controller.getDocForm().getComponent('disp.g7k').xtype === 'g15contsmgs2') {
            kontStore = controller.getDocForm().getComponent('disp.g7k').getComponent('g15Kgrid').getStore();
            kontStore.removeAll();
        }


        for (var vagIndx in vags) {
            vag = vags[vagIndx];

// заполнение хранилища компонента g7vagsmgs2 для отображения таблицы вагонов если оно существует
            if (vagStoreTab)
                vagStoreTab.add(
                    {
                        'hid': vag['hid'],
                        'sort': vag['sort'] + 1,
                        'nvag': vag['nvag'],
                        'rod': vag['rod'],
                        'klientName': vag['klientName'],
                        'vagOtm': vag['vagOtm'],
                        'grPod': vag['grPod'],
                        'kolOs': vag['kolOs'],
                        'taraVag': vag['taraVag']
                    }
                )
            // подсчет количества контейнеров и мест занимаемых грузом

            for (var ctIndx in vag.cimSmgsKonLists) {
                ctCount++;
                for (var grIndx in vag.cimSmgsKonLists[ctIndx].cimSmgsGruzs) {
                    if (vag.cimSmgsKonLists[ctIndx].cimSmgsGruzs[grIndx]['places']) {
                        plCount += vag.cimSmgsKonLists[ctIndx].cimSmgsGruzs[grIndx]['places'];
                    }
                }
            }

            if (vagIndx == '0' && !vags['1']) {  // only 1 vag
                vagResult = (vag['nvag'] ? '№ вагона/Wagen Nr ' + vag['nvag'] + '\n' : '');
                vagResult += (vag['grPod'] ? 'Тоннаж/Tragwagenfaeigkeith ' + vag['grPod'] + '\n' : '');
                vagResult += (vag['taraVag'] ? 'Тара/Tara ' + vag['taraVag'] + '\n' : '');
                vagResult += (vag['kolOs'] ? 'Оси/Achse ' + vag['kolOs'] + '\n' : '');
            } else {
                // vagResult += vag['nvag'] + '\n';
                vagResult = 'Siehe Nachweisung\nсм. Ведомость';
            }

            if (this.isContOtpr()) {
                conts = vag[controller.getDocForm().getContCollectionName()];
                if (conts) {
                    contsGryzyResult = this.setDisplayedContFields(controller, conts, gryzyGngMap, kontStore);
                    contResult += contsGryzyResult['contResult'];
                    contsMassa += contsGryzyResult['contsMassa'];
                }
            } else {
                var gryzy = vag[controller.getDocForm().getGryzCollectionName()];
                if (gryzy) {
                    this.groupGruzByKgvn(gryzy, gryzyGngMap);
                }
            }
        }
        // старое поле для отображения
        // vagDisplField.setValue(vagResult);
        if (contDisplField)
            contDisplField.setValue(contResult);
        controller.getDocForm().getComponent('smgs.g24N').setValue(gryzyGngMap.sum('massa'));
        controller.getDocForm().getComponent('smgs.g24T').setValue(contsMassa);
        if (controller.getDocForm().xtype === 'smgs2' || controller.getDocForm() === 'aviso2') {
            controller.getDocForm().getComponent('smgs.ctcount').setValue('КОНТЕЙНЕРОВ:\n' + ctCount);
            controller.getDocForm().getComponent('smgs.plcount').setValue('ИТОГО:\n' + plCount);
        }
        if (gryzyGngMap.getCount() > 0) {
            if (gryzyGngMap.getCount() > 1) {
                gryzResult = 'Сборный груз: Sammelgut:\n\n'/* + gryzResult*/;
            }

            gryzResult += this.setDisplayedGryzFields(controller, gryzyGngMap, vags, grStore);
            // gryzDisplField.setValue(gryzResult);
        } else {
            // gryzDisplField.setValue('');
        }
    },

    setDisplayedContFields: function (controller, conts, gryzyGngMap, kontStore) {
        var contResult = '',
            contsMassa = 0;

        for (var contIndx in conts) {
            var cont = conts[contIndx];
            if (kontStore)
                kontStore.add(
                    {
                        'hid': cont['hid'],
                        'utiN': cont['utiN'],
                        'sizeFoot': cont['sizeFoot'],
                        'taraKont': cont['taraKont'],
                        'utiType': cont['utiType'],
                        'grpod': cont['grpod']
                    }
                )

            contResult += (cont['sizeFoot'] ? '1x' + cont['sizeFoot'] : '');
            contResult += (cont['notes'] ? ' ' + cont['notes'] : '');
            contResult += (cont['utiN'] ? ' Container № ' + cont['utiN'] : '');

            contResult += (cont['sizeMm'] ? '\n(' + cont['sizeMm'] + 'mm)' : '');
            contResult += '\n';

            var contMassa = parseInt(cont['taraKont']);
            contsMassa += isNaN(contMassa) ? 0 : contMassa;

            var gryzy = cont[controller.getDocForm().getGryzCollectionName()];
            if (gryzy) {
                this.groupGruzByKgvn(gryzy, gryzyGngMap);
            }
        }

        return {
            contResult: contResult,
            contsMassa: contsMassa
        };
    },

    groupGruzByKgvn: function (gruzy, gruzMap) {
        for (var gruzIndx in gruzy) {

            var gruz = gruzy[gruzIndx],
                gruzTemp = null;
            gruzMap.each(function (gruztmp) {
                if ((gruztmp['kgvn'] === gruz['kgvn']) && (gruztmp['ekgvn'] === gruz['ekgvn']) && (gruztmp['nzgr'] === gruz['nzgr']) && (gruztmp['upak'] === gruz['upak'])) {
                    gruzTemp = gruztmp;
                }
            }, this);
            if (!gruzTemp) {
                gruzTemp = Ext.clone(gruz);
                gruzTemp['places'] = 0;
                gruzTemp['massa'] = 0;
                gruzTemp['upakGroupsRu'] = {};
                gruzTemp['upakGroupsDe'] = {};
                gruzMap.add(gruzTemp['hid'], gruzTemp);
            }
            var massa = 0;
            if (gruz['massa']) {
                massa = parseFloat(gruz['massa']);
                gruzTemp['massa'] += isNaN(massa) ? 0 : massa;
            }

            var places = 0;
            if (gruz['places']) {
                places = parseInt(gruz['places']);
                gruzTemp['places'] += isNaN(places) ? 0 : places;
            }

            var upak = (gruz['upak'] && Ext.String.trim(gruz['upak']) ? Ext.String.trim(gruz['upak']) : 'Место');
            if (!gruzTemp['upakGroupsRu'][upak]) {
                gruzTemp['upakGroupsRu'][upak] = 0;
            }
            gruzTemp['upakGroupsRu'][upak] += isNaN(places) ? 0 : places;

            upak = (gruz['upakForeign'] && Ext.String.trim(gruz['upakForeign']) ? Ext.String.trim(gruz['upakForeign']) : 'Kolli');
            if (!gruzTemp['upakGroupsDe'][upak]) {
                gruzTemp['upakGroupsDe'][upak] = 0;
            }
            gruzTemp['upakGroupsDe'][upak] += isNaN(places) ? 0 : places;


        }
//         console.log(gryzy);
//         console.log(gryzMap);
//         for(var gryzIndx in gryzy) {
//             var gryz = gryzy[gryzIndx],
//                 gruzTemp = gryz['kgvn'] ? gryzMap.get(gryz['kgvn'].trim()) : null;
//
//                 if(gruzTemp&&((gruzTemp['ekgvn']!==gryz['ekgvn'])||(gruzTemp['nzgr']!==gruz['nzgr'])||(gruzTemp['upak']!==gruz['upak'])))
//                     gruzTemp=null;
// // заполнение хранилища грузов дл яотображения в табличной форме Г15
//             if(!gruzTemp){
//                 gruzTemp = Ext.clone(gryz);
//                 gruzTemp['places'] = 0;
//                 gruzTemp['massa'] = 0;
//                 gruzTemp['upakGroupsRu'] = {};
//                 gruzTemp['upakGroupsDe'] = {};
//                 gryzMap.add(gryz['kgvn'] ? gryz['kgvn'].trim() : Ext.Number.randomInt(1, 100000), gruzTemp);
//             }
//
//             var massa = 0;
//             if(gryz['massa']){
//                 massa = parseFloat(gryz['massa']);
//                 gruzTemp['massa'] += isNaN(massa) ? 0 : massa;
//             }
//
//             var places = 0;
//             if(gryz['places']){
//                 places = parseInt(gryz['places']);
//                 gruzTemp['places'] += isNaN(places) ? 0 : places;
//             }
//
//             var upak = (gryz['upak'] && Ext.String.trim(gryz['upak']) ? Ext.String.trim(gryz['upak']) : 'Место');
//             if(!gruzTemp['upakGroupsRu'][upak]){
//                 gruzTemp['upakGroupsRu'][upak] = 0;
//             }
//             gruzTemp['upakGroupsRu'][upak] += isNaN(places) ? 0 : places;
//
//             upak = (gryz['upakForeign'] && Ext.String.trim(gryz['upakForeign']) ? Ext.String.trim(gryz['upakForeign']) : 'Kolli');
//             if(!gruzTemp['upakGroupsDe'][upak]){
//                 gruzTemp['upakGroupsDe'][upak] = 0;
//             }
//             gruzTemp['upakGroupsDe'][upak] += isNaN(places) ? 0 : places;
//
//         }
//         console.log(gryzMap);
    },

    setDisplayedGryzFields: function (controller, gryzyGngMap, vags, grStore) {

        var gryzResult = '',
            g11PrimResult = '';

        gryzyGngMap.each(function (gryz, gryzIndx) {

                if (grStore) {
                    grStore.add(
                        {
                            'hid': gryz['hid'],
                            'nzgr': (gryz['kgvn'] ? 'ГНГ- ' + gryz['kgvn'] : '') + (gryz['ekgvn'] ? ' ЕТ СНГ- ' + gryz['ekgvn'] : '') + (gryz['nzgr'] ? '<br>' + gryz['nzgr'] : '') + (gryz['nzgrEu'] ? ' ' + gryz['nzgrEu'] : ''),
                            'rod': gryz['upak'],
                            'places': gryz['places'],
                            'massa': gryz['massa'],
                            'sort': grStore.getCount()
                        }
                    )
                }
                gryzResult += (gryz['nzgr'] ? gryz['nzgr'] : '');
                gryzResult += (gryz['nzgrEu'] ? '\n' + gryz['nzgrEu'] : '');
                gryzResult += (gryz['kgvn'] ? '\nГНГ- ' + gryz['kgvn'] : '');
                gryzResult += (gryz['ekgvn'] ? '\nЕТ СНГ- ' + gryz['ekgvn'] : '');


                // gryzResult += (gryz['upak'] ? '\nУпаковка- ' + gryz['upak'] : '');
                gryzResult += '\n';
                var delim = '',
                    upak;
                for (upak in gryz['upakGroupsDe']) {
                    gryzResult += delim;
                    delim = ', ';
                    gryzResult += (gryz['upakGroupsDe'][upak] + ' - ' + upak);
                }
                gryzResult += ' / ';
                delim = '';
                for (upak in gryz['upakGroupsRu']) {
                    gryzResult += delim;
                    delim = ', ';
                    gryzResult += (gryz['upakGroupsRu'][upak] + ' - ' + upak);
                }

                //   gryzResult += (gryz['places'] ? '\nМеста- ' + gryz['places'] : '');
                gryzResult += (gryz['massa'] ? '\nМасса- ' + gryz['massa'].toFixed(3) + 'кг\n\n' : '');

                if (!g11PrimResult && gryz['ohr']) {
                    g11PrimResult = '';

                    var g11PrimDisplField = controller.getDocForm().getComponent('smgs.g11_prim');
                    if (!g11PrimDisplField.getValue()) {     // empty
                        g11PrimDisplField.setValue(g11PrimResult);
                    } else {
                        var re = new RegExp(g11PrimResult, 'gi');
                        if (g11PrimDisplField.getValue().search(re) == -1) {
                            g11PrimDisplField.setValue(g11PrimDisplField.getValue() + ' ' + g11PrimResult);
                        }
                    }
                }

                if (!this.isGroupContOtpr(controller, vags)) {
                    var danGryzy = gryz[controller.getDocForm().getDanGryzCollectionName()];
                    if (danGryzy) {
                        for (var danGryzIndx in danGryzy) {
                            var danGryz = danGryzy[danGryzIndx];
                            gryzResult += '\n';
                            gryzResult += (danGryz['codDanger'] ? danGryz['codDanger'] : '');
                            gryzResult += (danGryz['numOon'] ? '/UN' + danGryz['numOon'] : '');
                            gryzResult += (danGryz['carDName'] ? ' ' + danGryz['carDName'] : '');
                            gryzResult += (danGryz['clazz'] ? ' ' + danGryz['clazz'] : '');
                            gryzResult += (danGryz['dangSign'] ? ' (' + danGryz['dangSign'] + ')' : '');
                            gryzResult += (danGryz['groupPack'] ? ', ' + danGryz['groupPack'] : '');
                            gryzResult += (danGryz['emergenC'] ? ', AK-' + danGryz['emergenC'] : '');
                            gryzResult += (danGryz['stampDName'] ? ', ' + danGryz['stampDName'] : '');
                            gryzResult += (danGryz['dopInfo'] ? ' - ' + danGryz['dopInfo'] : '');
                            gryzResult += '\n';

                            gryzResult += (danGryz['codDanger'] ? danGryz['codDanger'] : '');
                            gryzResult += (danGryz['numOon'] ? '/UN' + danGryz['numOon'] : '');
                            gryzResult += (danGryz['carDNameDe'] ? ' ' + danGryz['carDNameDe'] : '');
                            gryzResult += (danGryz['clazz'] ? ' ' + danGryz['clazz'] : '');
                            gryzResult += (danGryz['dangSign'] ? ' (' + danGryz['dangSign'] + ')' : '');
                            gryzResult += (danGryz['groupPack'] ? ', ' + danGryz['groupPack'] : '');
                            gryzResult += (danGryz['dopInfo'] ? ' - ' + danGryz['dopInfo'] : '');
                            gryzResult += '\n';
                        }
                    }
                }
            },
            this
        );

        return gryzResult;
    }
});
