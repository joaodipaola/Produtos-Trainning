sap.ui.define([
    "trainning/produto/controller/Services",
    "sap/ui/model/json/JSONModel",
    "trainning/produto/model/formatter",
    'sap/ui/core/Fragment'
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Services, JSONModel, formatter, Fragment) {
        "use strict";

        return Services.extend("trainning.produto.controller.App", {
            formatter: formatter,
            onInit: async function () {
                this.getView().setModel(new JSONModel({
                    busy: true,
                    delay: 0
                }), "viewModel")

                this.oModelView = this.getView().getModel("viewModel")

                let oProducts = this.callServices('Products').get()

                oProducts.then(answer => {
                    this.getView().setModel(new JSONModel(answer.results), "products")
                    this.oModelView.setProperty("/busy", false)
                }).catch(error => {
                    this.oModelView.setProperty("/busy", false)
                    debugger
                })
            },

            onClickCell: function (event) {
                let oContext = event.getParameter("rowBindingContext")
                let oDataOfCellClicked = oContext.getObject()

                let oButton = event.getSource(),
                    oView = this.getView();

                if (!this._pPopover) {
                    this._pPopover = Fragment.load({
                        id: oView.getId(),
                        name: "trainning.produto.view.fragments.Popover",
                        controller: this
                    }).then(oPopover => {
                        oView.addDependent(oPopover);
                        oPopover.bindElement(`products>${oContext.sPath}`)
                        debugger
                        this.getView()

                        return oPopover;
                    });
                }

                this._pPopover.then(function (oPopover) {
                    oPopover.openBy(oButton);
                });
            },

            handleCloseButton: function (oEvent) {
                this.byId("myPopover").close();
            }
        });
    });