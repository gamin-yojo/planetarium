// JavaScript Document

$(function () {
	/*--------------------
	 * ハンバーガー
	 *--------------------*/

	$(".btn-trigger").click(function () {
		$(this).toggleClass("active");
		$(".menu-nav-curtain").toggleClass("active");
		$(".menu-nav").toggleClass("active");
	});
});
