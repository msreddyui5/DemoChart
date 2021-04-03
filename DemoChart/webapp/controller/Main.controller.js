sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function(Controller) {
	"use strict";

	return Controller.extend("DemoDemoChart.controller.Main", {
		onInit: function(){
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			this.oRouter.attachRoutePatternMatched(this.herculis, this);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({
				"CustomerSales":[],
				"CurrencySales":[],
				"CategorySales":[],
				"CountrySales":[]
			});
			this.getView().setModel(oModel,"viewModel");
			this._initPageSettings(this.getView(), "idVizFrame1", "Cell1");
			this._initPageSettings(this.getView(), "idVizFrame2", "Cell2");
			this._initPageSettings(this.getView(), "idVizFrame3", "Cell3");
			this._initPageSettings(this.getView(), "idVizFrame4", "Cell4");
		},
		herculis: function(){
			var that = this;
			
			this.getView().getModel().read("/SalesCustomerSet",{
				success: function(data){
					that.getView().getModel("viewModel").setProperty("/CustomerSales", data.results);
				},
				error: function(){
					
				}
			});
			this.getView().getModel().read("/SalesProductSet",{
				success: function(data){
					that.getView().getModel("viewModel").setProperty("/CategorySales", data.results);
				},
				error: function(){
					
				}
			});
			this.getView().getModel().read("/SalesCurrencySet",{
				success: function(data){
					that.getView().getModel("viewModel").setProperty("/CurrencySales", data.results);
				},
				error: function(){
					
				}
			});
			this.getView().getModel().read("/SalesCountrySet",{
				success: function(data){
					that.getView().getModel("viewModel").setProperty("/CountrySales", data.results);
				},
				error: function(){
					
				}
			});
		},
		_initPageSettings: function(oView, sChartId, sBlockId) {
			// Hide Settings Panel for phone
			if (sap.ui.Device.system.phone) {
				var oSettingsPanel = oView.byId('settingsPanel');
				if (oSettingsPanel) {
					oSettingsPanel.setExpanded(false);
				}
			}

			// try to load sap.suite.ui.commons for using ChartContainer
			// sap.suite.ui.commons is available in sapui5-sdk-dist but not in demokit
			var libraries = sap.ui.getVersionInfo().libraries || [];
			var bSuiteAvailable = libraries.some(function(lib) {
				return lib.name.indexOf("sap.suite.ui.commons") > -1;
			});
			if (bSuiteAvailable) {
				jQuery.sap.require("sap/suite/ui/commons/ChartContainer");
				var vizframe = oView.byId(sChartId);
				var oChartContainerContent = new sap.suite.ui.commons.ChartContainerContent({
					content: [vizframe]
				});
				var oChartContainer = new sap.suite.ui.commons.ChartContainer({
					content: [oChartContainerContent]
				});
				oChartContainer.setShowFullScreen(true);
				oChartContainer.setAutoAdjustHeight(true);
				oView.byId(sBlockId).addContent(oChartContainer);
			}
		}
	});
});