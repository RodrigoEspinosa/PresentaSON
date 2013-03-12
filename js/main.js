/*
 *	@author: Rodrigo Espinosa 2013.
 */
dataArchives = [
	"los_hartos", "2_slide", "3_slide"
];
function dataRender(data) {
	var source 		= $("#songTemplate").html();
	var template 	= Handlebars.compile(source);
	var context 	= data;
	var html    	= template(context);
	// Append it
	$("#main").append( html );
}
function doAnimation(selfIndex) {
	$("header nav ul li a").removeClass("active");
	$("header nav ul li a").eq(selfIndex).addClass("active");
	var position = $("header nav ul li a").eq(selfIndex).position();
	var width 	 = $("header nav ul li a").eq(selfIndex).width();
	$(".activeHelper").css({
		left: position.left,
		// top: position.top,
		width: width
	});
	$(".song").each(function() {
		if( $(this).index() != selfIndex && $(this).hasClass("displaying") ){
			$(this).removeClass("displaying");
		}else{
			if( $(this).index() === selfIndex ){
				$(this).addClass("displaying");
			}
		}
	});
}
$("header nav ul li a").on("click", function(e) {
	e.preventDefault();
	var selfIndex = $(this).parent("li").index();
	var href = "json/"+$(this).attr("href");

	
	doAnimation(selfIndex);
});
$(document).on("ready", function() {
	for(archive in dataArchives){
		archive = dataArchives[archive];
		$.getJSON("json/"+archive+".json", function(data) {
			dataRender(data);
		});
	}
});