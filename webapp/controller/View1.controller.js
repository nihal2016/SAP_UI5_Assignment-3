sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/base/Log",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageToast, Log, Filter, FilterOperator) {
	"use strict";
	return Controller.extend("com.yash.Assignment3.controller.View1", {
		onInit: function () {
			this.getView().byId("personalDetailBox").setVisible(false);
			this.getView().byId("officeDetailBox").setVisible(false);
			this.getView().byId("contactDetailBox").setVisible(false);
			var employeeModel = new sap.ui.model.json.JSONModel();
			employeeModel.loadData("model/Employees.json");
			this.getView().setModel(employeeModel);
		},
		onOrientationChange: function (oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {
				duration: 5000
			});
		},
		searchEmployee: function (oEvent) {
			var value = oEvent.getSource().getValue();
			var employeeListFilter = new Filter({
				filters: [
					new Filter({
						path: "firstName",
						operator: FilterOperator.Contains,
						value1: value
					}),
					new Filter({
						path: "designation",
						operator: FilterOperator.Contains,
						value1: value
					})
				],
				and: false
			});
			var oList = this.getView().byId("masterEmployeeList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(employeeListFilter);
		},
		showEmployeeDetailPage: function (oEvent) {
			var sPath = oEvent.getParameter("listItem").getBindingContextPath();
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
			this.getSplitAppObj().toDetail(this.createId(sToPageId));
			this.byId(sToPageId).bindElement(sPath);
			this.byId("employeeList").bindElement(sPath + "/skillSet");
		},
		onPressHomeBack: function () {
			this.getSplitAppObj().to(this.createId("Home"));
		},
		showPersonalDetailBox: function () {
			this.getView().byId("showPersonalDetailList").setSelected(true);
			this.getView().byId("showContactDetailList").setSelected(false);
			this.getView().byId("showOfficeDetailList").setSelected(false);
			this.getView().byId("personalDetailBox").setVisible(true);
			this.getView().byId("officeDetailBox").setVisible(false);
			this.getView().byId("contactDetailBox").setVisible(false);
		},
		showContactDetailBox: function () {
			this.getView().byId("showPersonalDetailList").setSelected(false);
			this.getView().byId("showContactDetailList").setSelected(true);
			this.getView().byId("showOfficeDetailList").setSelected(false);
			this.getView().byId("personalDetailBox").setVisible(false);
			this.getView().byId("officeDetailBox").setVisible(false);
			this.getView().byId("contactDetailBox").setVisible(true);
		},
		showOfficeDetailBox: function () {
			this.getView().byId("showPersonalDetailList").setSelected(false);
			this.getView().byId("showContactDetailList").setSelected(false);
			this.getView().byId("showOfficeDetailList").setSelected(true);
			this.getView().byId("personalDetailBox").setVisible(false);
			this.getView().byId("officeDetailBox").setVisible(true);
			this.getView().byId("contactDetailBox").setVisible(false);
		},
		getSplitAppObj: function () {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				Log.info("SplitApp object can't be found");
			}
			return result;
		}
	});
});