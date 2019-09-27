Ext.define('TK.controller.ky2.AvtoZayavCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.AvtoCtGrTreeForm',
        'ky2.avto.into.AvtoZayavCtGrTreeForm',
        'ky2.avto.out.AvtoZayavCtGrTreeForm'
    ],
    models: [
        'ky2.AvtoCtGrTreeNode'
    ],
    stores: [
        'ky2.AvtoCtGrTreeNodes'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'zayavlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'zayavform',
        selector: 'viewport > tabpanel ky2abstractform#ky2avtozayavform'
    }, {
        ref: 'ky2treeform',
        selector: 'viewport > tabpanel ky2treeform'
    }, {
        ref: 'treepanel',
        selector: 'ky2avtozayavctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2avtozayavctgrtreeform > tabpanel'
    }, {
        ref: 'addContBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=addGryz]'
    }, {
       ref: 'addPlombBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=addPlomb]'
    }, {
        ref: 'delBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=save]'
    }, {
        ref: 'closeBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=close]'
    }, {
        ref: 'saveExitBtn',
        selector: 'ky2avtozayavctgrtreeform button[action=saveExit]'
   }, {
        ref: 'contpanel',
        selector: 'ky2avtozayavctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'plombpanel',
        selector: 'ky2avtozayavctgrtreeform > tabpanel > #plomb'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2avtozayavctgrtreeform > tabpanel > #gryz'
    }],
    init: function () {
        this.control({
            'ky2avtozayavctgrtreeform': {
                beforedestroy: this.clearCtGrForm
            },
            'ky2avtozayavintolist button[action="editCtGr"]': {
                click: this.editCtGrInto
            },
            'ky2avtozayavoutlist button[action="editCtGr"]': {
                click: this.editCtGrOut
            },
            'ky2avtozayavintoform button[action="editCtGr"]': {
                click: this.toCtGrFromOutside
            },
            'ky2avtozayavoutform button[action="editCtGr"]': {
                click: this.toCtGrFromOutside
            },
            'ky2avtozayavctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            // 'ky2vgctgrtreeform button[action=addVag]': {
            //     click: this.onAddVagClick
            // },
            'ky2avtozayavctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2avtozayavctgrtreeform button[action=addCont]': {
                click: this.onAddContClick
            },
            'ky2avtozayavctgrtreeform button[action=addPlomb]': {
                click: this.onAddPlombClick
            },
            'ky2avtozayavctgrtreeform button[action=addAct]': {
                click: this.onAddActClick
            },
            'ky2avtozayavctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2avtozayavctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2avtozayavctgrtreeform button[action=saveExit]': {
                click: this.onSaveExit
            },
            'ky2avtozayavctgrtreeform > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            }
            // 'ky2avtoctgrtreeform > tabpanel > #cont > numberfield': {
            //     blur: this.onGrBruttoUpdateData
            // }

        });
    },

    toCtGrFromOutside: function (btn) {
        var record = this.getZayavform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert(this.warningMsg, this.warningText);
            return false;
        }
        this.editCtGr('ky2ctgrtreeformavtozayavinto', 'TK.model.ky2.AvtoCtGrTreeNode', record.get('hid'));
    },

    editCtGrInto: function (btn) {
        this.editCtGrCheck('ky2ctgrtreeformavtozayavinto', 'TK.model.ky2.AvtoCtGrTreeNode');
    },

    editCtGrOut: function (btn) {
        this.editCtGrCheck('ky2ctgrtreeformavtozayavout', 'TK.model.ky2.AvtoCtGrTreeNode');
    },

    editCtGrCheck: function (xtype, modelClsName) {
        var zayavlist = this.getZayavlist();
        if (!TK.Utils.isRowSelected(zayavlist)) {
            return false;
        }
        this.editCtGr(xtype, modelClsName, zayavlist.getSelectionModel().getLastSelected().get('hid'));
    },

    editCtGr: function (xtype, modelClsName, zayavHid) {

        var url = 'ky2/secure/AvtoZayavCtGr.do';

        Ext.Ajax.request({
            url: url,
            params: {hid: zayavHid, action: 'edit'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                var zayavObj = respObj['rows'][0];

                var vagoncontainer = Ext.widget(xtype, {title: 'Контейнер/Груз'});
                this.initAvtoToButtons(vagoncontainer, zayavObj['direction']);

                //// fill tree
                // this.getTreepanel().setTitle(this.getController('ky2.BindAvtoAndAvtoController').titleForAvto(""));
                var rootNode = this.getTreepanel().getStore().getRootNode();
                // rootNode.removeAll();
                rootNode.set('hid', zayavObj['hid']);
                // rootNode.set('dprbDate', zayavObj['dprbDate']);
                // rootNode.set('dprbTime', zayavObj['dprbTime']);
                rootNode.set('direction', zayavObj['direction']);
                // rootNode.set('gruzotpr', zayavObj['client']);
                // vagoncontainer.setPoezdId(poezdObj['hid']);
                // this.getTreepanel().down('button[action=showVags]').hide();
                // this.getTreepanel().down('button[action=hideVags]').hide();

                var konts = zayavObj['konts'];
                if (konts && !Ext.Object.isEmpty(konts)) {
                    this.initContsNodes(konts, 0, rootNode);
                    // rootNode.expand();
                }
                var gruzs = zayavObj['gruzs'];
                if (gruzs && !Ext.Object.isEmpty(gruzs)) {
                    this.initGryzyNodes(gruzs, rootNode);
                    // rootNode.expand();
                }
                rootNode.sort(function(n1, n2) {
                                    console.log('node.sort');
                                    var i1 = n1.get('sort'),
                                        i2 = n2.get('sort');
                                    return (i2 > i1) ? -1 : (i2 < i1) ? 1 : 0;
                                });
                /// END fill tree
                this.getCenter().remove(this.getCenter().getComponent(0), true);
                this.getCenter().add(vagoncontainer);

            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    // initVagsNodes: function (vags, rootNode) {
    //     for (var vagIndx in vags) {
    //         var vag = vags[vagIndx],
    //             conts = vag['konts'],
    //             gruzy = vag['gruzs'],
    //             vagModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
    //                 text: vag['nvag'],
    //                 who: 'vag',
    //                 leaf: false,
    //                 iconCls: 'vag',
    //                 expanded: ((conts && conts['0']) || (gruzy && gruzy['0'])) && vagIndx == 0
    //             });
    //
    //         this.getVagpanel().items.each(function (vagItem, index, length) {
    //             if (vagItem.isXType('field')) {
    //                 vagModel.set(vagItem.getName(), vag[vagItem.getName()]);
    //             } else if (vagItem.isXType('fieldcontainer')) {
    //                 vagItem.items.each(function (item, index, length) {
    //                     if (item.isXType('field')) {
    //                         vagModel.set(item.getName(), vag[item.getName()]);
    //                     }
    //                 });
    //             }
    //         });
    //
    //         rootNode.appendChild(vagModel);
    //
    //         if (vag['otpravka'] === 'CONT') {
    //             if (conts && !Ext.Object.isEmpty(conts)) {
    //                 this.initContsNodes(conts, vagIndx, vagModel);
    //             }
    //         } else if (vag['otpravka'] === 'GRUZ') {
    //             if (gruzy && !Ext.Object.isEmpty(gruzy)) {
    //                 this.initGryzyNodes(gruzy, vagModel, vagIndx);
    //             }
    //         }
    //     }
    // },

    initContsNodes: function (conts, vagIndx, avtoModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                plombs = cont['plombs'],
                contModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    // text: this.getController('ky2.BindPoezdAndPoezdController').contNodeText(cont),
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0
                });

            this.getContpanel().items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contModel.set(contItem.getName(), cont[contItem.getName()]);
                } else if (contItem.isXType('fieldset')) {
                    contItem.items.each(function (item, index, length) {
                        if (item.isXType('field')) {
                            contModel.set(item.getName(), cont[item.getName()]);
                        }
                    });
                }
            });
            contModel.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(contModel));
            avtoModel.appendChild(contModel);

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
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
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
        }
    },

    onAddContClick: function (btn) {
        this.addCtGr(this.getTreepanel().getRootNode(), 'cont', 'cont3');
    },

    addCtGr: function (parentModelNode, who, iconCls) { // add sort prop
        var sort = parentModelNode.childNodes.length;
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.ky2.AvtoCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who,
                sort: sort
                // dprb: parentModelNode.get('dprb')
            })
        );

        if(who === 'cont'){
            this.setContDefaultProps(childModelNode);
        }

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    setContDefaultProps: function(contNodeModel) {
        var rootNode = this.getTreepanel().getRootNode();
        contNodeModel.set('dprbDate', rootNode.get('dprbDate'));
        contNodeModel.set('dprbTime', rootNode.get('dprbTime'));
        contNodeModel.set('gruzotpr', rootNode.get('gruzotpr'));
    },

    // onAddContClick: function (btn) {
    //     var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
    //         parentModelNode;
    //     switch (selectedModelNode.get('who')) {
    //         case 'vag':
    //             parentModelNode = selectedModelNode;
    //             parentModelNode.set('otpravka', 'CONT');
    //             break;
    //         case 'cont':
    //             parentModelNode = selectedModelNode.parentNode;
    //             break;
    //         case 'gryz':
    //             parentModelNode = selectedModelNode.parentNode.parentNode; // gruz pod cont
    //             if (parentModelNode.getId() === 'root') {
    //                 parentModelNode = selectedModelNode.parentNode; // gruz pod vagonom
    //             }
    //             break;
    //     }
    //
    //     this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    // },

    onAddGryzClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode,
            contFound = false;
        if (selectedModelNode === undefined) {
            this.getTreepanel().getRootNode().eachChild(function (childNodeModel) {
                if (childNodeModel.get('who') === 'cont')
                    contFound = true;
            });
            if (!contFound)
                this.addCtGr(this.getTreepanel().getRootNode(), 'gryz');
        }
        else {
            switch (selectedModelNode.get('who')) {
                // case 'vag':
                //     parentModelNode = selectedModelNode;
                //     parentModelNode.set('otpravka', 'GRUZ');
                //     break;
                case 'cont':
                    parentModelNode = selectedModelNode;
                    break;
                case 'gryz':
                    parentModelNode = selectedModelNode.parentNode;
                    break;
            }
            this.addCtGr(parentModelNode, 'gryz');
        }
    },

    onAddPlombClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        this.addCtGr(selectedModelNode, 'plomb', 'doc_new');
    },

    onAddActClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        window.open('ky2/secure/Report.do?hid=' + selectedModelNode.get('hid') + '&action=sostojanie_kont_avto', '_blank', '');
    },

    initAvtoToButtons: function(vagoncontainer, direction) {
        // if (direction === 1)
        //     vagoncontainer.down('#showAvtosOutDir4AvtoIntoBind').show();
        // else if (direction === 2)
        //     vagoncontainer.down('#showAvtosIntoDir4AvtoOutBind').show();
        vagoncontainer.down('#showAvto4YardOutBind').hide();
        vagoncontainer.down('#editPoezd').hide();
    },

    onDelClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode = selectedModelNode.parentNode,
            whoSelected = selectedModelNode.get('who');

        selectedModelNode.remove(true, true);
        if (whoSelected === 'gryz' && parentModelNode.get('who') === 'cont')
            this.massaRecount(parentModelNode);

        this.getDelBtn().hide();
        // this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();
        this.getAddPlombBtn().hide();

        // if (parentModelNode && parentModelNode.get('who') === 'vag' && !parentModelNode.hasChildNodes()) {
        //     parentModelNode.set('otpravka', undefined);
        // }

        var index = 0;
        parentModelNode.eachChild(function (childNodeModel) { // resort
            childNodeModel.set('sort', index);
            index++;
        });
    },

    clearCtGrForm: function () {
        var rootNode = this.getTreepanel().getRootNode();
        rootNode.removeAll();
        // rootNode.collapse(); // to avois second autoload
    },

    onVgCtGrFormUpdateData: function (field) {
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue(),
            selectedNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentOfSelected = selectedNode.parentNode;

        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() === 'kgvn' ||
                field.getName() === 'nkon' ||
                field.getName() === 'znak' ||
                field.getName() === 'nvag') {
                rec.set('text', newVal);
            }
            else if (field.getName() === 'massa' && parentOfSelected.get('who') === 'cont') {
                this.massaRecount(parentOfSelected);
            }
            else if (field.getName() === 'massa_brutto' && selectedNode.get('who') === 'cont') {
                this.massaGryzRecount(selectedNode, newVal);
            }
            else if (field.getName() === 'massa_tar' ||
                field.getName() === 'massa_brutto') {
                rec.set('massa_brutto_all', rec.get('massa_tar') + rec.get('massa_brutto'));
                field.up('form').down('#massa_brutto_all').setValue(rec.get('massa_brutto_all'));
            }

            if (rec.get('who') === 'cont') {
                rec.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(rec));
            }
        }
    },

    massaRecount: function(parentOfSelected) {
        var total = 0;
        parentOfSelected.eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'gryz')
                total += nodeModel.get('massa');
        });
        parentOfSelected.set('massa_brutto', total);
        parentOfSelected.set('massa_brutto_all', total + parentOfSelected.get('massa_tar'))
    },

    massaGryzRecount: function(selectedNode, newVal) {
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
        // var dataObj = {hid: this.getKy2treeform().getPoezdId()};
        var dataObj = {hid: this.getTreepanel().getRootNode().get('hid')};

        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            dataObj = this.saveNods(dataObj);
        }

        // var url = Ext.ModelManager.getModel('TK.model.ky2.VgCtGrTreeNode').getProxy().url;
        var url = 'ky2/secure/AvtoZayavCtGr.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode(dataObj), action: 'save'},
            scope: this,
            success: function (response) {
                if (Ext.isNumber(btn)) {
                    this.getCloseBtn().fireEvent('click', this.getCloseBtn());
                }
                else {
                    var respObj = Ext.decode(response.responseText);
                    var zayavObj = respObj['rows'][0];
                    var rootNode = this.getTreepanel().getStore().getRootNode();
                    var konts = zayavObj['konts'];
                    if (konts && !Ext.Object.isEmpty(konts)) {
                        this.initHids(konts, rootNode);
                    }
                    var gruzs = zayavObj['gruzs'];
                    if (gruzs && !Ext.Object.isEmpty(gruzs)) {
                        this.initHids(gruzs, rootNode);
                    }
                }
                this.getCenter().setLoading(false);
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    // onGrBruttoUpdateData: function (field) {
    //     var rec = field.up('form').getRecord(),
    //         oldVal = rec.get(field.getName()),
    //         newVal = field.getSubmitValue();
    //     if (oldVal !== newVal) {
    //         rec.set(field.getName(), newVal);
    //         if (field.getName() === 'massa_tar' ||
    //             field.getName() === 'massa_brutto') {
    //             rec.set('massa_brutto_all', rec.get('massa_tar') + rec.get('massa_brutto'));
    //             field.up('form').down('#massa_brutto_all').setValue(rec.get('massa_brutto_all'));
    //         }
    //     }
    // },


    initHids: function (cntGr, rootNode) {
        for (var cntGrIndx in cntGr) {
            var cg = cntGr[cntGrIndx],
                gruzy = cg['gruzs'],
                plombs = cg['plombs'];

            var node = rootNode.findChild('sort', cg['sort']);
            if (node) {
                node.set('hid', cg['hid']);
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyHids(gruzy, node);
                }
                if (plombs && !Ext.Object.isEmpty(plombs)) {
                    this.initPlombsHids(plombs, node);
                }
            }
        }
    },


    // initVagsHids: function (vags, rootNode) {
    //     for (var vagIndx in vags) {
    //         var vag = vags[vagIndx],
    //             conts = vag['konts'],
    //             gruzy = vag['gruzs'];
    //
    //         var vagNode = rootNode.findChild('sort', vagIndx);
    //         if (vagNode) {
    //             vagNode.set('hid', vag['hid']);
    //             if (vag['otpravka'] === 'CONT') {
    //                 if (conts && !Ext.Object.isEmpty(conts)) {
    //                     this.initContsHids(conts, vagNode);
    //                 }
    //             } else if (vag['otpravka'] === 'GRUZ') {
    //                 if (gruzy && !Ext.Object.isEmpty(gruzy)) {
    //                     this.initGryzyHids(gruzy, vagNode);
    //                 }
    //             }
    //         }
    //     }
    // },
    //
    // initContsHids: function (conts, vagNode) {
    //     for (var contIndx in conts) {
    //         var cont = conts[contIndx],
    //             gruzy = cont['gruzs'];
    //
    //         var contNode = vagNode.findChild('sort', contIndx);
    //         if (contNode) {
    //             contNode.set('hid', cont['hid']);
    //             if (gruzy && !Ext.Object.isEmpty(gruzy)) {
    //                 this.initGryzyHids(gruzy, contNode);
    //             }
    //         }
    //     }
    // },
    //
    initGryzyHids: function (gruzy, parentNode) {
        for (var gruzIndx in gruzy) {
            var gruz = gruzy[gruzIndx];
            var gruzNode = parentNode.findChild('sort', gruzIndx);
            if (gruzNode) {
                gruzNode.set('hid', gruz['hid']);
            }
        }
    },

    initPlombsHids: function (plombs, parentNode) {
        for (var plombIndx in plombs) {
            var plomb = plombs[plombIndx];
            var plombNode = parentNode.findChild('sort', plombIndx);
            if (plombNode) {
                plombNode.set('hid', plomb['hid']);
            }
        }
    },

    saveNods: function (dataObj) {
        var vagIndex = 0;

        dataObj['konts'] = [];
        dataObj['gruzs'] = [];


        this.getTreepanel().getRootNode().eachChild(function (nodeModel) { // write node
            var vagDataObj = {};
            if (nodeModel.get('who') === 'cont') {
                // var contIndex = 0;
                // vagDataObj['konts'] = [];

                // nodeModel.eachChild(function (contNodeModel) {  // write conts
                var contDataObj = {};

                this.getContpanel().items.each(function (contItem, index, length) {
                    if (contItem.isXType('field')) {
                        contDataObj[contItem.getName()] = nodeModel.get(contItem.getName());
                    } else if (contItem.isXType('fieldset')) {
                        contItem.items.each(function (item) {
                            if (item.isXType('field')) {
                                contDataObj[item.getName()] = nodeModel.get(item.getName());
                            }
                        }, this);
                    }
                }, this);
                // contDataObj['sort'] = contIndex;
                dataObj['konts'].push(contDataObj);

                if (nodeModel.hasChildNodes()) {
                    this.saveGryzy(nodeModel, contDataObj);
                    this.savePlombs(nodeModel, contDataObj);
                }

                // contIndex++;
                // }, this);
            }
            else {
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
            }

            // var vagDataObj = {};
            // this.getVagpanel().items.each(function (vagItem, index, length) {
            //     if (vagItem.isXType('field')) {
            //         vagDataObj[vagItem.getName()] = vagNodeModel.get(vagItem.getName());
            //     } else if (vagItem.isXType('fieldcontainer')) {
            //         vagItem.items.each(function (item) {
            //             if (item.isXType('field')) {
            //                 vagDataObj[item.getName()] = vagNodeModel.get(item.getName());
            //             }
            //         }, this);
            //     }
            // }, this);
            // // vagDataObj['sort'] = vagIndex;
            // dataObj['vagons'].push(vagDataObj);
            //
            // if (vagNodeModel.hasChildNodes()) {
            //     // var childNodeModel = vagNodeModel.getChildAt(0);
            //     if (vagNodeModel.get('otpravka') === 'CONT') {
            //         this.saveConts(vagNodeModel, vagDataObj);
            //     } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
            //         this.saveGryzy(vagNodeModel, vagDataObj);
            //     }
            // }
            //
            // vagIndex++;
        }, this);

        if (!dataObj['gruzs'].length )
            delete dataObj['gruzs'];
        if (!dataObj['konts'].length)
            delete dataObj['konts'];
        return dataObj;
    },


    // saveVags: function (dataObj) {
    //     var vagIndex = 0;
    //
    //     dataObj['vagons'] = [];
    //
    //     this.getTreepanel().getRootNode().eachChild(function (vagNodeModel) { // write vags
    //
    //         var vagDataObj = {};
    //         this.getVagpanel().items.each(function (vagItem, index, length) {
    //             if (vagItem.isXType('field')) {
    //                 vagDataObj[vagItem.getName()] = vagNodeModel.get(vagItem.getName());
    //             } else if (vagItem.isXType('fieldcontainer')) {
    //                 vagItem.items.each(function (item) {
    //                     if (item.isXType('field')) {
    //                         vagDataObj[item.getName()] = vagNodeModel.get(item.getName());
    //                     }
    //                 }, this);
    //             }
    //         }, this);
    //         // vagDataObj['sort'] = vagIndex;
    //         dataObj['vagons'].push(vagDataObj);
    //
    //         if (vagNodeModel.hasChildNodes()) {
    //             // var childNodeModel = vagNodeModel.getChildAt(0);
    //             if (vagNodeModel.get('otpravka') === 'CONT') {
    //                 this.saveConts(vagNodeModel, vagDataObj);
    //             } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
    //                 this.saveGryzy(vagNodeModel, vagDataObj);
    //             }
    //         }
    //
    //         vagIndex++;
    //     }, this);
    //
    //     return dataObj;
    // },

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
            }

            contIndex++;
        }, this);
    },

    saveGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (gryzNodeModel) {
            if (gryzNodeModel.get('who') === 'gryz') {
                var gruzDataObj = {};
                this.getGryzpanel().items.each(function (gryzItem, index, length) {
                    if (gryzItem.isXType('field')) {
                        gruzDataObj[gryzItem.getName()] = gryzNodeModel.get(gryzItem.getName());
                    } else if (gryzItem.isXType('fieldcontainer')) {
                        gryzItem.items.each(function (item) {
                            if (item.isXType('field')) {
                                gruzDataObj[item.getName()] = gryzNodeModel.get(item.getName());
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
