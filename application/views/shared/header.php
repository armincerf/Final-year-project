<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title><?php if( isset($pageTitle) ){ echo $pageTitle; } else { echo $this->lang->line('alternative_page_title'); }?></title>
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<!-- Fonts -->
	<!-- OpenSans font -->
	<link href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,700,600' rel='stylesheet' type='text/css'>
	<!-- Varela Round font -->
	<link href='http://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'>
	<!-- Quicksand -->
	<link href='http://fonts.googleapis.com/css?family=Quicksand:400,700,300' rel='stylesheet' type='text/css'>

	<?php if( ENVIRONMENT == 'development' ):?>

	<link href="<?php echo base_url();?>css/vendor/bootstrap.min.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/flat-ui-pro.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/style.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/login.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/font-awesome.css" rel="stylesheet">
    <link href="<?php echo base_url();?>css/bootstrap-select.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/builder.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/spectrum.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/chosen.css" rel="stylesheet">
	<link href="<?php echo base_url();?>css/summernote.css" rel="stylesheet">

	<?php else: ?>
	
	<link href="<?php echo base_url();?>css/build-main.min.css" rel="stylesheet" type="text/css">

	<?php if( isset($builder) ):?>
	<link href="/css/build-builder.min.css" rel="stylesheet" type="text/css">
	<?php endif;?>

	<?php endif;?>

	<link href="<?php echo base_url();?>css/custom-interface.css" rel="stylesheet" type="text/css">

	<link rel="shortcut icon" href="<?php echo base_url();?>images/favicon.ico">
	
	<!-- HTML5 shim, for IE6-8 support of HTML5 elements. All other JS at the end of file. -->
	<!--[if lt IE 9]>
	<script src="<?php echo base_url();?>js/html5shiv.js"></script>
	<script src="<?php echo base_url();?>js/respond.min.js"></script>
	<![endif]-->
	<!--[if lt IE 10]>
	<link href="<?php echo base_url();?>css/ie-masonry.css" rel="stylesheet">
	<script src="<?php echo base_url();?>js/masonry.pkgd.min.js"></script>
	<![endif]-->
    
    <script>
    var baseUrl = '<?php echo base_url('/');?>';
    var siteUrl = '<?php echo site_url('/');?>';
    </script>
</head>