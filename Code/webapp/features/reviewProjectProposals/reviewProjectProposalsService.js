angular.module('reviewProjectProposals')
    .factory('reviewPPS', projectService);

function projectService($http) {
    // create a new object
    var projectFactory = {};


    projectFactory.loadProjects = function () {
        return $http.get('/api/reviewproject').then(function(data){
            return data.data;
        });
    };
	
	
	 projectFactory.AcceptProjects = function (id) {
        return $http.put('/api/reviewproject/'+ id).then(function(data){
			return data.data;
        });
    };
        
	projectFactory.RejectProjects = function (id) {
        return $http.delete('/api/reviewproject/' + id).then(function(data){
            console.log("Deleting response just arrived");
        });;
    };	



    return projectFactory;
}