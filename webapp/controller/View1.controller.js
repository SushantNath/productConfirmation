sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ZRTC.ZPROD_CONF.controller.View1", {
		onInit: function () {

		},
		
		onQuantityClick: function () {
			
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ZRTC.ZPROD_CONF.fragments.dialog", this);
				}

				this.getView().addDependent(this._oDialog);
				this._oDialog.open();
			
		},
		
			handleClose: function (oEvent) {
			/* This function closes the dialog box */
			if (this._oDialog) {
			
				this._oDialog.close();
			}
		}
		
	});
});