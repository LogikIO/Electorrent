angular.module("torrentApp").directive('dropdown', [function() {
    return {
        restrict: 'A',
        link: link,
        scope: {
            ref: '=?',
            bind: '=?'
        }
    }

    function link(scope, element, attr) {

        $(element).dropdown({
            transition: "vertical flip",
            duration: 100,
            onChange: onChange
        });

        if ('ref' in attr){
            scope.ref = {
                clear: doAction(element, 'clear'),
                refresh: doAction(element, 'refresh'),
                setSelected: doAction(element, 'set selected'),
                getValue: doAction(element, 'get value')
            };
        }

        scope.$watch(function() {
            return scope.bind;
        }, function(newValue) {
            $(element).dropdown('set selected', newValue);
        });

        function onChange(value /*, text, choice*/){
            if (scope.bind){
                scope.bind = value;
            }
        }

    }


    function doAction(element, action) {
        return function(param) {
            $(element).dropdown(action, param);
        }
    }

}]);
