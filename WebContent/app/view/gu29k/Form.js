Ext.define('TK.view.gu29k.Form', {
    extend: 'TK.view.DocsForm',
    alias: 'widget.gu29k',
    requires: [
        'TK.model.SmgsPlomb',
        'TK.view.edit.DetailGrid',
        'TK.view.edit.DetailPanel',
        'TK.view.edit.DetailTabPanel'
    ],
    buildItems:function(config) {
    	config.items = [
	    	{xtype:'box', autoEl:{tag: 'img', src: 'resources/images/gu29k3.jpg'}, itemId:'blank'},
	    	{xtype:'hidden', name:'smgs.hid', itemId:'smgs.hid'},
	        {xtype:'hidden', name:'task', itemId:'task'},
            {xtype:'hidden', name:'status', itemId:'status'},
	        {xtype:'hidden', name:'smgs.type', itemId:'smgs.type', value:'4'},
            {xtype:'hidden', name:'smgs.route.hid', itemId:'smgs.route.hid'},
            {xtype:'hidden', name:'smgs.packDoc.hid', itemId:'smgs.packDoc.hid'},
	        {xtype:'hidden', name:'smgs.docType1', itemId:'smgs.docType1', value:10},
            {xtype:'hidden', name:'smgs.status', itemId:'smgs.status'},
            {xtype:'hidden', name:'search.docType', itemId:'search.docType', value:'gu29k'},
            {xtype:'hidden', name:'smgs.cimSmgs.hid', itemId:'smgs.cimSmgs.hid'},


            {x:15, y:10, xtype:'textareafield', name: 'smgs.guInf', itemId:'smgs.guInf', maxLength:250, width:440, height:60},
            {x:991, y:189, name: 'smgs.g694', itemId:'smgs.g694', maxLength:50, width:226},

            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].hid'},
            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].sort', value: '0' },
            {x:20, y:225, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].ownerKod', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].ownerKod", maxLength:10, width:143},
            {x:167, y:225, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiN", maxLength:16, width:199},
            {x:369, y:225, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vid", maxLength:80, width:203},
            {x:576, y:225, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiType', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].utiType", maxLength:16, width:173},
            {x:751, y:225, name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].specKon', itemId:"smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].specKon", maxLength:50, width:173},

            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].hid', itemId:'smgs.cimSmgsCarLists[0].hid'},
            {xtype:'hidden', name:'smgs.cimSmgsCarLists[0].sort', itemId:'smgs.cimSmgsCarLists[0].sort', value: '0' },
            {x:20, y:291, name:'smgs.cimSmgsCarLists[0].rod', itemId:"smgs.cimSmgsCarLists[0].rod", maxLength:20, width:143},
            {x:167, y:291, name:'smgs.cimSmgsCarLists[0].nvag', itemId:"smgs.cimSmgsCarLists[0].nvag", maxLength:16, width:107},
            {x:277, y:291, xtype:'numberfield', name:'smgs.cimSmgsCarLists[0].grPod', itemId:"smgs.cimSmgsCarLists[0].grPod", maxLength:10, width:149, minValue:0, decimalPrecision:1},
            {x:429, y:291, xtype:'numberfield', name:'smgs.cimSmgsCarLists[0].kolOs', itemId:"smgs.cimSmgsCarLists[0].kolOs", maxLength:2, width:143, allowDecimals:false, minValue:0},
            {x:576, y:291, xtype:'numberfield', name:'smgs.cimSmgsCarLists[0].taraVag', itemId:"smgs.cimSmgsCarLists[0].taraVag", maxLength:10, width:173, minValue:0, decimalPrecision:1},
            {x:751, y:291, xtype:'numberfield', name:'smgs.cimSmgsCarLists[0].massGross', itemId:"smgs.cimSmgsCarLists[0].massGross", maxLength:10, width:173, minValue:0, decimalPrecision:1},
            {x:1050, y:260, xtype:'combo', name:'smgs.cimSmgsCarLists[0].speed', itemId:"smgs.cimSmgsCarLists[0].speed", maxLength:20, width:90,
                store: ['ГРУЗОВАЯ','БОЛЬШАЯ'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true},

            {x:165, y:313, name: 'smgs.perevozchik', itemId:'smgs.perevozchik', maxLength:250, width:500},
            {x:140, y:341, xtype:'trigger', name:"smgs.g162r", itemId:"smgs.g162r", maxLength:80, triggerCls:'dir', width:276},
            {x:425, y:341, name: 'smgs.g692', itemId:'smgs.g692', maxLength:6, width:180},
            {x:140, y:366, name: 'smgs.g163r', itemId:'smgs.g163r', maxLength:80, width:276},

            {x:730, y:341, xtype:'trigger', name: 'smgs.g101r', itemId:'smgs.g101r', triggerCls:'dir', maxLength:80, width:276},
            {x:1041, y:341, name: 'smgs.g121', itemId:'smgs.g121', maxLength:6, width:180},
            {x:730, y:366, name: 'smgs.g102r', itemId:'smgs.g102r', maxLength:64, width:276},

            {x:200, y:405, xtype:'button', action:'gruzOtpr', text:'...'},
            {x:225, y:405, xtype:'textarea', width:230, height:65, name:'smgs.g1r', itemId:'smgs.g1r', maxLength:512},

//            {x:459, y:406, xtype:'label', text: "Код ТГНЛ"},
            {x:530, y:405, width:92, name:'smgs.g2_1', itemId:'smgs.g2_1', maxLength:32},
//            {x:459, y:427, xtype:'label', text: "Код ОКПО"},
//            {x:530, y:426, width:92, name:'smgs.g2', itemId:'smgs.g2', maxLength:32},
            {xtype:'hidden', name:'smgs.g2', itemId:'smgs.g2', maxLength:32},
//            {x:459, y:448, xtype:'label', text: "Код ИНН"},
//            {x:530, y:447, width:92, name:'smgs.g_2inn', itemId:'smgs.g_2inn', maxLength:32},
            {xtype:'hidden', name:'smgs.g_2inn', itemId:'smgs.g_2inn', maxLength:32},

            {x:225, y:470, xtype:'textarea', width:398, height:65, name:'smgs.g19r', itemId:'smgs.g19r', maxLength:250},

            {x:797, y:405, xtype:'button', action:'gruzPoluch', text:'...'},
            {x:822, y:405, xtype:'textarea', width:230, height:65, name:'smgs.g4r', itemId:'smgs.g4r', maxLength:512},
//            {x:1070, y:406, xtype:'label', text: "Код ТГНЛ", width: 59},
            {x:1129, y:405, width:92, name:'smgs.g5_1', itemId:'smgs.g5_1', maxLength:32},
//            {x:1070, y:427, xtype:'label', text: "Код ОКПО", width: 59},
//            {x:1129, y:426, width:92, name:'smgs.g5', itemId:'smgs.g5', maxLength:32},
            {xtype:'hidden', name:'smgs.g5', itemId:'smgs.g5', maxLength:32},
//            {x:1070, y:448, xtype:'label', text: "Код ИНН", width: 59},
//            {x:1129, y:447, width:92, name:'smgs.g_5inn', itemId:'smgs.g_5inn', maxLength:32},
            {xtype:'hidden', name:'smgs.g_5inn', itemId:'smgs.g_5inn', maxLength:32},
            {x:822, y:470, xtype:'textarea', width:398, height:65, name:'smgs.g49r', itemId:'smgs.g49r', maxLength:250},

            {x:106, y:538, xtype:'button', action:'plat', text:'...'},
            {xtype:'hidden', name:'smgs.cimSmgsPlatels[0].hid', itemId:'smgs.cimSmgsPlatels[0].hid'},
            {xtype:'hidden', name:'smgs.cimSmgsPlatels[0].sort', itemId:'smgs.cimSmgsPlatels[0].sort', value: '0' },
            {x:131, y:538, xtype:'textarea', width:245, height:44, name:'smgs.cimSmgsPlatels[0].platR', itemId:'smgs.cimSmgsPlatels[0].platR', maxLength:145},
            {x:376, y:538, xtype:'textarea', width:246, height:44, name:'smgs.cimSmgsPlatels[0].kplat', itemId:'smgs.cimSmgsPlatels[0].kplat', maxLength:50},
            {x:800, y:630, xtype:'radio', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogrKon', inputValue:'1'},
            {x:800, y:655, xtype:'radio', name:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogrKon', inputValue:'2'},

		    {x:19, y:931, xtype:'textarea', name:'smgs.g11_prim', itemId:'smgs.g11_prim', maxLength:1024, width:1018, height:45},
            {xtype:'box',x:19, y:755, width:1018, height:175, itemId:'disp.gruz', autoEl:{tag: 'div', cls:'overflow bg-c-white', children:[{tag: 'table', cls:'width100'}] }},
            {
	        	xtype:'button',
	        	text:this.btnChange,
	        	x:250, y:727,
                action:'change',
	        	itemId:'gruz_'
	        },
            {
	        	xtype:'detailpanel',
	        	x:450, y:600, width:400,
	        	itemId:'gruz_panel',
	        	title:this.labelCargo,
	        	items:[
	        		{
	        			xtype:'detailtabpanel',
	        			tabCollectionName:'cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs',
	        			itemId:'gruz_panel_tab',
	        			tabItems:[
	        				{xtype:'trigger', fieldLabel:this.labelCodeGng, itemId:"kgvn", maxLength:10, triggerCls:'dir', width:100},
                            {xtype:'textarea', fieldLabel:this.labelName1, itemId:"nzgr", maxLength:4000, width:250},
                            {xtype:'trigger', fieldLabel:this.labelCodeEtsng, itemId:"ekgvn", maxLength:10, triggerCls:'dir', width:100},
                            {xtype:'textarea', fieldLabel:this.labelNameEtsng, itemId:"enzgr", maxLength:4000, width:250},
                            {xtype:'numberfield', fieldLabel:this.labelMesta, itemId:'places', maxLength:8, width:80, allowDecimals:false, minValue:0},
                            {xtype:'textfield', fieldLabel:this.labelPack, itemId:"upak", maxLength:50, width:180},
                            {xtype:'hidden', itemId:"ohr"},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
						]
	        		}
	        	],
                beforeSave:function() {
                    var g11_prim = this.ownerCt.getComponent('smgs.g11_prim'),
                        str = 'Груз подлежит охране',
                        re = new RegExp(str,'gi'),
                        found = false;
                    this.getComponent('gruz_panel_tab').items.each(function(gruz){
                        if(!found && eval(gruz.getComponent('ohr').getValue())){
                            if(!g11_prim.getValue()){     // empty
                                g11_prim.setValue(str);
                            } else {
                                if(g11_prim.getValue().search(re) == -1){
                                    g11_prim.setValue(g11_prim.getValue() + ' ' + str);
                                }
                            }
                            found = true;
                        }
                    });
                    if(!found && g11_prim.getValue()){
                        g11_prim.setValue(Ext.String.trim(g11_prim.getValue().replace(re, '')));
                    }
                },
	        	setDisplayedField:function(){
					var g = this.ownerCt.getComponent('disp.gruz').el.dom.firstChild,
                        tabP = this.getComponent('gruz_panel_tab'),
                        sum = 0, row, cell, gr='', places;

					for (var i = g.rows.length - 1; i >= 0; i--) {
                        g.deleteRow(i);
                    }
                    this.ownerCt.getComponent('mesta_propis').setText('');
                    tabP.items.each(function(gruz, index,length){
                        row = g.insertRow(-1);
                        cell = row.insertCell(-1);
                        cell.className = 'td gruz-gu-td1';
	                    if(places = gruz.getComponent('places').getValue()){
                            cell.innerHTML = places;
                        }

                        cell = row.insertCell(-1);
                        cell.className = 'td gruz-gu-td2';
                        cell.innerHTML = gruz.getComponent('upak').getValue();
                        gr = '';
                        gr += (gruz.getComponent('nzgr').getValue() ? gruz.getComponent('nzgr').getValue() + '<br/>' : '');
                        gr += (gruz.getComponent('kgvn').getValue() ? 'ГНГ- '+ gruz.getComponent('kgvn').getValue() + '<br/>' : '');
                        gr += (gruz.getComponent('enzgr').getValue() ? gruz.getComponent('enzgr').getValue() + '<br/>' : '');
                        gr += (gruz.getComponent('ekgvn').getValue() ? 'ЕТ СНГ- '+ gruz.getComponent('ekgvn').getValue() + '<br/>' : '');
                        cell = row.insertCell(-1);
                        cell.className = 'td gruz-gu-td3';
                        cell.innerHTML = gr;
                        sum += places ? places : 0;
					});
                    if(sum > 0){
//                        g.rows[0].cells[0].innerHTML = sum;
                        this.ownerCt.getComponent('mesta_propis').setText(TK.Utils.num2str(sum+''));
                    }
	            },
	        	copyValues2MainFlds:function(){
	        		this.items.each(function(item,index,length){
                        item.removeAll();
                        var tab, val, tCN = 'cimSmgsGruzs';
                        for(var prop in this.bufData[tCN]){ // tab
                            tab = item.onAddTab();
//                            tab = item.getActiveTab();
                            for(var prp in this.bufData[tCN][prop]){// fields
                                if(tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])){
                                    tab.getComponent(prp).setValue(val);
                                }
                            }
                        }
//                        item.setActiveTab(0);
	        		}, this);
	            },
				copyValues2Buf:function(){ // panel
					this.bufData = {};
					this.items.each(function(item,index,length){
						if(item.items){ // tabpanel
							var tCN = 'cimSmgsGruzs';
							this.bufData[tCN] = {};
							item.items.each(function(itm,ind,len){ // tab
								this.bufData[tCN][ind]= {};
								itm.items.each(function(field,i,l){ // fields
									this.bufData[tCN][ind][field.itemId] = field.getValue();
								}, this);
							}, this);
						}
	            	}, this);
				},
				initBuf:function(){
					this.bufData = {};
                    if(this.ownerCt.dataObj.cimSmgsCarLists[0] && this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0]){
					    this.bufData['cimSmgsGruzs'] = this.ownerCt.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0].cimSmgsGruzs;
                    }
				}
	        },

            {x:1050, y:990, xtype:'numberfield', name: 'smgs.g24N', itemId:'smgs.g24N', maxLength:10, width:140, minValue:0},
            {x:1050, y:1040, xtype:'numberfield', name: 'smgs.g24T', itemId:'smgs.g24T', maxLength:10, width:140, minValue:0},
            {x:1050, y:1091, xtype:'numberfield', name: 'smgs.g24B', itemId:'smgs.g24B', maxLength:10, width:140, minValue:0},
            {x:200, y:1000, xtype:'label', itemId:'mesta_propis', style: 'font-weight:bold;'},
            {x:200, y:1100, xtype:'label', itemId:'massa_propis', style: 'font-weight:bold;'},
            {x:1050, y:1172, name: 'smgs.tarifShema', itemId:'smgs.tarifShema', maxLength:50, width:150},
            {x:1050, y:1202, name: 'smgs.tarifVOtpr', itemId:'smgs.tarifVOtpr', maxLength:50, width:150},
            {x:903, y:1290, xtype:'numberfield', name: 'smgs.platezhKm', itemId:'smgs.platezhKm', maxLength:10, width:70, minValue:0, decimalPrecision:1},
            {x:1050, y:1290, xtype:'numberfield', name: 'smgs.platezhRub', itemId:'smgs.platezhRub', maxLength:8, width:70, minValue:0, decimalPrecision:0},
            {x:1140, y:1290, name: 'smgs.platezhKop', itemId:'smgs.platezhKop', maxLength:2, width:70, maskRe:/\d/},
            {x:255, y:1146, name: 'smgs.g27', itemId:'smgs.g27', maxLength:50, width:560},
		    {x:368, y:1208, xtype:'textarea', name:'smgs.plat', itemId:'smgs.plat', maxLength:250, width:500, height:55},
		    {x:22, y:1268, xtype:'textarea', name:'smgs.plat1', itemId:'smgs.plat1', maxLength:250, width:475, height:55},
            {x:1050, y:1362, name: 'smgs.provozPlata', itemId:'smgs.provozPlata', maxLength:12, width:150, vtype:'textNum'},
            {x:43, y:1375, xtype:'combo', name:'smgs.zpuInfo', itemId:"smgs.zpuInfo", maxLength:50, width:120,
                store: ['ОТПРАВИТЕЛЬ','ПЕРЕВОЗЧИК','ТАМОЖНЯ','ЭКСПЕДИТОР'], typeAhead: true, forceSelection: true, triggerAction: 'all', selectOnFocus:true},

            {x:198, y:1394, width:335, height:83, xtype:'detailgrid', hideHeaders:true, itemId:'plomb_panel',
                doc:'smgs',
                coll:'cimSmgsPlombs',
                buildStore: function(config) {
                    config.store = new Ext.data.ArrayStore({
                        autoDestroy: true,
                        model: 'TK.model.SmgsPlomb'
                    });
                },
                buildColModel: function(config) {
                    config.columns = [
                        {dataIndex: 'type', width:168, editor:{xtype:'textfield', maxLength:32}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false},
                        {dataIndex: 'znak', width:147, editor:{xtype:'textfield', maxLength:32}, sortable:false, hideable:false, menuDisabled:true, draggable:false, groupable:false}
                    ];
                },
                newRecord: function(){
                    return Ext.create('TK.model.SmgsPlomb', {});
                },
                copyValues2MainFlds:function(){
                    var coll = this.bufData, rows = new Array();
                    for(var index in coll){
                        var row = new Array();
                        row.push(coll[index]['kpl']);
                        row.push(coll[index]['znak']);
                        row.push(coll[index]['type']);
                        row.push(coll[index]['sort']);
                        row.push(coll[index]['hid']);
                        rows.push(row);
                    }
                    this.store.loadData(rows);
	            },
                initBuf:function(){
					this.bufData = this.ownerCt.dataObj[this.coll] || {};
				}
            },
            {x:43, y:1527, name: 'smgs.trueInfo', itemId:'smgs.trueInfo', maxLength:250, width:700},
            {x:135, y:1665, name: 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].zajavNo', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].zajavNo', maxLength:50, width:100},
            {x:330, y:1695, xtype:'datefield', name: 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vvoz', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].vvoz', width:80},
            {x:330, y:1720, xtype:'datefield', name: 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogruzka', itemId:'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].pogruzka', width:80},
            {x:100, y:1776, name: 'smgs.vizaNo', itemId:'smgs.vizaNo', maxLength:50, width:250},
            {x:485, y:1776, name: 'smgs.perevozSign', itemId:'smgs.perevozSign', maxLength:50, width:250},
            {x:870, y:1776, xtype:'datefield', name: 'smgs.perevozDate', itemId:'smgs.perevozDate', width:80},
            {x:880, y:1453, name: 'smgs.sborCennost1', itemId:'smgs.sborCennost1', maxLength:12, width:150},
		    {x:880, y:1482, name: 'smgs.sborCennost11', itemId:'smgs.sborCennost11', maxLength:12, width:150},
		    {x:1050, y:1411, name: 'smgs.sborCennost21', itemId:'smgs.sborCennost21', maxLength:12, width:150, vtype:'textNum'},
            {x:1050, y:1453, name: 'smgs.sborCennost2', itemId:'smgs.sborCennost2', maxLength:12, width:150, vtype:'textNum'},
		    {x:1050, y:1482, name: 'smgs.sborCennost22', itemId:'smgs.sborCennost22', maxLength:12, width:150, vtype:'textNum'},
            {x:1050, y:1511, name: 'smgs.otprItogo', itemId:'smgs.otprItogo', maxLength:12, width:150, vtype:'textNum'},
            {x:50, y:2518, xtype:'textarea', width:512, height:64, name:'smgs.tehUslG12', itemId:'smgs.tehUslG12', maxLength:128},
            {x:220, y:2600, xtype:'textarea', width:350, height:60, name:'smgs.grOtpFio', itemId:'smgs.grOtpFio', maxLength:128},

            {x:650, y:2500, xtype:'textarea', width:514, height:230, readOnly:true, name:'disp.g3', itemId:'disp.g3', submitValue:false},
            {
                xtype:'button',
                text:'Изменить',
                x:1100, y:2473,
                width:70,
                action:'change',
                itemId:'g3_'
            },
            {
                xtype:'detailpanel',
                x:510, y:2500, width:400,
                itemId:'g3_panel',
                title:this.labelSenderNotes,
                items:[
                    {
                        xtype:'detailtabpanel',
                        tabCollectionName:'cimSmgsDocses9',
                        itemId:'g3_panel_tab_3',
                        tabItems:[
                            {xtype:'textarea', fieldLabel:this.labelNameRu, itemId:"text", maxLength:500, width:200},
                            {xtype:'textfield', fieldLabel:this.labelDocNum, itemId:"ndoc", maxLength:56, width:200},
                            {xtype:'datefield', fieldLabel:this.labelDate, itemId:"dat", width:80},
                            {xtype:'numberfield', fieldLabel:this.labelTotal, itemId:"ncopy", maxLength:10, width:200, allowDecimals:false, minValue:0},
                            {xtype:'hidden', itemId:"code"},
                            {xtype:'hidden', itemId:"fieldNum", value:'9'},
                            {xtype:'hidden', itemId:"sort"},
                            {xtype:'hidden', itemId:"hid"}
                        ]
                    }
                ],
                setDisplayedField:function(){
                    var _f9='', _f9_1='', g = this.ownerCt.getComponent('disp.g3'), tabP = this.getComponent('g3_panel_tab_3');
                    tabP.items.each(
                        function(item, index,length){
                            _f9_1='';
                            _f9_1 += (item.getComponent('text').getValue() ?  item.getComponent('text').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ndoc').getValue() ?  item.getComponent('ndoc').getValue() + '  ' : '');
                            _f9_1 += (item.getComponent('dat').getRawValue() ?  'от ' + item.getComponent('dat').getRawValue() + '  ' : '');
                            _f9_1 += (item.getComponent('ncopy').getValue() ? item.getComponent('ncopy').getValue() + ' экз ' : '');
                            _f9 += (_f9_1 ? _f9_1 + '\n' : '');
                        }
                    );
                    g.setValue(_f9);
                },
                copyValues2MainFlds:function(){
                    this.items.each(function(item,index,length){
                        if(item.items){ // tabpanel
                            item.removeAll();
                            var tab, val, tCN = item.tabCollectionName;
                            for(var prop in this.bufData[tCN]){ // tab
                                tab = item.onAddTab();
//                                tab = item.getActiveTab();
                                for(var prp in this.bufData[tCN][prop]){// fields
                                    if(tab.getComponent(prp) && (val = this.bufData[tCN][prop][prp])){
                                        tab.getComponent(prp).setValue(val);
                                    }
                                }
                            }
//                            item.setActiveTab(0);
                        }
                        else if(item.itemId){ // input field
                            item.setValue(this.bufData[item.itemId.split('.')[1]]);
                        }
                    }, this);
                },
                copyValues2Buf:function(){ // panel
                    this.bufData = {};
                    this.items.each(function(item,index,length){
                        var tCN = item.tabCollectionName;
                        this.bufData[tCN] = {};
                        item.items.each(function(itm,ind,len){ // tab
                            this.bufData[tCN][ind]= {};
                            itm.items.each(function(field,i,l){ // fields
                                this.bufData[tCN][ind][field.itemId] = field.getValue();
                            }, this);
                        }, this);
                    }, this);
                },
                initBuf:function(){
                    this.bufData = {};
                    var tCN = this.getComponent('g3_panel_tab_3').tabCollectionName;
                    this.bufData[tCN] = this.ownerCt.dataObj[tCN];
                }
            }
        ];
    },
    buildDockedItems: function(config) {
        this.callParent(arguments);
        config.dockedItems[0].items.push('-',{text: this.btnCopyEpd,iconCls:'copy',itemId: 'copyEpd', action:'copyEpd'});
    },
    copyValues2MainFldsVag: function(){
        var vag = this.dataObj.cimSmgsCarLists[0],
            prefix = 'smgs.cimSmgsCarLists[0].',
            val;
        for(var prp in vag){// fields
            if(this.getComponent(prefix + prp) && (val = vag[prp])){
                this.getComponent(prefix + prp).setValue(val);
            }
        }
    },
    copyValues2MainFldsKon: function(){
        var kon = this.dataObj.cimSmgsCarLists[0] ? this.dataObj.cimSmgsCarLists[0].cimSmgsKonLists[0] : {},
            prefix = 'smgs.cimSmgsCarLists[0].cimSmgsKonLists[0].',
            val;
        for(var prp in kon){// fields
            if(this.getComponent(prefix + prp) && (val = kon[prp])){
                this.getComponent(prefix + prp).setValue(val);
            }
        }
        if(val = kon['pogrKon']){ // init radio inputs
            this.getForm().findField(prefix + 'pogrKon').setValue(val);
        }
    },
    copyValues2MainFldsPlat: function(){
        var vag = this.dataObj.cimSmgsPlatels ? this.dataObj.cimSmgsPlatels[0] : {},
            prefix = 'smgs.cimSmgsPlatels[0].',
            val;
        for(var prp in vag){// fields
            if(this.getComponent(prefix + prp) && (val = vag[prp])){
                this.getComponent(prefix + prp).setValue(val);
            }
        }
    },
    initServiceFields: function(data, initGrids){
    	this.getForm().setValues(data);
        if(initGrids){
            this.getComponent('plomb_panel').initServiceFields(data);
        }
    },
    initBuffers: function(){
//        this.getComponent('gOtpr_panel').initBuf();
//        this.getComponent('gPoluch_panel').initBuf();
        this.getComponent('gruz_panel').initBuf();
        this.getComponent('plomb_panel').initBuf();
        this.getComponent('g3_panel').initBuf();
//        this.getComponent('plat_panel').initBuf();
    },
    initCollections: function(){
        this.copyValues2MainFldsVag();
        this.copyValues2MainFldsKon();
        this.copyValues2MainFldsPlat();
        this.getComponent('gruz_panel').copyValues2MainFlds();
        this.getComponent('plomb_panel').copyValues2MainFlds();
        this.getComponent('g3_panel').copyValues2MainFlds();
//        this.getComponent('plat_panel').copyValues2MainFlds();
    },
    initDisplayedFields:function(){
//        this.getComponent('gOtpr_panel').setDisplayedField();
//        this.getComponent('gPoluch_panel').setDisplayedField();
        this.getComponent('gruz_panel').setDisplayedField();
        this.getComponent('g3_panel').setDisplayedField();
//        this.getComponent('plat_panel').setDisplayedField();
        this.getComponent('smgs.g24N').fireEvent('blur', this.getComponent('smgs.g24N'));
    },
    prepareGridData4Save:function(){
        return this.getComponent('plomb_panel').prepareData();
    }
});