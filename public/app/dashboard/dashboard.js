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
  $scope.events = [];
  // $scope.event = EventsFactory.currentEvent;
  // $scope.shouldNotBeClickable = EventsFactory.shouldNotBeClickable;
  $scope.showEvent = false;
  $scope.showNewEvent = true;

  /* userList currently populates with all users of Headcount. invitedUsers
   * gets pushed with any users you invite.
   */

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
		console.log('link',$scope.studentLink);
	};

  
});

