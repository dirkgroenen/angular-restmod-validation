angular.module('restmod').factory('Validation', [
  'restmod',
  function (restmod) {
    'use strict';
    return restmod.mixin(function () {
      // Validate the model before each save and
      // cancel the request if it ain't valid.
      this.on('before-save', function (request) {
        if (!this.$isValid()) {
          // Cancel request
          this.$$action.canceled = true;
        }
      }).define('$validate', function (_model) {
      }).define('$isValid', function () {
        var raw = this.$type.encode(this);
        var validate = this.$validate(raw);
        // Check validation result
        if (validate === undefined) {
          delete this.$validationError;
          return true;
        }
        // Set validation error
        this.$validationError = validate;
        // dispatch event
        this.$dispatch('model-invalid', [validate]);
        return false;
      });
    });
  }
]);