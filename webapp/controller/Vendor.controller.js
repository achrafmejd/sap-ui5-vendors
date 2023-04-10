sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History"

],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History) {
        "use strict";

        return Controller.extend("vendors.controller.Vendor", {
            onInit: function() {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Get the router instance
                oRouter.getRoute("RouteVendorSingleObjectPage").attachPatternMatched(this._onRouteMatched, this); // Attach a pattern matched event handler
              },
            _onRouteMatched: function(oEvent) {
                const oSelectedItem = oEvent.getParameter("arguments").id; // Access the passed parameter from the first view
                console.log("HELLO FROM THE SECOND VIE<");
                console.log(JSON.parse(oSelectedItem));
            },
            onNavBack: function(){
                var oHistory = History.getInstance();
                var sPreviousHash = oHistory.getPreviousHash();
    
                if (sPreviousHash !== undefined) {
                    window.history.go(-1);
                } else {
                    var oRouter = this.getOwnerComponent().getRouter();
                    oRouter.navTo("RouteVendorsMain", {}, true);
                }
            }
        });
    });

