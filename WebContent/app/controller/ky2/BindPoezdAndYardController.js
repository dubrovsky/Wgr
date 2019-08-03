Ext.define('TK.controller.ky2.BindPoezdAndYardController', {
    extend: 'Ext.app.Controller',

    selectedNodesPoezd: [],
    selectedNodesYard: [],
    sourceVagModels: [],
    sourceYardModels: [],

    views: [
        'ky2.poezd.into.Poezd2PoezdBindTreeForm',
        'ky2.poezd.out.Poezd2PoezdBindTreeForm',
        'ky2.poezd.into.Poezd2YardBindTreeForm'
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
            'ky2poezd2yardbindtreeforminto treepanel#treepanelLeft': {
                selectionchange: this.selectionchangePoezd
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelRight': {
                selectionchange: this.selectionchangeYard
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2yardbindtreeforminto treepanel#treepanelRight > treeview': {
                drop: this.dropToYard,
                nodedragover: this.beforeDropToYard
            }
        });
    },

    getPoesdIntoAndYardForBind: function (btn) {
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

                    var bindcontainer = Ext.widget('ky2poezd2yardbindtreeforminto', {title: '+ На конт. площадку'});

                    //// fill trees
                    var vags = poezdObj['vagons'];
                    this.getTreepanelLeft().setTitle(poezdObj['nppr']);
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        rootNode.set('hid', poezdObj['hid']); // poezd hid
                        rootNode.set('direction', poezdObj['direction']);
                        rootNode.set('nppr', poezdObj['nppr']);
                        this.getController('ky2.BindPoezdAndPoezdController').initVagsNodes(vags, rootNode, true);
                        // rootNode.expand();
                    }

                    this.getTreepanelRight().setTitle('Контейнерная площадка');
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
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

    initYardSectorNodes: function (yardSectorArr, rootNode) {
        for (var i = 0; i < yardSectorArr.length; i++) {
            var yardSector = yardSectorArr[i],
                yards = yardSector['yards'],
                yardSectorModel = Ext.create('TK.model.ky2.YardBindTreeNode', {
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
                yardModel = Ext.create('TK.model.ky2.YardBindTreeNode', {
                    text: yard['x'] + '/' + yard['y'] + '/' + yard['z'],
                    who: 'yard',
                    yardSectorHid: yardSectorModel.get('hid'),
                    leaf: false,
                    iconCls: 'vag',
                    allowDrag: false,
                    expanded: true
                    // expanded: yardIndx === 0 && (conts && conts['0']) && i === 0
                });

            Ext.Object.each(yard, function (prop, value) {
                yardModel.set(prop, value);
            }, this);
            // yardSectorModel.appendChild(yardModel);     // view without yard places
            if (conts && conts.length > 0) {
                this.initContsNodes(conts, yardModel, yardSectorModel);
                contsSum += conts.length;
            }
        }
        return contsSum;
    },

    initContsNodes: function (conts, yardModel, yardSectorModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.YardBindTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    yardHid: yardModel.get('hid'),
                    yardSectorHid: yardModel.get('yardSectorHid'),
                    iconCls: 'cont3',
                    allowDrop: false,
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: false
                });

            Ext.Object.each(cont, function (prop, value) {
                contModel.set(prop, value);
            }, this);
            yardSectorModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.getController('ky2.BindPoezdAndPoezdController').initGryzyNodes(gryzy, contModel, contIndx, false, 'TK.model.ky2.YardBindTreeNode');
            }
        }
    },

    selectionchangePoezd: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesPoezd);
    },

    selectionchangeYard: function (selModel, selected) {
        this.getController('ky2.BindPoezdAndPoezdController').selectionchange(selModel, selected, this.selectedNodesYard, this.checkSelectedInYard);
    },

    checkSelectedInYard: function (selected) {
        if (!selected || selected.length < 2) {
            return true;
        }

        var yardsectors = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'yardsector';
        });
        if (yardsectors.length !== 0) {   // yardsectors can't be more than 1
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
            // check yards
            isDrop = sourceModel.get('who') === 'cont';
            if (isDrop) { // can be moved cont
                isDrop = sourceParentModel.get('who') === 'yardsector';
            }

            // check vags
            if (isDrop) { // can be dropped only in vag
                isDrop = targetModel.get('who') === 'vag';
            }
            if (isDrop) { // vag otpravka should be null or CONT
                isDrop = !targetModel.get('otpravka') || targetModel.get('otpravka') === 'CONT';
            }

            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, this.sourceYardModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    checkBeforeMoveToYard: function (records, targetModel) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check vags
            isDrop = sourceModel.get('who') === 'cont';
            if (isDrop) {
                isDrop = sourceParentModel.get('who') === 'vag' && sourceParentModel.get('otpravka') === 'CONT';
            }

            // check yards
            if (isDrop) { // can be dropped only in yardsector
                isDrop = targetModel.get('who') === 'yardsector';
            }

            this.getController('ky2.BindPoezdAndPoezdController').cacheDistinctSourceModels(isDrop, sourceParentModel, this.sourceVagModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    dropToVag: function (node, dragData, targetVagModel, dropPosition) {
        this.afterDropToVag(dragData.records, targetVagModel);
    },

    dropToYard: function (node, dragData, targetVagModel, dropPosition) {
        this.afterDropToYard(dragData.records, targetVagModel);
    },

    afterDropToVag: function (records, targetVagModel) {
        targetVagModel.set('otpravka', 'CONT');

        this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(targetVagModel);

        for (var i = 0; i < this.sourceYardModels.length; i++) {
            for (var y = 0; y < this.records.length; y++) {
                if(this.records[i].get('yardSectorHid') === this.sourceYardModels.get('hid')){
                    this.sourceYardModels.set('contsInYardSector', (this.sourceYardModels.get('contsInYardSector') - 1));
                }
            }
            this.updateYardSectorModelText(this.sourceYardModels[i]);
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];
    },

    afterDropToYard: function (records, targetYardModel) {
        for (var i = 0; i < this.sourceVagModels.length; i++) {
            this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(this.sourceVagModels[i]);
        }

        targetYardModel.set('contsInYardSector', (targetYardModel.get('contsInYardSector') + records.length));
        this.updateYardSectorModelText(targetYardModel);

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];
    }

});