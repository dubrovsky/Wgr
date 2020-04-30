Ext.define('TK.controller.ky2.YardCtGrController', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils',
        'TK.Validators',
        'TK.model.ky2.AvtoCtGrTreeNode',
        'TK.model.ky2.PoezdVgCtGrTreeNode'
    ],


    views: [
        'ky2.yard.YardCtGrWin',
        'ky2.YardCtGrTreeForm'
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
        ref: 'yardlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'ky2treeform',
        selector: 'viewport > tabpanel ky2treeform'
    }, {
        ref: 'treepanel',
        selector: 'ky2yardctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2yardctgrtreeform > tabpanel'
    }, {
        //     ref: 'addVagBtn',
        //     selector: 'ky2yardctgrtreeform button[action=addVag]'
        // }, {
        //     ref: 'addContBtn',
        //     selector: 'ky2yardctgrtreeform button[action=addCont]'
        // }, {
        ref: 'addGryzBtn',
        selector: 'ky2yardctgrtreeform button[action=addGryz]'
    }, {
        ref: 'addPlombBtn',
        selector: 'ky2yardctgrtreeform button[action=addPlomb]'
    }, {
        ref: 'delBtn',
        selector: 'ky2yardctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2yardctgrtreeform button[action=save]'
    }, {
        ref: 'closeBtn',
        selector: 'ky2yardctgrtreeform button[action=close]'
    }, {
        ref: 'saveExitBtn',
        selector: 'ky2yardctgrtreeform button[action=saveExit]'
    }, {
        //     ref: 'vagpanel',
        //     selector: 'ky2yardctgrtreeform > tabpanel > #vag'
        // }, {
        ref: 'contpanel',
        selector: 'ky2yardctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'plombpanel',
        selector: 'ky2yardctgrtreeform > tabpanel > #plomb'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2yardctgrtreeform > tabpanel > #gryz'
    }],
    init: function () {
        this.control({
            'ky2yardctgrtreeform': {
                beforedestroy: this.clearCtGrForm
            },
            'ky2yardlist button[action="kont"] menuitem[action=editKont]': {
                click: this.editKont
            },
            'ky2yardlist button[action="kont"] menuitem[action=createKont]': {
                click: this.createKont
            },
            'ky2yardlist button[action="kont"] menuitem[action=deleteKont]': {
                click: this.deleteKont
            },
            'ky2yardctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'ky2yardctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2yardctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2yardctgrtreeform button[action=addPlomb]': {
                click: this.onAddPlombClick
            },
            'ky2yardctgrtreeform > tabpanel > form field': {
                blur: this.onCtGrFormUpdateData
            },
            'ky2yardctgrtreeform button[action=close]': {
                click: this.onExit
            },
            'ky2yardctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2yardctgrtreeform button[action=saveExit]': {
                click: this.onSaveExit
            },
            // 'ky2yardctgrtreeform > tabpanel > #cont > numberfield': {
            //     blur: this.onContBruttoUpdateData
            // },
            'ky2yardctgrtreeform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            }
        });
    },

    onCtGrFormUpdateData: function (field) {
        var selectedNode = this.getTreepanel().getSelectionModel().getLastSelected();
        this.getController('ky2.AvtoCtGrController').vgCtGrFormUpdateData(field, selectedNode, false);

    },

    checkNods: function () {
        var result = '';
        this.getTreepanel().getRootNode().eachChild(function (nodeModel) {
            if (nodeModel.get('who') === 'cont') {
                if (nodeModel.get('dprbDate') === '')
                    result += this.errMsg1;
                if (nodeModel.get('dprbTime') === null)
                    result += this.errMsg2;
                if (nodeModel.get('clientHid') === 0)
                    result += this.errMsg3;
                var valid = TK.Validators.kontNum2(nodeModel.get('nkon'));
                if (Ext.isString(valid) || !valid) {
                    result += errMsg4 + nodeModel.get('nkon') + '<br>';
                }
            }
        }, this);
        return result;
    },

    onSaveExit: function () {
        this.onSaveClick(1);
    },

    onSaveClick: function (btn) {
        // var dataObj = {hid: this.getKy2treeform().getPoezdId()};
        var dataObj = {
                hid: this.getTreepanel().getRootNode().get('hid'),
                sector: this.getTreepanel().getRootNode().get('sector')
            },
            checkNodsResult = '';


        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            checkNodsResult = this.checkNods();
            if (checkNodsResult === '')
                dataObj = this.saveNods(dataObj);
        }

        if (checkNodsResult === '') {
            var url = 'ky2/secure/YardCtGr.do';
            this.getCenter().setLoading(true);
            Ext.Ajax.request({
                url: url,
                params: {dataObj: Ext.encode(dataObj), action: 'save'},
                scope: this,
                success: function (response) {
                    var respObj = Ext.decode(response.responseText);
                    if (respObj.success) {
                        if (Ext.isNumber(btn)) {
                            this.getCloseBtn().fireEvent('click', this.getCloseBtn());
                        } else {
                            var yardObj = respObj['rows'][0];
                            var rootNode = this.getTreepanel().getStore().getRootNode();
                            var konts = yardObj['konts'];
                            if (konts && !Ext.Object.isEmpty(konts)) {
                                this.initHids(konts, rootNode);
                            }
                            // var gruzs = avtoObj['gruzs'];
                            // if (gruzs && !Ext.Object.isEmpty(gruzs)) {
                            //     this.initHids(gruzs, rootNode);
                            // }
                        }
                    }
                    else
                        Ext.Msg.alert(this.titleWarn, this.msgNoFreePlaces);
                    this.getCenter().setLoading(false);
                    this.getYardlist().getStore().reload();
                },
                failure: function (response) {
                    this.getCenter().setLoading(false);
                    TK.Utils.makeErrMsg(response, 'Error...');
                }
            });
        }
        else
            Ext.Msg.alert('Внимание', checkNodsResult);

    },

    saveNods: function (dataObj) {

        dataObj['konts'] = [];
        dataObj['gruzs'] = [];

        this.getTreepanel().getRootNode().eachChild(function (nodeModel) { // write node
            var vagDataObj = {};
            if (nodeModel.get('who') === 'cont') {
                // var contIndex = 0;
                // vagDataObj['konts'] = [];

                // nodeModel.eachChild(function (contNodeModel) {  // write conts
                var contDataObj = {},
                    sector = {};

                Ext.each(this.getContpanel().query('field'), function (item) {
                    if (item.getName() === 'sector' && dataObj['sector'] === null) {
                        sector['hid'] = item.getValue();
                        dataObj['sector'] = sector;
                    }
                    else
                        contDataObj[item.getName()] = nodeModel.get(item.getName());
                });
                // this.getContpanel().items.each(function (contItem, index, length) {
                //     if (contItem.isXType('field')) {
                //         contDataObj[contItem.getName()] = nodeModel.get(contItem.getName());
                //     } else if (contItem.isXType('fieldcontainer') || contItem.isXType('fieldset')) {
                //         contItem.items.each(function (item) {
                //             if (item.isXType('field')) {
                //                 contDataObj[item.getName()] = nodeModel.get(item.getName());
                //             }
                //         }, this);
                //     }
                // }, this);
                // contDataObj['sort'] = contIndex;
                dataObj['konts'].push(contDataObj);

                if (nodeModel.hasChildNodes()) {
                    this.saveGryzy(nodeModel, contDataObj);
                    this.savePlombs(nodeModel, contDataObj);
                }

                // contIndex++;
                // }, this);
            } else {
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
        }, this);

        if (!dataObj['gruzs'].length)
            delete dataObj['gruzs'];
        if (!dataObj['konts'].length)
            delete dataObj['konts'];
        return dataObj;
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
    },

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

    onExit: function (btn) {
        btn.up('window').close()
    },

    clearCtGrForm: function () {
        var rootNode = this.getTreepanel().getRootNode();
        rootNode.removeAll();
        // rootNode.collapse(); // to avois second autoload
    },

    createKont: function (btn) {
        var yardcontainer = Ext.widget('ky2yardctgrwin', {title: this.titleCreateKont});
        yardcontainer.down('#editPoezd').hide();
        yardcontainer.down('button[action=showVags]').hide();
        yardcontainer.down('button[action=hideVags]').hide();
        var rootNode = this.getTreepanel().getStore().getRootNode();
        rootNode.set('hid', null);
        rootNode.set('sector', null);
        this.onAddContClick();
        var cont = rootNode.getChildAt(0);
        // this.onTreeNodeClick(this.getTreepanel(), cont);
        this.getTreepanel().getSelectionModel().select(cont);
    },

    editKont: function (btn) {
        var yardlist = this.getYardlist();
        if (!TK.Utils.isOneRowSelected(yardlist)) {
            return false;
        }
        if (yardlist.selModel.getLastSelected().get('konts').length === 0) {
            Ext.Msg.alert(this.titleWarn, this.msgNoKont);
            return false;
        }

        var url = 'ky2/secure/YardCtGr.do';

        Ext.Ajax.request({
            url: url,
            params: {hid: yardlist.selModel.getLastSelected().get('hid'), action: 'edit'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                var yardObj = respObj['rows'][0];

                var yardcontainer = Ext.widget('ky2yardctgrwin', {title: this.titleEditKont});
                yardcontainer.down('#editPoezd').hide();
                this.getTreepanel().down('button[action=showVags]').hide();
                this.getTreepanel().down('button[action=hideVags]').hide();
                // this.initAvtoToButtons(vagoncontainer, avtoObj['direction']);

                //// fill tree
                var rootNode = this.getTreepanel().getStore().getRootNode();
                // rootNode.removeAll();
                rootNode.set('hid', yardObj['hid']);
                rootNode.set('sector', yardObj['sector']);
                // rootNode.set('direction', yardObj['direction']);
                // vagoncontainer.setPoezdId(poezdObj['hid']);

                var konts = yardObj['konts'];
                if (konts && !Ext.Object.isEmpty(konts)) {
                    this.initContsNodes(konts, 0, rootNode);
                    // rootNode.expand();

                }
                // var gruzs = avtoObj['gruzs'];
                // if (gruzs && !Ext.Object.isEmpty(gruzs)) {
                //     this.initGryzyNodes(gruzs, rootNode);
                //     // rootNode.expand();
                // }
                rootNode.sort(function (n1, n2) {
                    console.log('node.sort');
                    var i1 = n1.get('sort'),
                        i2 = n2.get('sort');
                    return (i2 > i1) ? -1 : (i2 < i1) ? 1 : 0;
                });
                var cont = this.getTreepanel().getRootNode().getChildAt(0);
                this.onTreeNodeClick(this.getTreepanel(), cont);
                this.getTreepanel().getSelectionModel().select(cont);
                /// END fill tree
                // this.getCenter().remove(this.getCenter().getComponent(0), true);
                // this.getCenter().add(vagoncontainer);

            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, this.msgError);
            }
        });


        // yardcontainer.setLoading(true);
        //
        // var yard = Ext.ModelManager.getModel('TK.model.ky2.YardBase'),
        //     hid = yardlist.selModel.getLastSelected().get('hid');
        //
        // yard.load(hid, {
        //     scope: this,
        //     params: {action: 'edit'},
        //     callback: function (yard, operation, success) {
        //         if (success) {
        //             var form = yardcontainer.down('form');
        //             this.checkForKontyardSector(yard.getSector(), form.getForm());
        //             form.loadRecord(yard);
        //         }
        //         yardcontainer.setLoading(false);
        //     }
        // });
    },

    initContsNodes: function (conts, vagIndx, avtoModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                plombs = cont['plombs'],
                contModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0
                });
            Ext.each(this.getContpanel().query('field'), function (item) {
                contModel.set(item.getName(), cont[item.getName()]);
            });
            // this.getContpanel().items.each(function (contItem, index, length) {
            //     if (contItem.isXType('field')) {
            //         contModel.set(contItem.getName(), cont[contItem.getName()]);
            //     } else if (contItem.isXType('fieldcontainer') || contItem.isXType('fieldset')) {
            //         contItem.items.each(function (item, index, length) {
            //             if (item.isXType('field')) {
            //                 contModel.set(item.getName(), cont[item.getName()]);
            //             }
            //         });
            //     }
            // });
            avtoModel.appendChild(contModel);
            // contModel.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(contModel));

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
                if (this.getAddGryzBtn().isVisible()) {
                    this.getAddGryzBtn().hide();
                }
                // if (this.getAddContBtn().isHidden()) {
                //     this.getAddContBtn().show();
                // }
                if (this.getAddPlombBtn().isVisible()) {
                    this.getAddPlombBtn().hide();
                }
                break;

            case 'cont':
                var sector = newTab.down('#kontsectors');
                if (this.getTreepanel().getRootNode().get('sector') != null && (sector.getValue() === null || sector.getValue() === undefined)) {
                    sector.getStore().load();
                    sector.setValue(this.getTreepanel().getRootNode().get('sector')['hid']);
                    sector.setDisabled(true);

                }
                // if (this.getAddContBtn().isHidden()) {
                //     this.getAddContBtn().show();
                // }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.getAddPlombBtn().isHidden()) {
                    this.getAddPlombBtn().show();
                }
                if (this.getDelBtn().isVisible()) {
                    this.getDelBtn().hide();
                }
                break;
        }
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
        this.getTabpanel().setActiveTab(0);
        this.getTabpanel().getTabBar().hide();


        // if (parentModelNode && parentModelNode.get('who') === 'vag' && !parentModelNode.hasChildNodes()) {
        //     parentModelNode.set('otpravka', undefined);
        // }

        var index = 0;
        parentModelNode.eachChild(function (childNodeModel) { // resort
            childNodeModel.set('sort', index);
            index++;
        });
    },

    onAddContClick: function (btn) {
        this.addCtGr(this.getTreepanel().getRootNode(), 'cont', 'cont3');
    },

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
        } else {
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

    addCtGr: function (parentModelNode, who, iconCls) { // add sort prop
        var sort = parentModelNode.childNodes.length;
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.ky2.AvtoCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who,
                sort: sort,
                dprb: parentModelNode.get('dprb')
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    showNsiOtpr: function (btn) {
        var panel = this.getContpanel(),
            nsiGrid = this.getController('Nsi').nsiKyClient(panel.down('#gruzotpr').getValue()).getComponent(0);
        nsiGrid.on('itemdblclick', this.selectClient, panel);
    },

    selectClient: function (view, record) {
        var data = record.data;
        this.down('#gruzotpr').setValue(data['sname']);
        var model = this.getRecord();
        model.set('clientHid', data['hid']);
        view.up('window').close();
    },
    deleteKont: function (btn) {
        var grid = btn.up('grid');
        if (!TK.Utils.isOneRowSelected(grid)) {
            return false;
        }

        Ext.Msg.show({
            title: this.titleDel, msg: this.msgDel, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function (buttonId) {
                if (buttonId === 'yes') {
                    this.getCenter().setLoading(true);
                    Ext.Ajax.request({
                        url: 'ky2/secure/YardCtGr.do',
                        params: {
                            hid: grid.getSelectionModel().getLastSelected().get('konts')[0]['hid'],
                            action: 'delete'
                        },
                        scope: this,
                        callback: function (options, success, response) {
                            this.getCenter().setLoading(false);
                            if (success) {
                                grid.getStore().reload();
                            } else {
                                TK.Utils.makeErrMsg(response, 'Error!..');
                            }
                        }
                    });
                }
            }
        });


    }

    // selectClient: function(view, record) {
    //     var data = record.data;
    //     this.down('#gruzotpr').setValue(data.cl_name);
    //     this.down('#gruzotpr').fireEvent('blur', this.down('#gruzotpr'));
    //
    //     view.up('window').close();
    // }

});
