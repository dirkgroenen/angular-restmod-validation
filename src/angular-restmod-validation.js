'use strict';

angular.module('restmod')

.factory('Validation', function(restmod) {

    return restmod.mixin(function() {

        // Validate the model before each save and
        // cancel the request if it ain't valid.
        this.on("before-save", function(request){
            if( !this.$isValid() ){
                // Cancel request
                this.$$action.canceled = true;
            }
        })

        /**
         * @method $validate
         * @memberof Validation#
         *
         * @description Defined the validation rules
         *
         * The user should override this method in his model
         * to define the validation rules. As long as this
         * returns nothing the model will be valid.
         *
         * @return {mixed|void} validation rules or nothing
         */
        .define('$validate', function(_model) {})

        /**
         * @method $isValid
         * @memberof Validation#
         *
         * @description Runs the validation
         *
         * @return {boolean} Wether the model is valid or not
         */
        .define('$isValid', function() {
            var raw = this.$type.encode(this);
            var validate = this.$validate(raw);

            // Check validation result
            if(validate === undefined){
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

});