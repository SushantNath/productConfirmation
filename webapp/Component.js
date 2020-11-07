sap.ui.define(["sap/ui/core/UIComponent", "sap/ui/Device", "ZPROD_CONF5/model/models"], function (e, t, i) {
	"use strict";
	return e.extend("ZPROD_CONF5.Component", {
		metadata: {
			manifest: "json"
		},
		init: function () {
			e.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.setModel(i.createDeviceModel(), "device");
		}
	});
});