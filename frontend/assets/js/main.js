jQuery(
  (function ($) {
    "use strict";

    // Metis Menu JS
    $(function () {
      $("#sidemenu-nav").metisMenu();
    });

    // Responsive Burger Menu JS
    $(".responsive-burger-menu").on("click", function () {
      $(".responsive-burger-menu").toggleClass("active");
      $(".sidemenu-area").toggleClass("active-sidemenu-area");
    });

    // Navbar Burger Menu JS
    $(".navbar-burger-menu").on("click", function () {
      $(".navbar-burger-menu").toggleClass("active");
      $(".sidemenu-area").toggleClass("active-sidemenu-area");
    });

    // tooltip
    $(function () {
      $('[data-bs-toggle="tooltip"]').tooltip();
    });

    // Language Switcher
    $(".language-option").each(function () {
      var each = $(this);
      each
        .find(".lang-name")
        .html(each.find(".language-dropdown-menu a:nth-child(1)").text());
      var allOptions = $(".language-dropdown-menu").children("a");
      each.find(".language-dropdown-menu").on("click", "a", function () {
        allOptions.removeClass("selected");
        $(this).addClass("selected");
        $(this)
          .closest(".language-option")
          .find(".lang-name")
          .html($(this).text());
      });
    });

    // Others Option For Responsive JS
    $(".others-option-for-responsive .dot-menu").on("click", function () {
      $(".others-option-for-responsive .container .container").toggleClass(
        "active"
      );
    });

    // Watch Video Slides
    $(".watch-video-slides").owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplayHoverPause: true,
      autoplay: true,
      margin: 10,

      responsive: {
        0: {
          items: 2,
        },
        576: {
          items: 3,
        },
        768: {
          items: 5,
        },
        1200: {
          items: 3,
        },
      },
    });

    // Popup Video
    $(".popup-youtube").magnificPopup({
      disableOn: 320,
      type: "iframe",
      mainClass: "mfp-fade",
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false,
    });

    // Live Chat Slides
    $(".live-chat-slides").owlCarousel({
      loop: true,
      nav: false,
      dots: false,
      autoplayHoverPause: true,
      autoplay: true,
      margin: 10,

      responsive: {
        0: {
          items: 2,
        },
        576: {
          items: 2,
        },
        768: {
          items: 6,
        },
        992: {
          items: 8,
        },
        1200: {
          items: 9,
        },
      },
    });

    // Datepicker
    $("#datepicker").datepicker();

    // Go to Top
    $(window).on("scroll", function () {
      var scrolled = $(window).scrollTop();
      if (scrolled > 600) $(".go-top").addClass("active");
      if (scrolled < 600) $(".go-top").removeClass("active");
    });
    $(".go-top").on("click", function () {
      $("html, body").animate({ scrollTop: "0" }, 500);
    });

    // Preloader
    $(window).on("load", function () {
      $(".preloader-area").fadeOut();
    });

    // Buy Now Btn
    $("body").append(
      "<a href='https://1.envato.market/x9QgOO' target='_blank' class='buy-now-btn'>Buy Now</a>"
    );

    // Switch Btn
    $("body").append(
      "<div class='switch-box'><label id='switch' class='switch'><input type='checkbox' onchange='toggleTheme()' id='slider'><span class='slider round'></span></label></div>"
    );
  })(jQuery)
);

// function to set a given theme/color-scheme
function setTheme(themeName) {
  localStorage.setItem("_theme", themeName);
  document.documentElement.className = themeName;
}
// function to toggle between light and dark theme
function toggleTheme() {
  if (localStorage.getItem("_theme") === "theme-dark") {
    setTheme("theme-light");
  } else {
    setTheme("theme-dark");
  }
}
// Immediately invoked function to set the theme on initial load
(function () {
  if (localStorage.getItem("_theme") === "theme-dark") {
    setTheme("theme-dark");
    document.getElementById("slider").checked = false;
  } else {
    setTheme("theme-light");
    document.getElementById("slider").checked = true;
  }
})();

// set first javascript
// custom javascript start
var words = [
  "Your earning is growing",
  "Your earned $200",
  "You are at good position",
  "You are doing better",
  "Your performance is better than your friends",
],
  part,
  i = 0,
  offset = 0,
  len = words.length,
  forwards = true,
  skip_count = 0,
  skip_delay = 15,
  speed = 80;
var wordflick = function () {
  setInterval(function () {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        offset = 0;
        if (i >= len) {
          i = 0;
        }
      }
    }
    part = words[i].substr(0, offset);
    if (skip_count == 0) {
      if (forwards) {
        offset++;
      } else {
        offset--;
      }
    }
    $(".word").text(part);
  }, speed);
};

$(document).ready(function () {
  wordflick();
});

// custom javascript
// pop up form
function popup() {
  let value = document.getElementById("popup_form");
  value.style.display = "block";
}
// economics chapter first
var answers = [
  "D",
  "D",
  "C",
  "A",
  "D",
  "D",
  "A",
  "C",
  "B",
  "D",
  "D",
  "C",
  "C",
  "A",
  "A",
  "B",
  "A",
  "C",
  "D",
  "A",
],
  tot = answers.length;
function getCheckedValue(radioName) {
  var radios = document.getElementsByName(radioName);
  for (var y = 0; y < radios.length; y++)
    if (radios[y].checked) return radios[y].value;
}
function getScore() {
  var score = 0;
  for (var i = 0; i < tot; i++)
    if (getCheckedValue("question" + i) === answers[i]) score += 1;
  return score;
}
function returnScore() {
  document.getElementById("myresults").innerHTML =
    "Your score is " + getScore() + "/" + tot;
  if (getScore() > 2) {
  }
}

// set 2 9th class economics
// custom javascript start
var words1 = [
  "Your earning is growing",
  "Your earned $200",
  "You are at good position",
  "You are doing better",
  "Your performance is better than your friends",
],
  part1,
  i1 = 0,
  offset1 = 0,
  len1 = words1.length,
  forwards1 = true,
  skip_count1 = 0,
  skip_delay1 = 15,
  speed1 = 80;
var wordflick1 = function () {
  setInterval1(function () {
    if (forwards1) {
      if (offset1 >= words1[i1].length) {
        ++skip_count1;
        if (skip_count1 == skip_delay1) {
          forwards1 = false;
          skip_count1 = 0;
        }
      }
    } else {
      if (offset1 == 0) {
        forwards1 = true;
        i1++;
        offset1 = 0;
        if (i1 >= len1) {
          i1 = 0;
        }
      }
    }
    part1 = words1[i1].substr(0, offset1);
    if (skip_count1 == 0) {
      if (forwards1) {
        offset1++;
      } else {
        offset1--;
      }
    }
    $(".word").text(part1);
  }, speed1);
};

$(document).ready(function () {
  wordflick1();
});

// pop up form
function popup1() {
  let value1 = document.getElementById("popup_form");
  value1.style.display = "block";
}
// economics chapter first
var answers1 = [
  "D",
  "B",
  "B",
  "A",
  "A",
  "D",
  "A",
  "B",
  "D",
  "B",
  "B",
  "B",
  "A",
  "D",
  "C",
  "C",
  "D",
  "D",
  "C",
  "C",
],
  tot1 = answers1.length;
function getCheckedValue1(radioName1) {
  var radios1 = document.getElementsByName(radioName1);
  for (var y = 0; y < radios1.length; y++)
    if (radios1[y].checked) return radios1[y].value;
}
function getScore1() {
  var score1 = 0;
  for (var i = 0; i < tot1; i++)
    if (getCheckedValue1("question" + i) === answers1[i]) score1 += 1;
  return score1;
}
function returnScore1() {
  document.getElementById("myresults1").innerHTML =
    "Your score is " + getScore1() + "/" + tot1;
  if (getScore1() > 2) {
  }
}
// set 3 9th class economics
// custom javascript start
var words2 = [
  "Your earning is growing",
  "Your earned $200",
  "You are at good position",
  "You are doing better",
  "Your performance is better than your friends",
],
  part2,
  i2 = 0,
  offset2 = 0,
  len2 = words2.length,
  forwards2 = true,
  skip_count2 = 0,
  skip_delay2 = 15,
  speed2 = 80;
var wordflick2 = function () {
  setInterval2(function () {
    if (forwards2) {
      if (offset2 >= words2[i2].length) {
        ++skip_count2;
        if (skip_count2 == skip_delay2) {
          forwards2 = false;
          skip_count2 = 0;
        }
      }
    } else {
      if (offset2 == 0) {
        forwards2 = true;
        i2++;
        offset2 = 0;
        if (i2 >= len2) {
          i2 = 0;
        }
      }
    }
    part2 = words2[i2].substr(0, offset2);
    if (skip_count2 == 0) {
      if (forwards2) {
        offset2++;
      } else {
        offset2--;
      }
    }
    $(".word").text(part2);
  }, speed2);
};

$(document).ready(function () {
  wordflick2();
});

// pop up form
function popup2() {
  let value2 = document.getElementById("popup_form");
  value2.style.display = "block";
}
// economics chapter first
var answers2 = [
  "A",
  "A",
  "A",
  "A",
  "A",
  "B",
  "D",
  "D",
  "C",
  "C",
  "C",
  "C",
  "A",
  "C",
  "D",
  "C",
  "A",
  "A",
  "A",
  "C",
],
  tot2 = answers2.length;
function getCheckedValue2(radioName2) {
  var radios2 = document.getElementsByName(radioName2);
  for (var y = 0; y < radios2.length; y++)
    if (radios2[y].checked) return radios2[y].value;
}
function getScore2() {
  var score2 = 0;
  for (var i = 0; i < tot2; i++)
    if (getCheckedValue2("question" + i) === answers2[i]) score2 += 1;
  return score2;
}
function returnScore2() {
  document.getElementById("myresults2").innerHTML =
    "Your score is " + getScore2() + "/" + tot2;
  if (getScore2() > 2) {
  }
}
// set 4 9th class economics
// custom javascript start
var words3 = [
  "Your earning is growing",
  "Your earned $200",
  "You are at good position",
  "You are doing better",
  "Your performance is better than your friends",
],
  part3,
  i3 = 0,
  offset3 = 0,
  len3 = words3.length,
  forwards3 = true,
  skip_count3 = 0,
  skip_delay3 = 15,
  speed3 = 80;
var wordflick3 = function () {
  setInterval3(function () {
    if (forwards3) {
      if (offset3 >= words3[i3].length) {
        ++skip_count3;
        if (skip_count3 == skip_delay3) {
          forwards3 = false;
          skip_count3 = 0;
        }
      }
    } else {
      if (offset3 == 0) {
        forwards3 = true;
        i3++;
        offset3 = 0;
        if (i3 >= len3) {
          i3 = 0;
        }
      }
    }
    part3 = words3[i3].substr(0, offset3);
    if (skip_count3 == 0) {
      if (forwards3) {
        offset3++;
      } else {
        offset3--;
      }
    }
    $(".word").text(part3);
  }, speed3);
};

$(document).ready(function () {
  wordflick3();
});

// pop up form
function popup3() {
  let value3 = document.getElementById("popup_form");
  value3.style.display = "block";
}
// economics chapter first
var answers3 = [
  "A",
  "A",
  "A",
  "B",
  "B",
  "C",
  "A",
  "A",
  "A",
  "A",
  "B",
  "C",
  "A",
  "D",
  "C",
  "A",
  "D",
  "B",
  "B",
  "B",
],
  tot3 = answers3.length;
function getCheckedValue3(radioName3) {
  var radios3 = document.getElementsByName(radioName3);
  for (var y = 0; y < radios3.length; y++)
    if (radios3[y].checked) return radios3[y].value;
}
function getScore3() {
  var score3 = 0;
  for (var i = 0; i < tot3; i++)
    if (getCheckedValue3("question" + i) === answers3[i]) score3 += 1;
  return score3;
}
function returnScore3() {
  document.getElementById("myresults3").innerHTML =
    "Your score is " + getScore3() + "/" + tot3;
  if (getScore3() > 2) {
  }
}
// set 5 9th class economics
// custom javascript start
var words4 = [
  "Your earning is growing",
  "Your earned $200",
  "You are at good position",
  "You are doing better",
  "Your performance is better than your friends",
],
  part4,
  i4 = 0,
  offset4 = 0,
  len4 = words4.length,
  forwards4 = true,
  skip_count4 = 0,
  skip_delay4 = 15,
  speed4 = 80;
var wordflick4 = function () {
  setInterval4(function () {
    if (forwards4) {
      if (offset4 >= words4[i4].length) {
        ++skip_count4;
        if (skip_count4 == skip_delay4) {
          forwards4 = false;
          skip_count4 = 0;
        }
      }
    } else {
      if (offset4 == 0) {
        forwards4 = true;
        i4++;
        offset4 = 0;
        if (i4 >= len4) {
          i4 = 0;
        }
      }
    }
    part4 = words4[i4].substr(0, offset4);
    if (skip_count4 == 0) {
      if (forwards4) {
        offset4++;
      } else {
        offset4--;
      }
    }
    $(".word").text(part4);
  }, speed4);
};

$(document).ready(function () {
  wordflick4();
});

// pop up form
function popup4() {
  let value4 = document.getElementById("popup_form");
  value4.style.display = "block";
}
// economics chapter first
var answers4 = [
  "B",
  "C",
  "B",
  "A",
  "B",
  "B",
  "B",
  "A",
  "A",
  "A",
  "D",
  "B",
  "D",
  "D",
  "C",
  "D",
  "D",
  "B",
  "D",
  "C",
],
  tot4 = answers4.length;
function getCheckedValue4(radioName4) {
  var radios4 = document.getElementsByName(radioName4);
  for (var y = 0; y < radios4.length; y++)
    if (radios4[y].checked) return radios4[y].value;
}
function getScore4() {
  var score4 = 0;
  for (var i = 0; i < tot4; i++)
    if (getCheckedValue4("question" + i) === answers4[i]) score4 += 1;
  return score4;
}
function returnScore4() {
  document.getElementById("myresults4").innerHTML =
    "Your score is " + getScore4() + "/" + tot4;
  if (getScore4() > 2) {
  }
}

let user = document.getElementsByClassName("userNameId");

for (let i = 0; i < user.length; i++) {
  user[i].innerHTML = localStorage.getItem("user");
}

const logout = () => {
  localStorage.clear();
  location.href = "login.html";
};

// let token=localStorage.getItem("token")
// if(!token){
// 	location.href="login.html"
// }


const profileImage = () => {
  let token = localStorage.getItem("token")
  if (token) {
    let profileEle = document.getElementById("profilePic")
    let profileEle1 = document.getElementById("profilePic1")
    let profileEle2 = document.getElementById("profilePic2")
    console.log(profileEle2,"2disnvreiuv 93cjrgiurev 498j 943jf94p59ejf 89p")
    let avtar = localStorage.getItem("avtar")
    console.log(profileEle)
    // fetch("http://localhost:3000/profile/details", {
    //   method: "GET",
    //   headers: {
    //     "Authorization": `Bearer ${token}`
    //   }
    // }).then(res => res.json())
    //   .then(data => {
    //     console.log(data)

    profileEle.src = `http://localhost:3000/image/${avtar}`
    profileEle2.src = `http://localhost:3000/image/${avtar}`

    // profileEle1.src = `http://localhost:3000/image/${avtar}`

    // })

  } else {

  }
}

// profileImage()