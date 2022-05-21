sap.ui.define([

], function () {
    return {
        status: function (value) {
            switch (value) {
                case true:
                    return "Objeto Descontinuado"
                case false:
                    return "Objeto Ativo"
            }
        }
    }
})