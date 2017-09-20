<div class="modal fade deleteSiteModal" id="deleteSiteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
	
	<div class="modal-dialog">
    	
    	<div class="modal-content">
      		
      		<div class="modal-header">
        		<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"><?php echo $this->lang->line('modal_close')?></span></button>
        		<h4 class="modal-title modal-title-delete" id="myModalLabel"><span class="fui-info"></span> <?php echo $this->lang->line('modal_areyousure')?></h4>
            <h4 class="modal-title modal-title-done" id="myModalLabel"><span class="fui-info"></span> <?php echo $this->lang->line('sites_trash_success_heading')?></h4>
      		</div>
      		      	
      		<div class="modal-body">
      		
      			<div class="modal-alerts"></div>
      			
      			<!-- <div class="loader" style="display: none;">
              <div class="preloader"></div>
            </div> -->
        	
        		<p>
        			<?php echo $this->lang->line('sites_deletesite_areyousure')?>
        		</p>
        	
      		</div><!-- /.modal-body -->
      			      		
      		<div class="modal-footer modal-footer-empty">
            <button type="button" class="btn btn-primary" data-dismiss="modal"> <?php echo $this->lang->line('modal_cancelclose')?></button>
            <button type="button" class="btn btn-danger" id="deleteSiteButton"> <?php echo $this->lang->line('sites_deletesite_button_deleteforever')?></button>
          </div>
      		
    	</div><!-- /.modal-content -->
    	
  	</div><!-- /.modal-dialog -->
  	
</div><!-- /.modal -->