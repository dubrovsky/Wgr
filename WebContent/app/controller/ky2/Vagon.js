Ext.define('TK.controller.ky2.Vagon', {
    extend: 'Ext.app.Controller',

    views: [
        'ky2.TreeForm',
        'ky2.VgCtGrTreeForm'
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
    }],
    init: function () {
        this.control({
            'ky2poezdintolist button[action="createVags"]': {
                click: this.createVagsInto
            },
            'ky2poezdintolist button[action="editVags"]': {
                click: this.editVagsInto
            }
        });
    },

    createVagsInto: function (btn) {
        this.createVagon('ky2vagonintoform', 'TK.model.ky2.VagonInto');
    },

    createVagon: function (xtype, modelClsName) {
        var poezdlist = this.getPoezdlist();
        if (!TK.Utils.isRowSelected(poezdlist)) {
            return false;
        }

        var vagon = Ext.create(modelClsName, {
                'poezd.hid': poezdlist.getSelectionModel().getLastSelected().get('hid')
            }),
            vagoncontainer = Ext.widget(xtype, {title: this.titleCreate});

        // poezdcontainer.down('form').loadRecord(poezd);
        // poezdcontainer.down('form').initFieldsWithDefaultsValues();

        this.getCenter().add(vagoncontainer);
    },

    editVagsInto: function (btn) {

    }


});
