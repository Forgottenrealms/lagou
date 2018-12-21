require(["../config"], ()=>{
    require(["jquery", "swiper", "load", "bootstrap"], function($, Swiper) {
        function Index() {
			this.loadSwiper();
		}

		$.extend(Index.prototype, {
			// Swiper 轮播
			loadSwiper() {
				var mySwiper = new Swiper ('.swiper-container', {
				    // direction: 'vertical', // 垂直切换选项
				    loop: true, // 循环模式选项
				    autoplay: { // 自动轮播
				    	delay: 1000
				    },
				    
				    // 如果需要分页器
				    pagination: {
				      el: '.swiper-pagination',
				    },
				    
				    // 如果需要前进后退按钮
				    // navigation: {
				    //   nextEl: '.swiper-button-next',
				    //   prevEl: '.swiper-button-prev',
				    // },
				    
				    // 如果需要滚动条
				    // scrollbar: {
				    //   el: '.swiper-scrollbar',
				    // },
				  })        
			}
		});

		new Index();
    });
});