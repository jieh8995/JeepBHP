//Navigation

// Open Vehicles flyout

var isNavOpen = false;

$('#vehiclesFlyoutButton').click(function () {
	
    if ($('#vehiclesFlyout').css("display") == "block") {
		
        $('#vehiclesFlyout').css('display', 'none');
		
    } else {
		
        $('#vehiclesFlyout').css('display', 'block');
		
    }
})


// Close button on the Vehicles flyout

$('#vehiclesFlyoutClose').click(function () {
	
    $('#vehiclesFlyout').css('display', 'none');
    $('#vehiclesFlyoutButton').removeClass("openNav").find('img').attr('src', 'images/icon-down.png');
    isNavOpen = false;
	
})


// Nav style

$(".menuLeft>ul>li:first-child").click(function () {
	
    var $this = $(this);
	
    if (isNavOpen == true) {
		
        $this.removeClass("openNav").find('img').attr('src', 'images/icon-down.png');
        isNavOpen = false;
		
    } else {
		
        $this.addClass("openNav").find('img').attr('src', 'images/icon-up.png');
        isNavOpen = true;
		
    }
})


// Mobile menu

//Mobile menu button

$('<div class="menu" id="menuButton">' +
        '<ul>' +
			'<li>' +
				'<a>' + 'MENU ' + '<img src="images/icon-menu.png"/>' + '</a>' +
			'</li>' +
        '</ul>' +
    '</div>'
).prependTo($("#menuNav"));


//Mobile menu button open

$("#menuButton>ul>li").click(function () {
	
    var $this = $(this)
	
    if ($("#navPanel").css("display") == "none") {
		
        $("#navPanel").css("display", "block");
        $this.addClass("openNav").find('img').attr('src', 'images/icon-close.png').css('width', '15.99px');
        $(document.body).css("overflow-y", "hidden");
		
    } else {
		
        $("#navPanel").css("display", "none");
        $this.removeClass("openNav").find('img').attr('src', 'images/icon-menu.png');
        $(document.body).css("overflow-y", "auto");
		
    }
})


//Retrive desktop nav content and make mobile/tablet menu

$.fn.navList = function () {
	
    var $this = $(this);
		$oldList = $this.find('a'),
        newList = [];
		
    $oldList.each(function () {

        var $this = $(this),
            href = $this.attr('href'),
            target = $this.attr('target');

        newList.push(
            '<li ' +
				'class=link' +
				((typeof target !== 'undefined' && target != '') ? ' target="' + target + '"' : '') +
				((typeof href !== 'undefined' && href != '') ? ' href="' + href + '"' : '') +
				'>' +
				$this.text() +
				'<img class="mobileMenuArrow iconRightArrow" src="images/icon-right.png" />' +
            '</li>'
        );
    });

    return newList.join('');
};


var isMobileMenuAdded = false;
var isTabletMenuAdded = false;

$(window).on('load resize', function () {

    var windSize = $(window).width();

    if (windSize <= 699) {

        $(".menuRight, .menuLeft li:not(:first)").addClass("menuHide");
        
		if (isMobileMenuAdded == false) {

            $("#navPanel").remove();
            $(
                '<div id="navPanel">' +
					'<nav>' +
						$('.menuLeft li:not(:first), .menuRight').navList() +
					'</nav>' +
                '</div>'
            ).appendTo($("#menuButton"))

            isMobileMenuAdded = true;
            isTabletMenuAdded = false;
        }
		
    } else if (windSize <= 1004 && windSize > 699) {

        $(".menuLeft li").removeClass("menuHide");
        $(".menuRight, .menuLeft li:gt(2)").addClass("menuHide");

        if (isTabletMenuAdded == false) {

            $("#navPanel").remove();
            $(
                '<div id="navPanel">' +
					'<nav>' +
						$('.menuLeft li:gt(2), .menuRight').navList() +
					'</nav>' +
                '</div>'
            ).appendTo($("#menuButton"))

            isMobileMenuAdded = false;
            isTabletMenuAdded = true;
        }

    } else {

        $(".menuRight, .menuLeft li").removeClass("menuHide");

    }
});


//Carousel

//Clone the sliders
$(".carouselAll>li").clone(true).appendTo($(".carouselAll"))


var carouselBox = $(".carouselMoveLeft")[0];

var carouselBoxWidth = $(document.body)[0].clientWidth;

var carouselList = $(".carouselItem").length;

var leftButton = $(".carouselButtonLeft")[0];

var rightButton = $(".carouselButtonRight")[0];

var carouselMeatballList = $(".meatballItem");

var num = 0;

var newWidth = 0;


//Monitor the screen width

$(window).on('resize', function (){
	
    var leftSize = $(document.body)[0].clientWidth;
	
    if (leftSize != carouselBoxWidth && num > 0) {
		
        $(carouselBox).css("transition", "none");
        $(carouselBox).css("left", -leftSize + "px");
		
    }
})


//Right button on the carosel

$(rightButton).click(function () {

    num++;
    newWidth = $(document.body)[0].clientWidth;
	
    if (num > carouselList - 1) {
		
        num = 2;
		
    }
	
    moveLeft(newWidth);
	
    //from last slider to the first slider
    if (num == carouselList - 1) {
		
        setTimeout(function () {

            $(carouselBox).css("transition", "none");
            $(carouselBox).css("left", -newWidth + "px");
			
        }, 300);
		
    }
})


//Left button on the carosel

$(leftButton).click(function () {
	
    num--;
    newWidth = $(document.body)[0].clientWidth;
	
    if (num < 0) {
		
        num = carouselList - 1;
		
    }
	
    moveLeft(newWidth);
	
    if (num == 1) {
		
        setTimeout(function () {
			
            $(carouselBox).css("transition", "none");
            $(carouselBox).css("left", -newWidth * (carouselList - 1) + "px");
            num = carouselList - 1;
			
        }, 300);
		
    }
})


//Click on carousel meatballs

for (var i = 0; i < carouselMeatballList.length; i++) {

    carouselMeatballList[i].setAttribute("p_index", i);
	
    carouselMeatballList[i].onclick = function () {
		
        num = this.getAttribute("p_index");
        newWidth = $(document.body)[0].clientWidth;
        moveLeft(newWidth);
		
    }
}


//Auto play

var timer = setInterval(function () {
	
    $(rightButton).click();
	
}, 8000);


//Carousel meatballs animation

$removeAnimation = function (e) {
	
    var $element = $(e)
    $element.find($(".meatballStyleLeft>div")).removeClass("meatballLeftAnimation");
    $element.find($(".meatballStyleRight>div")).removeClass("meatballRightAnimation");
	
}

$addAnimation = function (e) {
	
    var $element = $(e)
    $element.find($(".meatballStyleLeft>div")).addClass("meatballLeftAnimation");
    $element.find($(".meatballStyleRight>div")).addClass("meatballRightAnimation");
	
}


//Pause when mouse hover over

var carouselMouseMovement = document.getElementsByClassName("carouselWrap")[0];

$(carouselMouseMovement).mouseenter(function () {
	
    clearInterval(timer);
    $removeAnimation($(carouselMeatballList[num]));
    $removeAnimation($(carouselMeatballList[num - 2]));
	
})


//Continue when mouse leave 

$(carouselMouseMovement).mouseleave(function () {

    $(carouselMeatballList).css("backgroundColor", "transparent");

    $removeAnimation($(carouselMeatballList[num]));
    $removeAnimation($(carouselMeatballList[num - 2]));
    $addAnimation($(carouselMeatballList[num]));
    $addAnimation($(carouselMeatballList[num - 2]));
	
    timer = setInterval(function () {
		
        $(rightButton).click();
		
    }, 8000);
})


//Slider function

function moveLeft(newWidth) {
	
    $(carouselBox).css("transition", "left 0.3s linear");
	
	//adjust movements based on screen width
    if (0 < newWidth && newWidth != carouselBoxWidth) {
		
        $(carouselBox).css("left", -newWidth * num + "px");
		
    } else {
		
        $(carouselBox).css("left", -carouselBoxWidth * num + "px");
		
    }

    //carousel meatballs
    for (var i = 0; i < carouselMeatballList.length; i++) {

        $removeAnimation($(carouselMeatballList[i]));

        if (num < 2) {
			
            $addAnimation($(carouselMeatballList[num]));
			
        } else {
			
            $addAnimation($(carouselMeatballList[num - 2]));
			
        }
    }
}