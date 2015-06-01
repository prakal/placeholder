angular.module('reverse.dashboard', [])
.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/embed/**'
  ]);
})
.controller('DashController', function ($scope, $http, $window, $timeout, $q) {

$scope.user = {
      name: $window.sessionStorage.getItem('user')
    };

	// Fetch events that were created by you.
	$scope.fetchClasses = function () {
	  return $http({
	    method: 'GET',
	    url: '/dashboard/classes-fetch'
	  })
	  .then(function(resp) {
	    if (resp.data.length >= 1) {
	      $scope.classes = resp.data;
	      console.log($scope.classes);
	    } else {
	      console.log("THERE ARE NO CLASSES TO FETCH!!!");
	    }
	  });
	};

	$scope.fetchClasses();
  $scope.videoReady = false;

	$scope.openClass = function(classe){
		console.log('class',classe);
		$scope.currentClass = classe;
		var url = 'dashboard/'+classe.id;
		return $http({
			method: 'GET',
			url: url
		}).then(function(resp){
			var semi = resp.data[0].videoURL;
			var finalSlashIndex = 0;
			for (var i = semi.length - 1; i >= 0; i--){
				if (semi[i] === "="){
					finalSlashIndex = i;
					break;
				}
			}

			$scope.classInfo = "https://www.youtube.com/embed/"+semi.slice(i+1);
			$scope.videoReady = true;
			console.log($scope.classInfo, i);
		});
	};
	// $scope.studentLink = "";
	$scope.saveStudentURL = function(){
		console.log('link',$scope.studentLink, $scope.currentClass);
		// need to save student vid. Need to have access to student_id and class_id
		// we need to send POST ajax request.
		var savePackage = {
			videoURL: $scope.studentLink,
			class_id: $scope.currentClass.id,
			username: $scope.user.name
		};
		console.log('savePackage',savePackage);
		return $http({
			method: 'POST',
			url: '/saveStudentURL',
			data: savePackage
		})
		.then(function(resp){

		});
		
	};

  
});

