var gmsgbundle;
var iOrder;
var iOper;
var vmsg;
sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/m/MessageToast",
		"sap/m/MessageBox",
		"sap/ui/core/BusyIndicator",
		"sap/ui/core/routing/History",
		"sap/ui/model/Filter",
		"sap/ui/model/json/JSONModel",
		"sap/ui/core/library",
	    "sap/ui/core/Core",
	    'sap/ui/core/Fragment',
	    'sap/m/Token',
	    "sap/ui/core/ValueState",
	    'sap/ui/model/FilterOperator'
	],
	function(Controller, MessageToast, MessageBox, BusyIndicator, History, Filter, JSONModel, library, Core, Fragment, Token, ValueState, FilterOperator) {
		"use strict";

	return Controller.extend("ZPROD_CONF1.controller.View1", {
		onAfterRendering: function() {
			// Accessing i18n Texts
				gmsgbundle = this.getView().getModel("i18n").getResourceBundle();
		},
		
		_data : {
			"date" : new Date()
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
				// oView.byId("idReason").setSelectedKey("");
				}
				}, oView);
				var sRootPath = jQuery.sap.getModulePath("ZPROD_CONF1");
	            var oModel = new sap.ui.model.json.JSONModel([sRootPath, "model/Data.json"].join("/"));
                this.getView().setModel(oModel, "jData");

			},
			
				fQuantityClick: function (oEvent) {
					var oView = this.getView();
    //                 var oDialog = oView.byId("idquan");
    //             	if (!oDialog) {
				// 	oDialog = sap.ui.xmlfragment(oView.getId(), "ZPROD_CONF1.fragments.quan", this);
				// 	this.getView().addDependent(oDialog);
				// }
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ZPROD_CONF1.fragments.quan", this);
					this.getView().addDependent(this._oDialog);
				}
                var oModel = new JSONModel();
			    oModel.setData({
				dateValue: new Date()
			    });
			
			    this.getView().setModel(oModel);
			    // sap.ui.getCore().byId("idDate2").setDateValue(new Date());
			    // sap.ui.getCore().byId("idTime2").setDateValue(new Date());
				
				
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
                var ANum = this.getView().byId("idNumber").getValue();
                var Type  = oEvent.getSource().getText();
			    
			   // Displaying values on popup
				 //sap.ui.getCore().byId("idOrder2").setValue(iOrder);
				 //sap.ui.getCore().byId("idOper2").setValue(iOper);
				 //sap.ui.getCore().byId("idWork2").setValue(Work);
				 //sap.ui.getCore().byId("idDesc2").setValue(Desc);
				 //sap.ui.getCore().byId("idMat2").setValue(Mat);
				 //sap.ui.getCore().byId("idMatD2").setValue(MatD);
				 
				 //sap.ui.getCore().byId("idQuan").setValue(Quan);
				 //sap.ui.getCore().byId("idQU").setValue(QU);
				 //sap.ui.getCore().byId("idQConf").setValue(QConf);
				 //sap.ui.getCore().byId("idQCon").setValue(QCon);
				 
				 //sap.ui.getCore().byId("idLast").setValue(Last);
				 //sap.ui.getCore().byId("idQTime").setValue(QTime);
				 //sap.ui.getCore().byId("idQStat").setValue(QStat);
				 //sap.ui.getCore().byId("idQUnit").setValue(QUnit);
				 //sap.ui.getCore().byId("idType2").setValue(Type);
				 //sap.ui.getCore().byId("idNumber2").setValue(ANum);
				 //sap.ui.getCore().byId("idReason2").setSelectedKey();
				 //oDialog.open();
				 this._oDialog.open();
			
				
		},

		
			fHandleClose: function (oEvent) {
			/* This function closes the dialog box */
			if (this._oDialog) {
			
				this._oDialog.close();
				
			}
		},
        
         dialogAfterClose: function (oEvent) {
         oEvent.getSource().destroy;
         },
         
		fActClick: function (oEvent) {
			    var oView = this.getView();
    //             var oDialog = oView.byId("idact");
    //             	if (!oDialog) {
				// 	oDialog = sap.ui.xmlfragment(oView.getId(), "ZPROD_CONF1.fragments.act", this);
				// 	this.getView().addDependent(oDialog);
				// }
				if (!this._oDialog) {
					this._oDialog = sap.ui.xmlfragment("ZPROD_CONF1.fragments.act", this);
					this.getView().addDependent(this._oDialog);
				}
				var sRootPath = jQuery.sap.getModulePath("ZPROD_CONF1");
	            var oModel = new sap.ui.model.json.JSONModel([sRootPath, "model/Data.json"].join("/"));
                this.getView().setModel(oModel, "jData");
             
                var oModel = new JSONModel();
			    oModel.setData({
				dateValue: new Date()
			    });
			
			    this.getView().setModel(oModel);
			    sap.ui.getCore().byId("idDate1").setDateValue(new Date());
			    sap.ui.getCore().byId("idTime1").setDateValue(new Date());
                 // Getting values from screen	
                iOrder = this.getView().byId("idOrder").getValue();
				iOper  = this.getView().byId("idOper").getValue(); 
				var Work = this.getView().byId("idWork").getValue();
		        var Desc = this.getView().byId("idDesc").getValue();
			    var Mat  = this.getView().byId("idMat").getValue();
			    var MatD = this.getView().byId("idMatD").getValue();
  			    var Qact  = this.getView().byId("idQact").getValue();
			    var ATime = this.getView().byId("idATime").getValue();
			    var AStat = this.getView().byId("idAStat").getValue();
			    var AUnit = this.getView().byId("idAUnit").getValue();
			    var ANum = this.getView().byId("idNumber").getValue();
			    var Type  = oEvent.getSource().getText();
			    
			   // Displaying values on popup
				 sap.ui.getCore().byId("idOrder1").setValue(iOrder);
				 sap.ui.getCore().byId("idOper1").setValue(iOper);
				 sap.ui.getCore().byId("idWork1").setValue(Work);
				 sap.ui.getCore().byId("idDesc1").setValue(Desc);
				 sap.ui.getCore().byId("idMat1").setValue(Mat);
				 sap.ui.getCore().byId("idMatD1").setValue(MatD);
				 sap.ui.getCore().byId("idQact1").setValue(Qact);
				 sap.ui.getCore().byId("idATime1").setValue(ATime);
				 sap.ui.getCore().byId("idAStat1").setValue(AStat);
				 sap.ui.getCore().byId("idAUnit1").setValue(AUnit);
				 sap.ui.getCore().byId("idType1").setValue(Type);
				 sap.ui.getCore().byId("idNumber1").setValue(ANum);
				 sap.ui.getCore().byId("idReason1").setSelectedKey();
		    	 //oDialog.open();
		    	 this._oDialog.open();
	
		},
    		
            
			fConfirm1: function (oEvent) {
			/* This function confirm the production order */
			
			if (this._oDialog) {
			var that   = this;
			var iOrd   = sap.ui.getCore().byId("idOrder1").getValue();
            var iOpe   = sap.ui.getCore().byId("idOper1").getValue();	
            var iType  = sap.ui.getCore().byId("idType1").getValue();
            var iDate  = sap.ui.getCore().byId("idDate1").getValue();
            var iTime  = sap.ui.getCore().byId("idTime1").getValue();
            var iReason  = sap.ui.getCore().byId("idReason1").getSelectedKey();
            var iQty   = "";
            
            // Passing values to back end
				var odetails = {};
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPTMPROD_CONF_SRV");
				var rString = "/PO_CONFSet(Order='" + iOrd + "',Reason='" + iReason + "',Operation='" + iOpe + "',Record='" + iType + "',Logdate='" + iDate + "',Logtime='" + iTime + "',Yield='" + iQty + "')";
                var vtitle = gmsgbundle.getText("Message");
				//Adding service to the odata model
						oModel.read(rString, null, null, false, function(oData) {
			        	odetails = oData;
			            vmsg = odetails.GvMsg;
			             MessageBox.show(
							vmsg, {
								title: vtitle,
								actions: [sap.m.MessageBox.Action.CLOSE], //					              
								onClose: function (oAction) {
									// Go to initial screen
						if (oData.GvFlag === '')
			        	{
				        that._oDialog.close();
				        var rString = "/PO_GETSet(Aufnr='" + iOrd + "',Vornr='" + iOpe + "')";
                        var vtitle = gmsgbundle.getText("Title");
				        //Adding service to the odata model
				        that.oModel.read(rString, {
					    success: function(oData) {
						odetails = oData;
						if (oData.Gv_msg1 !== '')
						{
						MessageBox.error(oData.Gv_msg1);
		            	return;
						}
						
					    // Displaying values on screen	
					    that.getView().byId("idNumber").setValue(oData.ANZMA);
						that.getView().byId("idWork").setValue(oData.Arbpl);
		            	that.getView().byId("idDesc").setValue(oData.Ktext);
			            that.getView().byId("idMat").setValue(oData.Matnr);
			            that.getView().byId("idMatD").setValue(oData.Maktx);
			            that.getView().byId("idQuan").setValue(oData.Gamng);
			            that.getView().byId("idQU").setValue(oData.Gmein);
			            that.getView().byId("idQConf").setValue(oData.Igmng);
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
			        	}
						oRouter.navTo("RouteView1");
						}
           			    }
						);
			  
			           });
			           }
			           },
			 
			 fConfirm2: function (oEvent) {
			/* This function confirm the production order */
			
			if (this._oDialog) {
			var that   = this;
			var iOrd   = sap.ui.getCore().byId("idOrder2").getValue();
            var iOpe   = sap.ui.getCore().byId("idOper2").getValue();	
            var iType  = sap.ui.getCore().byId("idType2").getValue();
            var iDate  = sap.ui.getCore().byId("idDate2").getValue();
            var iTime  = sap.ui.getCore().byId("idTime2").getValue();
            var iReason  = sap.ui.getCore().byId("idReason2").getSelectedKey();
            var iQty   = "";
            
            // Passing values to back end
				var odetails = {};
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				var oModel = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPTMPROD_CONF_SRV");
				var rString = "/PO_CONFSet(Order='" + iOrd + "',Reason='" + iReason + "',Operation='" + iOpe + "',Record='" + iType + "',Logdate='" + iDate + "',Logtime='" + iTime + "',Yield='" + iQty + "')";
                var vtitle = gmsgbundle.getText("Message");
				//Adding service to the odata model
						oModel.read(rString, null, null, false, function(oData) {
			        	odetails = oData;
			            vmsg = odetails.GvMsg;
			             MessageBox.show(
							vmsg, {
								title: vtitle,
								actions: [sap.m.MessageBox.Action.CLOSE], //					              
								onClose: function (oAction) {
									// Go to initial screen
						if (oData.GvFlag === '')
			        	{
				        that._oDialog.close();
				        var rString = "/PO_GETSet(Aufnr='" + iOrd + "',Vornr='" + iOpe + "')";
                        var vtitle = gmsgbundle.getText("Title");
				        //Adding service to the odata model
				        that.oModel.read(rString, {
					    success: function(oData) {
						odetails = oData;
						if (oData.Gv_msg1 !== '')
						{
						MessageBox.error(oData.Gv_msg1);
		            	return;
						}
						
					    // Displaying values on screen	
					    that.getView().byId("idNumber").setValue(oData.ANZMA);
						that.getView().byId("idWork").setValue(oData.Arbpl);
		            	that.getView().byId("idDesc").setValue(oData.Ktext);
			            that.getView().byId("idMat").setValue(oData.Matnr);
			            that.getView().byId("idMatD").setValue(oData.Maktx);
			            that.getView().byId("idQuan").setValue(oData.Gamng);
			            that.getView().byId("idQU").setValue(oData.Gmein);
			            that.getView().byId("idQConf").setValue(oData.Igmng);
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
			        	}
						oRouter.navTo("RouteView1");
						}
           			    }
						);
			  
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
						if (oData.Gv_msg1 !== '')
						{
						MessageBox.error(oData.Gv_msg1);
		            	return;
						}
						
					    // Displaying values on screen	
					    that.getView().byId("idNumber").setValue(oData.ANZMA);
						that.getView().byId("idWork").setValue(oData.Arbpl);
		            	that.getView().byId("idDesc").setValue(oData.Ktext);
			            that.getView().byId("idMat").setValue(oData.Matnr);
			            that.getView().byId("idMatD").setValue(oData.Maktx);
			            that.getView().byId("idQuan").setValue(oData.Gamng);
			            that.getView().byId("idQU").setValue(oData.Gmein);
			            that.getView().byId("idQConf").setValue(oData.Igmng);
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
	
			fchangetype1 : function(e) {
		    var vtype = this.getView().byId("idReason1").getSelectedKey();
			if (vtype !== '')
			{
			var oType = vtype;
			oType = oType;
			}
			},
				fBack: function (evt) {
					
					
              // back to main screen
		    	var oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation");
			    oCrossAppNavigator.toExternal({
				target: {
					semanticObject: "#"
				}
			});

		},
		
		onCrossNav: function () {
			sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
				target: {
					semanticObject: "ZpostCons_semobj",
					action: "display"
				},
				params: {
					"Warehouse": "4A10",
					"ManufacturingOrder": "100605",
					"Operation": "0010",
					"Quantity": "2",
                                        "Unit": "CAR",
					"mode": "crossNavigation"
				}
			});	
			
		}

		});

	});