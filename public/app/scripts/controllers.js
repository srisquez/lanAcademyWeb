'use strict';

angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory', 'favoriteFactory', function ($scope, menuFactory, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showFavorites = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    menuFactory.query(
        function (response) {
            $scope.dishes = response;
            $scope.showMenu = true;

        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleFavorites = function () {
        $scope.showFavorites = !$scope.showFavorites;
    };
    
    $scope.addToFavorites = function(dishid) {
        console.log('Add to favorites', dishid);
        favoriteFactory.save({_id: dishid});
        $scope.showFavorites = !$scope.showFavorites;
    };
}])

.controller('ReviewLessonStuEditController', ['$scope', 'requestLessonFactory','reviewLessonFactory_Stu','$rootScope','$filter', 'ngDialog','getTeachersProfile', function ($scope, requestLessonFactory,reviewLessonFactory_Stu,$rootScope,$filter,ngDialog,getTeachersProfile) {

$scope.itemLesson = {};


$scope.teachers = getTeachersProfile.query();

    $scope.itemLesson = $rootScope.lesson;

    $scope.itemLesson.date  = new Date($rootScope.dateLesson) ;


     $scope.TeacherName = "Takeshi";


    var lessonTypes = [{
        value: "CPP",
        label: "Conversation Practice"
    }, {
        value: "TPP",
        label: "Test Preparation"
    }, {
        value: "SP",
        label: "Specialized Program"
    }];

    var lessonStartTime = [{
        value: "8:40am",
        label: "8:40am"
    }, 
     {
        value: "9:50am",
        label: "9:50am"
    },
    {
        value: "11:00am",
        label: "11:00am"
    }, 
    {
        value: "12:10pm",
        label: "12:10pm"
    },
    {
        value: "1:40pm",
        label: "1:40pm"
    },
    {
        value: "2:50pm",
        label: "2:50pm"
    },
    {
        value: "4:00pm",
        label: "4:00pm"
    },
    {
        value: "5:10pm",
        label: "5:10pm"
    },
    {
        value: "6:20pm",
        label: "6:20pm"
    },
    {
        value: "7:30pm",
        label: "7:30pm"
    }];

        $scope.lessonStartTime = lessonStartTime;
    $scope.invalidlessonStartSelection = false;

    $scope.lessonTypes = lessonTypes;
    $scope.invalidLessonSelection = false;

    $scope.invalidTeacherSelection = false;

    $scope.editLesson = function() {


        if ($scope.itemLesson.lessonType== "") {
            $scope.invalidLessonSelection  = true;
        }
        else
            {$scope.invalidLessonSelection  = false;}

        if ($scope.itemLesson.startHour== "") {
              $scope.invalidlessonStartSelection  = true;
        }
        else
            {$scope.invalidlessonStartSelection  = false;}


        if ($scope.itemLesson.teacher == "") {
              $scope.invalidTeacherSelection  = true;
        }else
            {$scope.invalidTeacherSelection = false;}


         if ($scope.itemLesson.lessonType!= "" && $scope.itemLesson.startHour!= "" )
         {

             $scope.invalidlessonStartSelection = false;
              $scope.invalidLessonSelection = false;


           requestLessonFactory.update($scope.itemLesson,
               function(response) 
           {

             

            var messageDialog = 'The lesson has been edited successfully.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Edit Lesson Successful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

              }

            );   
       
      }
    };

     


}])

.controller('editFeedbackController', ['$scope', 'requestLessonFactory','reviewLessonFactory_Stu','$rootScope','$filter', 'ngDialog','getTeachersProfile', function ($scope, requestLessonFactory,reviewLessonFactory_Stu,$rootScope,$filter,ngDialog,getTeachersProfile) {






}]) 

.controller('ReviewLessonStuController', ['$scope', 'reviewLessonFactory','reviewLessonFactory_Stu','$rootScope', function ($scope, reviewLessonFactory,reviewLessonFactory_Stu,$rootScope) {

$scope.lessons = reviewLessonFactory.query();



 $scope.TeacherName = "Takeshi";

 $scope.selectedRow = null;
 $scope.enablebuttons = false;

 $scope.showDeleteEdit = false;

 $scope.itemLesson = {};

$rootScope.lesson =  {};

//| date: 'yyyy-MM-dd'}

$scope.removeLesson = function() {

    if ($scope.selectedRow !=null) 
        console.log($scope.lessons[$scope.selectedRow]);

        reviewLessonFactory_Stu.delete({id: $scope.lessons[$scope.selectedRow]._id});

        $scope.lessons = reviewLessonFactory.query();

    };

    $scope.selectRow = function(rowIndex){
  $scope.selectedRow = rowIndex;
   $scope.enablebuttons = true;
    
    $scope.showDeleteEdit = true;

     $scope.itemLesson = $scope.lessons[$scope.selectedRow];

    
   
     $rootScope.lesson  = $scope.itemLesson;

     $rootScope.dateLesson = $scope.lessons[$scope.selectedRow].date;

};



    $scope.getLessonDes = function(lessonCode) {

        var des = "";
        
        if (lessonCode === "CPP") {
            des = "Conversation Practice";
        } else  if (lessonCode === "TPP") {
            des = "Test Preparation";
        } else  if (lessonCode === "SP") {
            des = "Specialized Program";
        } else 
        {
             des ="";

        }

       return des;
    };

}])


.controller('ReviewLessonTeController', ['$scope', 'reviewLessonTeFactory','$rootScope', function ($scope, reviewLessonTeFactory,$rootScope) {

$scope.lessons = reviewLessonTeFactory.query();



$scope.setSelected = function(item) {
      
        console.log(item);
    };



    $scope.getLessonDes = function(lessonCode) {

        var des = "";
        
        if (lessonCode === "CPP") {
            des = "Conversation Practice";
        } else  if (lessonCode === "TPP") {
            des = "Test Preparation";
        } else  if (lessonCode === "SP") {
            des = "Specialized Program";
        } else 
        {
             des ="";

        }

       return des;
    };

}])



.controller('RequestController', ['$scope', 'requestLessonFactory','$rootScope','getTeachersProfile','ngDialog', function ($scope, requestLessonFactory,$rootScope,getTeachersProfile,ngDialog) {

 $scope.request = {
        lessonType: "",
        startHour: "",
        date: "",
        teacher: "", //Takeshi (Teacher)
        RequestedBy: ""

    };

$scope.teachers = getTeachersProfile.query();

  

    $scope.TeacherName = "Takeshi";

    $scope.request.RequestedBy = ($rootScope.userId != null? $rootScope.userId : "");

    var lessonTypes = [{
        value: "CPP",
        label: "Conversation Practice"
    }, {
        value: "TPP",
        label: "Test Preparation"
    }, {
        value: "SP",
        label: "Specialized Program"
    }];

    var lessonStartTime = [{
        value: "8:40am",
        label: "8:40am"
    }, 
     {
        value: "9:50am",
        label: "9:50am"
    },
    {
        value: "11:00am",
        label: "11:00am"
    }, 
    {
        value: "12:10pm",
        label: "12:10pm"
    },
    {
        value: "1:40pm",
        label: "1:40pm"
    },
    {
        value: "2:50pm",
        label: "2:50pm"
    },
    {
        value: "4:00pm",
        label: "4:00pm"
    },
    {
        value: "5:10pm",
        label: "5:10pm"
    },
    {
        value: "6:20pm",
        label: "6:20pm"
    },
    {
        value: "7:30pm",
        label: "7:30pm"
    }];

    $scope.lessonStartTime = lessonStartTime;
    $scope.invalidlessonStartSelection = false;

    $scope.lessonTypes = lessonTypes;
    $scope.invalidLessonSelection = false;

    $scope.invalidTeacherSelection = false;

     $scope.duplicate = false;

$scope.sendRequest = function () {

     $scope.duplicate = false;

        if ($scope.request.lessonType== "") {
            $scope.invalidLessonSelection  = true;
        }
        else
            {$scope.invalidLessonSelection  = false;}

        if ($scope.request.startHour == "") {
              $scope.invalidlessonStartSelection  = true;
        }
         if ($scope.request.teacher == "") {
              $scope.invalidTeacherSelection  = true;
        }
        else
            {$scope.invalidlessonStartSelection  = false;}


         if ($scope.request.lessonType!= "" && $scope.request.startHour!= "" && $scope.request.teacher!= "" )
         {

             $scope.invalidlessonStartSelection = false;
              $scope.invalidLessonSelection = false;
               $scope.invalidTeacherSelection = false;


        requestLessonFactory.save($scope.request,
           function(response) 
           {

              if (response.message==="duplicate key")
              {
                 //$scope.duplicate = true;

                  var messageDialog = 'You already have requested this lesson.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Lesson Requested Unsuccessful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

              }
              else
              {

                  var messageDialog = 'The lesson has been requested successfully.'

              var message = '\
                <div class="ngdialog-message">\
                <div><h3>Lesson Requested Successful</h3></div>' +
                  '<div><p>' +  messageDialog + 
                  '</p><p>' + '' + '</p></div>';

                ngDialog.openConfirm({ template: message, plain: 'true'});

              }
           
           });

     $scope.request = {
        lessonType: "",
        startHour: "",
        date: "",
        teacher: "", //Takechi (Teacher)
        RequestedBy: ""
        };

        $scope.request.RequestedBy = ($rootScope.userId != null? $rootScope.userId : "");

               $scope.requestForm.$setPristine();

        }

};



}])

.controller('ContactController', ['$scope', 'contactFactory', function ($scope, contactFactory) {

    $scope.feedback = {
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        contactTel: ""
    };

$scope.tel = {
        areaCode: "",
        number: ""
    }


    $scope.sendFeedback = function () {
       
            $scope.feedback.contactTel = $scope.tel.areaCode + $scope.tel.number;

            contactFactory.save($scope.feedback);
            $scope.feedback = {
                firstname: "",
                lastname: "",
                email: "",
                subject: "",
                contactTel: ""
            };

            $scope.tel = {
            areaCode: "",
             number: ""
            }

            $scope.feedbackForm.$setPristine();
        
    };
}])

.controller('DishDetailController', ['$scope', '$state', '$stateParams', 'menuFactory', 'commentFactory', function ($scope, $state, $stateParams, menuFactory, commentFactory) {

    $scope.dish = {};
    $scope.showDish = false;
    $scope.message = "Loading ...";

    $scope.dish = menuFactory.get({
            id: $stateParams.id
        })
        .$promise.then(
            function (response) {
                $scope.dish = response;
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );

    $scope.mycomment = {
        rating: 5,
        comment: ""
    };

    $scope.submitComment = function () {

        commentFactory.save({id: $stateParams.id}, $scope.mycomment);

        $state.go($state.current, {}, {reload: true});
        
        $scope.commentForm.$setPristine();

        $scope.mycomment = {
            rating: 5,
            comment: ""
        };
    }
}])

// implement the IndexController and About Controller here

.controller('HomeController', ['$scope', 'menuFactory', 'corporateFactory', 'promotionFactory', function ($scope, menuFactory, corporateFactory, promotionFactory) {
    $scope.showDish = false;
    $scope.showLeader = false;
    $scope.showPromotion = false;
    $scope.message = "Loading ...";
   /* var leaders = corporateFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var leaders = response;
                $scope.leader = leaders[0];
                $scope.showLeader = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    $scope.dish = menuFactory.query({
            featured: "true"
        })
        .$promise.then(
            function (response) {
                var dishes = response;
                $scope.dish = dishes[0];
                $scope.showDish = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );
    var promotions = promotionFactory.query({
        featured: "true"
    })
    .$promise.then(
            function (response) {
                var promotions = response;
                $scope.promotion = promotions[0];
                $scope.showPromotion = true;
            },
            function (response) {
                $scope.message = "Error: " + response.status + " " + response.statusText;
            }
        );*/
}])

.controller('AboutController', ['$scope', 'corporateFactory', function ($scope, corporateFactory) {

    //$scope.leaders = corporateFactory.query();

}])

.controller('allUsersController', ['$scope', 'allUsersFactory', function ($scope, allUsersFactory) {

    $scope.users =  allUsersFactory.query();

}])


.controller('ProfileController', ['$scope', 'profileFactory','ngDialog', function ($scope, profileFactory,ngDialog) {

    $scope.userProfile = profileFactory.query();

 

        $scope.openResetPassword = function () {
        ngDialog.open({ template: 'views/resetPassword.html', scope: $scope, className: 'ngdialog-theme-default custom-width-500', controller:"ResetController" });
    };


}])


.controller('ResourceController', ['$scope', 'resourceFactory', function ($scope, resourceFactory) {

 $scope.filtText = "Speaking";
  $scope.tab = 1;
    $scope.resources = resourceFactory.query();


      $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 1) {
            $scope.filtText = "Speaking";
        }else if (setTab === 2) {
            $scope.filtText = "Grammar";
        } else if (setTab === 3) {
            $scope.filtText = "Reading";
        } else if (setTab === 4) {
            $scope.filtText = "Vocabulary";
        } else if (setTab === 5) {
            $scope.filtText = "Listening";
        } else if (setTab === 6) {
            $scope.filtText = "Writing";
        }else {
            $scope.filtText = "";
        }
    };

      $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

}])

.controller('FavoriteController', ['$scope', '$state', 'favoriteFactory', function ($scope, $state, favoriteFactory) {

    $scope.tab = 1;
    $scope.filtText = '';
    $scope.showDetails = false;
    $scope.showDelete = false;
    $scope.showMenu = false;
    $scope.message = "Loading ...";

    favoriteFactory.query(
        function (response) {
            $scope.dishes = response.dishes;
            $scope.showMenu = true;
        },
        function (response) {
            $scope.message = "Error: " + response.status + " " + response.statusText;
        });

    $scope.select = function (setTab) {
        $scope.tab = setTab;

        if (setTab === 2) {
            $scope.filtText = "appetizer";
        } else if (setTab === 3) {
            $scope.filtText = "mains";
        } else if (setTab === 4) {
            $scope.filtText = "dessert";
        } else {
            $scope.filtText = "";
        }
    };

    $scope.isSelected = function (checkTab) {
        return ($scope.tab === checkTab);
    };

    $scope.toggleDetails = function () {
        $scope.showDetails = !$scope.showDetails;
    };

    $scope.toggleDelete = function () {
        $scope.showDelete = !$scope.showDelete;
    };
    
    $scope.deleteFavorite = function(dishid) {
        console.log('Delete favorites', dishid);
        favoriteFactory.delete({id: dishid});
        $scope.showDelete = !$scope.showDelete;
        $state.go($state.current, {}, {reload: true});
    };
}])

.controller('HeaderController', ['$scope', '$state', '$rootScope', 'ngDialog', 'AuthFactory', function ($scope, $state, $rootScope, ngDialog, AuthFactory) {

    $scope.loggedIn = false;
    $scope.username = '';
    $scope.profile =  '';
    $rootScope.userId = '';
    
    if(AuthFactory.isAuthenticated()) {
        $scope.loggedIn = true;
        $scope.username = AuthFactory.getUsername();
         $scope.profile = AuthFactory.getProfile();
          $rootScope.userId = AuthFactory.getuserId();
    }
        
    $scope.openLogin = function () {
        ngDialog.open({ template: 'views/login.html', scope: $scope, className: 'ngdialog-theme-default', controller:"LoginController" });
    };
    
    $scope.logOut = function() {
       AuthFactory.logout();
        $scope.loggedIn = false;
        $scope.username = '';
        $scope.profile = '';
        $rootScope.userId = '';
    };
    
    $rootScope.$on('login:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
        $scope.profile = AuthFactory.getProfile();
         $rootScope.userId = AuthFactory.getuserId();
    });
        
    $rootScope.$on('registration:Successful', function () {
        $scope.loggedIn = AuthFactory.isAuthenticated();
        $scope.username = AuthFactory.getUsername();
    });
    
    $scope.stateis = function(curstate) {
       return $state.is(curstate);  
    };
    
}])

.controller('LoginController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.loginData = $localStorage.getObject('userinfo','{}');
    
    $scope.doLogin = function() {
        if($scope.rememberMe)
           $localStorage.storeObject('userinfo',$scope.loginData);

        AuthFactory.login($scope.loginData);

        ngDialog.close();

    };
            
    $scope.openRegister = function () {
        ngDialog.open({ template: 'views/register.html', scope: $scope, className: 'ngdialog-theme-default', controller:"RegisterController" });
    };

       $scope.openResetPassword = function () {
        ngDialog.open({ template: 'views/resetPassword.html', scope: $scope, className: 'ngdialog-theme-default', controller:"ResetController" });
    };

    
}])

.controller('ResetController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={

        newpassword: ""
    };


    $scope.loginData={
        username : "",
        password : ""
    };

    $scope.password = '';
    $scope.Newpassword = '';


    $scope.invalid = false;
    $scope.invalidOldPassword = false;
    
    $scope.doReset = function() {

        if ($scope.password === $scope.Newpassword)
        {

          $scope.invalid = false;
          $scope.invalidOldPassword = false;

          $scope.register.newpassword = $scope.password;

          $scope.loginData.username = $scope.userProfile.username;
          $scope.loginData.password = $scope.oldPassword

          //AuthFactory.validateUserPwd($scope.loginData);

           //console.log(AuthFactory.isLoginOK());

    

           //AuthFactory.reset($scope.register);

           AuthFactory.validateUserPwdandReset($scope.loginData);
        
           ngDialog.close();
         
        }
        else
        {
            $scope.invalid = true;

        }

    };
}])

.controller('RegisterUserController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={
     username: "",
     password: "",
     firstname: "",
     lastname: "",
     studentId: "",
     contactTel: "",
     profile: ""
    };


 $scope.tel = {
            areaCode: "",
             number: ""
            };
 

        var profileTypes = [{
        value: "Teacher",
        label: "Teacher"
    }, {
        value: "Student",
        label: "Student"
    }, {
        value: "Admin",
        label: "Administrator"
    }];

    $scope.profileTypes = profileTypes;
    $scope.invalidProfileSelection = false;



    
    $scope.doRegister = function() {

        if ($scope.register.profile== "") {
            $scope.invalidProfileSelection   = true;
        }
        else{

        $scope.register.contactTel = $scope.tel.areaCode + $scope.tel.number;
         $scope.invalidProfileSelection = false;

            AuthFactory.register($scope.register);

           $scope.register={
            username: "",
            password: "",
            firstname: "",
            lastname: "",
            studentId: "",
            contactTel: "",
            profile: ""
            };

            $scope.tel = {
            areaCode: "",
             number: ""
            };

            $scope.registerForm.$setPristine();
          }


    };
}])

.controller('reviewFeedbacksController', ['$scope', '$localStorage', 'feedbackFactory','$filter','$rootScope', function ($scope, $localStorage, feedbackFactory,$filter,$rootScope) {
 
$scope.feedbacks = feedbackFactory.query({id:$rootScope.userId});


}])


.controller('FeedbackController', ['$scope', '$localStorage', 'feedbackFactory','$filter','$rootScope','feedbackUserStudents', 'feedbackTeacherFactory','feedbackRemoveFactory', function ($scope, $localStorage, feedbackFactory,$filter,$rootScope,feedbackUserStudents,feedbackTeacherFactory,feedbackRemoveFactory) {
 

  $scope.feedback = {
        feedbackDes: "",
        postedBy: "",
        postedDate: ""
    };

    $scope.feedback.postedBy = ($rootScope.userId != null? $rootScope.userId : "");
    $scope.feedback.postedDate = $filter('date')(new Date(), 'yyyy-MM-dd');

    $scope.invalidSudentSelection = false;

     $scope.studentsList = feedbackUserStudents.query();


     $scope.showDeleteEdit = false;



    
 $scope.selectedRow = null;
 $scope.enablebuttons = false;





 

 $scope.getFeedbacks = function () {

    $scope.listFeedbacks = new Array();

    $scope.feedbacksItem = {
  id: "",
  postedDate : "",
  feedbackDes : "",
  student : "",
   studentId : ""
};


$scope.feedbacks = feedbackTeacherFactory.query({id:$rootScope.userId},

function (response) {
            

            for (var i = ($scope.feedbacks.length - 1); i >= 0; i--) {

for (var j = ($scope.feedbacks[i].feedback.length - 1); j >= 0; j--) {


           $scope.feedbacksItem.student =  $scope.feedbacks[i].firstname + ' ' + $scope.feedbacks[i].lastname;
           $scope.feedbacksItem.studentId = $scope.feedbacks[i]._id;

           $scope.feedbacksItem.id  = $scope.feedbacks[i].feedback[j]._id;
           $scope.feedbacksItem.postedDate  = $scope.feedbacks[i].feedback[j].postedDate;
           $scope.feedbacksItem.feedbackDes = $scope.feedbacks[i].feedback[j].feedbackDes;
           $scope.listFeedbacks.push($scope.feedbacksItem);

           //console.log ($scope.feedbacksItem);

           $scope.feedbacksItem = {
  id: "",
  postedDate : "",
  feedbackDes : "",
  student : "",
   studentId : ""
};
           }

    }

     //console.log ($scope.listFeedbacks);

        }
    );
};

$scope.getFeedbacks();








    $scope.sendfeedback = function () {

 $scope.feedback.postedBy = ($rootScope.userId != null? $rootScope.userId : "");
    $scope.feedback.postedDate = $filter('date')(new Date(), 'yyyy-MM-dd');

       
            feedbackFactory.save({id: $scope.studentID}, $scope.feedback,

function (response) {
  $scope.getFeedbacks();
}

                );

      $scope.feedback = {
        feedbackDes: "",
        postedBy: "",
        postedDate: ""
    };
    $scope.invalidSudentSelection = false;


            $scope.feedbackForm.$setPristine();
        
    };

    $scope.removeLesson = function() {

  if ($scope.selectedRow !=null) 
        feedbackRemoveFactory.delete({id: $scope.listFeedbacks[$scope.selectedRow].studentId, feedbackId: $scope.listFeedbacks[$scope.selectedRow].id},
function (response) {
  $scope.getFeedbacks();
}
            );

    };

       $scope.selectRow = function(rowIndex){
  $scope.selectedRow = rowIndex;
   $scope.enablebuttons = true;
    
    $scope.showDeleteEdit = true;

     //$scope.itemLesson = $scope.lessons[$scope.selectedRow];
   
     //$rootScope.lesson  = $scope.itemLesson;

     //$rootScope.dateLesson = $scope.lessons[$scope.selectedRow].date;

};



 
}])




.controller('RegisterController', ['$scope', 'ngDialog', '$localStorage', 'AuthFactory', function ($scope, ngDialog, $localStorage, AuthFactory) {
    
    $scope.register={};
    $scope.loginData={};
    
    $scope.doRegister = function() {
        console.log('Doing registration', $scope.registration);

        AuthFactory.register($scope.registration);
        
        ngDialog.close();

    };
}])
;