var gmsgbundle;
var iOrder;
var iOper;
sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/core/BusyIndicator",
		"sap/ui/core/routing/History",
		"sap/ui/model/Filter"
	],
	function(Controller, MessageToast, MessageBox, BusyIndicator, History, Filter) {
		"use strict";

	return Controller.extend("ZRTC.ZPROD_CONF.controller.View1", {
		onAfterRendering: function() {
			// Accessing i18n Texts
				gmsgbundle = this.getView().getModel("i18n").getResourceBundle();
		},
	
		onInit: function() {
				this.oModel = this.getOwnerComponent().getModel();
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.getRoute("RouteView1").attachMatched(this._onRouteFound, this);
				var oView = this.getView();
				oView.addEventDelegate({
				onBeforeShow: function(oEvent) {
				// Clearing values
				oView.byId("idOrder").setValue("");
				oView.byId("idOper").setValue("");
				}
				}, oView);

			},
			
				fQuantityClick: function (oEvent) {
			
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ZRTC.ZPROD_CONF.fragments.quan", this);
					this.getView().addDependent(this._oDialog);
				}

				   // Getting values from screen	
                iOrder = this.getView().byId("idOrder").getValue();
				iOper  = this.getView().byId("idOper").getValue(); 
				var Work = this.getView().byId("idWork").getValue();
		        var Desc = this.getView().byId("idDesc").getValue();
			    var Mat  = this.getView().byId("idMat").getValue();
			    var MatD = this.getView().byId("idMatD").getValue();
       //         var Quan = this.getView().byId("idQuan").getValue();
			    // var QU   = this.getView().byId("idQU").getValue();
			    // var QConf = this.getView().byId("idQConf").getValue();
			    // var QCon  = this.getView().byId("idQCon").getValue();
			    // var Qact  = this.getView().byId("idQact").getValue();
			    // var ATime = this.getView().byId("idATime").getValue();
			    // var AStat = this.getView().byId("idAStat").getValue();
			    // var AUnit = this.getView().byId("idAUnit").getValue();
			    var Last  = this.getView().byId("idLast").getValue();
                var QTime = this.getView().byId("idQTime").getValue();
                var QStat = this.getView().byId("idQStat").getValue();
                var QUnit = this.getView().byId("idQUnit").getValue();
                var Type  = oEvent.getSource().getText();
			    
			   // Displaying values on popup
				 sap.ui.getCore().byId("idOrder").setValue(iOrder);
				 sap.ui.getCore().byId("idOper").setValue(iOper);
				 sap.ui.getCore().byId("idWork").setValue(Work);
				 sap.ui.getCore().byId("idDesc").setValue(Desc);
				 sap.ui.getCore().byId("idMat").setValue(Mat);
				 sap.ui.getCore().byId("idMatD").setValue(MatD);
				 //sap.ui.getCore().byId("idQuan").setValue(Quan);
				 //sap.ui.getCore().byId("idQU").setValue(QU);
				 //sap.ui.getCore().byId("idQConf").setValue(QConf);
				 //sap.ui.getCore().byId("idQCon").setValue(QCon);
				 sap.ui.getCore().byId("idLast").setValue(Last);
				 sap.ui.getCore().byId("idQTime").setValue(QTime);
				 sap.ui.getCore().byId("idQStat").setValue(QStat);
				 sap.ui.getCore().byId("idQUnit").setValue(QUnit);
				 sap.ui.getCore().byId("idType").setValue(Type);
				 this._oDialog.open();
			
		},
		
			fHandleClose: function (oEvent) {
			/* This function closes the dialog box */
			if (this._oDialog) {
			
				this._oDialog.close();
			}
		},
		
		fActClick: function (oEvent) {
			
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ZRTC.ZPROD_CONF.fragments.act", this);
					this.getView().addDependent(this._oDialog);
				}

                 // Getting values from screen	
                iOrder = this.getView().byId("idOrder").getValue();
				iOper  = this.getView().byId("idOper").getValue(); 
				var Work = this.getView().byId("idWork").getValue();
		        var Desc = this.getView().byId("idDesc").getValue();
			    var Mat  = this.getView().byId("idMat").getValue();
			    var MatD = this.getView().byId("idMatD").getValue();
                var Quan = this.getView().byId("idQuan").getValue();
			    var QU   = this.getView().byId("idQU").getValue();
			    var QConf = this.getView().byId("idQConf").getValue();
			    var QCon  = this.getView().byId("idQCon").getValue();
			    var Qact  = this.getView().byId("idQact").getValue();
			    var ATime = this.getView().byId("idATime").getValue();
			    var AStat = this.getView().byId("idAStat").getValue();
			    var AUnit = this.getView().byId("idAUnit").getValue();
			    var Type  = oEvent.getSource().getText();
			    
			   // Displaying values on popup
				 sap.ui.getCore().byId("idOrder").setValue(iOrder);
				 sap.ui.getCore().byId("idOper").setValue(iOper);
				 sap.ui.getCore().byId("idWork").setValue(Work);
				 sap.ui.getCore().byId("idDesc").setValue(Desc);
				 sap.ui.getCore().byId("idMat").setValue(Mat);
				 sap.ui.getCore().byId("idMatD").setValue(MatD);
				 //sap.ui.getCore().byId("idQuan").setValue(Quan);
				 //sap.ui.getCore().byId("idQU").setValue(QU);
				 //sap.ui.getCore().byId("idQConf").setValue(QConf);
				 //sap.ui.getCore().byId("idQCon").setValue(QCon);
				 sap.ui.getCore().byId("idQact").setValue(Qact);
				 sap.ui.getCore().byId("idATime").setValue(ATime);
				 sap.ui.getCore().byId("idAStat").setValue(AStat);
				 sap.ui.getCore().byId("idAUnit").setValue(AUnit);
				 sap.ui.getCore().byId("idType").setValue(Type);
				 this._oDialog.open();
				// var oInfo = sap.ui.getCore().getModel("Idetails").getData();
				// Set the values on screen
			    
			    // this.getView().byId("idOper").setValue(oInfo.Vornr);
			    // this.getView().byId("idHU").setValue(oInfo.Venum);
			
		},
		
			fConfirm: function (oEvent) {
			/* This function confirm the production order */
			if (this._oDialog) {
			var that   = this;
			var iOrd   = sap.ui.getCore().byId("idOrder").getValue();
            var iOpe   = sap.ui.getCore().byId("idOper").getValue();	
            var iType  = sap.ui.getCore().byId("idType").getValue();
            var iDate  = sap.ui.getCore().byId("idDate").getValue();
            var iTime  = sap.ui.getCore().byId("idTime").getValue();
            var iQty   = "";
            
            // Passing values to back end
				// var odetails = {};
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var rString = "/PO_CONFSet(Order='" + iOrd + "',Operation='" + iOpe + "',Record='" + iType + "',Logdate='" + iDate + "',Logtime='" + iTime + "',Yield='" + iQty + "')";
                var vtitle = gmsgbundle.getText("Title");
				//Adding service to the odata model
				that.oModel.read(rString, {
					success: function(oData) {
						// odetails = oData;
						MessageToast.show(oData.GvMsg);
					},
					error: function(e) {

					}
				});
						
			}
		},
		
			_onRouteFound: function(oEvt) {
            var oInfo = sap.ui.getCore().getModel("Idetails").getData();
			},
			
				fSaveResults: function() {   
				var that = this;
				// Getting Order and operation 
				 iOrder = this.getView().byId("idOrder").getValue();
				 iOper = this.getView().byId("idOper").getValue();

				// Passing values to back end
				var odetails = {};
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var rString = "/PO_GETSet(Aufnr='" + iOrder + "',Vornr='" + iOper + "')";
                var vtitle = gmsgbundle.getText("Title");
				//Adding service to the odata model
				that.oModel.read(rString, {
					success: function(oData) {
						odetails = oData;
						
					    // Displaying values on screen	
						that.getView().byId("idWork").setValue(oData.Arbpl);
		            	that.getView().byId("idDesc").setValue(oData.Ktext);
			            that.getView().byId("idMat").setValue(oData.Matnr);
			            that.getView().byId("idMatD").setValue(oData.Maktx);
			            that.getView().byId("idQuan").setValue(oData.Gamng);
			            that.getView().byId("idQU").setValue(oData.Gmein);
			            that.getView().byId("QConf").setValue(oData.Igmng);
			            that.getView().byId("idQCon").setValue(oData.Gmein);
			            that.getView().byId("idQact").setValue(oData.ZactDate);
			            that.getView().byId("idATime").setValue(oData.ZactTime);
			            that.getView().byId("idAStat").setValue(oData.ZactPro);
			            that.getView().byId("idAUnit").setValue(oData.ZactStart);
			            that.getView().byId("idLast").setValue(oData.ZquanDate);
			            that.getView().byId("idQTime").setValue(oData.ZquanTime);
			            that.getView().byId("idQStat").setValue(oData.ZquanPro);
			            that.getView().byId("idQUnit").setValue(oData.ZquanUnit);
			            
			            // Getting values from back end
						var oModeldel = new sap.ui.model.json.JSONModel(odetails);
						sap.ui.getCore().setModel(oModeldel, "Idetails");
						oRouter.navTo("RouteView1");
			            },
					error: function(e) {

					}
				});
			},
			fBack: function() {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				// Goto initial screen
				oRouter.navTo("RouteView1");
			}

		});

	});