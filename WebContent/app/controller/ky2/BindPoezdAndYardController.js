Ext.define('TK.controller.ky2.BindPoezdAndYardController', {
    extend: 'Ext.app.Controller',

    selectedNodesPoezd: [],  // last selection
    selectedNodesYard: [],  // last selection
    sourceVagModels: [],   // to use in after drop event
    sourceYardModels: [],   // to use in after drop event

    views: [
        'ky2.poezd.into.Poezd2PoezdBindTreeForm',
        'ky2.poezd.out.Poezd2PoezdBindTreeForm',
        'ky2.poezd.into.Poezd2YardBindTreeForm',
        'ky2.poezd.out.Poezd2YardBindTreeForm',
        'ky2.poezd.AbstractPoezd2YardBindTreeForm'
    ],
    models: [
        'ky2.YardBindTreeNode',
        'ky2.PoezdBindTreeNode'
    ],
    stores: [
        'ky2.PoezdBindTreeLeftNodes',
        'ky2.PoezdBindTreeRightNodes',
        'ky2.YardBindTreeNodes'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
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
                beforedestroy: this.getController('ky2.BindPoezdAndPoezdController').clearBindForm
            },
            'ky2poezdintolist button[action="getPoesdAndYardForBind"]': {
                click: this.getPoesdIntoAndYardForBind
            },
            'ky2poezdoutlist button[action="getPoesdAndYardForBind"]': {
                click: this.getPoesdOutAndYardForBind
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelLeft': {
                selectionchange: this.selectionchangePoezd
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelRight': {
                selectionchange: this.selectionchangeYard
            },
            'ky2poezd2yardbindtreeformout treepanel#treepanelLeft': {
                selectionchange: this.selectionchangePoezd
            },
            'ky2poezd2yardbindtreeformout treepanel#treepanelRight': {
                selectionchange: this.selectionchangeYard
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelRight > treeview': {
                drop: this.dropToYard,
                nodedragover: this.beforeDropToYard
            },
            'ky2poezd2yardbindtreeformout treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2yardbindtreeformout treepanel#treepanelRight > treeview': {
                drop: this.dropToYard,
                nodedragover: this.beforeDropToYard
            },
            'ky2poezd2yardbindtreeforminto button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2poezd2yardbindtreeforminto button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            'ky2poezd2yardbindtreeforminto button[action=moveRightAll]': {
                click: this.moveAllNodesRight
            },
            'ky2poezd2yardbindtreeformout button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2poezd2yardbindtreeformout button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            'ky2poezd2yardbindtreeformout button[action=moveRightAll]': {
                click: this.moveAllNodesRight
            },
            'ky2poezd2yardbindtreeforminto button[action=save]': {
                click: this.bindPoezdAndYard
            },
            'ky2poezd2yardbindtreeformout button[action=save]': {
                click: this.bindPoezdAndYard
            },
            'ky2poezd2yardbindtreeforminto button[action=hideVags]': {
                click: this.hideVagsLeft
            },
            'ky2poezd2yardbindtreeforminto button[action=showVags]': {
                click: this.showVagsLeft
            },
            'ky2poezd2yardbindtreeformout button[action=hideVags]': {
                click: this.hideVagsLeft
            },
            'ky2poezd2yardbindtreeformout button[action=showVags]': {
                click: this.showVagsLeft
            }
        });
    },

    getPoesdIntoAndYardForBind: function (btn) {
        this.getPoesdAndYardForBind('ky2poezd2yardbindtreeforminto');
    },

    getPoesdOutAndYardForBind: function (btn) {
        this.getPoesdAndYardForBind('ky2poezd2yardbindtreeformout');
    },

    getPoesdAndYardForBind: function (widget) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'ky2/secure/BindPoezdAndYard.do',
            params: {
                action: 'get_poezd_and_yard_for_bind',
                'poezdHid': poezdlist.getSelectionModel().getLastSelected().get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    var respObj = Ext.decode(response.responseText);
                    var poezdObj = respObj['rows'][0];
                    var yardSectorArr = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: '+ На конт. площадку'});

                    //// fill trees
                    var vags = poezdObj['vagons'];
                    this.getTreepanelLeft().setTitle(poezdObj['nppr']);
                    var rootNode = this.getTreepanelLeft().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        /*rootNode.set('hid', poezdObj['hid']); // poezd hid
                        rootNode.set('direction', poezdObj['direction']);
                        rootNode.set('nppr', poezdObj['nppr']);
                        this.getController('ky2.BindPoezdAndPoezdController').initVagsNodes(vags, rootNode, true);*/
                        this.initRootNode(rootNode, poezdObj, vags);
                        // rootNode.expand();
                    }

                    this.getTreepanelRight().setTitle('Контейнерная площадка');
                    rootNode = this.getTreepanelRight().getRootNode();
                    if (yardSectorArr && yardSectorArr.length > 0) {
                        this.initYardSectorNodes(yardSectorArr, rootNode);
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

    initRootNode: function (rootNode, dataObj, vags) {
        rootNode.set('hid', dataObj['hid']);
        rootNode.set('poezdHid', dataObj['hid']); // poezd hid
        rootNode.set('direction', dataObj['direction']);
        rootNode.set('nppr', dataObj['nppr']);
        rootNode.set('who', 'poezd');
        this.getController('ky2.BindPoezdAndPoezdController').initVagsNodes(vags, rootNode, true);
    },

    initYardSectorNodes: function (yardSectorArr, rootNode) {
        for (var i = 0; i < yardSectorArr.length; i++) {
            var yardSector = yardSectorArr[i],
                yards = yardSector['yards'],
                yardSectorModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: '',
                    who: 'yardsector',
                    leaf: false,
                    iconCls: 'cont',
                    allowDrag: false,
                    expanded: true
                    // expanded: (yards && yards['0']) && i === 0
                });

            Ext.Object.each(yardSector, function (prop, value) {
                yardSectorModel.set(prop, value);
            }, this);

            rootNode.appendChild(yardSectorModel);
            if (yards && yards.length > 0) {
                var contsSum = this.initYardNodes(yards, i, yardSectorModel);

                yardSectorModel.set('contsInYardSector', contsSum);
                yardSectorModel.set('placesInYardSector', yards.length);
                this.updateYardSectorModelText(yardSectorModel);
            }
        }
    },

    updateYardSectorModelText: function (yardSectorModel) {
        yardSectorModel.set('text', yardSectorModel.get('name') + ' (' + yardSectorModel.get('contsInYardSector') + '/' + yardSectorModel.get('placesInYardSector') + ')');
        yardSectorModel.commit(true); // to remove red triangle
    },

    initYardNodes: function (yards, yardIndx, yardSectorModel) {
        var contsSum = 0;
        for (var i = 0; i < yards.length; i++) {
            var yard = yards[i],
                conts = yard['konts'],
                yardModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: yard['x'] + '/' + yard['y'] + '/' + yard['z'],
                    x: yard['x'],
                    y: yard['y'],
                    z: yard['z'],
                    who: 'yard',
                    yardSectorHid: yardSectorModel.get('hid'),
                    leaf: false,
                    iconCls: 'vag',
                    cls: 'hideTreeNode',
                    allowDrag: false,
                    expanded: true
                    // expanded: yardIndx === 0 && (conts && conts['0']) && i === 0
                });

            Ext.Object.each(yard, function (prop, value) {
                yardModel.set(prop, value);
            }, this);
            yardSectorModel.appendChild(yardModel);     // view without yard places
            if (conts && conts.length > 0) {
                this.initContsNodes(conts, yardModel/*, yardSectorModel*/);
                // this.initContsNodes(conts, yardModel, yardSectorModel);
                contsSum += conts.length;
            }
        }
        return contsSum;
    },

    initContsNodes: function (conts, yardModel/*, yardSectorModel*/) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    yardHid: yardModel.get('hid'),
                    // x: yardModel.get('x'),
                    // y: yardModel.get('y'),
                    // z: yardModel.get('z'),
                    yardSectorHid: yardModel.get('yardSectorHid'),
                    iconCls: 'cont3',
                    allowDrop: false,
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: false
                });

            Ext.Object.each(cont, function (prop, value) {
                contModel.set(prop, value);
            }, this);
            yardModel.appendChild(contModel);
            // yardSectorModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.getController('ky2.BindPoezdAndPoezdController').initGryzyNodes(gryzy, contModel, contIndx, false/*, 'TK.model.ky2.PoezdBindTreeNode'*/);
            }
        }
    },

    selectionchangePoezd: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesPoezd);
    },

    selectionchangeYard: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesYard, this.checkSelectedInYard, this);
    },

    checkSelectedInYard: function (selected) {
        if (!selected || selected.length < 2) {
            return true;
        }

        // parent model can be yardsectors or yard
        var yardsectors = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'yardsector';
        });
        if (yardsectors.length !== 0) {   // yardsectors can't be more than 1, it's checked in first if
            return false;
        }

        var yards = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'yard';
        });
        if (yards.length !== 0) {   // yards can't be more than 1, it's checked in first if
            return false;
        }

        var conts = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'cont';
        });
        if (conts.length === selected.length) {// all selected must be conts
            return true;
        }

        return false;
    },

    beforeDropToVag: function (targetModel, position, dragData) {
        return this.checkBeforeMoveToVag(dragData.records, targetModel);
    },

    beforeDropToYard: function (targetModel, position, dragData) {
        return this.checkBeforeMoveToYard(dragData.records, targetModel);
    },

    checkBeforeMoveToVag: function (records, targetModel) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check source
            isDrop = sourceModel.get('who') === 'cont';
            if (isDrop) { // can be moved cont
                // isDrop = sourceParentModel.get('who') === 'yardsector' || sourceParentModel.get('who') === 'vag'; // yo move in same tree
                isDrop = sourceParentModel.get('who') === 'yard' || sourceParentModel.get('who') === 'vag'; // yo move in same tree
            }

            // check target
            if (isDrop) { // can be dropped only in vag
                isDrop = targetModel.get('who') === 'vag';
            }
            if (isDrop) { // vag otpravka should be null or CONT
                isDrop = !targetModel.get('otpravka') || targetModel.get('otpravka') === 'CONT';
            }
            if (isDrop) {
                isDrop = sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            // this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'yardsector' ? this.sourceYardModels : this.sourceVagModels);
            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'yard' ? this.sourceYardModels : this.sourceVagModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    checkBeforeMoveToYard: function (records, targetModel, optParams) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check source
            isDrop = sourceModel.get('who') === 'cont';
            if (isDrop) {
                // isDrop = (sourceParentModel.get('who') === 'vag' && sourceParentModel.get('otpravka') === 'CONT') || sourceParentModel.get('who') === 'yardsector';
                isDrop = (sourceParentModel.get('who') === 'vag' && sourceParentModel.get('otpravka') === 'CONT') || sourceParentModel.get('who') === 'yard'; // can be moved in same yard
            }

            // check target
            if (isDrop) { // can be dropped only in yardsector
                isDrop = targetModel.get('who') === 'yardsector';
                // isDrop = targetModel.get('who') === 'yard';
            }
            if (isDrop && (!optParams || optParams['checkFreePlaces'])) { // check free places
                isDrop = (targetModel.get('contsInYardSector') + records.length <= targetModel.get('placesInYardSector'));
                // isDrop = (targetModel.parentNode.get('contsInYardSector') + records.length <= targetModel.parentNode.get('placesInYardSector'));
            }
            if (isDrop) {
                isDrop = sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'vag' ? this.sourceVagModels : this.sourceYardModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    dropToVag: function (node, dragData, targetVagModel, dropPosition) {
        this.afterDropToVag(dragData.records, targetVagModel);
    },

    dropToYard: function (node, dragData, targetYardModel, dropPosition) {
        this.afterDropToYard(dragData.records, targetYardModel);
    },

    afterDropToVag: function (records, targetVagModel) {
        targetVagModel.set('otpravka', 'CONT');

        this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(targetVagModel);

        for (var i = 0; i < records.length; i++) {
            // if (records[i].get('yardSectorHid')) { // diff trees - move from yard
            if (records[i].get('yardHid')) { // diff trees - move from yard
                for (var y = 0; y < this.sourceYardModels.length; y++) {
                    // if (records[i].get('yardSectorHid') === this.sourceYardModels[y].get('hid')) {
                    if (records[i].get('yardHid') === this.sourceYardModels[y].get('hid')) { // this.sourceYardModels here yards
                        this.sourceYardModels[y].parentNode.set('contsInYardSector', (this.sourceYardModels[y].parentNode.get('contsInYardSector') - 1));
                        this.updateYardSectorModelText(this.sourceYardModels[y].parentNode);
                        break;
                    }
                }
            } else { // move from same tree, vag
                for (var y = 0; y < this.sourceVagModels.length; y++) {
                    if (records[i].get('vagHid') === this.sourceVagModels[y].get('hid')) {
                        if (!this.sourceVagModels[y].hasChildNodes()) {
                            this.sourceVagModels[y].set('otpravka', undefined);
                        } else {
                            this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(this.sourceVagModels[y]);
                        }
                        break;
                    }
                }
            }
            records[i].set('yardSectorHid', null);
            records[i].set('yardHid', null);
            // records[i].set('x', null);
            // records[i].set('y', null);
            // records[i].set('z', null);
            records[i].set('poezdHid', records[i].parentNode.parentNode.get('poezdHid'));
            records[i].set('vagHid', records[i].parentNode.get('hid'));

            // records[i].set('poezdHid', targetVagModel.get('poezdHid'));
            // records[i].set('vagHid', targetVagModel.get('hid'));
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];
    },

    moveContsToFreeYards: function (records, targetYardSectorModel) {
        if (targetYardSectorModel.get('who') === 'yardsector') {
            for (var i = 0; i < records.length; i++) {
                this.moveContToFreeYard(records[i], targetYardSectorModel);
                /*if (records[i].get('who') === 'cont') {
                    var freeYard;
                    targetYardSectorModel.eachChild(function (yardModel) {
                        if (!yardModel.hasChildNodes()) {
                            freeYard = yardModel;
                            return false;
                        }
                    });
                    if (freeYard) {
                        freeYard.insertChild(freeYard.childNodes.length, records[i]); // appendChild don't work, no need to remove before insert
                    }
                }*/
            }
        }
    },

    moveContToFreeYard: function(contModel, targetYardSectorModel){
        if (contModel.get('who') === 'cont') {
            var freeYard;
            targetYardSectorModel.eachChild(function (yardModel) {
                if (!yardModel.hasChildNodes()) {
                    freeYard = yardModel;
                    return false;
                }
            });
            if (freeYard) {
                freeYard.insertChild(freeYard.childNodes.length, contModel); // appendChild don't work, no need to remove before insert
            }
        }
    },

    afterDropToYard: function (records, targetModel) {
        if (targetModel.get('who') === 'yardsector') { // remove records from sector to free yards
            this.moveContsToFreeYards(records, targetModel);
        }
        for (var i = 0; i < records.length; i++) {
            if (records[i].get('vagHid')) {  // diff trees - move from poezd
                for (var y = 0; y < this.sourceVagModels.length; y++) {
                    if (records[i].get('vagHid') === this.sourceVagModels[y].get('hid')) {
                        if (!this.sourceVagModels[y].hasChildNodes()) {
                            this.sourceVagModels[y].set('otpravka', undefined);
                        } else {
                            this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(this.sourceVagModels[y]);
                        }
                        break;
                    }
                }
            } else { // same tree
                // if (records[i].get('yardSectorHid')) { // same tree
                for (var y = 0; y < this.sourceYardModels.length; y++) { // // this.sourceYardModels here yardsectors
                    // if (records[i].get('yardSectorHid') === this.sourceYardModels[y].get('hid')) {
                    if (records[i].get('yardHid') === this.sourceYardModels[y].get('hid')) {
                        this.sourceYardModels[y].set('contsInYardSector', (this.sourceYardModels[y].get('contsInYardSector') - 1));
                        this.updateYardSectorModelText(this.sourceYardModels[y]);
                        break;
                    }
                }
            }

            records[i].set('yardSectorHid', records[i].parentNode.parentNode.get('hid'));
            records[i].set('yardHid', records[i].parentNode.get('hid'));

            /*if(targetModel.get('who') === 'yard') { // !!!!!!!
                records[i].set('yardSectorHid', targetModel.get('yardSectorHid'));
                records[i].set('yardHid', targetModel.get('hid'));
            } else { // yardsector -- added tp empty yard
                records[i].set('yardSectorHid', targetModel.get('hid'));
                records[i].set('yardHid', records[i].parentNode.get('hid'));
            }*/

            records[i].set('poezdHid', null);
            records[i].set('vagHid', null);
            records[i].set('sort', 0);
        }

        targetModel.set('contsInYardSector', (targetModel.get('contsInYardSector') + records.length));
        this.updateYardSectorModelText(targetModel);

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];
    },

    moveNodesRight: function (btn) {
        this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToYard, this.afterDropToYard, this);
    },

    moveNodesLeft: function (btn) {
        this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelRight(), this.getTreepanelLeft(), this.checkBeforeMoveToVag, this.afterDropToVag, this);
    },

    moveAllNodesRight: function (btn) {
        var contNodes = [];
        this.getTreepanelLeft().getRootNode().eachChild(function (vagModel) {
            /*if (model1.get('who') === 'cont') {
                contNodes.push(model1);
            } else {
                model1.eachChild(function (model2) {
                    if (model2.get('who') === 'cont') {
                        contNodes.push(model2);
                    }
                });
            }*/
            vagModel.eachChild(function (model2) {
                if (model2.get('who') === 'cont') { // can be gruz or cont
                    contNodes.push(model2);
                }
            });
        });
        if (contNodes.length === 0) {
            return;
        }

        var targetNode = this.getTreepanelRight().getSelectionModel().getLastSelected(); // move only in one place
        if (!targetNode || this.getTreepanelRight().getSelectionModel().getSelection().length > 1) {
            return;
        }
        if (targetNode.get('who') !== 'yardsector') {
            return;
        }
        if (targetNode.get('contsInYardSector') >= targetNode.get('placesInYardSector')) {
            return;
        }

        if (!this.checkBeforeMoveToYard(contNodes, targetNode, {checkFreePlaces: false})) {
            return;
        }

        var insertedContsNodes = []; // not all nodes can be inserted
        var contsInYardSector = targetNode.get('contsInYardSector');
        for (var i = 0; i < contNodes.length; i++) {
            if (contsInYardSector < targetNode.get('placesInYardSector')) { // check free places
                // targetNode.insertChild(targetNode.childNodes.length, contNodes[i]); // appendChild don't work, no need to remove before insert
                this.moveContToFreeYard(contNodes[i], targetNode);
                contsInYardSector++;
                insertedContsNodes.push(contNodes[i]);
            } else {
                break;
            }
        }
        if (insertedContsNodes.length > 0) {
            this.afterDropToYard(insertedContsNodes, targetNode);
        }
    },

    bindPoezdAndYard: function (btn) {
        var dataObjLeft = this.getController('ky2.BindPoezdAndPoezdController').bindPoezd(this.getTreepanelLeft().getRootNode());
        var dataObjRight = this.bindYardSectors(this.getTreepanelRight().getRootNode());

        var url = 'ky2/secure/BindPoezdAndYard.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {
                poezdObj: Ext.encode(dataObjLeft),
                yardSectorsObj: Ext.encode(dataObjRight),
                action: 'bind_poezd_and_yard'
            },
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

    bindYardSectors: function (rootNodeModel) {
        var dataObj = [];

        if (rootNodeModel.hasChildNodes()) {
            var yardSectorIndex = 0;
            rootNodeModel.eachChild(function (yardSectorNodeModel) {
                var yardSectorDataObj = {};
                yardSectorDataObj['hid'] = yardSectorNodeModel.get('hid');
                yardSectorDataObj['name'] = yardSectorNodeModel.get('name');

                dataObj.push(yardSectorDataObj);

                if (yardSectorNodeModel.hasChildNodes()) {
                    this.bindYards(yardSectorNodeModel, yardSectorDataObj);
                }

                yardSectorIndex++;
            }, this);
        }

        return dataObj;
    },

    bindYards: function (yardSectorNodeModel, yardSectorDataObj) {
        var yardIndex = 0;

        yardSectorDataObj['yards'] = [];
        yardSectorNodeModel.eachChild(function (nodeModel) {
            var yardDataObj = {};
            yardDataObj['x'] = nodeModel.get('x');
            yardDataObj['y'] = nodeModel.get('y');
            yardDataObj['z'] = nodeModel.get('z');
            yardSectorDataObj['yards'].push(yardDataObj);

            /*if (nodeModel.get('who') === 'cont') {
                yardDataObj['hid'] = nodeModel.get('yardHid');// no yard places
                var yardModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    hid: nodeModel.get('yardHid'),
                    yardSectorHid: yardSectorNodeModel.get('hid'),
                    who: 'yard'
                });
                yardModel.appendChild(nodeModel.copy(null, true));  // work only copt
                this.getController('ky2.BindPoezdAndPoezdController').bindConts(yardModel, yardDataObj);  // add cont to virtual place
                yardModel.destroy();
            } else {*/
            yardDataObj['hid'] = nodeModel.get('hid');
            if (nodeModel.hasChildNodes()) {
                this.getController('ky2.BindPoezdAndPoezdController').bindConts(nodeModel, yardDataObj);
            }
            // }
            yardIndex++;
        }, this);
    },

    hideVagsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag') {
                vagNodeModel.set('cls', 'hideTreeNode');
            }
        }, this);
    },

    showVagsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag') {
                vagNodeModel.set('cls', 'showTreeNode');
            }
        }, this);
    }
});