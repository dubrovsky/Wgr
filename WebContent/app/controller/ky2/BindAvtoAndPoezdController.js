Ext.define('TK.controller.ky2.BindAvtoAndPoezdController', {
    extend: 'Ext.app.Controller',

    selectedNodesPoezd: [],  // last selection
    selectedNodesAvto: [],  // last selection
    sourceVagModels: [],   // to use in after drop event
    sourceAvtoModels: [],   // to use in after drop event

    views: [
        'ky2.avto.into.Avto2PoezdBindTreeForm',
        'ky2.avto.out.Avto2PoezdBindTreeForm'
    ],
    models: [
        'ky2.PoezdBindTreeNode',
        'ky2.AvtoBindTreeNode'
    ],
    stores: [
        'ky2.PoezdBindTreeRightNodes',
        'ky2.AvtoBindTreeLeftNodes'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'avtolist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'avtoform',
        selector: 'viewport > tabpanel ky2avtobindtreeform'
    }, {
        ref: 'treepanelLeft',
        selector: 'ky2avtobindtreeform > treepanel#treepanelLeft'
    }, {
        ref: 'treepanelRight',
        selector: 'ky2avtobindtreeform > treepanel#treepanelRight'
    }],

    init: function () {
        this.control({
            'ky2avtobindtreeform': {
                beforedestroy: this.getController('ky2.BindAvtoAndAvtoController').clearBindForm
            },
            'ky2avtointolist button[action="getAvtoAndPoezdForBind"]': {
                click: this.getAvtoIntoAndPoezdForBind
            },
            'ky2avtooutlist button[action="getAvtoAndPoezdForBind"]': {
                click: this.getAvtoOutAndPoezdForBind
            },

            // 'ky2poezd2avtobindtreeforminto treepanel#treepanelLeft': {
            //     selectionchange: this.selectionchangePoezd
            // },
            // 'ky2poezd2avtobindtreeforminto treepanel#treepanelRight': {
            //     selectionchange: this.selectionchangeAvto
            // },
            // 'ky2poezd2avtobindtreeformout treepanel#treepanelLeft': {
            //     selectionchange: this.selectionchangePoezd
            // },
            // 'ky2poezd2avtobindtreeformout treepanel#treepanelRight': {
            //     selectionchange: this.selectionchangeAvto
            // },
            'ky2avto2poezdbindtreeforminto treepanel#treepanelLeft > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            'ky2avto2poezdbindtreeformout treepanel#treepanelRight > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2avto2poezdbindtreeformout treepanel#treepanelLeft > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            'ky2avto2poezdbindtreeforminto treepanel#treepanelRight > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2avto2poezdbindtreeforminto button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2avto2poezdbindtreeforminto button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            'ky2avto2poezdbindtreeformout button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2avto2poezdbindtreeformout button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            // 'ky2poezd2avtobindtreeforminto button[action=hideVags]': {
            //     click: this.hideVagsLeft
            // },
            // 'ky2poezd2avtobindtreeforminto button[action=showVags]': {
            //     click: this.showVagsLeft
            // },
            // 'ky2poezd2avtobindtreeformout button[action=hideVags]': {
            //     click: this.hideVagsLeft
            // },
            // 'ky2poezd2avtobindtreeformout button[action=showVags]': {
            //     click: this.showVagsLeft
            // },
            'ky2avto2poezdbindtreeforminto button[action=save]': {
                click: this.bindAvtoAndPoezd
            },
            'ky2avto2poezdbindtreeformout button[action=save]': {
                click: this.bindAvtoAndPoezd
            },
            'ky2avto2poezdbindtreeforminto button[action=saveExit]': {
                click: this.bindAvtoAndPoezdAndExit
            },
            'ky2avto2poezdbindtreeformout button[action=saveExit]': {
                click: this.bindAvtoAndPoezdAndExit
            }
        });
    },

    getAvtoIntoAndPoezdForBind: function (btn) {
        this.getAvtoOutAndPoezdForBindCheck('ky2avto2poezdbindtreeforminto', 2);
    },

    getAvtoOutAndPoezdForBind: function (btn) {
        this.getAvtoOutAndPoezdForBindCheck('ky2avto2poezdbindtreeformout', 1);
    },

    getAvtoOutAndPoezdForBindCheck: function (widget, direction) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        this.getAvtoAndPoezdForBind(widget, avtolist.getSelectionModel().getLastSelected().get('hid'), direction);
    },

    getAvtoAndPoezdForBind: function (widget, avtoHId, direction) {
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'ky2/secure/BindAvtoAndPoezd.do',
            params: {
                action: 'get_avto_and_poezd_for_bind',
                'avtoHid': avtoHId,
                routeId: this.getMenutree().lastSelectedLeaf.id.split('_')[2],
                direction: direction
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    var respObj = Ext.decode(response.responseText);
                    var avtoObj = respObj['rows'][0];
                    var poezdArr = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: '+ На поезд'});

                    //// fill trees
                    // var vags = avtoObj['vagons'];
                    this.getTreepanelLeft().setTitle(this.getController('ky2.BindAvtoAndAvtoController').titleForAvto("Авто № " + avtoObj['no_avto'] + '<br/>'));
                    var rootNode = this.getTreepanelLeft().getRootNode();
                    // if (vags && !Ext.Object.isEmpty(vags)) {
                        this.getController('ky2.BindAvtoAndAvtoController').initRootNode(rootNode, avtoObj);
                    // }

                    this.getTreepanelRight().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(''));
                    rootNode = this.getTreepanelRight().getRootNode();
                    if (poezdArr && poezdArr.length > 0) {
                        this.getController('ky2.BindPoezdAndPoezdController').initPoezdsNodes(poezdArr, rootNode);
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
    selectionchangePoezd: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesPoezd);
    },

    selectionchangeAvto: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesAvto, this.checkSelectedInAvto, this);
    },

    checkSelectedInAvto: function (selected) {
        if (!selected || selected.length < 2) {
            return true;
        }

        // parent model can be avto
        var avtos = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'avto';
        });
        if (avtos.length !== 0) {   // avtos can't be more than 1, it's checked in first if
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
        if (gryzy.length === selected.length) { // check gruzy only in vag
            gryzy = Ext.Array.filter(selected, function (item, index, array) {
                return item.parentNode.get('who') === 'avto';// parent can be only avto
            });
            if (gryzy.length === selected.length) {
                return true;
            }
        }

        return false;
    },

    dropToVag: function (node, dragData, targetVagModel, dropPosition) {
        this.afterDropToVag(dragData.records, targetVagModel);
    },

    afterDropToVag: function (records, targetVagModel) {
        var sourceModel = records[0];

        if (sourceModel.get('who') === 'cont') {
            targetVagModel.set('otpravka', 'CONT');
        } else if (sourceModel.get('who') === 'gryz') {
            targetVagModel.set('otpravka', 'GRUZ');
        }

        this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(targetVagModel);

        for (var i = 0; i < records.length; i++) {
            if (records[i].get('avtoHid')) { // diff trees - move from avto
                for (var y = 0; y < this.sourceAvtoModels.length; y++) {
                    if (records[i].get('avtoHid') === this.sourceAvtoModels[y].get('hid')) { // this.sourceYardModels here yards
                        // this.sourceYardModels[y].parentNode.set('contsInYardSector', (this.sourceYardModels[y].parentNode.get('contsInYardSector') - 1));
                        // this.updateYardSectorModelText(this.sourceYardModels[y].parentNode);
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
            records[i].set('avtoHid', null);
            records[i].set('poezdHid', records[i].parentNode.parentNode.get('poezdHid'));
            records[i].set('vagHid', records[i].parentNode.get('hid'));
            records[i].set('cls', 'selectTreeNode');
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesAvto = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceAvtoModels = [];
    },

    dropToAvto: function (node, dragData, targetYardModel, dropPosition) {
        this.afterDropToAvto(dragData.records, targetYardModel);
    },

    afterDropToAvto: function (records, targetModel) {
        for (var i = 0; i < records.length; i++) {
            if (records[i].get('avtoHid')) {  // diff trees - move from poezd
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
                for (var y = 0; y < this.sourceAvtoModels.length; y++) { // // this.sourceAvtoModels
                    if (records[i].get('avtoHid') === this.sourceAvtoModels[y].get('hid')) {
                        // this.sourceYardModels[y].parentNode.set('contsInYardSector', (this.sourceYardModels[y].parentNode.get('contsInYardSector') - 1));
                        // this.updateYardSectorModelText(this.sourceYardModels[y].parentNode);
                        break;
                    }
                }
            }

            records[i].set('avtoHid', records[i].parentNode.get('hid'));
            records[i].set('cls', 'selectTreeNode');

            records[i].set('poezdHid', null);
            records[i].set('vagHid', null);
            // records[i].set('sort', 0);  // ????
            this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(records[i].parentNode);
        }

        // targetModel.set('contsInYardSector', (targetModel.get('contsInYardSector') + records.length));
        // this.updateYardSectorModelText(targetModel);

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesAvto = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceAvtoModels = [];
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
            isDrop = sourceModel.get('who') === 'cont' || sourceModel.get('who') === 'gryz';
            if (isDrop) { // can be moved cont
                isDrop = sourceParentModel.get('who') === 'avto' || sourceParentModel.get('who') === 'vag'; // move in same tree
            }

            // check target
            if (isDrop) { // can be dropped only in vag
                isDrop = targetModel.get('who') === 'vag';
            }
            if (isDrop) { // vag otpravka should be null or CONT
                // isDrop = !targetModel.get('otpravka') || !sourceParentModel.get('otpravka') ||  sourceParentModel.get('otpravka') === targetModel.get('otpravka');
                isDrop = !targetModel.get('otpravka') || !targetModel.hasChildNodes() || records[i].get('who') === targetModel.getChildAt(0).get('who');
            }
            if (isDrop) {
                isDrop = sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'avto' ? this.sourceAvtoModels : this.sourceVagModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    beforeDropToAvto: function (targetModel, position, dragData) {
        return this.checkBeforeMoveToAvto(dragData.records, targetModel);
    },

    checkBeforeMoveToAvto: function (records, targetModel, optParams) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check source
            isDrop = sourceModel.get('who') === 'cont' || sourceModel.get('who') === 'gryz';
            if (isDrop) {
                isDrop = (sourceParentModel.get('who') === 'vag' && (sourceParentModel.get('otpravka') === 'CONT' || sourceParentModel.get('otpravka') === 'GRUZ'))
                    || sourceParentModel.get('who') === 'avto'; // can be moved in same yard
            }

            // check target
            if (isDrop) { // can be dropped only in avto
                isDrop = targetModel.get('who') === 'avto';
            }
            /*if (isDrop && (!optParams || optParams['checkFreePlaces'])) { // check free places
                isDrop = (targetModel.get('contsInYardSector') + records.length <= targetModel.get('placesInYardSector'));
            }*/
            if (isDrop) {
                // isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka'); // vag otpravka should be null or the same as in source parent model
                isDrop = !targetModel.hasChildNodes() || records[i].get('who') === targetModel.getChildAt(0).get('who');
            }
            if (isDrop) {
                isDrop = sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'vag' ? this.sourceVagModels : this.sourceAvtoModels);
            if (!isDrop) {
                break;
            }
        }

        return isDrop;
    },

    moveNodesRight: function (btn) {
        this.getController('ky2.BindAvtoAndAvtoController').moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToVag, this.afterDropToVag, this);
    },

    moveNodesLeft: function (btn) {
        this.getController('ky2.BindAvtoAndAvtoController').moveNodes(this.getTreepanelRight(), this.getTreepanelLeft(), this.checkBeforeMoveToAvto, this.afterDropToAvto, this);
    },

    // hideVagsLeft: function (btn) {
    //     this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
    //         if (vagNodeModel.get('who') === 'vag' || vagNodeModel.get('who') === 'avto') {
    //             vagNodeModel.set('cls', 'hideTreeNode');
    //         }
    //     }, this);
    // },
    //
    // showVagsLeft: function (btn) {
    //     this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
    //         if (vagNodeModel.get('who') === 'vag' || vagNodeModel.get('who') === 'avto') {
    //             vagNodeModel.set('cls', 'showTreeNode');
    //         }
    //     }, this);
    // },

    bindAvtoAndPoezdAndExit: function () {
        this.bindAvtoAndPoezd(1);
    },

    bindAvtoAndPoezd: function (close) {
        var dataObjLeft = this.getController('ky2.BindAvtoAndAvtoController').bindAvto(this.getTreepanelLeft().getRootNode());
        var dataObjRight = this.getController('ky2.BindPoezdAndPoezdController').bindPoezds(this.getTreepanelRight().getRootNode());

        var url = 'ky2/secure/BindAvtoAndPoezd.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {avtoObj: Ext.encode(dataObjLeft), poezdsObj: Ext.encode(dataObjRight), action: 'bind_avto_and_poezd'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                if (Ext.isNumber(close)) {
                    var closeBtn = this.getAvtoform().down('button[action="close"]');
                    closeBtn.fireEvent('click',closeBtn);
                }
                else {
                    var respObj = Ext.decode(response.responseText);
                }
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    }

});