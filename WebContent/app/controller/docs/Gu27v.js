Ext.define('TK.controller.docs.Gu27v', {
    extend: 'Ext.app.Controller',

    views: ['gu27v.List', 'gu27v.Form'],
    stores: ['Gu29ks'],
    models: ['Gu29k','SmgsPlomb'],
    refs: [
        {
            ref: 'menutree',
            selector: 'viewport > menutree'
        },
        {
            ref: 'center',
            selector: 'viewport > tabpanel'
        }
    ],
    init: function() {
        /*this.control({
            'viewport > tabpanel > grid[inPack=false] button[action="printGU"]': {
                click: this.onPrint
            }
        });*/
    },
    initEvents: function(form){
        Ext.each(form.query('button[action=change]'), function(item, index) {
            item.on('click', Ext.bind(this.onChangeData, form));
        }, this);
        form.down('button[action=copyEpd]').on('click',this.onCopyEpd,this);
        form.getComponent('smgs.g24N').on('change', this.onG24, this);
        form.getComponent('smgs.g24T').on('change', this.getController('Nsi').onG24);
	    form.getComponent('smgs.provozPlata').on('change', this.onProvozPlata);
	    form.getComponent('smgs.sborCennost21').on('change', this.onProvozPlata);
	    form.getComponent('smgs.sborCennost2').on('change', this.onProvozPlata);
	    form.getComponent('smgs.sborCennost22').on('change', this.onProvozPlata);

        form.down('detailtabpanel[itemId=gruz_panel_tab]').on(
            'add',
            function(tabpanel, gruz, inx){
                if(tabpanel.isXType('detailtabpanel',true)) {
                    gruz.getComponent('kgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiGng(gruz.getComponent('kgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectGng, gruz);
                    }, this);
                    gruz.getComponent('ekgvn').onTriggerClick = Ext.bind(function(){
                        var nsiGrid = this.getController('Nsi').nsiEtsng(gruz.getComponent('ekgvn').getValue()).getComponent(0);
                        nsiGrid.on('itemdblclick', this.selectEtsng, gruz);
                    }, this);
                }
            },
            this
        );
        form.down('button[action=gruzOtpr]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g1r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG1, form);
            },
            this
        );
        form.down('button[action=gruzPoluch]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiOtpr(form.getComponent('smgs.g4r').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectOtprG5, form);
            },
            this
        );

        form.getComponent('smgs.g162r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g162r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG162, form);
        }, this);
        form.getComponent('smgs.g101r').onTriggerClick = Ext.bind(function(){
            var nsiGrid = this.getController('Nsi').nsiSta(form.getComponent('smgs.g101r').getValue()).getComponent(0);
            nsiGrid.on('itemdblclick', this.selectStaG101r, form);
        }, this);
        form.down('button[action=plat]').on(
            'click',
            function(btn){
                var nsiGrid = this.getController('Nsi').nsiPlat(form.getComponent('smgs.cimSmgsPlatels[0].platR').getValue()).getComponent(0)/*, gridAction = nsiGrid.down('actioncolumn')*/;
                nsiGrid.on('itemdblclick', this.selectPlat, form);
            },
            this
        );

        Ext.each(form.query('textfield'), function(item, index) {
            item.on('focus', Ext.bind(this.onDivBlur, form));
        }, this);
        form.getComponent('disp.gruz').on({
            click: {
                element: 'el', //bind to the underlying el property on the panel
                fn: function(){
                    this.onDivBlur.call(form);
                    this.getController('Nsi').onDivFocus.call(form.getComponent('disp.gruz'));
                },
                scope:this
            }
        });
    },
    selectGng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('kgvn').setValue(data['code']);
        this.getComponent('nzgr').setValue(data['name']);
        this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },
    selectEtsng:function (view, record, item, index) {
        var data = record.data;
        this.getComponent('ekgvn').setValue(data.code);
        this.getComponent('enzgr').setValue(data.name);
        this.getComponent('ohr').setValue(data['ohr']);
        view.up('window').close();
    },
    onDivBlur: function(){
        var comp = this.getComponent('disp.gruz');
        comp.removeCls('div-active');
        comp.addCls('bg-c-white');
    },
    selectCountriesG1: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('gOtpr_panel').getComponent('strn').getComponent('smgs.g_1_5k').setValue(data.abc2);
        this.getComponent('gOtpr_panel').getComponent('strn').getComponent('smgs.g16r').setValue(data.naim);
        view.up('window').close();
    },
    selectCountriesG5: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('gPoluch_panel').getComponent('strn').getComponent('smgs.g_1_5k_1').setValue(data.abc2);
        this.getComponent('gPoluch_panel').getComponent('strn').getComponent('smgs.g16r_1').setValue(data.naim);
        view.up('window').close();
    },
    selectStaG162: function(view, record, item, index) {
        var data = record.data;
        this.getComponent('smgs.g162r').setValue(data.staName);
        this.getComponent('smgs.g163r').setValue(data.roadname ? data.roadname + ' ж.д.' : '');
        this.getComponent('smgs.g692').setValue(data.staNo);
        view.up('window').close();
    },
    selectStaG101r: function(view, record, item, index) {
        var data = record.data;
        this.getComponent("smgs.g101r").setValue(data.staName);
        this.getComponent("smgs.g102r").setValue(data.roadname ? data.roadname + ' ж.д.' : '');
        this.getComponent("smgs.g121").setValue(data.staNo);
        view.up('window').close();
    },
    onG24:function(field){
        var arr;
        this.getController('Nsi').onG24.apply(field);
//        field.ownerCt.getComponent('massa_propis').setText(TK.Utils.num2str(field.getValue()+''));
        if(field.getValue()){
            arr = (field.getValue()+'').split('.');
            field.ownerCt.getComponent('massa_propis').setText(TK.Utils.num2str(arr[0]) + (arr[1] ? '.'+arr[1]:'') + ' кг');
            field.ownerCt.getComponent('massa_netto').setText(field.getValue());
        } else {
            field.ownerCt.getComponent('massa_propis').setText('');
            field.ownerCt.getComponent('massa_netto').setText('');
        }
    },
    selectOtprG1: function(view, record, item, index) {
        var data = record.data,
            g1r = data['g1r'] ? data['g1r'] : '';
        g1r += data['g3'] ? ' Код ОКПО ' + data['g3'] : '';
        g1r += data['g_2inn'] ? ' Код ИНН ' + data['g_2inn'] : '';
        this.getComponent('smgs.g1r').setValue(g1r);
        this.getComponent('smgs.g19r').setValue(data['g18r_1']+' '+data['g19r']);
        this.getComponent('smgs.g2').setValue(data['g3']);
        this.getComponent('smgs.g2_1').setValue(data['g2']);
        this.getComponent('smgs.g_2inn').setValue(data['g_2inn']);
        view.up('window').close();
    },
    selectOtprG5: function(view, record, item, index) {
        var data = record.data,
            g4r = data['g1r'] ? data['g1r'] : '';
        g4r += data['g3'] ? ' Код ОКПО ' + data['g3'] : '';
        g4r += data['g_2inn'] ? ' Код ИНН ' + data['g_2inn'] : '';
        this.getComponent('smgs.g4r').setValue(g4r);
        this.getComponent('smgs.g49r').setValue(data['g18r_1']+' '+data['g19r']);
        this.getComponent('smgs.g5').setValue(data['g3']);
        this.getComponent('smgs.g5_1').setValue(data['g2']);
        this.getComponent('smgs.g_5inn').setValue(data['g_2inn']);
        view.up('window').close();
    },
    selectPlat: function(view, record, item, index) {
        var data = record.data, result = '';
        result += (data['platR'] ? data['platR'] : '');
        result += (data['kplat1'] ? '\n' + 'п/к ' + data['kplat1'] : '');
        result += (data['kplat2'] ? '/' + data['kplat2'] : '');
        this.getComponent('smgs.cimSmgsPlatels[0].platR').setValue(result);
        this.getComponent('smgs.cimSmgsPlatels[0].kplat').setValue(data['kplat']);
        view.up('window').close();
    },
	onProvozPlata:function(){
        var owner = this.ownerCt,
            val1 = parseFloat(owner.getComponent('smgs.provozPlata').getValue()),
            val2 = parseFloat(owner.getComponent('smgs.sborCennost21').getValue()),
	        val3 = parseFloat(owner.getComponent('smgs.sborCennost2').getValue()),
	        val4 = parseFloat(owner.getComponent('smgs.sborCennost22').getValue()),
            g24B = owner.getComponent('smgs.otprItogo'), newsum;
        if(isNaN(val1)) val1 = 0;
        if(isNaN(val2)) val2 = 0;
	    if(isNaN(val3)) val3 = 0;
	    if(isNaN(val4)) val4 = 0;
        newsum = val1 + val2 + val3 + val4;
        g24B.setValue(newsum > 0 ? newsum.toFixed(2) : '');
    },
    onChangeData:function(btn){
    	var panel = this.getComponent(btn.itemId + 'panel') || this.getComponent(btn.itemId.split('_')[0] + '_panel'),
            tabpanels = panel.query('detailtabpanel');

        for(var i = 0; i < tabpanels.length; i++){
            if(tabpanels[i].items.getCount() == 0){
                tabpanels[i].onAddTab();
            }
        }

        panel.show();
    	this.maskPanel(true);
    },
    onCopyEpd: function(btn){
        var epd = this.getCenter().child('epd'),
            smgs,
            smgsForm,
            epdForm;

        if(epd && epd.hasListener('activate')) {
            Ext.MessageBox.show({
                title: this.titleEpd,
                msg: this.msgEpd,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.WARNING
            });
        }
        else if(epd){
            epdForm = epd.getForm();
            smgs = btn.up('gu29k');
            smgsForm = smgs.getForm();
            smgsForm.findField('smgs.g1r').setValue(epdForm.findField('smgs.g1r').getValue());
            smgsForm.findField('smgs.g19r').setValue(epdForm.findField('smgs.g19r').getValue());
            smgsForm.findField('smgs.g4r').setValue(epdForm.findField('smgs.g4r').getValue());
            smgsForm.findField('smgs.g49r').setValue(epdForm.findField('smgs.g49r').getValue());
            smgsForm.findField('smgs.g162r').setValue(epdForm.findField('smgs.g162r').getValue());
            smgsForm.findField('smgs.g692').setValue(epdForm.findField('smgs.g692').getValue());
            smgsForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN').getValue());
            smgsForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid').setValue(epdForm.findField('smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid').getValue());
        }
    }/*,
    onPrint: function(btn){
        var list = btn.up('grid');
        if(TK.Utils.isRowSelected(list))
        {
            var data = list.selModel.getLastSelected().data,
                doc = tkUser.docs.getByKey(this.getMenutree().lastSelectedLeaf.id.split('_')[3]);
            this.getController('Docs').doPrintGU(doc, data);
        }
    }*/
});