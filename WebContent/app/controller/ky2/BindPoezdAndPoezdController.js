Ext.define('TK.controller.ky2.BindPoezdAndPoezdController', {
    extend: 'Ext.app.Controller',

    sourceVagModels: [],
    selectedNodesLeft: [],
    selectedNodesRight: [],
    views: [
        'ky2.poezd.into.PoezdsOutDir',
        'ky2.poezd.out.PoezdsIntoDir',
        'ky2.BasePoezdsDir',
        'ky2.poezd.into.Poezd2PoezdBindTreeForm',
        'ky2.poezd.out.Poezd2PoezdBindTreeForm'
    ],
    models: [
        'ky2.PoezdDir',
        'ky2.PoezdBindTreeNode'
    ],
    stores: [
        'ky2.PoezdsDir',
        'ky2.PoezdBindTreeLeftNodes',
        'ky2.PoezdBindTreeRightNodes'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'poezdoutdir',
        selector: 'ky2poezdsout4poezdintodir > ky2basepoezdsdir'
    }, {
        ref: 'poezdintodir',
        selector: 'ky2poezdsinto4poezdoutdir > ky2basepoezdsdir'
    }, {
        ref: 'treepanelLeft',
        selector: 'ky2bindtreeform > treepanel#treepanelLeft'
    }, {
        ref: 'treepanelRight',
        selector: 'ky2bindtreeform > treepanel#treepanelRight'
    }],

    init: function () {
        this.control({
            'ky2bindtreeform': {
                beforedestroy: this.clearBindForm
            },
            'ky2poezdsout4poezdintodir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBind
            },
            'ky2poezdsinto4poezdoutdir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdOutAndPoezdIntoForBind
            },
            'ky2poezd2poezdbindtreeformout treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2poezdbindtreeformout treepanel#treepanelRight > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2poezdbindtreeforminto button[action=save]': {
                click: this.bindPoezdToPoezd
            },
            'ky2poezd2poezdbindtreeformout button[action=save]': {
                click: this.bindPoezdToPoezd
            },
            'ky2poezd2poezdbindtreeforminto radiogroup': {
                change: this.changeLeftView
            },
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelLeft': {
                selectionchange: this.selectionchangeLeft
            },
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelRight': {
                selectionchange: this.selectionchangeRight
            },
            'ky2poezd2poezdbindtreeforminto button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2poezd2poezdbindtreeforminto button[action=moveLeft]': {
                click: this.moveNodesLeft
            }
        });
    },

    getPoesdIntoAndPoezdOutForBind: function (btn) {
        this.getPoesdAndPoezdForBind(this.getPoezdoutdir(), 'ky2poezd2poezdbindtreeforminto', '+ На поезд по отправлению');
    },

    getPoesdOutAndPoezdIntoForBind: function (btn) {
        this.getPoesdAndPoezdForBind(this.getPoezdintodir(), 'ky2poezd2poezdbindtreeformout', '+ На поезд по прибытию');
    },

    getPoesdAndPoezdForBind: function (poezdDir, widget, title) {
        var poezdlist = this.getPoezdlist(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected(),
            poezdsDir = poezdDir.getSelectionModel().getSelection(),
            poezdDirModel = poezdsDir.length > 0 ? poezdsDir[0] : null;

        if (poezdDirModel == null) {
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано значение',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        this.getCenter().setLoading(true);

        Ext.Ajax.request({
            url: 'ky2/secure/BindPoezdAndPoezd.do',
            params: {
                action: 'get_poezd_and_poezd_for_bind',
                'poezd1Hid': poezdModel.get('hid'),
                'poezd2Hid': poezdDirModel.get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    poezdDir.up('window').close();

                    var respObj = Ext.decode(response.responseText);
                    var poezd1Obj = respObj['rows'][0];
                    var poezd2Obj = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: title});

                    //// fill trees
                    var vags = poezd1Obj['vagons'];
                    this.getTreepanelLeft().setTitle(poezd1Obj['nppr']);
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        rootNode.set('hid', poezd1Obj['hid']); // poezd hid
                        rootNode.set('direction', poezd1Obj['direction']);
                        rootNode.set('nppr', poezd1Obj['nppr']);
                        this.initVagsNodes(vags, rootNode, false);
                        // rootNode.expand();
                    }

                    vags = poezd2Obj['vagons'];
                    this.getTreepanelRight().setTitle(poezd2Obj['nppr']);
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        rootNode.set('hid', poezd2Obj['hid']);   // // poezd hid
                        rootNode.set('direction', poezd2Obj['direction']);
                        rootNode.set('nppr', poezd2Obj['nppr']);
                        this.initVagsNodes(vags, rootNode, false);
                        // rootNode.expand();
                    }
                    /// END fill tree

                    this.getCenter().remove(this.getCenter().getComponent(0), true);
                    this.getCenter().add(bindcontainer);
                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                this.getCenter().setLoading(false);
            }
        });
    },

    initVagsNodes: function (vags, rootNode, isYard) {    //isYard - poezd for yard
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'],
                vagModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: vag['nvag'],
                    who: 'vag',
                    poezdHid: rootNode.get('hid'),
                    leaf: false,
                    iconCls: 'vag',
                    allowDrag: false,
                    expanded: true
                    // expanded: (conts && conts['0']) || (gruzy && gruzy['0'])
                });

            Ext.Object.each(vag, function (prop, value) {
                vagModel.set(prop, value);
            }, this);

            if (vag['otpravka'] === 'CONT' || !isYard) {
                rootNode.appendChild(vagModel);
            }

            if (vag['otpravka'] === 'CONT') {
                if (conts && !Ext.Object.isEmpty(conts)) {
                    this.initContsNodes(conts, vagIndx, vagModel, isYard);
                }
            } else if (vag['otpravka'] === 'GRUZ' && !isYard) {
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyNodes(gruzy, vagModel, vagIndx, isYard, 'TK.model.ky2.PoezdBindTreeNode');
                }
            }
        }
    },

    initContsNodes: function (conts, vagIndx, vagModel, isYard) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    poezdHid: vagModel.get('poezdHid'),
                    vagHid: vagModel.get('hid'),
                    iconCls: 'cont3',
                    allowDrop: false,
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: false
                });

            Ext.Object.each(cont, function (prop, value) {
                contModel.set(prop, value);
            }, this);
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx, isYard, 'TK.model.ky2.PoezdBindTreeNode');
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, parentIndx, isYard, model) {      // used here and in yard
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create(model, {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    poezdHid: parentModel.get('poezdHid'),
                    vagHid: parentModel.get('who') === 'cont' ? parentModel.parentNode.get('hid') : parentModel.get('hid'),
                    contHid: parentModel.get('who') === 'cont' ?  parentModel.get('hid') : null,
                    iconCls: 'gryz',
                    leaf: true,
                    allowDrop: false,
                    allowDrag: !isYard,
                    expanded: false
                });

            Ext.Object.each(gryz, function (prop, value) {
                gryzModel.set(prop, value);
            }, this);
            parentModel.appendChild(gryzModel);
        }
    },

    clearBindForm: function () {
        var rootNode = this.getTreepanelLeft().getRootNode();
        rootNode.removeAll();
        // rootNode.collapse(); // to avoid second autoload
        rootNode = this.getTreepanelRight().getRootNode();
        rootNode.removeAll();
        // rootNode.collapse();
    },

    sortChildNodes: function (treeNodeModel) {
        var index = 0;
        treeNodeModel.eachChild(function (childNodeModel) { // resort
            childNodeModel.set('sort', index);
            index++;
        });
    },

    bindPoezdToPoezd: function (btn) {
        var dataObjLeft = {
            hid: this.getTreepanelLeft().getRootNode().get('hid'),
            direction: this.getTreepanelLeft().getRootNode().get('direction'),
            nppr: this.getTreepanelLeft().getRootNode().get('nppr')
        };

        if (this.getTreepanelLeft().getRootNode().hasChildNodes()) {
            dataObjLeft = this.bindVags(dataObjLeft, this.getTreepanelLeft());
        }

        var dataObjRight = {
            hid: this.getTreepanelRight().getRootNode().get('hid'),
            direction: this.getTreepanelRight().getRootNode().get('direction'),
            nppr: this.getTreepanelRight().getRootNode().get('nppr')
        };

        if (this.getTreepanelRight().getRootNode().hasChildNodes()) {
            dataObjRight = this.bindVags(dataObjRight, this.getTreepanelRight());
        }

        var url = 'ky2/secure/BindPoezdAndPoezd.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode([dataObjLeft, dataObjRight]), action: 'bind_poezd_to_poezd'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                var respObj = Ext.decode(response.responseText);
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    bindVags: function (dataObj, treepanel) {
        var vagIndex = 0;

        dataObj['vagons'] = [];

        treepanel.getRootNode().eachChild(function (vagNodeModel) { // write vags
            var vagDataObj = {};
            vagDataObj['hid'] = vagNodeModel.get('hid');
            vagDataObj['sort'] = vagNodeModel.get('sort');
            vagDataObj['otpravka'] = vagNodeModel.get('otpravka');
            vagDataObj['nvag'] = vagNodeModel.get('nvag');

            dataObj['vagons'].push(vagDataObj);

            if (vagNodeModel.hasChildNodes()) {
                if (vagNodeModel.get('otpravka') === 'CONT') {
                    this.bindConts(vagNodeModel, vagDataObj);
                } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
                    this.bindGryzy(vagNodeModel, vagDataObj);
                }
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    bindConts: function (vagNodeModel, vagDataObj) {
        var contIndex = 0;
        vagDataObj['konts'] = [];

        vagNodeModel.eachChild(function (contNodeModel) {  // write conts
            var contDataObj = {};
            contDataObj['hid'] = contNodeModel.get('hid');
            contDataObj['sort'] = contNodeModel.get('sort');
            contDataObj['nkon'] = contNodeModel.get('nkon');

            vagDataObj['konts'].push(contDataObj);

            if (contNodeModel.hasChildNodes()) {
                this.bindGryzy(contNodeModel, contDataObj);
            }

            contIndex++;
        }, this);
    },

    bindGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (gryzNodeModel) {
            var gruzDataObj = {};
            gruzDataObj['hid'] = gryzNodeModel.get('hid');
            gruzDataObj['sort'] = gryzNodeModel.get('sort');
            gruzDataObj['kgvn'] = gryzNodeModel.get('kgvn');

            dataObj['gruzs'].push(gruzDataObj);

            gryzIndex++;
        }, this);
    },

    changeLeftView: function (field, newValue, oldValue) {
        switch (newValue['leftBindView']) {
            case 'all':
                break;
            case 'noVags':
                break;
        }
    },

    selectionchangeLeft: function (selModel, selected) {
        this.selectionchange(selModel, selected, this.selectedNodesLeft);
    },

    selectionchangeRight: function (selModel, selected) {
        this.selectionchange(selModel, selected, this.selectedNodesRight);
    },

    selectionchange: function (selModel, selected, selectedNodes, checkSelectedFn) {
        var checkSelected = checkSelectedFn || this.checkSelected; // in yards another checkSelectedFn
        if (selModel.getLastSelected() && selected[0]) {
            if (selected.length > 1 && !checkSelected(selected)) { // has wrong selection
                for (var i = 0; i < selected.length; i++) {      // remove last selections
                    var found = false;
                    for (var y = 0; y < selectedNodes.length; y++) {
                        if (selected[i].get('hid') === selectedNodes[y].get('hid') && selected[i].get('who') === selectedNodes[y].get('who')) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        selModel.deselect(selected[i], true);
                    }
                }
                return;
            }

            while (selectedNodes.length) {
                selectedNodes.pop(); // clear array
            }
            for (var z = 0; z < selected.length; z++) {
                selectedNodes.push(selected[z]);
            }
        }
    },

    checkSelected: function (selected) {
        if (!selected || selected.length < 2) {
            return true;
        }

        var vags = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'vag';
        });
        if (vags.length !== 0) {   // vags can't be more than 1
            return false;
        }

        var conts = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'cont';
        });
        if (conts.length === selected.length) {// all selected must be conts
            return true;
        }

        var gryzy = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'gryz';
        });
        if (gryzy.length === selected.length) {
            gryzy = Ext.Array.filter(selected, function (item, index, array) {
                return item.parentNode.get('who') === 'vag';// parent can be only vag
            });
            if (gryzy.length === selected.length) {
                return true;
            }
        }

        return false;
    },

    moveNodesRight: function (btn) {
        this.moveNodes(this.getTreepanelLeft(), this.getTreepanelRight());
    },

    moveNodesLeft: function (btn) {
        this.moveNodes(this.getTreepanelRight(), this.getTreepanelLeft());
    },

    beforeDropToVag: function (targetModel, position, dragData) {
        return this.checkBeforeMoveToVag(dragData.records, targetModel);
    },

    checkBeforeMoveToVag: function (records, targetModel) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check source
            isDrop = sourceModel.get('who') !== 'vag'; // vag can't be moved
            if (isDrop) { // can be moved cont in vag, gruz in vag
                isDrop = sourceParentModel.get('who') === 'vag';
            }

            // check target
            if (isDrop) { // can be dropped only in vag
                isDrop = targetModel.get('who') === 'vag' /*&& sourceParentModel.parentNode.get('hid') !== targetModel.parentNode.get('hid')*/;
            }
            if (isDrop) { // vag otpravka should be null or the same as in source parent model
                isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
            }

            this.cacheDistinctSourceModels(isDrop, sourceParentModel, this.sourceVagModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    cacheDistinctSourceModels: function(isDrop, sourceParentModel, sourceVagModels){
        if (isDrop) {    // save distinct sourceVagModels
            var found = false;
            for (var y = 0; y < sourceVagModels.length; y++) {
                if (sourceVagModels[y].get('hid') === sourceParentModel.get('hid')) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                sourceVagModels.push(sourceParentModel); // save sourceParentModel to later use it in drop event
            }
        } else {
            while (sourceVagModels.length) {
                sourceVagModels.pop(); // clear array
            }
        }
    },

    moveNodes: function (sourcePanel, targetPanel) {
        var sourceNodes = sourcePanel.getSelectionModel().getSelection();
        if (sourceNodes.length === 0) {
            return;
        }

        var targetNode = targetPanel.getSelectionModel().getLastSelected(); // move only in one place
        if (!targetNode || targetPanel.getSelectionModel().getSelection().length > 1) {
            return;
        }

        if(!this.checkBeforeMoveToVag(sourceNodes, targetNode)) {
            return;
        }

        for (var y = 0; y < sourceNodes.length; y++) {
            targetNode.insertChild(targetNode.childNodes.length, sourceNodes[y]); // appendChild don't work, no need to remove before insert
        }

        this.afterDropToVag(sourceNodes, targetNode);
    },

    afterDropToVag: function (records, targetVagModel) {
        var sourceModel = records[0];   // all models go in one place

        if (sourceModel.get('who') === 'cont') {
            targetVagModel.set('otpravka', 'CONT');
        } else if (sourceModel.get('who') === 'gryz') {
            targetVagModel.set('otpravka', 'GRUZ');
        }

        this.sortChildNodes(targetVagModel);

        for (var i = 0; i < this.sourceVagModels.length; i++) {
            if (!this.sourceVagModels[i].hasChildNodes()) {
                this.sourceVagModels[i].set('otpravka', undefined);
            } else {
                this.sortChildNodes(this.sourceVagModels[i]);
            }
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesLeft = [];
        this.selectedNodesRight = [];
        this.sourceVagModels = [];
    },

    dropToVag: function (node, dragData, targetVagModel, dropPosition) {
        this.afterDropToVag(dragData.records, targetVagModel);
    }
});