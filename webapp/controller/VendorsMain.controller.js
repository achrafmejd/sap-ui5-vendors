sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/suite/ui/microchart/RadialMicroChart",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, RadialMicroChart, Filter, FilterOperator) {
        "use strict";

        return Controller.extend("vendors.controller.VendorsMain", {
            _onGetPercentageOfMoroccanVendors(myData) {
                // Calculate the sum
                let sum = 0
                myData.forEach((item) => {
                    if (item.Land1 == 'MA') {
                        sum += 1
                    }
                })
                // Calculate the percentage
                const percentageLand = (sum / myData.length) * 100;
                return percentageLand
            },
            onInit: function () {
                // Get the SmartFilterBar
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
                                const oData = data.results.map(({ Lifnr, Land1, Name1, Stras, Ort01, Pstlz, Telf1, Stcd1 }) => ({ Lifnr, Land1, Name1, Stras, Ort01, Pstlz, Telf1, Stcd1 }))
                                console.log(oData);
                                // Create the JSON model
                                const jModel = new sap.ui.model.json.JSONModel(oData);
                                // Bind the model to the view
                                that.getView().byId("table").setModel(jModel);
                                // Calculate the Percentage for MA Code - Start 

                                // Set static values for GenericTile
                                var oGenericTile = that.getView().byId("_IDGenGenericTile1");
                                oGenericTile.setHeader("Fournisseur");
                                oGenericTile.setSubheader("au Maroc");
                                oGenericTile.setFrameType("OneByOne");

                                // Set static values for RadialMicroChart
                                var oRadialMicroChart = that.getView().byId("_IDGenRadialMicroChart1");
                                oRadialMicroChart.setSize("Responsive");
                                oRadialMicroChart.setPercentage(that._onGetPercentageOfMoroccanVendors(oData));
                                oRadialMicroChart.setAlignContent("Right");
                                // oRadialMicroChart.setValueColor(RadialMicroChart.ValueColor.Neutral);




                            }
                        },
                        error: function (err) {
                            console.log(err);
                        }
                    })
                })
                // Set static values for GenericTile
                // var oGenericTile = this.getView().byId("_IDGenGenericTile2");
                // oGenericTile.setHeader("Achraf");
                // oGenericTile.setSubheader("a RadialMicroChart");
                // oGenericTile.setFrameType("OneByOne");

                // // Set static values for RadialMicroChart
                // var oRadialMicroChart = this.getView().byId("_IDGenRadialMicroChart3");
                // oRadialMicroChart.setSize("Responsive");
                // oRadialMicroChart.setPercentage(99.9);
                // oRadialMicroChart.setAlignContent("Right");
                // // oRadialMicroChart.setValueColor(RadialMicroChart.ValueColor.Neutral);
            }
        });
    });

