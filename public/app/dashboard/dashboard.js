angular.module('reverse.dashboard', [])

.controller('DashController', function ($scope, $http, $window, $timeout, $q) {

  // Stores all events that were created by you or that you were invited to
$scope.user = {
      title: '',
      email: '',
      firstName: '',
      lastName: '' ,
      company: '' ,
      address: '' ,
      city: '' ,
      state: '' ,
      description: '',
      postalCode : ''
    };
  $scope.events = [];
  $scope.event = EventsFactory.currentEvent;
  $scope.shouldNotBeClickable = EventsFactory.shouldNotBeClickable;
  $scope.showEvent = false;
  $scope.showNewEvent = true;

  /* userList currently populates with all users of Headcount. invitedUsers
   * gets pushed with any users you invite.
   */

  $scope.userList = [];
  $scope.invitedUsers = [];

  $scope.hasStripe = false;
  $scope.needInfo = false;
  $scope.shouldNotBeClickable = true;

  $scope.display = false;

  $scope.displayNewEvent = function() {
    $scope.showNewEvent = true;
  };

  $scope.saveEvent = function(link) {
    $scope.showEvent = true;
    EventsFactory.currentEvent = link;

  };

  // Event object that's populated via creation form and then posted for creation
  $scope.newEvent = {
    title: 'Title goes here',
    description: 'Description goes here',
    expiration: new Date(new Date().setDate(new Date().getDate() + 20)),
    thresholdPeople: 10,
    thresholdMoney: 100
  };

  // Checks to see if there's currently a clicked event, if not, it sends them back to the events list

  // $scope.checkEventClick = function() {
  //   if ($scope.event.image === undefined) {
  //     $window.location.href = "#/events";
  //   }
  // };

  // $scope.checkEventClick();

  // Fetch events that were created by you.

  $scope.fetchEvents = function () {
    return $http({
      method: 'GET',
      url: '/events-fetch'
    })
    .then(function(resp) {
      if (resp.data.length >= 1) {
        $scope.events = resp.data;
        console.log($scope.events);
      } else {
        console.log("THERE ARE NO EVENTS TO FETCH!!!");
      }
    });
  };

  /* Fetches invited events. We're using two methods, one to fetch invite IDs, which are
   * then fed to another method which actually fetches the events.
   */


  $scope.fetchInviteIDs = function () {
    return $http({
      method: 'GET',
      url: '/invite-events-fetch'
    })
    .then(function(resp) {
      $scope.fetchInviteEvents(resp.data);
    });
  };

  $scope.fetchInviteEvents = function (ids) {
    return $http({
      method: 'POST',
      url: '/invite-events-fetch',
      data: {ids: ids}
    })
    .then(function(resp) {
        for (var i = 0; i < resp.data.length; i++) {
          $scope.events.push(resp.data[i]);
        }
    });
  };

  $scope.fetchInviteIDs();
  $scope.fetchEvents();

  // Fetches users from the database that are not current user

  var self = this;
  $scope.fetchUsers = function () {
    return $http({
      method: 'GET',
      url: '/users-fetch'
    })
    .then(function(resp) {
      $scope.userList = resp.data;
      console.log("USER LIST!!!" + $scope.userList);

      self.querySearch = querySearch;
      self.allContacts = loadContacts();
      self.contacts = [self.allContacts[0]];
      self.filterSelected = true;
      /**
       * Search for contacts.
       */
      function querySearch (query) {
        var results = query ?
            self.allContacts.filter(createFilterFor(query)) : [];
        return results;
      }
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        console.log('filtering');
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
          return (contact._lowername.indexOf(lowercaseQuery) != -1);;
        };
      }

    });
  };
  $scope.fetchUsers();

  /**
   * Creates an event with $scope.newEvent data
   */
  $scope.createEvent = function() {
    var inv = [];
    var list = $('.selected .compact');
    for (var i = 0; i < list.length; i++){
      inv.push(list[i].children[0].innerText);
    }
    // console.log('inv',inv);
    $scope.invitedUsers = inv;

    $scope.newEvent.invited = $scope.invitedUsers;
    // console.log('Event details', $scope.newEvent);
    return $http({
      method: 'POST',
      url: '/events-create',
      data: $scope.newEvent
    })
    .then(function(resp) {
      $window.location.href = "/";
    });
  };


});

