'use strict';

angular.module('confusionApp')
//.constant("baseURL", "https://localhost:3443/")
.constant("baseURL", "https://language-website-90611.onmodulus.net/")
.factory('menuFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('commentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

        return $resource(baseURL + "dishes/:id/comments/:commentId", {id:"@Id", commentId: "@CommentId"}, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('promotionFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    return $resource(baseURL + "promotions/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('corporateFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "leadership/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])


.factory('favoriteFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "favorites/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray:false}
        });

}])

.factory('allUsersFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "users/getAllUser", null, {
            'query':  {method:'GET', isArray:true}
        });

}])

.factory('resourceFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "json/resource.json/:id", null, {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray: true}
        });

}])

.factory('requestLessonFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "lesson/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('reviewLessonFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "lesson/getLessonsByUser/"  + ($rootScope.userId != null? $rootScope.userId : "") , null, {
            'query':  {method:'GET', isArray: true}
        });

}])


.factory('reviewLessonFactory_Stu', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "lesson/:id", {id:"@Id"},  {
            'update': {
                method: 'PUT'
            }
        });

}])




.factory('reviewLessonTeFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "lesson/getLessonsByTeacher/"  + ($rootScope.userId != null? $rootScope.userId : "") , null, {
            'query':  {method:'GET', isArray: true}
        });
}])


.factory('profileFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "users/getUser/" + ($rootScope.userId != null? $rootScope.userId : ""), null, {
            'query':  {method:'GET', isArray: false}
        });

}])



.factory('contactFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "contactInfo/:id", null, {
            'update': {
                method: 'PUT'
            }
        });

}])

.factory('feedbackFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "users/:id/feedback", {id:"@Id"},  {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray: true}
        });

}])


.factory('feedbackTeacherFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "users/getFeedbacksTeacher/:id/feedback", {id:"@Id"},  {
            'update': {
                method: 'PUT'
            },
            'query':  {method:'GET', isArray: true}
        });

}])

.factory('feedbackRemoveFactory', ['$resource', 'baseURL','$rootScope', function ($resource, baseURL,$rootScope) {


    return $resource(baseURL + "users/:id/feedback/:feedbackId", {id:"@Id",feedbackId:"@feedbackId"},  {
            'update': {
                method: 'PUT'
            }
        });

}])




.factory('feedbackUserStudents', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "users/getStudentsUser/", null, {
             'query':  {method:'GET', isArray: true}
        });

}])

.factory('getTeachersProfile', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "users/getTeachersUser/", null, {
             'query':  {method:'GET', isArray: true}
        });

}])

.factory('$localStorage', ['$window', function ($window) {
    return {
        store: function (key, value) {
            $window.localStorage[key] = value;
        },
        get: function (key, defaultValue) {
            return $window.localStorage[key] || defaultValue;
        },
        remove: function (key) {
            $window.localStorage.removeItem(key);
        },
        storeObject: function (key, value) {
            $window.localStorage[key] = JSON.stringify(value);
        },
        getObject: function (key, defaultValue) {
            return JSON.parse($window.localStorage[key] || defaultValue);
        }
    }
}])

.factory('AuthFactory', ['$resource', '$http', '$localStorage', '$rootScope', '$window', 'baseURL', 'ngDialog', function($resource, $http, $localStorage, $rootScope, $window, baseURL, ngDialog){
    
    var authFac = {};
    var TOKEN_KEY = 'Token';
    var isAuthenticated = false;
    var username = '';
    var authToken = undefined;
    var profile = '';
    var userId = '';
    var loginOK = false;
    

  function loadUserCredentials() {
    var credentials = $localStorage.getObject(TOKEN_KEY,'{}');
    if (credentials.username != undefined) {
      useCredentials(credentials);
    }
  }
 
  function storeUserCredentials(credentials) {
    $localStorage.storeObject(TOKEN_KEY, credentials);
    useCredentials(credentials);
  }
 
  function useCredentials(credentials) {
    isAuthenticated = true;
    username = credentials.username;
    authToken = credentials.token;
     profile = credentials.profile;
     userId = credentials.userId;
 
    // Set the token as header for your requests!
    $http.defaults.headers.common['x-access-token'] = authToken;
  }
 
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    profile = '';
    userId = '';
    isAuthenticated = false;
    $http.defaults.headers.common['x-access-token'] = authToken;
    $localStorage.remove(TOKEN_KEY);
  }

    authFac.reset = function(password) {

 $resource(baseURL + "users/setPassword/" + ($rootScope.userId != null? $rootScope.userId : "")).save(password,
           function(response) {

           var messageDialog = 'The reset password has been completed successfully.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Reset Password Successful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           },function(response){

            var messageDialog = 'The reset password has failed.Please try again.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Reset Password Successful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
    );



            

    }
     
    authFac.login = function(loginData) {
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {
              storeUserCredentials({username:loginData.username, token: response.token, profile: response.profile, userId: response.userId});

              
              $rootScope.$broadcast('login:Successful');
           },
           function(response){
              isAuthenticated = false;
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Login Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + '</p><p>' +
                    response.data.err.name + '</p></div>' +
                '<div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click=confirm("OK")>OK</button>\
                </div>'
            
                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

    };


        authFac.validateUserPwdandReset = function(loginData) {

   var register={

        newpassword: ""
    };
        
        $resource(baseURL + "users/login")
        .save(loginData,
           function(response) {

             register.newpassword = loginData.password;

            authFac.reset(register);
              loginOK = true;

           },
           function(response){
             loginOK = false;

            var messageDialog = 'The reset password has failed.Please, verify your old password.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Reset Password Unsuccessful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});
           }
        
        );

        //return loginOK;

    };
    
    authFac.logout = function() {
        $resource(baseURL + "users/logout").get(function(response){
        });
        destroyUserCredentials();
    };
    
    authFac.register = function(registerData) {
        
        $resource(baseURL + "users/register")
        .save(registerData,
           function(response) {

            //$state.go('contact.detail');

              //authFac.login({username:registerData.username, password:registerData.password});
            //if (registerData.rememberMe) {
              //  $localStorage.storeObject('userinfo',
                //    {username:registerData.username, password:registerData.password});
            //}
           
              //$rootScope.$broadcast('registration:Successful');

              var messageDialog = 'The registration has been completed successfully.'
               
                var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Successful</h3></div>' +
                  '<div><p>' +  messageDialog  + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           },
           function(response){
            
              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Registration Unsuccessful</h3></div>' +
                  '<div><p>' +  response.data.err.message + 
                  '</p><p>' + response.data.err.name + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

           }
        
        );
    };
    
    authFac.isAuthenticated = function() {
        return isAuthenticated;
    };
    
    authFac.getUsername = function() {
        return username;  
    };

      authFac.getProfile = function() {
        return profile;  
    };

  authFac.getuserId = function() {
        return userId;  
    };

     authFac.isLoginOK = function() {
        return loginOK;
    };

    
    loadUserCredentials();
    
    return authFac;
    
}])
;