/**
 * Created by Administrator on 2015/10/12.
 */

var name = 'I am function A';
controller('main',['$scope','user',function($scope,user){
    $scope.name = user.name;
}]);


var name2 = 'I am function B';
 controller('main',function($scope,user){
    $scope.name = user.name;
});


