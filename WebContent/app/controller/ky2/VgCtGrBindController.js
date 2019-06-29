Ext.define('TK.controller.ky2.VgCtGrBindController', {
    extend: 'Ext.app.Controller',

    sourceVagModel: undefined,
    views: [
        'ky2.poezd.into.PoezdsOutDir',
        'ky2.BasePoezdsOutDir',
        'ky2.poezd.into.PoezdVgCtGrBindTreeForm'
    ],
    models: [
        'ky2.PoezdOutDir',
        'ky2.PoezdVgCtGrBindTreeNode'
    ],
    stores: [
        'ky2.PoezdsOutDir',
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
        selector: 'ky2basepoezdsoutdir'
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
            'ky2basepoezdsoutdir button[action="getPoesdIntoAndPoezdOutForBind"]': {
                click: this.getPoesdIntoAndPoezdOutForBind
            },
            'ky2bindtreeform > treepanel > treeview': {
                drop: this.onDropToVag,
                // beforedrop: this.onBeforedropToVag1,
                nodedragover: this.onBeforedropToVag
            }
        });
    },

    getPoesdIntoAndPoezdOutForBind: function (btn) {
        var poezdlist = this.getPoezdlist(),
            poezdModel = poezdlist.getSelectionModel().getLastSelected(),
            poezdOutDir = this.getPoezdoutdir(),
            poezdsDir = poezdOutDir.getSelectionModel().getSelection(),
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
                action: 'get_poesd_into_and_poezd_out_for_bind',
                'intoPoezdHid': poezdModel.get('hid'),
                'outPoezdHid': poezdDirModel.get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    poezdOutDir.up('window').close();

                    var respObj = Ext.decode(response.responseText);
                    var poezdIntoObj = respObj['rows'][0];
                    var poezdOutObj = respObj['rows'][1];

                    var vgctgrcontainer = Ext.widget('ky2vgctgrtreebindformpoezdinto', {title: '+ На поезд по отправлению'});

                    //// fill trees
                    var vags = poezdIntoObj['vagons'];
                    this.getTreepanelLeft().setTitle(poezdIntoObj['nppr']);
                    var rootNode = this.getTreepanelLeft().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        this.initVagsNodes(vags, rootNode);
                        rootNode.expand();
                    }

                    vags = poezdOutObj['vagons'];
                    this.getTreepanelRight().setTitle(poezdOutObj['nppr']);
                    rootNode = this.getTreepanelRight().getStore().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
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
        rootNode.collapse(); // to avoid second autoload
        rootNode = this.getTreepanelRight().getRootNode();
        rootNode.removeAll();
        rootNode.collapse();
    },

    sortChildNodes: function(treeNodeModel) {
        var index = 0;
        treeNodeModel.eachChild(function (childNodeModel) { // resort
            childNodeModel.set('sort', index);
            index++;
        });
    },

    onDropToVag: function (node, dragData, targetVagModel, dropPosition) {
        var sourceModel = dragData.records[0];

        targetVagModel.set('otpravka', sourceModel.get('who').toUpperCase());
        this.sortChildNodes(targetVagModel);

        if(!this.sourceVagModel.hasChildNodes()){
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
        if(isDrop){ // can be moved cont in vag, gruz in vag
            isDrop = sourceParentModel.get('who') === 'vag';
        }

        // check target
        if(isDrop){ // can be dropped only in vag
            isDrop = targetModel.get('who') === 'vag';
        }
        if(isDrop) { // vag otpravka should be null or the same as in source parent model
            isDrop = !targetModel.get('otpravka') || sourceParentModel.get('otpravka') === targetModel.get('otpravka');
        }

        this.sourceVagModel = isDrop ? sourceParentModel : undefined; // save sourceParentModel to later use it in drop event

        return isDrop;
    }
});