angular.module('routes', ['ui.router'])

    .config(function($urlRouterProvider, $stateProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about', {
                url: '/about',
                templateUrl: 'features/about/about.html'
            })
            .state('contact', {
                url:'/contact',
                templateUrl: 'features/contact/contact.html'
            })
            .state('competitionInformation', {
                url:'/competition-information',
                templateUrl: 'features/competition/competition.html'
            })
            .state('home', {
            	url:'/',
            	templateUrl:'features/main-page/home.html'
            })
            .state('how-vip-credits-count', {
                url:'/how-vip-credits-count',
                templateUrl: 'features/how-vip-credits-count/index.html'
            })
            .state('evaluation', {
                url:'/peer-evaluations',
                templateUrl: 'features/evaluation-page/evaluation.html'
            })
            .state('graduateApplication', {
                url:'/graduate-application',
                templateUrl: 'features/graduate-application/graduateApplication.html'
            })
            .state('undergraduateApplication', {
                url:'/undergraduate-application',
                templateUrl: 'features/undergraduate-application/undergraduateApplication.html'
            })
	        .state('presentationsAndPublications', {
	            url:'/presentations-and-publications',
	            templateUrl: 'features/presentations-and-publications/presentationsAndPublications.html'
	        })
            .state('registerPermit', {
                url:'/request-registration-permit',
                templateUrl: 'features/registration-permit/registrationPermit.html'
            })
            .state('login', {
                url:'/login',
                templateUrl: 'features/login/loginTemplate.html'
            })
            .state('projectProposal', {
                url:'/project-proposal',
                templateUrl: 'features/project-proposals/projectProposal.html',
                controller: 'ProjectProposalController',
                controllerAs: 'project',
                params: { id: null }
            })
			.state('resetpassword', {
                url:'/resetpassword',
                templateUrl: 'features/forgot-password/forgotPasswordTemplate.html',
                controller: 'forgotPasswordController',
                controllerAs: 'resetPwd',
            })
            .state('password_request', {
                url:'/password_request?auth_id',
                templateUrl: 'features/forgot-password/forgotPasswordTemplate.publish.html',
                controller: 'forgotPasswordPublishController',
                controllerAs: 'resetPwd',
            })
            .state('organization', {
                url:'/organization',
                templateUrl: 'features/organization/organization.html'
            })
            .state('profile', {
                url:'/profile',
                templateUrl: 'features/profile-page/user-profile.html',
                controller: 'profileController',
                controllerAs: 'vm'
            })
            .state('projects',{
                url:'/vip-projects',
                templateUrl:'features/vip-projects/vip-projects.html',
                controller: 'VIPProjectsCtrl',
                controllerAs: 'vm'
            })
           .state('projectsDetailed',{
                url:'/vip-projects-detailed',
                templateUrl:'features/vip-projects/vip-projects-detailed.html',
                controller: 'VIPProjectsDetailedCtrl',
                controllerAs: 'vm',
                params: { id: null }
            })
            .state('studentconfirminfo', {
                url:'/studentConfirmation/:id',
                templateUrl: 'features/apply-to-project/StudentConfirmInfo.html',
                controller: 'projAppCtrl',
                controllerAs: 'projApp'
            })
            .state('registration', {
                url: '/registration',
                templateUrl: 'features/registration/registrationTemplate.html',
                controller: 'registrationController',
                controllerAs: 'regCtlr'
            })
            .state('toDo', {
                url: '/to-do',
                templateUrl: 'features/to-do/toDo.html',
                controller: 'toDoController',
                controllerAs: 'todo',
            })
            .state('verification', {
                url: '/emailVerified',
                templateUrl: 'features/emailVerification/email-verification.html',
            })

            .state('verifyuser', {
                url: '/verifyuser/:user_id',
                templateUrl: 'features/reviewRegistration/reviewRegistration.html',
                controller: 'reviewController',
                controllerAs: 'vm'
            })

			.state('GoogleAPI', {
                url: '/drive',
                templateUrl: 'features/drive/GoogleAPI.html',
				controller: 'fld'
            })


        });
