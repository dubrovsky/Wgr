Ext.define('TK.controller.ky2.AvtoCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.AvtoCtGrTreeForm',
        'ky2.avto.into.AvtoCtGrTreeForm',
        'ky2.avto.out.AvtoCtGrTreeForm'
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
        ref: 'avtolist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'ky2treeform',
        selector: 'viewport > tabpanel ky2treeform'
    }, {
        ref: 'treepanel',
        selector: 'ky2avtoctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2avtoctgrtreeform > tabpanel'
    }, {
        ref: 'addVagBtn',
        selector: 'ky2avtoctgrtreeform button[action=addVag]'
    }, {
        ref: 'addContBtn',
        selector: 'ky2avtoctgrtreeform button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'ky2avtoctgrtreeform button[action=addGryz]'
    }, {
        ref: 'delBtn',
        selector: 'ky2avtoctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2avtoctgrtreeform button[action=save]'
    }, {
        ref: 'vagpanel',
        selector: 'ky2avtoctgrtreeform > tabpanel > #vag'
    }, {
        ref: 'contpanel',
        selector: 'ky2avtoctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2avtoctgrtreeform > tabpanel > #gryz'
    }],
    init: function () {
        this.control({
            'ky2avtoctgrtreeform': {
                beforedestroy: this.clearCtGrForm
            },
            'ky2avtointolist button[action="editCtGr"]': {
                click: this.editCtGrInto
            },
            'ky2avtooutlist button[action="editCtGr"]': {
                click: this.editCtGrOut
            },
            'ky2avtoctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            // 'ky2vgctgrtreeform button[action=addVag]': {
            //     click: this.onAddVagClick
            // },
            'ky2avtoctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2avtoctgrtreeform button[action=addCont]': {
                click: this.onAddContClick
            },
            'ky2avtoctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2avtoctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2avtoctgrtreeform > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            }
        });
    },

    editCtGrInto: function (btn) {
        this.editCtGr('ky2ctgrtreeformavtointo', 'TK.model.ky2.AvtoCtGrTreeNode');
    },

    editCtGrOut: function (btn) {
        this.editCtGr('ky2ctgrtreeformavtoout', 'TK.model.ky2.AvtoCtGrTreeNode');
    },

    editCtGr: function (xtype, modelClsName) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }

        var url = 'ky2/secure/AvtoCtGr.do';

        Ext.Ajax.request({
            url: url,
            params: {hid: avtolist.getSelectionModel().getLastSelected().get('hid'), action: 'edit'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                var avtoObj = respObj['rows'][0];

                var vagoncontainer = Ext.widget(xtype, {title: 'Контейнер/Груз'});

                //// fill tree
                var rootNode = this.getTreepanel().getStore().getRootNode();
                // rootNode.removeAll();
                rootNode.set('hid', avtoObj['hid']);
                // vagoncontainer.setPoezdId(poezdObj['hid']);

                var konts = avtoObj['konts'];
                if (konts && !Ext.Object.isEmpty(konts)) {
                    this.initContsNodes(konts, 0, rootNode);
                    // rootNode.expand();
                }
                var gruzs = avtoObj['gruzs'];
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
                    expanded: ((conts && conts['0']) || (gruzy && gruzy['0'])) && vagIndx == 0
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
                contModel = Ext.create('TK.model.ky2.PoezdVgCtGrTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0
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
        }
        if (this.getDelBtn().isHidden()) {
            this.getDelBtn().show();
        }

        switch (newTabItemId) {
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

                break;
            case 'cont':
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
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

                } else if (record.get('otpravka') === 'GRUZ') {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isVisible()) {
                        this.getAddContBtn().hide();
                    }
                } else {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                }

                break;
        }
    },

    onAddContClick: function (btn) {
        this.addCtGr(this.getTreepanel().getRootNode(), 'cont');
    },

    addCtGr: function (parentModelNode, who, iconCls) { // add sort prop
        var sort = parentModelNode.childNodes.length;
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.ky2.AvtoCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who,
                sort: sort
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
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
            parentModelNode;
        if (selectedModelNode === undefined)
            this.addCtGr(this.getTreepanel().getRootNode(), 'gryz');
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

    onDelClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        var parentModelNode = selectedModelNode.parentNode;

        selectedModelNode.remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();

        if (parentModelNode && parentModelNode.get('who') === 'vag' && !parentModelNode.hasChildNodes()) {
            parentModelNode.set('otpravka', undefined);
        }

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
            newVal = field.getSubmitValue();

        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() === 'kgvn' ||
                field.getName() === 'nkon' ||
                field.getName() === 'nvag') {
                rec.set('text', newVal);
            }
        }
    },

    onSaveClick: function (btn) {
        // var dataObj = {hid: this.getKy2treeform().getPoezdId()};
        var dataObj = {hid: this.getTreepanel().getRootNode().get('hid')};

        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            dataObj = this.saveNods(dataObj);
        }

        // var url = Ext.ModelManager.getModel('TK.model.ky2.VgCtGrTreeNode').getProxy().url;
        var url = 'ky2/secure/AvtoCtGr.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode(dataObj), action: 'save'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                var respObj = Ext.decode(response.responseText);
                var avtoObj = respObj['rows'][0];
                var rootNode = this.getTreepanel().getStore().getRootNode();
                var konts = avtoObj['konts'];
                if (konts && !Ext.Object.isEmpty(konts)) {
                    this.initHids(konts, rootNode);
                }
                var gruzs = avtoObj['gruzs'];
                if (gruzs && !Ext.Object.isEmpty(gruzs)) {
                    this.initHids(gruzs, rootNode);
                }
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    initHids: function (cntGr, rootNode) {
        for (var cntGrIndx in cntGr) {
            var cg = cntGr[cntGrIndx],
                gruzy = cg['gruzs'];

            var node = rootNode.findChild('sort', cg['sort']);
            if (node) {
                node.set('hid', cg['hid']);
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyHids(gruzy, node);
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
                    } else if (contItem.isXType('fieldcontainer')) {
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
        }, this);
    }


});
