// Application module
var crudApp = angular.module('crudApp',[]);
crudApp.controller("DbController",['$scope','$http', function($scope,$http){

// Function to get employee details from the database
	getInfo();
	function getInfo(){
	// Sending request to EmpDetails.php files 
		$http.post('databaseFiles/empDetails.php').success(function(data){
		// Stored the returned data into scope 
		$scope.details = data;
		});
	}

	// Setting default value of gender 
	$scope.empInfo = {'gender' : 'male'};
	// Enabling show_form variable to enable Add employee button
	$scope.show_form = true;
	// Function to add toggle behaviour to form
	$scope.formToggle =function(){
		$('#empForm').slideToggle();
		$('#editForm').css('display', 'none');
	}
	
	$scope.take_snapshot1 =function(){
		console.log("cek123");
		Webcam.snap( function(data_uri) {
      // display results in page
      document.getElementById('results').src =data_uri;
      var raw_image_data = data_uri.replace(/^data\:image\/\w+\;base64\,/, '');
        console.log(raw_image_data);
        //document.getElementById('mydata').value = raw_image_data;
      $scope.empInfo.photo= raw_image_data;
      /*
      Webcam.upload( data_uri, 'databaseFiles/imageStore.php', function(code, text) {
            // Upload complete!
            // 'code' will be the HTTP response code from the server, e.g. 200
            // 'text' will be the raw response content
            console.log("200");
        } );
      */
    } );
	}

	$scope.insertInfo = function(info){
		$http.post('databaseFiles/insertDetails.php',{"name":info.name,"country":info.country,"comment":info.comment,"photo":info.photo,"email":info.emp_email,"twitterid":info.emp_twitterid}).success(function(data){
			if (data == true) {
				getInfo();
				$('#empForm').css('display', 'none');
				console.log("success");
			}
			console.log("masuk");
		});
	}

	$scope.deleteInfo = function(info){
		$http.post('databaseFiles/deleteDetails.php',{"del_id":info.emp_id}).success(function(data){
			if (data == true) {
				getInfo();
			}
		});
	}

	$scope.currentUser = {};
	
	$scope.editInfo = function(info){
		$scope.currentUser = info;
		$('#empForm').slideUp();
		$('#editForm').slideToggle();
	}
	
	$scope.UpdateInfo = function(info){
		$http.post('databaseFiles/updateDetails.php',{"id":info.emp_id,"name":info.emp_name,"country":info.emp_country,"comment":info.emp_comment,"email":info.emp_email,"twitterid":info.emp_twitterid}).success(function(data){
			$scope.show_form = true;
			if (data == true) {
				getInfo();
			}
		});
	}

	$scope.updateMsg = function(emp_id){
		$('#editForm').css('display', 'none');
	}
}]);