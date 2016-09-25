'use strict';

angular.module('confusionApp', ['ui.router','ngResource','ngDialog'])
.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
        
            // route for the home page
            .state('app', {
                url:'/',
                views: {
                    'header': {
                        templateUrl : 'views/header.html',
                        controller  : 'HeaderController'
                    },
                    'content': {
                        templateUrl : 'views/home.html',
                        controller  : 'HomeController'
                    },
                    'footer': {
                        templateUrl : 'views/footer.html',
                    }
                }

            })
        
            // route for the aboutus page
            .state('app.aboutus', {
                url:'aboutus',
                views: {
                    'content@': {
                        templateUrl : 'views/aboutus.html',
                        controller  : 'AboutController'                  
                    }
                }
            })

             // route for the profile page
            .state('app.profile', {
                url:'profile',
                views: {
                    'content@': {
                        templateUrl : 'views/profile.html' ,
                         controller  : 'ProfileController'               
                    }
                }
            })

              // route for the programs page
            .state('app.programs', {
                url:'programs',
                views: {
                    'content@': {
                        templateUrl : 'views/programs.html'                
                    }
                }
            })
        
            // route for the resources page
            .state('app.resources', {
                url:'resources',
                views: {
                    'content@': {
                        templateUrl : 'views/resources.html' ,
                        controller  : 'ResourceController'               
                    }
                }
            })


            // route for the request lesson page
            .state('app.request', {
                url:'request',
                views: {
                    'content@': {
                        templateUrl : 'views/requestLesson.html',  
                         controller  : 'RequestController'            
                    }
                }
            })


            // route for the review  student lesson page
            .state('app.reviewStu', {
                url:'reviewStu',
                views: {
                    'content@': {
                        templateUrl : 'views/reviewLessonStudent.html'  ,  
                         controller  : 'ReviewLessonStuController'                  
                    }
                }
            })

            // route for the review  student lesson page
            .state('app.reviewStu.editLes', {
                url:'editLes',
                views: {
                    'content@': {
                        templateUrl : 'views/EditLesson.html',
                         controller  : 'ReviewLessonStuEditController'                 
                    }
                }
            })



                // route for the review  student lesson page
            .state('app.reviewTe', {
                url:'reviewTe',
                views: {
                    'content@': {
                        templateUrl : 'views/reviewLessonTeacher.html'  ,  
                         controller  : 'ReviewLessonTeController'                  
                    }
                }
            })

                  // route for the review  student lesson page
            .state('app.userManage', {
                url:'userManage',
                views: {
                    'content@': {
                        templateUrl : 'views/registerUsers.html'  ,  
                         controller  : 'RegisterUserController'                  
                    }
                }
            })

                  // route for the review  student lesson page
            .state('app.feedback', {
                url:'feedback',
                views: {
                    'content@': {
                        templateUrl : 'views/feedback.html'  ,  
                         controller  : 'FeedbackController'                  
                    }
                }
            })


                    // route for  edit feedback page
            .state('app.feedback.editFeedback', {
                url:'editFeedback',
                views: {
                    'content@': {
                        templateUrl : 'views/editFeedback.html'  ,  
                         controller  : 'editFeedbackController'                  
                    }
                }
            })


                   // route for the review  feedbacks page
            .state('app.reviewFeedback', {
                url:'reviewFeedback',
                views: {
                    'content@': {
                        templateUrl : 'views/reviewFeedbacks.html'  ,  
                         controller  : 'reviewFeedbacksController'                  
                    }
                }
            })
        
        
              // route for the all users page
            .state('app.getAllUsers', {
                url:'getAllUsers',
                views: {
                    'content@': {
                        templateUrl : 'views/allUsers.html'  ,  
                         controller  : 'allUsersController'                  
                    }
                }
            })
        

        

        
            // route for the contactus page
            .state('app.contactus', {
                url:'contactus',
                views: {
                    'content@': {
                        templateUrl : 'views/contactus.html',
                        controller  : 'ContactController'                  
                    }
                }
            })

            // route for the menu page
            .state('app.menu', {
                url: 'menu',
                views: {
                    'content@': {
                        templateUrl : 'views/menu.html',
                        controller  : 'MenuController'
                    }
                }
            })

            // route for the dishdetail page
            .state('app.dishdetails', {
                url: 'menu/:id',
                views: {
                    'content@': {
                        templateUrl : 'views/dishdetail.html',
                        controller  : 'DishDetailController'
                   }
                }
            })
        
            // route for the dishdetail page
            .state('app.favorites', {
                url: 'favorites',
                views: {
                    'content@': {
                        templateUrl : 'views/favorites.html',
                        controller  : 'FavoriteController'
                   }
                }
            });
    
        $urlRouterProvider.otherwise('/');
    })
;
