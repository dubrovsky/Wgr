Ext.define('TK.controller.ky2.BindPoezdAndPoezdController', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils',
        'TK.model.ky2.PoezdBindTreeNode'
    ],


    sourceVagModels: [], // to use in after drop event
    sourcePoezdModels: [], // to use in after drop event
    selectedNodesLeft: [], // last selection
    selectedNodesRight: [], // last selection
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
        ref: 'menutree',
        selector: 'viewport > menutree'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'poezdform',
        selector: 'viewport > tabpanel ky2bindtreeform'
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
            'ky2poezdintolist button[action="showPoezdsOutDir4PoezdIntoBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBind
            },
            'ky2poezdoutlist button[action="showPoezdsIntoDir4PoezdOutBind"]': {
                click: this.getPoesdOutAndPoezdIntoForBind
            },
            'ky2vgctgrtreeformpoezdinto button[action="showPoezdsOutDir4PoezdIntoBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBindFromVgCntGr
            },
            'ky2vgctgrtreeformpoezdout button[action="showPoezdsIntoDir4PoezdOutBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBindFromVgCntGr
            },
            /*'ky2poezdsout4poezdintodir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBind
            },
            'ky2poezdsinto4poezdoutdir button[action="getPoesdAndPoezdForBind"]': {
                click: this.getPoesdOutAndPoezdIntoForBind
            },*/
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelRight > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
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
            'ky2poezd2poezdbindtreeforminto button[action=saveExit]': {
                click: this.bindPoezdToPoezdAndExit
            },
            'ky2poezd2poezdbindtreeformout button[action=saveExit]': {
                click: this.bindPoezdToPoezdAndExit
            },
            /*'ky2poezd2poezdbindtreeforminto radiogroup': {
                change: this.changeLeftView
            },*/
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelLeft': {
                selectionchange: this.selectionchangeLeft
            },
            'ky2poezd2poezdbindtreeforminto treepanel#treepanelRight': {
                selectionchange: this.selectionchangeRight
            },
            'ky2poezd2poezdbindtreeformout treepanel#treepanelLeft': {
                selectionchange: this.selectionchangeLeft
            },
            'ky2poezd2poezdbindtreeformout treepanel#treepanelRight': {
                selectionchange: this.selectionchangeRight
            },
            'ky2poezd2poezdbindtreeforminto button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2poezd2poezdbindtreeforminto button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            'ky2poezd2poezdbindtreeformout button[action=moveRight]': {
                click: this.moveNodesRight
            },
            'ky2poezd2poezdbindtreeformout button[action=moveLeft]': {
                click: this.moveNodesLeft
            },
            'ky2poezd2poezdbindtreeforminto button[action=hideVags]': {
                click: this.getController('ky2.BindPoezdAndYardController').hideVagsLeft
            },
            'ky2poezd2poezdbindtreeforminto button[action=showVags]': {
                click: this.getController('ky2.BindPoezdAndYardController').showVagsLeft
            },
            'ky2poezd2poezdbindtreeformout button[action=hideVags]': {
                click: this.getController('ky2.BindPoezdAndYardController').hideVagsLeft
            },
            'ky2poezd2poezdbindtreeformout button[action=showVags]': {
                click: this.getController('ky2.BindPoezdAndYardController').showVagsLeft
            },
            'ky2poezd2poezdbindtreeforminto button[action=expandConts]': {
                click: this.expandContsLeft
            },
            'ky2poezd2poezdbindtreeforminto button[action=collapseConts]': {
                click: this.collapseContsLeft
            },
            'ky2poezd2poezdbindtreeformout button[action=expandConts]': {
                click: this.expandContsLeft
            },
            'ky2poezd2poezdbindtreeformout button[action=collapseConts]': {
                click: this.collapseContsLeft
            },
            'ky2poezd2poezdbindtreeforminto button[action=expandAll]': {
                click: this.expandPoezdRight
            },
            'ky2poezd2poezdbindtreeforminto button[action=collapseAll]': {
                click: this.collapsePoezdRight
            },
            'ky2poezd2poezdbindtreeformout button[action=expandAll]': {
                click: this.expandPoezdRight
            },
            'ky2poezd2poezdbindtreeformout button[action=collapseAll]': {
                click: this.collapsePoezdRight
            }

        });
    },

    getPoesdIntoAndPoezdOutForBind: function (btn) {
        this.getPoesdAndPoezdForBindCheck('ky2poezd2poezdbindtreeforminto', 'На поезд по отправлению', 1);
    },

    getPoesdOutAndPoezdIntoForBind: function (btn) {
        this.getPoesdAndPoezdForBindCheck('ky2poezd2poezdbindtreeformout', 'На поезд по прибытию', 2);
    },

    getPoesdAndPoezdForBindCheck: function (widget, title, direction) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        var poezdModel = poezdlist.getSelectionModel().getLastSelected();
        this.getPoesdAndPoezdForBind(widget, title, direction === 1 ? 2 : 1, poezdModel.get('hid'));
    },

    getPoesdIntoAndPoezdOutForBindFromVgCntGr: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.getController('ky2.PoezdVgCtGrController').saveClick(null, null, null, btn, null, null, null, null,
                this.getPoesdAndPoezdForBind.bind(this, 'ky2poezd2poezdbindtreeforminto', 'На поезд по отправлению', 2, rootNode.get('hid')));
            // this.getPoesdAndPoezdForBind('ky2poezd2poezdbindtreeforminto', 'На поезд по отправлению', 2, rootNode.get('hid'));
        else
            this.getController('ky2.PoezdVgCtGrController').saveClick(null, null, null, btn, null, null, null, null,
                this.getPoesdAndPoezdForBind.bind(this, 'ky2poezd2poezdbindtreeformout', 'На поезд по прибытию', 1, rootNode.get('hid')));
            // this.getPoesdAndPoezdForBind('ky2poezd2poezdbindtreeformout', 'На поезд по прибытию', 1, rootNode.get('hid'));
    },

    getPoesdAndPoezdForBind: function (/*poezdDir*/ widget, title, direction, poezdHid) {
        /*var poezdlist = this.getPoezdlist(),
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
        }*/
        var menuItem = this.getMenutree().lastSelectedLeaf,
            routeId = menuItem.id.split('_')[2];


        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'ky2/secure/BindPoezdAndPoezd.do',
            params: {
                // action: 'get_poezd_and_poezd_for_bind',
                poezd1Hid: poezdHid,
                action: 'get_poezd_and_all_poezds_for_bind',
                routeId: routeId,
                direction: direction
                /* 'poezd1Hid': poezdModel.get('hid'),
                 'poezd2Hid': poezdDirModel.get('hid')*/
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    // poezdDir.up('window').close();

                    var respObj = Ext.decode(response.responseText);
                    var poezd1Obj = respObj['rows'][0];
                    var poezd2ArrObj = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: title});

                    //// fill trees
                    var vags = poezd1Obj['vagons'];
                    this.getTreepanelLeft().setTitle(this.titleForPoezd("Поезд № " + poezd1Obj['npprm'] + '<br/>'));
                    var rootNode = this.getTreepanelLeft().getRootNode();
                    this.initRootNode(rootNode, poezd1Obj, vags);
                    /*if (vags && !Ext.Object.isEmpty(vags)) {
                        this.initRootNode(rootNode, poezd1Obj, vags);
                    }*/

                    this.getTreepanelRight().setTitle(this.titleForPoezd('<br/>'));
                    rootNode = this.getTreepanelRight().getRootNode();
                    if (poezd2ArrObj && poezd2ArrObj.length > 0) {
                        this.initPoezdsNodes(poezd2ArrObj, rootNode);
                    }

                    /*vags = poezd2Obj['vagons'];
                    this.getTreepanelRight().setTitle(poezd2Obj['nppr']);
                    rootNode = this.getTreepanelRight().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        this.initRootNode(rootNode, poezd2Obj, vags);
                    }*/
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

    titleForPoezd: function (title, rootNode) {
        return title + (rootNode ? '(' + rootNode.get('vagsInPoezd') + '/' + rootNode.get('contsInPoezd') + ')' : '') + '<br/>' + this.titlForPoezd;
    },

    initPoezdsNodes: function (poezdsArr, rootNode) {
        for (var i = 0; i < poezdsArr.length; i++) {
            var poezd = poezdsArr[i],
                vags = poezd['vagons'],
                poezdModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: poezd['npprm'],
                    who: 'poezd',
                    leaf: false,
                    iconCls: 'vag',
                    allowDrag: false,
                    // allowDrop: false,
                    expanded: false
                });

            Ext.Object.each(poezd, function (prop, value) {
                poezdModel.set(prop, value);
            }, this);

            rootNode.appendChild(poezdModel);
            if (vags && vags.length > 0) {
                this.initVagsNodes(vags, poezdModel, false);
            }
        }
    },

    initRootNode: function (rootNode, poezd, vags) {
        var poezdModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
            text: poezd['npprm'],
            who: 'poezd',
            leaf: false,
            iconCls: 'vag',
            allowDrag: false,
            // allowDrop: false,
            expanded: true
        });

        Ext.Object.each(poezd, function (prop, value) {
            poezdModel.set(prop, value);
        }, this);

        poezdModel.set('poezdHid', poezd['hid']); // poezd hid
        rootNode.set('hid', poezd['hid']); // poezd hid
        rootNode.appendChild(poezdModel);
        this.initVagsNodes(vags, poezdModel, false);
    },

    vagNodeText: function (vag) {
        return '<b>' + (vag.get('nvag') ? vag.get('nvag') : '...') + '</b>'
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ ' + (vag.get('podSila') ? vag.get('podSila') : '...')
            + ' / ' + (vag.get('masTar') ? vag.get('masTar') : '...')
            + ' / ' + (vag.get('kolOs') ? vag.get('kolOs') : '...')
            + ' / ' + (vag.get('sobstv') ? vag.get('sobstv') : '...');
    },

    initVagsNodes: function (vags, rootNode, isYard) {    //isYard - poezd for yard
        rootNode.set('vagsInPoezd', vags.length);
        var contsInPoezd = 0;
        for (var vagIndx in vags) {
            var vag = vags[vagIndx],
                conts = vag['konts'],
                gruzy = vag['gruzs'],
                vagModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    // text: this.vagNodeText(vag),
                    who: 'vag',
                    poezdHid: rootNode.get('hid'),
                    leaf: false,
                    iconCls: 'vag1',
                    // allowDrag: false,
                    expanded: true
                    // expanded: (conts && conts['0']) || (gruzy && gruzy['0'])
                });

            Ext.Object.each(vag, function (prop, value) {
                vagModel.set(prop, value);
            }, this);

            if (!vag['otpravka'] || vag['otpravka'] === 'CONT' || !isYard) {
                rootNode.appendChild(vagModel);
            }

            vagModel.set('text', this.vagNodeText(vagModel));

            if (vag['otpravka'] === 'CONT') {
                if (conts && !Ext.Object.isEmpty(conts)) {
                    this.initContsNodes(conts, vagIndx, vagModel, isYard);
                    contsInPoezd += conts.length;
                }
            } else if (vag['otpravka'] === 'GRUZ' && !isYard) {
                if (gruzy && !Ext.Object.isEmpty(gruzy)) {
                    this.initGryzyNodes(gruzy, vagModel, vagIndx, isYard/*, 'TK.model.ky2.PoezdBindTreeNode'*/);
                }
            }
        }
        rootNode.set('contsInPoezd', contsInPoezd);
    },

    /*contNodeText: function(cont) {
       return '<b>' + (cont['nkon'] ? cont['nkon'] : '...') + '</b>'
           + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/ ' + (cont['massa_tar'] ? cont['massa_tar'] : '...')
           + ' / ' + (cont['massa_brutto_all'] ? cont['massa_brutto_all'] : '...')
           + ' / ' + (cont['vid'] ? cont['vid'] : '...')
           + ' / ' + (cont['pod_sila'] ? cont['pod_sila'] : '...');
    },*/

    contNodeText: function (cont) {
        return '<b>' + (cont.get('nkon') ? cont.get('nkon') : '...') + '</b>'
            + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '
            + ' / ' + (cont.get('gruzotpr') ? cont.get('gruzotpr') : '...')
            + ' / ' + (cont.get('massa_tar') ? cont.get('massa_tar') : '...')
            + ' / ' + (cont.get('massa_brutto_all') ? cont.get('massa_brutto_all') : '...')
            + ' / ' + (cont.get('vid') ? cont.get('vid') : '...')
            + ' / ' + (cont.get('pod_sila') ? cont.get('pod_sila') : '...')
            + (cont.get('prim') ? ' / ' + cont.get('prim') : "")
        // + ' / ' + (cont.get('prim') ? cont.get('prim') : '...');
    },

    initContsNodes: function (conts, vagIndx, vagModel, isYard) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    // text: this.contNodeText(cont),
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
            contModel.set('text', this.contNodeText(contModel));

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, contIndx, isYard);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, parentIndx, isYard/*, model*/) {      // used here and in yard
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: gryz['kgvn'],
                    who: 'gryz',
                    poezdHid: parentModel.get('poezdHid'),
                    vagHid: parentModel.get('who') === 'cont' ? parentModel.parentNode.get('hid') : parentModel.get('hid'),
                    contHid: parentModel.get('who') === 'cont' ? parentModel.get('hid') : null,
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

    bindPoezdToPoezdAndExit: function () {
        this.bindPoezdToPoezd(1);
    },

    bindPoezdToPoezd: function (close) {
        var dataObjLeft = this.bindPoezd(this.getTreepanelLeft().getRootNode().firstChild);
        // var dataObjRight = this.bindPoezd(this.getTreepanelRight().getRootNode());
        var dataObjRight = this.bindPoezds(this.getTreepanelRight().getRootNode());

        var url = 'ky2/secure/BindPoezdAndPoezd.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {
                poezdObj: Ext.encode(dataObjLeft),
                poezdsObj: Ext.encode(dataObjRight),
                action: 'bind_poezd_to_poezd'
            },
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                var leftRootNode = this.getTreepanelLeft().getRootNode();
                var rightRootNode = this.getTreepanelRight().getRootNode();
                this.clearVagsUpdatedProperty(leftRootNode, rightRootNode);
                if (!leftRootNode.findChild('who', 'cont', true) && !leftRootNode.findChild('who', 'gryz', true) && leftRootNode.get('direction') === 1) {
                    this.getController('ky2.PoezdController').getPoezdIntoForPoezdOut(leftRootNode.get('hid'));
                }
                if (Ext.isNumber(close)) {
                    var closeBtn = this.getPoezdform().down('button[action="close"]');
                    closeBtn.fireEvent('click', closeBtn);
                } else {
                    var respObj = Ext.decode(response.responseText);
                }
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    clearVagsUpdatedProperty: function (leftRootNode, rightRootNode) {
        leftRootNode.eachChild(function (poezdNode) {
            poezdNode.eachChild(function (vagNode) {
                vagNode.set('updated', false);
            });
        });
        rightRootNode.eachChild(function (poezdNode) {
            poezdNode.eachChild(function (vagNode) {
                vagNode.set('updated', false);
            });
        });
    },

    bindPoezds: function (rootNodeModel) {
        var dataObj = [];

        if (rootNodeModel.hasChildNodes()) {
            var poezdIndex = 0;
            rootNodeModel.eachChild(function (poezdNodeModel) {
                dataObj.push(this.bindPoezd(poezdNodeModel));
                poezdIndex++;
            }, this);
        }

        return dataObj;
    },

    bindPoezd: function (rootNodeModel) {
        var dataObj = {
            hid: rootNodeModel.get('poezdHid') || rootNodeModel.get('hid'),
            direction: rootNodeModel.get('direction'),
            nppr: rootNodeModel.get('nppr')
        };

        if (rootNodeModel.hasChildNodes()) {
            dataObj = this.bindVags(dataObj, rootNodeModel);
        }

        return dataObj;
    },

    bindVags: function (dataObj, rootNodeModel) {
        var vagIndex = 0;

        dataObj['vagons'] = [];

        rootNodeModel.eachChild(function (vagNodeModel) { // write vags
            if (vagNodeModel.get('updated')) {
                var vagDataObj = {};
                vagDataObj['hid'] = vagNodeModel.get('hid');
                // vagDataObj['sort'] = vagNodeModel.get('sort');
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
            }

        }, this);

        return dataObj;
    },

    bindConts: function (parentNodeModel, parentDataObj) {      // can be vag or yard
        var contIndex = 0;
        parentDataObj['konts'] = [];

        parentNodeModel.eachChild(function (contNodeModel) {  // write conts
            var contDataObj = {};
            contDataObj['hid'] = contNodeModel.get('hid');
            contDataObj['sort'] = contNodeModel.get('sort');
            contDataObj['nkon'] = contNodeModel.get('nkon');

            parentDataObj['konts'].push(contDataObj);

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

    /*changeLeftView: function (field, newValue, oldValue) {
        switch (newValue['leftBindView']) {
            case 'all':
                break;
            case 'noVags':
                break;
        }
    },*/

    selectionchangeLeft: function (selModel, selected) {
        this.selectionchange(selModel, selected, this.selectedNodesLeft/*, this.checkSelected, this*/);
    },

    selectionchangeRight: function (selModel, selected) {
        this.selectionchange(selModel, selected, this.selectedNodesRight/*, this.checkSelected, this*/);
    },

    selectionchange: function (selModel, selected, selectedNodes, checkSelectedFn, fnScope) {// in yards another checkSelectedFn
        var checkSelected = this.checkSelected.bind(this);
        if (checkSelectedFn) {
            checkSelected = checkSelectedFn.bind(fnScope);
        }
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

        var poezds = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'poezd';
        });
        if (poezds.length !== 0) {   // poezds can't be more than 1
            return false;
        }

        var vags = Ext.Array.filter(selected, function (item, index, array) {
            return item.get('who') === 'vag';
        });
        if (vags.length === selected.length) {// all selected must be vags
            return true;
        }
        /*if (vags.length !== 0) {   // vags can't be more than 1
            return false;
        }*/

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
                return item.parentNode.get('who') === 'vag';// parent can be only vag
            });
            if (gryzy.length === selected.length) {
                return true;
            }
        }

        return false;
    },

    moveNodesRight: function (btn) {
        this.moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToVag, this.afterDropToVag, this);
    },

    moveNodesLeft: function (btn) {
        this.moveNodes(this.getTreepanelRight(), this.getTreepanelLeft(), this.checkBeforeMoveToVag, this.afterDropToVag, this);
    },

    moveNodes: function (sourcePanel, targetPanel, beforeMoveFn, afterMoveFn, fnScope, beforeDropFn) {
        var sourceNodes = sourcePanel.getSelectionModel().getSelection();
        if (sourceNodes.length === 0) {
            return;
        }

        var targetNode = targetPanel.getSelectionModel().getLastSelected(); // move only in one place
        if (!targetNode || targetPanel.getSelectionModel().getSelection().length > 1) {
            return;
        }

        if (!beforeMoveFn.call(fnScope, sourceNodes, targetNode)) {
            return;
        }

        if (!beforeDropFn) {
            for (var y = 0; y < sourceNodes.length; y++) {
                targetNode.insertChild(targetNode.childNodes.length, sourceNodes[y]); // appendChild don't work, no need to remove before insert
            }

            afterMoveFn.call(fnScope, sourceNodes, targetNode);
        } else {
            beforeDropFn.call(fnScope, sourceNodes, targetNode);
        }
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
            isDrop = sourceModel.get('who') !== 'poezd'; // poezd can't be moved
            if (isDrop) { // can be moved cont in vag, gruz in vag, vag in poezd
                isDrop = sourceParentModel.get('who') === 'vag' || sourceParentModel.get('who') === 'poezd';  // sourceParentModel can be vag or poezd
            }

            // check target
            if (isDrop) { // cont and gruz can be dropped in vag, vag in poezd
                isDrop =
                    (targetModel.get('who') === 'vag' && (sourceModel.get('who') === 'cont' || sourceModel.get('who') === 'gryz')) ||
                    (targetModel.get('who') === 'poezd' && sourceModel.get('who') === 'vag');
            }
            if (isDrop && targetModel.get('who') === 'vag') { // vag otpravka should be null or the same as in source parent model
                isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
            }
            if (isDrop) {
                isDrop = sourceParentModel.get('who') !== targetModel.get('who') || sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            this.cacheDistinctSourceModels(isDrop, sourceParentModel, sourceParentModel.get('who') === 'vag' ? this.sourceVagModels : this.sourcePoezdModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    cacheDistinctSourceModels: function (isDrop, sourceParentModel, sourceModels) {
        if (isDrop) {    // save distinct sourceVagModels
            var found = false;
            for (var y = 0; y < sourceModels.length; y++) {
                if (sourceModels[y].get('hid') === sourceParentModel.get('hid')) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                sourceModels.push(sourceParentModel); // save sourceParentModel to later use it in drop event
            }
        } else {
            while (sourceModels.length) {
                sourceModels.pop(); // clear array
            }
        }
    },

    afterDropToVag: function (records, targetModel) {
        var sourceModel = records[0];   // all models go in one place

        if (sourceModel.get('who') === 'cont') {
            targetModel.set('otpravka', 'CONT');
        } else if (sourceModel.get('who') === 'gryz') {
            targetModel.set('otpravka', 'GRUZ');
        }

        this.sortChildNodes(targetModel);

        if (targetModel.get('who') === 'vag') {
            for (var i = 0; i < this.sourceVagModels.length; i++) {
                if (!this.sourceVagModels[i].hasChildNodes()) {
                    this.sourceVagModels[i].set('otpravka', undefined);
                } else {
                    this.sortChildNodes(this.sourceVagModels[i]);
                }
                this.sourceVagModels[i].set('updated', true);  // source vag - if target is vag - update target and source vags
            }
            targetModel.set('updated', true); // target vag
        } else if (targetModel.get('who') === 'poezd') {
            for (var i = 0; i < this.sourcePoezdModels.length; i++) {
                if (this.sourcePoezdModels[i].hasChildNodes()) {
                    this.sortChildNodes(this.sourcePoezdModels[i]);
                }
            }
        }

        for (var i = 0; i < records.length; i++) {
            records[i].set('poezdHid', targetModel.get('poezdHid'));
            if (targetModel.get('who') === 'vag') {
                records[i].set('vagHid', targetModel.get('hid'));
            } else if (targetModel.get('who') === 'poezd') { // if target is poezd - update vag records
                records[i].set('updated', true); //
            }
            records[i].set('cls', 'selectTreeNode');
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesLeft = [];
        this.selectedNodesRight = [];
        this.sourceVagModels = [];
        this.sourcePoezdModels = [];
    },

    dropToVag: function (node, dragData, targetModel, dropPosition) {
        this.afterDropToVag(dragData.records, targetModel);
    },

    expandContsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().cascadeBy(function (nodeModel) {
            if (nodeModel.get('who') === 'cont' && !nodeModel.isExpanded() && nodeModel.isExpandable()) {
                nodeModel.expand();
            }
        }, this);
    },

    collapseContsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().cascadeBy(function (nodeModel) {
            if (nodeModel.get('who') === 'cont' && nodeModel.isExpanded()) {
                nodeModel.collapse();
            }
        }, this);
    },

    expandPoezdRight: function (btn) {
        var selected = this.getTreepanelRight().getSelectionModel().getLastSelected();
        if (selected && this.getTreepanelRight().getSelectionModel().getSelection().length === 1 && selected.get('who') === 'poezd') {
            selected.cascadeBy(function (nodeModel) {
                if (!nodeModel.isExpanded() && nodeModel.isExpandable()) {
                    nodeModel.expand();
                }
            }, this);
        }
    },

    collapsePoezdRight: function (btn) {
        var selected = this.getTreepanelRight().getSelectionModel().getLastSelected();
        if (selected && this.getTreepanelRight().getSelectionModel().getSelection().length === 1 && selected.get('who') === 'poezd') {
            selected.cascadeBy(function (nodeModel) {
                if (nodeModel.isExpanded()) {
                    nodeModel.collapse();
                }
            }, this);
        }
    }


});