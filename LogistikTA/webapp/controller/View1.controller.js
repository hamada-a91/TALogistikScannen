sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageBox",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/FilterType"
], function (Controller, JSONModel, FilterType, MessageBox, formatter, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("sapcp.cf.tutorial.app.controller.View1", {
		onInit: function () {
			var worklistView = this.getView().byId("idColumn").getModel();

		},

		onSearch: function (oEvent) {

			var aTableSearchState = [];
			var sQuery = oEvent.getParameter("query");

			if (sQuery) {
				aTableSearchState.push(new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.EQ, sQuery));
			}
			var list = this.getView().byId("table");
			var binding = list.getBinding("items");
			binding.filter(aTableSearchState);

		},
		onSearch1: function () {
			var oView = this.getView(),
				sValue = oView.byId("searchField").getValue(),
				oFilter = new Filter("ID", FilterOperator.Contains, sValue);

			oView.byId("table").getBinding("items").filter(oFilter, FilterType.Application);
		},
		onUpdateFinished: function (oEvent) {

		},

		// show in a pop-up which list element was pressed
		handleListItemPress: function (oEvent) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var selectedProductId = oEvent.getSource().getBindingContext().getProperty("ID");
			oRouter.navTo("Detail", {
				ID: selectedProductId
			});
		}

	});
});