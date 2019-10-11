Ext.define('TK.controller.ky2.PoezdVgCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.PoezdVgCtGrTreeForm',
        'ky2.poezd.into.PoezdVgCtGrTreeForm',
        'ky2.poezd.out.PoezdVgCtGrTreeForm',
        'nsi.EditList',
        'nsi.List'

    ],
    models: [
        'ky2.PoezdVgCtGrTreeNode'
    ],
    stores: [
        'ky2.PoezdVgCtGrTreeNodes'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'ky2treeform',
        selector: 'viewport > tabpanel ky2treeform'
    }, {
        ref: 'treepanel',
        selector: 'ky2vgctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2vgctgrtreeform > tabpanel'
    }, {
        ref: 'addVagBtn',
        selector: 'ky2vgctgrtreeform button[action=addVag]'
    }, {
        ref: 'addContBtn',
        selector: 'ky2vgctgrtreeform button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'ky2vgctgrtreeform button[action=addGryz]'
    }, {
        ref: 'addPlombBtn',
        selector: 'ky2vgctgrtreeform button[action=addPlomb]'
    }, {
        ref: 'delBtn',
        selector: 'ky2vgctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2vgctgrtreeform button[action=save]'
    }, {
        ref: 'saveExitBtn',
        selector: 'ky2vgctgrtreeform button[action=saveExit]'
    }, {
        ref: 'closeBtn',
        selector: 'ky2vgctgrtreeform button[action=close]'
    }, {
        ref: 'vagpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #vag'
    }, {
        ref: 'contpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #gryz'
    }, {
        ref: 'plombpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #plomb'
    }],
    init: function () {
        this.control({
            'ky2vgctgrtreeform': {
                beforedestroy: this.clearVgCtGrForm
            },
            'ky2poezdintolist button[action="editVgCtGr"]': {
                click: this.editVgCtGrInto
            },
            'ky2poezdoutlist button[action="editVgCtGr"]': {
                click: this.editVgCtGrOut
            },
            'ky2vgctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'ky2vgctgrtreeform button[action=addVag]': {
                click: this.onAddVagClick
            },
            'ky2vgctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2vgctgrtreeform button[action=addPlomb]': {
                click: this.onAddPlombClick
            },
            'ky2vgctgrtreeform button[action=addCont]': {
                click: this.onAddContClick
            },
            'ky2vgctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2vgctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2vgctgrtreeform button[action=saveExit]': {
                click: this.onSaveExit
            },
            'ky2vgctgrtreeform > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            },
            // 'ky2vgctgrtreeform > tabpanel > #cont > numberfield': {
            //     blur: this.onGrBruttoUpdateData
            // },
            'ky2vgctgrtreeform button[action=hideVags]': {
                click: this.onHideVagsLeft
            },
            'ky2vgctgrtreeform button[action=showVags]': {
                click: this.onShowVagsLeft
            },
            'ky2vgctgrtreeform button[action=expandConts]': {
                click: this.onExpandConts
            },
            'ky2vgctgrtreeform button[action=collapseConts]': {
                click: this.onCollapseConts
            },
            'ky2vgctgrtreeform button[action="nsiOtpr"]': {
                click: this.onShowNsiOtpr
            }
        });
    },

    editVgCtGrInto: function (btn) {
        this.editVgCtGrCheck('ky2vgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrOut: function (btn) {
        this.editVgCtGrCheck('ky2vgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrCheck: function (xtype, modelClsName) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        this.editVgCtGr(xtype, modelClsName, poezdlist.getSelectionModel().getLastSelected().get('hid'), 'ky2/secure/PoezdVgCtGr.do', 'poezd');
    },

    editVgCtGr: function (xtype, modelClsName, poezdHid, url, widget) {
        url = url || 'ky2/secure/PoezdVgCtGr.do';
        modelClsName = modelClsName || 'TK.model.ky2.PoezdVgCtGrTreeNode';
        Ext.Ajax.request({
            url: url,
            params: {hid: poezdHid, action: 'edit'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                var poezdObj = respObj['rows'][0];

                var vagoncontainer = Ext.widget(xtype, {title: this.titleTree});
                var treepanel = vagoncontainer.down('treepanel');
                var vagpanel = vagoncontainer.down('tabpanel > #vag');
                var contpanel = vagoncontainer.down('tabpanel > #cont');
                var gryzpanel = vagoncontainer.down('tabpanel > #gryz');
                var plombpanel = vagoncontainer.down('tabpanel > #plomb');
                this.initPoezdToButtons(vagoncontainer, poezdObj['direction'], widget);
                //// fill tree
                treepanel.setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(""));
                var vags = poezdObj['vagons'];
                var rootNode = treepanel.getStore().getRootNode();
                // rootNode.removeAll();
                rootNode.set('hid', poezdObj['hid']);
                rootNode.set('dprbDate', poezdObj['dprbDate']);
                rootNode.set('dprbTime', poezdObj['dprbTime']);
                rootNode.set('dotpDate', poezdObj['dotpDate']);
                rootNode.set('dotpTime', poezdObj['dotpTime']);
                rootNode.set('direction', poezdObj['direction']);
                rootNode.set('gruzotpr', poezdObj['gruzotpr']);
                rootNode.set('clientHid', poezdObj['clientHid']);
                // vagoncontainer.setPoezdId(poezdObj['hid']);

                if (vags && !Ext.Object.isEmpty(vags)) {
                    this.initVagsNodes(vags, rootNode, modelClsName, vagpanel, contpanel, gryzpanel, plombpanel, poezdObj['direction'], (widget === 'zayav' ? 'yardReturnNkon' : ''));
                    // rootNode.expand();
                }
                /// END fill tree
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().add(vagoncontainer);

            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    initPoezdToButtons: function (vagoncontainer, direction, widget) {
        if (widget === 'poezd') {
            if (direction === 1)
                vagoncontainer.down('#showPoezdsOutDir4PoezdIntoBind').show();
            else if (direction === 2)
                vagoncontainer.down('#showPoezdsIntoDir4PoezdOutBind').show();
            vagoncontainer.down('#showPoezd4YardOutBind').show();
            vagoncontainer.down('#editPoezd').show();
        } else if (widget === 'zayav') {
            vagoncontainer.down('#editZajav').show();
        }
    },

    initVagsNodes: function (vags, rootNode, modelClsName, vagpanel, contpanel, gryzpanel, plombpanel, direction, contCls) {
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'],
                vagModel = Ext.create(modelClsName, {
                    // text: this.getController('ky2.BindPoezdAndPoezdController').vagNodeText(vag),
                    who: 'vag',
                    leaf: false,
                    iconCls: 'vag',
                    expanded: true
                });

            vagpanel.items.each(function (vagItem, index, length) {
                if (vagItem.isXType('field')) {
                    vagModel.set(vagItem.getName(), vag[vagItem.getName()]);
                } else if (vagItem.isXType('fieldcontainer')) {
                    vagItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            vagModel.set(item.getName(), vag[item.getName()]);
                        }
                    });
                }
            });

            vagModel.set('text', this.getController('ky2.BindPoezdAndPoezdController').vagNodeText(vagModel));
            rootNode.appendChild(vagModel);

            if (vag['otpravka'] === 'CONT') {
                if (conts && !Ext.Object.isEmpty(conts)) {
                    this.initContsNodes(conts, vagIndx, vagModel, modelClsName, contpanel, gryzpanel, plombpanel, direction, contCls);
                }
            } else if (vag['otpravka'] === 'GRUZ') {
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyNodes(gruzy, vagModel, vagIndx, modelClsName, gryzpanel);
                }
            }
        }
    },

    initContsNodes: function (conts, vagIndx, vagModel, modelClsName, contpanel, gryzpanel, plombpanel, direction, contCls) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                plombs = cont['plombs'],
                contModel = Ext.create(modelClsName, {
                    // text: this.getController('ky2.BindPoezdAndPoezdController').contNodeText(cont),
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true/*,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0*/
                });
            if ((direction === 1 && cont['isUnloading'] === 1) ||
                (direction === 2 && cont['isLoading'] === 1))
                contModel.set('cls', contCls);

            contpanel.items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contModel.set(contItem.getName(), cont[contItem.getName()]);
                } else if (contItem.isXType('fieldcontainer') || contItem.isXType('fieldset')) {
                    contItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            contModel.set(item.getName(), cont[item.getName()]);
                        }
                    });
                }
            });

            contModel.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(contModel));
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx, modelClsName, gryzpanel);
            }
            if (plombs && !Ext.Object.isEmpty(plombs)) {
                this.initPlombsNodes(plombs, contModel, contIndx, modelClsName, plombpanel);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, parentIndx, modelClsName, gryzpanel) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create(modelClsName, {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf: true,
                    expanded: false
                });

            gryzpanel.items.each(function (gruzItem, index, length) {
                if (gruzItem.isXType('field')) {
                    gryzModel.set(gruzItem.getName(), gryz[gruzItem.getName()]);
                } else if (gruzItem.isXType('fieldcontainer')) {
                    gruzItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            gryzModel.set(item.getName(), gryz[item.getName()]);
                        }
                    });
                }
            });
            parentModel.appendChild(gryzModel);
        }
    },

    initPlombsNodes: function (plombs, parentModel, parentIndx, modelClsName, plombpanel) {
        for (var plombIndx in plombs) {
            var plomb = plombs[plombIndx],
                plombModel = Ext.create(modelClsName, {
                    text: plomb['znak'],
                    who: 'plomb',
                    iconCls: 'doc_new',
                    leaf: true,
                    expanded: false
                });

            plombpanel.items.each(function (plombItem, index, length) {
                if (plombItem.isXType('field')) {
                    plombModel.set(plombItem.getName(), plomb[plombItem.getName()]);
                } else if (plombItem.isXType('fieldcontainer')) {
                    plombItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            plombModel.set(item.getName(), plomb[item.getName()]);
                        }
                    });
                }
            });
            parentModel.appendChild(plombModel);
        }
    },

    onTreeNodeClick: function (treepanel, record, item, index) {
        this.treeNodeClick(this.getTabpanel(), this.getSaveBtn(), this.getSaveExitBtn(), this.getDelBtn(), this.getAddPlombBtn(), this.getAddGryzBtn(), this.getAddContBtn(), record);
    },

    treeNodeClick: function (tabpanel, saveBtn, saveExitBtn, delBtn, addPlombBtn, addGryzBtn, addContBtn, record) {
        var tabBar = tabpanel.getTabBar();
        if (tabBar.isHidden()) {
            tabBar.show();
        }

        var oldTab = tabpanel.getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if (oldTab.getItemId() !== newTabItemId) { // new tab
            tabpanel.items.each(function (tab) {
                if (tab.getItemId() === newTabItemId) {
                    newTab = tab;
                    return false;
                }
            });

            tabpanel.setActiveTab(newTab);
            tabpanel.items.first().tab.setText(newTab.title); // workaround to fix title bug
            oldTab.hide();
        }
        newTab.loadRecord(record);

        // change buttons visibillity
        if (saveBtn.isHidden()) {
            saveBtn.show();
            saveExitBtn.show();
        }
        if (delBtn.isHidden()) {
            delBtn.show();
        }

        switch (newTabItemId) {
            case 'plomb':
                if (addPlombBtn.isVisible()) {
                    addPlombBtn.hide();
                }

                break;
            case 'gryz':
                if (record.parentNode.get('who') === 'vag') {
                    if (addGryzBtn.isHidden()) {
                        addGryzBtn.show();
                    }
                    if (addContBtn.isVisible()) {
                        addContBtn.hide();
                    }
                } else {    // cont
                    if (addGryzBtn.isHidden()) {
                        addGryzBtn.show();
                    }
                    if (addContBtn.isHidden()) {
                        addContBtn.show();
                    }
                }
                if (addPlombBtn.isVisible()) {
                    addPlombBtn.hide();
                }

                break;
            case 'cont':
                if (addContBtn.isHidden()) {
                    addContBtn.show();
                }
                if (addGryzBtn.isHidden()) {
                    addGryzBtn.show();
                }
                if (addPlombBtn.isHidden()) {
                    addPlombBtn.show();
                }

                break;
            case 'vag':
                if (record.get('otpravka') === 'CONT') {
                    if (addGryzBtn.isVisible()) {
                        addGryzBtn.hide();
                    }
                    if (addContBtn.isHidden()) {
                        addContBtn.show();
                    }
                    if (addPlombBtn.isVisible()) {
                        addPlombBtn.hide();
                    }

                } else if (record.get('otpravka') === 'GRUZ') {
                    if (addGryzBtn.isHidden()) {
                        addGryzBtn.show();
                    }
                    if (addContBtn.isVisible()) {
                        addContBtn.hide();
                    }
                    if (addPlombBtn.isVisible()) {
                        addPlombBtn.hide();
                    }
                } else {
                    if (addGryzBtn.isHidden()) {
                        addGryzBtn.show();
                    }
                    if (addContBtn.isHidden()) {
                        addContBtn.show();
                    }
                    if (addPlombBtn.isVisible()) {
                        addPlombBtn.hide();
                    }
                }

                break;
        }
    },

    addVgCtGr: function (parentModelNode, who, iconCls, model, treepanel) {
        var sort = parentModelNode.childNodes.filter(function (node) {
            return node.get('who') === who;
        }).length;
        model = model || 'TK.model.ky2.PoezdVgCtGrTreeNode';
        treepanel = treepanel || this.getTreepanel();

        var childModelNode = parentModelNode.appendChild(
            Ext.create(model, {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who,
                sort: sort
                // dprb: parentModelNode.get('dprb')
            })
        );

        if (who === 'vag') {
            this.setVagDefaultProps(childModelNode, treepanel);
        } else if (who === 'cont') {
            this.setContDefaultProps(childModelNode, treepanel);
        }

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        treepanel.getSelectionModel().select(childModelNode);
        treepanel.fireEvent('itemclick', treepanel, childModelNode);
    },

    setVagDefaultProps: function (vagNodeModel, treepanel) {
        vagNodeModel.set('line', vagNodeModel.previousSibling ? vagNodeModel.previousSibling.get('line') : null);
        vagNodeModel.set('dprb', treepanel.getRootNode().get('dprb'));
    },

    setContDefaultProps: function (contNodeModel, treepanel) {
        var rootNode = treepanel.getRootNode();
        contNodeModel.set('dprbDate', rootNode.get('dprbDate'));
        contNodeModel.set('dprbTime', rootNode.get('dprbTime'));
        contNodeModel.set('dotpDate', rootNode.get('dotpDate'));
        contNodeModel.set('dotpTime', rootNode.get('dotpTime'));
        contNodeModel.set('gruzotpr', rootNode.get('gruzotpr'));
        contNodeModel.set('clientHid', rootNode.get('clientHid'));
    },

    onAddVagClick: function (btn) {
        this.addVagClick(this.getTreepanel().getRootNode(), 'TK.model.ky2.PoezdVgCtGrTreeNode', this.getTreepanel());
    },

    addVagClick: function (rootNode, model, treepanel) {
        this.addVgCtGr(rootNode, 'vag', 'vag', model, treepanel);
    },

    onAddContClick: function (btn) {
        this.addContClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    addContClick: function (treepanel, model) {
        var selectedModelNode = treepanel.getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                parentModelNode.set('otpravka', 'CONT');
                break;
            case 'cont':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode.parentNode; // gruz pod cont
                if (parentModelNode.getId() === 'root') {
                    parentModelNode = selectedModelNode.parentNode; // gruz pod vagonom
                }
                break;
        }

        this.addVgCtGr(parentModelNode, 'cont', 'cont3', model, treepanel);
    },

    onAddGryzClick: function (btn) {
        this.addGryzClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    addGryzClick: function (treepanel, model) {
        var selectedModelNode = treepanel.getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                parentModelNode.set('otpravka', 'GRUZ');
                break;
            case 'cont':
                parentModelNode = selectedModelNode;
                break;
            case 'gryz':
            case 'plomb':
                parentModelNode = selectedModelNode.parentNode;
                break;
        }
        this.addVgCtGr(parentModelNode, 'gryz', 'gryz', model, treepanel);
    },

    onAddPlombClick: function (btn) {
        this.addPlombClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    addPlombClick: function (treepanel, model) {
        var selectedModelNode = treepanel.getSelectionModel().getLastSelected();
        this.addVgCtGr(selectedModelNode, 'plomb', 'doc_new', model, treepanel);
    },

    onDelClick: function (btn) {
        this.delClick(this.getTreepanel(), this.getDelBtn(), this.getAddContBtn(), this.getAddGryzBtn(), this.getAddPlombBtn());
    },

    delClick: function (treepanel, delBtn, addContBtn, addGryzBtn, addPlombBtn) {
        var selectedModelNode = treepanel.getSelectionModel().getLastSelected(),
            parentModelNode = selectedModelNode.parentNode,
            whoSelected = selectedModelNode.get('who');

        selectedModelNode.remove(true, true);

        if (whoSelected === 'gryz' && parentModelNode.get('who') === 'cont')
            this.massaRecount(parentModelNode);
        delBtn.hide();
        addContBtn.hide();
        addGryzBtn.hide();
        addPlombBtn.hide();

        if (parentModelNode && !parentModelNode.hasChildNodes()) {
            parentModelNode.set('leaf', true);
            if (parentModelNode.get('who') === 'vag') {
                parentModelNode.set('otpravka', undefined);
            }
        }

        var index = 0;
        parentModelNode.eachChild(function (childNodeModel) { // resort
            childNodeModel.set('sort', index);
            index++;
        });
    },

    clearVgCtGrForm: function () {
        var rootNode = this.getTreepanel().getRootNode();
        rootNode.removeAll();
        // rootNode.collapse(); // to avois second autoload
    },

    onVgCtGrFormUpdateData: function (field) {
        this.vgCtGrFormUpdateData(field, this.getTreepanel());
    },

    vgCtGrFormUpdateData: function (field, treepanel) {
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue(),
            selectedNode = treepanel.getSelectionModel().getLastSelected(),
            parentOfSelected = selectedNode.parentNode;

        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (
                field.getName() === 'kgvn'
                // || field.getName() === 'nkon'
                || field.getName() === 'znak'
            // || field.getName() === 'nvag'
            ) {
                rec.set('text', newVal);
            } else if (field.getName() === 'massa' && parentOfSelected.get('who') === 'cont') {
                this.massaRecount(parentOfSelected);
            } else if (field.getName() === 'massa_brutto' && selectedNode.get('who') === 'cont') {
                this.massaGryzRecount(selectedNode, newVal);
            } else if (field.getName() === 'massa_tar' || field.getName() === 'massa_brutto') {
                rec.set('massa_brutto_all', rec.get('massa_tar') + rec.get('massa_brutto'));
                field.up('form').down('#massa_brutto_all').setValue(rec.get('massa_brutto_all'));
            }

            if (rec.get('who') === 'vag') {
                rec.set('text', this.getController('ky2.BindPoezdAndPoezdController').vagNodeText(rec));
            } else if (rec.get('who') === 'cont') {
                rec.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(rec));
            }

        }
    },

    massaRecount: function (parentOfSelected) {
        var total = 0;
        parentOfSelected.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'gryz')
                total += nodeModel.get('massa');
        });
        parentOfSelected.set('massa_brutto', total);
        parentOfSelected.set('massa_brutto_all', total + parentOfSelected.get('massa_tar'))
    },

    massaGryzRecount: function (selectedNode, newVal) {
        var totalGryzNodes = 0,
            gryzNode;
        selectedNode.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'gryz') {
                totalGryzNodes++;
                gryzNode = nodeModel;
            }
        });
        if (totalGryzNodes === 1) {
            gryzNode.set('massa', newVal);
        }
    },


    onSaveExit: function () {
        this.onSaveClick(1);
    },

    onSaveClick: function (btn) {
        this.saveClick(this.getTreepanel(), 'ky2/secure/PoezdVgCtGr.do', this.getCloseBtn(), btn, this.getVagpanel(), this.getContpanel(), this.getGryzpanel(), this.getPlombpanel());
    },

    saveClick: function (treepanel, url, closeBtn, btn, vagpanel, contpanel, gryzpanel, plombpanel) {
        treepanel = treepanel || this.getTreepanel();
        url = url || 'ky2/secure/PoezdVgCtGr.do';
        closeBtn = closeBtn || this.getCloseBtn();
        vagpanel = vagpanel || this.getVagpanel();
        contpanel = contpanel || this.getContpanel();
        gryzpanel = gryzpanel || this.getGryzpanel();
        plombpanel = plombpanel || this.getPlombpanel();
        var dataObj = {hid: treepanel.getRootNode().get('hid')};

        if (treepanel.getRootNode().hasChildNodes()) {
            dataObj = this.saveVags(dataObj, vagpanel, contpanel, gryzpanel, plombpanel, treepanel);
        }

        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode(dataObj), action: 'save'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                if (Ext.isNumber(btn)) {
                    closeBtn.fireEvent('click', closeBtn);
                } else {
                    var respObj = Ext.decode(response.responseText);
                    var poezdObj = respObj['rows'][0];
                    var rootNode = treepanel.getStore().getRootNode();
                    var vags = poezdObj['vagons'];
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        this.initVagsHids(vags, rootNode);
                    }
                }
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    initVagsHids: function (vags, rootNode) {
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'];

            var vagNode = rootNode.findChild('sort', vagIndx);
            if (vagNode) {
                vagNode.set('hid', vag['hid']);
                if (vag['otpravka'] === 'CONT') {
                    if (conts && !Ext.Object.isEmpty(conts)) {
                        this.initContsHids(conts, vagNode);
                    }
                } else if (vag['otpravka'] === 'GRUZ') {
                    if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                        this.initGryzyHids(gruzy, vagNode);
                    }
                }
            }
        }
    },

    initContsHids: function (conts, vagNode) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gruzy = cont['gruzs'],
                plombs = cont['plombs'];

            var contNode = vagNode.findChild('sort', contIndx);
            if (contNode) {
                contNode.set('hid', cont['hid']);
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyHids(gruzy, contNode);
                }
                if (plombs && !Ext.Object.isEmpty(plombs)) {
                    this.initPlombsHids(plombs, contNode);
                }

            }
        }
    },

    initGryzyHids: function (gruzy, parentNode) {
        for (var gruzIndx in gruzy) {
            var gruz = gruzy[gruzIndx];
            parentNode.cascadeBy(function (nodeModel) {
                if (nodeModel.get('who') === 'gryz' && nodeModel.get('sort') === gruzIndx) {
                    nodeModel.set('hid', gruz['hid']);
                }
            }, this);

            // var gruzNode = parentNode.findChild('sort', gruzIndx);
            // if (gruzNode) {
            //     gruzNode.set('hid', gruz['hid']);
            // }
        }
    },

    initPlombsHids: function (plombs, parentNode) {
        for (var plombIndx in plombs) {
            var plomb = plombs[plombIndx];
            parentNode.cascadeBy(function (nodeModel) {
                if (nodeModel.get('who') === 'plomb' && nodeModel.get('sort') === plombIndx) {
                    nodeModel.set('hid', plomb['hid']);
                }
            }, this);
            // var plombNode = parentNode.findChild('sort', plombIndx);
            // if (plombNode) {
            //     plombNode.set('hid', plomb['hid']);
            // }
        }
    },

    saveVags: function (dataObj, vagpanel, contpanel, gryzpanel, plombpanel, treepanel) {
        var vagIndex = 0;

        dataObj['vagons'] = [];

        treepanel.getRootNode().eachChild(function (vagNodeModel) { // write vags

            var vagDataObj = {};
            vagpanel.items.each(function (vagItem, index, length) {
                if (vagItem.isXType('field')) {
                    vagDataObj[vagItem.getName()] = vagNodeModel.get(vagItem.getName());
                } else if (vagItem.isXType('fieldcontainer')) {
                    vagItem.items.each(function (item) {
                        if (item.isXType('field')) {
                            vagDataObj[item.getName()] = vagNodeModel.get(item.getName());
                        }
                    }, this);
                }
            }, this);
            // vagDataObj['sort'] = vagIndex;
            dataObj['vagons'].push(vagDataObj);

            if (vagNodeModel.hasChildNodes()) {
                // var childNodeModel = vagNodeModel.getChildAt(0);
                if (vagNodeModel.get('otpravka') === 'CONT') {
                    this.saveConts(vagNodeModel, vagDataObj, contpanel, gryzpanel, plombpanel);
                } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
                    this.saveGryzy(vagNodeModel, vagDataObj, gryzpanel);
                }
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    saveConts: function (vagNodeModel, vagDataObj, contpanel, gryzpanel, plombpanel) {
        var contIndex = 0;
        vagDataObj['konts'] = [];

        vagNodeModel.eachChild(function (contNodeModel) {  // write conts
            var contDataObj = {};

            contpanel.items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contDataObj[contItem.getName()] = contNodeModel.get(contItem.getName());
                } else if (contItem.isXType('fieldcontainer') || contItem.isXType('fieldset')) {
                    contItem.items.each(function (item) {
                        if (item.isXType('field')) {
                            contDataObj[item.getName()] = contNodeModel.get(item.getName());
                        }
                    }, this);
                }
            }, this);
            // contDataObj['sort'] = contIndex;
            vagDataObj['konts'].push(contDataObj);

            if (contNodeModel.hasChildNodes()) {
                this.saveGryzy(contNodeModel, contDataObj, gryzpanel);
                this.savePlombs(contNodeModel, contDataObj, plombpanel);
            }

            contIndex++;
        }, this);
    },

    saveGryzy: function (nodeModel, dataObj, gryzpanel) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'gryz') {
                var gruzDataObj = {};
                gryzpanel.items.each(function (gryzItem, index, length) {
                    if (gryzItem.isXType('field')) {
                        gruzDataObj[gryzItem.getName()] = nodeModel.get(gryzItem.getName());
                    } else if (gryzItem.isXType('fieldcontainer')) {
                        gryzItem.items.each(function (item) {
                            if (item.isXType('field')) {
                                gruzDataObj[item.getName()] = nodeModel.get(item.getName());
                            }
                        }, this);
                    }
                }, this);
                // gruzDataObj['sort'] = gryzIndex;
                dataObj['gruzs'].push(gruzDataObj);

                gryzIndex++;
            }
        }, this);
    },

    savePlombs: function (nodeModel, dataObj, plombpanel) {
        dataObj['plombs'] = [];
        nodeModel.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'plomb') {
                var plombDataObj = {};
                plombpanel.items.each(function (plombItem) {
                    if (plombItem.isXType('field')) {
                        plombDataObj[plombItem.getName()] = nodeModel.get(plombItem.getName());
                    } else if (plombItem.isXType('fieldcontainer')) {
                        plombItem.items.each(function (item) {
                            if (item.isXType('field')) {
                                plombDataObj[item.getName()] = nodeModel.get(item.getName());
                            }
                        }, this);
                    }
                }, this);
                dataObj['plombs'].push(plombDataObj);
            }
        }, this);
    },

    onHideVagsLeft: function (btn) {
        this.hideVagsLeft(this.getTreepanel());
    },

    hideVagsLeft: function (treepanel) {
        treepanel.getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag') {
                vagNodeModel.set('cls', 'hideTreeNode');
            }
        }, this);
    },

    onShowVagsLeft: function (btn) {
        this.showVagsLeft(this.getTreepanel());
    },

    showVagsLeft: function (treepanel) {
        treepanel.getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag') {
                vagNodeModel.set('cls', 'showTreeNode');
            }
        }, this);
    },

    onExpandConts: function (btn) {
        this.expandConts(this.getTreepanel());
    },

    expandConts: function (treepanel) {
        treepanel.getRootNode().cascadeBy(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'cont' && !vagNodeModel.isExpanded() && vagNodeModel.isExpandable()) {
                vagNodeModel.expand();
            }
        }, this);
    },

    onCollapseConts: function (btn) {
        this.collapseConts(this.getTreepanel());
    },

    collapseConts: function (treepanel) {
        treepanel.getRootNode().cascadeBy(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'cont' && vagNodeModel.isExpanded()) {
                vagNodeModel.collapse();
            }
        }, this);
    },

    onShowNsiOtpr: function(btn) {
        this.showNsiOtpr(this.getContpanel().getForm());
    },

    showNsiOtpr: function (form) {
        var gruzotpr = form.findField('gruzotpr');
        var nsiGrid = this.getController('Nsi').nsiKyClient(gruzotpr ? gruzotpr.getValue() : null).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, form);
    },

    selectClient: function (view, record) {
        var data = record.data;
        this.findField('gruzotpr').setValue(data['sname']);
        this.findField('clientHid').setValue(data['hid']);
        var model = this.getRecord();
        model.set('gruzotpr', data['sname']);
        model.set('clientHid', data['hid']);
        view.up('window').close();
    }
});
