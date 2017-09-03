var sizefunc = undefined;
$(document).ready(function(){ 

	$("#menu_id").css('width', '240px');

	$("a.closeDepth").toggle( 
			function () { 
				$(parent.document).find("#content").css({marginLeft: "0px"}), // 52px
				$(".closeDepth").addClass("closeDepth_open");
			}, 
            function () { 
				$(parent.document).find("#content").css({marginLeft: "240px"}),
				$(".closeDepth").removeClass("closeDepth_open");
			} 
	); 
	
}); 


