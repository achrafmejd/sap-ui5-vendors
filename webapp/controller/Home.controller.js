sap.ui.define([
    "sap/ui/core/mvc/Controller",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("vendors.controller.Home", {
            onInit: function () {

            },
            onNavigateToVendors: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                if (oRouter) {
                    oRouter.navTo("RouteVendorsMain")
                } else {
                    alert('Error in routing ! Check console')
                }
            },
            onNavigateToOrders: function(){
                alert('Not developed yet')
            },
            onNavigateToArticles: function(){
                alert('Not developed yet')
            }

        });
    });

