Ext.define('TK.controller.ky.Kont', {
    extend:'Ext.app.Controller',

    mixins: ['TK.controller.FilterUtils'],

    views: [
        'ky.poezd.into.vagon.kont.List',
        'ky.poezd.into.vagon.kont.Form',
        'ky.poezd.out.vagon.kont.List',
        'ky.poezd.out.vagon.kont.Form',
        'ky.poezd.out.vagon.kont.KontsYardDir',
        'ky.BaseKontsInPoezdIntoDirFilter',
        'ky.kontnotransp.List',
        'ky.kontnotransp.Form',
        'ky.kontnotransp.PoezdsOutDir',
        'ky.poezd.out.vagon.kont.KontsInPoezdIntoDir',
        'ky.poezd.into.vagon.kont.YardDir',
        'ky.kontnotransp.YardDir',
        'ky.avto.into.kont.YardDir',
        'ky.BaseKontsInPoezdIntoDir',
        'ky.BaseKontsYardDirFilter',
        'ky.BaseKontsYardDir',
        'ky.BasePoezdsOutDir',
        'ky.BasePoezdsOutDirFilter',
        'ky.BaseKontsNoTranspDir',
        'ky.BaseKontsNoTranspDirFilter',
        'ky.poezd.into.vagon.kont.PoezdsOutDir',
        'ky.avto.into.kont.PoezdsOutDir',
        'ky.poezd.out.vagon.kont.KontsNoTranspDir',
        'ky.BaseKontsAllDirFilter',
        'ky.BaseKontsAllDir',
        'ky.poezd.out.vagon.kont.KontsAllDir',
        'ky.BaseKontsInAvtoIntoDir',
        'ky.avto.into.kont.List',
        'ky.avto.into.kont.Form',
        'ky.avto.out.kont.List',
        'ky.avto.out.kont.Form',
        'ky.BaseKontForm',
        'ky.BaseKontIntoForm',
        'ky.BaseKontOutForm',
        'ky.BaseKontList',
        'ky.BaseKontIntoList',
        'ky.BaseKontOutList',
        'ky.BaseKontsInAvtoIntoDirFilter',
        'ky.poezd.into.vagon.kont.AvtosOutDir',
        'ky.avto.into.kont.AvtosOutDir',
        'ky.BaseAvtosOutDir',
        'ky.BaseAvtosOutDirFilter',
        'ky.kontnotransp.AvtosOutDir',
        'ky.poezd.out.vagon.kont.KontsInAvtoIntoDir',
        'ky.avto.out.kont.KontsInAvtoIntoDir',
        'ky.avto.out.kont.KontsAllDir',
        'ky.avto.out.kont.KontsInPoezdIntoDir',
        'ky.avto.out.kont.KontsNoTranspDir',
        'ky.avto.out.kont.KontsYardDir',
        'ky.yard.kont.Form',
        'ky.poezd.into.vagon.kont.YardCancelDir',
        'ky.avto.into.kont.YardCancelDir',
        'ky.poezd.out.vagon.kont.YardCancelDir',
        'ky.avto.out.kont.YardCancelDir',
        'ky.BaseKontsInPoezdIntoDirForOut',
        'ky.BaseKontsInPoezdIntoDirForYard',
        'ky.BaseKontsInAvtoIntoDirForOut',
        'ky.BaseKontsInAvtoIntoDirForYard',
        'ky.BaseKontsAllDirForOut',
        'ky.BaseKontsAllDirForYard',
        'ky.poezd.BaseKontList',
        'ky.poezd.into.KontList',
        'ky.poezd.out.KontList',
        'ky.KontSearchForm',
        'ky.KontSearchList',
        'ky.KontIntoOutList'
    ],
    stores: [
        'ky.KontsNoTransp',
        'ky.KontsIntoDir',
        'ky.KontsInPoezdInto',
        'ky.KontsInPoezdOut',
        'ky.KontsNoTranspDir',
        'ky.KontsYardDir',
        'ky.KontsAllDir',
        'ky.KontsInAvtoInto',
        'ky.KontsInAvtoOut',
        'ky.KontsInAvtoIntoDir',
        'ky.KontsListInPoezdInto',
        'ky.KontsListInPoezdOut',
        'ky.KontsInAvtoPoezdYardIntoOut'
    ],
    models: [
        'ky.KontAbstract',
        'ky.KontBase',
        'ky.KontInTransp',
        'ky.KontInPoezdInto',
        'ky.KontInPoezdOut',
        'ky.KontNoTrasp',
        'ky.KontNoTranspDir',
        'ky.KontIntoDir',
        'ky.KontAllDir',
        'ky.KontInAvtoInto',
        'ky.KontInAvtoOut',
        'ky.KontInAvtoIntoDir',
        'ky.KontInTranspInto',
        'ky.KontInTranspOut',
        'ky.KontInYard',
        'ky.KontInAvtoPoezdYardIntoOut'
    ],
    refs:[{
        ref: 'center',
        selector: 'viewport > tabpanel'
    },{
        ref: 'vagonlist',
        selector: 'viewport > tabpanel #kyvagonlist'
    },{
        ref: 'kontlist',
        selector: 'viewport > tabpanel #kykontlist'
    },{
        ref: 'avtolist',
        selector: 'viewport > tabpanel #kyavtolist'
    },{
        ref: 'vagonform',
        selector: 'window > kyabstractform#kyvagonform'
    },{
        ref: 'avtoform',
        selector: 'viewport > tabpanel kyabstractform#kyavtoform'
    },{
        ref: 'kontform',
        selector: 'window > #kykontform'
    },{
        ref: 'avtokontform',
        selector: 'window > #kyavtokontform'
    },{
        ref:'gruzlist',
        selector:'window > #kygruzlist'
    },{
        ref:'plomblist',
        selector:'window > #kyplomblist'
    },{
        ref:'yardplacesforkontlist',
        selector:'window > kybaseyarddir'
    },{
        ref:'kontsyardoutlist',
        selector:'kykontsyardoutdir > grid'
    },{
        ref:'kontsyardavtooutlist',
        selector:'kykontsyardavtooutdir > grid'
    },{
        ref:'kontsintoforoutdir',
        selector:'kykontspoezdintoforoutdir > grid'
    },{
        ref:'kontsintoforavtooutdir',
        selector:'kykontspoezdintoforavtooutdir > grid'
    },{
        ref:'kontsavtointoforoutdir',
        selector:'kykontsavtointoforoutdir > grid'
    },{
        ref:'kontsavtointoforavtooutdir',
        selector:'kykontsavtointoforavtooutdir > grid'
    },{
        ref:'kontsnoforoutdir',
        selector:'kykontsnoforoutdir > grid'
    },{
        ref:'kontsnoforavtooutdir',
        selector:'kykontsnoforavtooutdir > grid'
    },{
        ref:'kontsallforoutdir',
        selector:'kykontsallforoutdir > grid'
    },{
        ref:'kontsallforavtooutdir',
        selector:'kykontsallforavtooutdir > grid'
    },{
        ref: 'yardlist',
        selector: 'viewport > tabpanel grid'
    },{
        ref: 'yarddir',
        selector: 'window > kybaseyarddir'
    },{
        ref: 'kontsyarddir',
        selector: 'kybasekontsyarddir'
    },{
        ref: 'kontsintodir',
        selector: 'kybasekontsinpoezdintodir'
    },{
        ref: 'kontsavtointodir',
        selector: 'kybasekontsinavtointodir'
    },{
        ref: 'kontsnotranspdir',
        selector: 'kybasekontsnotranspdir'
    },{
        ref: 'poezdoutdir',
        selector: 'kybasepoezdsoutdir'
    },{
        ref: 'avtooutdir',
        selector: 'kybaseavtosoutdir'
    },{
        ref: 'kykontnotransplist',
        selector: 'kykontnotransplist'
    },{
        ref:'kontspoezdintoforyardlist',
        selector:'kykontsinpoezdintoyarddir > grid'
    },{
        ref:'kontsavtointoforyardlist',
        selector:'kykontsinavtointoyarddir > grid'
    },{
        ref:'kontsnotranspforyardlist',
        selector:'kykontsnotranspyarddir > grid'
    },{
        ref:'kontsallforyardlist',
        selector:'kykontsallyarddir > grid'
    },{
        ref: 'yardform',
        selector: 'kyyardform > form'
    },{
        ref: 'poezdform',
        selector: 'viewport > tabpanel kyabstractform#kypoezdform'
    },{
        ref: 'kontlistinpoezd',
        selector: 'kybasekontlistforpoezd > kyabstractlist#kontListInPoezd'
    }],
    init:function() {
        this.listen({
            store: {
                '#ky.KontsInPoezdOut': {
                    load: this.afterKontsInPoezdOutLoad
                }
            }
        });

        this.control({
            'kykontinpoezdintolist button[action="create"]': {
                click: this.createKontInPoezdInto
            },
            'kyvagonintoform button[action="plusKont"]': {
                click: this.createKontInPoezdInto
            },
            'kykontinpoezdoutlist button[action="create"]': {
                click: this.createKontInPoezdOut
            },
            'kyvagonoutform button[action="plusKont"]': {
                click: this.createKontInPoezdOut
            },

            'kykontinavtointolist button[action="create"]': {
                click: this.createKontInAvtoInto
            },
            'kykontinavtooutlist button[action="create"]': {
                click: this.createKontInAvtoOut
            },

            'kyyardlist button[action="createKont"]': {
                click: this.createKontInYard
            },

            'kykontinpoezdintolist button[action="edit"]': {
                click: this.editKontInPoezdInto
            },
            'kykontlistforpoezdinto button[action="edit"]': {
                click: this.editKontListInPoezdInto
            },
            'kykontlistforpoezdout button[action="edit"]': {
                click: this.editKontListInPoezdOut
            },
            'kykontinpoezdintolist': {
                itemdblclick: this.editKontInPoezdInto,
                select: this.selectKontInListInto
            },
            'kykontlistforpoezdinto > grid#kontListInPoezd': {
                itemdblclick: this.editKontListInPoezdInto
            },
            'kykontlistforpoezdout > grid#kontListInPoezd': {
                itemdblclick: this.editKontListInPoezdOut
            },
            'kykontinavtointolist button[action="edit"]': {
                click: this.editKontInAvtoInto
            },
            'kyyardlist button[action="editKont"]': {
                click: this.editKontInYard
            },
            'kykontinavtointolist': {
                itemdblclick: this.editKontInAvtoInto,
                select: this.selectKontInListInto
            },
            'kykontinpoezdoutlist button[action="edit"]': {
                click: this.editKontInPoezdOut
            },
            'kykontinavtooutlist button[action="edit"]': {
                click: this.editKontInAvtoOut
            },
            'kykontinpoezdoutlist': {
                itemdblclick: this.editKontInPoezdOut,
                select: this.selectKontInListOut
            },
            'kykontinavtooutlist': {
                itemdblclick: this.editKontInAvtoOut,
                select: this.selectKontInListOut
            },
            'kykontinpoezdintolist button[action="delete"]': {
                click: this.deleteKontInPoezdInto
            },
            'kykontinpoezdoutlist button[action="delete"]': {
                click: this.deleteKontInPoezdOut
            },
            'kykontinavtointolist button[action="delete"]': {
                click: this.deleteKontInAvtoInto
            },
            'kykontinavtooutlist button[action="delete"]': {
                click: this.deleteKontInAvtoOut
            },
            'kyyardlist button[action="delKont"]': {
                click: this.deleteKontInYard
            },

            'kykontinpoezdintoform button[action="save"]': {
                click: this.saveKontInPoezdInto
            },
            'kykontinpoezdoutform button[action="save"]': {
                click: this.saveKontInPoezdOut
            },

            'kykontinavtointoform button[action="save"]': {
                click: this.saveKontInAvtoInto
            },
            'kykontinavtooutform button[action="save"]': {
                click: this.saveKontInAvtoOut
            },

            'kykontinyardform button[action="save"]': {
                click: this.saveKontInYard
            },

            // KONTS, NO POEZD INTO
            'kykontnotransplist button[action="create"]': {
                click: this.createKontNoTransp
            },
            'kykontnotransplist button[action="edit"]': {
                click: this.editKontNoTransp
            },
            'kykontnotransplist': {
                itemdblclick: this.editKontNoTransp,
                select: this.selectKontInListInto
            },
            'kykontnotransplist button[action="delete"]': {
                click: this.deleteKontNoTransp
            },
            'kykontnotranspform button[action="save"]': {
                click: this.saveKontNoTransp
            },

            'kyyardforpoezdintodir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesForKontInPoezdIntoSave
            },
            'kyyardcancelforpoezdintodir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesCancelForKontInPoezdIntoSave
            },
            'kyyardcancelforpoezdoutdir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesCancelForKontInPoezdOutSave
            },
            'kyyardcancelforavtointodir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesCancelForKontInAvtoIntoSave
            },
            'kyyardcancelforavtooutdir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesCancelForKontInAvtoOutSave
            },
            'kyyardforavtointodir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesForKontInAvtoIntoSave
            },
            'kyyardnodir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesForKontNoTranspSave
            },
            'kyyardinyarddir button[action="yardPlaceForKontSave"]': {
                click: this.yardPlacesForKontInYardSave
            },


            'kypoezdsoutpoezdintodir button[action="saveKontInPoezdOut"]': {
                click: this.poezdOutForKontInPoezdIntoBind
            },
            'kypoezdsoutavtointodir button[action="saveKontInPoezdOut"]': {
                click: this.poezdOutForKontInAvtoIntoBind
            },
            'kypoezdsoutnotranspdir button[action="saveKontInPoezdOut"]': {
                click: this.poezdOutForKontInNoTranspBind
            },
            'kypoezdsoutyarddir button[action="saveKontInPoezdOut"]': {
                click: this.poezdOutForKontInYardBind
            },

            'kyavtosoutpoezdintodir button[action="saveKontInAvtoOut"]': {
                click: this.avtoOutForKontInPoezdIntoBind
            },
            'kyavtosoutavtointodir button[action="saveKontInAvtoOut"]': {
                click: this.avtoOutForKontInAvtoIntoBind
            },
            'kyavtosoutnotranspdir button[action="saveKontInAvtoOut"]': {
                click: this.avtoOutForKontInNoTranspBind
            },
            'kyavtosoutyarddir button[action="saveKontInAvtoOut"]': {
                click: this.avtoOutForKontInYardBind
            },


            'kykontinpoezdintolist button[action="unbindKontInPoezdOut"]': {
                click: this.unbindKontInPoezdOutFromPoezdInto
            },
            'kykontinavtointolist button[action="unbindKontInPoezdOut"]': {
                click: this.unbindKontInPoezdOutFromAvtoInto
            },
            'kykontinpoezdintolist button[action="unbindKontInAvtoOut"]': {
                click: this.unbindKontInAvtoOutFromPoezdInto
            },
            'kykontinavtointolist button[action="unbindKontInAvtoOut"]': {
                click: this.unbindKontInAvtoOutFromAvtoInto
            },

            'kyyardlist button[action="unbindKont"]': {
                click: this.unbindKontFromYardInYardList
            },

            'kykontinpoezdintolist button[action="unbindYard"]': {
                click: this.unbindYardForKontInPoezdIntoList
            },
            'kykontinavtointolist button[action="unbindYard"]': {
                click: this.unbindYardForKontInAvtoIntoList
            },

            'kykontinpoezdoutlist button[action="kontsInYardDir"]': {
                click: this.kontsForPoezdOutInYardDir
            },
            'kykontinpoezdoutlist button[action="kontsInPoezdIntoDir"]': {
                click: this.kontsForPoezdOutInPoezdIntoDir
            },
            'kykontinpoezdoutlist button[action="kontsInAvtoIntoDir"]': {
                click: this.kontsForPoezdOutInAvtoIntoDir
            },
            'kykontinavtooutlist button[action="kontsInAvtoIntoDir"]': {
                click: this.kontsForAvtoOutInAvtoIntoDir
            },
            'kykontinpoezdoutlist button[action="kontsInNoTranspDir"]': {
                click: this.kontsForPoezdOutInNoTranspDir
            },
            'kykontinpoezdoutlist button[action="kontsInAllDir"]': {
                click: this.kontsForPoezdOutInAllDir
            },


            'kykontinavtooutlist button[action="kontsInYardDir"]': {
                click: this.kontsForAvtoOutInYardDir
            },
            'kykontinavtooutlist button[action="kontsInPoezdIntoDir"]': {
                click: this.kontsForAvtoOutInPoezdIntoDir
            },
            'kykontinavtooutlist button[action="kontsInNoTranspDir"]': {
                click: this.kontsForAvtoOutInNoTranspDir
            },
            'kykontinavtooutlist button[action="kontsInAllDir"]': {
                click: this.kontsForAvtoOutInAllDir
            },


            'kykontinpoezdoutlist button[action="unbindKont"]': {
                click: this.unbindKontFromPoezdOut
            },
            'kykontinavtooutlist button[action="unbindKont"]': {
                click: this.unbindKontFromAvtoOut
            },

            'kykontsyardoutdir button[action="kontsYardForPoezdSave"]': {
                click: this.kontsFromYardForPoezdOutSave
            },
            'kykontspoezdintoforoutdir button[action="kontsIntoSave"]': {
                click: this.kontsFromPoezdIntoForPoezdOutSave
            },
            'kykontsavtointoforoutdir button[action="kontsAvtoIntoSave"]': {
                click: this.kontsFromAvtoIntoForPoezdOutSave
            },
            'kykontsnoforoutdir button[action="kontsNoSave"]': {
                click: this.kontsFromNoTranspForPoezdOutSave
            },
            'kykontsallforoutdir button[action="kontsAllSave"]': {
                click: this.kontsFromAllForPoezdOutSave
            },


            'kykontsyardavtooutdir button[action="kontsYardForPoezdSave"]': {
                click: this.kontsFromYardForAvtoOutSave
            },
            'kykontspoezdintoforavtooutdir button[action="kontsIntoSave"]': {
                click: this.kontsFromPoezdIntoForAvtoOutSave
            },
            'kykontsavtointoforavtooutdir button[action="kontsAvtoIntoSave"]': {
                click: this.kontsFromAvtoIntoForAvtoOutSave
            },
            'kykontsnoforavtooutdir button[action="kontsNoSave"]': {
                click: this.kontsFromNoTranspForAvtoOutSave
            },
            'kykontsallforavtooutdir button[action="kontsAllSave"]': {
                click: this.kontsFromAllForAvtoOutSave
            },


            'kyyardlist button[action="kontsForYardListFromPoezdInto"]': {
                click: this.kontsForYardListFromPoezdInto
            },
            'kyyardlist button[action="kontsForYardListFromAvtoInto"]': {
                click: this.kontsForYardListFromAvtoInto
            },
            'kyyardlist button[action="kontsForYardListFromNoTransp"]': {
                click: this.kontsForYardListFromNoTransp
            },
            'kyyardlist button[action="kontsForYardListFromAll"]': {
                click: this.kontsForYardListFromAll
            },

            'kykontinpoezdintoform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'kykontinpoezdoutform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'kykontnotranspform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'kykontinavtointoform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'kykontinavtooutform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },
            'kykontinyardform button[action="nsiOtpr"]': {
                click: this.showNsiOtpr
            },

            'kybasekontsyarddir button[action="filterKontsYard"]': {
                click: this.filterKontsYard
            },
            'kybasekontsyarddirfilter button[action="applyFilter"]': {
                click: this.applyFilterKontsYard
            },
            'kybasekontsinpoezdintodir button[action="filterKontsInto"]': {
                click: this.filterKontsInto
            },
            'kybasekontsinavtointodir button[action="filterKontsAvtoInto"]': {
                click: this.filterKontsAvtoInto
            },

            'kybasekontsnotranspdir button[action="filterKontsNoTransp"]': {
                click: this.filterKontsNoTransp
            },
            /*'kykontsnotranspyarddir button[action="filterKontsNoTransp"]': {
                click: this.filterKontsNoTransp
            },*/

            'kybasekontsalldir button[action="filterKontsAll"]': {
                click: this.filterKontsAll
            },
            /*'kykontsallyarddir button[action="filterKontsAll"]': {
                click: this.filterKontsAll
            },*/

            'kybasekontsinpoezdintodirfilter button[action="applyFilter"]': {
                click: this.applyFilterKontsInto
            },
            'kybasekontsinavtointodirfilter button[action="applyFilter"]': {
                click: this.applyFilterKontsAvtoInto
            },

            'kybasekontsnotranspdirfilter button[action="applyFilter"]': {
                click: this.applyFilterKontsNoTransp
            },
            'kybasekontsalldirfilter button[action="applyFilter"]': {
                click: this.applyFilterKontsAll
            },

            'kykontinpoezdintolist button[action="poezdOutDirForKont"]': {
                click: this.poezdOutDirForKontInPoezdInto
            },
            'kykontinavtointolist button[action="poezdOutDirForKont"]': {
                click: this.poezdOutDirForKontInAvtoInto
            },
            'kykontnotransplist button[action="poezdOutDirForKont"]': {
                click: this.poezdOutDirForKontInNoTransp
            },
            'kyyardlist button[action="poezdOutDirForKont"]': {
                click: this.poezdOutDirForKontInYard
            },



            'kykontinpoezdintolist button[action="avtoOutDirForKont"]': {
                click: this.avtoOutDirForKontInPoezdInto
            },
            'kykontinavtointolist button[action="avtoOutDirForKont"]': {
                click: this.avtoOutDirForKontInAvtoInto
            },
            'kykontnotransplist button[action="avtoOutDirForKont"]': {
                click: this.avtoOutDirForKontInNoTransp
            },
            'kyyardlist button[action="avtoOutDirForKont"]': {
                click: this.avtoOutDirForKontInYard
            },


            'kybasepoezdsoutdir button[action="filterPoezdsOutDir"]': {
                click: this.filterPoezdsOutDir
            },
            'kybasepoezdsoutdirfilter button[action="applyFilter"]': {
                click: this.applyFilterPoezdOutDir
            },

            'kybaseavtosoutdir button[action="filterAvtosOutDir"]': {
                click: this.filterAvtosOutDir
            },
            'kybaseavtosoutdirfilter button[action="applyFilter"]': {
                click: this.applyFilterAvtoOutDir
            },

            'kykontsinpoezdintoyarddir button[action="kontsIntoSave"]': {
                click: this.kontsForYardInPoezdIntoSave
            },
            'kykontsinavtointoyarddir button[action="kontsAvtoIntoSave"]': {
                click: this.kontsForYardInAvtoIntoSave
            },
            'kykontsnotranspyarddir button[action="kontsNoSave"]': {
                click: this.kontsForYardInNoTranspSave
            },
            'kykontsallyarddir button[action="kontsAllSave"]': {
                click: this.kontsForYardInAllSave
            },

            'kybasekontform textfield#nkon': {
                blur: this.validateField
            },
            'kybasevagonform textfield#nvag': {
                blur: this.validateField
            },
            'kypoezdintoform button[action="kontsInPoezd"]': {
                click: this.kontListInPoezdInto
            },
            'kypoezdoutform button[action="kontsInPoezd"]': {
                click: this.kontListInPoezdOut
            },

            'kybaselist button[action="searchKont"]': {
                click: this.searchKont
            },
            'kykontsearchform button[action="applySearchKont"]': {
                click: this.applySearchKont
            }

        });
    },

    createKontInPoezdInto: function(btn){
        this.createKont('kykontinpoezdintoform',  Ext.create('TK.model.ky.KontInPoezdInto'), 'POEZD');
    },
    createKontInPoezdOut: function(btn){
        this.createKont('kykontinpoezdoutform', Ext.create('TK.model.ky.KontInPoezdOut'), 'POEZD');
    },
    createKontNoTransp: function(btn){
        this.createKont('kykontnotranspform', Ext.create('TK.model.ky.KontNoTrasp'));
    },
    createKontInAvtoInto: function(btn){
        this.createKont('kykontinavtointoform',  Ext.create('TK.model.ky.KontInAvtoInto'), 'AVTO');
    },
    createKontInAvtoOut: function(btn){
        this.createKont('kykontinavtooutform',  Ext.create('TK.model.ky.KontInAvtoOut'), 'AVTO');
    },
    createKontInYard: function(btn){
        var yardlist = this.getYardlist();
        if(!TK.Utils.isRowSelected(yardlist)){
            return false;
        }
        this.createKont('kykontinyardform',  Ext.create('TK.model.ky.KontInYard'), 'YARD');
    },
    createKont: function(xtype, kont, transport){
        this.getCenter().setLoading(true);
        Ext.defer(function() {
            var kontcontainer = Ext.widget(xtype, {title: this.titleCreate});
            kontcontainer.down('form').loadRecord(kont);

            transport = transport || '';
            switch(transport){
                case 'POEZD':
                    var vagonlist = this.getVagonlist(),
                        vagon = vagonlist.getSelectionModel().getLastSelected();

                    kont.setPoezd(vagon.getPoezd());
                    kont.setVagon(vagon);
                    kontcontainer.down('form').initFieldsWithDefaultsValues(vagon, this.getPoezdform().getForm()); // this.getPoezdform().getForm() is used only for pribytie
                    break;
                case 'AVTO':
                    var avtoform = this.getAvtoform(),
                        avto = avtoform.getRecord();

                    kont.setAvto(avto);
                    kontcontainer.down('form').initFieldsWithDefaultsValues(avto);
                    break;
                case 'YARD':
                    var yardlist = this.getYardlist(),
                        yard = yardlist.getSelectionModel().getLastSelected();
                    kont.setYard(yard);
                    kontcontainer.down('form').initFieldsWithDefaultsValues();
                    break;
            }

            this.getCenter().setLoading(false);
        }, 10, this);

    },

    editKontInPoezdInto: function(btn){
        this.editKont('kykontinpoezdintoform', 'POEZD_INTO', this.getKontlist());
    },
    editKontListInPoezdInto: function(btn){
        this.editKont('kykontinpoezdintoform', 'POEZD_INTO', this.getKontlistinpoezd());
    },
    editKontInPoezdOut: function(btn){
        this.editKont('kykontinpoezdoutform', 'POEZD_OUT', this.getKontlist());
    },
    editKontListInPoezdOut: function(btn){
        this.editKont('kykontinpoezdoutform', 'POEZD_OUT', this.getKontlistinpoezd());
    },
    editKontInAvtoInto: function(btn){
        this.editKont('kykontinavtointoform', 'AVTO_INTO', this.getKontlist());
    },
    editKontInAvtoOut: function(btn){
        this.editKont('kykontinavtooutform', 'AVTO_OUT', this.getKontlist());
    },
    editKontNoTransp: function(btn){
        this.editKont('kykontnotranspform', 'NO_TRANSP', this.getKontlist());
    },
    editKontInYard: function(btn){
        this.editKont('kykontinyardform', 'YARD', this.getYardlist());
    },
    editKont: function(xtype, transport, list){

        /*switch (transport){
            case 'YARD':
                list = this.getYardlist();
                break;
            default :
                list = this.getKontlist();
                break;
        }*/

        if(!TK.Utils.isRowSelected(list)){
            return false;
        }

        list.setLoading(true);
        Ext.defer(function() {
            var kont;
            switch (transport){
                case 'YARD':
                    kont = list.getSelectionModel().getLastSelected().getKont();
                    break;
                default :
                    kont = list.getSelectionModel().getLastSelected();
                    break;
            }

            var kontcontainer = Ext.widget(xtype, {title: this.titleEdit});

            kontcontainer.down('form').loadRecord(kont);
            this.showGruzs(kont.gruzs());
            this.showPlombs(kont.plombs());

            list.setLoading(false);
        }, 10, this);

    },

    saveKontInPoezdInto: function(btn){
        this.saveKont("save_in_poezdinto", 'POEZD');
    },
    saveKontInPoezdOut: function(btn){
        this.saveKont("save_in_poezdout", 'POEZD');
    },
    saveKontNoTransp: function(btn){
        this.saveKont("save_no_transp", 'NOTRANSP');
    },
    saveKontInAvtoInto: function(btn){
        this.saveKont("save_in_avtointo", 'AVTO');
    },
    saveKontInAvtoOut: function(btn){
        this.saveKont("save_in_avtoout", 'AVTO');
    },
    saveKontInYard: function(btn){
        this.saveKont("save_in_yard", 'YARD');
    },
    saveKont:function(serverAction, transport){
//        var form = btn.up('form').getForm();
        var form = this.getKontform() || this.getAvtokontform();
        if (form.isValid()) {
            var win = form.up('window'),
                kont = form.getRecord(),
                newKont = (kont.getId() == null),
                values = form.getValues();

            win.setLoading(true);

            kont.set(values);

            transport = transport || '';
            switch (transport){
                case 'POEZD':
                    var vagon = this.getVagonlist().getSelectionModel().getLastSelected();
                    kont.setPoezd(vagon.getPoezd());
                    if(newKont){
                        kont.setVagon(vagon);
                    }
                    break;
                case 'AVTO':
                    if(newKont){
                        kont.setAvto(this.getAvtoform().getRecord());
                    }
                    break;
                case 'YARD':
                    if(newKont){
                        var yard = this.getYardlist().getSelectionModel().getLastSelected();
                        kont.setYard(yard);
                    }
                    break;
            }

            kont.save({
                params:{action: serverAction},
                callback: function(kont, operation, success) {
                    win.setLoading(false);
                    if(success){
                        if(newKont){
                            this.showGruzs(kont.gruzs());
                            this.showPlombs(kont.plombs());
                        }

                        var kontlist;
                        switch (transport){
                            case 'POEZD':
                                if (newKont) {  // new record
                                    kontlist = this.getKontlist();
                                    kontlist.getStore().add(kont);
                                    vagon.konts().add(kont);
                                    this.getPoezdform().getRecord().konts().add(kont);
                                    kontlist.getSelectionModel().select(kont);
                                    this.getVagonlist().getView().refresh();
                                }
                                break;
                            case 'AVTO':
                                if (newKont) {  // new record
                                    kontlist = this.getKontlist();
                                    kontlist.getStore().add(kont);
                                    this.getAvtoform().getRecord().konts().add(kont);
                                    kontlist.getSelectionModel().select(kont);
                                }
                                break;
                            case 'NOTRANSP':
                                this.getKontlist().getStore().reload();
                                break;
                            case 'YARD':
                                if (newKont) {
                                    yard.setKont(kont);
                                }
                                this.getYardlist().getSelectionModel().deselectAll();
                                this.getYardlist().getStore().reload();
                                break;
                        }
                    }
                },
                scope: this
            });
        } else {
            Ext.Msg.alert('Warning', 'Form is not valid');
        }
    },
    showGruzs: function(gruzs){
        var gruzlist = this.getGruzlist();
        if(gruzlist.isHidden()){
            gruzlist.show();
        }

        gruzlist.getStore().removeAll();
        if(gruzs.count() > 0){
//            gruzlist.reconfigure(gruzs);// change konts store in grid
            gruzlist.getStore().add(gruzs.getRange());
            gruzlist.getSelectionModel().select(0); // select 1st row and fire onselect event for gruzlist grid
        }
    },
    showPlombs: function(plombs){
        var plomblist = this.getPlomblist();
        if(plomblist.isHidden()){
            plomblist.show();
        }

        plomblist.getStore().removeAll();
        if(plombs.count() > 0){
//            plomblist.reconfigure(plombs);// change plombs store in grid
            plomblist.getStore().add(plombs.getRange());
            plomblist.getSelectionModel().select(0); // select 1st row and fire onselect event for plomblist grid
        }
    },
    deleteKontInPoezdInto: function(btn){
        this.deleteKont("delete_in_poezdinto", "POEZD_INTO");
    },
    deleteKontInPoezdOut: function(btn){
        this.deleteKont("delete_in_poezdout", "POEZD_OUT");
    },
    deleteKontInAvtoInto: function(btn){
        this.deleteKont("delete_in_avtointo", "AVTO_INTO");
    },
    deleteKontInAvtoOut: function(btn){
        this.deleteKont("delete_in_avtoout", "AVTO_OUT");
    },
    deleteKontNoTransp: function(btn){
        this.deleteKont("delete_no_poezd", "NO_TRANSP");
    },
    deleteKontInYard: function(btn){
        this.deleteKont("delete_in_yard", "YARD");
    },
    deleteKont:function(serverAction, transport){
        var list;

        switch(transport){
            case 'YARD':
                list = this.getYardlist();
                break;
            default :
                list = this.getKontlist();
                break;
        }

        if(!TK.Utils.isRowSelected(list)){
            return false;
        }

        Ext.Msg.show({title:this.delTitle, msg: this.delMsg, buttons: Ext.Msg.YESNO,
            closable: false, icon: Ext.Msg.QUESTION, scope: this,
            fn: function(buttonId) {
                if(buttonId == 'yes'){
                    list.setLoading(true);
                    var kont;
                    switch(transport){
                        case 'YARD':
                            kont = list.getSelectionModel().getLastSelected().getKont();
                            break;
                        default :
                            kont = list.getSelectionModel().getLastSelected();
                            break;
                    }

                    kont.destroy({
                        params:{action: serverAction},
                        callback: function(kont, operation) {
                            list.setLoading(false);
                            switch(transport){
                                case 'POEZD_INTO':
                                case 'POEZD_OUT':
                                   /* kont.getPoezd().konts().remove(kont);
                                    kont.getVagon().konts().remove(kont);*/
                                    var poezd = this.getPoezdform().getRecord();
                                    poezd.konts().remove(kont);
                                    var vagon = this.getVagonlist().getSelectionModel().getLastSelected();
                                    vagon.konts().remove(kont);
                                    this.getVagonlist().getView().refresh();
                                    break;
                                case 'YARD':
                                    list.getStore().reload();
                                    break;
                                default :
                                    break;
                            }
                        },
                        scope: this
                    });
                }
            }
        });
    },
    poezdOutForKontInPoezdIntoBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToPoezdOut('poezdout_for_kont_in_poezdinto_bind', kont, kontlist, 'POEZD_INTO');
    },
    poezdOutForKontInAvtoIntoBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToPoezdOut('poezdout_for_kont_in_avtointo_bind', kont, kontlist, 'AVTO_INTO');
    },
    poezdOutForKontInNoTranspBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToPoezdOut('poezdout_for_kont_in_notransp_bind', kont, kontlist, 'NO_TRANSP');
    },
    poezdOutForKontInYardBind: function(btn){
        var yardlist = this.getYardlist(),
            yard = yardlist.getSelectionModel().getLastSelected();
        this.bindKontToPoezdOut('poezdout_for_kont_in_yard_bind', yard.getKont(), yardlist, 'YARD');
    },
    bindKontToPoezdOut: function(serverAction, kont, list, transport){
        var poezdoutdir = this.getPoezdoutdir(),
            selected = poezdoutdir.getSelectionModel().getSelection(),
            vagon = selected.length > 0 ? selected[0] : null;

        if(vagon == null){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано значение',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        poezdoutdir.setLoading(true);

        switch (transport){
            case 'POEZD_INTO':
            case 'AVTO_INTO':
                kont.setVagonOut(vagon);
                kont.setPoezdOut(vagon.getPoezd());
                break;
        }

        var date = poezdoutdir.down('datefield#dotpDate').getRawValue(),
            time = poezdoutdir.down('timefield#dotpTime').getRawValue();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            //params: {action: serverAction, 'kont.hid': kont.getId(), 'kont.vagonOut.hid': vagon.getId(), 'kont.poezdOut.hid': vagon.getPoezd().getId()},
            params: {action: serverAction, 'kont.hid': kont.getId(), 'kont.dotpDate': date, 'kont.dotpTime': time, 'vagon.hid': vagon.getId(), 'poezd.hid': vagon.getPoezd().getId()},
            scope: this,
            callback:function (options, success, response) {
                list.getSelectionModel().deselectAll();
                if(success){

                    switch (transport){
                        case 'YARD':
                        case 'NO_TRANSP':
                            list.getStore().reload();
                            break;
                        case 'POEZD_INTO':
                        case 'AVTO_INTO':
                            kont.set(kont.getProxy().getReader().read(response)['records'][0].getData());
                            break;
                    }

                    poezdoutdir.up('window').close();

                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                poezdoutdir.setLoading(false);
            }
        });
    },

    avtoOutForKontInPoezdIntoBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToAvtoOut('avtoout_for_kont_in_poezdinto_bind', kont, kontlist, 'POEZD_INTO');
    },
    avtoOutForKontInAvtoIntoBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToAvtoOut('avtoout_for_kont_in_avtointo_bind', kont, kontlist, 'AVTO_INTO');
    },
    avtoOutForKontInNoTranspBind: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.bindKontToAvtoOut('avtoout_for_kont_in_notransp_bind', kont, kontlist, 'NO_TRANSP');
    },
    avtoOutForKontInYardBind: function(btn){
        var yardlist = this.getYardlist(),
            yard = yardlist.getSelectionModel().getLastSelected();
        this.bindKontToAvtoOut('avtoout_for_kont_in_yard_bind', yard.getKont(), yardlist, 'YARD');
    },
    bindKontToAvtoOut: function(serverAction, kont, list, transport){
        var avtooutdir = this.getAvtooutdir(),
            selected = avtooutdir.getSelectionModel().getSelection(),
            avto = selected.length > 0 ? selected[0] : null;

        if(avto == null){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано значение',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        avtooutdir.setLoading(true);

        switch (transport){
            case 'POEZD_INTO':
            case 'AVTO_INTO':
                kont.setAvtoOut(avto);
                break;
        }

        var date = avtooutdir.down('datefield#dotpDate').getRawValue(),
            time = avtooutdir.down('timefield#dotpTime').getRawValue();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            //params: {action: serverAction, 'kont.hid': kont.getId(), 'kont.vagonOut.hid': vagon.getId(), 'kont.poezdOut.hid': vagon.getPoezd().getId()},
            params: {action: serverAction, 'kont.hid': kont.getId(), 'avto.hid': avto.getId(), 'kont.dotpDate': date, 'kont.dotpTime': time},
            scope: this,
            callback:function (options, success, response) {
                list.getSelectionModel().deselectAll();
                if(success){

                    switch (transport){
                        case 'YARD':
                        case 'NO_TRANSP':
                            list.getStore().reload();
                            break;
                        case 'POEZD_INTO':
                        case 'AVTO_INTO':
                            kont.set(kont.getProxy().getReader().read(response)['records'][0].getData());
                            break;
                    }

                    avtooutdir.up('window').close();
                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                avtooutdir.setLoading(false);
            }
        });
    },

    yardPlacesForKontInPoezdIntoSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_for_kont_in_poezdinto_bind', kont, kontlist, 'POEZD_INTO');
    },
    yardPlacesCancelForKontInPoezdIntoSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_cancel_for_kont_in_poezdinto_bind', kont, kontlist, 'POEZD_INTO');
    },
    yardPlacesCancelForKontInPoezdOutSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_cancel_for_kont_in_poezdout_bind', kont, kontlist, 'POEZD_OUT');
    },
    yardPlacesCancelForKontInAvtoIntoSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_cancel_for_kont_in_avtointo_bind', kont, kontlist, 'AVTO_INTO');
    },
    yardPlacesCancelForKontInAvtoOutSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_cancel_for_kont_in_avtoout_bind', kont, kontlist, 'AVTO_OUT');
    },
    yardPlacesForKontInAvtoIntoSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_for_kont_in_avtointo_bind', kont, kontlist, 'AVTO_INTO');
    },
    yardPlacesForKontNoTranspSave: function(btn){
        var kontlist = this.getKontlist(),
            kont = kontlist.getSelectionModel().getLastSelected();
        this.yardPlaceForKontSave('yardplace_for_kont_in_no_transp_bind', kont, kontlist, 'NO_TRANSP');
    },
    yardPlacesForKontInYardSave: function(btn){
        var yardlist = this.getYardlist(),
            kont = yardlist.getSelectionModel().getLastSelected().getKont();
        this.yardPlaceForKontSave('kont_in_yard_relocate', kont, yardlist, 'YARD');
    },
    yardPlaceForKontSave: function(serverAction, kont, list, transport){
        var yardplacesforkontlist = this.getYardplacesforkontlist(),
            selectedYardsArr = yardplacesforkontlist.getSelectionModel().getSelection(),
            yard = selectedYardsArr.length > 0 ? selectedYardsArr[0] : null;

        if(yard == null){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбрано место',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        yardplacesforkontlist.setLoading(true);
        kont.setYard(yard);

        var date = yardplacesforkontlist.down('datefield#dyardDate').getRawValue(),
            time = yardplacesforkontlist.down('timefield#dyardTime').getRawValue();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: serverAction, 'kont.hid': kont.getId(), 'kont.yard.hid': yard.getId(), 'kont.dyardDate': date, 'kont.dyardTime': time},
            scope: this,
            callback:function (options, success, response) {
                list.getSelectionModel().deselectAll();
                if(success){
                    switch(transport) {
                        case 'YARD':
                        case 'NO_TRANSP':
                            list.getStore().reload();
                            break;
                        case 'POEZD_INTO':
                        case 'AVTO_INTO':
                            kont.set(kont.getProxy().getReader().read(response)['records'][0].getData());
                            break;
                        case 'POEZD_OUT':
                            kont.setVagon(null);
                            kont.setPoezd(null);
                            var vagon = this.getVagonlist().getSelectionModel().getLastSelected();
                            list.getStore().reload({params: {action: 'konts_list_for_poezd_out', hid: vagon.getId()}});
                            break;
                        case 'AVTO_OUT':
                            kont.setAvto(null);
                            var avto = this.getAvtoform().getRecord();
                            list.getStore().reload({params: {action: 'konts_list_for_avto_out', hid: avto.getId()}});
                            break;
                    }
                    this.getYarddir().up('window').close();
                    //btn.up('window').close();
                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                yardplacesforkontlist.setLoading(false);
            }
        });
    },

    kontsForYardInPoezdIntoSave: function(btn){
        this.kontsForYardSave('kont_for_yardplaces_in_yard_bind', this.getKontspoezdintoforyardlist());
    },
    kontsForYardInAvtoIntoSave: function(btn){
        this.kontsForYardSave('kont_for_yardplaces_in_yard_bind', this.getKontsavtointoforyardlist());
    },
    kontsForYardInNoTranspSave: function(btn){
        this.kontsForYardSave('kont_for_yardplaces_in_yard_bind', this.getKontsnotranspforyardlist());
    },
    kontsForYardInAllSave: function(btn){
        this.kontsForYardSave('kont_for_yardplaces_in_yard_bind', this.getKontsallforyardlist());
    },
    kontsForYardSave: function(action, kontsforyardlist){
        var selectedKontsArr = kontsforyardlist.getSelectionModel().getSelection(),
            kont = selectedKontsArr.length > 0 ? selectedKontsArr[0] : null,
            yardlist = this.getYardlist(),
            yard = yardlist.getSelectionModel().getLastSelected();

        if(kont == null){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбран контейнер',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        kontsforyardlist.setLoading(true);
        yard.setKont(kont);

        var date = kontsforyardlist.down('datefield#dyardDate').getRawValue(),
            time = kontsforyardlist.down('timefield#dyardTime').getRawValue();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: action, 'kont.hid': kont.getId(), 'kont.yard.hid': yard.getId(), 'kont.dyardDate': date, 'kont.dyardTime': time},
            scope: this,
            callback:function (options, success, response) {
                yardlist.getSelectionModel().deselectAll();
                kontsforyardlist.setLoading(false);
                if(success){
                    yardlist.getStore().reload();
                    kontsforyardlist.up('window').close();
                    //yard.set(yard.getProxy().getReader().read(response)['records'][0].getData());
                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }

            }
        });

    },

    unbindYardForKontInPoezdIntoList: function(btn){
        this.unbindKont('yardplace_for_kont_in_poezdinto_unbind', 'YARD');
    },
    unbindYardForKontInAvtoIntoList: function(btn){
        this.unbindKont('yardplace_for_kont_in_avtointo_unbind', 'YARD');
    },

    unbindKontInPoezdOutFromPoezdInto: function(btn){
        this.unbindKont('kont_for_poezdout_from_poezdinto_unbind', 'POEZD_OUT');
    },
    unbindKontInPoezdOutFromAvtoInto: function(btn){
        this.unbindKont('kont_for_poezdout_from_avtointo_unbind', 'POEZD_OUT');
    },
    unbindKontInAvtoOutFromPoezdInto: function(btn){
        this.unbindKont('kont_for_avtoout_from_poezdinto_unbind', 'AVTO_OUT');
    },
    unbindKontInAvtoOutFromAvtoInto: function(btn){
        this.unbindKont('kont_for_avtoout_from_avtointo_unbind', 'AVTO_OUT');
    },

    unbindKont: function(serverAction, transport){
        var kontlist = this.getKontlist();
        if(!TK.Utils.isRowSelected(kontlist)){
            return false;
        }

        var kont = kontlist.getSelectionModel().getLastSelected();

        kontlist.setLoading(true);

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: serverAction, 'kont.hid': kont.getId()},
            scope: this,
            callback:function (options, success, response) {
                if(success){
                    var responseObj = Ext.decode(response.responseText);
                    if(responseObj.success){
                        switch(transport){
                            case 'YARD':
                                kont.setYard(null);
                                break;
                            case 'POEZD_OUT':
                                kont.setVagonOut(null);
                                kont.setPoezdOut(null);
                                break;
                            case 'AVTO_OUT':
                                kont.setAvtoOut(null);
                                break;
                        }

                        kontlist.getSelectionModel().deselectAll();

                        kont.set(kont.getProxy().getReader().read(response)['records'][0].getData());
                    } else { // if false - it's yard place and it's busy, let's show win to choose another place
                        kontlist.fireEvent('yardCancel');
                    }

                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                kontlist.setLoading(false);
            }
        });

    },

    unbindKontFromYardInYardList: function(btn){
        var yardlist = this.getYardlist();
        if(!TK.Utils.isRowSelected(yardlist)){
            return false;
        }

        var yard = yardlist.getSelectionModel().getLastSelected();

        yardlist.setLoading(true);

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: 'kont_from_yard_in_yard_unbind', 'kont.hid': yard.getKont().getId()},
            scope: this,
            callback:function (options, success, response) {
                yard.setKont(null);
                yardlist.getSelectionModel().deselectAll();
                if(success){
                    yardlist.getStore().reload();
                }
                else {
                    TK.Utils.makeErrMsg(response, 'Error!..');
                }
                yardlist.setLoading(false);
            }
        });

    },

    kontsForYardListFromPoezdInto: function(btn){
        this.kontsForYardList('konts_dir_from_poezd_into', 'kykontsinpoezdintoyarddir');
    },
    kontsForYardListFromAvtoInto: function(btn){
        this.kontsForYardList('konts_dir_from_avto_into', 'kykontsinavtointoyarddir');
    },
    kontsForYardListFromNoTransp: function(btn){
        this.kontsForYardList('konts_dir_from_no_transp', 'kykontsnotranspyarddir');
    },
    kontsForYardListFromAll: function(btn){
        this.kontsForYardList('konts_dir_for_yard_from_all', 'kykontsallyarddir');
    },
    kontsForYardList: function(action, widget){
        var yardlist = this.getYardlist();
        if(!TK.Utils.isRowSelected(yardlist)){
            return false;
        }

        var win = Ext.widget(widget),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: action};
        store.load();
    },
    poezdOutDirForKontInPoezdInto:function(btn){
        this.poezdOutDirForKont('kypoezdsoutpoezdintodir',this.getKontlist());
    },
    poezdOutDirForKontInAvtoInto:function(btn){
        this.poezdOutDirForKont('kypoezdsoutavtointodir',this.getKontlist());
    },
    poezdOutDirForKontInNoTransp:function(btn){
        this.poezdOutDirForKont('kypoezdsoutnotranspdir',this.getKontlist());
    },
    poezdOutDirForKontInYard:function(btn){
        this.poezdOutDirForKont('kypoezdsoutyarddir',this.getYardlist());
    },
    poezdOutDirForKont:function(widget, list){
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }

        var win = Ext.widget(widget),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: 'poezdout_dir_for_kont_list'};
        store.load();
    },

    avtoOutDirForKontInPoezdInto:function(btn){
        this.avtoOutDirForKont('kyavtosoutpoezdintodir',this.getKontlist());
    },
    avtoOutDirForKontInAvtoInto:function(btn){
        this.avtoOutDirForKont('kyavtosoutavtointodir',this.getKontlist());
    },
    avtoOutDirForKontInNoTransp:function(btn){
        this.avtoOutDirForKont('kyavtosoutnotranspdir',this.getKontlist());
    },
    avtoOutDirForKontInYard:function(btn){
        this.avtoOutDirForKont('kyavtosoutyarddir',this.getYardlist());
    },
    avtoOutDirForKont:function(widget, list){
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }

        var win = Ext.widget(widget),
            store = win.down('grid').getStore();

        store.getProxy().extraParams = {action: 'avtoout_dir_for_kont_list'};
        store.load();
    },

    selectKontInListOut: function(rowModel, kont, index){
        var kontlist = this.getKontlist(),
            unbindKontBtn = kontlist.down('button[action="unbindKont"]');

        if(unbindKontBtn){
            unbindKontBtn.setDisabled(kont.get('prevStatus') != 'POEZD_INTO' && kont.get('prevStatus') != 'AVTO_INTO' && kont.get('prevStatus') != 'YARD' && kont.get('status') != 'NO_TRANSP');
        }
    },

    selectKontInListInto: function(rowModel, kont, index){
        var kontlist = this.getKontlist(),
            unbindYardBtn = kontlist.down('button[action="unbindYard"]'),
            bindYardBtn = kontlist.down('button[action="yardPlacesForKontList"]'),
            poezdOutDirForKontBtn = kontlist.down('button[action="poezdOutDirForKont"]'),
            unbindKontInPoezdOutBtn = kontlist.down('button[action="unbindKontInPoezdOut"]'),
            avtoOutDirForKontBtn = kontlist.down('button[action="avtoOutDirForKont"]'),
            unbindKontInAvtoOutBtn = kontlist.down('button[action="unbindKontInAvtoOut"]');

        if(bindYardBtn){
            bindYardBtn.setDisabled(kont.get('status') != 'POEZD_INTO' && kont.get('status') != 'AVTO_INTO' && kont.get('status') != 'NO_TRANSP');
        }
        if(unbindYardBtn){
            unbindYardBtn.setDisabled(kont.get('status') != 'YARD'); // != yard 2
        }

        if(poezdOutDirForKontBtn){
            poezdOutDirForKontBtn.setDisabled(kont.get('status') != 'POEZD_INTO' && kont.get('status') != 'AVTO_INTO' && kont.get('status') != 'NO_TRANSP' && kont.get('status') != 'YARD');
        }
        if(unbindKontInPoezdOutBtn){
            unbindKontInPoezdOutBtn.setDisabled(kont.get('status') != 'POEZD_OUT');
        }

        if(avtoOutDirForKontBtn){
            avtoOutDirForKontBtn.setDisabled(kont.get('status') != 'POEZD_INTO' && kont.get('status') != 'AVTO_INTO' && kont.get('status') != 'NO_TRANSP' && kont.get('status') != 'YARD');
        }
        if(unbindKontInAvtoOutBtn){
            unbindKontInAvtoOutBtn.setDisabled(kont.get('status') != 'AVTO_OUT');
        }
    },


    kontsForPoezdOutInYardDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsyardoutdir', 'konts_dir_from_yard', 'POEZD_OUT');
    },
    kontsForPoezdOutInPoezdIntoDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontspoezdintoforoutdir', 'konts_dir_from_poezd_into', 'POEZD_OUT');
    },
    kontsForPoezdOutInAvtoIntoDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsavtointoforoutdir', 'konts_dir_from_avto_into', 'POEZD_OUT');
    },
    kontsForAvtoOutInAvtoIntoDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsavtointoforavtooutdir', 'konts_dir_from_avto_into', 'AVTO_OUT');
    },
    kontsForPoezdOutInNoTranspDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsnoforoutdir', 'konts_dir_from_no_transp', 'POEZD_OUT');
    },
    kontsForPoezdOutInAllDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsallforoutdir', 'konts_dir_for_poezd_out_from_all', 'POEZD_OUT');
    },

    kontsForAvtoOutInYardDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsyardavtooutdir', 'konts_dir_from_yard', 'AVTO_OUT');
    },
    kontsForAvtoOutInPoezdIntoDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontspoezdintoforavtooutdir', 'konts_dir_from_poezd_into', 'AVTO_OUT');
    },
    kontsForAvtoOutInNoTranspDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsnoforavtooutdir', 'konts_dir_from_no_transp', 'AVTO_OUT');
    },
    kontsForAvtoOutInAllDir: function(btn){
        this.kontsFromDirForAvtoAndPoezdOut('kykontsallforavtooutdir', 'konts_dir_for_avto_out_from_all', 'AVTO_OUT');
    },

    kontsFromDirForAvtoAndPoezdOut: function(xtype, action, transport){
        var winDir = Ext.widget(xtype),
            store = winDir.down('grid').getStore(),
            model;

        switch(transport){
            case 'POEZD_OUT':
                model = this.getPoezdform().getRecord();
                break;
            case 'AVTO_OUT':
                model = this.getAvtoform().getRecord();
                break;
        }
        winDir.down('datefield#dotpDate').setValue(model.get('dotpDate'));
        winDir.down('timefield#dotpTime').setValue(model.get('dotpTime'));

        store.getProxy().extraParams = {action: action};
        store.load();
    },

    unbindKontFromPoezdOut: function(btn){
        this.unbindKontFromOut('kont_for_poezdout_from_poezdout_unbind', 'POEZD_OUT');
    },

    unbindKontFromAvtoOut: function(btn){
        this.unbindKontFromOut('kont_for_avtoout_from_avtoout_unbind', 'AVTO_OUT');
    },

    unbindKontFromOut: function(action, transport){
        var list = this.getKontlist();
        if(!TK.Utils.isRowSelected(list)){
            return false;
        }
        list.setLoading(true);
        var kont = list.getSelectionModel().getLastSelected();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: action, 'kont.hid': kont.getId()},
            scope: this,
            success: function (response, options) {
                var responseObj = Ext.decode(response.responseText);
                list.setLoading(false);
                if(responseObj.success) {
                    switch(transport){
                        case 'POEZD_OUT':
                            kont.setVagon(null);
                            kont.setPoezd(null);
                            var vagon = this.getVagonlist().getSelectionModel().getLastSelected();
                            list.getStore().reload({params: {action: 'konts_list_for_poezd_out', hid: vagon.getId()}});
                            break;
                        case 'AVTO_OUT':
                            kont.setAvto(null);
                            var avto = this.getAvtoform().getRecord();
                            list.getStore().reload({params: {action: 'konts_list_for_avto_out', hid: avto.getId()}});
                            break;
                    }

                } else { // if false - it's yard place and it's busy, let's show win to choose another place
                    list.fireEvent('yardCancel');
                }
            },
            failure: function (response, options) {
                list.setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error!..');
            }
        });
    },

    kontsFromYardForPoezdOutSave: function(btn){
        this.kontsFromDirForPoezdOutSave(this.getKontsyardoutlist(), 'konts_for_poezdout_in_yard_bind');
    },
    kontsFromPoezdIntoForPoezdOutSave: function(btn){
        this.kontsFromDirForPoezdOutSave(this.getKontsintoforoutdir(), 'konts_for_poezdout_in_poezdinto_bind');
    },
    kontsFromAvtoIntoForPoezdOutSave: function(btn){
        this.kontsFromDirForPoezdOutSave(this.getKontsavtointoforoutdir(), 'konts_for_poezdout_in_avtointo_bind');
    },
    kontsFromNoTranspForPoezdOutSave: function(btn){
        this.kontsFromDirForPoezdOutSave(this.getKontsnoforoutdir(), 'konts_for_poezdout_in_notransp_bind');
    },
    kontsFromAllForPoezdOutSave: function(btn){
        this.kontsFromDirForPoezdOutSave(this.getKontsallforoutdir(), 'konts_for_poezdout_in_all_bind');
    },
    kontsFromDirForPoezdOutSave: function(list, action){
        var selectedKonts = list.getSelectionModel().getSelection();

        if(selectedKonts.length == 0){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбраны контейнера',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        var vagon = this.getVagonlist().getSelectionModel().getLastSelected(),
            selectedKontsHids = [];

        list.setLoading(true);
        for(var i = 0; i < selectedKonts.length; i++){
            selectedKontsHids.push(selectedKonts[i].getId());
        }

        var date = list.down('datefield#dotpDate').getRawValue(),
            time = list.down('timefield#dotpTime').getRawValue();


        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: action, jsonRequest: Ext.encode(selectedKontsHids), 'vagon.hid': vagon.getId(), 'poezd.hid': vagon.getPoezd().getId(), 'kont.dotpDate': date, 'kont.dotpTime': time},
            scope: this,
            success: function (response, options) {
                list.setLoading(false);
                this.getKontlist().getStore().reload({params: {action: 'konts_list_for_poezd_out', hid: vagon.getId()}});

                list.up('window').close();

            },
            failure: function (response, options) {
                list.setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error!..');
            }
        });

    },

    kontsFromYardForAvtoOutSave: function(btn){
        this.kontsFromDirForAvtoOutSave(this.getKontsyardavtooutlist(), 'konts_for_avtoout_in_yard_bind');
    },
    kontsFromPoezdIntoForAvtoOutSave: function(btn){
        this.kontsFromDirForAvtoOutSave(this.getKontsintoforavtooutdir(), 'konts_for_avtoout_in_poezdinto_bind');
    },
    kontsFromAvtoIntoForAvtoOutSave: function(btn){
        this.kontsFromDirForAvtoOutSave(this.getKontsavtointoforavtooutdir(), 'konts_for_avtoout_in_avtointo_bind');
    },
    kontsFromNoTranspForAvtoOutSave: function(btn){
        this.kontsFromDirForAvtoOutSave(this.getKontsnoforavtooutdir(), 'konts_for_avtoout_in_notransp_bind');
    },
    kontsFromAllForAvtoOutSave: function(btn){
        this.kontsFromDirForAvtoOutSave(this.getKontsallforavtooutdir(), 'konts_for_avtoout_in_all_bind');
    },
    kontsFromDirForAvtoOutSave: function(list, action){
        var selectedKonts = list.getSelectionModel().getSelection();

        if(selectedKonts.length == 0){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Не выбраны контейнера',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }

        var avto = this.getAvtoform().getRecord(),
            selectedKontsHids = [];

        list.setLoading(true);
        for(var i = 0; i < selectedKonts.length; i++){
            selectedKontsHids.push(selectedKonts[i].getId());
        }

        var date = list.down('datefield#dotpDate').getRawValue(),
            time = list.down('timefield#dotpTime').getRawValue();

        Ext.Ajax.request({
            url: 'ky/secure/Kont.do',
            params: {action: action, jsonRequest: Ext.encode(selectedKontsHids), 'avto.hid': avto.getId(), 'kont.dotpDate': date, 'kont.dotpTime': time},
            scope: this,
            success: function (response, options) {
                list.setLoading(false);
                this.getKontlist().getStore().reload({params: {action: 'konts_list_for_avto_out', hid: avto.getId()}});

                list.up('window').close();

            },
            failure: function (response, options) {
                list.setLoading(false);
                TK.Utils.makeErrMsg(response, 'Error!..');
            }
        });

    },

    afterKontsInPoezdOutLoad: function(store, records, successful){
        var vagon = this.getVagonlist().getSelectionModel().getLastSelected();
        vagon.konts().removeAll();
        vagon.konts().add(store.getRange());
    },
    showNsiOtpr: function(btn){
        var form = this.getKontform().getForm(),
            nsiGrid = this.getController('Nsi').nsiOtpr(form.findField('gruzotpr').getValue()).getComponent(0);

        nsiGrid.on('itemdblclick', this.selectOtpr, form);
    },
    selectOtpr: function(view, record){
        this.findField('gruzotpr').setValue(record.get('g1r'));
        view.up('window').close();
    },
    filterKontsYard: function(btn){
        var win = Ext.widget('kybasekontsyarddirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterPoezdsOutDir:function(btn){
        var win = Ext.widget('kybasepoezdsoutdirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterAvtosOutDir:function(btn){
        var win = Ext.widget('kybaseavtosoutdirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    applyFilterKontsYard:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getKontsyarddir().getStore());
        }
    },
    applyFilterPoezdOutDir:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getPoezdoutdir().getStore());
        }
    },
    applyFilterAvtoOutDir:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getAvtooutdir().getStore());
        }
    },
    filterKontsInto: function(btn){
        var win = Ext.widget('kybasekontsinpoezdintodirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterKontsAvtoInto: function(btn){
        var win = Ext.widget('kybasekontsinavtointodirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
    },
    filterKontsNoTransp: function(btn){
        var win = Ext.widget('kybasekontsnotranspdirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    filterKontsAll: function(btn){
        var win = Ext.widget('kybasekontsalldirfilter');
        this.initFilter(win.down('form').getForm(), btn.up('grid').getStore());
        win.grid = btn.up('grid');
    },
    applyFilterKontsInto:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getKontsintodir().getStore());
        }
    },
    applyFilterKontsAvtoInto:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, this.getKontsavtointodir().getStore());
        }
    },
    applyFilterKontsNoTransp:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },
    applyFilterKontsAll:function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            this.applyFilter(form, btn.up('window').grid.getStore());
        }
    },

    validateField: function(field){
        var vtypes = field.vTypes || [];
        for(var i = 0; i < vtypes.length; i++){
            field.vtype = vtypes[i];
            if(!field.validate()){
                return false;
            }
        }
        return true;
    },
    kontListInPoezdInto: function(btn){
         this.kontListInPoezd('kykontlistforpoezdinto');
    },
    kontListInPoezdOut: function(btn){
        this.kontListInPoezd('kykontlistforpoezdout');
    },
    kontListInPoezd: function(widget){
        var poezd = this.getPoezdform().getRecord();

        /*
        * vagonlist.getStore().removeAll();
         if(vagons.count() > 0){
         vagonlist.getStore().add(vagons.getRange());
         vagonlist.getSelectionModel().select(0); // select 1st row and fire onselect event for vagon grid
         }
        * */
        if(poezd.vagons().count() == 0 || poezd.konts().count() == 0){
            Ext.Msg.show({
                title: 'Ошибка',
                msg: 'Контейнера не найдены',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
            return false;
        }
        var container = Ext.widget(widget, {title: 'Контейнера по поезду № ' + poezd.get('nppr')}),
            store = container.down('kyabstractlist#kontListInPoezd').getStore();

        store.removeAll();
        poezd.vagons().each(function(vagon){
                if(vagon.konts().count() > 0){
                    store.add(vagon.konts().getRange());
                }
            }
        );

        //store.add(poezd.konts().getRange());

        //container.child('grid').getStore().load({params:{action: 'kontsInPoezd', poezdId: hid}});
        //container.setLoading(true);
    },

    searchKont: function(btn){
        Ext.widget('kykontsearchform');
    },

    applySearchKont: function(btn){
        var form = btn.up('form').getForm();
        if (form.isValid()) {
            var store = Ext.data.StoreManager.lookup('kontsInAvtoPoezdYardIntoOut') ||  Ext.create('TK.store.ky.KontsInAvtoPoezdYardIntoOut');
            this.getCenter().setLoading(true);
            store.load({
                params: {
                    'search.nkon': form.findField('nkon').getValue(),
                    action:'search'
                },
                scope: this,
                callback: function(records, operation, success) {
                    this.getCenter().setLoading(false);
                    if(success){
                        if(records.length > 0) {
                            var win = Ext.widget('kykontsearchlist');
                            win.child('grid').getView().refresh();
                        } else {
                            Ext.Msg.show({
                                title: 'Внимание',
                                msg: 'Ничего не найдено',
                                buttons: Ext.MessageBox.OK,
                                icon: Ext.MessageBox.INFO
                            });
                        }
                    }
                }
            });
        }
    }
});
