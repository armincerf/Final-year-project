<div class="modal fade createSiteModal" id="createSiteModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">

    <div class="modal-dialog">

        <div class="modal-content">

            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only"><?php echo $this->lang->line('modal_close')?></span></button>
                <h4 class="modal-title modal-title-create" id="myModalLabel"><span class="fui-info"></span> <?php echo $this->lang->line('modal_areyousure')?></h4>
                <h4 class="modal-title modal-title-done" id="myModalLabel"><span class="fui-info"></span> <?php echo $this->lang->line('sites_trash_success_heading')?></h4>
            </div>

            <div class="modal-body">

                <div class="modal-alerts"></div>

                <!-- <div class="loader" style="display: none;">
            <div class="preloader"></div>
          </div> -->

                <p>
                    Please select the type of site you wish to create, or if you want to start afresh, select 'blank'.
                </p>

                <!-- drop down box -->
                <div class="siteSettingsWrapper">
                    <div class="form-group">
                        <form class="form-horizontal" role="form">
                                <select id="basic-create" class="selectpicker" style="background: #91d5de;" data-style="btn-primary"  >
                                    <optgroup label="Photography">
                                        <option data-subtext="Contains interactive slider">Photo 1</option>
                                        <option data-subtext="Contains static gallery">Photo 2</option>
                                    </optgroup>
                                    <optgroup label="Blog">
                                        <option>Blog</option>
                                    </optgroup>
                                    <optgroup label="E-Commerce">
                                        <option data-subtext="Requires EWCID Account">Shop</option>
                                    </optgroup>
                                    <optgroup label="Portfolio/Promo">
                                        <option data-subtext="Contains interactive slider">Promo 1</option>
                                        <option data-subtext="Contains static gallery">Promo 2</option>
                                        <option data-subtext="Contains full size images">Promo 3</option>
                                    </optgroup>
                                    <optgroup label="Misc">
                                        <option data-subtext="Skeleton template with nav bar">Skeleton</option>
                                        <option data-subtext="Empty page">Blank</option>
                                    </optgroup>
                                </select>
                        </form>
                    </div>
                    <div class="form-group">
                        <form class="contact" id="contact-form" name="contact-form" method="post" action="#" novalidate>
                            <input class="contact__field" name="contact-name" type="text" placeholder="full name">
                            <input class="contact__field" name="contact-email" type="email" placeholder="email">
                            <input class="contact__field" name="contact-name" type="text" placeholder="Site Title">
                        </form>
                    </div>
                </div>

            </div><!-- /.modal-body -->

            <div class="modal-footer modal-footer-empty">
                <button type="button" class="btn btn-primary" data-dismiss="modal"> <?php echo $this->lang->line('modal_cancelclose')?></button>
                <button type="button" class="btn btn-success" id="makeSiteButton"> <?php echo $this->lang->line('sites_createsite_button')?></button>
            </div>




        </div><!-- /.modal-content -->

    </div><!-- /.modal-dialog -->

</div><!-- /.modal -->