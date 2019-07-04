Ext.define('TK.controller.ky2.PoezdVgCtGrBindController', {
    extend: 'Ext.app.Controller',

    sourceVagModel: undefined,
    views: [
        'ky2.poezd.into.PoezdsOutDir',
        'ky2.poezd.out.PoezdsIntoDir',
        'ky2.BasePoezdsDir',
        'ky2.poezd.into.PoezdVgCtGrBindTreeForm',
        'ky2.poezd.out.PoezdVgCtGrBindTreeForm'
    ],
    models: [
        'ky2.PoezdDir',
        'ky2.PoezdVgCtGrBindTreeNode'
    ],
    stores: [
        'ky2.PoezdsDir',
        'ky2.PoezdVgCtGrBindTreeLeftNodes',
        'ky2.PoezdVgCtGrBindTreeRightNodes'
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
                beforedestroy: this.clearVgCtGrForm
            },
            'ky2poezdsout4poezdintodir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBind
            },
            'ky2poezdsinto4poezdoutdir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdOutAndPoezdIntoForBind
            },
            'ky2bindtreeform > treepanel > treeview': {
                drop: this.onDropToVag,
                nodedragover: this.onBeforedropToVag
            },
            'ky2vgctgrtreebindformpoezdinto button[action=save]': {
                click: this.bindPoezdToPoezd
            },
            'ky2vgctgrtreebindformpoezdout button[action=save]': {
                click: this.bindPoezdToPoezd
            }
        });
    },

    getPoesdIntoAndPoezdOutForBind: function (btn) {
        this.getPoesdAndPoezdForBind(this.getPoezdoutdir(), 'ky2vgctgrtreebindformpoezdinto', '+ На поезд по отправлению');
    },

    getPoesdOutAndPoezdIntoForBind: function (btn) {
        this.getPoesdAndPoezdForBind(this.getPoezdintodir(), 'ky2vgctgrtreebindformpoezdout', '+ На поезд по прибытию');
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
            url: 'ky2/secure/VgCtGrBind.do',
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

                    var vgctgrcontainer = Ext.widget(widget, {title: title});
                    // var vgctgrcontainer = Ext.widget('ky2vgctgrtreebindformpoezdinto', {title: '+ На поезд по отправлению'});

                    //// fill trees
                    var vags = poezd1Obj['vagons'];
                    this.getTreepanelLeft().setTitle(poezd1Obj['nppr']);
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        rootNode.set('hid', poezd1Obj['hid']); // poezd hid
                        rootNode.set('direction', poezd1Obj['direction']);
                        rootNode.set('nppr', poezd1Obj['nppr']);
                        this.initVagsNodes(vags, rootNode);
                        rootNode.expand();
                    }

                    vags = poezd2Obj['vagons'];
                    this.getTreepanelRight().setTitle(poezd2Obj['nppr']);
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        rootNode.set('hid', poezd2Obj['hid']);   // // poezd hid
                        rootNode.set('direction', poezd2Obj['direction']);
                        rootNode.set('nppr', poezd2Obj['nppr']);
                        this.initVagsNodes(vags, rootNode);
                        rootNode.expand();
                    }
                    /// END fill tree

                    this.getCenter().remove(this.getCenter().getComponent(0), true);
                    this.getCenter().add(vgctgrcontainer);
                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                this.getCenter().setLoading(false);
            }
        });
    },

    initVagsNodes: function (vags, rootNode) {
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'],
                vagModel = Ext.create('TK.model.ky2.PoezdVgCtGrBindTreeNode', {
                    text: vag['nvag'],
                    who: 'vag',
                    leaf: false,
                    iconCls: 'vag',
                    expanded: ((conts && conts['0']) || (gruzy && gruzy['0'])) && vagIndx == 0
                });

            Ext.Object.each(vag, function (prop, value) {
                vagModel.set(prop, value);
            }, this);

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
                contModel = Ext.create('TK.model.ky2.PoezdVgCtGrBindTreeNode', {
                    text: cont['nkon'],
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: gryzy && gryzy['0'] ? false : true,
                    expanded: vagIndx == 0 && gryzy && gryzy['0'] && contIndx == 0
                });

            Ext.Object.each(cont, function (prop, value) {
                contModel.set(prop, value);
            }, this);
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, parentIndx) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.ky2.PoezdVgCtGrBindTreeNode', {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf: true,
                    expanded: false
                });

            Ext.Object.each(gryz, function (prop, value) {
                gryzModel.set(prop, value);
            }, this);
            parentModel.appendChild(gryzModel);
        }
    },

    clearVgCtGrForm: function () {
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

    onDropToVag: function (node, dragData, targetVagModel, dropPosition) {
        var sourceModel = dragData.records[0];

        if (sourceModel.get('who') === 'cont') {
            targetVagModel.set('otpravka', 'CONT');
        } else if (sourceModel.get('who') === 'gryz') {
            targetVagModel.set('otpravka', 'GRUZ');
        }

        this.sortChildNodes(targetVagModel);

        if (!this.sourceVagModel.hasChildNodes()) {
            this.sourceVagModel.set('otpravka', undefined);
        } else {
            this.sortChildNodes(this.sourceVagModel);
        }

    },

    onBeforedropToVag: function (targetModel, position, dragData) {
        var sourceModel = dragData.records[0],
            sourceParentModel = sourceModel.parentNode,
            isDrop;

        // check source
        isDrop = sourceModel.get('who') !== 'vag'; // vag can't be moved
        if (isDrop) { // can be moved cont in vag, gruz in vag
            isDrop = sourceParentModel.get('who') === 'vag';
        }

        // check target
        if (isDrop) { // can be dropped only in vag
            isDrop = targetModel.get('who') === 'vag';
        }
        if (isDrop) { // vag otpravka should be null or the same as in source parent model
            isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
        }

        this.sourceVagModel = isDrop ? sourceParentModel : undefined; // save sourceParentModel to later use it in drop event

        return isDrop;
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

        var url = 'ky2/secure/VgCtGrBind.do';
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
    }
});