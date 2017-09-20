(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function () {
	"use strict";

	var appUI = require('./ui.js').appUI;

	var account = {
        
        buttonUpdateAccountDetails: document.getElementById('accountDetailsSubmit'),
        buttonUpdateLoginDetails: document.getElementById('accountLoginSubmit'),
        
        init: function() {
            
            $(this.buttonUpdateAccountDetails).on('click', this.updateAccountDetails);
            $(this.buttonUpdateLoginDetails).on('click', this.updateLoginDetails);
                        
        },
        
        
        /*
            updates account details
        */
        updateAccountDetails: function() {
            
            //all fields filled in?
            
            var allGood = 1;
            
            if( $('#account_details input#firstname').val() === '' ) {
                $('#account_details input#firstname').closest('.form-group').addClass('has-error');
                allGood = 0;
            } else {
                $('#account_details input#firstname').closest('.form-group').removeClass('has-error');
                allGood = 1;
            }
            
            if( $('#account_details input#lastname').val() === '' ) {
                $('#account_details input#lastname').closest('.form-group').addClass('has-error');
                allGood = 0;
            } else {
                $('#account_details input#lastname').closest('.form-group').removeClass('has-error');
                allGood = 1;
            }
		
            if( allGood === 1 ) {

                var theButton = $(this);
                
                //disable button
                $(this).addClass('disabled');
                
                //show loader
                $('#account_details .loader').fadeIn(500);
                
                //remove alerts
                $('#account_details .alerts > *').remove();
                
                $.ajax({
                    url: appUI.siteUrl+"users/uaccount",
                    type: 'post',
                    dataType: 'json',
                    data: $('#account_details').serialize()
                }).done(function(ret){
                    
                    //enable button
                    theButton.removeClass('disabled');
                    
                    //hide loader
                    $('#account_details .loader').hide();
                    $('#account_details .alerts').append( $(ret.responseHTML) );

                    if( ret.responseCode === 1 ) {//success
                        setTimeout(function () { 
                            $('#account_details .alerts > *').fadeOut(500, function () { $(this).remove(); });
                        }, 3000);
                    }
                });

            }
            
        },
        
        
        /*
            updates account login details
        */
        updateLoginDetails: function() {
			
			console.log(appUI);
            
            var allGood = 1;
            
            if( $('#account_login input#email').val() === '' ) {
                $('#account_login input#email').closest('.form-group').addClass('has-error');
                allGood = 0;
            } else {
                $('#account_login input#email').closest('.form-group').removeClass('has-error');
                allGood = 1;
            }
            
            if( $('#account_login input#password').val() === '' ) {
                $('#account_login input#password').closest('.form-group').addClass('has-error');
                allGood = 0;
            } else {
                $('#account_login input#password').closest('.form-group').removeClass('has-error');
                allGood = 1;
            }
            
            if( allGood === 1 ) {
                
                var theButton = $(this);

                //disable button
                $(this).addClass('disabled');
                
                //show loader
                $('#account_login .loader').fadeIn(500);
                
                //remove alerts
                $('#account_login .alerts > *').remove();
                
                $.ajax({
                    url: appUI.siteUrl+"users/ulogin",
                    type: 'post',
                    dataType: 'json',
                    data: $('#account_login').serialize()
                }).done(function(ret){
                    
                    //enable button
                    theButton.removeClass('disabled');
                    
                    //hide loader
                    $('#account_login .loader').hide();
                    $('#account_login .alerts').append( $(ret.responseHTML) );
					
                    if( ret.responseCode === 1 ) {//success
                        setTimeout(function () { 
                            $('#account_login .alerts > *').fadeOut(500, function () { $(this).remove(); });
                        }, 3000);
                    }
                
                });
            
            }
            
        }
        
    };
    
    account.init();

}());
},{"./ui.js":4}],2:[function(require,module,exports){
(function () {
	"use strict";

	var appUI = require('./ui.js').appUI;

	var sites = {
        
        wrapperSites: document.getElementById('sites'),
        selectUser: document.getElementById('userDropDown'),
        selectSort: document.getElementById('sortDropDown'),
        buttonDeleteSite: document.getElementById('deleteSiteButton'),
		buttonsDeleteSite: document.querySelectorAll('.deleteSiteButton'),
        
        init: function() {
            
            this.createThumbnails();
            
            $(this.selectUser).on('change', this.filterUser);
            $(this.selectSort).on('change', this.changeSorting);
            $(this.buttonsDeleteSite).on('click', this.deleteSite);
			$(this.buttonDeleteSite).on('click', this.deleteSite);
            
        },
        
        
        /*
            applies zoomer to create the iframe thubmnails
        */
        createThumbnails: function() {
                        
            $(this.wrapperSites).find('iframe').each(function(){
                            
                // var theHeight = $(this).attr('data-height')*0.25;
                var theHeight = 210;
                
                $(this).zoomer({
                    // zoom: 0.25,
                    height: theHeight,
                    width: $(this).parent().width(),
                    message: "",
                    messageURL: appUI.siteUrl+"sites/"+$(this).attr('data-siteid')
                });
                
                $(this).closest('.site').find('.zoomer-cover > a').attr('target', '');
                    
            });
            
        },
        
        
        /*
            filters the site list by selected user
        */
        filterUser: function() {
            
            if( $(this).val() === 'All' || $(this).val() === '' ) {
                $('#sites .site').hide().fadeIn(500);
            } else {
                $('#sites .site').hide();
                $('#sites').find('[data-name="'+$(this).val()+'"]').fadeIn(500);
            }
            
        },
        
        
        /*
            chnages the sorting on the site list
        */
        changeSorting: function() {

            var sites;
            
            if( $(this).val() === 'NoOfPages' ) {
		
				sites = $('#sites .site');
			
				sites.sort( function(a,b){
                    
                    var an = a.getAttribute('data-pages');
					var bn = b.getAttribute('data-pages');
				
					if(an > bn) {
						return 1;
					}
				
					if(an < bn) {
						return -1;
					}
				
					return 0;
				
				} );
			
				sites.detach().appendTo( $('#sites') );
		
			} else if( $(this).val() === 'CreationDate' ) {
		
				sites = $('#sites .site');
			
				sites.sort( function(a,b){
			
					var an = a.getAttribute('data-created').replace("-", "");
					var bn = b.getAttribute('data-created').replace("-", "");
				
					if(an > bn) {
						return 1;
					}
				
					if(an < bn) {
						return -1;
					}
				
					return 0;
				
				} );
			
				sites.detach().appendTo( $('#sites') );
		
			} else if( $(this).val() === 'LastUpdate' ) {
		
				sites = $('#sites .site');
			
				sites.sort( function(a,b){
			
					var an = a.getAttribute('data-update').replace("-", "");
					var bn = b.getAttribute('data-update').replace("-", "");
				
					if(an > bn) {
						return 1;
					}
				
					if(an < bn) {
						return -1;
					}
				
				return 0;
				
				} );
			
				sites.detach().appendTo( $('#sites') );
		
			}
            
        },
        
        
        /*
            deletes a site
        */
        deleteSite: function(e) {
			            
            e.preventDefault();
            
            $('#deleteSiteModal .modal-content p').show();
            
            //remove old alerts
            $('#deleteSiteModal .modal-alerts > *').remove();
            $('#deleteSiteModal .loader').hide();
		
            var toDel = $(this).closest('.site');
            var delButton = $(this);
           
            $('#deleteSiteModal button#deleteSiteButton').show();
            $('#deleteSiteModal').modal('show');
           
            $('#deleteSiteModal button#deleteSiteButton').unbind('click').click(function(){
                
                $(this).addClass('disabled');
                $('#deleteSiteModal .loader').fadeIn(500);
               
                $.ajax({
                    url: appUI.siteUrl+"sites/trash/"+delButton.attr('data-siteid'),
                    type: 'post',
                    dataType: 'json'
                }).done(function(ret){
                    
                    $('#deleteSiteModal .loader').hide();
                    $('#deleteSiteModal button#deleteSiteButton').removeClass('disabled');
                   
                    if( ret.responseCode === 0 ) {//error
                       
                        $('#deleteSiteModal .modal-content p').hide();
                        $('#deleteSiteModal .modal-alerts').append( $(ret.responseHTML) );
                   
                    } else if( ret.responseCode === 1 ) {//all good
                       
                        $('#deleteSiteModal .modal-content p').hide();
                        $('#deleteSiteModal .modal-alerts').append( $(ret.responseHTML) );
                        $('#deleteSiteModal button#deleteSiteButton').hide();
                       
                        toDel.fadeOut(800, function(){
                            $(this).remove();
                        });
                    }
               
                });	
            });
            
        }
        
    };
    
    sites.init();

}());
},{"./ui.js":4}],3:[function(require,module,exports){
(function () {
	"use strict";

	var appUI = require('./ui.js').appUI;

	var siteSettings = {
        
        //buttonSiteSettings: document.getElementById('siteSettingsButton'),
		buttonSiteSettings2: $('.siteSettingsModalButton'),
        buttonSaveSiteSettings: document.getElementById('saveSiteSettingsButton'),
    
        init: function() {
            
            //$(this.buttonSiteSettings).on('click', this.siteSettingsModal);
			this.buttonSiteSettings2.on('click', this.siteSettingsModal);
            $(this.buttonSaveSiteSettings).on('click', this.saveSiteSettings);
        
        },
    
        /*
            loads the site settings data
        */
        siteSettingsModal: function(e) {
            
            e.preventDefault();
    		
    		$('#siteSettings').modal('show');
    		
    		//destroy all alerts
    		$('#siteSettings .alert').fadeOut(500, function(){
    		
    			$(this).remove();
    		
    		});
    		
    		//set the siteID
    		$('input#siteID').val( $(this).attr('data-siteid') );
    		
    		//destroy current forms
    		$('#siteSettings .modal-body-content > *').each(function(){
    			$(this).remove();
    		});
    		
            //show loader, hide rest
    		$('#siteSettingsWrapper .loader').show();
    		$('#siteSettingsWrapper > *:not(.loader)').hide();
    		
    		//load site data using ajax
    		$.ajax({
                url: appUI.siteUrl+"sites/siteAjax/"+$(this).attr('data-siteid'),
    			type: 'post',
    			dataType: 'json'
    		}).done(function(ret){    			
    			
    			if( ret.responseCode === 0 ) {//error
    			
    				//hide loader, show error message
    				$('#siteSettings .loader').fadeOut(500, function(){
    					
    					$('#siteSettings .modal-alerts').append( $(ret.responseHTML) );
    				
    				});
    				
    				//disable submit button
    				$('#saveSiteSettingsButton').addClass('disabled');
    			
    			
    			} else if( ret.responseCode === 1 ) {//all well :)
    			
    				//hide loader, show data
    				
    				$('#siteSettings .loader').fadeOut(500, function(){
    				
    					$('#siteSettings .modal-body-content').append( $(ret.responseHTML) );
                        
                        $('body').trigger('siteSettingsLoad');
    				
    				});
    				
    				//enable submit button
    				$('#saveSiteSettingsButton').removeClass('disabled');
                        			
    			}
    		
    		});
            
        },
        
        
        /*
            saves the site settings
        */
        saveSiteSettings: function() {
            
            //destroy all alerts
    		$('#siteSettings .alert').fadeOut(500, function(){
    		
    			$(this).remove();
    		
    		});
    		
    		//disable button
    		$('#saveSiteSettingsButton').addClass('disabled');
    		
    		//hide form data
    		$('#siteSettings .modal-body-content > *').hide();
    		
    		//show loader
    		$('#siteSettings .loader').show();
    		
    		$.ajax({
                url: appUI.siteUrl+"sites/siteAjaxUpdate",
    			type: 'post',
    			dataType: 'json',
    			data: $('form#siteSettingsForm').serializeArray()
    		}).done(function(ret){
    		
    			if( ret.responseCode === 0 ) {//error
    			
    				$('#siteSettings .loader').fadeOut(500, function(){
    				
    					$('#siteSettings .modal-alerts').append( ret.responseHTML );
    					
    					//show form data
    					$('#siteSettings .modal-body-content > *').show();
    					
    					//enable button
    					$('#saveSiteSettingsButton').removeClass('disabled');
    				
    				});
    			
    			
    			} else if( ret.responseCode === 1 ) {//all is well
    			
    				$('#siteSettings .loader').fadeOut(500, function(){
    					
    					
    					//update site name in top menu
    					$('#siteTitle').text( ret.siteName );
    					
    					$('#siteSettings .modal-alerts').append( ret.responseHTML );
    					
    					//hide form data
    					$('#siteSettings .modal-body-content > *').remove();
    					$('#siteSettings .modal-body-content').append( ret.responseHTML2 );
    					
    					//enable button
    					$('#saveSiteSettingsButton').removeClass('disabled');
    					
    					//is the FTP stuff all good?
    					
    					if( ret.ftpOk === 1 ) {//yes, all good
    					
    						$('#publishPage').removeAttr('data-toggle');
    						$('#publishPage span.text-danger').hide();
    						
    						$('#publishPage').tooltip('destroy');
    					
    					} else {//nope, can't use FTP
    						
    						$('#publishPage').attr('data-toggle', 'tooltip');
    						$('#publishPage span.text-danger').show();
    						
    						$('#publishPage').tooltip('show');
    					
    					}
    					
    					
    					//update the site name in the small window
    					$('#site_'+ret.siteID+' .window .top b').text( ret.siteName );
    				
    				});
    			
    			
    			}
    		
    		});
    		            
        },
        
    
    };
    
    siteSettings.init();

}());
},{"./ui.js":4}],4:[function(require,module,exports){
(function () {

/* globals siteUrl:false, baseUrl:false */
    "use strict";
        
    var appUI = {
        
        firstMenuWidth: 190,
        secondMenuWidth: 300,
        loaderAnimation: document.getElementById('loader'),
        secondMenuTriggerContainers: $('#menu #main #elementCats, #menu #main #templatesUl'),
        siteUrl: siteUrl,
        baseUrl: baseUrl,
        
        setup: function(){
            
            // Fade the loader animation
            $(appUI.loaderAnimation).fadeOut(function(){
                $('#menu').animate({'left': 0}, 1000);
            });
            
            // Tabs
            $(".nav-tabs a").on('click', function (e) {
                e.preventDefault();
                $(this).tab("show");
            });
            
            $("select.select").select2();
            
            $(':radio, :checkbox').radiocheck();
            
            // Tooltips
            $("[data-toggle=tooltip]").tooltip("hide");
            
            // Table: Toggle all checkboxes
            $('.table .toggle-all :checkbox').on('click', function () {
                var $this = $(this);
                var ch = $this.prop('checked');
                $this.closest('.table').find('tbody :checkbox').radiocheck(!ch ? 'uncheck' : 'check');
            });
            
            // Add style class name to a tooltips
            $(".tooltip").addClass(function() {
                if ($(this).prev().attr("data-tooltip-style")) {
                    return "tooltip-" + $(this).prev().attr("data-tooltip-style");
                }
            });
            
            $(".btn-group").on('click', "a", function() {
                $(this).siblings().removeClass("active").end().addClass("active");
            });
            
            // Focus state for append/prepend inputs
            $('.input-group').on('focus', '.form-control', function () {
                $(this).closest('.input-group, .form-group').addClass('focus');
            }).on('blur', '.form-control', function () {
                $(this).closest('.input-group, .form-group').removeClass('focus');
            });
            
            // Table: Toggle all checkboxes
            $('.table .toggle-all').on('click', function() {
                var ch = $(this).find(':checkbox').prop('checked');
                $(this).closest('.table').find('tbody :checkbox').checkbox(!ch ? 'check' : 'uncheck');
            });
            
            // Table: Add class row selected
            $('.table tbody :checkbox').on('check uncheck toggle', function (e) {
                var $this = $(this)
                , check = $this.prop('checked')
                , toggle = e.type === 'toggle'
                , checkboxes = $('.table tbody :checkbox')
                , checkAll = checkboxes.length === checkboxes.filter(':checked').length;

                $this.closest('tr')[check ? 'addClass' : 'removeClass']('selected-row');
                if (toggle) $this.closest('.table').find('.toggle-all :checkbox').checkbox(checkAll ? 'check' : 'uncheck');
            });
            
            // Switch
            $("[data-toggle='switch']").wrap('<div class="switch" />').parent().bootstrapSwitch();
                        
            appUI.secondMenuTriggerContainers.on('click', 'a:not(.btn)', appUI.secondMenuAnimation);
                        
        },
        
        secondMenuAnimation: function(){
        
            $('#menu #main a').removeClass('active');
            $(this).addClass('active');
	
            //show only the right elements
            $('#menu #second ul li').hide();
            $('#menu #second ul li.'+$(this).attr('id')).show();

            if( $(this).attr('id') === 'all' ) {
                $('#menu #second ul#elements li').show();		
            }
	
            $('.menu .second').css('display', 'block').stop().animate({
                width: appUI.secondMenuWidth
            }, 500);	
                
        }
        
    };
    
    //initiate the UI
    appUI.setup();


    //**** EXPORTS
    module.exports.appUI = appUI;
    
}());
},{}],5:[function(require,module,exports){
(function () {
	"use strict";

	var appUI = require('./ui.js').appUI;
	
	var users = {
        
        buttonCreateAccount: document.getElementById('buttonCreateAccount'),
        wrapperUsers: document.getElementById('users'),
        
        init: function() {
            
            $(this.buttonCreateAccount).on('click', this.createAccount);
            $(this.wrapperUsers).on('click', '.updateUserButton', this.updateUser);
            $(this.wrapperUsers).on('click', '.passwordReset', this.passwordReset);
            $(this.wrapperUsers).on('click', '.deleteUserButton', this.deleteUser);
            
        },
        
        
        /*
            creates a new user account
        */
        createAccount: function() {
            
            //all items present?
            
            var allGood = 1;
            
            if( $('#newUserModal form input#firstname').val() === '' ) {
                $('#newUserModal form input#firstname').parent().addClass('has-error');
                allGood = 0;
            } else {
                $('#newUserModal form input#firstname').parent().removeClass('has-error');			
            }
            
            if( $('#newUserModal form input#lastname').val() === '' ) {
                $('#newUserModal form input#lastname').parent().addClass('has-error');
                allGood = 0;
            } else {
                $('#newUserModal form input#lastname').parent().removeClass('has-error');
            }
            
            if( $('#newUserModal form input#email').val() === '' ) {
                $('#newUserModal form input#email').parent().addClass('has-error');
                allGood = 0;
            } else {
                $('#newUserModal form input#email').parent().removeClass('has-error');
            }
            
            if( $('#newUserModal form input#password').val() === '' ) {
                $('#newUserModal form input#password').parent().addClass('has-error');
                allGood = 0;
            } else {
                $('#newUserModal form input#password').parent().removeClass('has-error');
            }
		
            if( allGood === 1 ) {
                
                //remove old alerts
                $('#newUserModal .modal-alerts > *').hide();

                //disable button
                $(this).addClass('disabled');

                //show loader
                $('#newUserModal .loader').fadeIn();
                
                $.ajax({
                    url: $('#newUserModal form').attr('action'),
                    type: 'post',
                    dataType: 'json',
                    data:  $('#newUserModal form').serialize()
                }).done(function(ret){
			
                    //enable button
                    $('button#buttonCreateAccount').removeClass('disabled');

                    //hide loader
                    $('#newUserModal .loader').hide();
			
                    if( ret.responseCode === 0 ) {//error
                        
                        $('#newUserModal .modal-alerts').append( $(ret.responseHTML) );
                    
                    } else {//all good
                        
                        $('#newUserModal .modal-alerts').append( $(ret.responseHTML) );
                        $('#users > *').remove();
                        $('#users').append( $(ret.users) );
                        $('#users form input[type="checkbox"]').checkbox();
					
                        ('.userSites .site iframe').each(function(){

                            var theHeight = $(this).attr('data-height')*0.25;
                            
                            $(this).width(  );
                            
                            $(this).zoomer({
                                zoom: 0.25,
                                height: theHeight,
                                width: $(this).closest('.tab-pane').width(),
                                message: "",
                                messageURL: appUI.siteUrl+"sites/"+$(this).attr('data-siteid')
                            });
                            
                            $(this).closest('.site').find('.zoomer-cover > a').attr('target', '');
                        
                        });
                    
                    }
                
                });
            
            }
            
        },
        
        
        /*
            updates a user
        */
        updateUser: function() {
                    
            //disable button
            var theButton = $(this);		
            $(this).addClass('disabled');
	
            //show loader
            $(this).closest('.bottom').find('.loader').fadeIn(500);
            
            $.ajax({
                url: $(this).closest('form').attr('action'),
                type: 'post',
                dataType: 'json',
                data: $(this).closest('form').serialize()
            }).done(function(ret){
		
                //enable button
                theButton.removeClass('disabled');
			
                //hide loader
                theButton.closest('.bottom').find('.loader').hide();
                
                if( ret.responseCode === 0 ) {//error
                    
                    theButton.closest('.bottom').find('.alerts').append( $(ret.responseHTML) );
                    
                } else if(ret.responseCode === 1) {//all good
                    
                    theButton.closest('.bottom').find('.alerts').append( $(ret.responseHTML) );				
                    
                    //append user detail form
                    var thePane = theButton.closest('.tab-pane');
				
                    setTimeout(function(){
                        thePane.closest('.bottom').find('.alert-success').fadeOut(500, function(){$(this.remove());});
                    }, 3000);
                    
                    theButton.closest('form').remove();
                    
                    thePane.prepend( $(ret.userDetailForm) );
                    thePane.find('form input[type="checkbox"]').checkbox();
                
                }
            
            });
            
        },
        
        
        /*
            password reset
        */
        passwordReset: function(e) {
            
            e.preventDefault();
            
            var theButton = $(this);
            
            //disable buttons
            $(this).addClass('disabled');
            $(this).closest('.bottom').find('.updateUserButton').addClass('disabled');
            
            //show loader
            $(this).closest('.bottom').find('.loader').fadeIn();
		
            $.ajax({
                url: appUI.siteUrl+"users/rpw/"+$(this).attr('data-userid'),
                type: 'post',
                dataType: 'json'
            }).done(function(ret){
                
                //enable buttons
                theButton.removeClass('disabled');
                theButton.closest('.bottom').find('.updateUserButton').removeClass('disabled');

                //hide loader
                theButton.closest('.bottom').find('.loader').hide();
                $(theButton).closest('.bottom').find('.alerts').append( $(ret.responseHTML) );
                
                if( ret.responseCode === 0 ) {//error
			
				} else if( ret.responseCode === 1 ) {//all good
                    
                    setTimeout(function(){ 
                        theButton.closest('.bottom').find('.alerts > *').fadeOut(500, function(){$(this).remove();});
                    }, 3000);
                
                }
            
            });
            
        },
        
        
        /*
            deletes a user account
        */
        deleteUser: function(e) {
            
            e.preventDefault();
            
            //setup delete link
            $('#deleteUserModal a#deleteUserButton').attr('href', $(this).attr('href'));
            
            //modal
            $('#deleteUserModal').modal('show');
            
        }
        
    };
    
    users.init();
	
}());
},{"./ui.js":4}],6:[function(require,module,exports){
(function () {
	"use strict";

	require('./modules/ui');
	require('./modules/users');
	require('./modules/account');
	require('./modules/sitesettings');
	require('./modules/sites');

	$('.userSites .site iframe').each(function(){
    	    	
        var theHeight = $(this).attr('data-height')*0.25;
    		
        //alert($(this).closest('.tab-content').innerWidth())
    		    	    	
        $(this).zoomer({
            zoom: 0.20,
            height: theHeight,
            width: $(this).closest('.tab-content').width(),
            message: "",
            messageURL: "<?php echo site_url('sites')?>/"+$(this).attr('data-siteid')
        });
    		
        $(this).closest('.site').find('.zoomer-cover > a').attr('target', '');
    	
    })

}());
},{"./modules/account":1,"./modules/sites":2,"./modules/sitesettings":3,"./modules/ui":4,"./modules/users":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tb2R1bGVzL2FjY291bnQuanMiLCJqcy9tb2R1bGVzL3NpdGVzLmpzIiwianMvbW9kdWxlcy9zaXRlc2V0dGluZ3MuanMiLCJqcy9tb2R1bGVzL3VpLmpzIiwianMvbW9kdWxlcy91c2Vycy5qcyIsImpzL3VzZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBhcHBVSSA9IHJlcXVpcmUoJy4vdWkuanMnKS5hcHBVSTtcblxuXHR2YXIgYWNjb3VudCA9IHtcbiAgICAgICAgXG4gICAgICAgIGJ1dHRvblVwZGF0ZUFjY291bnREZXRhaWxzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjb3VudERldGFpbHNTdWJtaXQnKSxcbiAgICAgICAgYnV0dG9uVXBkYXRlTG9naW5EZXRhaWxzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjb3VudExvZ2luU3VibWl0JyksXG4gICAgICAgIFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCh0aGlzLmJ1dHRvblVwZGF0ZUFjY291bnREZXRhaWxzKS5vbignY2xpY2snLCB0aGlzLnVwZGF0ZUFjY291bnREZXRhaWxzKTtcbiAgICAgICAgICAgICQodGhpcy5idXR0b25VcGRhdGVMb2dpbkRldGFpbHMpLm9uKCdjbGljaycsIHRoaXMudXBkYXRlTG9naW5EZXRhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICB1cGRhdGVzIGFjY291bnQgZGV0YWlsc1xuICAgICAgICAqL1xuICAgICAgICB1cGRhdGVBY2NvdW50RGV0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vYWxsIGZpZWxkcyBmaWxsZWQgaW4/XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhbGxHb29kID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykudmFsKCkgPT09ICcnICkge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCAkKCcjYWNjb3VudF9kZXRhaWxzIGlucHV0I2xhc3RuYW1lJykudmFsKCkgPT09ICcnICkge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjbGFzdG5hbWUnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyBpbnB1dCNsYXN0bmFtZScpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAxO1xuICAgICAgICAgICAgfVxuXHRcdFxuICAgICAgICAgICAgaWYoIGFsbEdvb2QgPT09IDEgKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhlQnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAubG9hZGVyJykuZmFkZUluKDUwMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgYWxlcnRzXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAuYWxlcnRzID4gKicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBwVUkuc2l0ZVVybCtcInVzZXJzL3VhY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCgnI2FjY291bnRfZGV0YWlscycpLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9lbmFibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vaGlkZSBsb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAubG9hZGVyJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9kZXRhaWxzIC5hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggcmV0LnJlc3BvbnNlQ29kZSA9PT0gMSApIHsvL3N1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9kZXRhaWxzIC5hbGVydHMgPiAqJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHsgJCh0aGlzKS5yZW1vdmUoKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgdXBkYXRlcyBhY2NvdW50IGxvZ2luIGRldGFpbHNcbiAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlTG9naW5EZXRhaWxzOiBmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0Y29uc29sZS5sb2coYXBwVUkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYWxsR29vZCA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLnZhbCgpID09PSAnJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS52YWwoKSA9PT0gJycgKSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIGFsbEdvb2QgPT09IDEgKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRoZUJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gLmxvYWRlcicpLmZhZGVJbig1MDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFsZXJ0c1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5hbGVydHMgPiAqJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHBVSS5zaXRlVXJsK1widXNlcnMvdWxvZ2luXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCgnI2FjY291bnRfbG9naW4nKS5zZXJpYWxpemUoKVxuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0aGVCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL2hpZGUgbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5sb2FkZXInKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDEgKSB7Ly9zdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gLmFsZXJ0cyA+IConKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkgeyAkKHRoaXMpLnJlbW92ZSgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgYWNjb3VudC5pbml0KCk7XG5cbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0dmFyIGFwcFVJID0gcmVxdWlyZSgnLi91aS5qcycpLmFwcFVJO1xuXG5cdHZhciBzaXRlcyA9IHtcbiAgICAgICAgXG4gICAgICAgIHdyYXBwZXJTaXRlczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpdGVzJyksXG4gICAgICAgIHNlbGVjdFVzZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd1c2VyRHJvcERvd24nKSxcbiAgICAgICAgc2VsZWN0U29ydDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnREcm9wRG93bicpLFxuICAgICAgICBidXR0b25EZWxldGVTaXRlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVsZXRlU2l0ZUJ1dHRvbicpLFxuXHRcdGJ1dHRvbnNEZWxldGVTaXRlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZGVsZXRlU2l0ZUJ1dHRvbicpLFxuICAgICAgICBcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlVGh1bWJuYWlscygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKHRoaXMuc2VsZWN0VXNlcikub24oJ2NoYW5nZScsIHRoaXMuZmlsdGVyVXNlcik7XG4gICAgICAgICAgICAkKHRoaXMuc2VsZWN0U29ydCkub24oJ2NoYW5nZScsIHRoaXMuY2hhbmdlU29ydGluZyk7XG4gICAgICAgICAgICAkKHRoaXMuYnV0dG9uc0RlbGV0ZVNpdGUpLm9uKCdjbGljaycsIHRoaXMuZGVsZXRlU2l0ZSk7XG5cdFx0XHQkKHRoaXMuYnV0dG9uRGVsZXRlU2l0ZSkub24oJ2NsaWNrJywgdGhpcy5kZWxldGVTaXRlKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBhcHBsaWVzIHpvb21lciB0byBjcmVhdGUgdGhlIGlmcmFtZSB0aHVibW5haWxzXG4gICAgICAgICovXG4gICAgICAgIGNyZWF0ZVRodW1ibmFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAkKHRoaXMud3JhcHBlclNpdGVzKS5maW5kKCdpZnJhbWUnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gdmFyIHRoZUhlaWdodCA9ICQodGhpcykuYXR0cignZGF0YS1oZWlnaHQnKSowLjI1O1xuICAgICAgICAgICAgICAgIHZhciB0aGVIZWlnaHQgPSAyMTA7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCh0aGlzKS56b29tZXIoe1xuICAgICAgICAgICAgICAgICAgICAvLyB6b29tOiAwLjI1LFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoZUhlaWdodCxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICQodGhpcykucGFyZW50KCkud2lkdGgoKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZVVSTDogYXBwVUkuc2l0ZVVybCtcInNpdGVzL1wiKyQodGhpcykuYXR0cignZGF0YS1zaXRlaWQnKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLnNpdGUnKS5maW5kKCcuem9vbWVyLWNvdmVyID4gYScpLmF0dHIoJ3RhcmdldCcsICcnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBmaWx0ZXJzIHRoZSBzaXRlIGxpc3QgYnkgc2VsZWN0ZWQgdXNlclxuICAgICAgICAqL1xuICAgICAgICBmaWx0ZXJVc2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQodGhpcykudmFsKCkgPT09ICdBbGwnIHx8ICQodGhpcykudmFsKCkgPT09ICcnICkge1xuICAgICAgICAgICAgICAgICQoJyNzaXRlcyAuc2l0ZScpLmhpZGUoKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI3NpdGVzIC5zaXRlJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICQoJyNzaXRlcycpLmZpbmQoJ1tkYXRhLW5hbWU9XCInKyQodGhpcykudmFsKCkrJ1wiXScpLmZhZGVJbig1MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIGNobmFnZXMgdGhlIHNvcnRpbmcgb24gdGhlIHNpdGUgbGlzdFxuICAgICAgICAqL1xuICAgICAgICBjaGFuZ2VTb3J0aW5nOiBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgdmFyIHNpdGVzO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggJCh0aGlzKS52YWwoKSA9PT0gJ05vT2ZQYWdlcycgKSB7XG5cdFx0XG5cdFx0XHRcdHNpdGVzID0gJCgnI3NpdGVzIC5zaXRlJyk7XG5cdFx0XHRcblx0XHRcdFx0c2l0ZXMuc29ydCggZnVuY3Rpb24oYSxiKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBhbiA9IGEuZ2V0QXR0cmlidXRlKCdkYXRhLXBhZ2VzJyk7XG5cdFx0XHRcdFx0dmFyIGJuID0gYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFnZXMnKTtcblx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoYW4gPiBibikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0XHRpZihhbiA8IGJuKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gLTE7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcblx0XHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdFx0XG5cdFx0XHRcdH0gKTtcblx0XHRcdFxuXHRcdFx0XHRzaXRlcy5kZXRhY2goKS5hcHBlbmRUbyggJCgnI3NpdGVzJykgKTtcblx0XHRcblx0XHRcdH0gZWxzZSBpZiggJCh0aGlzKS52YWwoKSA9PT0gJ0NyZWF0aW9uRGF0ZScgKSB7XG5cdFx0XG5cdFx0XHRcdHNpdGVzID0gJCgnI3NpdGVzIC5zaXRlJyk7XG5cdFx0XHRcblx0XHRcdFx0c2l0ZXMuc29ydCggZnVuY3Rpb24oYSxiKXtcblx0XHRcdFxuXHRcdFx0XHRcdHZhciBhbiA9IGEuZ2V0QXR0cmlidXRlKCdkYXRhLWNyZWF0ZWQnKS5yZXBsYWNlKFwiLVwiLCBcIlwiKTtcblx0XHRcdFx0XHR2YXIgYm4gPSBiLmdldEF0dHJpYnV0ZSgnZGF0YS1jcmVhdGVkJykucmVwbGFjZShcIi1cIiwgXCJcIik7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGFuID4gYm4pIHtcblx0XHRcdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoYW4gPCBibikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHRcdFxuXHRcdFx0XHR9ICk7XG5cdFx0XHRcblx0XHRcdFx0c2l0ZXMuZGV0YWNoKCkuYXBwZW5kVG8oICQoJyNzaXRlcycpICk7XG5cdFx0XG5cdFx0XHR9IGVsc2UgaWYoICQodGhpcykudmFsKCkgPT09ICdMYXN0VXBkYXRlJyApIHtcblx0XHRcblx0XHRcdFx0c2l0ZXMgPSAkKCcjc2l0ZXMgLnNpdGUnKTtcblx0XHRcdFxuXHRcdFx0XHRzaXRlcy5zb3J0KCBmdW5jdGlvbihhLGIpe1xuXHRcdFx0XG5cdFx0XHRcdFx0dmFyIGFuID0gYS5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXBkYXRlJykucmVwbGFjZShcIi1cIiwgXCJcIik7XG5cdFx0XHRcdFx0dmFyIGJuID0gYi5nZXRBdHRyaWJ1dGUoJ2RhdGEtdXBkYXRlJykucmVwbGFjZShcIi1cIiwgXCJcIik7XG5cdFx0XHRcdFxuXHRcdFx0XHRcdGlmKGFuID4gYm4pIHtcblx0XHRcdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdFx0aWYoYW4gPCBibikge1xuXHRcdFx0XHRcdFx0cmV0dXJuIC0xO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0XHRcblx0XHRcdFx0fSApO1xuXHRcdFx0XG5cdFx0XHRcdHNpdGVzLmRldGFjaCgpLmFwcGVuZFRvKCAkKCcjc2l0ZXMnKSApO1xuXHRcdFxuXHRcdFx0fVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIGRlbGV0ZXMgYSBzaXRlXG4gICAgICAgICovXG4gICAgICAgIGRlbGV0ZVNpdGU6IGZ1bmN0aW9uKGUpIHtcblx0XHRcdCAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKCcjZGVsZXRlU2l0ZU1vZGFsIC5tb2RhbC1jb250ZW50IHAnKS5zaG93KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vcmVtb3ZlIG9sZCBhbGVydHNcbiAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLm1vZGFsLWFsZXJ0cyA+IConKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLmxvYWRlcicpLmhpZGUoKTtcblx0XHRcbiAgICAgICAgICAgIHZhciB0b0RlbCA9ICQodGhpcykuY2xvc2VzdCgnLnNpdGUnKTtcbiAgICAgICAgICAgIHZhciBkZWxCdXR0b24gPSAkKHRoaXMpO1xuICAgICAgICAgICBcbiAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgYnV0dG9uI2RlbGV0ZVNpdGVCdXR0b24nKS5zaG93KCk7XG4gICAgICAgICAgICAkKCcjZGVsZXRlU2l0ZU1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgXG4gICAgICAgICAgICAkKCcjZGVsZXRlU2l0ZU1vZGFsIGJ1dHRvbiNkZWxldGVTaXRlQnV0dG9uJykudW5iaW5kKCdjbGljaycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAkKCcjZGVsZXRlU2l0ZU1vZGFsIC5sb2FkZXInKS5mYWRlSW4oNTAwKTtcbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBwVUkuc2l0ZVVybCtcInNpdGVzL3RyYXNoL1wiK2RlbEJ1dHRvbi5hdHRyKCdkYXRhLXNpdGVpZCcpLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKHJldCl7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAkKCcjZGVsZXRlU2l0ZU1vZGFsIC5sb2FkZXInKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgYnV0dG9uI2RlbGV0ZVNpdGVCdXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDAgKSB7Ly9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLm1vZGFsLWNvbnRlbnQgcCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLm1vZGFsLWFsZXJ0cycpLmFwcGVuZCggJChyZXQucmVzcG9uc2VIVE1MKSApO1xuICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDEgKSB7Ly9hbGwgZ29vZFxuICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLm1vZGFsLWNvbnRlbnQgcCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNkZWxldGVTaXRlTW9kYWwgLm1vZGFsLWFsZXJ0cycpLmFwcGVuZCggJChyZXQucmVzcG9uc2VIVE1MKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2RlbGV0ZVNpdGVNb2RhbCBidXR0b24jZGVsZXRlU2l0ZUJ1dHRvbicpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB0b0RlbC5mYWRlT3V0KDgwMCwgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH0pO1x0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgc2l0ZXMuaW5pdCgpO1xuXG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBhcHBVSSA9IHJlcXVpcmUoJy4vdWkuanMnKS5hcHBVSTtcblxuXHR2YXIgc2l0ZVNldHRpbmdzID0ge1xuICAgICAgICBcbiAgICAgICAgLy9idXR0b25TaXRlU2V0dGluZ3M6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlU2V0dGluZ3NCdXR0b24nKSxcblx0XHRidXR0b25TaXRlU2V0dGluZ3MyOiAkKCcuc2l0ZVNldHRpbmdzTW9kYWxCdXR0b24nKSxcbiAgICAgICAgYnV0dG9uU2F2ZVNpdGVTZXR0aW5nczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmVTaXRlU2V0dGluZ3NCdXR0b24nKSxcbiAgICBcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vJCh0aGlzLmJ1dHRvblNpdGVTZXR0aW5ncykub24oJ2NsaWNrJywgdGhpcy5zaXRlU2V0dGluZ3NNb2RhbCk7XG5cdFx0XHR0aGlzLmJ1dHRvblNpdGVTZXR0aW5nczIub24oJ2NsaWNrJywgdGhpcy5zaXRlU2V0dGluZ3NNb2RhbCk7XG4gICAgICAgICAgICAkKHRoaXMuYnV0dG9uU2F2ZVNpdGVTZXR0aW5ncykub24oJ2NsaWNrJywgdGhpcy5zYXZlU2l0ZVNldHRpbmdzKTtcbiAgICAgICAgXG4gICAgICAgIH0sXG4gICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICBsb2FkcyB0aGUgc2l0ZSBzZXR0aW5ncyBkYXRhXG4gICAgICAgICovXG4gICAgICAgIHNpdGVTZXR0aW5nc01vZGFsOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBcdFx0XG4gICAgXHRcdCQoJyNzaXRlU2V0dGluZ3MnKS5tb2RhbCgnc2hvdycpO1xuICAgIFx0XHRcbiAgICBcdFx0Ly9kZXN0cm95IGFsbCBhbGVydHNcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5ncyAuYWxlcnQnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24oKXtcbiAgICBcdFx0XG4gICAgXHRcdFx0JCh0aGlzKS5yZW1vdmUoKTtcbiAgICBcdFx0XG4gICAgXHRcdH0pO1xuICAgIFx0XHRcbiAgICBcdFx0Ly9zZXQgdGhlIHNpdGVJRFxuICAgIFx0XHQkKCdpbnB1dCNzaXRlSUQnKS52YWwoICQodGhpcykuYXR0cignZGF0YS1zaXRlaWQnKSApO1xuICAgIFx0XHRcbiAgICBcdFx0Ly9kZXN0cm95IGN1cnJlbnQgZm9ybXNcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5ncyAubW9kYWwtYm9keS1jb250ZW50ID4gKicpLmVhY2goZnVuY3Rpb24oKXtcbiAgICBcdFx0XHQkKHRoaXMpLnJlbW92ZSgpO1xuICAgIFx0XHR9KTtcbiAgICBcdFx0XG4gICAgICAgICAgICAvL3Nob3cgbG9hZGVyLCBoaWRlIHJlc3RcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5nc1dyYXBwZXIgLmxvYWRlcicpLnNob3coKTtcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5nc1dyYXBwZXIgPiAqOm5vdCgubG9hZGVyKScpLmhpZGUoKTtcbiAgICBcdFx0XG4gICAgXHRcdC8vbG9hZCBzaXRlIGRhdGEgdXNpbmcgYWpheFxuICAgIFx0XHQkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYXBwVUkuc2l0ZVVybCtcInNpdGVzL3NpdGVBamF4L1wiKyQodGhpcykuYXR0cignZGF0YS1zaXRlaWQnKSxcbiAgICBcdFx0XHR0eXBlOiAncG9zdCcsXG4gICAgXHRcdFx0ZGF0YVR5cGU6ICdqc29uJ1xuICAgIFx0XHR9KS5kb25lKGZ1bmN0aW9uKHJldCl7ICAgIFx0XHRcdFxuICAgIFx0XHRcdFxuICAgIFx0XHRcdGlmKCByZXQucmVzcG9uc2VDb2RlID09PSAwICkgey8vZXJyb3JcbiAgICBcdFx0XHRcbiAgICBcdFx0XHRcdC8vaGlkZSBsb2FkZXIsIHNob3cgZXJyb3IgbWVzc2FnZVxuICAgIFx0XHRcdFx0JCgnI3NpdGVTZXR0aW5ncyAubG9hZGVyJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgXHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHQkKCcjc2l0ZVNldHRpbmdzIC5tb2RhbC1hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcbiAgICBcdFx0XHRcdFxuICAgIFx0XHRcdFx0fSk7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdC8vZGlzYWJsZSBzdWJtaXQgYnV0dG9uXG4gICAgXHRcdFx0XHQkKCcjc2F2ZVNpdGVTZXR0aW5nc0J1dHRvbicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdFxuICAgIFx0XHRcdH0gZWxzZSBpZiggcmV0LnJlc3BvbnNlQ29kZSA9PT0gMSApIHsvL2FsbCB3ZWxsIDopXG4gICAgXHRcdFx0XG4gICAgXHRcdFx0XHQvL2hpZGUgbG9hZGVyLCBzaG93IGRhdGFcbiAgICBcdFx0XHRcdFxuICAgIFx0XHRcdFx0JCgnI3NpdGVTZXR0aW5ncyAubG9hZGVyJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0JCgnI3NpdGVTZXR0aW5ncyAubW9kYWwtYm9keS1jb250ZW50JykuYXBwZW5kKCAkKHJldC5yZXNwb25zZUhUTUwpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJ2JvZHknKS50cmlnZ2VyKCdzaXRlU2V0dGluZ3NMb2FkJyk7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdH0pO1xuICAgIFx0XHRcdFx0XG4gICAgXHRcdFx0XHQvL2VuYWJsZSBzdWJtaXQgYnV0dG9uXG4gICAgXHRcdFx0XHQkKCcjc2F2ZVNpdGVTZXR0aW5nc0J1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXHRcdFx0XG4gICAgXHRcdFx0fVxuICAgIFx0XHRcbiAgICBcdFx0fSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgc2F2ZXMgdGhlIHNpdGUgc2V0dGluZ3NcbiAgICAgICAgKi9cbiAgICAgICAgc2F2ZVNpdGVTZXR0aW5nczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vZGVzdHJveSBhbGwgYWxlcnRzXG4gICAgXHRcdCQoJyNzaXRlU2V0dGluZ3MgLmFsZXJ0JykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgXHRcdFxuICAgIFx0XHRcdCQodGhpcykucmVtb3ZlKCk7XG4gICAgXHRcdFxuICAgIFx0XHR9KTtcbiAgICBcdFx0XG4gICAgXHRcdC8vZGlzYWJsZSBidXR0b25cbiAgICBcdFx0JCgnI3NhdmVTaXRlU2V0dGluZ3NCdXR0b24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICBcdFx0XG4gICAgXHRcdC8vaGlkZSBmb3JtIGRhdGFcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5ncyAubW9kYWwtYm9keS1jb250ZW50ID4gKicpLmhpZGUoKTtcbiAgICBcdFx0XG4gICAgXHRcdC8vc2hvdyBsb2FkZXJcbiAgICBcdFx0JCgnI3NpdGVTZXR0aW5ncyAubG9hZGVyJykuc2hvdygpO1xuICAgIFx0XHRcbiAgICBcdFx0JC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IGFwcFVJLnNpdGVVcmwrXCJzaXRlcy9zaXRlQWpheFVwZGF0ZVwiLFxuICAgIFx0XHRcdHR5cGU6ICdwb3N0JyxcbiAgICBcdFx0XHRkYXRhVHlwZTogJ2pzb24nLFxuICAgIFx0XHRcdGRhdGE6ICQoJ2Zvcm0jc2l0ZVNldHRpbmdzRm9ybScpLnNlcmlhbGl6ZUFycmF5KClcbiAgICBcdFx0fSkuZG9uZShmdW5jdGlvbihyZXQpe1xuICAgIFx0XHRcbiAgICBcdFx0XHRpZiggcmV0LnJlc3BvbnNlQ29kZSA9PT0gMCApIHsvL2Vycm9yXG4gICAgXHRcdFx0XG4gICAgXHRcdFx0XHQkKCcjc2l0ZVNldHRpbmdzIC5sb2FkZXInKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24oKXtcbiAgICBcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHQkKCcjc2l0ZVNldHRpbmdzIC5tb2RhbC1hbGVydHMnKS5hcHBlbmQoIHJldC5yZXNwb25zZUhUTUwgKTtcbiAgICBcdFx0XHRcdFx0XG4gICAgXHRcdFx0XHRcdC8vc2hvdyBmb3JtIGRhdGFcbiAgICBcdFx0XHRcdFx0JCgnI3NpdGVTZXR0aW5ncyAubW9kYWwtYm9keS1jb250ZW50ID4gKicpLnNob3coKTtcbiAgICBcdFx0XHRcdFx0XG4gICAgXHRcdFx0XHRcdC8vZW5hYmxlIGJ1dHRvblxuICAgIFx0XHRcdFx0XHQkKCcjc2F2ZVNpdGVTZXR0aW5nc0J1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgIFx0XHRcdFx0XG4gICAgXHRcdFx0XHR9KTtcbiAgICBcdFx0XHRcbiAgICBcdFx0XHRcbiAgICBcdFx0XHR9IGVsc2UgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDEgKSB7Ly9hbGwgaXMgd2VsbFxuICAgIFx0XHRcdFxuICAgIFx0XHRcdFx0JCgnI3NpdGVTZXR0aW5ncyAubG9hZGVyJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uKCl7XG4gICAgXHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0Ly91cGRhdGUgc2l0ZSBuYW1lIGluIHRvcCBtZW51XG4gICAgXHRcdFx0XHRcdCQoJyNzaXRlVGl0bGUnKS50ZXh0KCByZXQuc2l0ZU5hbWUgKTtcbiAgICBcdFx0XHRcdFx0XG4gICAgXHRcdFx0XHRcdCQoJyNzaXRlU2V0dGluZ3MgLm1vZGFsLWFsZXJ0cycpLmFwcGVuZCggcmV0LnJlc3BvbnNlSFRNTCApO1xuICAgIFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0Ly9oaWRlIGZvcm0gZGF0YVxuICAgIFx0XHRcdFx0XHQkKCcjc2l0ZVNldHRpbmdzIC5tb2RhbC1ib2R5LWNvbnRlbnQgPiAqJykucmVtb3ZlKCk7XG4gICAgXHRcdFx0XHRcdCQoJyNzaXRlU2V0dGluZ3MgLm1vZGFsLWJvZHktY29udGVudCcpLmFwcGVuZCggcmV0LnJlc3BvbnNlSFRNTDIgKTtcbiAgICBcdFx0XHRcdFx0XG4gICAgXHRcdFx0XHRcdC8vZW5hYmxlIGJ1dHRvblxuICAgIFx0XHRcdFx0XHQkKCcjc2F2ZVNpdGVTZXR0aW5nc0J1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgIFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0Ly9pcyB0aGUgRlRQIHN0dWZmIGFsbCBnb29kP1xuICAgIFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0aWYoIHJldC5mdHBPayA9PT0gMSApIHsvL3llcywgYWxsIGdvb2RcbiAgICBcdFx0XHRcdFx0XG4gICAgXHRcdFx0XHRcdFx0JCgnI3B1Ymxpc2hQYWdlJykucmVtb3ZlQXR0cignZGF0YS10b2dnbGUnKTtcbiAgICBcdFx0XHRcdFx0XHQkKCcjcHVibGlzaFBhZ2Ugc3Bhbi50ZXh0LWRhbmdlcicpLmhpZGUoKTtcbiAgICBcdFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0XHQkKCcjcHVibGlzaFBhZ2UnKS50b29sdGlwKCdkZXN0cm95Jyk7XG4gICAgXHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHR9IGVsc2Ugey8vbm9wZSwgY2FuJ3QgdXNlIEZUUFxuICAgIFx0XHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHRcdCQoJyNwdWJsaXNoUGFnZScpLmF0dHIoJ2RhdGEtdG9nZ2xlJywgJ3Rvb2x0aXAnKTtcbiAgICBcdFx0XHRcdFx0XHQkKCcjcHVibGlzaFBhZ2Ugc3Bhbi50ZXh0LWRhbmdlcicpLnNob3coKTtcbiAgICBcdFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0XHQkKCcjcHVibGlzaFBhZ2UnKS50b29sdGlwKCdzaG93Jyk7XG4gICAgXHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHR9XG4gICAgXHRcdFx0XHRcdFxuICAgIFx0XHRcdFx0XHRcbiAgICBcdFx0XHRcdFx0Ly91cGRhdGUgdGhlIHNpdGUgbmFtZSBpbiB0aGUgc21hbGwgd2luZG93XG4gICAgXHRcdFx0XHRcdCQoJyNzaXRlXycrcmV0LnNpdGVJRCsnIC53aW5kb3cgLnRvcCBiJykudGV4dCggcmV0LnNpdGVOYW1lICk7XG4gICAgXHRcdFx0XHRcbiAgICBcdFx0XHRcdH0pO1xuICAgIFx0XHRcdFxuICAgIFx0XHRcdFxuICAgIFx0XHRcdH1cbiAgICBcdFx0XG4gICAgXHRcdH0pO1xuICAgIFx0XHQgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgXG4gICAgfTtcbiAgICBcbiAgICBzaXRlU2V0dGluZ3MuaW5pdCgpO1xuXG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG5cbi8qIGdsb2JhbHMgc2l0ZVVybDpmYWxzZSwgYmFzZVVybDpmYWxzZSAqL1xuICAgIFwidXNlIHN0cmljdFwiO1xuICAgICAgICBcbiAgICB2YXIgYXBwVUkgPSB7XG4gICAgICAgIFxuICAgICAgICBmaXJzdE1lbnVXaWR0aDogMTkwLFxuICAgICAgICBzZWNvbmRNZW51V2lkdGg6IDMwMCxcbiAgICAgICAgbG9hZGVyQW5pbWF0aW9uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9hZGVyJyksXG4gICAgICAgIHNlY29uZE1lbnVUcmlnZ2VyQ29udGFpbmVyczogJCgnI21lbnUgI21haW4gI2VsZW1lbnRDYXRzLCAjbWVudSAjbWFpbiAjdGVtcGxhdGVzVWwnKSxcbiAgICAgICAgc2l0ZVVybDogc2l0ZVVybCxcbiAgICAgICAgYmFzZVVybDogYmFzZVVybCxcbiAgICAgICAgXG4gICAgICAgIHNldHVwOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGYWRlIHRoZSBsb2FkZXIgYW5pbWF0aW9uXG4gICAgICAgICAgICAkKGFwcFVJLmxvYWRlckFuaW1hdGlvbikuZmFkZU91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICQoJyNtZW51JykuYW5pbWF0ZSh7J2xlZnQnOiAwfSwgMTAwMCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVGFic1xuICAgICAgICAgICAgJChcIi5uYXYtdGFicyBhXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICQodGhpcykudGFiKFwic2hvd1wiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKFwic2VsZWN0LnNlbGVjdFwiKS5zZWxlY3QyKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoJzpyYWRpbywgOmNoZWNrYm94JykucmFkaW9jaGVjaygpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUb29sdGlwc1xuICAgICAgICAgICAgJChcIltkYXRhLXRvZ2dsZT10b29sdGlwXVwiKS50b29sdGlwKFwiaGlkZVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVGFibGU6IFRvZ2dsZSBhbGwgY2hlY2tib3hlc1xuICAgICAgICAgICAgJCgnLnRhYmxlIC50b2dnbGUtYWxsIDpjaGVja2JveCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBjaCA9ICR0aGlzLnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAkdGhpcy5jbG9zZXN0KCcudGFibGUnKS5maW5kKCd0Ym9keSA6Y2hlY2tib3gnKS5yYWRpb2NoZWNrKCFjaCA/ICd1bmNoZWNrJyA6ICdjaGVjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEFkZCBzdHlsZSBjbGFzcyBuYW1lIHRvIGEgdG9vbHRpcHNcbiAgICAgICAgICAgICQoXCIudG9vbHRpcFwiKS5hZGRDbGFzcyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBpZiAoJCh0aGlzKS5wcmV2KCkuYXR0cihcImRhdGEtdG9vbHRpcC1zdHlsZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ0b29sdGlwLVwiICsgJCh0aGlzKS5wcmV2KCkuYXR0cihcImRhdGEtdG9vbHRpcC1zdHlsZVwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJChcIi5idG4tZ3JvdXBcIikub24oJ2NsaWNrJywgXCJhXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuc2libGluZ3MoKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKS5lbmQoKS5hZGRDbGFzcyhcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBGb2N1cyBzdGF0ZSBmb3IgYXBwZW5kL3ByZXBlbmQgaW5wdXRzXG4gICAgICAgICAgICAkKCcuaW5wdXQtZ3JvdXAnKS5vbignZm9jdXMnLCAnLmZvcm0tY29udHJvbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCwgLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnZm9jdXMnKTtcbiAgICAgICAgICAgIH0pLm9uKCdibHVyJywgJy5mb3JtLWNvbnRyb2wnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuaW5wdXQtZ3JvdXAsIC5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2ZvY3VzJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gVGFibGU6IFRvZ2dsZSBhbGwgY2hlY2tib3hlc1xuICAgICAgICAgICAgJCgnLnRhYmxlIC50b2dnbGUtYWxsJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoID0gJCh0aGlzKS5maW5kKCc6Y2hlY2tib3gnKS5wcm9wKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcudGFibGUnKS5maW5kKCd0Ym9keSA6Y2hlY2tib3gnKS5jaGVja2JveCghY2ggPyAnY2hlY2snIDogJ3VuY2hlY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUYWJsZTogQWRkIGNsYXNzIHJvdyBzZWxlY3RlZFxuICAgICAgICAgICAgJCgnLnRhYmxlIHRib2R5IDpjaGVja2JveCcpLm9uKCdjaGVjayB1bmNoZWNrIHRvZ2dsZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKVxuICAgICAgICAgICAgICAgICwgY2hlY2sgPSAkdGhpcy5wcm9wKCdjaGVja2VkJylcbiAgICAgICAgICAgICAgICAsIHRvZ2dsZSA9IGUudHlwZSA9PT0gJ3RvZ2dsZSdcbiAgICAgICAgICAgICAgICAsIGNoZWNrYm94ZXMgPSAkKCcudGFibGUgdGJvZHkgOmNoZWNrYm94JylcbiAgICAgICAgICAgICAgICAsIGNoZWNrQWxsID0gY2hlY2tib3hlcy5sZW5ndGggPT09IGNoZWNrYm94ZXMuZmlsdGVyKCc6Y2hlY2tlZCcpLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJ3RyJylbY2hlY2sgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oJ3NlbGVjdGVkLXJvdycpO1xuICAgICAgICAgICAgICAgIGlmICh0b2dnbGUpICR0aGlzLmNsb3Nlc3QoJy50YWJsZScpLmZpbmQoJy50b2dnbGUtYWxsIDpjaGVja2JveCcpLmNoZWNrYm94KGNoZWNrQWxsID8gJ2NoZWNrJyA6ICd1bmNoZWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gU3dpdGNoXG4gICAgICAgICAgICAkKFwiW2RhdGEtdG9nZ2xlPSdzd2l0Y2gnXVwiKS53cmFwKCc8ZGl2IGNsYXNzPVwic3dpdGNoXCIgLz4nKS5wYXJlbnQoKS5ib290c3RyYXBTd2l0Y2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgYXBwVUkuc2Vjb25kTWVudVRyaWdnZXJDb250YWluZXJzLm9uKCdjbGljaycsICdhOm5vdCguYnRuKScsIGFwcFVJLnNlY29uZE1lbnVBbmltYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBzZWNvbmRNZW51QW5pbWF0aW9uOiBmdW5jdGlvbigpe1xuICAgICAgICBcbiAgICAgICAgICAgICQoJyNtZW51ICNtYWluIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdhY3RpdmUnKTtcblx0XG4gICAgICAgICAgICAvL3Nob3cgb25seSB0aGUgcmlnaHQgZWxlbWVudHNcbiAgICAgICAgICAgICQoJyNtZW51ICNzZWNvbmQgdWwgbGknKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcjbWVudSAjc2Vjb25kIHVsIGxpLicrJCh0aGlzKS5hdHRyKCdpZCcpKS5zaG93KCk7XG5cbiAgICAgICAgICAgIGlmKCAkKHRoaXMpLmF0dHIoJ2lkJykgPT09ICdhbGwnICkge1xuICAgICAgICAgICAgICAgICQoJyNtZW51ICNzZWNvbmQgdWwjZWxlbWVudHMgbGknKS5zaG93KCk7XHRcdFxuICAgICAgICAgICAgfVxuXHRcbiAgICAgICAgICAgICQoJy5tZW51IC5zZWNvbmQnKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKS5zdG9wKCkuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGFwcFVJLnNlY29uZE1lbnVXaWR0aFxuICAgICAgICAgICAgfSwgNTAwKTtcdFxuICAgICAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgLy9pbml0aWF0ZSB0aGUgVUlcbiAgICBhcHBVSS5zZXR1cCgpO1xuXG5cbiAgICAvLyoqKiogRVhQT1JUU1xuICAgIG1vZHVsZS5leHBvcnRzLmFwcFVJID0gYXBwVUk7XG4gICAgXG59KCkpOyIsIihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBhcHBVSSA9IHJlcXVpcmUoJy4vdWkuanMnKS5hcHBVSTtcblx0XG5cdHZhciB1c2VycyA9IHtcbiAgICAgICAgXG4gICAgICAgIGJ1dHRvbkNyZWF0ZUFjY291bnQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidXR0b25DcmVhdGVBY2NvdW50JyksXG4gICAgICAgIHdyYXBwZXJVc2VyczogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJzJyksXG4gICAgICAgIFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCh0aGlzLmJ1dHRvbkNyZWF0ZUFjY291bnQpLm9uKCdjbGljaycsIHRoaXMuY3JlYXRlQWNjb3VudCk7XG4gICAgICAgICAgICAkKHRoaXMud3JhcHBlclVzZXJzKS5vbignY2xpY2snLCAnLnVwZGF0ZVVzZXJCdXR0b24nLCB0aGlzLnVwZGF0ZVVzZXIpO1xuICAgICAgICAgICAgJCh0aGlzLndyYXBwZXJVc2Vycykub24oJ2NsaWNrJywgJy5wYXNzd29yZFJlc2V0JywgdGhpcy5wYXNzd29yZFJlc2V0KTtcbiAgICAgICAgICAgICQodGhpcy53cmFwcGVyVXNlcnMpLm9uKCdjbGljaycsICcuZGVsZXRlVXNlckJ1dHRvbicsIHRoaXMuZGVsZXRlVXNlcik7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgY3JlYXRlcyBhIG5ldyB1c2VyIGFjY291bnRcbiAgICAgICAgKi9cbiAgICAgICAgY3JlYXRlQWNjb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vYWxsIGl0ZW1zIHByZXNlbnQ/XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhbGxHb29kID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNmaXJzdG5hbWUnKS52YWwoKSA9PT0gJycgKSB7XG4gICAgICAgICAgICAgICAgJCgnI25ld1VzZXJNb2RhbCBmb3JtIGlucHV0I2ZpcnN0bmFtZScpLnBhcmVudCgpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI25ld1VzZXJNb2RhbCBmb3JtIGlucHV0I2ZpcnN0bmFtZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcdFx0XHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNsYXN0bmFtZScpLnZhbCgpID09PSAnJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIGZvcm0gaW5wdXQjbGFzdG5hbWUnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNsYXN0bmFtZScpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNlbWFpbCcpLnZhbCgpID09PSAnJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIGZvcm0gaW5wdXQjZW1haWwnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNlbWFpbCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNwYXNzd29yZCcpLnZhbCgpID09PSAnJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIGZvcm0gaW5wdXQjcGFzc3dvcmQnKS5wYXJlbnQoKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNuZXdVc2VyTW9kYWwgZm9ybSBpbnB1dCNwYXNzd29yZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgIH1cblx0XHRcbiAgICAgICAgICAgIGlmKCBhbGxHb29kID09PSAxICkge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIG9sZCBhbGVydHNcbiAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIC5tb2RhbC1hbGVydHMgPiAqJykuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgLy9kaXNhYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAgICAgJCgnI25ld1VzZXJNb2RhbCAubG9hZGVyJykuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAkKCcjbmV3VXNlck1vZGFsIGZvcm0nKS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiAgJCgnI25ld1VzZXJNb2RhbCBmb3JtJykuc2VyaWFsaXplKClcbiAgICAgICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKHJldCl7XG5cdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgLy9lbmFibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICQoJ2J1dHRvbiNidXR0b25DcmVhdGVBY2NvdW50JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9oaWRlIGxvYWRlclxuICAgICAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIC5sb2FkZXInKS5oaWRlKCk7XG5cdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDAgKSB7Ly9lcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIC5tb2RhbC1hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7Ly9hbGwgZ29vZFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbmV3VXNlck1vZGFsIC5tb2RhbC1hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN1c2VycyA+IConKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyN1c2VycycpLmFwcGVuZCggJChyZXQudXNlcnMpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjdXNlcnMgZm9ybSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKS5jaGVja2JveCgpO1xuXHRcdFx0XHRcdFxuICAgICAgICAgICAgICAgICAgICAgICAgKCcudXNlclNpdGVzIC5zaXRlIGlmcmFtZScpLmVhY2goZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aGVIZWlnaHQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaGVpZ2h0JykqMC4yNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLndpZHRoKCAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKHRoaXMpLnpvb21lcih7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpvb206IDAuMjUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhlSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogJCh0aGlzKS5jbG9zZXN0KCcudGFiLXBhbmUnKS53aWR0aCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlVVJMOiBhcHBVSS5zaXRlVXJsK1wic2l0ZXMvXCIrJCh0aGlzKS5hdHRyKCdkYXRhLXNpdGVpZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuc2l0ZScpLmZpbmQoJy56b29tZXItY292ZXIgPiBhJykuYXR0cigndGFyZ2V0JywgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIHVwZGF0ZXMgYSB1c2VyXG4gICAgICAgICovXG4gICAgICAgIHVwZGF0ZVVzZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vZGlzYWJsZSBidXR0b25cbiAgICAgICAgICAgIHZhciB0aGVCdXR0b24gPSAkKHRoaXMpO1x0XHRcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFxuICAgICAgICAgICAgLy9zaG93IGxvYWRlclxuICAgICAgICAgICAgJCh0aGlzKS5jbG9zZXN0KCcuYm90dG9tJykuZmluZCgnLmxvYWRlcicpLmZhZGVJbig1MDApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogJCh0aGlzKS5jbG9zZXN0KCdmb3JtJykuYXR0cignYWN0aW9uJyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YTogJCh0aGlzKS5jbG9zZXN0KCdmb3JtJykuc2VyaWFsaXplKClcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmV0KXtcblx0XHRcbiAgICAgICAgICAgICAgICAvL2VuYWJsZSBidXR0b25cbiAgICAgICAgICAgICAgICB0aGVCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0XHRcbiAgICAgICAgICAgICAgICAvL2hpZGUgbG9hZGVyXG4gICAgICAgICAgICAgICAgdGhlQnV0dG9uLmNsb3Nlc3QoJy5ib3R0b20nKS5maW5kKCcubG9hZGVyJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKCByZXQucmVzcG9uc2VDb2RlID09PSAwICkgey8vZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5jbG9zZXN0KCcuYm90dG9tJykuZmluZCgnLmFsZXJ0cycpLmFwcGVuZCggJChyZXQucmVzcG9uc2VIVE1MKSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmV0LnJlc3BvbnNlQ29kZSA9PT0gMSkgey8vYWxsIGdvb2RcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5jbG9zZXN0KCcuYm90dG9tJykuZmluZCgnLmFsZXJ0cycpLmFwcGVuZCggJChyZXQucmVzcG9uc2VIVE1MKSApO1x0XHRcdFx0XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL2FwcGVuZCB1c2VyIGRldGFpbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGVQYW5lID0gdGhlQnV0dG9uLmNsb3Nlc3QoJy50YWItcGFuZScpO1xuXHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhlUGFuZS5jbG9zZXN0KCcuYm90dG9tJykuZmluZCgnLmFsZXJ0LXN1Y2Nlc3MnKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24oKXskKHRoaXMucmVtb3ZlKCkpO30pO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5jbG9zZXN0KCdmb3JtJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB0aGVQYW5lLnByZXBlbmQoICQocmV0LnVzZXJEZXRhaWxGb3JtKSApO1xuICAgICAgICAgICAgICAgICAgICB0aGVQYW5lLmZpbmQoJ2Zvcm0gaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJykuY2hlY2tib3goKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgLypcbiAgICAgICAgICAgIHBhc3N3b3JkIHJlc2V0XG4gICAgICAgICovXG4gICAgICAgIHBhc3N3b3JkUmVzZXQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdGhlQnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9kaXNhYmxlIGJ1dHRvbnNcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ib3R0b20nKS5maW5kKCcudXBkYXRlVXNlckJ1dHRvbicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5ib3R0b20nKS5maW5kKCcubG9hZGVyJykuZmFkZUluKCk7XG5cdFx0XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogYXBwVUkuc2l0ZVVybCtcInVzZXJzL3Jwdy9cIiskKHRoaXMpLmF0dHIoJ2RhdGEtdXNlcmlkJyksXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2VuYWJsZSBidXR0b25zXG4gICAgICAgICAgICAgICAgdGhlQnV0dG9uLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5jbG9zZXN0KCcuYm90dG9tJykuZmluZCgnLnVwZGF0ZVVzZXJCdXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblxuICAgICAgICAgICAgICAgIC8vaGlkZSBsb2FkZXJcbiAgICAgICAgICAgICAgICB0aGVCdXR0b24uY2xvc2VzdCgnLmJvdHRvbScpLmZpbmQoJy5sb2FkZXInKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCh0aGVCdXR0b24pLmNsb3Nlc3QoJy5ib3R0b20nKS5maW5kKCcuYWxlcnRzJykuYXBwZW5kKCAkKHJldC5yZXNwb25zZUhUTUwpICk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDAgKSB7Ly9lcnJvclxuXHRcdFx0XG5cdFx0XHRcdH0gZWxzZSBpZiggcmV0LnJlc3BvbnNlQ29kZSA9PT0gMSApIHsvL2FsbCBnb29kXG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhlQnV0dG9uLmNsb3Nlc3QoJy5ib3R0b20nKS5maW5kKCcuYWxlcnRzID4gKicpLmZhZGVPdXQoNTAwLCBmdW5jdGlvbigpeyQodGhpcykucmVtb3ZlKCk7fSk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgZGVsZXRlcyBhIHVzZXIgYWNjb3VudFxuICAgICAgICAqL1xuICAgICAgICBkZWxldGVVc2VyOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy9zZXR1cCBkZWxldGUgbGlua1xuICAgICAgICAgICAgJCgnI2RlbGV0ZVVzZXJNb2RhbCBhI2RlbGV0ZVVzZXJCdXR0b24nKS5hdHRyKCdocmVmJywgJCh0aGlzKS5hdHRyKCdocmVmJykpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL21vZGFsXG4gICAgICAgICAgICAkKCcjZGVsZXRlVXNlck1vZGFsJykubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgdXNlcnMuaW5pdCgpO1xuXHRcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0cmVxdWlyZSgnLi9tb2R1bGVzL3VpJyk7XG5cdHJlcXVpcmUoJy4vbW9kdWxlcy91c2VycycpO1xuXHRyZXF1aXJlKCcuL21vZHVsZXMvYWNjb3VudCcpO1xuXHRyZXF1aXJlKCcuL21vZHVsZXMvc2l0ZXNldHRpbmdzJyk7XG5cdHJlcXVpcmUoJy4vbW9kdWxlcy9zaXRlcycpO1xuXG5cdCQoJy51c2VyU2l0ZXMgLnNpdGUgaWZyYW1lJykuZWFjaChmdW5jdGlvbigpe1xuICAgIFx0ICAgIFx0XG4gICAgICAgIHZhciB0aGVIZWlnaHQgPSAkKHRoaXMpLmF0dHIoJ2RhdGEtaGVpZ2h0JykqMC4yNTtcbiAgICBcdFx0XG4gICAgICAgIC8vYWxlcnQoJCh0aGlzKS5jbG9zZXN0KCcudGFiLWNvbnRlbnQnKS5pbm5lcldpZHRoKCkpXG4gICAgXHRcdCAgICBcdCAgICBcdFxuICAgICAgICAkKHRoaXMpLnpvb21lcih7XG4gICAgICAgICAgICB6b29tOiAwLjIwLFxuICAgICAgICAgICAgaGVpZ2h0OiB0aGVIZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogJCh0aGlzKS5jbG9zZXN0KCcudGFiLWNvbnRlbnQnKS53aWR0aCgpLFxuICAgICAgICAgICAgbWVzc2FnZTogXCJcIixcbiAgICAgICAgICAgIG1lc3NhZ2VVUkw6IFwiPD9waHAgZWNobyBzaXRlX3VybCgnc2l0ZXMnKT8+L1wiKyQodGhpcykuYXR0cignZGF0YS1zaXRlaWQnKVxuICAgICAgICB9KTtcbiAgICBcdFx0XG4gICAgICAgICQodGhpcykuY2xvc2VzdCgnLnNpdGUnKS5maW5kKCcuem9vbWVyLWNvdmVyID4gYScpLmF0dHIoJ3RhcmdldCcsICcnKTtcbiAgICBcdFxuICAgIH0pXG5cbn0oKSk7Il19
