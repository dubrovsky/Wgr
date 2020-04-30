Ext.define('TK.controller.ky2.BindPoezdAndYardController', {
    extend: 'Ext.app.Controller',

    requires: [
        'TK.Utils',
        'TK.Validators',
        'TK.model.ky2.ClientFilterModel',
        'TK.model.ky2.PoezdBindTreeNode',
        'TK.model.ky2.TrainFilterModel',
        'TK.view.ky2.ClientTrainAvtoFilter',
        'TK.view.ky2.yard.MoveKontsToYardsFilter'
    ],


    selectedNodesPoezd: [],  // last selection
    selectedNodesYard: [],  // last selection
    sourceVagModels: [],   // to use in after drop event
    sourceYardModels: [],   // to use in after drop event
    nvagKontMap: new Map(),

    views: [
        'ky2.poezd.into.Poezd2PoezdBindTreeForm',
        'ky2.poezd.out.Poezd2PoezdBindTreeForm',
        'ky2.poezd.into.Poezd2YardBindTreeForm',
        'ky2.poezd.out.Poezd2YardBindTreeForm',
        'ky2.poezd.AbstractPoezd2YardBindTreeForm',
        'ky2.KontByZayavFilter',
        'ky2.yard.MoveKontsToYardsFilter'
    ],
    models: [
        'ky2.YardBindTreeNode',
        'ky2.PoezdBindTreeNode'
    ],
    stores: [
        'ky2.PoezdBindTreeLeftNodes',
        'ky2.PoezdBindTreeRightNodes',
        'ky2.YardBindTreeNodes',
        'ky2.PoezdZayavsFilter'
    ],

    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'poezdform',
        selector: 'viewport > tabpanel ky2bindtreeform'
    }, {
        ref: 'treepanelLeft',
        selector: 'ky2bindtreeform > treepanel#treepanelLeft'
    }, {
        ref: 'treepanelRight',
        selector: 'ky2bindtreeform > treepanel#treepanelRight'
    },{
        ref: 'menutree',
        selector: 'viewport > menutree'
    }],

    init: function () {
        this.listen({
            controller: {
                '*': {
                    onRemoveVagsFromYard: this.onRemoveVagsFromYard
                }
            }
        });

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
                nodedragover: this.beforeDropToYard,
                beforedrop: this.beforeDropDataToYard
            },
            'ky2abstractpoezd2yardbindtreeform treepanel#treepanelRight button[action="zayvlist"]': {
                click: this.buildZayavList
            },
            'ky2abstractpoezd2yardbindtreeform treepanel#treepanelRight button[action="clTrAvtoFilter"]': {
                click: this.buildClTrAvtoFilter
            },
            'ky2abstractpoezd2yardbindtreeform treepanel#treepanelRight button[action="clearFiltr"]': {
                click: this.clearCombo
            },
            /*'ky2poezd2yardbindtreeforminto treepanel#treepanelRight > nodeinterface': {
                collapse: function () {
                    console.log('1');
                }
            },*/
            'ky2poezd2yardbindtreeformout treepanel#treepanelLeft > treeview': {
                drop: this.dropToVag,
                nodedragover: this.beforeDropToVag
            },
            'ky2poezd2yardbindtreeformout treepanel#treepanelRight > treeview': {
                drop: this.dropToYard,
                nodedragover: this.beforeDropToYard,
                beforedrop: this.beforeDropDataToYard,
                itemclick: this.selectYardAndVagon
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
            'ky2poezd2yardbindtreeforminto button[action=saveExit]': {
                click: this.bindPoezdAndYardAndExit
            },
            'ky2poezd2yardbindtreeformout button[action=saveExit]': {
                click: this.bindPoezdAndYardAndExit
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
            },
            'ky2vgctgrtreeform button[action=showPoezd4YardOutBind]': {
                click: this.getPoesdIntoAndYardForBindFromVgCntGr
            },
            'ky2poezd2yardbindtreeforminto button[action=expandConts]': {
                click: this.getController('ky2.BindPoezdAndPoezdController').expandContsLeft
            },
            'ky2poezd2yardbindtreeforminto button[action=collapseConts]': {
                click: this.getController('ky2.BindPoezdAndPoezdController').collapseContsLeft
            },
            'ky2poezd2yardbindtreeformout button[action=expandConts]': {
                click: this.getController('ky2.BindPoezdAndPoezdController').expandContsLeft
            },
            'ky2poezd2yardbindtreeformout button[action=collapseConts]': {
                click: this.getController('ky2.BindPoezdAndPoezdController').collapseContsLeft
            },
            'ky2poezd2yardbindtreeforminto button[action=expandAll]': {
                click: this.expandContsRight
            },
            'ky2poezd2yardbindtreeforminto button[action=collapseAll]': {
                click: this.collapseContsRight
            },
            'ky2poezd2yardbindtreeformout button[action=expandAll]': {
                click: this.expandContsRight
            },
            'ky2poezd2yardbindtreeformout button[action=collapseAll]': {
                click: this.collapseContsRight
            },
            'ky2poezd2yardbindtreeformout combo[name=zayav]': {
                select: this.selectZayav4Filter,
                clearFilter: this.clearCombo
            },
            'ky2movekontstoyardsfilter > grid': {
                comboxrender: this.initBeforeDropFilterComboX,
                comboxchange: this.changeBeforeDropFilterComboX,
                combohchange: this.changeBeforeDropFilterComboH,
                combohfocus: this.focusBeforeDropFilterComboH
            },
            'ky2movekontstoyardsfilter button[action=moveToYards]': {
                click: this.moveBeforeDropFilterDataToYards
            },
            'ky2poezd2yardbindtreeformout button[action="upload"]': {
                click: this.onUploadXLS
            }
            // 'cltravtofilter button[action="filterKY"]': {
            //     click: this.filterKYFn
            // },
        });
    },

    onUploadXLS: function () {
        var win = Ext.create('Ext.window.Window', {
            title: 'Загрузка XLS',
            width: 600, y: 100, modal: true,
            layout: 'fit',
            items: {
                xtype: 'form',
                autoHeight: true,
                bodyStyle: 'padding: 10px 10px 0 10px;',
                labelWidth: 40,
                items: [
                    {
                        xtype: 'filefield',
                        emptyText: 'Выбор файла для загрузки...',
                        fieldLabel: 'Файл',
                        name: 'upload',
                        buttonText: 'Обзор...',
                        anchor: '100%'
                    }
                ],
                buttons: [{
                    text: 'Загрузить',
                    handler: function (btn) {
                        var form = btn.up('form').getForm();
                        if (form.isValid()) {
                            form.submit({
                                url: 'ky2/secure/BindAvtoAndYard.do',
                                params: {action: 'upload'},
                                waitMsg: 'Загрузка',
                                scope: this,
                                success: function (form, action) {
                                    var nkons = Ext.JSON.decode(action.response.responseText).rows[0];
                                    this.applyFilter(nkons);
                                    win.close();
                                }
                                , failure: function (form, action) {
                                    TK.Utils.makeErrMsg(action.response, this.errorMsg);
                                }
                            });
                        }
                    },
                    scope: this
                }, {
                    text: 'Закрыть',
                    handler: function (btn) {
                        btn.up('window').close();
                    }
                }]
            }
        }).show();
    },

    applyFilter: function (nkons) {
        var found = new Set(),
            notfound = new Set(),
            notFoundString = '',
            invalidLastDigit = '';
        this.getTreepanelRight().suspendLayouts();
        this.getTreepanelRight().getRootNode().cascadeBy(function (nodeModel) {
            if (nodeModel.get('who') === 'cont') {
                var parentNode = nodeModel.parentNode.parentNode;
                if (nkons.indexOf(nodeModel.get('nkon')) === -1) {
                    nodeModel.set('cls', 'hideTreeNode');
                    // if (parentNode.isExpanded())
                    //     parentNode.collapse();
                } else {
                    found.add(nodeModel.get('nkon'));
                    nodeModel.set('cls', '');
                    if (!parentNode.isExpanded())
                        parentNode.expand();
                }
            }
        }, this);
        Ext.each(nkons, function (nkon) {
            if (!found.has(nkon)) {
                notfound.add(nkon);
                notFoundString += nkon + ' ';
                var valid = TK.Validators.kontNumLastDigit(nkon);
                if (Ext.isString(valid) || !valid)
                    invalidLastDigit += nkon + ' ';

            }
        });
        this.getTreepanelRight().resumeLayouts(true);
        Ext.Msg.show({
            width: 500,
            title: 'Внимание',
            msg: 'Найдено контейнеров: ' + found.size + '<br>Не найдено: ' + notfound.size + '<br> ' + notFoundString + '<br>' + (invalidLastDigit.length !== 0 ? 'Неверный контрольный знак:<br>' + invalidLastDigit : ''),
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.WARNING
        });
    },


    getPoesdIntoAndYardForBindFromVgCntGr: function (btn) {
        var rootNode = btn.up('panel').down('treepanel').getRootNode();
        if (rootNode.get('direction') === 1) {
            this.getController('ky2.PoezdVgCtGrController').saveClick(null, null, null, btn, null, null, null, null,
                this.getPoesdAndYardForBind.bind(this, 'ky2poezd2yardbindtreeforminto', rootNode.get('hid'), null));
            // this.getPoesdAndYardForBind('ky2poezd2yardbindtreeforminto', rootNode.get('hid'), null);
        } else {
            this.getController('ky2.PoezdVgCtGrController').saveClick(null, null, null, btn, null, null, null, null,
                this.getPoesdAndYardForBind.bind(this, 'ky2poezd2yardbindtreeformout', rootNode.get('hid'), null));
            // this.getPoesdAndYardForBind('ky2poezd2yardbindtreeformout', rootNode.get('hid'), null);
        }
    },

    getPoesdIntoAndYardForBind: function (btn) {
        this.getPoesdOutAndYardForBindCheck('ky2poezd2yardbindtreeforminto');
    },

    getPoesdOutAndYardForBind: function (btn) {
        this.getPoesdOutAndYardForBindCheck('ky2poezd2yardbindtreeformout');
    },

    getPoesdOutAndYardForBindCheck: function (widget) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        this.getPoesdAndYardForBind(widget, poezdlist.getSelectionModel().getLastSelected().get('hid'), null);
    },

    getPoesdAndYardForBind: function (widget, poezdHid, zayavHid) {
        this.getCenter().setLoading(true);
        Ext.Ajax.request({
            url: 'ky2/secure/BindPoezdAndYard.do',
            params: {
                action: 'get_poezd_and_yard_for_bind',
                flag:true, //with history
                'poezdHid': poezdHid
                // 'poezdHid': poezdlist.getSelectionModel().getLastSelected().get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    var respObj = Ext.decode(response.responseText);
                    var poezdObj = respObj['rows'][0];
                    var yardSectorArr = respObj['rows'][1];

                    this.getCenter().remove(this.getCenter().getComponent(0), true);
                    var bindcontainer = Ext.widget(widget, {title: this.titleAddOnConYard});

                    //// fill trees
                    var vags = poezdObj['vagons'];

                    var rootNode = this.getTreepanelLeft().getRootNode();
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        this.initRootNode(rootNode, poezdObj, vags);
                        this.getTreepanelLeft().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(this.labelTrNum + poezdObj['npprm'], rootNode));
                    }

                    this.getTreepanelRight().setTitle(this.titleForYard(this.titleContYard + '<br/>' + '<br/>'));
                    rootNode = this.getTreepanelRight().getRootNode();
                    if (yardSectorArr && yardSectorArr.length > 0) {
                        this.initYardSectorNodes(yardSectorArr, rootNode);
                    }
                    /// END fill tree

                    this.initZayav(bindcontainer, poezdObj['route']['hid'], zayavHid);
                    this.getCenter().add(bindcontainer);

                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                this.getCenter().setLoading(false);
            }
        });
    },

    titleForYard: function (title) {
        return title + this.titleCnumTypeBrTon;
    },

    initZayav: function (bindcontainer, routeId, zayavHids) {
        var combo = bindcontainer.down('kontbyzayavfilter');
        if (combo)
            combo.getStore().load({
                params: {
                    action: 'get_zayavout_for_poezdout',
                    direction: 2,
                    routeId: routeId
                },
                callback: function (options, success, response) {
                    if (success && zayavHids) {
                        combo.select(zayavHids);
                        combo.fireEvent('select', combo, [combo.getStore().findRecord('hid', zayavHids)]);
                    }
                },
                failure: function (response, options) {
                    TK.Utils.makeErrMsg(response, 'Error!..');
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

    /**
     * Инициализация дерева контейнерной площадке (правая панель)
     * @param yardSectorArr массив секуторо
     * @param rootNode корневой элемент дерева
     */
    initYardSectorNodes: function (yardSectorArr, rootNode) {
        console.log('initYardSectorNodes');
        console.log(yardSectorArr);
        // var clFilterStore= Ext.create('TK.store.ky2.ClientFilterStore');
        for (var i = 0; i < yardSectorArr.length; i++) {
            var yardSector = yardSectorArr[i],
                yards = yardSector['yards'],
                yardSectorModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: '',
                    who: 'yardsector',
                    leaf: false,
                    iconCls: 'cont',
                    allowDrag: false,
                    expanded: false
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
        yardSectorModel.set('text', yardSectorModel.get('name') + ' (' + yardSectorModel.get('contsInYardSector') + '/' + (yardSectorModel.get('placesInYardSector') - yardSectorModel.get('contsInYardSector')) + ')');
        yardSectorModel.commit(true); // to remove red triangle
    },

    isHiddenYards: function (model) {
        return (!model.get('typeView') || model.get('typeView') === 1);
    },

    initYardNodes: function (yards, yardIndx, yardSectorModel) {
        var contsSum = 0;
        for (var i = 0; i < yards.length; i++) {
            var yard = yards[i],
                conts = yard['konts'],
                yardModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                    text: this.isHiddenYards(yardSectorModel) ? (yard['x'] + '/' + yard['y'] + '/' + yard['z']) : (yard['x'] + '/' + yard['h']),
                    x: yard['x'],
                    y: yard['y'],
                    z: yard['z'],
                    h: yard['h'],
                    who: 'yard',
                    yardSectorHid: yardSectorModel.get('hid'),
                    leaf: false,
                    iconCls: 'vag',
                    cls: this.isHiddenYards(yardSectorModel) ? 'hideTreeNode' : '',
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
                    // text: this.getController('ky2.BindPoezdAndPoezdController').contNodeText(cont),
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
            contModel.set('text', this.getController('ky2.BindPoezdAndPoezdController').contNodeText(contModel));
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
            if (isDrop) { // can be dropped only in yardsector and yard, checking 'typeView'
                isDrop =
                    (targetModel.get('who') === 'yardsector') ||
                    // (targetModel.get('who') === 'yardsector' && this.isHiddenYards(targetModel)) ||
                    // (targetModel.get('who') === 'yardsector' && !this.isHiddenYards(targetModel) && records.length > 1) ||
                    (targetModel.get('who') === 'yard' && !this.isHiddenYards(targetModel.parentNode) && records.length === 1);
            }
            if (isDrop) {// check free places
                if ((!optParams || optParams['checkFreePlaces']) && targetModel.get('who') === 'yardsector' /*&& this.isHiddenYards(targetModel)*/) {
                    isDrop = (targetModel.get('contsInYardSector') + records.length <= targetModel.get('placesInYardSector'));
                } else if (targetModel.get('who') === 'yard') {
                    isDrop = !targetModel.hasChildNodes();
                }
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
        // this.getTreepanelLeft().suspendLayouts();
        // this.getTreepanelRight().suspendLayouts();
        this.afterDropToYard(dragData.records, targetYardModel);
        // this.getTreepanelLeft().resumeLayouts(true);
        // this.getTreepanelRight().resumeLayouts(true);
    },

    afterDropToVag: function (records, targetVagModel) {
        this.getTreepanelLeft().suspendLayouts();
        this.getTreepanelRight().suspendLayouts();

        targetVagModel.set('otpravka', 'CONT');

        this.getController('ky2.BindPoezdAndPoezdController').sortChildNodes(targetVagModel);

        for (var i = 0; i < records.length; i++) {
            if (records[i].get('yardHid')) { // diff trees - move from yard
                for (var y = 0; y < this.sourceYardModels.length; y++) {
                    if (records[i].get('yardHid') === this.sourceYardModels[y].get('hid')) { // this.sourceYardModels here yards
                        this.sourceYardModels[y].parentNode.set('contsInYardSector', (this.sourceYardModels[y].parentNode.get('contsInYardSector') - 1));
                        this.getTreepanelLeft().getRootNode().set('contsInPoezd', (this.getTreepanelLeft().getRootNode().get('contsInPoezd') + 1));
                        this.updateYardSectorModelText(this.sourceYardModels[y].parentNode);
                        var rootNode = this.getTreepanelLeft().getRootNode();
                        this.getTreepanelLeft().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(this.labelTrNum + rootNode.get('npprm'), rootNode));
                        this.sourceYardModels[y].set('updated', true);
                        this.sourceYardModels[y].parentNode.set('updated', true);
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
                        this.sourceVagModels[i].set('updated', true);
                        break;
                    }
                }
            }
            targetVagModel.set('updated', true); // target vag
            records[i].set('yardSectorHid', null);
            records[i].set('yardHid', null);
            records[i].set('poezdHid', records[i].parentNode.parentNode.get('poezdHid'));
            records[i].set('vagHid', records[i].parentNode.get('hid'));
            records[i].set('cls', 'selectTreeNode');
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];

        this.getTreepanelLeft().resumeLayouts(true);
        this.getTreepanelRight().resumeLayouts(true);
    },

    moveContsToFreeYards: function (records, targetYardSectorModel) {
        if (targetYardSectorModel.get('who') === 'yardsector') {
            for (var i = 0; i < records.length; i++) {
                this.moveContToFreeYard(records[i], targetYardSectorModel);
            }
        }
    },

    moveContsToYards: function (records, targetYardSectorModel) {
        if (targetYardSectorModel.get('who') === 'yardsector') {
            for (var i = 0; i < records.length; i++) {
                this.moveContToYard(records[i], targetYardSectorModel);
            }
        }
    },

    moveContToFreeYard: function (contModel, targetYardSectorModel) {
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
                freeYard.set('updated', true);
            }
        }
    },

    moveContToYard: function (contModel, targetYardSectorModel) {
        if (contModel.get('who') === 'cont') {
            targetYardSectorModel.eachChild(function (yardModel) {
                if (yardModel.get('x') === contModel.get('x') && yardModel.get('h') === contModel.get('h')) {
                    yardModel.insertChild(yardModel.childNodes.length, contModel); // appendChild don't work, no need to remove before insert
                    yardModel.set('updated', true);
                    return false;
                }
            });
        }
    },

    beforeDropDataToYard: function (node, data, targetModel, dropPosition, dropHandlers) {
        this.beforeMoveDataToYard(data.records, targetModel, dropHandlers);
    },

    beforeMoveDataToYard: function (records, targetModel, dropHandlers) {
        if (dropHandlers) {
            dropHandlers.wait = true;
        }
        this.checkSameKontBeforeMoveDataToYard(records, targetModel, dropHandlers, this.moveDataToYard);
    },

    checkSameKontBeforeMoveDataToYard: function (records, targetModel, dropHandlers, moveDataToYardFn) {
        if (targetModel.get('who') === 'yardsector' || targetModel.get('who') === 'yard') {
            var sameKonts = [],
                found;
            for (var i = 0; i < records.length; i++) {
                found = false;
                // check source
                for (var y = (i + 1); y < records.length; y++) {
                    if (records[i].get('nkon') === records[y].get('nkon')) {
                        sameKonts.push(records[i]);
                        found = true;
                    }
                    if (found) {
                        break;
                    }
                }
            }
            for (var i = 0; i < records.length; i++) {
                found = false;
                // check target
                this.getTreepanelRight().getRootNode().eachChild(function (targetVag) {
                    targetVag.eachChild(function (targetYard) {
                        targetYard.eachChild(function (targetKont) {
                            if (records[i].get('nkon') === targetKont.get('nkon') && records[i].get('hid') !== targetKont.get('hid')) {
                                sameKonts.push(records[i]);
                                found = true;
                                return false;
                            }
                        });
                        if (found) {
                            return false;
                        }
                    });
                    if (found) {
                        return false;
                    }
                });
            }
            /*if (targetModel.get('who') === 'yardsector') {
                for (var i = 0; i < records.length; i++) {
                    found = false;
                    // check target
                    targetModel.eachChild(function (targetYard) {
                        targetYard.eachChild(function (targetKont) {
                            if (records[i].get('nkon') === targetKont.get('nkon')) {
                                sameKonts.push(records[i]);
                                found = true;
                                return false;
                            }
                        });
                        if (found) {
                            return false;
                        }
                    });
                }
            } else if (targetModel.get('who') === 'yard') {
                for (var i = 0; i < records.length; i++) {
                    found = false;
                    // check target
                    targetModel.parentNode.eachChild(function (targetYard) {
                        targetYard.eachChild(function (targetKont) {
                            if (records[i].get('nkon') === targetKont.get('nkon')) {
                                sameKonts.push(records[i]);
                                found = true;
                                return false;
                            }
                        });
                        if (found) {
                            return false;
                        }
                    });
                }
            }*/

            if (sameKonts.length > 0) {
                var nkons = '<br>';
                Ext.Object.each(sameKonts, function (prop, value) {
                    nkons += value.data['nkon'] + ' ';
                }, this);
                Ext.Msg.show({
                    title: this.titleWarn,
                    msg: this.warnMsg + nkons,
                    buttons: Ext.Msg.OK,
                    closable: false,
                    icon: Ext.Msg.QUESTION,
                    scope: this
                    // fn: function (buttonId) {
                    //     if (buttonId === 'no') {
                    //         for (var i = 0; i < records.length; i++) {
                    //             for (var y = 0; i < sameKonts.length; i++) {
                    //                 if (records[i].get('nkon') === sameKonts[y].get('nkon')) {
                    //                     records.splice(i, 1);
                    //                     break;
                    //                 }
                    //             }
                    //         }
                    //         moveDataToYardFn.call(this, records, targetModel, dropHandlers);
                    //     } else if (buttonId === 'yes') {
                    //         moveDataToYardFn.call(this, records, targetModel, dropHandlers);
                    //     }
                    // }
                });
            } else {
                moveDataToYardFn.call(this, records, targetModel, dropHandlers);
            }
        } else {
            moveDataToYardFn.call(this, records, targetModel, dropHandlers);
        }
    },

    moveDataToYard: function (records, targetModel, dropHandlers) { // new function is necessary to make dropHandlers work
        if ((targetModel.get('who') === 'yardsector' && this.isHiddenYards(targetModel)) || (targetModel.get('who') === 'yard' && !this.isHiddenYards(targetModel.parentNode) && records.length === 1)) {
            if (dropHandlers) {
                dropHandlers.processDrop();
            } else {
                this.afterDropToYard(records, targetModel);
            }

        } else if (targetModel.get('who') === 'yardsector' && !this.isHiddenYards(targetModel)) { // show filter for multuple move to places
            var win = Ext.widget('ky2movekontstoyardsfilter');
            win.setTargetNode(targetModel);
            win.setDropHandlers(dropHandlers);
            win.child('grid').getStore().loadData(records);
        }
    },

    afterDropToYard: function (records, targetModel, skipMove) {
        this.getTreepanelLeft().suspendLayouts();
        this.getTreepanelRight().suspendLayouts();

        if (!skipMove && targetModel.get('who') === 'yardsector' && this.isHiddenYards(targetModel)) { // remove records from sector to free yards
            this.moveContsToFreeYards(records, targetModel);
        } else if (!skipMove && targetModel.get('who') === 'yardsector' && !this.isHiddenYards(targetModel)) {
            this.moveContsToYards(records, targetModel);
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
                        this.sourceVagModels[y].set('updated', true);
                        break;
                    }
                }
            } else { // same tree
                // if (records[i].get('yardSectorHid')) { // same tree
                for (var y = 0; y < this.sourceYardModels.length; y++) { // // this.sourceYardModels here yardsectors
                    // if (records[i].get('yardSectorHid') === this.sourceYardModels[y].get('hid')) {
                    if (records[i].get('yardHid') === this.sourceYardModels[y].get('hid')) {
                        this.sourceYardModels[y].parentNode.set('contsInYardSector', (this.sourceYardModels[y].parentNode.get('contsInYardSector') - 1));
                        this.getTreepanelLeft().getRootNode().set('contsInPoezd', (this.getTreepanelLeft().getRootNode().get('contsInPoezd') + 1));
                        this.updateYardSectorModelText(this.sourceYardModels[y].parentNode);
                        var rootNode = this.getTreepanelLeft().getRootNode();
                        this.getTreepanelLeft().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(this.labelTrNum + rootNode.get('npprm'), rootNode));
                        this.sourceYardModels[y].set('updated', true);
                        this.sourceYardModels[y].parentNode.set('updated', true);
                        break;
                    }
                }
            }
            targetModel.set('updated', true);  // set sector or yard, 'updated' set for sectors in moveContsToFreeYards()
            if (targetModel.get('who') === 'yard') {
                targetModel.parentNode.set('updated', true);  // set also parent
            }
            records[i].set('yardSectorHid', records[i].parentNode.parentNode.get('hid'));
            records[i].set('yardHid', records[i].parentNode.get('hid'));
            records[i].set('cls', 'selectTreeNode');
            records[i].set('poezdHid', null);
            records[i].set('vagHid', null);
            records[i].set('sort', 0);
        }

        if (targetModel.get('who') === 'yardsector') {
            targetModel.set('contsInYardSector', (targetModel.get('contsInYardSector') + records.length));
            this.getTreepanelLeft().getRootNode().set('contsInPoezd', (this.getTreepanelLeft().getRootNode().get('contsInPoezd') - records.length));
            this.updateYardSectorModelText(targetModel);
            var rootNode = this.getTreepanelLeft().getRootNode();
            this.getTreepanelLeft().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(this.labelTrNum + rootNode.get('npprm'), rootNode));
        } else if (targetModel.get('who') === 'yard') {
            targetModel.parentNode.set('contsInYardSector', (targetModel.parentNode.get('contsInYardSector') + records.length));
            this.getTreepanelLeft().getRootNode().set('contsInPoezd', (this.getTreepanelLeft().getRootNode().get('contsInPoezd') - records.length));
            this.updateYardSectorModelText(targetModel.parentNode);
            var rootNode = this.getTreepanelLeft().getRootNode();
            this.getTreepanelLeft().setTitle(this.getController('ky2.BindPoezdAndPoezdController').titleForPoezd(this.labelTrNum + rootNode.get('npprm'), rootNode));
        }

        this.getTreepanelLeft().getSelectionModel().deselectAll(true);
        this.getTreepanelRight().getSelectionModel().deselectAll(true);
        this.selectedNodesYard = [];
        this.selectedNodesPoezd = [];
        this.sourceVagModels = [];
        this.sourceYardModels = [];

        this.getTreepanelLeft().resumeLayouts(true);
        this.getTreepanelRight().resumeLayouts(true);

        // Ext.Msg.alert('Внимание', 'Свободных мест осталось - ' + (targetModel.get('placesInYardSector') - targetModel.get('contsInYardSector')));
    },

    moveNodesRight: function (btn) {
        /*var targetNode = this.getTreepanelRight().getSelectionModel().getLastSelected();
        if (targetNode && this.getTreepanelRight().getSelectionModel().getSelection().length === 1 && targetNode.get('who') === 'yardsector' && !this.isHiddenYards(targetNode)) {
            this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToYard, null, this, this.beforeMoveDataToYard);
        } else {
            this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToYard, this.afterDropToYard, this);
        }*/

        this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelLeft(), this.getTreepanelRight(), this.checkBeforeMoveToYard, null, this, this.beforeMoveDataToYard);
    },

    moveNodesLeft: function (btn) {
        this.getController('ky2.BindPoezdAndPoezdController').moveNodes(this.getTreepanelRight(), this.getTreepanelLeft(), this.checkBeforeMoveToVag, this.afterDropToVag, this);
    },

    moveAllNodesRight: function (btn) {
        var contNodes = [];
        this.getTreepanelLeft().getRootNode().eachChild(function (vagModel) {
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
        if (targetNode.get('who') !== 'yardsector' || !this.isHiddenYards(targetNode)) {
            return;
        }
        if (targetNode.get('contsInYardSector') >= targetNode.get('placesInYardSector')) {
            return;
        }

        if (!this.checkBeforeMoveToYard(contNodes, targetNode, {checkFreePlaces: false})) {
            return;
        }

        if (targetNode.get('contsInYardSector') + contNodes.length > targetNode.get('placesInYardSector')) {
            Ext.Msg.show({
                title: this.titleWarn,
                msg: this.warnMsg2,
                buttons: Ext.Msg.YESNO,
                closable: false,
                icon: Ext.Msg.QUESTION,
                scope: this,
                fn: function (buttonId) {
                    if (buttonId === 'yes') {
                        this.checkSameKontBeforeMoveDataToYard(contNodes, targetNode, null, this.movePartOfAllNodesRight);
                        // this.movePartOfAllNodesRight(contNodes, targetNode);
                    }
                }
            });
        } else {
            // this.movePartOfAllNodesRight(contNodes, targetNode);
            this.checkSameKontBeforeMoveDataToYard(contNodes, targetNode, null, this.movePartOfAllNodesRight);
        }
    },

    movePartOfAllNodesRight: function (contNodes, targetNode) {
        var insertedContsNodes = []; // not all nodes can be inserted
        var contsInYardSector = targetNode.get('contsInYardSector');

        this.getTreepanelLeft().suspendLayouts();
        this.getTreepanelRight().suspendLayouts();
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
        this.getTreepanelLeft().resumeLayouts(true);
        this.getTreepanelRight().resumeLayouts(true);
        if (insertedContsNodes.length > 0) {
            this.afterDropToYard(insertedContsNodes, targetNode, true);
            targetNode.expand();
        }


    },

    bindPoezdAndYardAndExit: function () {
        this.bindPoezdAndYard(1);
    },

    bindPoezdAndYard: function (close) {
        console.log('save yard bindPoezdAndYard');
        var dataObjLeft = this.getController('ky2.BindPoezdAndPoezdController').bindPoezd(this.getTreepanelLeft().getRootNode());
        var dataObjRight = this.bindYardSectors(this.getTreepanelRight().getRootNode()),
            me=this;

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
                var leftRootNode = this.getTreepanelLeft().getRootNode();
                var rightRootNode = this.getTreepanelRight().getRootNode();
                if (!respObj['message']) {
                    this.clearUpdatedProperty(leftRootNode, rightRootNode);
                    if (!leftRootNode.findChild('who', 'cont', true) && leftRootNode.findChild('who', 'vag', true) && leftRootNode.get('direction') === 1) {
                        this.getController('ky2.PoezdController').getPoezdIntoForPoezdOut(leftRootNode.get('hid'), true);
                    }

                    // //--------------обновление истории контейнера
                    // var historyUpdates=Ext.decode(response.responseText)['rows'];
                    // if(historyUpdates)
                    // {
                    //     historyUpdates[0].forEach(function (historyRec) {
                    //         var kont= me.findNodeByHid(historyRec.kontHid,rightRootNode);
                    //         if(kont)
                    //         {
                    //             if(historyRec.poezdHid) {
                    //                 if(!kont.data.poezd)
                    //                     kont.data.poezd={};
                    //                 kont.data.poezd['npprm'] = historyRec.npprm;
                    //                 kont.data.poezd['hid'] = historyRec.poezdHid;
                    //             }
                    //             if(historyRec.avtoHid) {
                    //                 if (!kont.data.avto)
                    //                     kont.data.avto = {};
                    //                 kont.data.avto['hid'] = historyRec.avtoHid;
                    //             }
                    //         }
                    //     })
                    // }
                    // //--------------обновление истории контейнера

                    if (Ext.isNumber(close)) {
                        var closeBtn = this.getPoezdform().down('button[action="close"]');
                        closeBtn.fireEvent('click', closeBtn);
                    }
                } else { // have rejected conts
                    Ext.Msg.alert('Warning', 'Некоторые контейнеры небыли перемещены - ' + respObj['message'] + '. Повторите операцию после обновления данных.');
                    if (leftRootNode.get('direction') === 1) // reload everything
                        this.getPoesdAndYardForBind('ky2poezd2yardbindtreeforminto', leftRootNode.get('hid'), null);
                    else
                        this.getPoesdAndYardForBind('ky2poezd2yardbindtreeformout', leftRootNode.get('hid'), null);
                }
            },
            failure: function (response) {
                this.getCenter().setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },
    findNodeByHid:function(hid,root)
    {
        if (root.childNodes) {
            for (var nod = 0; nod < root.childNodes.length; nod++) {
                var s_nod = root.childNodes[nod];

                if (s_nod) {
                    for (var cld = 0; cld < s_nod.childNodes.length; cld++) {
                        var l_nod = s_nod.childNodes[cld];
                        if (l_nod.childNodes.length > 0) {
                            var konts = l_nod.childNodes;
                            for (var k_num = 0; k_num < konts.length; k_num++) {
                                if(konts[k_num].data.hid===hid)
                                {
                                    console.log(konts[k_num].data);
                                    return konts[k_num];
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    clearUpdatedProperty: function (leftRootNode, rightRootNode) {
        leftRootNode.eachChild(function (vagNode) {
            vagNode.set('updated', false);
        });

        rightRootNode.eachChild(function (rootnode) {
            rightRootNode.eachChild(function (sectorNode) {
                sectorNode.set('updated', false);
                sectorNode.eachChild(function (yardNode) {
                    yardNode.set('updated', false);
                });
            });
        });
    },

    bindYardSectors: function (rootNodeModel) {
        var dataObj = [];

        if (rootNodeModel.hasChildNodes()) {
            var yardSectorIndex = 0;
            rootNodeModel.eachChild(function (yardSectorNodeModel) {
                if (yardSectorNodeModel.get('updated')) {
                    var yardSectorDataObj = {};
                    yardSectorDataObj['hid'] = yardSectorNodeModel.get('hid');
                    yardSectorDataObj['name'] = yardSectorNodeModel.get('name');
                    yardSectorDataObj['typeView'] = yardSectorNodeModel.get('typeView');

                    dataObj.push(yardSectorDataObj);

                    if (yardSectorNodeModel.hasChildNodes()) {
                        this.bindYards(yardSectorNodeModel, yardSectorDataObj);
                    }

                    yardSectorIndex++;
                }
            }, this);
        }

        return dataObj;
    },

    bindYards: function (yardSectorNodeModel, yardSectorDataObj) {
        var yardIndex = 0;

        yardSectorDataObj['yards'] = [];
        yardSectorNodeModel.eachChild(function (nodeModel) {
            if (nodeModel.get('updated')) {
                var yardDataObj = {};
                yardDataObj['x'] = nodeModel.get('x');
                yardDataObj['y'] = nodeModel.get('y');
                yardDataObj['z'] = nodeModel.get('z');
                yardDataObj['h'] = nodeModel.get('h');
                yardSectorDataObj['yards'].push(yardDataObj);

                /*if (nodeModel.get('who') === 'cont') {
                    yardDataObj['hid'] = nodeModel.get('yardHid');// no yard places
                    var yardModel = Ext.create('TK.model.ky2.PoezdBindTreeNode', {
                        hid: nodeModel.get('yardHid'),
                        yardSectorHid: yardSectorNodeModel.get('hid'),
                        who: 'yard'
                    });
                    yardModel.appendChild(nodeModel.copy(null, true));  // work only copy
                    this.getController('ky2.BindPoezdAndPoezdController').bindConts(yardModel, yardDataObj);  // add cont to virtual place
                    yardModel.destroy();
                } else {*/
                yardDataObj['hid'] = nodeModel.get('hid');
                if (nodeModel.hasChildNodes()) {
                    this.getController('ky2.BindPoezdAndPoezdController').bindConts(nodeModel, yardDataObj);
                }
                // }
                yardIndex++;
            }
        }, this);
    }
    ,

    hideVagsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag' || vagNodeModel.get('who') === 'avto') {
                vagNodeModel.set('cls', 'hideTreeNode');
            }
        }, this);
    },

    showVagsLeft: function (btn) {
        this.getTreepanelLeft().getRootNode().eachChild(function (vagNodeModel) {
            if (vagNodeModel.get('who') === 'vag' || vagNodeModel.get('who') === 'avto') {
                vagNodeModel.set('cls', 'showTreeNode');
            }
        }, this);
    },

    expandContsRight: function (btn) {
        this.getTreepanelRight().suspendLayouts();
        this.getTreepanelRight().getRootNode().collapse(false);
        // this.getTreepanelRight().getRootNode().expandChildren();
        this.getTreepanelRight().getRootNode().eachChild(function (nodeModel) {
            if (nodeModel.get('contsInYardSector') !== 0) {
                nodeModel.set('expanded', true);
            }
        }, this);
        this.getTreepanelRight().getRootNode().expand(false);
        this.getTreepanelRight().resumeLayouts(true);
    },

    collapseContsRight: function (btn) {
        this.getTreepanelRight().suspendLayouts();
        this.getTreepanelRight().getRootNode().collapse(false);
        this.getTreepanelRight().getRootNode().eachChild(function (nodeModel) {
            if (nodeModel.get('contsInYardSector') !== 0) {
                nodeModel.set('expanded', false);
            }
        }, this);
        this.getTreepanelRight().getRootNode().expand(false);
        this.getTreepanelRight().resumeLayouts(true);
    },

    selectZayav4Filter: function (zayavCombo, record) {
        console.log('selectZayav4Filter');
        this.nvagKontMap.clear();
        Ext.Ajax.request({
            url: 'ky2/secure/PoezdZayavVgCtGr.do',
            params: {
                action: 'edit',
                hid: record[0].get('hid')
            },
            scope: this,
            callback: function (options, success, response) {
                if (success) {
                    var respObj = Ext.decode(response.responseText),
                        zayavObj = respObj['rows'][0],
                        vags = zayavObj['vagons'],
                        rootNode = this.getTreepanelRight().getRootNode(),
                        nkons = [];
                    if (vags && !Ext.Object.isEmpty(vags)) {
                        for (var vagIndx in vags) {
                            var vag = vags[vagIndx],
                                conts = vag['konts'];
                            Ext.Object.each(conts, function (prop, value) {
                                // nkons.push(value['nkon']);
                                this.nvagKontMap.set(value['nkon'], vag['nvag']);
                                nkons.push(value['nkon']);
                            }, this);
                        }
                        // if (nkons.length !== 0) {
                        // if (this.nvagKontMap.size !== 0) {
                        //     this.getTreepanelRight().suspendLayouts();
                        //     rootNode.cascadeBy(function (nodeModel) {
                        //         if (nodeModel.get('who') === 'cont')
                        //             // if (nkons.indexOf(nodeModel.get('nkon')) === -1)
                        //             if (!this.nvagKontMap.has(nodeModel.get('nkon')))
                        //                 nodeModel.set('cls', 'hideTreeNode');
                        //             else
                        //                 nodeModel.set('cls', '')
                        //     }, this);
                        //     this.getTreepanelRight().resumeLayouts(true);
                        // }
                        this.applyFilter(nkons);
                    }
                } else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                this.getCenter().setLoading(false);
            }
        });

    },

    clearCombo: function (zayavCombo) {
        this.getTreepanelRight().suspendLayouts();
        this.getTreepanelRight().getRootNode().cascadeBy(function (nodeModel) {
            if (nodeModel.get('who') === 'cont')
                nodeModel.set('cls', '')
        }, this);
        this.getTreepanelRight().resumeLayouts(true);
        this.nvagKontMap.clear();
        if(zayavCombo&&zayavCombo==='combo')
        zayavCombo.clearValue();
    },

    selectYardAndVagon: function (treeview, record, item, index) {
        if (this.nvagKontMap.size !== 0 && record.get('who') === 'cont') {
            var nkon = record.get('nkon'),
                nvag = this.nvagKontMap.get(nkon),
                leftPanel = this.getTreepanelLeft();
            var nvagNode = leftPanel.getRootNode().findChild('nvag', nvag, true);
            if (nvagNode) {
                leftPanel.getSelectionModel().select(nvagNode)
            } else
                leftPanel.getSelectionModel().deselectAll();

        }
    },

    initBeforeDropFilterComboX: function (combo, grid) {
        var yardSectorModel = grid.up('window').getTargetNode();
        var xArray = [];
        yardSectorModel.eachChild(function (yard) {
            var x = yard.get('x');
            if (xArray.indexOf(x) === -1) {   // distinct
                xArray.push(x);
            }
        });

        var xModelArray = [{name: '-', value: ''}];
        for (var i = 0; i < xArray.length; i++) {
            xModelArray.push({name: xArray[i].toString(), value: xArray[i].toString()});
        }
        combo.getStore().loadData(xModelArray);
    },

    changeBeforeDropFilterComboX: function (comboX, grid) {
        var value = comboX.getValue();
        var comboH = grid.down('gridcolumn[dataIndex=h]').field || grid.down('gridcolumn[dataIndex=h]').editor;
        var cellEditing = grid.plugins[0];
        cellEditing.startEdit(grid.getSelectionModel().getLastSelected(), 2); // h column
        comboH.getStore().loadData([]);
        comboH.setValue(null);
        cellEditing.completeEdit();
    },

    focusBeforeDropFilterComboH: function (comboH, grid) {
        // var comboX = grid.down('gridcolumn[dataIndex=x]').field || grid.down('gridcolumn[dataIndex=x]').editor;
        // var value = comboX.getValue();
        var valueX = grid.getSelectionModel().getLastSelected().get("x");
        if (valueX) {
            valueX = parseInt(valueX);
            var yardSectorModel = grid.up('window').getTargetNode();
            var hArray1 = [];
            yardSectorModel.eachChild(function (yard) {
                if (yard.get('x') === valueX && !yard.hasChildNodes()) {
                    hArray1.push(yard.get('h'));
                }
            });

            var hArray2 = [];
            var found = false;
            for (var i = 0; i < hArray1.length; i++) {
                found = false;
                grid.getStore().each(function (model) {
                    if (model.get('x') === valueX && model.get('h') === hArray1[i]) {
                        found = true;
                    }
                    if (found) {
                        return false;
                    }
                });
                if (!found) {
                    hArray2.push(hArray1[i]);
                }
            }

            var xModelArray = [{name: '-', value: ''}];
            for (var i = 0; i < hArray2.length; i++) {
                xModelArray.push({name: hArray2[i].toString(), value: hArray2[i].toString()});
            }

            comboH.getStore().loadData(xModelArray);
        }
    },

    changeBeforeDropFilterComboH: function (comboX, grid) {
        var cellEditing = grid.plugins[0];
        cellEditing.completeEdit();
    },

    moveBeforeDropFilterDataToYards: function (btn) {
        var win = btn.up('window');
        var grid = win.child('grid');
        var error = false;
        grid.getStore().each(function (model) {   // validate
            if (!model.get('x') || !model.get('h')) {
                error = true;
            }
            if (error) {
                return false;
            }
        });
        if (error) {
            Ext.Msg.alert(this.allertTitle, this.allertMsg);
        } else {
            var dropHandlers = win.getDropHandlers();
            if (dropHandlers) {
                dropHandlers.processDrop(); // drag and drop
            } else {
                this.afterDropToYard(win.child('grid').getStore().getRange(), win.getTargetNode());  // move with buttons
                win.getTargetNode().expand();
            }

            win.close();
        }
    },

    onRemoveVagsFromYard: function (vagHidsToRemove) {
        for (var i = 0; i < vagHidsToRemove.length; i++) {
            this.getTreepanelLeft().getRootNode().eachChild(function (vagModel) {
                if (vagHidsToRemove[i] === vagModel.get('hid')) {
                    vagModel.remove(true);
                    return false;
                }
            });
        }
    },
    /**
     *  создает окно фильтрации по  клиенту/заявке и привязывает действие на двойной счелчок по таблице
     * @param btn кнопка вызова
     * @param click щелчок
     * @param url ссылка запроса
     * @param action параметр запроса действие
     * @param store хранилище заявок
     * @param controller контроллер обработки
     */
    buildZayavList:function(btn,click,url,action,store,controller)
    {
        var grid=this.zayavClient(url?url:'ky2/secure/PoezdZayav.do',
            action?action:'get_zayavout_for_poezdout',
            store?store:'TK.store.ky2.PoezdZayavsFilter').getComponent(0);

        grid.on('itemdblclick',this.zayavDblClick,this,this.getController(controller?controller:'ky2.BindPoezdAndYardController'));
    },
    /**
     * Фильтрация по клиентам заявкам
     * @param url ссылка запроса
     * @param action параметр запроса действие
     * @param store хранилище заявок
     * @returns {*}
     */
    zayavClient:function (url,action,store) {
        console.log('zayavClient');
        menuItem = this.getMenutree().lastSelectedLeaf,
            routeID = menuItem.id.split('_')[2];
        return Ext.widget('nsilist', {
            width: 700,
            search: '',
            actionToDo:action,
            buildTitle: function (config) {
                config.title = this.zayavClientTitle;
            },
            buildExtraParams: function () {
                return { action:action,routeId:routeID,direction: 2};
            },
            buildStore: function (config) {
                var me=this;
                config.items.store = Ext.create(store,{

                    proxy: {
                        type: 'ajax',
                        url: url,
                        idParam: 'hid',
                        reader: {
                            type: 'json',
                            root: 'rows',
                            idProperty: 'hid'
                        },
                        extraParams:{
                            action:this.actionToDo,routeId:routeID,direction: 2
                        },

                        writer: {
                            encode: true,
                            root: 'jsonRequest',
                            expandData: true
                        },
                        listeners: {
                            exception: function (proxy, response, operation) {
                                TK.Utils.makeErrMsg(response, me.storeError);
                            }
    }
                    }
                });
            },
            buildColModel: function (config) {
                config.items.columns = [
                    {text: this.zayavClientClmnNZayav, dataIndex: 'noZayav', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.zayavClientClmnClient, dataIndex: 'gruzotpr', flex: 1, renderer: TK.Utils.renderLongStr},
                    {text: this.zayavClientClmnDate, dataIndex: 'dateZayav', flex: 1, renderer: TK.Utils.renderLongStr}
                ];
            }
        });
    },
    /**
     * Вызывает функцию фильтрации дерева
     * @param view окно
     * @param record запись для фильтрации
     * @param itm1
     * @param itm2
     * @param itm3
     * @param controller контроллер
     */
    zayavDblClick:function (view, record,itm1,itm2,itm3,controller) {
        controller.selectZayav4Filter(null, [record]);
        view.up('nsilist').destroy();
    },
    /**
     * Создание окна фильтрации КП по поездам по прибытию и клиентам
     * @param btn кнопка вызова
     * @param click щелчок по кнопке
     * @param ctrl вызывающий контроллер
     */
    buildClTrAvtoFilter:function(btn,click,ctrl)
    {
        var ctrlCur=ctrl?ctrl:this.getController('ky2.BindPoezdAndYardController'),
            root = ctrlCur.getTreepanelRight().getRootNode(),
            win=Ext.create('TK.view.ky2.ClientTrainAvtoFilter'),
            clients = new Ext.util.HashMap(),
            filterBtn=Ext.ComponentQuery.query('cltravtofilter #bottomTB #filterBtn')[0];

        filterBtn.on('click',this.filterKYFn,btn,ctrlCur);

        win.trainStore.clearFilter();
        win.clientStore.clearFilter();
// заполняем хранилища клиентов(clientStore) и поездов (trainStore)
        if (root.childNodes) {
            for (var nod = 0; nod < root.childNodes.length; nod++) {
                var s_nod = root.childNodes[nod];

                if (s_nod) {
                    for (var cld = 0; cld < s_nod.childNodes.length; cld++) {
                        var l_nod = s_nod.childNodes[cld];
                        if(l_nod.childNodes.length>0)
                        {
                            var konts=l_nod.childNodes;
                            for(var k_num=0;k_num<konts.length;k_num++)
                            {
                                var client=konts[k_num].data.client,
                                    poezd=konts[k_num].data.poezd;

                                //  проверяем имя клеента на повтор
                                // уникальные имена добаляем в хранилище
                                if(client) {
                                    if (!clients.get(client.sname)) {
                                        var clientAdd = Ext.create('TK.model.ky2.ClientFilterModel', {
                                            hid: client.hid,
                                            sname: client.sname
                                        });
                                        win.clientStore.add(clientAdd);
                                        clients.add(client.sname, '1');
                                    }
                                    //добавляем поезда в хранилище
                                    if (poezd) {
                                        var poezdAdd = Ext.create('TK.model.ky2.TrainFilterModel', {
                                            hid: poezd.hid,
                                            npprm: poezd.npprm,
                                            sname: client.sname
                                        });
                                        win.trainStore.add(poezdAdd);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        win.show();
    },
    /**
     * Фильруем дерево контейнерной площадки по выбранным параметрам
     * @param btn кнопка вызова
     * @param click счелчок по кнопке
     * @param ctrl вызывающий контроллер
     */
    filterKYFn:function (btn,click,ctrl) {
        var clGrid=btn.up('cltravtofilter').down('panel').getComponent('clPanel').getComponent('clientGrid'),
            trGrid=btn.up('cltravtofilter').down('panel').getComponent('trPanel').getComponent('trainGrid'),
            clients = new Ext.util.HashMap(),
            trains = new Ext.util.HashMap(),
            root = ctrl.getTreepanelRight().getRootNode(),
            avtoFlag=Ext.ComponentQuery.query('cltravtofilter #trPanel #includeTrucks')[0].value;

        // получаем список выбранных клиентов
        Ext.Array.each(clGrid.selModel.getSelection(), function (item) {
            clients.add(item.data.sname,item.data.hid)
        });
        // получаем список выбранных поездов
        Ext.Array.each(trGrid.selModel.getSelection(), function (item) {
            trains.add(item.data.npprm,item.data.hid)
        });

        //Сбрасываем фильтр, если ничего не выбрано
        if(!avtoFlag&&clients.length===0&&trains.length===0)
            this.clearCombo();

        if (root.childNodes) {
            Ext.suspendLayouts();
            root.collapse(false);
            for (var nod = 0; nod < root.childNodes.length; nod++) {
                var s_nod = root.childNodes[nod];

                if (s_nod) {
                    for (var cld = 0; cld < s_nod.childNodes.length; cld++) {
                        var l_nod = s_nod.childNodes[cld];
                        if(l_nod.childNodes.length>0)
                        {
                            var konts=l_nod.childNodes;
                            for(var k_num=0;k_num<konts.length;k_num++)
                            {
                                var client=konts[k_num].data.client,
                                    poezd=konts[k_num].data.poezd,
                                    avto=konts[k_num].data.avto;
                                // прячем контейнеры, не удоавлетворяющие условиям и показываем удобвлетворяющие
                                if(trains.length>0) //вначале фильтруем по номеру поезда или автотранспорту, если флаг Авто установлен
                                {
                                    if((poezd&&trains.get(poezd.npprm)||(avtoFlag&&(avto!==null)))) {
                                        konts[k_num].set('cls', 'showTreeNode');
                                       // konts[k_num].parentNode.parentNode.data.dataexpanded = true;
                                        if(!konts[k_num].parentNode.parentNode.isExpanded())
                                            konts[k_num].parentNode.parentNode.expand();
                                    }
                                    else
                                        konts[k_num].set('cls', 'hideTreeNode');
                                }
                                else
                                {
                                    if((clients.length>0&&client)) // если номера поездов не были выбраны фильтруем по клиенту
                                    {
                                        if(client&&clients.get(client.sname)&&(avtoFlag?avto!==null:true)) {

                                            konts[k_num].set('cls', 'showTreeNode');
                                           // konts[k_num].parentNode.parentNode.data.expanded = true
                                            if(!konts[k_num].parentNode.parentNode.isExpanded())
                                                konts[k_num].parentNode.parentNode.expand();
                                        }
                                        else
                                            konts[k_num].set('cls', 'hideTreeNode');
                                    }
                                }
                            }
                        }
                    }
                }
            }
            root.expand(false);
            Ext.resumeLayouts(false);
        }
        // убиваем окно
        btn.up('cltravtofilter').destroy();
    }
});