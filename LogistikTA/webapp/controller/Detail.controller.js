sap.ui.define([
	"sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/ui/model/odata/v2/ODataModel", "sap/m/MessageBox",
	"sap/m/MessageToast"
], function (Controller, MessageBox, ODataModel, MessageToast, JSONModel) {
	"use strict";

	return Controller.extend("TA.LogistikTA.controller.Detail", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf TA.LogistikTA.view.Detail
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("Detail").attachMatched(this._onRouteMatched, this);

			var PaketZustandArr = [{
					status: "unterwegs zur zustellung"
				}, {
					status: "geliefert"
				}, {
					status: "Angekommen"
				}, {
					status: "Bearbeitung"
				}, {
					status: "Verloren"
				}, {
					status: "Beschädigt"
				}, {
					status: "?"
				}

			];

			var oModel3 = new sap.ui.model.json.JSONModel({
				Status: PaketZustandArr
			});
			this.getView().byId("statusform").setModel(oModel3);
		},
		onUpdatePacket: function () {

			var ID = this.getView().byId("inputID");
			var status = this.getView().byId("statusform");
			var stock = this.getView().byId("inputTor");
			var note = this.getView().byId("inputnote");
			//	var userID = this.getView().byId("UserID");
			var Plz = this.getView().byId("postzahlInput").getValue();
			Plz = parseInt(Plz, 10);
			//	var Plz = 10;

			var itemRow = {
				ID: parseInt(ID.getValue(), 10),
				status: status.getValue(),
				stock: stock.getValue(),
				note: note.getValue()
					//	userID: parseInt(userID.getValue(), 10)
			};
			if (!itemRow.stock) {

				if ((Plz > 6100) && (Plz < 6110)) {
					itemRow.stock = "1";
				} else if ((Plz >= 6110) && (Plz < 6120)) {
					itemRow.stock = "2";
				} else if ((Plz >= 6120) && (Plz < 6130)) {
					itemRow.stock = "3";
				} else if ((Plz >= 6130) && (Plz < 6140)) {
					itemRow.stock = "4";
				} else {
					itemRow.stock = null;
				}
			}
			var oModel = this.getView().getModel();

			oModel.update("/Packets(" + itemRow.ID + ")", itemRow, {
				method: "PUT",

				success: function (data) {
					sap.m.MessageToast.show("Update succesfull");
				},
				error: function (e) {
					sap.m.MessageToast.show("error");
				}
			});

			//	var OCtx = this.getView().getBindingContext();
			//	var path = OCtx.oModel.getProperty(OCtx.getPath());

			//	this.getView().getModel().setProperty(OCtx + "/Packets", Packet);
			//	this.getView().getModel().submitChanges();
			/*
			 */
		},
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			oView.bindElement({
				path: "/Packets(" + oArgs.ID + ")",
				events: {
					dataRequested: function () {
						oView.setBusy(true);
					},
					dataReceived: function () {
						oView.setBusy(false);
					}
				}
			});
		},
		backButton: function (evt) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("");
		}

	});

});