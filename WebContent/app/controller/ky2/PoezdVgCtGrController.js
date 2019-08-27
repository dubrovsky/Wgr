Ext.define('TK.controller.ky2.PoezdVgCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.PoezdVgCtGrTreeForm',
        'ky2.poezd.into.PoezdVgCtGrTreeForm',
        'ky2.poezd.out.PoezdVgCtGrTreeForm'

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
            'ky2vgctgrtreeform > tabpanel > #cont > numberfield': {
                blur: this.onGrBruttoUpdateData
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
        this.editVgCtGr(xtype, modelClsName, poezdlist.getSelectionModel().getLastSelected().get('hid'));
    },

    editVgCtGr: function (xtype, modelClsName, poezdHid) {
        // var poezdlist = this.getPoezdlist();
        // if (!TK.Utils.isRowSelected(poezdlist)) {
        //     return false;
        // }

        var url = 'ky2/secure/PoezdVgCtGr.do';

        Ext.Ajax.request({
            url: url,
            params: {hid: poezdHid, action: 'edit'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                var poezdObj = respObj['rows'][0];

                var vagoncontainer = Ext.widget(xtype, {title: this.titleTree + poezdObj['nppr']});
                this.initPoezdToButtons(vagoncontainer, poezdObj['direction']);
                //// fill tree
                var vags = poezdObj['vagons'];
                var rootNode = this.getTreepanel().getStore().getRootNode();
                // rootNode.removeAll();
                rootNode.set('hid', poezdObj['hid']);
                rootNode.set('dprb', poezdObj['dprb']);
                rootNode.set('direction', poezdObj['direction']);
                // vagoncontainer.setPoezdId(poezdObj['hid']);

                if (vags && !Ext.Object.isEmpty(vags)) {
                    this.initVagsNodes(vags, rootNode);
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

    initPoezdToButtons: function(vagoncontainer, direction) {
        if (direction === 1)
            vagoncontainer.down('#showPoezdsOutDir4PoezdIntoBind').show();
        else if (direction === 2)
            vagoncontainer.down('#showPoezdsIntoDir4PoezdOutBind').show();
    },

    initVagsNodes: function (vags, rootNode) {
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'],
                vagModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: vag['nvag'],
                    who: 'vag',
                    leaf: false,
                    iconCls: 'vag',
                    expanded: true
                });

            this.getVagpanel().items.each(function (vagItem, index, length) {
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

            rootNode.appendChild(vagModel);

            if (vag['otpravka'] === 'CONT') {
                if (conts && !Ext.Object.isEmpty(conts)) {
                    this.initContsNodes(conts, vagIndx, vagModel);
                }
            } else if (vag['otpravka'] === 'GRUZ') {
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyNodes(gruzy, vagModel, vagIndx);
                }
            }
        }
    },

    initContsNodes: function (conts, vagIndx, vagModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                plombs = cont['plombs'],
                contModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true/*,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0*/
                });

            this.getContpanel().items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contModel.set(contItem.getName(), cont[contItem.getName()]);
                } else if (contItem.isXType('fieldcontainer')) {
                    contItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            contModel.set(item.getName(), cont[item.getName()]);
                        }
                    });
                }
            });
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx);
            }
            if (plombs && !Ext.Object.isEmpty(plombs)) {
                this.initPlombsNodes(plombs, contModel, contIndx);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, parentIndx) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf: true,
                    expanded: false
                });

            this.getGryzpanel().items.each(function (gruzItem, index, length) {
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

    initPlombsNodes: function (plombs, parentModel, parentIndx) {
        for (var plombIndx in plombs) {
            var plomb = plombs[plombIndx],
                plombModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: plomb['znak'],
                    who: 'plomb',
                    iconCls: 'doc_new',
                    leaf: true,
                    expanded: false
                });

            this.getPlombpanel().items.each(function (plombItem, index, length) {
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
        var tabBar = this.getTabpanel().getTabBar();
        if (tabBar.isHidden()) {
            tabBar.show();
        }

        var oldTab = this.getTabpanel().getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if (oldTab.getItemId() !== newTabItemId) { // new tab
            this.getTabpanel().items.each(function (tab) {
                if (tab.getItemId() === newTabItemId) {
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
            this.getSaveExitBtn().show();
        }
        if (this.getDelBtn().isHidden()) {
            this.getDelBtn().show();
        }

        switch (newTabItemId) {
            case 'plomb':
                if (this.getAddPlombBtn().isVisible()) {
                    this.getAddPlombBtn().hide();
                }

                break;
            case 'gryz':
                if (record.parentNode.get('who') === 'vag') {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isVisible()) {
                        this.getAddContBtn().hide();
                    }
                } else {    // cont
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                }
                if (this.getAddPlombBtn().isVisible()) {
                    this.getAddPlombBtn().hide();
                }

                break;
            case 'cont':
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.getAddPlombBtn().isHidden()) {
                    this.getAddPlombBtn().show();
                }

                break;
            case 'vag':
                if (record.get('otpravka') === 'CONT') {
                    if (this.getAddGryzBtn().isVisible()) {
                        this.getAddGryzBtn().hide();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                    if (this.getAddPlombBtn().isVisible()) {
                        this.getAddPlombBtn().hide();
                    }

                } else if (record.get('otpravka') === 'GRUZ') {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isVisible()) {
                        this.getAddContBtn().hide();
                    }
                    if (this.getAddPlombBtn().isVisible()) {
                        this.getAddPlombBtn().hide();
                    }
                } else {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                    if (this.getAddPlombBtn().isVisible()) {
                        this.getAddPlombBtn().hide();
                    }
                }

                break;
        }
    },

    onAddVagClick: function (btn) {
        this.addVgCtGr(this.getTreepanel().getRootNode(), 'vag');
    },

    addVgCtGr: function (parentModelNode, who, iconCls) { // add sort prop
        var sort = parentModelNode.childNodes.filter(function (node) {
           return node.get('who') === who;
        }).length;
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who,
                sort: sort,
                dprb: parentModelNode.get('dprb')
            })
        );

        if(who === 'vag'){
            this.setVagDefaultProps(childModelNode);
        }

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    setVagDefaultProps: function(vagNodeModel) {
        vagNodeModel.set('line', vagNodeModel.previousSibling ? vagNodeModel.previousSibling.get('line') : null);
    },

    onAddContClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
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

        this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    },

    onAddGryzClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
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
        this.addVgCtGr(parentModelNode, 'gryz');
    },

    onAddPlombClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        this.addVgCtGr(selectedModelNode, 'plomb', 'doc_new');
    },

    onDelClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        var parentModelNode = selectedModelNode.parentNode;

        selectedModelNode.remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();
        this.getAddPlombBtn().hide();


        if (parentModelNode && !parentModelNode.hasChildNodes())  {
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
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue();

        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() === 'kgvn' ||
                field.getName() === 'nkon' ||
                field.getName() === 'znak' ||
                field.getName() === 'nvag') {
                rec.set('text', newVal);
            }
        }
    },

    onGrBruttoUpdateData: function (field) {
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue();
        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() === 'massa_tar' ||
                field.getName() === 'massa_brutto') {
                rec.set('massa_brutto_all', rec.get('massa_tar') + rec.get('massa_brutto'));
                field.up('form').down('#massa_brutto_all').setValue(rec.get('massa_brutto_all'));
            }
        }
    },

    onSaveExit: function () {
        this.onSaveClick(1);
    },

    onSaveClick: function (btn) {
        // var dataObj = {hid: this.getKy2treeform().getPoezdId()};
        var dataObj = {hid: this.getTreepanel().getRootNode().get('hid')};

        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            dataObj = this.saveVags(dataObj);
        }

        // var url = Ext.ModelManager.getModel('TK.model.ky2.VgCtGrTreeNode').getProxy().url;
        var url = 'ky2/secure/PoezdVgCtGr.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode(dataObj), action: 'save'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                if (Ext.isNumber(btn)) {
                    this.getCloseBtn().fireEvent('click', this.getCloseBtn());
                }
                else {
                    var respObj = Ext.decode(response.responseText);
                    var poezdObj = respObj['rows'][0];
                    var rootNode = this.getTreepanel().getStore().getRootNode();
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
                gruzy = cont['gruzs'];

            var contNode = vagNode.findChild('sort', contIndx);
            if (contNode) {
                contNode.set('hid', cont['hid']);
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyHids(gruzy, contNode);
                }
            }
        }
    },

    initGryzyHids: function (gruzy, parentNode) {
        for (var gruzIndx in gruzy) {
            var gruz = gruzy[gruzIndx];
            var gruzNode = parentNode.findChild('sort', gruzIndx);
            if (gruzNode) {
                gruzNode.set('hid', gruz['hid']);
            }
        }
    },

    saveVags: function (dataObj) {
        var vagIndex = 0;

        dataObj['vagons'] = [];

        this.getTreepanel().getRootNode().eachChild(function (vagNodeModel) { // write vags

            var vagDataObj = {};
            this.getVagpanel().items.each(function (vagItem, index, length) {
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
                    this.saveConts(vagNodeModel, vagDataObj);
                } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
                    this.saveGryzy(vagNodeModel, vagDataObj);
                }
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    saveConts: function (vagNodeModel, vagDataObj) {
        var contIndex = 0;
        vagDataObj['konts'] = [];

        vagNodeModel.eachChild(function (contNodeModel) {  // write conts
            var contDataObj = {};

            this.getContpanel().items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contDataObj[contItem.getName()] = contNodeModel.get(contItem.getName());
                } else if (contItem.isXType('fieldcontainer')) {
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
                this.saveGryzy(contNodeModel, contDataObj);
                this.savePlombs(contNodeModel, contDataObj);
            }

            contIndex++;
        }, this);
    },

    saveGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'gryz') {
                var gruzDataObj = {};
                this.getGryzpanel().items.each(function (gryzItem, index, length) {
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

    savePlombs: function (nodeModel, dataObj) {
        dataObj['plombs'] = [];
        nodeModel.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'plomb') {
                var plombDataObj = {};
                this.getPlombpanel().items.each(function (plombItem) {
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
    }


});
