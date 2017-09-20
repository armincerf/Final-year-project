<nav class="mainnav navbar navbar-inverse navbar-embossed navbar-fixed-top" role="navigation" id="mainNav">
	<div class="navbar-header">
		<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse-01">
			<span class="sr-only"><?php echo $this->lang->line('nav_toggle_navigation')?></span>
		</button>
		<a class="navbar-brand" href="<?php echo site_url()?>">
			<svg class="logo__svg" width="32" height="32" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<circle style="fill:#21D0C3;" cx="256" cy="256" r="256"></circle>
                        <path style="fill:#666666;" d="M277.124,187.364l34.749,38.499L76.4,438.402c-12.337-12.147-23.446-25.531-33.128-39.958
	l233.857-211.085L277.124,187.364z"></path>
                        <path style="fill:#ECF0F1;" d="M279.238,182.619l37.575,41.631l-85.342,77.03l0,0c-4.602,4.152-16.739-1.8-27.119-13.294
	c-10.375-11.494-15.058-24.181-10.46-28.333l85.343-77.03L279.238,182.619z"></path>
                        <path style="fill:#FFFFFF;" d="M306.352,195.913c10.375,11.498,15.058,24.181,10.46,28.333c-4.597,4.152-16.739-1.801-27.114-13.299
	c-10.375-11.494-15.058-24.181-10.46-28.333C283.835,178.463,295.977,184.416,306.352,195.913z"></path>
                        <path style="fill:#FAD24D;" d="M328.869,65.746l8.616,26.693l28.052-0.052l-22.726,16.446l8.721,26.659l-22.664-16.531
	l-22.664,16.531l8.721-26.659L292.2,92.387l28.048,0.052l8.616-26.693H328.869z"></path>
                        <path style="fill:#FFFFFF;" d="M191.653,90.944l20.844,27.655l32.697-11.399l-19.863,28.366l20.948,27.574l-33.119-10.123
	l-19.753,28.441l-0.607-34.626l-33.157-9.995l32.74-11.275l-0.74-34.621L191.653,90.944z"></path>
                        <path style="fill:#FAD24D;" d="M355.855,306.3l13.218,22.593l25.55-5.687l-17.403,19.555l13.304,22.541l-23.972-10.512
	l-17.327,19.622l2.588-26.048l-24.015-10.418l25.574-5.588l2.488-26.057H355.855z"></path>
                        <path style="fill:#FFFFFF;" d="M390.832,166.23l8.213,25.441l26.735-0.052l-21.659,15.673l8.313,25.412l-21.602-15.758
	l-21.598,15.758l8.313-25.412l-21.659-15.673l26.735,0.052l8.213-25.441H390.832z"></path>
                        <path style="fill:#FAD24D;" d="M147.714,222.98l5.782,17.915l18.825-0.033l-15.251,11.033l5.854,17.891l-15.209-11.095
	l-15.209,11.095l5.854-17.891l-15.251-11.033l18.825,0.033L147.714,222.98z"></path>
                        <path style="fill:#FFFFFF;" d="M243.592,329.139l5.071,15.711l16.508-0.033l-13.375,9.678l5.133,15.687l-13.337-9.73l-13.337,9.73
	l5.133-15.687l-13.375-9.678l16.508,0.033L243.592,329.139z"></path>
                        <g>
                            <path style="fill:#FEFEFE;" d="M268.489,131.282c28.105,0,55.072,9.863,76.523,28.029l-2.28,2.697
		c-20.82-17.631-46.963-27.185-74.243-27.185v-3.536V131.282z M386.964,249.758c0,9.939-1.228,19.603-3.536,28.84
		c-2.374,9.507-5.91,18.569-10.441,27.024l-3.109-1.659c4.384-8.185,7.811-16.982,10.123-26.223
		c2.237-8.948,3.426-18.322,3.426-27.981h3.536V249.758z M316.489,358.102c-7.427,3.294-15.27,5.854-23.427,7.573
		c-7.939,1.673-16.161,2.555-24.574,2.555v-3.536c8.19,0,16.17-0.853,23.853-2.474c7.892-1.664,15.498-4.147,22.721-7.351
		l1.422,3.233L316.489,358.102L316.489,358.102z"></path>
                            <path style="fill:#FEFEFE;" d="M165.553,192.344c-5.332,8.223-9.545,16.986-12.64,26.067l3.331,1.142
		c2.995-8.792,7.09-17.294,12.275-25.29l-2.962-1.919L165.553,192.344L165.553,192.344z"></path>
                        </g>
</svg>
				<h1 class="logo__text" style="font-size: 90%">WebWizard</h1>
			<!-- <?php echo $this->lang->line('nav_name')?> -->
		</a>
	</div>
	<div class="collapse navbar-collapse" id="navbar-collapse-01">
		<ul class="nav navbar-nav">
			
			<?php if( isset($siteData) || ( isset($page) && $page == 'newPage' ) ):?>
		
				<?php if( isset($siteData) ):?>
				<li class="mix-arrange simple-link">
					<a><span id="siteTitle"><?php echo $siteData['site']->sites_name?></span></a>
				</li>
				<?php endif;?>
				<?php if( isset($page) && $page == 'newPage' ):?>
				<li class="active">
					<a><span class="fui-home"></span> <span id="siteTitle"><?php echo $this->lang->line('newsite_default_title')?></span> </a>
				</li>
				<?php endif;?>
				<?php if( isset($_SERVER['HTTP_REFERER']) && $_SERVER['HTTP_REFERER'] != '' ):?>
				
					<?php
						
						//find previous page if failed refer
						
						$temp = explode("/", $_SERVER['HTTP_REFERER']);
						
						if( array_pop($temp) == 'users' ) {
						
							$t = 'nav_goback_users';
							$to = site_url('users');
						
						} else {
							
							$t = 'nav_goback_sites';
							$to = site_url('sites');
						
						}
						
					?>
				
					<li class="mix-arrange backButton"><a href="<?php echo $_SERVER['HTTP_REFERER']?>" id="backButton"><span class="fui-arrow-left"></span> <?php echo $this->lang->line( $t )?></a></li>
			
				<?php else:?>
				
					<li><a href="<?php echo site_url('sites')?>" id="backButton"><span class="fui-arrow-left"></span> <?php echo $this->lang->line('nav_goback_users')?></a></li>
				
				<?php endif;?>
			
			<?php else:?>
			
				<li <?php if( isset($page) && $page == "sites" ):?>class="active"<?php endif;?>><a href="<?php echo site_url('sites')?>"><span class="fui-windows"></span> <?php echo $this->lang->line('nav_sites')?></a></li>
      			<li <?php if( isset($page) && $page == "images" ):?>class="active"<?php endif;?>><a href="<?php echo site_url('assets/images')?>"><span class="fui-image"></span> <?php echo $this->lang->line('nav_imagelibrary')?></a></li>
      			<?php if( $this->ion_auth->is_admin() ):?> <!--if admin, show users tab-->
      			<li <?php if( isset($page) && $page == "users" ):?>class="active"<?php endif;?>><a href="<?php echo site_url('users')?>"><span class="fui-user"></span> <?php echo $this->lang->line('nav_users')?></a></li>
      			<?php endif;?>
      		
      		<?php endif;?>
		</ul>
		<ul class="nav navbar-nav navbar-right" style="margin-right: 20px;">
			<li class="dropdown">
				<?php
					$u = $this->ion_auth->user()->row();
				?>
				<a href="#" class="dropdown-toggle" data-toggle="dropdown">Hi, <?php echo $u->first_name." ".$u->last_name;?> <b class="caret"></b></a>
				<span class="dropdown-arrow"></span>
			  	<ul class="dropdown-menu">
			    	<li><a href="#accountModal" data-toggle="modal"><span class="fui-cmd"></span> <?php echo $this->lang->line('nav_myaccount')?></a></li>
			    	<li class="divider"></li>
			    	<li><a href="<?php echo site_url('logout')?>"><span class="fui-exit"></span> <?php echo $this->lang->line('nav_logout')?></a></li>
			  	</ul>
			</li>			      
		</ul>	      
	</div><!-- /.navbar-collapse -->
</nav><!-- /navbar -->