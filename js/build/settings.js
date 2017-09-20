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
},{"./ui.js":2}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
(function () {
	"use strict";

	require('./modules/account');

	$('#configHelp').affix({
        offset: {
            top: 200
        }
    });
    
    //set the width for the configHelp
    $('.configHelp').width( $('.configHelp').width() )
    	    	
    //help info
    $('form.settingsForm textarea').focus(function(){
	    	
        $('#configHelp > div:first').html( $(this).next().html() );
	    	
        $('#configHelp').fadeIn(500);
	    	
        //set the width for the configHelp
        $('.configHelp').width( $('.configHelp').width() )
	    	
    });
    	
    $('form.settingsForm textarea').blur(function(){
	    	
        $('#configHelp').hide();
	    	
    });

}());
},{"./modules/account":1}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9tb2R1bGVzL2FjY291bnQuanMiLCJqcy9tb2R1bGVzL3VpLmpzIiwianMvc2V0dGluZ3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXG5cdHZhciBhcHBVSSA9IHJlcXVpcmUoJy4vdWkuanMnKS5hcHBVSTtcblxuXHR2YXIgYWNjb3VudCA9IHtcbiAgICAgICAgXG4gICAgICAgIGJ1dHRvblVwZGF0ZUFjY291bnREZXRhaWxzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjb3VudERldGFpbHNTdWJtaXQnKSxcbiAgICAgICAgYnV0dG9uVXBkYXRlTG9naW5EZXRhaWxzOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNjb3VudExvZ2luU3VibWl0JyksXG4gICAgICAgIFxuICAgICAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCh0aGlzLmJ1dHRvblVwZGF0ZUFjY291bnREZXRhaWxzKS5vbignY2xpY2snLCB0aGlzLnVwZGF0ZUFjY291bnREZXRhaWxzKTtcbiAgICAgICAgICAgICQodGhpcy5idXR0b25VcGRhdGVMb2dpbkRldGFpbHMpLm9uKCdjbGljaycsIHRoaXMudXBkYXRlTG9naW5EZXRhaWxzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8qXG4gICAgICAgICAgICB1cGRhdGVzIGFjY291bnQgZGV0YWlsc1xuICAgICAgICAqL1xuICAgICAgICB1cGRhdGVBY2NvdW50RGV0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vYWxsIGZpZWxkcyBmaWxsZWQgaW4/XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBhbGxHb29kID0gMTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykudmFsKCkgPT09ICcnICkge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5hZGRDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjZmlyc3RuYW1lJykuY2xvc2VzdCgnLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnaGFzLWVycm9yJyk7XG4gICAgICAgICAgICAgICAgYWxsR29vZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCAkKCcjYWNjb3VudF9kZXRhaWxzIGlucHV0I2xhc3RuYW1lJykudmFsKCkgPT09ICcnICkge1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2RldGFpbHMgaW5wdXQjbGFzdG5hbWUnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyBpbnB1dCNsYXN0bmFtZScpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAxO1xuICAgICAgICAgICAgfVxuXHRcdFxuICAgICAgICAgICAgaWYoIGFsbEdvb2QgPT09IDEgKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGhlQnV0dG9uID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAubG9hZGVyJykuZmFkZUluKDUwMCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgYWxlcnRzXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAuYWxlcnRzID4gKicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogYXBwVUkuc2l0ZVVybCtcInVzZXJzL3VhY2NvdW50XCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCgnI2FjY291bnRfZGV0YWlscycpLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihyZXQpe1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9lbmFibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHRoZUJ1dHRvbi5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vaGlkZSBsb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2FjY291bnRfZGV0YWlscyAubG9hZGVyJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9kZXRhaWxzIC5hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggcmV0LnJlc3BvbnNlQ29kZSA9PT0gMSApIHsvL3N1Y2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkgeyBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9kZXRhaWxzIC5hbGVydHMgPiAqJykuZmFkZU91dCg1MDAsIGZ1bmN0aW9uICgpIHsgJCh0aGlzKS5yZW1vdmUoKTsgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvKlxuICAgICAgICAgICAgdXBkYXRlcyBhY2NvdW50IGxvZ2luIGRldGFpbHNcbiAgICAgICAgKi9cbiAgICAgICAgdXBkYXRlTG9naW5EZXRhaWxzOiBmdW5jdGlvbigpIHtcblx0XHRcdFxuXHRcdFx0Y29uc29sZS5sb2coYXBwVUkpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgYWxsR29vZCA9IDE7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmKCAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLnZhbCgpID09PSAnJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykuYWRkQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCcjYWNjb3VudF9sb2dpbiBpbnB1dCNlbWFpbCcpLmNsb3Nlc3QoJy5mb3JtLWdyb3VwJykucmVtb3ZlQ2xhc3MoJ2hhcy1lcnJvcicpO1xuICAgICAgICAgICAgICAgIGFsbEdvb2QgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiggJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS52YWwoKSA9PT0gJycgKSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gaW5wdXQjcGFzc3dvcmQnKS5jbG9zZXN0KCcuZm9ybS1ncm91cCcpLnJlbW92ZUNsYXNzKCdoYXMtZXJyb3InKTtcbiAgICAgICAgICAgICAgICBhbGxHb29kID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYoIGFsbEdvb2QgPT09IDEgKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHRoZUJ1dHRvbiA9ICQodGhpcyk7XG5cbiAgICAgICAgICAgICAgICAvL2Rpc2FibGUgYnV0dG9uXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvL3Nob3cgbG9hZGVyXG4gICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gLmxvYWRlcicpLmZhZGVJbig1MDApO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIC8vcmVtb3ZlIGFsZXJ0c1xuICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5hbGVydHMgPiAqJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBhcHBVSS5zaXRlVXJsK1widXNlcnMvdWxvZ2luXCIsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogJCgnI2FjY291bnRfbG9naW4nKS5zZXJpYWxpemUoKVxuICAgICAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24ocmV0KXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vZW5hYmxlIGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0aGVCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvL2hpZGUgbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5sb2FkZXInKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJyNhY2NvdW50X2xvZ2luIC5hbGVydHMnKS5hcHBlbmQoICQocmV0LnJlc3BvbnNlSFRNTCkgKTtcblx0XHRcdFx0XHRcbiAgICAgICAgICAgICAgICAgICAgaWYoIHJldC5yZXNwb25zZUNvZGUgPT09IDEgKSB7Ly9zdWNjZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2FjY291bnRfbG9naW4gLmFsZXJ0cyA+IConKS5mYWRlT3V0KDUwMCwgZnVuY3Rpb24gKCkgeyAkKHRoaXMpLnJlbW92ZSgpOyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH07XG4gICAgXG4gICAgYWNjb3VudC5pbml0KCk7XG5cbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcblxuLyogZ2xvYmFscyBzaXRlVXJsOmZhbHNlLCBiYXNlVXJsOmZhbHNlICovXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG4gICAgICAgIFxuICAgIHZhciBhcHBVSSA9IHtcbiAgICAgICAgXG4gICAgICAgIGZpcnN0TWVudVdpZHRoOiAxOTAsXG4gICAgICAgIHNlY29uZE1lbnVXaWR0aDogMzAwLFxuICAgICAgICBsb2FkZXJBbmltYXRpb246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2FkZXInKSxcbiAgICAgICAgc2Vjb25kTWVudVRyaWdnZXJDb250YWluZXJzOiAkKCcjbWVudSAjbWFpbiAjZWxlbWVudENhdHMsICNtZW51ICNtYWluICN0ZW1wbGF0ZXNVbCcpLFxuICAgICAgICBzaXRlVXJsOiBzaXRlVXJsLFxuICAgICAgICBiYXNlVXJsOiBiYXNlVXJsLFxuICAgICAgICBcbiAgICAgICAgc2V0dXA6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEZhZGUgdGhlIGxvYWRlciBhbmltYXRpb25cbiAgICAgICAgICAgICQoYXBwVUkubG9hZGVyQW5pbWF0aW9uKS5mYWRlT3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgJCgnI21lbnUnKS5hbmltYXRlKHsnbGVmdCc6IDB9LCAxMDAwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUYWJzXG4gICAgICAgICAgICAkKFwiLm5hdi10YWJzIGFcIikub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS50YWIoXCJzaG93XCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgICQoXCJzZWxlY3Quc2VsZWN0XCIpLnNlbGVjdDIoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJCgnOnJhZGlvLCA6Y2hlY2tib3gnKS5yYWRpb2NoZWNrKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRvb2x0aXBzXG4gICAgICAgICAgICAkKFwiW2RhdGEtdG9nZ2xlPXRvb2x0aXBdXCIpLnRvb2x0aXAoXCJoaWRlXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUYWJsZTogVG9nZ2xlIGFsbCBjaGVja2JveGVzXG4gICAgICAgICAgICAkKCcudGFibGUgLnRvZ2dsZS1hbGwgOmNoZWNrYm94Jykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNoID0gJHRoaXMucHJvcCgnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICR0aGlzLmNsb3Nlc3QoJy50YWJsZScpLmZpbmQoJ3Rib2R5IDpjaGVja2JveCcpLnJhZGlvY2hlY2soIWNoID8gJ3VuY2hlY2snIDogJ2NoZWNrJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gQWRkIHN0eWxlIGNsYXNzIG5hbWUgdG8gYSB0b29sdGlwc1xuICAgICAgICAgICAgJChcIi50b29sdGlwXCIpLmFkZENsYXNzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLnByZXYoKS5hdHRyKFwiZGF0YS10b29sdGlwLXN0eWxlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInRvb2x0aXAtXCIgKyAkKHRoaXMpLnByZXYoKS5hdHRyKFwiZGF0YS10b29sdGlwLXN0eWxlXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAkKFwiLmJ0bi1ncm91cFwiKS5vbignY2xpY2snLCBcImFcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgJCh0aGlzKS5zaWJsaW5ncygpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpLmVuZCgpLmFkZENsYXNzKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIEZvY3VzIHN0YXRlIGZvciBhcHBlbmQvcHJlcGVuZCBpbnB1dHNcbiAgICAgICAgICAgICQoJy5pbnB1dC1ncm91cCcpLm9uKCdmb2N1cycsICcuZm9ybS1jb250cm9sJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmlucHV0LWdyb3VwLCAuZm9ybS1ncm91cCcpLmFkZENsYXNzKCdmb2N1cycpO1xuICAgICAgICAgICAgfSkub24oJ2JsdXInLCAnLmZvcm0tY29udHJvbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5pbnB1dC1ncm91cCwgLmZvcm0tZ3JvdXAnKS5yZW1vdmVDbGFzcygnZm9jdXMnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBUYWJsZTogVG9nZ2xlIGFsbCBjaGVja2JveGVzXG4gICAgICAgICAgICAkKCcudGFibGUgLnRvZ2dsZS1hbGwnKS5vbignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2ggPSAkKHRoaXMpLmZpbmQoJzpjaGVja2JveCcpLnByb3AoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy50YWJsZScpLmZpbmQoJ3Rib2R5IDpjaGVja2JveCcpLmNoZWNrYm94KCFjaCA/ICdjaGVjaycgOiAndW5jaGVjaycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIFRhYmxlOiBBZGQgY2xhc3Mgcm93IHNlbGVjdGVkXG4gICAgICAgICAgICAkKCcudGFibGUgdGJvZHkgOmNoZWNrYm94Jykub24oJ2NoZWNrIHVuY2hlY2sgdG9nZ2xlJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgJHRoaXMgPSAkKHRoaXMpXG4gICAgICAgICAgICAgICAgLCBjaGVjayA9ICR0aGlzLnByb3AoJ2NoZWNrZWQnKVxuICAgICAgICAgICAgICAgICwgdG9nZ2xlID0gZS50eXBlID09PSAndG9nZ2xlJ1xuICAgICAgICAgICAgICAgICwgY2hlY2tib3hlcyA9ICQoJy50YWJsZSB0Ym9keSA6Y2hlY2tib3gnKVxuICAgICAgICAgICAgICAgICwgY2hlY2tBbGwgPSBjaGVja2JveGVzLmxlbmd0aCA9PT0gY2hlY2tib3hlcy5maWx0ZXIoJzpjaGVja2VkJykubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgJHRoaXMuY2xvc2VzdCgndHInKVtjaGVjayA/ICdhZGRDbGFzcycgOiAncmVtb3ZlQ2xhc3MnXSgnc2VsZWN0ZWQtcm93Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHRvZ2dsZSkgJHRoaXMuY2xvc2VzdCgnLnRhYmxlJykuZmluZCgnLnRvZ2dsZS1hbGwgOmNoZWNrYm94JykuY2hlY2tib3goY2hlY2tBbGwgPyAnY2hlY2snIDogJ3VuY2hlY2snKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyBTd2l0Y2hcbiAgICAgICAgICAgICQoXCJbZGF0YS10b2dnbGU9J3N3aXRjaCddXCIpLndyYXAoJzxkaXYgY2xhc3M9XCJzd2l0Y2hcIiAvPicpLnBhcmVudCgpLmJvb3RzdHJhcFN3aXRjaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICBhcHBVSS5zZWNvbmRNZW51VHJpZ2dlckNvbnRhaW5lcnMub24oJ2NsaWNrJywgJ2E6bm90KC5idG4pJywgYXBwVUkuc2Vjb25kTWVudUFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgIHNlY29uZE1lbnVBbmltYXRpb246IGZ1bmN0aW9uKCl7XG4gICAgICAgIFxuICAgICAgICAgICAgJCgnI21lbnUgI21haW4gYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHRcbiAgICAgICAgICAgIC8vc2hvdyBvbmx5IHRoZSByaWdodCBlbGVtZW50c1xuICAgICAgICAgICAgJCgnI21lbnUgI3NlY29uZCB1bCBsaScpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJyNtZW51ICNzZWNvbmQgdWwgbGkuJyskKHRoaXMpLmF0dHIoJ2lkJykpLnNob3coKTtcblxuICAgICAgICAgICAgaWYoICQodGhpcykuYXR0cignaWQnKSA9PT0gJ2FsbCcgKSB7XG4gICAgICAgICAgICAgICAgJCgnI21lbnUgI3NlY29uZCB1bCNlbGVtZW50cyBsaScpLnNob3coKTtcdFx0XG4gICAgICAgICAgICB9XG5cdFxuICAgICAgICAgICAgJCgnLm1lbnUgLnNlY29uZCcpLmNzcygnZGlzcGxheScsICdibG9jaycpLnN0b3AoKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogYXBwVUkuc2Vjb25kTWVudVdpZHRoXG4gICAgICAgICAgICB9LCA1MDApO1x0XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfTtcbiAgICBcbiAgICAvL2luaXRpYXRlIHRoZSBVSVxuICAgIGFwcFVJLnNldHVwKCk7XG5cblxuICAgIC8vKioqKiBFWFBPUlRTXG4gICAgbW9kdWxlLmV4cG9ydHMuYXBwVUkgPSBhcHBVSTtcbiAgICBcbn0oKSk7IiwiKGZ1bmN0aW9uICgpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cblx0cmVxdWlyZSgnLi9tb2R1bGVzL2FjY291bnQnKTtcblxuXHQkKCcjY29uZmlnSGVscCcpLmFmZml4KHtcbiAgICAgICAgb2Zmc2V0OiB7XG4gICAgICAgICAgICB0b3A6IDIwMFxuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgLy9zZXQgdGhlIHdpZHRoIGZvciB0aGUgY29uZmlnSGVscFxuICAgICQoJy5jb25maWdIZWxwJykud2lkdGgoICQoJy5jb25maWdIZWxwJykud2lkdGgoKSApXG4gICAgXHQgICAgXHRcbiAgICAvL2hlbHAgaW5mb1xuICAgICQoJ2Zvcm0uc2V0dGluZ3NGb3JtIHRleHRhcmVhJykuZm9jdXMoZnVuY3Rpb24oKXtcblx0ICAgIFx0XG4gICAgICAgICQoJyNjb25maWdIZWxwID4gZGl2OmZpcnN0JykuaHRtbCggJCh0aGlzKS5uZXh0KCkuaHRtbCgpICk7XG5cdCAgICBcdFxuICAgICAgICAkKCcjY29uZmlnSGVscCcpLmZhZGVJbig1MDApO1xuXHQgICAgXHRcbiAgICAgICAgLy9zZXQgdGhlIHdpZHRoIGZvciB0aGUgY29uZmlnSGVscFxuICAgICAgICAkKCcuY29uZmlnSGVscCcpLndpZHRoKCAkKCcuY29uZmlnSGVscCcpLndpZHRoKCkgKVxuXHQgICAgXHRcbiAgICB9KTtcbiAgICBcdFxuICAgICQoJ2Zvcm0uc2V0dGluZ3NGb3JtIHRleHRhcmVhJykuYmx1cihmdW5jdGlvbigpe1xuXHQgICAgXHRcbiAgICAgICAgJCgnI2NvbmZpZ0hlbHAnKS5oaWRlKCk7XG5cdCAgICBcdFxuICAgIH0pO1xuXG59KCkpOyJdfQ==
