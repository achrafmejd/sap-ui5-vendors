sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/suite/ui/microchart/RadialMicroChart"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, RadialMicroChart) {
        "use strict";

        return Controller.extend("vendors.controller.VendorsMain", {
            onInit: function () {
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

