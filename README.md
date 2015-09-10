# Angular Restmod - Validation 
A simple validation system which will validate your [Angular Restmod](https://github.com/platanus/angular-restmod) models. 

![](https://img.shields.io/bower/v/angular-restmod-validation.svg) 
![](https://img.shields.io/npm/v/angular-restmod-validation.svg)
[![Support me with some coffee](https://img.shields.io/badge/donate-paypal-orange.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=QUDAJBCJVP2G6)
[![Support me with some coffee](https://img.shields.io/badge/donate-pledgie-orange.svg)](https://pledgie.com/campaigns/28130)

Validating your models will be as easy as:
```javascript
restmod.model('/users').mix({
    $validate: function(_model){
        if(!_model.username)
            return "The field username may not be empty.";
    }
});
```

## Getting started

#### Download the code
You can get it straight from the repository
```
git clone git@github.com:dirkgroenen/angular-restmod-validation.git
```
but I would recommend you to use Bower
```
bower install angular-restmod-validation --save
```
or if you prefer, npm.
```
npm install angular-restmod-validation -d
```

#### Include it in your project
Add the angular-restmod-validation file from the `dist` directory to your project. 
```html
<script type="text/javascript" src="js/angular-restmod-validation/angular-restmod-validation.min.js"></script>
```

Next register the plugin:
```javascript
.config(function Config(restmodProvider){
    restmodProvider.rebase('Validation');
})
```

## Basic usage
Using the validation plugin is as easy as overriding the `$validate` method in your model. This method is left undefined by default and you can override it with the validation logic you want. 

Lets say you have a `users` model which needs at least a username to be valid. In this case you can override the `$validate` method with the following logic:

```javascript
restmod.model('/users').mix({
    $validate: function(_model){
        if(!_model.username)
            return "The field username may not be empty.";
    }
});
```

The plugin will check the model before it's saved. In case your model isn't valid it will save the validation error as `$validationError` and fire a `model-invalid` event. 

You can register on this event and show, for example, a notification:
```javascript
restmod.model('/users').mix({
    $hooks: {
        'model-invalid': function(error) {
            new Notify({ message: error, classes: "error" });
        }
    },
    [..]
```

### $isValid()
You can also call the `$isValid` method manually. This will return true or false depending on the model's validity.

The validation error will be saved in the model as `$validationError`.

#### Todo
- This is just a simple validation plugin, but I will investigate other plugins and frameworks to see how we can extend this to be more powerful. 
- Make sure requests don't fire if the model is invalid. [angular-restmod#326](https://github.com/platanus/angular-restmod/issues/326)