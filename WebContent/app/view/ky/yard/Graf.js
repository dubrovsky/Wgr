Ext.define('TK.view.ky.yard.Graf', {
    extend: 'TK.view.ky.AbstractWindow',
    alias:'widget.kygrafyardform',

    requires: [
        'TK.view.ky.AbstractForm'
    ],


    buildItems: function(config) {
        var owner = this;
        config.items = [{
            xtype: 'kyabstractform',
            width: 1000,
            height: 700,
            html: [
                '<object id="graf" name="graf"',
                'classid="clsid:2C31CE92-E8FF-4987-A19F-1CF26679E0F0"',
                'width="980" height="680"',
                'codebase="mdcontareax.ocx#version=1,0,0,6">',
                '</object>'
            ],
            listeners: {
                afterrender: function() {
                    Ext.Ajax.request({
                        url: 'ky/secure/mdcontareax.do',
                        method: 'POST',
                        scripts: false,
                        success: function(action) {
                            //var App = new ActiveXObject("mdcontareax");
                            try {
                                if (graf != null) {
                                    graf.LoadFromXML(action.responseText);
                                    var store = Ext.StoreManager.get('ky.Yards');
                                    var newStore = new Ext.data.Store({
                                        model: store.model,
                                        proxy: store.proxy,
                                        reader: store.reader,
                                        sortInfo: store.sortInfo
                                    });
                                    newStore.load({
                                        params: {'limit': '200000'},
                                        callback: function() {
                                            newStore.each(function (record) {
                                                if (record.get("z") != '100' && record.get("kont.nkon") != '') {
                                                    var placeX = record.get("x") < 10 ? ('0' + record.get("x")) : record.get("x");
                                                    var placeY = record.get("y") < 10 ? ('0' + record.get("y")) : record.get("y");
                                                    var placeId = placeX + ":" + placeY;
                                                    //alert(record.get("sector.name") + ' - ' + placeId);
                                                    //graf.AddContainer(record.get("sector.name"), placeId, "111", "");
                                                    graf.AddContainer(record.get("sector.name"), placeId, record.get("kont.nkon"), record.get("kont.nkon"));
                                                    //graf.AddContainer("L1", "17:01", "111", "");
                                                }
                                            });
                                        }
                                    });

                                }
                            }
                            catch(Exception){
                            }
                        }
                    });
                }
            }
        }];
    }
});
