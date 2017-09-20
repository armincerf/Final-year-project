<?php $this->load->view("shared/header.php");?>

<body class="login">
    
    <div class="container">
    
    	<div class="row">
    	
    		<div class="col-md-4 col-md-offset-4">

                <div class="main-logo">
                    <svg class="main-logo__svg" width="56" height="56" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                      <g>
                        <path class="main-logo__svg-path" d="m18.8,14c-1.2,-0.2 -2.3,0.1 -3.2,0.6c-0.8,0.5 -1.8,0.2 -2.4,-0.7c-0.4,-0.8 -0.2,-1.8 0.7,-2.3c1.4,-0.7 3,-1.2 4.7,-1.1c-0.2,-0.1 -0.4,-0.2 -0.6,-0.4c-0.8,-0.7 -1.8,-1.3 -3,-1.4c-2.6,-0.3 -5.1,1.5 -5.4,4s1.6,4.9 4.2,5.2c1.2,0.1 2.3,-0.1 3.2,-0.6c0.8,-0.5 1.8,-0.2 2.4,0.7c0.4,0.8 0.2,1.8 -0.7,2.3c-1.3,0.7 -3,1.2 -4.7,1.1c0.2,0.1 0.4,0.2 0.6,0.4c0.8,0.7 1.8,1.3 3,1.4c2.6,0.3 5.1,-1.5 5.4,-4c0.4,-2.4 -1.5,-4.8 -4.2,-5.2zm-2.8,-14c-8.8,0 -16,7.2 -16,16s7.2,16 16,16c8.8,0 16,-7.2 16,-16s-7.2,-16 -16,-16zm10.5,19.7c-0.6,4.5 -4.8,7.5 -9.4,7c-2,-0.3 -3.7,-1.2 -4.9,-2.4c-0.7,-0.7 -0.7,-1.8 0,-2.4c0.3,-0.3 0.7,-0.4 1,-0.5c-4.4,-0.6 -7.6,-4.7 -7.1,-9c0.6,-4.5 4.8,-7.5 9.3,-7c2,0.2 3.7,1.2 5,2.4c0.7,0.7 0.7,1.8 0,2.4c-0.3,0.3 -0.7,0.4 -1,0.5c4.5,0.6 7.7,4.6 7.1,9z" fill="#ffffff">
                      </g>
                    </svg>
                </div>

                <h2 class="logo-text">WebWizard</h2>
    		
    			<!-- <h2 class="text-center">
    				<?php echo $this->lang->line('login_sitetitle')?>
    			</h2> -->
    			
    			<p><?php echo sprintf(lang('forgot_password_subheading'), $identity_label);?></p>
    			
    			<!--<p><?php echo lang('login_subheading');?></p>-->
    			
    			<?php if( isset($message) && $message != '' ):?>
    			<div class="alert alert-success">
    				<button data-dismiss="alert" class="close fui-cross" type="button"></button>
    				<?php echo $message;?>
    			</div>
    			<?php endif;?>
    			    		
    			<form role="form" action="<?php echo site_url("auth/forgot_password");?>" method="post">
    				
    				<div class="input-group">
    					<span class="input-group-btn">
    						 <button class="btn"><span class="fui-user"></span></button>
    					</span>
    			    	<input type="email" class="form-control" id="email" name="email" placeholder="Your email address">
   					</div>    			  	
   					    			 	
    			  	<button type="submit" class="btn btn-primary btn-forgot btn-block"><?php echo lang('forgot_password_submit_btn')?> <span class="fui-triangle-right-large"></span></button>
                    <div class="text-center">
                        <a href="<?php echo site_url("login");?>" style="font-size: 15px"><span class="fui-arrow-left"></span> <?php echo $this->lang->line('createuser_backlink')?></a>
                    </div>
    			  	
    			</form>
    		
    		</div><!-- /.col -->
    	
    	</div><!-- /.row -->
    
    </div><!-- /.container -->
    
    <!-- Load JS here for greater good =============================-->
    <?php if( ENVIRONMENT == 'development' ):?>
    <script src="<?php echo base_url('js/vendor/jquery.min.js');?>"></script>
    <script src="<?php echo base_url('js/vendor/flat-ui-pro.min.js');?>"></script>
    <?php else:?>
    <script src="<?php echo base_url('js/build/login.min.js');?>"></script>
    <?php endif;?>
    
  </body>
</html>
