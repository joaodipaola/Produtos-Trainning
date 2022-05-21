sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/odata/v2/ODataModel",
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, ODataModel) {
        "use strict";

        return Controller.extend("trainning.produto.controller.Services", {
            callServices: function (entityName) {
                let oModel = new ODataModel("/V2/Northwind/Northwind.svc/", true)

                return {
                    get: (oFilter) => new Promise((resolve, reject) => oModel.read(`/${entityName}`, {
                        success: data => resolve(data),
                        error: answer => reject(answer)
                    })),
                    delete: (oKey) => new Promise(() => oModel.read(`/${entityName}`, {
                        success: data => data,
                        error: answer => answer
                    })),
                    create: (oBody) => new Promise(() => oModel.read(`/${entityName}`, oBody, {
                        success: data => data,
                        error: answer => answer
                    })),
                    update: (oBody) => new Promise(() => oModel.read(`/${entityName}`, oBody, {
                        success: data => data,
                        error: answer => answer
                    })),
                }
            }
        });
    });
