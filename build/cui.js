"use strict";
var ValidationService = (function () {
    function ValidationService() {
    }
    ValidationService.cuiValidator = function (cui) {
        var cuiValue = cui.value;
        if (cuiValue) {
            // Daca este string, elimina atributul fiscal si spatiile
            if (isNaN(parseFloat(cuiValue))) {
                cuiValue = cuiValue.toUpperCase();
                if (cuiValue.indexOf('RO') == 0) {
                    cuiValue = cuiValue.substring(2);
                }
                cuiValue = parseFloat(cuiValue);
            }
            // numarul de control
            var controlKey = 753217532;
            // extrage cifra de control
            var cuiControlDigit = cuiValue % 10;
            cuiValue = (cuiValue / 10) | 0;
            // executa operatiile pe cifre
            var sum = 0;
            while (cuiValue > 0) {
                sum = sum + (cuiValue % 10) * (controlKey % 10);
                cuiValue = (cuiValue / 10) | 0;
                controlKey = (controlKey / 10) | 0;
            }
            // aplica inmultirea cu 10 si afla modulo 11
            var controlDigit = sum * 10 % 11;
            if (controlDigit == 10) {
                controlDigit = 0;
            }
            if (cuiControlDigit == controlDigit) {
                //CUI validation succeeded
                return null;
            }
            else {
                //CUI validation failed
                return { cui: true };
            }
        }
    };
    return ValidationService;
}());
exports.ValidationService = ValidationService;
//# sourceMappingURL=cui.js.map