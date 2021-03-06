angular.module('starter.controllers', ['starter.services'])

.controller('DashCtrl', function($scope) {
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, $ionicLoading, Geo) {
	console.log("AccountCtrl");
	$scope.initialise = function () {
		console.log("In Google.maps.event.addDomListener");
		var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
		var mapOptions = {
			center: myLatlng,
	                zoom: 16,
	                mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		   
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);

		Geo.getLocation().then(function(position) {
			console.log(position);
			map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			var myLocation = new google.maps.Marker({
				position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
				map: map,
				title: "My Location"
			});
		});

		     
		navigator.geolocation.getCurrentPosition(function(pos) {
			console.log(pos);
			map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
			var myLocation = new google.maps.Marker({
				position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
				map: map,
				title: "My Location"
			});
		}, function() { console.log("Cannot find location");});

		$scope.map = map;
	};
	google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise());
   	     
});

