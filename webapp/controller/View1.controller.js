var gmsgbundle;
var iOrder;
var iOper;
var vmsg;
var order;
var oper;
var selectionValue;
var messageArray = [];
sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox", "sap/ui/core/BusyIndicator",
	"sap/ui/core/routing/History", "sap/ui/model/Filter", "sap/ui/model/json/JSONModel", "sap/ui/core/library", "sap/ui/core/Core",
	"sap/ui/core/Fragment", "sap/m/Token", "sap/ui/core/ValueState", "sap/ui/model/FilterOperator"
], function(e, t, a, i, s, r, d, o, u, g, n, l, V) {
	"use strict";
	return e.extend("ZPROD_CONF3.controller.View1", {
		onAfterRendering: function() {
			gmsgbundle = this.getView().getModel("i18n").getResourceBundle();
		},
		_data: {
			date: new Date
		},
		onInit: function() {
			this.oModel = this.getOwnerComponent().getModel();
			var e = sap.ui.core.UIComponent.getRouterFor(this);
			e.getRoute("RouteView1").attachMatched(this._onRouteFound, this);
			var t = this.getView();
			t.addEventDelegate({
				onBeforeShow: function(e) {}
			}, t);
			var i = jQuery.sap.getModulePath("ZPROD_CONF3");
			var s = new sap.ui.model.json.JSONModel([i, "model/Data.json"].join("/"));
			this.getView().setModel(s, "jData");
			var r = window.location;
			console.log(r);
			var d = location.href;
			var o = d.includes("&");
			var u;
			var g;
			var l;
			var n;
			var V;
			var b;
			var p;
			var e;
			var I;
			if (o === true) {
				u = d.split("&");
				if (u[2].includes("=")) {
					g = u[2].split("=");
					n = g[1];
				}
				if (u[3].includes("=")) {
					l = u[3].split("=");
					V = l[1];
				}

				b = this;
				p = {};
				e = sap.ui.core.UIComponent.getRouterFor(this);
				I = "/PO_GETSet(Aufnr='" + V + "',Vornr='" + n + "')";
				b.oModel.read(I, {
					success: function(t) {
						p = t;
						if (t.Gv_msg1 !== "") {
							a.error(t.Gv_msg1);
							return;
						}
						b.getView().byId("idOrder").setValue(V);
						b.getView().byId("idOper").setValue(n);
						b.getView().byId("idNumber").setValue(t.ANZMA);
						b.getView().byId("idWork").setValue(t.Arbpl);
						b.getView().byId("idDesc").setValue(t.Ktext);
						b.getView().byId("idMat").setValue(t.Matnr);
						b.getView().byId("idMatD").setValue(t.Maktx);
						b.getView().byId("idQuan").setValue(t.Gamng);
						b.getView().byId("idQU").setValue(t.Gmein);
						b.getView().byId("idQConf").setValue(t.Igmng);
						var i = t.Igmng;
						var s = t.Gmein;
						if (i === "") {
							s = "";
						}
						b.getView().byId("idQCon").setValue(s);
						b.getView().byId("idQact").setValue(t.ZactDate);
						b.getView().byId("idATime").setValue(t.ZactTime);
						b.getView().byId("idAStat").setValue(t.ZactPro);
						b.getView().byId("idAUnit").setValue(t.ZactStart);
						b.getView().byId("idLast").setValue(t.ZquanDate);
						b.getView().byId("idQTime").setValue(t.ZquanTime);
						b.getView().byId("idQStat").setValue(t.ZquanPro);
						b.getView().byId("idQUnit").setValue(t.ZquanUnit);
						var r = new sap.ui.model.json.JSONModel(p);
						sap.ui.getCore().setModel(r, "Idetails");
						e.navTo("RouteView1");
					},
					error: function(e) {}
				});
			}

			selectionValue = "auto";
		},
		onReasonF4: function() {

			var e = this.getView().byId("idOrder").getValue();
			i.show(10);
			if (!this._ReasonDialog) {
				this._ReasonDialog = sap.ui.xmlfragment("ZPROD_CONF3.fragments.value", this);
			}
			var t = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPTMPROD_CONF_SRV");
			t.read("/GET_REASONSet", {
				filters: [new sap.ui.model.Filter("Aufnr", sap.ui.model.FilterOperator.EQ, e)],
				urlParameters: {
					$expand: "F4ReasonNav"
				},
				success: function(e, t) {
					i.hide();
					var a = new sap.ui.model.json.JSONModel(e.results[0].F4ReasonNav);
					this._ReasonDialog.setModel(a, "oReasonModel");
				}.bind(this),
				error: function(e) {
					i.hide();
				}.bind(this)
			});
			this._ReasonDialog.open();
		},
		onReasonF4Search: function(e) {

			var t = e.getParameter("value");
			var a = new sap.ui.model.Filter([new r("Grund", sap.ui.model.FilterOperator.Contains, t), new r("Grdtx", sap.ui.model.FilterOperator
				.Contains, t)]);
			var i = new sap.ui.model.Filter(a, false);
			var s = e.getSource().getBinding("items");
			s.filter([i]);
		},
		onReasonF4Confirm: function(e) {

			var t = e.getParameter("selectedItem");
			sap.ui.getCore().byId("idReason1").setValue(t.getTitle());
			sap.ui.getCore().byId("idReason1").setDescription(t.getInfo());
		},
		onReasonF4Change: function() {

			var e = this.getView().byId("idReason1").getValue();
			e = e.toUpperCase();
			sap.ui.getCore().byId("idReason1").setValue(e);
		},
		fQuantityClick: function(e) {
			var t = this.getView();
			if (!this._oDialog2) {
				this._oDialog2 = sap.ui.xmlfragment("ZPROD_CONF3.fragments.quan", this);
				this.getView().addDependent(this._oDialog2);
			}
			var a = new d;
			a.setData({
				dateValue: new Date
			});
			sap.ui.getCore().byId("idQuan2").setValue("");
			sap.ui.getCore().byId("idNumber2").setValue("");
			this.getView().setModel(a);
			sap.ui.getCore().byId("idDate2").setDateValue(new Date);
			sap.ui.getCore().byId("idTime2").setDateValue(new Date);
			iOrder = this.getView().byId("idOrder").getValue();
			iOper = this.getView().byId("idOper").getValue();
			var i = this.getView().byId("idWork").getValue();
			var s = this.getView().byId("idDesc").getValue();
			var r = this.getView().byId("idMat").getValue();
			var o = this.getView().byId("idMatD").getValue();
			var u = this.getView().byId("idLast").getValue();
			var g = this.getView().byId("idQTime").getValue();
			var n = this.getView().byId("idQStat").getValue();
			var l = this.getView().byId("idQUnit").getValue();
			var V = this.getView().byId("idNumber").getValue();
			var b = this.getView().byId("idQCon").getValue();
			if (b === "PC") {
				b = "PAL";
			}
			var p = e.getSource().getText();
			sap.ui.getCore().byId("idOrder2").setValue(iOrder);
			sap.ui.getCore().byId("idOper2").setValue(iOper);
			sap.ui.getCore().byId("idWork2").setValue(i);
			sap.ui.getCore().byId("idDesc2").setValue(s);
			sap.ui.getCore().byId("idMat2").setValue(r);
			sap.ui.getCore().byId("idMatD2").setValue(o);
			sap.ui.getCore().byId("idLast2").setValue(u);
			sap.ui.getCore().byId("idQTime2").setValue(g);
			sap.ui.getCore().byId("idQStat2").setValue(n);
			sap.ui.getCore().byId("idQUnit2").setValue(l);
			sap.ui.getCore().byId("idType2").setValue(p);
			sap.ui.getCore().byId("idQU2").setValue(b);
			this._oDialog2.open();
		},
		fHandleClose1: function(e) {
			if (this._oDialog1) {
				this._oDialog1.close();
			}
		},
		fHandleClose2: function(e) {
			if (this._oDialog2) {
				this._oDialog2.close();
			}
		},
		//Selecttin event for automatic component consumption

		autoCompSel: function(e) {

			selectionValue = "auto";
		},

		//Selectton event for manual component consumption

		manualCompSel: function(e) {

			selectionValue = "manual";
		},

		fActClick: function(e) {
			var t = this.getView();
			if (!this._oDialog1) {
				this._oDialog1 = sap.ui.xmlfragment("ZPROD_CONF3.fragments.act", this);
				this.getView().addDependent(this._oDialog1);
			}
			sap.ui.getCore().byId("idReason1").setValue("");
			sap.ui.getCore().byId("idReason1").setDescription("");
			sap.ui.getCore().byId("idNumber1").setValue("");
			var a = jQuery.sap.getModulePath("ZPROD_CONF3");
			var i = new sap.ui.model.json.JSONModel([a, "model/Data.json"].join("/"));
			this.getView().setModel(i, "jData");
			var i = new d;
			i.setData({
				dateValue: new Date
			});
			this.getView().setModel(i);
			sap.ui.getCore().byId("idDate1").setDateValue(new Date);
			sap.ui.getCore().byId("idTime1").setDateValue(new Date);
			iOrder = this.getView().byId("idOrder").getValue();
			iOper = this.getView().byId("idOper").getValue();
			var s = this.getView().byId("idWork").getValue();
			var r = this.getView().byId("idDesc").getValue();
			var o = this.getView().byId("idMat").getValue();
			var u = this.getView().byId("idMatD").getValue();
			var g = this.getView().byId("idQact").getValue();
			var n = this.getView().byId("idATime").getValue();
			var l = this.getView().byId("idAStat").getValue();
			var V = this.getView().byId("idAUnit").getValue();
			var b = this.getView().byId("idNumber").getValue();
			var p = e.getSource().getText();
			if (p === "Start Set-up" || p === "Start Processing") {
				sap.ui.getCore().byId("idNumber1").setVisible(false);
				sap.ui.getCore().byId("idLNumber1").setVisible(false);
			} else {
				sap.ui.getCore().byId("idNumber1").setVisible(true);
				sap.ui.getCore().byId("idLNumber1").setVisible(true);
			}
			sap.ui.getCore().byId("idOrder1").setValue(iOrder);
			sap.ui.getCore().byId("idOper1").setValue(iOper);
			sap.ui.getCore().byId("idWork1").setValue(s);
			sap.ui.getCore().byId("idDesc1").setValue(r);
			sap.ui.getCore().byId("idMat1").setValue(o);
			sap.ui.getCore().byId("idMatD1").setValue(u);
			sap.ui.getCore().byId("idQact1").setValue(g);
			sap.ui.getCore().byId("idATime1").setValue(n);
			sap.ui.getCore().byId("idAStat1").setValue(l);
			sap.ui.getCore().byId("idAUnit1").setValue(V);
			sap.ui.getCore().byId("idType1").setValue(p);
			this._oDialog1.open();
		},
		fConfirm1: function(e) {

			if (this._oDialog1) {
				var t = this;
				var i = sap.ui.getCore().byId("idOrder1").getValue();
				var s = sap.ui.getCore().byId("idOper1").getValue();
				var r = sap.ui.getCore().byId("idType1").getValue();
				var d = sap.ui.getCore().byId("idDate1").getValue();
				var o = sap.ui.getCore().byId("idTime1").getValue();
				var u = sap.ui.getCore().byId("idReason1").getValue();
				var g = sap.ui.getCore().byId("idNumber1").getValue();
				var n = "";
				var l = "";
				if (r === "Partial End Set-up" || r === "Interrupt Set-up" || r === "End Set-up" || r === "Partial End Processing" || r ===
					"Interrupt Processing" || r === "End Processing") {
					if (g === "" || g === "0") {
						a.error("Please insert a number of operators");
						return;
					}
				} else {
					g = "";
				}
				var V = {};
				var b = sap.ui.core.UIComponent.getRouterFor(this);
				var p = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPTMPROD_CONF_SRV");
				var I = "/PO_CONFSet(Order='" + i + "',Reason='" + u + "',Number='" + g + "',Operation='" + s + "',Record='" + r + "',Logdate='" +
					d + "',Logtime='" + o + "',Unit='" + l + "',Yield='" + n + "')";
				var y = gmsgbundle.getText("Message");
				p.read(I, null, null, false, function(e) {
					V = e;
					vmsg = V.GvMsg;
					a.show(vmsg, {
						title: y,
						actions: [sap.m.MessageBox.Action.CLOSE],
						onClose: function(r) {
							if (e.GvFlag === "") {
								t._oDialog1.close();
								var d = "/PO_GETSet(Aufnr='" + i + "',Vornr='" + s + "')";
								var o = gmsgbundle.getText("Title");
								t.oModel.read(d, {
									success: function(e) {
										V = e;
										if (e.Gv_msg1 !== "") {
											a.error(e.Gv_msg1);
											return;
										}
										t.getView().byId("idNumber").setValue(e.ANZMA);
										t.getView().byId("idWork").setValue(e.Arbpl);
										t.getView().byId("idDesc").setValue(e.Ktext);
										t.getView().byId("idMat").setValue(e.Matnr);
										t.getView().byId("idMatD").setValue(e.Maktx);
										t.getView().byId("idQuan").setValue(e.Gamng);
										t.getView().byId("idQU").setValue(e.Gmein);
										t.getView().byId("idQConf").setValue(e.Igmng);
										var i = e.Igmng;
										var s = e.Gmein;
										if (i === "") {
											s = "";
										}
										t.getView().byId("idQCon").setValue(s);
										t.getView().byId("idQact").setValue(e.ZactDate);
										t.getView().byId("idATime").setValue(e.ZactTime);
										t.getView().byId("idAStat").setValue(e.ZactPro);
										t.getView().byId("idAUnit").setValue(e.ZactStart);
										var r = new sap.ui.model.json.JSONModel(V);
										sap.ui.getCore().setModel(r, "Idetails");
										b.navTo("RouteView1");
									},
									error: function(e) {}
								});
							}
							b.navTo("RouteView1");
						}
					});
				});
			}
		},

		fConfirm2: function(e) {
			messageArray = [];
			var t = this;
			var i = sap.ui.getCore().byId("idOrder2").getValue();
			var s = sap.ui.getCore().byId("idOper2").getValue();
			var r = sap.ui.getCore().byId("idType2").getValue();
			var d = sap.ui.getCore().byId("idDate2").getValue();
			var o = sap.ui.getCore().byId("idTime2").getValue();
			var u = sap.ui.getCore().byId("idQuan2").getValue();
			var g = sap.ui.getCore().byId("idQU2").getValue();
			var n = sap.ui.getCore().byId("idNumber2").getValue();
			var oModel = t.getOwnerComponent().getModel();
			var selectedArray = [];
			var payloadObject = {};

			payloadObject.Lgnum = "4A10";
			payloadObject.Huident = "";
			payloadObject.MfgOrder = i;
			payloadObject.Quana = u;
			payloadObject.Altme = g;
			payloadObject.Operation = s;
			payloadObject.Psa = "";

			var l = "";

			var V = {};
			var b = sap.ui.core.UIComponent.getRouterFor(this);
			var p = new sap.ui.model.odata.ODataModel("/sap/opu/odata/sap/ZPTMPROD_CONF_SRV");
			var I = "/PO_CONFSet(Order='" + i + "',Operation='" + s + "',Reason='" + l + "',Number='" + n + "',Record='" + r + "',Logdate='" +
				d + "',Logtime='" + o + "',Unit='" + g + "',Yield='" + u + "')";
			var y = gmsgbundle.getText("Message");

			//if selected radio button is automatic then trigger background job processing
			if (selectionValue === "auto") {

				console.log("Inside auto selection");

				if (n === "" || n === "0") {
					a.error("Please insert a number of operators");
					return;
				}

				////////////////////////////////////////////

				p.read(I, null, null, false, function(e) {
					V = e;
					vmsg = V.GvMsg;
					a.show(vmsg, {
						title: y,
						actions: [sap.m.MessageBox.Action.CLOSE],
						onClose: function(r) {
							if (e.GvFlag === "") {
								// Calling background processing
                         sap.ui.core.BusyIndicator.show();
								selectedArray.push(payloadObject);

								var aCreateDocPayload = selectedArray;
								oModel.setDeferredGroups(["backgroundConsumptionBatch"]);
								oModel.setUseBatch(true);

								var that = this;
								

								var mParameter = {

									urlParameters: null,
									groupId: "ReversalConsumptionBatch",
									success: function(oData, oRet) {

										//	var serverMessage = oRet.headers["sap-message"];

										//	console.log("Message from server", serverMessage);
										console.log("Inside mparameter success");
									//	sap.ui.core.BusyIndicator.hide();

									},
									error: function(oError) {
										console.log("Inside mparameter error");
									//	sap.ui.core.BusyIndicator.hide();

									}
								};

								var singleentry = {
									groupId: "ReversalConsumptionBatch",
									urlParameters: null,
									success: function(oData, oRet) {
										console.log("Inside singleentry success");
										//The success callback function for each record

										var serverMessage = oRet.headers["sap-message"];

										if (serverMessage === undefined) {
											console.log("Inside if block for message toast");
											sap.ui.core.BusyIndicator.hide();
											a.show("Consumption posted successfully", {
												icon: a.Icon.SUCCESS,
												title: "Dear User",
												actions: [sap.m.MessageBox.Action.CLOSE],
												
												onClose: function(r) {
													
												//	t._oDialog2.close();	
												}

											});

										} else {
											messageArray.push(JSON.parse(serverMessage).details);
											t.sapMessageDisplay();
											sap.ui.core.BusyIndicator.hide();
											return;
											// return;
										}

									},
									error: function(oError) {
										a.show("Error in background job processing", {
											icon: a.Icon.ERROR,
											title: "Dear User",
											actions: [sap.m.MessageBox.Action.OK]

										});
									}

								};

								for (var m = 0; m < aCreateDocPayload.length; m++) {

									singleentry.properties = aCreateDocPayload[m];
									singleentry.changeSetId = "changeset " + m;
									oModel.createEntry("/PO_POSTSet", singleentry);

								}
								oModel.submitChanges(mParameter);

								//
								t._oDialog2.close();
								var d = "/PO_GETSet(Aufnr='" + i + "',Vornr='" + s + "')";
								var o = gmsgbundle.getText("Title");
								t.oModel.read(d, {
									success: function(e) {
										V = e;
										if (e.Gv_msg1 !== "") {
											a.error(e.Gv_msg1);
											return;
										}
										t.getView().byId("idNumber").setValue(e.ANZMA);
										t.getView().byId("idWork").setValue(e.Arbpl);
										t.getView().byId("idDesc").setValue(e.Ktext);
										t.getView().byId("idMat").setValue(e.Matnr);
										t.getView().byId("idMatD").setValue(e.Maktx);
										t.getView().byId("idQuan").setValue(e.Gamng);
										t.getView().byId("idQU").setValue(e.Gmein);
										t.getView().byId("idQConf").setValue(e.Igmng);
										var i = e.Igmng;
										var s = e.Gmein;
										if (i === "") {
											s = "";
										}
										t.getView().byId("idQCon").setValue(s);
										t.getView().byId("idLast").setValue(e.ZquanDate);
										t.getView().byId("idQTime").setValue(e.ZquanTime);
										t.getView().byId("idQStat").setValue(e.ZquanPro);
										t.getView().byId("idQUnit").setValue(e.ZquanUnit);
										var r = new sap.ui.model.json.JSONModel(V);
										sap.ui.getCore().setModel(r, "Idetails");
										//	b.navTo("RouteView1");
									},
									error: function(e) {}
								});
							}
							//	b.navTo("RouteView1");
						}
					});
				});

			}
			//if selected radio button is manual then trigger manual consumption
			else {

				if (this._oDialog2) {

					if (n === "" || n === "0") {
						a.error("Please insert a number of operators");
						return;
					}
				
					p.read(I, null, null, false, function(e) {
						V = e;
						vmsg = V.GvMsg;
						a.show(vmsg, {
							title: y,
							actions: [sap.m.MessageBox.Action.CLOSE],
							onClose: function(r) {
								if (e.GvFlag === "") {
									// Calling Post consumption App
									if (sap.ui.getCore().byId("idManual2").getSelected()) {
										sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({
											target: {
												semanticObject: "ZpostCons_semobj",
												action: "display"
											},
											params: {
												"Warehouse": "4A10",
												"ManufacturingOrder": i,
												"Operation": s,
												"Quantity": u,
												"Unit": g,
												"mode": "crossNavigation"
											}
										});
									}
									//
									t._oDialog2.close();
									var d = "/PO_GETSet(Aufnr='" + i + "',Vornr='" + s + "')";
									var o = gmsgbundle.getText("Title");
									t.oModel.read(d, {
										success: function(e) {
											V = e;
											if (e.Gv_msg1 !== "") {
												a.error(e.Gv_msg1);
												return;
											}
											t.getView().byId("idNumber").setValue(e.ANZMA);
											t.getView().byId("idWork").setValue(e.Arbpl);
											t.getView().byId("idDesc").setValue(e.Ktext);
											t.getView().byId("idMat").setValue(e.Matnr);
											t.getView().byId("idMatD").setValue(e.Maktx);
											t.getView().byId("idQuan").setValue(e.Gamng);
											t.getView().byId("idQU").setValue(e.Gmein);
											t.getView().byId("idQConf").setValue(e.Igmng);
											var i = e.Igmng;
											var s = e.Gmein;
											if (i === "") {
												s = "";
											}
											t.getView().byId("idQCon").setValue(s);
											t.getView().byId("idLast").setValue(e.ZquanDate);
											t.getView().byId("idQTime").setValue(e.ZquanTime);
											t.getView().byId("idQStat").setValue(e.ZquanPro);
											t.getView().byId("idQUnit").setValue(e.ZquanUnit);
											var r = new sap.ui.model.json.JSONModel(V);
											sap.ui.getCore().setModel(r, "Idetails");
											b.navTo("RouteView1");
										},
										error: function(e) {}
									});
								}
								b.navTo("RouteView1");
							}
						});
					});
				}
			}
		},
		// code for sap-message display

		sapMessageDisplay: function(e) {
			sap.ui.core.BusyIndicator.show();
			var messageArray2 = [];
			for (var m = 0; m < messageArray[0].length; m++) {

				messageArray2.push(messageArray[0][m]);

			}

			var messageModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(messageModel, "messageModel");
			this.getView().getModel("messageModel").setProperty("/messageSet", messageArray2);
			sap.ui.core.BusyIndicator.hide();

			if (!this._oDialog) {
				//	this._oDialog = sap.ui.xmlfragment("com.bp.lubescustfinancial.fragments.OrderChangeHx", this);
				this._oDialog = sap.ui.xmlfragment("ZPROD_CONF3.fragments.serverMessage", this);
			}

			this.getView().addDependent(this._oDialog);
			this._oDialog.open();

			console.log("Inside sap message display");
		},

		//Close sap-message dialog
		handleClose: function(oEvent) {
			/* This function closes the dialog box */
			if (this._oDialog) {

				this._oDialog.close();
			}
		},

		_onRouteFound: function(e) {},
		fSaveResults: function() {
			var e = this;
			iOrder = this.getView().byId("idOrder").getValue();
			iOper = this.getView().byId("idOper").getValue();
			var t = {};
			var i = sap.ui.core.UIComponent.getRouterFor(this);
			var s = "/PO_GETSet(Aufnr='" + iOrder + "',Vornr='" + iOper + "')";
			var r = gmsgbundle.getText("Title");
			e.oModel.read(s, {
				success: function(s) {
					t = s;
					if (s.Gv_msg1 !== "") {
						a.error(s.Gv_msg1);
						return;
					}
					e.getView().byId("idNumber").setValue(s.ANZMA);
					e.getView().byId("idWork").setValue(s.Arbpl);
					e.getView().byId("idDesc").setValue(s.Ktext);
					e.getView().byId("idMat").setValue(s.Matnr);
					e.getView().byId("idMatD").setValue(s.Maktx);
					e.getView().byId("idQuan").setValue(s.Gamng);
					e.getView().byId("idQU").setValue(s.Gmein);
					e.getView().byId("idQConf").setValue(s.Igmng);
					var r = s.Igmng;
					var d = s.Gmein;
					if (r === "") {
						d = "";
					}
					e.getView().byId("idQCon").setValue(d);
					e.getView().byId("idQact").setValue(s.ZactDate);
					e.getView().byId("idATime").setValue(s.ZactTime);
					e.getView().byId("idAStat").setValue(s.ZactPro);
					e.getView().byId("idAUnit").setValue(s.ZactStart);
					e.getView().byId("idLast").setValue(s.ZquanDate);
					e.getView().byId("idQTime").setValue(s.ZquanTime);
					e.getView().byId("idQStat").setValue(s.ZquanPro);
					e.getView().byId("idQUnit").setValue(s.ZquanUnit);
					var o = new sap.ui.model.json.JSONModel(t);
					sap.ui.getCore().setModel(o, "Idetails");
					i.navTo("RouteView1");
				},
				error: function(e) {}
			});
		},
		fchangetype1: function(e) {
			var t = this.getView().byId("idReason1").getSelectedKey();
			if (t !== "") {
				var a = t;
				a = a;
			}
		},
		fBack: function(e) {
			var t = sap.ushell.Container.getService("CrossApplicationNavigation");
			t.toExternal({
				target: {
					semanticObject: "#"
				}
			});
		}

	});

});