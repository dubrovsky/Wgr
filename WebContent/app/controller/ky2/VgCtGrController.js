Ext.define('TK.controller.ky2.VgCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.VgCtGrTreeForm',
        'ky2.poezd.into.VgCtGrTreeForm'
    ],
    models: [
        'ky2.VgCtGrTreeNode'
    ],
    stores: [
        'ky2.VgCtGrTreeNodes'
    ],
    refs: [{
        ref: 'center',
        selector: 'viewport > tabpanel'
    }, {
        ref: 'poezdlist',
        selector: 'viewport > tabpanel grid'
    }, {
        ref: 'ky2treeform',
        selector: 'viewport > tabpanel ky2treeform'
    }, {
        ref: 'treepanel',
        selector: 'ky2vgctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2vgctgrtreeform > tabpanel'
    }, {
        ref: 'addVagBtn',
        selector: 'ky2vgctgrtreeform button[action=addVag]'
    }, {
        ref: 'addContBtn',
        selector: 'ky2vgctgrtreeform button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'ky2vgctgrtreeform button[action=addGryz]'
    }, {
        ref: 'delBtn',
        selector: 'ky2vgctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2vgctgrtreeform button[action=save]'
    }, {
        ref: 'vagpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #vag'
    }, {
        ref: 'contpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #gryz'
    }],
    init: function () {
        this.control({
            'ky2vgctgrtreeform': {
                beforedestroy: this.clearVgCtGrForm
            },
            'ky2poezdintolist button[action="createVags"]': {
                click: this.createVgCtGrInto
            },
            'ky2poezdintolist button[action="editVags"]': {
                click: this.editVgCtGrInto
            },
            'ky2vgctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'ky2vgctgrtreeform button[action=addVag]': {
                click: this.onAddVagClick
            },
            'ky2vgctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2vgctgrtreeform button[action=addCont]': {
                click: this.onAddContClick
            },
            'ky2vgctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2vgctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2vgctgrtreeform > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            }
        });
    },

    createVgCtGrInto: function (btn) {
        this.createVgCtGr('ky2vgctgrintoform', 'TK.model.ky2.VgCtGrTreeNode');
    },

    createVgCtGr: function (xtype, modelClsName) {

        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var /*vagon = Ext.create(modelClsName, {
                'poezd.hid': poezdlist.getSelectionModel().getLastSelected().get('hid')
            }),*/
            vagoncontainer = Ext.widget(xtype, {title: 'Вагон/Контейнер/Груз'});

        // poezdcontainer.down('form').loadRecord(poezd);
        // poezdcontainer.down('form').initFieldsWithDefaultsValues();
        vagoncontainer.setVagId(poezdlist.getSelectionModel().getLastSelected().get('hid'));
        // vagoncontainer.setDirection(direction);
        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().add(vagoncontainer);
    },

    editVgCtGrInto: function (btn) {

    },

    onTreeNodeClick: function (treepanel, record, item, index) {
        var tabBar = this.getTabpanel().getTabBar();
        if (tabBar.isHidden()) {
            tabBar.show();
        }

        var oldTab = this.getTabpanel().getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if (oldTab.getItemId() !== newTabItemId) { // new tab
            this.getTabpanel().items.each(function (tab) {
                if (tab.getItemId() === newTabItemId) {
                    newTab = tab;
                    return false;
                }
            });

            this.getTabpanel().setActiveTab(newTab);
            this.getTabpanel().items.first().tab.setText(newTab.title); // workaround to fix title bug
            oldTab.hide();
        }
        newTab.loadRecord(record);

        // change buttons visibillity
        if (this.getSaveBtn().isHidden()) {
            this.getSaveBtn().show();
        }
        if (this.getDelBtn().isHidden()) {
            this.getDelBtn().show();
        }

        switch (newTabItemId) {
            case 'gryz':
                if(record.parentNode.get('who') === 'vag'){
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isVisible()) {
                        this.getAddContBtn().hide();
                    }
                } else {    // cont
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                }

                break;
            case 'cont':
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }

                break;
            case 'vag':
                if(record.get('otpravka') === 'CONT') {
                    if (this.getAddGryzBtn().isVisible()) {
                        this.getAddGryzBtn().hide();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }

                } else if(record.get('otpravka') === 'GRUZ') {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isVisible()) {
                        this.getAddContBtn().hide();
                    }
                } else {
                    if (this.getAddGryzBtn().isHidden()) {
                        this.getAddGryzBtn().show();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                }

                break;
        }
    },

    onAddVagClick: function (btn) {
        this.addVgCtGr(this.getTreepanel().getRootNode(), 'vag');
    },

    addVgCtGr: function (parentModelNode, who, iconCls) {
        var childModelNode = parentModelNode.appendChild(
            Ext.create('TK.model.ky2.VgCtGrTreeNode', {
                leaf: true,
                who: who,
                iconCls: iconCls ? iconCls : who
            })
        );

        parentModelNode.set('leaf', false);
        parentModelNode.expand();
        this.getTreepanel().getSelectionModel().select(childModelNode);
        this.getTreepanel().fireEvent('itemclick', this.getTreepanel(), childModelNode);
    },

    onAddContClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                parentModelNode.set('otpravka', 'CONT');
                break;
            case 'cont':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode.parentNode; // gruz pod cont
                if (parentModelNode.getId() === 'root') {
                    parentModelNode = selectedModelNode.parentNode; // gruz pod vagonom
                }
                break;
        }

        this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    },

    onAddGryzClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')) {
            case 'vag':
                parentModelNode = selectedModelNode;
                parentModelNode.set('otpravka', 'GRUZ');
                break;
            case 'cont':
                parentModelNode = selectedModelNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode;
                break;
        }
        this.addVgCtGr(parentModelNode, 'gryz');
    },

    onDelClick: function (btn) {
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected();
        var parentModelNode = selectedModelNode.parentNode;

        selectedModelNode.remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();

        if (parentModelNode && parentModelNode.get('who') === 'vag' && !parentModelNode.hasChildNodes()) {
            parentModelNode.set('otpravka', undefined);
        }
    },

    clearVgCtGrForm: function () {
        this.getTreepanel().getRootNode().removeAll();
    },

    onVgCtGrFormUpdateData: function (field) {
        var rec = field.up('form').getRecord(),
            oldVal = rec.get(field.getName()),
            newVal = field.getSubmitValue();

        if (oldVal !== newVal) {
            rec.set(field.getName(), newVal);
            if (field.getName() === 'kgvn' ||
                field.getName() === 'nkon' ||
                field.getName() === 'nvag') {
                rec.set('text', newVal);
            }
        }
    },

    onSaveClick: function (btn) {
        var dataObj = {hid: this.getKy2treeform().getVagId()};

        if (this.getTreepanel().getRootNode().hasChildNodes()) {
            dataObj = this.saveVags(dataObj);
        }

        console.log(dataObj);

        var url = Ext.ModelManager.getModel('TK.model.ky2.VgCtGrTreeNode').getProxy().url;

        Ext.Ajax.request({
            url: url,
            params: {dataObj: Ext.encode(dataObj), action: 'save'},
            scope: this,
            success: function (response) {
                var respObj = Ext.decode(response.responseText);
                console.log(respObj);
            },
            failure: function (response) {
                TK.Utils.makeErrMsg(response, 'Error...');
            }
        });
    },

    saveVags: function (dataObj, direction) {
        var vagIndex = 0;

        dataObj['vagons'] = [];

        this.getTreepanel().getRootNode().eachChild(function (vagNodeModel) { // write vags

            var vagDataObj = {};
            this.getVagpanel().items.each(function (vagItem, index, length) {
                if (vagItem.isXType('field')) {
                    vagDataObj[vagItem.getName()] = vagNodeModel.get(vagItem.getName());
                }
            }, this);
            vagDataObj['sort'] = vagIndex;
            dataObj['vagons'].push(vagDataObj);

            if (vagNodeModel.hasChildNodes()) {
                var childNodeModel = vagNodeModel.getChildAt(0);
                if (vagNodeModel.get('otpravka') === 'CONT') {
                    this.saveConts(vagNodeModel, vagDataObj);
                } else if (vagNodeModel.get('otpravka') === 'GRUZ') {
                    this.saveGryzy(vagNodeModel, vagDataObj);
                }
            }

            vagIndex++;
        }, this);

        return dataObj;
    },

    saveConts: function (vagNodeModel, vagDataObj) {
        var contIndex = 0;
        vagDataObj['konts'] = [];

        vagNodeModel.eachChild(function (contNodeModel) {  // write conts
            var contDataObj = {};

            this.getContpanel().items.each(function (contItem, index, length) {
                if (contItem.isXType('field')) {
                    contDataObj[contItem.getName()] = contNodeModel.get(contItem.getName());
                }
            }, this);
            contDataObj['sort'] = contIndex;
            vagDataObj['konts'].push(contDataObj);

            if (contNodeModel.hasChildNodes()) {
                this.saveGryzy(contNodeModel, contDataObj);
            }

            contIndex++;
        }, this);
    },

    saveGryzy: function (nodeModel, dataObj) {
        var gryzIndex = 0;

        dataObj['gruzs'] = [];
        nodeModel.eachChild(function (gryzNodeModel) {
            var gruzDataObj = {};

            this.getGryzpanel().items.each(function (gryzItem, index, length) {
                if (gryzItem.isXType('field')) {
                    gruzDataObj[gryzItem.getName()] = gryzNodeModel.get(gryzItem.getName());
                }
            }, this);
            gruzDataObj['sort'] = gryzIndex;
            dataObj['gruzs'].push(gruzDataObj);

            gryzIndex++;
        }, this);
    }


});
