angular.module('ui.dropdown', []);

angular.module('ui.dropdown').directive('dropdown', ['$document',
    function($document) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: '/src/dropdown.tmpl.html',
            scope: {
                dropdownTitle: '=',
                dropdownClass: '@'
            },
            link: function(scope, element, attrs) {

                // setup dropdownEl
                var dropdownEl = angular.element(element.children()[0]);
                dropdownEl.find('button').addClass(scope.dropdownClass);

        
                scope.toggleSelect = function() {
                    if(dropdownEl.hasClass('open')) {
                        dropdownEl.removeClass('open');
                        $document.unbind('click', clickHandler);
                    }
                    else {
                        dropdownEl.addClass('open');
                        $document.bind('click', clickHandler);
                    }
                }

                function clickHandler(event) {
                    if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
                        return;
                    dropdownEl.removeClass('open');
                    $document.unbind('click', clickHandler);
                    scope.$apply();
                }

                var elementMatchesAnyInArray = function (element, elementArray) {
                    for (var i = 0; i < elementArray.length; i++)
                        if (element == elementArray[i])
                            return true;
                    return false;
                }
        
            }
        }
    }
]);