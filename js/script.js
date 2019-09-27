// JavaScript Document

$(function () {
	/*--------------------
	 * パラメータ
	 *--------------------*/
	/*hero-imageを切り替えるインターバル*/
	const heroInterval = 4000;
	/*hero-imageのfade速度*/
	const duration = 1000;
	/*スックロールによるfadeinの動作位置(px)*/
	const startFadeInHeight = 200;
	/*サイトを開いたときのアニメーション時間の長さ*/
	const siteOpenInterval = 2000;



	/*--------------------
	 * 初期設定
	 *--------------------*/
	/*デバイスを判定してクリック/タッチイベントを決定*/
	const clickEventType = ((window.ontouchstart !== null) ? 'click' : 'touchstart');


	/*--------------------
	 * my function
	 *--------------------*/

	/* 文字列を1文字ずつspanタグで囲む
	 * @str 文字列
	 * @return spanで囲ったhtml
	 */
	function spanWrap(str) {
		let mkHTML = "";
		for (let i = 0; i < str.length; i++) {
			mkHTML += "<span>" + str.charAt(i) + "</span>";
		}
		return mkHTML;
	}



	/*--------------------
	 * utility
	 *--------------------*/
	/*レスポンジブに対応する、
	 *文字列の文字間を均等にする処理
	 *--------------------*/
	$(".span-wrap").each(function () {
		$(this).html(spanWrap($(this).html()));
	});

	/* スクロールアクション
	 *--------------------*/
	$(window).scroll(function () {
		/*スクロール位置*/
		let scrollTop = $(window).scrollTop();
		/*ウィンドウサイズ（高さ)*/
		let windowHeight = $(window).height();

		/*文字のフェードイン処理(bottom to top)*/
		$(".fadein-up").each(function () {
			/*itemの位置*/
			let itemPos = $(this).offset().top;
			/*コンテンツ要素のまで画面がスクロールした場合*/
			//if (scrollTop + windowHeight > itemPos + startFadeInHeight) {
			if (hasReached(itemPos)) {
				$(this).addClass("scrollin");
			}
		});

		/*文字のフェードイン処理(left to right)*/
		$(".fadein-right").each(function () {
			/*itemの位置*/
			let itemPos = $(this).offset().top;
			/*コンテンツ要素のまで画面がスクロールした場合*/
			//if (scrollTop + windowHeight > itemPos + startFadeInHeight) {
			if (hasReached(itemPos)) {
				$(this).addClass("scrollin");
			}
		});
		/*ジャッジfunction*/
		function hasReached(pos) {
			let flg;
			if (scrollTop + windowHeight > pos + startFadeInHeight) {
				flg = true;
			} else {
				flg = false;
			}
			return flg;
		}
	});


	/*--------------------
	 * open animation
	 *--------------------*/

	setTimeout(function () {
		$(".loading").fadeOut(500);
	}, siteOpenInterval);
	setTimeout(function () {
		$(".curtain").fadeOut(3000);
	}, siteOpenInterval + 1000);
	setTimeout(function () {
		$(".title").addClass("scrollin");
	}, siteOpenInterval + 3000);
	setTimeout(function () {
		$(".hero-nav").addClass("scrollin");
	}, siteOpenInterval + 4000);


	/*--------------------
	 * hero-image切り替え処理
	 *--------------------*/
	/* 初期設定
	 *--------------------*/
	/*hero-imageの総数*/
	let heroImgCnt = $(".hero-image li").length;
	/*表示しているhero-image*/
	let currentHeroImage = 1;
	/*次に表示するhero-image*/
	let nextCurrentImage = 2;
	/*intervalのタイマー*/
	let timer;
	/*hero-imageをhide*/
	$(".hero-image li:not(:first-child)").hide();
	/*hero-image-btnのcurrent設定*/
	$(".hero-image-btn li:first-child a").addClass("current");


	/* 処理
	 *--------------------*/
	/*hero-image繰り返し処理*/
	timer = setInterval(slideTimer, heroInterval);
	/*#hero-imageの切替ボタン押下処理*/
	$(".hero-image-btn li a[href^='#']").on(clickEventType, function () {
		//押下ボタンを取得
		nextCurrentImage = $(this).html();
		//インターバル時間の初期化
		clearInterval(timer);
		//インターバルを再開
		timer = setInterval(slideTimer, heroInterval);
		//押下したスライドに変更
		slideTimer();
		return false;
	});

	/* function
	 *--------------------*/
	/*スライド切替時に処理する関数*/
	function slideTimer() {
		//hero-imageの切替
		$(".hero-image li:nth-child(" + currentHeroImage + ")").fadeOut(duration);
		$(".hero-image li:nth-child(" + nextCurrentImage + ")").fadeIn(duration);
		//current状態のbutton切替
		$(".hero-image-btn li a").removeClass("current");
		$(".hero-image-btn li:nth-child(" + nextCurrentImage + ") a").addClass("current");
		//currentとnextの再設定
		currentHeroImage = nextCurrentImage;
		setNextImage();
	}
	/*nextCurrentImageを設定する関数*/
	function setNextImage() {
		nextCurrentImage++;
		if (heroImgCnt < nextCurrentImage) nextCurrentImage = 1;
	}


	/*--------------------
	 * menu jump
	 *--------------------*/
	$("a[href^='#']:not([href='#'])").click(function () {
		var target = $($(this).attr("href")).offset().top;
		// コンテンツへスクロール
		$("html, body").animate({
			scrollTop: target
		}, 500);
		return false;
	});

	/*--------------------
	 * toggleの処理
	 *--------------------*/
	$(".dl_toggle dt").on(clickEventType, function () {
		$(".dl_toggle dd").slideToggle(500);
		$(".my-plus").toggleClass("current");
	});

	/*--------------------
	 * ハンバーガー
	 *--------------------*/

	$(".btn-trigger").click(function () {
		$(this).toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-top").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-about").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-usage-time").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-price").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-access").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});
	$(".link-how-to-use").click(function () {
		$(".btn-trigger").toggleClass("active");
		$(".menu-list").fadeToggle(500);
	});

	/*--------------------
	 * menu ハイライト
	 *--------------------*/
	$(window).scroll(function () {
		let windowTop = $(window).scrollTop();
		let secList = ["top", "about", "usage_time", "price", "access", "how_to_use"];
		for (let i = 0; i < secList.length; i++) {
			if (windowTop + 300 > $("#" + secList[i]).offset().top) {
				$(".menu-item").removeClass("menu-current");
				$(".menu-item." + secList[i]).addClass("menu-current");
			}
		}
	});


});
