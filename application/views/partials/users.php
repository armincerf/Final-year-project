<?php foreach( $users as $user ):?>

	<div class="user" data-name="<?php echo $user['userData']->first_name?> <?php echo $user['userData']->last_name;?>">
	
		<div class="topPart clearfix">
											
			<img src="<?php echo base_url();?>images/avatar.png" class="pic">
										
			<div class="details">
			
				<h4><?php echo $user['userData']->first_name?> <?php echo $user['userData']->last_name;?></h4>
				
				<p>
					<span class="fui-mail"></span> <a href=""><?php echo $user['userData']->email;?></a>
				</p>
			
			</div><!-- /.details -->
		
		</div><!-- /.topPart -->
		
		<div class="bottom">
		

			
			<div class="alerts"></div>

			<h5>Account Settings:</h5>
		
			<div class="tab-content clearfix">

				<div class="tab-pane active" id="<?php echo $user['userData']->id;?>_account">
				
					<?php $this->load->view('partials/userdetailsform', array('user'=>$user));?>
					
					<!-- <hr class="dashed"> -->
					
					<div class="actions clearfix">
						<a href="#" class="btn btn-info btn-embossed btn-block passwordReset" data-userid="<?php echo $user['userData']->id;?>"><span class="fui-mail"></span> <?php echo $this->lang->line('users_button_sendpasswordreset')?></a>
							<a href="<?php echo site_url('users/delete/'.$user['userData']->id)?>" class="btn btn-danger btn-embossed deleteUserButton"><span class="fui-cross-inverted"></span> <?php echo $this->lang->line('users_button_deleteaccount')?></a>
							<div class="enable-control">
								<span>
									<?php if( $user['userData']->active == 1 ):?>
									<a href="<?php echo site_url('users/disable/'.$user['userData']->id)?>" class="btn btn-default btn-embossed"><span class="fui-power"></span> <?php echo $this->lang->line('users_button_disableaccount')?></a>
									<?php else:?>
									<a href="<?php echo site_url('users/enable/'.$user['userData']->id)?>" class="btn btn-inverse btn-embossed"><span class="fui-power"></span> <?php echo $this->lang->line('users_button_enableaccount')?></a>
									<?php endif;?>
								</span>
							</div>
							
					</div><!-- /.actions -->
				
				</div><!-- /.tab-pane -->
				
			</div> <!-- /tab-content -->
		
		</div><!-- /.bottom -->
		
		<?php if( $user['userData']->active == 0 ):?>
		<div class="ribbon-wrapper"><div class="ribbon">disabled</div></div>
		<?php endif;?>
	
	</div><!-- /.user -->
	
<?php endforeach;?>