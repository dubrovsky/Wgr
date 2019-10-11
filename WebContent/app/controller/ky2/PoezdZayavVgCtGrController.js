Ext.define('TK.controller.ky2.PoezdZayavVgCtGrController', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.AbstractTreeForm',
        'ky2.PoezdZayavVgCtGrTreeForm',
        'ky2.poezd.into.PoezdZayavVgCtGrTreeForm',
        'ky2.poezd.out.PoezdZayavVgCtGrTreeForm',
        'ky2.poezd.zayav.PoezdZayavVgCtGrTreeForm'
    ],
    models: [
        'ky2.PoezdVgCtGrTreeNode'
    ],
    stores: [
        'ky2.PoezdVgCtGrTreeNodes'
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
        selector: 'ky2poezdzayavvgctgrtreeform > treepanel'
    }, {
        ref: 'tabpanel',
        selector: 'ky2poezdzayavvgctgrtreeform > tabpanel'
    }, {
        ref: 'addVagBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=addVag]'
    }, {
        ref: 'addContBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=addCont]'
    }, {
        ref: 'addGryzBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=addGryz]'
    }, {
        ref: 'addPlombBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=addPlomb]'
    }, {
        ref: 'delBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=del]'
    }, {
        ref: 'saveBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=save]'
    }, {
        ref: 'saveExitBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=saveExit]'
    }, {
        ref: 'closeBtn',
        selector: 'ky2poezdzayavvgctgrtreeform button[action=close]'
    }, {
        ref: 'vagpanel',
        selector: 'ky2poezdzayavvgctgrtreeform > tabpanel > #vag'
    }, {
        ref: 'contpanel',
        selector: 'ky2poezdzayavvgctgrtreeform > tabpanel > #cont'
    }, {
        ref: 'gryzpanel',
        selector: 'ky2poezdzayavvgctgrtreeform > tabpanel > #gryz'
    }, {
        ref: 'plombpanel',
        selector: 'ky2poezdzayavvgctgrtreeform > tabpanel > #plomb'
    }, {
        ref: 'zayavform',
        selector: 'viewport > tabpanel ky2abstractform#ky2poezdzayavform'
    }],

    init: function () {
        this.control({
            'ky2poezdzayavvgctgrtreeform': {
                beforedestroy: this.getController("ky2.PoezdVgCtGrController").clearVgCtGrForm
            },
            'ky2poezdzayavlist button[action="editVgCtGr"]': {
                click: this.onEditVgCtGr
            },
            'ky2poezdzayavintolist button[action="editVgCtGr"]': {
                click: this.editVgCtGrInto
            },
            'ky2poezdzayavoutlist button[action="editVgCtGr"]': {
                click: this.editVgCtGrOut
            },
            'ky2poezdzayavform button[action="editVgCtGr"]': {
                click: this.onEditVgCtGrFromOutside
            },
            'ky2poezdzayavintoform button[action="editVgCtGr"]': {
                click: this.editVgCtGrIntoFromOutside
            },
            'ky2poezdzayavoutform button[action="editVgCtGr"]': {
                click: this.editVgCtGrOutFromOutside
            },
            'ky2poezdzayavvgctgrtreeform > treepanel': {
                itemclick: this.onTreeNodeClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=addVag]': {
                click: this.onAddVagClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=addGryz]': {
                click: this.onAddGryzClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=addPlomb]': {
                click: this.onAddPlombClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=addCont]': {
                click: this.onAddContClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=del]': {
                click: this.onDelClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=save]': {
                click: this.onSaveClick
            },
            'ky2poezdzayavvgctgrtreeform button[action=saveExit]': {
                click: this.onSaveExit
            },
            'ky2poezdzayavvgctgrtreeform > tabpanel > form field': {
                blur: this.onVgCtGrFormUpdateData
            },
            'ky2poezdzayavvgctgrtreeform button[action=hideVags]': {
                click: this.onHideVagsLeft
            },
            'ky2poezdzayavvgctgrtreeform button[action=showVags]': {
                click: this.onShowVagsLeft
            },
            'ky2poezdzayavvgctgrtreeform button[action=expandConts]': {
                click: this.onExpandConts
            },
            'ky2poezdzayavvgctgrtreeform button[action=collapseConts]': {
                click: this.onCollapseConts
            },
            'ky2poezdzayavvgctgrtreeform button[action="nsiOtpr"]': {
                click: this.onShowNsiOtpr
            }
        });
    },

    onEditVgCtGrFromOutside: function (btn) {
        this.editVgCtGrFromOutside('ky2poezdzayavvgctgrtreeformpoezd', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrIntoFromOutside: function (btn) {
        this.editVgCtGrFromOutside('ky2poezdzayavvgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrOutFromOutside: function (btn) {
        this.editVgCtGrFromOutside('ky2poezdzayavvgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrFromOutside: function (xtype, modelClsName) {
        var record = this.getZayavform().getRecord();
        if (record.get('hid') == null) {
            Ext.Msg.alert('Предупреждение', 'Заявка не сохранена');
            return false;
        }
        this.getController("ky2.PoezdVgCtGrController")
            .editVgCtGr(xtype, modelClsName, record.get('hid'), 'ky2/secure/PoezdZayavVgCtGr.do', 'zayav');
    },

    onEditVgCtGr: function (btn) {
        this.editVgCtGrCheck('ky2poezdzayavvgctgrtreeformpoezd', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrInto: function (btn) {
        this.editVgCtGrCheck('ky2poezdzayavvgctgrtreeformpoezdinto', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrOut: function (btn) {
        this.editVgCtGrCheck('ky2poezdzayavvgctgrtreeformpoezdout', 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    editVgCtGrCheck: function (xtype, modelClsName) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }
        this.getController("ky2.PoezdVgCtGrController")
            .editVgCtGr(xtype, modelClsName, poezdlist.getSelectionModel().getLastSelected().get('hid'), 'ky2/secure/PoezdZayavVgCtGr.do', 'zayav');
    },

    onTreeNodeClick: function (treepanel, record, item, index) {
        this.getController("ky2.PoezdVgCtGrController").treeNodeClick(
            this.getTabpanel(), this.getSaveBtn(), this.getSaveExitBtn(), this.getDelBtn(), this.getAddPlombBtn(), this.getAddGryzBtn(), this.getAddContBtn(), record
        );
    },

    onAddVagClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").addVagClick(
            this.getTreepanel().getRootNode(), 'TK.model.ky2.PoezdVgCtGrTreeNode', this.getTreepanel());
    },

    onAddContClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").addContClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    onAddGryzClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").addGryzClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    onAddPlombClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").addPlombClick(this.getTreepanel(), 'TK.model.ky2.PoezdVgCtGrTreeNode');
    },

    onDelClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").delClick(this.getTreepanel(), this.getDelBtn(), this.getAddContBtn(), this.getAddGryzBtn(), this.getAddPlombBtn());
    },

    onSaveExit: function () {
        this.onSaveClick(1);
    },

    onSaveClick: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").saveClick(this.getTreepanel(), 'ky2/secure/PoezdZayavVgCtGr.do', this.getCloseBtn(), btn, this.getVagpanel(), this.getContpanel(), this.getGryzpanel(), this.getPlombpanel());
    },

    onVgCtGrFormUpdateData: function (field) {
        this.getController("ky2.PoezdVgCtGrController").vgCtGrFormUpdateData(field, this.getTreepanel());
    },

    onHideVagsLeft: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").hideVagsLeft(this.getTreepanel());
    },

    onShowVagsLeft: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").showVagsLeft(this.getTreepanel());
    },

    onExpandConts: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").expandConts(this.getTreepanel());
    },

    onCollapseConts: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").collapseConts(this.getTreepanel());
    },

    onShowNsiOtpr: function (btn) {
        this.getController("ky2.PoezdVgCtGrController").showNsiOtpr(this.getContpanel().getForm());
    }
});