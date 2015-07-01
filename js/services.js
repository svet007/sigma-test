angular.module('worldClockApp')

.factory('worldClockService', function() {
    var locations = {
        'to': {name: 'Toronto', diff: 0},
        'lo': {name: 'London', diff: 5},
        'sy': {name: 'Sydney', diff: 15}
    };
    
    var refTime = moment();
    
    var factory = {};
    
    factory.getLocationName = function(code) {
        return locations[code].name;
    };
    
    factory.getTime = function(code) {
        return moment().add(locations[code].diff, "hours");
    };
    
    factory.setDiff = function(code, diff) {
        locations[code].diff = diff;
    };
    
    factory.getRefTime = function() {
        return refTime;
    }
    
    factory.setRefTime = function(time) {
        refTime = moment(time);
    }
    
    return factory;
})