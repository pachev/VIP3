angular
    .module('projectApplicationController', ['ProjectProposalService','user-profile','toDoModule', 'userService'])
    .controller('projAppCtrl',  function (ProjectService, ProfileService, ToDoService, User, $stateParams) {
        var vm = this;

        vm.mockData = [{
            firstName: "Marlon",
            lastName: "Rowe",
            email: "mrowe009@fiu.edu",
            pID: "1234567",
            rank: "Senior",
            gender: 'Male',
            type: 'Student',
            college: "'Engineering & Computing",
            school: "School of Computing and Information Sciences",
            semester: "Spring 2016"
        }];

        vm.Colleges = [
            {
                name: 'Architecture + The Arts ',
                schools: [
                    'Architecture',
                    'Interior Architecture',
                    'Landscape Architecture and Environmental Urban Design',
                    'Art and Art History',
                    'Communication Arts',
                    'School of Music',
                    'Theatre']
            },
            {
                name: 'Arts and Sciences & Education',
                schools: [
                    'Biological Sciences',
                    'Chemistry and Biochemistry',
                    'Earth and Environment',
                    'English',
                    'Mathematics and Statistics',
                    'Philosophy',
                    'Physics',
                    'Psychology',
                    'Teaching and Learning',
                    'Leadership and Professional Studies',
                    'School of Education',
                    'School of Enviroment, Arts & Society',
                    'School of Integrated Science & Humanity'

                ]
            },
            {
                name: 'Business',
                schools: [
                    'Decision Sciences and Information Systems',
                    'Alvah H. Chapman Jr. Graduate School of Business',
                    'R. Kirk Landon Undergraduate School of Business',
                    'Finance',
                    'Management and International Business',
                    'Marketing',
                    'School of Accounting',
                    'Real Estate'
                ]
            },
            {
                name: 'Chaplin School of Hospitality and Tourism Management',
                schools: [
                    'Hospitality and Tourism Management'
                ]
            },
            {
                name: 'Engineering & Computing',
                schools: [
                    'School of Computing and Information Sciences',
                    'OHL School of Construction',
                    'Department of Biomedical Engineering',
                    'Department of Civil and Environment Engineering',
                    'Department of Electrical and Computer Engineering',
                    'Department of Mechanical and Materials Engineering'
                ]
            },
            {
                name: 'Herbert Wertheim College of Medicine',
                schools: [
                    'Cellular Biology and Pharmacology',
                    'Human and Molecular Genetics',
                    'Immunology',
                    'Medical and Population Health Sciences Research'
                ]
            },
            {
                name: 'Journalism and Mass Communication',
                schools: [
                    'Advertising and Public Relations',
                    'Journalism Broadcasting and Digital Media'
                ]
            },
            {
                name: 'Law',
                schools: [
                    'College of Law'
                ]
            },
            {
                name: 'Nicole Wertheim College of Nursing & Health Sciences',
                schools: [
                    'Biostatistics',
                    'Dietetics and Nutrition',
                    'Environmental and Occupational Health',
                    'Epidemiology',
                    'Health Policy and Management',
                    'Health Promotion and Disease Prevention'
                ]

            },
            {
                name: 'Robert Stempel College of Public Health & Social Work',
                schools: [
                    'School of Social Work'
                ]
            },
            {
                name: 'Steven J. Green School of International and Public Affairs',
                schools: [
                    'Criminal Justice',
                    'Economics',
                    'Global and Sociocultural Studies',
                    'History',
                    'Modern Languages',
                    'Public Administration',
                    'Religious Studies'
                ]
            }
        ];

        vm.genders = ['Male', 'Female'];
        vm.semesters = ['Spring 2016', 'Summer 2016'];

        vm.ranks =  [
            'Freshman',
            'Sophmore',
            'Junior',
            'Senior',
            'Masters',
            'PhD',
            'postDoc'
        ];

        vm.selectedCollege = vm.Colleges[1];

        init();
        function init () {
            loadData();
        }

        function loadData(){
            ProjectService.getProjects().then(function(data){
                vm.projects = data;
                if($stateParams.id){
					//alert("found some ID");
					//alert(vm.id);
                    vm.id = $stateParams.id;
                    getProjectById(vm.projects);
                } else {
                    vm.sProject = null;
                    //alert($stateParams.id);
                    //alert(vm.id);
                }
            });
        }
        function getProjectById (projects){
            ProjectService.getProject(vm.id).then(function(data){

                projects.forEach( function (project)
                {
                    if(data._id === project._id)
                    {
                        vm.sProject = project;
                    }
                });
            });
        }
		
		var profile;
		
		ProfileService.loadProfile().then(function(data){
					if (data) {
						
						profile = data;

						vm.user_info = data.firstName;
						vm.user_type = data.userType;
						vm.firstName = data.firstName;
						vm.type = data.userType;
						vm.lastName = data.lastName;
						vm.gender = data.gender;
						vm.email = data.email;
						vm.pID = data.pantherID;
						vm.rank = data.rank;
						vm.school = data.department;
						vm.college = data.college;
						vm.semester = vm.mockData[0].semester;
						
					}
		});
				



       


        vm.save = function() {

			var project = vm.sProject;
			for (i = 0; i < project.members.length; i++) {
				if (project.members[i] === vm.email) {
					vm.message = "You have already applied for this project and it is pending approval or already accepted";
					return;
				}
			}
			project.members[project.members.length] = vm.email;
			ProjectService.editProject(project,project._id).then(
				   function(response){
					 // success callback
					 vm.message = "Your application has been submitted, please wait for PI approval";
					 var todo = {owner: profile.userType , owner_id: profile._id, todo: profile.firstName + ", thank you for applying for the project titled " + project.title + ". You will have to be approved first so please check for future notifaction and emails regarding the status of joining the project.", type: "personal", link: "#" };
					ToDoService.createTodo(todo).then(function(success)  {
						
					}, function(error) {
						
					});
					
					var email_msg = 
					{
						recipient: profile.email, 
						text: "Dear " + profile.firstName + ", thank you for applying to " + project.title + " you are currently pending and this is just a confirmation that you applied to the project please keep checking the VIP to-do or your email as the PI will approve or deny your request to join the project.\n\nProject: " + project.title + "\nStatus: Pending", 
						subject: "Project Application Submission Pending", 
						recipient2: "dlope073@fiu.edu", 
						text2: "Dear PI, " + profile.firstName + " " + profile.lastName  + " has applied to project please approve him/her by logging into your VIP account and choosing student applications.", 
						subject2: "New Student Applied Has Applied To " + project.title 
					};
					User.nodeEmail(email_msg);

                    // refresh the page after 3 seconds so the user can see the message
                    setTimeout(function () { location.reload(true); }, 3000);

			   }, 
			   function(response){
				 // failure callback
				 vm.message = response.data;
			   }
			);
        };
    });
