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
    },{
        ref: 'treepanel',
        selector: 'ky2vgctgrtreeform > treepanel'
    },{
        ref: 'tabpanel',
        selector: 'ky2vgctgrtreeform > tabpanel'
    },{
        ref: 'addVagBtn',
        selector: 'ky2vgctgrtreeform button[action=addVag]'
    },{
        ref: 'addContBtn',
        selector: 'ky2vgctgrtreeform button[action=addCont]'
    },{
        ref: 'addGryzBtn',
        selector: 'ky2vgctgrtreeform button[action=addGryz]'
    },{
        ref: 'delBtn',
        selector: 'ky2vgctgrtreeform button[action=del]'
    },{
        ref: 'saveBtn',
        selector: 'ky2vgctgrtreeform button[action=save]'
    },{
        ref: 'vagpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #vag'
    },{
        ref: 'contpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #cont'
    },{
        ref: 'gryzpanel',
        selector: 'ky2vgctgrtreeform > tabpanel > #gryz'
    }],
    init: function () {
        this.control({
            'ky2vgctgrtreeform' : {
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

        var vagon = Ext.create(modelClsName, {
                'poezd.hid': poezdlist.getSelectionModel().getLastSelected().get('hid')
            }),
            vagoncontainer = Ext.widget(xtype, {title: 'Вагон/Контейнер/Груз'});

        // poezdcontainer.down('form').loadRecord(poezd);
        // poezdcontainer.down('form').initFieldsWithDefaultsValues();

        this.getCenter().remove(this.getCenter().getComponent(0), true);
        this.getCenter().add(vagoncontainer);
    },

    editVgCtGrInto: function (btn) {

    },

    onTreeNodeClick: function(treepanel, record, item, index){
        var tabBar = this.getTabpanel().getTabBar();
        if(tabBar.isHidden()){
            tabBar.show();
        }

        var oldTab = this.getTabpanel().getActiveTab(),
            newTab = oldTab,
            newTabItemId = record.get('who');

        if(oldTab.getItemId() !== newTabItemId){ // new tab
            this.getTabpanel().items.each(function(tab){
                if(tab.getItemId() === newTabItemId){
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
        if(this.getSaveBtn().isHidden()){
            this.getSaveBtn().show();
        }
        if(this.getDelBtn().isHidden()){
            this.getDelBtn().show();
        }

        switch(newTabItemId){
            case 'gryz':
                if(this.getAddGryzBtn().isHidden()){
                    this.getAddGryzBtn().show();
                }
                if(/*this.isContOtpr() &&*/ this.getAddContBtn().isHidden()){
                    this.getAddContBtn().show();
                }
                break;
            case 'cont':
                if(this.getAddGryzBtn().isHidden()){
                    this.getAddGryzBtn().show();
                }
                if(this.getAddContBtn().isHidden()){
                    this.getAddContBtn().show();
                }
                break;
            case 'vag':
                if (this.getAddGryzBtn().isHidden()) {
                    this.getAddGryzBtn().show();
                }
                if (this.getAddContBtn().isHidden()) {
                    this.getAddContBtn().show();
                }
                /*if(this.isContOtpr()) {
                    if (this.getAddGryzBtn().isVisible()) {
                        this.getAddGryzBtn().hide();
                    }
                    if (this.getAddContBtn().isHidden()) {
                        this.getAddContBtn().show();
                    }
                } else {
                    if(this.getAddGryzBtn().isHidden()){
                        this.getAddGryzBtn().show();
                    }
                }*/
                break;
        }
    },

    onAddVagClick: function(btn){
        this.addVgCtGr(this.getTreepanel().getRootNode(), 'vag');
    },

    addVgCtGr: function(parentModelNode, who, iconCls){
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

    onAddContClick: function(btn){
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')){
            case 'vag':
                parentModelNode = selectedModelNode;
                break;
            case 'cont':
                parentModelNode = selectedModelNode.parentNode;
                break;
            case 'gryz':
                parentModelNode = selectedModelNode.parentNode.parentNode; // gruz pod cont
                if(parentModelNode.getId() === 'root'){
                    parentModelNode = selectedModelNode.parentNode; // gruz pod vagonom
                }
                break;
        }

        this.addVgCtGr(parentModelNode, 'cont', 'cont3');
    },

    onAddGryzClick: function(btn){
        var selectedModelNode = this.getTreepanel().getSelectionModel().getLastSelected(),
            parentModelNode;
        switch (selectedModelNode.get('who')){
            case 'vag':
                parentModelNode = selectedModelNode;
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

    onDelClick: function(btn){
        this.getTreepanel().getSelectionModel().getLastSelected().remove(true, true);
        this.getDelBtn().hide();
        this.getAddContBtn().hide();
        this.getAddGryzBtn().hide();
    },

    clearVgCtGrForm: function () {
        this.getTreepanel().getRootNode().removeAll();
    }

});
