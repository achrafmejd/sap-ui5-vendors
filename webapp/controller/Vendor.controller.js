sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    'sap/viz/ui5/format/ChartFormatter',


],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, ChartFormatter) {
        "use strict";

        return Controller.extend("vendors.controller.Vendor", {
            onInit: function () {
                const oRouter = sap.ui.core.UIComponent.getRouterFor(this); // Get the router instance
                oRouter.getRoute("RouteVendorSingleObjectPage").attachPatternMatched(this._onRouteMatched, this); // Attach a pattern matched event handler
                const data = {
                    myData: [
                        {
                            "Commande": "Validée",
                            "Nombre": 50
                        },
                        {
                            "Commande": "Non Validée",
                            "Nombre": 40
                        },
                        {
                            "Commande": "Supprimée",
                            "Nombre": 10
                        }
                    ]
                }
                var jsonData = new sap.ui.model.json.JSONModel(data);
                var oVizFrame = this.getView().byId("idVizFrame");
                if(oVizFrame){
                    oVizFrame.setModel(jsonData);
                    oVizFrame.setVizProperties({
                        plotArea: {
                            dataLabel: {
                                visible: true
                            }
                        }
                    });
                }
    
                var oPopOver = this.getView().byId("idPopOver");
                oPopOver.connect(oVizFrame.getVizUid());
                oPopOver.setFormatString(ChartFormatter.DefaultPattern.STANDARDFLOAT);
            },
            _onRouteMatched: function (oEvent) {
                // Access the passed parameter from the first view
                const oSelectedItem = oEvent.getParameter("arguments").id; 
            },
            onNavBack: function () {
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

