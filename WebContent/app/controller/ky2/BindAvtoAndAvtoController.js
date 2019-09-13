Ext.define('TK.controller.ky2.BindAvtoAndAvtoController', {
    extend: 'Ext.app.Controller',

    sourceAvtoModels: [], // to use in after drop event
    selectedNodesLeft: [], // last selection
    selectedNodesRight: [], // last selection
    sourceVagModel: undefined,
    views: [
        'ky2.avto.into.AvtosOutDir',
        'ky2.avto.out.AvtosIntoDir',
        'ky2.BasePoezdsDir',
        'ky2.avto.into.Avto2AvtoBindTreeForm',
        'ky2.avto.out.Avto2AvtoBindTreeForm'
    ],
    models: [
        'ky2.AvtoDir',
        'ky2.AvtoBindTreeNode'
    ],
    stores: [
        'ky2.AvtosDir',
        'ky2.AvtoBindTreeLeftNodes',
        'ky2.AvtoBindTreeRightNodes'
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
        ref: 'avtooutdir',
        selector: 'ky2avtosout4avtointodir > ky2baseavtosdir'
    }, {
        ref: 'avtointodir',
        selector: 'ky2avtosinto4avtooutdir > ky2baseavtosdir'
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
                beforedestroy: this.clearBindForm,
                onMoveAll: this.onMoveRightAll,
                onMove: this.onMoveRight
            },
            'ky2avtointolist button[action="showAvtosOutDir4AvtoIntoBind"]': {
                click: this.getAvtoIntoAndAvtoOutForBind
            },
            'ky2avtooutlist button[action="showAvtosIntoDir4AvtoOutBind"]': {
                click: this.getAvtoOutAndAvtoIntoForBind
            },
            'ky2avtoctgrtreeform button[action="showAvtosOutDir4AvtoIntoBind"]': {
                click: this.getAvtoIntoAndAvtoOutForBindFromVgCntGr
            },
            'ky2avtoctgrtreeform button[action="showAvtosIntoDir4AvtoOutBind"]': {
                click: this.getAvtoIntoAndAvtoOutForBindFromVgCntGr
            },

            // 'ky2avtosout4avtointodir button[action="getAvtoAndAvtoForBind"]': {
            //     click: this.getAvtoIntoAndAvtoOutForBind
            // },
            // 'ky2avtosinto4avtooutdir button[action="getAvtoAndAvtoForBind"]': {
            //     click: this.getAvtoOutAndAvtoIntoForBind
            // },
            'ky2avto2avtobindtreeforminto treepanel#treepanelLeft > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            'ky2avto2avtobindtreeforminto treepanel#treepanelRight > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            'ky2avto2avtobindtreeformout treepanel#treepanelLeft > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            'ky2avto2avtobindtreeformout treepanel#treepanelRight > treeview': {
                drop: this.dropToAvto,
                nodedragover: this.beforeDropToAvto
            },
            // 'ky2avtobindtreeform > treepanel > treeview': {
            //     drop: this.dropToAvto,
            //     nodedragover: this.beforeDropToAvto
            // },
            'ky2avto2avtobindtreeforminto button[action=save]': {
                click: this.bindAvtoToAvto
            },
            'ky2avto2avtobindtreeformout button[action=save]': {
                click: this.bindAvtoToAvto
            },
            'ky2avto2avtobindtreeforminto button[action=saveExit]': {
                click: this.bindAvtoToAvtoAndExit
            },
            'ky2avto2avtobindtreeformout button[action=saveExit]': {
                click: this.bindAvtoToAvtoAndExit
            }
        });
    },

    onMoveRightAll: function (btn) {
        var rootNodeLeft = this.getTreepanelLeft().getStore().getRootNode(),
            rootNodeRight = this.getTreepanelRight().getStore().getRootNode();
        rootNodeLeft.eachChild(function (contNodeModel) {
            rootNodeRight.appendChild(contNodeModel.copy('', true));
        });
        rootNodeLeft.removeAll();

    },
    onMoveRight: function (btn) {
        var avtolist = this.getTreepanelLeft(),
            rootNodeRight = this.getTreepanelRight().getStore().getRootNode();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var selected = avtolist.getSelectionModel().getLastSelected();
        if (selected.parentNode != null && (selected.get('who') !== 'gryz' || (selected.get('who') === 'gryz' && selected.parentNode.isRoot()))) {
            rootNodeRight.appendChild(selected.copy('', true));
            selected.remove();
        }

    },

    getAvtoIntoAndAvtoOutForBind: function (btn) {
        this.getAvtoOutAndAvtoIntoForBindCheck('ky2avto2avtobindtreeforminto', 'На авто по отправлению', 2);
    },

    getAvtoOutAndAvtoIntoForBind: function (btn) {
        this.getAvtoOutAndAvtoIntoForBindCheck('ky2avto2avtobindtreeforminto', 'На авто по прибытию', 1);
    },

    getAvtoOutAndAvtoIntoForBindCheck: function (widget, title, direction) {
        var avtolist = this.getAvtolist();
        if (!TK.Utils.isRowSelected(avtolist)) {
            return false;
        }
        var avtoModel = avtolist.getSelectionModel().getLastSelected();
        this.getAvtoAndAvtoForBind(widget, title, direction, avtoModel.get('hid'));

    },

    getAvtoIntoAndAvtoOutForBindFromVgCntGr: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1)
            this.getAvtoAndAvtoForBind('ky2poezd2poezdbindtreeforminto', 'На поезд по отправлению', 2, rootNode.get('hid'));
        else
            this.getAvtoAndAvtoForBind('ky2poezd2poezdbindtreeformout', 'На поезд по прибытию', 1, rootNode.get('hid'));
    },

    getAvtoAndAvtoForBind: function (widget, title, direction, avtoHid) {
        // var avtolist = this.getAvtolist(),
        //     avtoModel = avtolist.getSelectionModel().getLastSelected(),
        //     avtosDir = avtoDir.getSelectionModel().getSelection(),
        //     avtoDirModel = avtosDir.length > 0 ? avtosDir[0] : null;
        //
        // if (avtoDirModel == null) {
        //     Ext.Msg.show({
        //         title: 'Ошибка',
        //         msg: 'Не выбрано значение',
        //         buttons: Ext.Msg.OK,
        //         icon: Ext.Msg.ERROR
        //     });
        //     return false;
        // }
        // var avtolist = this.getAvtolist();
        // if (!TK.Utils.isRowSelected(avtolist)) {
        //     return false;
        // }

        this.getCenter().setLoading(true);
        // var avtoModel = avtolist.getSelectionModel().getLastSelected();
        var menuItem = this.getMenutree().lastSelectedLeaf,
            routeId = menuItem.id.split('_')[2];

        Ext.Ajax.request({
            url: 'ky2/secure/BindAvtoAndAvto.do',
            params: {
                avto1Hid: avtoHid,
                action: 'get_avto_and_all_avtos_for_bind',
                routeId: routeId,
                direction: direction
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    // avtoDir.up('window').close();

                    var respObj = Ext.decode(response.responseText);
                    var avto1Obj = respObj['rows'][0];
                    var avto2ArrObj = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: title});
                    this.getTreepanelLeft().setTitle(this.titleForAvto(avto1Obj['no_avto'] + '<br/>'));
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    this.initRootNode(rootNode, avto1Obj);

                    this.getTreepanelRight().setTitle(this.titleForAvto('<br/>'));
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
                    if (avto2ArrObj && avto2ArrObj.length > 0) {
                        this.initAvtosNodes(avto2ArrObj, rootNode);
                    }

                    this.getCenter().remove(this.getCenter().getComponent(0), true);
                    this.getCenter().add(bindcontainer);
                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                this.getCenter().setLoading(false);
            }
        });
    },

    titleForAvto: function (title) {
        return title +
            "Номер контейнера/Масса тары/Масса брутто/Типоразмер/Грузоподъемность";
    },

    initRootNode: function (rootNode, dataObj) {
        var konts = dataObj['konts'],
            gruzs = dataObj['gruzs'];
        rootNode.set('iconCls', 'truck');
        rootNode.set('hid', dataObj['hid']); // avto hid
        rootNode.set('direction', dataObj['direction']);
        rootNode.set('no_avto', dataObj['no_avto']);
        rootNode.set('text', dataObj['no_avto']);
        rootNode.set('who', 'avto');
        if (konts && !Ext.Object.isEmpty(konts))
            this.initContsNodes(konts, rootNode);
        if (gruzs && !Ext.Object.isEmpty(gruzs))
            this.initGryzyNodes(gruzs, rootNode, true);
    },

    initAvtosNodes: function (avtosArr, rootNode) {
        for (var i = 0; i < avtosArr.length; i++) {
            var avto = avtosArr[i],
                konts = avto['konts'];
            gruzs = avto['gruzs'];
            // vags = avto['vagons'],
            avtoModel = Ext.create('TK.model.ky2.AvtoBindTreeNode', {
                text: avto['no_avto'],
                who: 'avto',
                leaf: false,
                iconCls: 'truck',
                allowDrag: false,
                allowDrop: true,
                expanded: false
            });

            Ext.Object.each(avto, function (prop, value) {
                avtoModel.set(prop, value);
            }, this);

            rootNode.appendChild(avtoModel);
            if (konts && !Ext.Object.isEmpty(konts))
                this.initContsNodes(konts, avtoModel);
            if (gruzs && !Ext.Object.isEmpty(gruzs))
                this.initGryzyNodes(gruzs, avtoModel, true);
            // if (vags && vags.length > 0) {
            //     this.initVagsNodes(vags, poezdModel, false);
            // }
        }
    },

    // initVagsNodes: function (vags, rootNode) {
    //     for (var vagIndx in vags) {
    //         var vag = vags[vagIndx],
    //             conts = vag['konts'],
    //             gruzy = vag['gruzs'],
    //             vagModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
    //                 text: vag['nvag'],
    //                 who: 'vag',
    //                 leaf: false,
    //                 iconCls: 'vag',
    //                 expanded: ((conts && conts['0']) || (gruzy && gruzy['0'])) && vagIndx == 0
    //             });
    //
    //         Ext.Object.each(vag, function (prop, value) {
    //             vagModel.set(prop, value);
    //         }, this);
    //
    //         rootNode.appendChild(vagModel);
    //
    //         if (vag['otpravka'] === 'CONT') {
    //             if (conts && !Ext.Object.isEmpty(conts)) {
    //                 this.initContsNodes(conts, vagIndx, vagModel);
    //             }
    //         } else if (vag['otpravka'] === 'GRUZ') {
    //             if (gruzy && !Ext.Object.isEmpty(gruzy)) {
    //                 this.initGryzyNodes(gruzy, vagModel);
    //             }
    //         }
    //
    //     }
    // },

    initContsNodes: function (conts, vagModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.AvtoBindTreeNode', {
                    text: this.getController('ky2.BindPoezdAndPoezdController').contNodeText(cont),
                    avtoHid: vagModel.get('hid'),
                    who: 'cont',
                    iconCls: 'cont3',
                    leaf: true,
                    allowDrop: true,
                    allowDrag: true,
                    expanded: false
                });

            Ext.Object.each(cont, function (prop, value) {
                contModel.set(prop, value);
            }, this);
            vagModel.appendChild(contModel);

            if (gryzy && !Ext.Object.isEmpty(gryzy)) {
                this.initGryzyNodes(gryzy, contModel, false);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel, drag) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.ky2.AvtoBindTreeNode', {
                    text: gryz['kgvn'],
                    avtoHid: parentModel.get('who') === 'cont' ? parentModel.parentNode.get('hid') : parentModel.get('hid'),
                    who: 'gryz',
                    iconCls: 'gryz',
                    leaf: true,
                    allowDrop: true,
                    allowDrag: drag,
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

    // onDropToVag: function (node, dragData, targetVagModel, dropPosition) {
    //     // var sourceModel = dragData.records[0];
    //
    //     // if (sourceModel.get('who') === 'cont') {
    //     //     targetVagModel.set('otpravka', 'CONT');
    //     // } else if (sourceModel.get('who') === 'gryz') {
    //     //     targetVagModel.set('otpravka', 'GRUZ');
    //     // }
    //
    //     this.sortChildNodes(targetVagModel);
    //
    //     if (this.sourceVagModel.hasChildNodes()) {
    //     //     this.sourceVagModel.set('otpravka', undefined);
    //     // } else {
    //         this.sortChildNodes(this.sourceVagModel);
    //      }
    //
    //
    // },

    // onBeforedropToVag: function (targetModel, position, dragData) {
    //     var sourceModel = dragData.records[0],
    //         sourceParentModel = sourceModel.parentNode,
    //         isDrop;
    //
    //     // check source
    //     // isDrop = sourceModel.get('who') !== 'vag'; // vag can't be moved
    //     // if (isDrop) { // can be moved cont in avto, gruz in avto
    //     isDrop = sourceParentModel.get('who') !== 'cont';
    //     // }
    //
    //     // check target
    //     if (isDrop) { // can be dropped only in avto
    //         isDrop = targetModel.get('who') !== 'cont';
    //     }
    //     // if (isDrop) { // vag otpravka should be null or the same as in source parent model
    //     //     isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
    //     // }
    //
    //     this.sourceVagModel = isDrop ? sourceParentModel : undefined; // save sourceParentModel to later use it in drop event
    //
    //     return isDrop;
    // },

    bindAvtoToAvto2: function (btn) {
        var dataObjLeft = {
            hid: this.getTreepanelLeft().getRootNode().get('hid'),
            direction: this.getTreepanelLeft().getRootNode().get('direction'),
            no_avto: this.getTreepanelLeft().getRootNode().get('no_avto')
        };

        if (this.getTreepanelLeft().getRootNode().hasChildNodes()) {
            dataObjLeft = this.bindVags(dataObjLeft, this.getTreepanelLeft());
        }

        var dataObjRight = {
            hid: this.getTreepanelRight().getRootNode().get('hid'),
            direction: this.getTreepanelRight().getRootNode().get('direction'),
            no_avto: this.getTreepanelRight().getRootNode().get('no_avto')
        };

        if (this.getTreepanelRight().getRootNode().hasChildNodes()) {
            dataObjRight = this.bind(dataObjRight, this.getTreepanelRight());
        }

        var url = 'ky2/secure/BindAvtoAndAvto.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode([dataObjLeft, dataObjRight]), action: 'bind_avto_to_avto'},
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

    bindAvtoToAvtoAndExit: function () {
        this.bindAvtoToAvto(1);
    },

    bindAvtoToAvto: function (close) {
        var dataObjLeft = this.bindAvto(this.getTreepanelLeft().getRootNode());
        var dataObjRight = this.bindAvtos(this.getTreepanelRight().getRootNode());

        var url = 'ky2/secure/BindAvtoAndAvto.do';
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: url,
            params: {avtoObj: Ext.encode(dataObjLeft), avtosObj: Ext.encode(dataObjRight), action: 'bind_avto_to_avto'},
            scope: this,
            success: function (response) {
                this.getCenter().setLoading(false);
                if (Ext.isNumber(close)) {
                    var closeBtn = this.getAvtoform().down('button[action="close"]');
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


    bindAvtos: function (rootNodeModel) {
        var dataObj = [];

        if (rootNodeModel.hasChildNodes()) {
            var avtoIndex = 0;
            rootNodeModel.eachChild(function (avtoNodeModel) {
                dataObj.push(this.bindAvto(avtoNodeModel));
                avtoIndex++;
            }, this);
        }

        return dataObj;
    },

    bindAvto: function (rootNodeModel) {
        var dataObj = {
            hid: rootNodeModel.get('hid'),
            direction: rootNodeModel.get('direction'),
            no_avto: rootNodeModel.get('no_avto')
        };

        if (rootNodeModel.hasChildNodes()) {
            dataObj = this.bind(dataObj, rootNodeModel);
        }
        return dataObj;
    },

    bind: function (dataObj, nodeModel) {

        // var nodeModel = treepanel.getRootNode();
        this.bindConts(nodeModel, dataObj);
        this.bindGryzy(nodeModel, dataObj);

        return dataObj;
    },

    // bindVags: function (dataObj, treepanel) {
    //     var vagIndex = 0;
    //
    //     dataObj['vagons'] = [];
    //
    //     treepanel.getRootNode().eachChild(function (vagNodeModel) { // write vags
    //         var vagDataObj = {};
    //         vagDataObj['hid'] = vagNodeModel.get('hid');
    //         vagDataObj['sort'] = vagNodeModel.get('sort');
    //         vagDataObj['otpravka'] = vagNodeModel.get('otpravka');
    //         vagDataObj['nvag'] = vagNodeModel.get('nvag');
    //
    //         dataObj['vagons'].push(vagDataObj);
    //
    //         if (vagNodeModel.hasChildNodes()) {
    //             if (vagNodeModel.get('otpravka') === 'CONT') {
    //                 this.bindConts(vagNodeModel, vagDataObj);
    //             } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
    //                 this.bindGryzy(vagNodeModel, vagDataObj);
    //             }
    //         }
    //
    //         vagIndex++;
    //     }, this);
    //
    //     return dataObj;
    // },

    bindConts: function (nodeModel, dataObj) {
        var contIndex = 0;
        dataObj['konts'] = [];

        nodeModel.eachChild(function (contNodeModel) {  // write conts
            if (contNodeModel.get('who') === 'cont') {
                var contDataObj = {};
                contDataObj['hid'] = contNodeModel.get('hid');
                contDataObj['sort'] = contNodeModel.get('sort');
                contDataObj['nkon'] = contNodeModel.get('nkon');

                dataObj['konts'].push(contDataObj);

                if (contNodeModel.hasChildNodes()) {
                    this.bindGryzy(contNodeModel, contDataObj);
                }

                contIndex++;
            }
        }, this);
    },

    bindGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (gryzNodeModel) {
            if (gryzNodeModel.get('who') === 'gryz') {
                var gruzDataObj = {};
                gruzDataObj['hid'] = gryzNodeModel.get('hid');
                gruzDataObj['sort'] = gryzNodeModel.get('sort');
                gruzDataObj['kgvn'] = gryzNodeModel.get('kgvn');

                dataObj['gruzs'].push(gruzDataObj);

                gryzIndex++;
            }
        }, this);
    },

    checkBeforeMoveToAvto: function (records, targetModel) {
        var isDrop = false;
        for (var i = 0; i < records.length; i++) {
            var sourceModel = records[i],
                sourceParentModel = sourceModel.parentNode;

            isDrop = false;
            // check source
            isDrop = sourceModel.get('who') !== 'avto'; // avto can't be moved
            if (isDrop) { // can be moved cont in vag, gruz in vag
                isDrop = sourceParentModel.get('who') === 'avto';  // sourceParentModel can be only vag
            }

            // check target
            if (isDrop) { // can be dropped only in avto
                isDrop = targetModel.get('who') === 'avto';
            }
            // if (isDrop) { // vag otpravka should be null or the same as in source parent model
            //     isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
            // }
            if (isDrop) {
                isDrop = sourceParentModel.get('hid') !== targetModel.get('hid'); // prevent dropping in same node
            }

            this.cacheDistinctSourceModels(isDrop, sourceParentModel, this.sourceAvtoModels);
            if (!isDrop) {
                break;
            }
        }
        return isDrop;
    },

    cacheDistinctSourceModels: function (isDrop, sourceParentModel, sourceAvtoModels) {
        if (isDrop) {    // save distinct sourceVagModels
            var found = false;
            for (var y = 0; y < sourceAvtoModels.length; y++) {
                if (sourceAvtoModels[y].get('hid') === sourceParentModel.get('hid')) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                sourceAvtoModels.push(sourceParentModel); // save sourceParentModel to later use it in drop event
            }
        } else {
            while (sourceAvtoModels.length) {
                sourceAvtoModels.pop(); // clear array
            }
        }
    },

    beforeDropToAvto: function (targetModel, position, dragData) {
        return this.checkBeforeMoveToAvto(dragData.records, targetModel);
    },

    afterDropToAvto: function (records, targetAvtoModel) {
        var sourceModel = records[0];   // all models go in one place

        // if (sourceModel.get('who') === 'cont') {
        //     targetAvtoModel.set('otpravka', 'CONT');
        // } else if (sourceModel.get('who') === 'gryz') {
        //     targetAvtoModel.set('otpravka', 'GRUZ');
        // }

        this.sortChildNodes(targetAvtoModel);
        for (var i = 0; i < this.sourceAvtoModels.length; i++) {
            if (this.sourceAvtoModels[i].childNodes != null && this.sourceAvtoModels[i].hasChildNodes()) {
                //     this.sourceAvtoModels[i].set('otpravka', undefined);
                // } else {
                this.sortChildNodes(this.sourceAvtoModels[i]);
            }
        }
        //
        // for (var i = 0; i < records.length; i++) {
        //     records[i].set('poezdHid', targetAvtoModel.get('poezdHid'));
        //     records[i].set('vagHid', targetAvtoModel.get('hid'))
        // }

        for (var i = 0; i < records.length; i++) {
            records[i].set('cls', 'selectTreeNode');
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesLeft = [];
        this.selectedNodesRight = [];
        this.sourceVagModels = [];
    },

    dropToAvto: function (node, dragData, targetAvtoModel, dropPosition) {
        this.afterDropToAvto(dragData.records, targetAvtoModel);
    }
});