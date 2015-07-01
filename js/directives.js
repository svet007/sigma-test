angular.module('worldClockApp')

.directive('setTime', function(worldClockService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/set-time.html',
        controller: function($scope, $rootScope) {
            $scope.setTime = function(time) {
                worldClockService.setRefTime(time);
                $rootScope.$emit('refDateChanged');
            }
        }
    }
})
.directive('viewTime', function($interval, worldClockService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/view-time.html',
        scope: {
            lc: '='
        },
        controller: function($scope, $rootScope, $interval) {
            function updateTime() {
                $scope.time = worldClockService.getTime($scope.lc).format("HH:mm:ss");
            }
            $scope.location = worldClockService.getLocationName($scope.lc);
            updateTime();
            timeoutId = $interval(function() {
                updateTime();
            }, 5000);
            $rootScope.$on('refDateChanged', function() {
                updateTime()
            });
        }

    }
})
.directive('setDiff', function(worldClockService) {
    return {
        restrict: 'E',
        templateUrl: 'partials/set-diff.html',
        scope: {
            lc: '='
        },
        controller: function($scope, $rootScope) {
            $scope.location = worldClockService.getLocationName($scope.lc);
            $scope.setDiff = function(diff) {
                worldClockService.setDiff($scope.lc, diff);
                $rootScope.$emit('refDateChanged');
            }
        }
    }
});