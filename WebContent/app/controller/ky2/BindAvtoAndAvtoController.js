Ext.define('TK.controller.ky2.BindAvtoAndAvtoController', {
    extend: 'Ext.app.Controller',

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
        ref: 'avtolist',
        selector: 'viewport > tabpanel grid'
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
            'ky2avtosout4avtointodir button[action="getAvtoAndAvtoForBind"]': {
                click: this.getAvtoIntoAndAvtoOutForBind
            },
            'ky2avtosinto4avtooutdir button[action="getAvtoAndAvtoForBind"]': {
                click: this.getAvtoOutAndAvtoIntoForBind
            },
            'ky2avtobindtreeform > treepanel > treeview': {
                drop: this.onDropToVag,
                nodedragover: this.onBeforedropToVag
            },
            'ky2avto2avtobindtreeforminto button[action=save]': {
                click: this.bindAvtoToAvto
            },
            'ky2avto2avtobindtreeformout button[action=save]': {
                click: this.bindAvtoToAvto
            }
        });
    },

    onMoveRightAll: function(btn) {
        var rootNodeLeft = this.getTreepanelLeft().getStore().getRootNode(),
            rootNodeRight = this.getTreepanelRight().getStore().getRootNode();
        rootNodeLeft.eachChild(function (contNodeModel) {
            rootNodeRight.appendChild(contNodeModel.copy('', true));
        });
        rootNodeLeft.removeAll();

    },
    onMoveRight: function(btn) {
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
        this.getAvtoAndAvtoForBind(this.getAvtooutdir(), 'ky2avto2avtobindtreeforminto', '+ На авто по отправлению');
    },

    getAvtoOutAndAvtoIntoForBind: function (btn) {
        this.getAvtoAndAvtoForBind(this.getAvtointodir(), 'ky2avto2avtobindtreeforminto', '+ На авто по прибытию');
    },

    getAvtoAndAvtoForBind: function (avtoDir, widget, title) {
        var avtolist = this.getAvtolist(),
            avtoModel = avtolist.getSelectionModel().getLastSelected(),
            avtosDir = avtoDir.getSelectionModel().getSelection(),
            avtoDirModel = avtosDir.length > 0 ? avtosDir[0] : null;

        if (avtoDirModel == null) {
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
            url: 'ky2/secure/BindAvtoAndAvto.do',
            params: {
                action: 'get_avto_and_avto_for_bind',
                'avto1Hid': avtoModel.get('hid'),
                'avto2Hid': avtoDirModel.get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    avtoDir.up('window').close();

                    var respObj = Ext.decode(response.responseText);
                    var avto1Obj = respObj['rows'][0];
                    var avto2Obj = respObj['rows'][1];

                    var bindcontainer = Ext.widget(widget, {title: title});
                    this.getTreepanelLeft().setTitle(avto1Obj['no_avto']);

                    //// fill trees
                    // var vags = avto1Obj['vagons'];
                    var konts = avto1Obj['konts'],
                        gruzs = avto1Obj['gruzs'];
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    rootNode.set('text', avto1Obj['no_avto']);
                    rootNode.set('iconCls', 'truck');
                    rootNode.set('hid', avto1Obj['hid']); // avto hid
                    rootNode.set('direction', avto1Obj['direction']);
                    rootNode.set('no_avto', avto1Obj['no_avto']);
                    if (konts && !Ext.Object.isEmpty(konts))
                            this.initContsNodes(konts, 0, rootNode);
                    if (gruzs && !Ext.Object.isEmpty(gruzs))
                        this.initGryzyNodes(gruzs, rootNode);
                        // rootNode.expand();

                    this.getTreepanelRight().setTitle(avto2Obj['no_avto']);

                    konts = avto2Obj['konts'];
                    gruzs = avto2Obj['gruzs'];
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
                    rootNode.set('text', avto2Obj['no_avto']);
                    rootNode.set('iconCls', 'truck');
                    rootNode.set('hid', avto2Obj['hid']);   // // avto hid
                    rootNode.set('direction', avto2Obj['direction']);
                    rootNode.set('no_avto', avto2Obj['no_avto']);
                    if (konts && !Ext.Object.isEmpty(konts))
                            this.initContsNodes(konts, 0, rootNode);
                    if (gruzs && !Ext.Object.isEmpty(gruzs))
                        this.initGryzyNodes(gruzs, rootNode);
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

    initContsNodes: function (conts, vagIndx, vagModel) {
        for (var contIndx in conts) {
            var cont = conts[contIndx],
                gryzy = cont['gruzs'],
                contModel = Ext.create('TK.model.ky2.AvtoBindTreeNode', {
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
                this.initGryzyNodes(gryzy, contModel);
            }
        }
    },

    initGryzyNodes: function (gryzy, parentModel) {
        for (var gryzIndx in gryzy) {
            var gryz = gryzy[gryzIndx],
                gryzModel = Ext.create('TK.model.ky2.AvtoBindTreeNode', {
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

    onDropToVag: function (node, dragData, targetVagModel, dropPosition) {
        // var sourceModel = dragData.records[0];

        // if (sourceModel.get('who') === 'cont') {
        //     targetVagModel.set('otpravka', 'CONT');
        // } else if (sourceModel.get('who') === 'gryz') {
        //     targetVagModel.set('otpravka', 'GRUZ');
        // }

        this.sortChildNodes(targetVagModel);

        if (this.sourceVagModel.hasChildNodes()) {
        //     this.sourceVagModel.set('otpravka', undefined);
        // } else {
            this.sortChildNodes(this.sourceVagModel);
         }


    },

    onBeforedropToVag: function (targetModel, position, dragData) {
        var sourceModel = dragData.records[0],
            sourceParentModel = sourceModel.parentNode,
            isDrop;

        // check source
        // isDrop = sourceModel.get('who') !== 'vag'; // vag can't be moved
        // if (isDrop) { // can be moved cont in avto, gruz in avto
        isDrop = sourceParentModel.get('who') !== 'cont';
        // }

        // check target
        if (isDrop) { // can be dropped only in avto
            isDrop = targetModel.get('who') !== 'cont';
        }
        // if (isDrop) { // vag otpravka should be null or the same as in source parent model
        //     isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
        // }

        this.sourceVagModel = isDrop ? sourceParentModel : undefined; // save sourceParentModel to later use it in drop event

        return isDrop;
    },

    bindAvtoToAvto: function (btn) {
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

    bind: function (dataObj, treepanel) {

        var nodeModel = treepanel.getRootNode();
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
    }
});