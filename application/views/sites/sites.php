<?php $this->load->view("shared/header.php");?>

<body>
    <div class="wrapper">
  	
      	<?php $this->load->view("shared/nav.php");?> 
      	  	
        <div class="container-fluid">


        	<?php if( $this->session->flashdata('error') !='' ):?>
        	<div class="row margin-top-20">
        		<div class="col-md-12">
        			<div class="alert alert-danger margin-bottom-0">
        	  			<button type="button" class="close fui-cross" data-dismiss="alert"></button>
        	  			<?php echo $this->session->flashdata('error');?>
        			</div>
        		</div><!-- /.col -->
        	</div>
        	<?php endif;?>


            <div class="sites-header">
                <h2>Welcome!</h2>
                <p>Edit an existing site or create a new one by clicking the buttons below!</p>
                <!--<a href="<?php echo site_url('sites/create')?>" class="btn btn-lg btn-primary btn-embossed btn-wide margin-top-40"><span class="fui-plus"></span> <?php echo $this->lang->line('sites_createnewsite')?></a>-->
                <a href="#createSiteModal" class="btn btn-lg btn-primary btn-embossed btn-wide margin-top-40" id="createSiteButton"><span class="fui-plus"></span> <?php echo $this->lang->line('sites_createnewsite')?></a>
            </div>
        	
        	<hr class="dashed">
        	
        	<div class="controls-items">
               <h3 class="page_indecator">Saved Sites:</h3>
                
                <?php if( $this->ion_auth->is_admin() ):?> <!-- show filter by user option if current user is admin -->

                  
                    <div class="form-group">
                        <select name="userDropDown" id="userDropDown" class="form-control select select-inverse select-block  mbl <?php if( !isset($sites) || count( $sites ) == 0 ):?>disabled<?php endif;?>">
                            <option value=""><?php echo $this->lang->line('sites_filterbyuser')?></option>
                            <option value="All"><?php echo $this->lang->line('sites_filterbyuserall')?></option>
                            <?php foreach( $users as $user ):?>
                            <option value="<?php echo $user->first_name;?> <?php echo $user->last_name;?>"><?php echo $user->first_name;?> <?php echo $user->last_name;?></option>
                            <?php endforeach?>
                        </select>
                    </div>
                    

                <?php endif;?>
                

                
                    <div class="form-group">
                        <select name="sortDropDown" id="sortDropDown" class="form-control select select-inverse select-block mbl" <?php if( !isset($sites) || count( $sites ) == 0 ):?>disabled<?php endif;?>>
                            <option value=""><?php echo $this->lang->line('sites_sortby')?></option>
                            <option value="CreationDate"><?php echo $this->lang->line('sites_sortby_creationdate')?></option>
                            <option value="LastUpdate"><?php echo $this->lang->line('sites_sortby_lastupdated')?></option>
                            <option value="NoOfPages"><?php echo $this->lang->line('sites_sortby_numberofpages')?></option>
                        </select>
                    </div>
                

            </div>
        	
        	<div class="row"> <!-- masonry -->
        	
        		<?php if( isset($sites) && count( $sites ) > 0 ):?>
        	
        		<div class="col-md-12">
        		
        			<div class="sites" id="sites">
        			
        				<?php foreach( $sites as $site ):?>
        			
        				<div class="site" data-name="<?php echo $site['siteData']->first_name;?> <?php echo $site['siteData']->last_name;?>" data-pages="<?php echo $site['nrOfPages'];?>" data-created="<?php echo date("Y-m-d", $site['siteData']->sites_created_on);?>" data-update="<?php if( $site['siteData']->sites_lastupdate_on != '' ){echo date("Y-m-d", $site['siteData']->sites_lastupdate_on);}?>" id="site_<?php echo $site['siteData']->sites_id;?>">
        				
        					<div class="window">
        					
        						<div class="top">
        						
        							<div class="buttons clearfix">
        								<span class="left red"></span>
        							 	<span class="left yellow"></span>
        								<span class="left green"></span>
        							</div>
        							
        							<b><?php echo $site['siteData']->sites_name;?></b>
        							
        						</div><!-- /.top -->
        						
        						<div class="viewport">
        							
        							<?php if( $site['lastFrame'] != ''):?> <!-- TODO build frame preview with all frames rather than just the last frame -->
                                    <iframe src="<?php echo site_url('sites/getframe/'.$site['lastFrame']->frames_id)?>" frameborder="0" scrolling="0" data-height="<?php echo $site['lastFrame']->frames_height?>" data-siteid="<?php echo $site['siteData']->sites_id?>"></iframe>
                                <?php else:?>
                                    <a href="<?php echo site_url('sites/'.$site['siteData']->sites_id)?>" class="placeHolder">
                                        <span><?php echo $this->lang->line('sites_empty_placeholder')?></span>
                                    </a>
                                <?php endif;?>
        						
        						</div><!-- /.viewport -->
        						
        						<div class="bottom"></div><!-- /.bottom -->
        					
        					</div><!-- /.window -->
        					
        					<div class="siteDetails">
                        
                            <p>
                                <?php echo $this->lang->line('sites_details_owner')?>: <b><?php echo $site['siteData']->first_name;?> <?php echo $site['siteData']->last_name;?></b>, <?php echo $site['nrOfPages'];?> <?php echo $this->lang->line('sites_details_pages')?><br>
                                <?php echo $this->lang->line('sites_details_createdon')?>: <b><?php echo date("Y-m-d", $site['siteData']->sites_created_on);?></b><br>
                                <?php echo $this->lang->line('sites_details_lasteditedon')?>: <b><?php if( $site['siteData']->sites_lastupdate_on != '' ){echo date("Y-m-d", $site['siteData']->sites_lastupdate_on);}else{echo "NA";}?></b>
                            </p>
                            
                            <p class="siteLink <?php if( $site['siteData']->ftp_published == 1 ){ echo "siteLinkPublish";}?>">
                                <?php if( $site['siteData']->ftp_published == 1 ):?>
                                    <?php if( $site['siteData']->remote_url != '' ):?>
                                    <span class="fui-link"></span> <a href="<?php echo $site['siteData']->remote_url?>" target="_blank"><?php echo $site['siteData']->remote_url?></a>
                                    <?php else:?>
                                    <?php echo $this->lang->line('sites_published_on');?> <?php echo date('n F, Y', $site['siteData']->publish_date);?>
                                    <?php endif?>
                                <?php else:?>
                                    <span class="pull-left text-danger">
                                        <b><?php echo $this->lang->line('sites_sitehasnotbeenpublished')?></b>
                                    </span> &nbsp;&nbsp;
                                    <?php if( $site['siteData']->ftp_ok == 1 ):?>
                                    <a class="btn btn-inverse btn-xs" href="<?php echo site_url('sites/'.$site['siteData']->sites_id)?>#publish">
                                        <span class="fui-export"></span> <?php echo $this->lang->line('sites_button_publishnow')?>
                                    </a>
                                    <?php endif;?>
                                <?php endif;?>
                            </p>
                            
                            <!-- <hr class="dashed light"> -->
                            
                            <div class="clearfix">
                            
                                <a href="<?php echo site_url('sites/'.$site['siteData']->sites_id)?>" class="btn btn-primary btn-embossed btn-block"><span class="fui-new"></span> <?php echo $this->lang->line('sites_button_editthissite')?></a>
                                
                                <a href="#" class="btn btn-info btn-embossed btn-block btn-half pull-left btn-sm siteSettingsModalButton first" data-siteid="<?php echo $site['siteData']->sites_id?>"><span class="fui-gear"></span> <?php echo $this->lang->line('sites_button_settings')?></a>
                                
                                <a href="#deleteSiteModal" class="btn btn-danger btn-embossed btn-block btn-half pull-left deleteSiteButton btn-sm second" id="deleteSiteButton" data-siteid="<?php echo $site['siteData']->sites_id?>"><span class="fui-trash"></span> <?php echo $this->lang->line('sites_button_delete')?></a>
                            
                            </div>
                        
                        </div><!-- /.siteDetails -->
        				
        				</div><!-- /.site -->
        				
        				<?php endforeach;?>
        			    				
        			</div><!-- /.masonry -->
        		
        		</div><!-- /.col -->
        		
        		<?php else:?>
        		
        		<div class="col-md-6 col-md-offset-3">
        		
        			<div class="empty-site alert alert-info" style="margin-top: 30px">
    	    			<button type="button" class="close fui-cross" data-dismiss="alert"></button>
    	    			<h2><?php echo $this->lang->line('sites_nosites_heading')?></h2>
    	    			<p>
    	    				<?php echo $this->lang->line('sites_nosites_message')?>
    	    			</p>
    	    			<br><br>
    	    			<a href="<?php echo site_url('sites/create')?>" class="btn btn-primary btn-lg btn-wide"><?php echo $this->lang->line('sites_nosites_button_confirm')?></a>
    	    			<a href="#" class="btn btn-default btn-lg btn-wide" data-dismiss="alert"><?php echo $this->lang->line('sites_nosites_button_cancel')?></a>
    	    		</div>
        		
        		</div><!-- ./col -->
        		
        		<?php endif;?>
        	
        	</div><!-- /.row -->
        	
        </div><!-- /.container -->
    </div><!-- /.wrapper -->
	
	
	<!-- modals -->
	
	<?php $this->load->view("shared/modal_sitesettings.php");?>
	
	<?php $this->load->view("shared/modal_account.php");?> 
	
	<?php $this->load->view("shared/modal_deletesite.php");?>

    <?php $this->load->view("shared/modal_createsite.php");?>
		
	<!-- /modals -->

	

    <!-- Load JS here for greater good =============================-->
    <?php if( ENVIRONMENT == 'development' ):?>
    <script src="<?php echo base_url('js/vendor/jquery.min.js');?>"></script>
    <script src="<?php echo base_url('js/vendor/jquery-ui.min.js');?>"></script>
    <script src="<?php echo base_url('js/vendor/flat-ui-pro.min.js');?>"></script>
    <script src="<?php echo base_url('js/vendor/jquery.zoomer.js');?>"></script>
    <script src="<?php echo base_url('js/build/sites.js');?>"></script>
    <?php else:?>
    <script src="<?php echo base_url('js/build/sites.min.js');?>"></script>
    <?php endif;?>
    <script src="<?php echo base_url('js/bootstrap-select.js');?>"></script>

    <!--[if lt IE 10]>
    <script>
    $(function(){
    	var msnry = new Masonry( '#sites', {
	    	// options
	    	itemSelector: '.site',
	    	"gutter": 20
	    });
    
    })
    </script>
    <![endif]-->
</body>
</html>
