Ext.define('TK.controller.ky2.BindPoezdAndYardController', {
    extend: 'Ext.app.Controller',

    sourceParentModel: undefined,

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
                    if(yardSectorArr && yardSectorArr.length > 0){
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
                    text: yardSector['name'],
                    who: 'yardsector',
                    leaf: false,
                    iconCls: 'vag',
                    allowDrag: false,
                    expanded: true
                    // expanded: (yards && yards['0']) && i === 0
                });

            Ext.Object.each(yardSector, function (prop, value) {
                yardSectorModel.set(prop, value);
            }, this);

            rootNode.appendChild(yardSectorModel);
            if(yards && yards.length > 0){
                // this.initYardNodes(yards, i, yardSectorModel);
            }
        }
    },

    initYardNodes: function (yards, yardIndx, yardSectorModel) {
        for (var i = 0; i < yards.length; i++) {
            var yard = yards[i],
                conts = yard['konts'],
                yardModel = Ext.create('TK.model.ky2.YardBindTreeNode', {
                    text: yard['x'] + '/' + yard['y'] + '/' + yard['z'],
                    who: 'yard',
                    leaf: false,
                    iconCls: 'vag',
                    expanded: yardIndx === 0 && (conts && conts['0']) && i === 0
                });

            Ext.Object.each(yard, function (prop, value) {
                yardModel.set(prop, value);
            }, this);
            yardSectorModel.appendChild(yardModel);
            if(conts && conts.length > 0){
                this.getController('ky2.BindPoezdAndPoezdController').initContsNodes(conts, i, yardModel);
            }
        }
    }

});