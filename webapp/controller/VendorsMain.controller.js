sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/suite/ui/microchart/RadialMicroChart",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/table/RowSettings",
    "sap/ui/table/RowAction",
    "sap/ui/table/RowActionItem",
    "sap/m/MessageToast",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, RadialMicroChart, Filter, FilterOperator, RowSettings, RowAction, RowActionItem, MessageToast) {
        "use strict";

        return Controller.extend("vendors.controller.VendorsMain", {
            _onGetPercentage(myData, field, value) {
                // Calculate the sum
                let sum = 0
                myData.forEach((item) => {
                    if (item[field] == value) {
                        sum += 1
                    }
                })
                // Calculate the percentage
                const percentageLand = (sum / myData.length) * 100;
                return percentageLand
            },
            onInit: function () {
                // Get the SmartFilterBar view
                const oSmartTableFilter = this.getView().byId("smartFilterBar");
                // Handle Scope definition
                const that = this
                // Attach the "search" event to the smarttablefilter's "search" event
                oSmartTableFilter.attachSearch(function () {
                    // Get the value of the SalesOrder filter input
                    var sVendorsId = oSmartTableFilter.getFilterData().Lifnr;
                    // Create a filter object using the SalesOrder value
                    var oFilter = new Filter("Lifnr", FilterOperator.EQ, sVendorsId);
                    // Read from the entityset
                    that.getOwnerComponent().getModel().read(`/VENDORSHeadersSetSet`, {
                        filters: [oFilter],
                        success: function (data) {
                            console.log(data);
                            if (data.results) {
                                // Destructing the Objects to get only used fields
                                const oData = data.results.map(({ Lifnr, Land1, Name1, Stras, Ort01, Pstlz, Telf1, Stcd1, Spras, Stkzn }) => ({ Lifnr, Land1, Name1, Stras, Ort01, Pstlz, Telf1, Stcd1, Spras, Stkzn }))
                                console.log(oData);
                                // Create the JSON model
                                const jModel = new sap.ui.model.json.JSONModel(oData);
                                // Bind the model to the view
                                that.getView().byId("table").setModel(jModel);
                                /* ##################"" START - Setting DONUT VALUES - #################### */
                                // Set static values for RadialMicroChart ---> First one 
                                var oRadialMicroChart = that.getView().byId("_IDGenHarveyBallMicroChartItemFirst");
                                // Calculate and set values to the view
                                oRadialMicroChart.setFraction(that._onGetPercentage(oData, 'Land1', 'MA'));
                                // Set static values for RadialMicroChart ---> Second one 
                                var oRadialMicroChart = that.getView().byId("_IDGenHarveyBallMicroChartItemSecond");
                                // Calculate and set values to the view
                                oRadialMicroChart.setFraction(that._onGetPercentage(oData, 'Spras', 'FR'));
                                // Set static values for RadialMicroChart ---> Third one 
                                var oRadialMicroChart = that.getView().byId("_IDGenHarveyBallMicroChartItemThird");
                                // Calculate and set values to the view
                                oRadialMicroChart.setFraction(that._onGetPercentage(oData, 'Stkzn', 'X'));
                                /* ##################"" END - Setting DONUT VALUES - #################### */

                                /** ################## Access to the Item - Start  #################### */
                                const handler = () => {
                                    var oTemplate = new RowAction({
                                        items: [
                                            new RowActionItem({
                                                type: "Navigation",
                                                press: (oEvent) => {
                                                    const oSelectedItem = oEvent.getSource().getParent().getParent(); // Get the selected row
                                                    const oBindingContext = oSelectedItem.getBindingContext(); // Get the binding context of the selected row
                                                    const sPath = oBindingContext.getPath(); // Get the path of the selected row
                                                    const oModel = oBindingContext.getModel(); // Get the model of the selected row

                                                    // Get the data of the selected row
                                                    const oSelectedRowData = oModel.getProperty(sPath);
                                                    console.log(oSelectedRowData);

                                                    const oRouter = sap.ui.core.UIComponent.getRouterFor(that);
                                                    if(oRouter){
                                                        oRouter.navTo("RouteVendorSingleObjectPage", {
                                                            id: JSON.stringify(oSelectedRowData),
                                                        })
                                                    }else{
                                                        alert('Error in routing ! Check console')
                                                    }
                                                },
                                                visible: "{Available}"
                                            })
                                        ]
                                    });
                                    return [1, oTemplate];
                                }

                                var oTable = that.getView().byId("table");
                                var iCount = 0;
                                var oTemplate = oTable.getRowActionTemplate()
                                if (oTemplate) {
                                    oTemplate.destroy()
                                    oTemplate = null
                                }
                                var aRes = handler()
                                console.log(aRes);
                                iCount = aRes[0];
                                oTemplate = aRes[1];

                                oTable.setRowActionTemplate(oTemplate);
                                oTable.setRowActionCount(iCount);
                                /** ################## Access to the Item - End  #################### */
                            }

                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })

                })
            },
            onGetSelectedIndices: function (evt) {
                var aIndices = this.byId("table").getSelectedIndices();
                var sMsg;
                if (aIndices.length < 1) {
                    sMsg = "no item selected";
                } else {
                    sMsg = aIndices;
                }
                MessageToast.show(sMsg);
            },
            onGetContextByIndex: function (evt) {
                var oTable = this.byId("table");
                var iIndex = oTable.getSelectedIndex();
                var sMsg;
                if (iIndex < 0) {
                    sMsg = "no item selected";
                } else {
                    sMsg = oTable.getContextByIndex(iIndex);
                }
                MessageToast.show(sMsg);
            },
            onClearSelection: function (evt) {
                this.byId("table").clearSelection();
            },
            onSwitchChange: function (oEvent) {
                var oTable = this.byId("table");
                oTable.setEnableSelectAll(oEvent.getParameter("state"));
            },
        });
    });

