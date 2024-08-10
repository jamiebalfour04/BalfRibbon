(function($) {
  $.fn.extend({
    BalfRibbon: function(options) {
      //May add opts later
      var defaults = {
        switchTime: 300,
        minimiseCallback: null
      };

      var options = $.extend(defaults, options);
      var fade_duration = options.switchTime;

      return this.each(function() {

        var ribbon = this;

        var tab_buttons = $(ribbon).find('.ribbon_tabs li:not(.special)');
        var tabs = $(ribbon).find(".ribbonbar > .ribbon_tab");

				var i = 0;
				$(tab_buttons).each(function(){
					$(this).attr('data-tab-index', i);
					i++;
				});

        var lasttab = {
          "button": $(tab_buttons).eq(0),
          "tab": $(tabs).eq(0)
        };

        //Hide all tabs bar the first
        $(tabs).hide();
        $(tabs).eq(0).show();

				function getActiveTab(){
					return $(ribbon).find('.ribbon_tabs li:not(.special).active');
				}

        //Create the minimise button
        var minimise_btn = document.createElement("div");

        minimise_btn.setAttribute("class", "minimise_button");

        $(ribbon).append(minimise_btn);

        $(tab_buttons).eq(0).addClass("active").show();

        $(ribbon).find("ul.ribbon_tabs li").click(function() {
          if (!($(this).hasClass('special'))) {
						var currentindex = getActiveTab().attr("data-tab-index");
            var currentTab = $(tabs).eq(currentindex);
            var removeActive = false;

            if ($(ribbon).hasClass("minimised")) {
              if (!$(this).hasClass("active")) {
                $(ribbon).removeClass("hidden");
                $(ribbon).addClass("open");
                $(tabs).hide();
              } else {
                $(ribbon).removeClass("open");
                $(ribbon).addClass("hidden");
                $(tabs).hide();
                removeActive = true;
              }
            }

						//Remove active class
            $(tab_buttons).removeClass("active");

            if (!removeActive) {
              $(this).addClass("active");
            }

            if($(ribbon).hasClass("minimised")){
              $(ribbon).removeClass("minimised");
              $(ribbon).removeClass("hidden");
              if(options.minimiseCallback !== null){
                options.minimiseCallback(false);
              }
            }

            var nextindex = $(this).attr("data-tab-index");

            var activeTab = $(tabs).eq(nextindex);
            if (currentTab !== activeTab) {
              //Animate if tab actually changes
              $(currentTab).hide();
              $(activeTab).show();
              if (currentindex < nextindex) {
                $(activeTab).css({
                  "margin-left": "-15px",
                  "opacity": 0.5
                }).animate({
                  "margin-left": 0,
                  "opacity": 1
                }, fade_duration);
              } else if (currentindex > nextindex) {
                $(activeTab).css({
                  "margin-left": "15px",
                  "opacity": 0.5
                }).animate({
                  "margin-left": 0,
                  "opacity": 1
                }, fade_duration);
              }
            }


            lasttab.button = $(this);
            lasttab.tab = $(activeTab);

          }
          if (!$(this).hasClass("link")) {
            return false;
          }

        });


        $(minimise_btn).html("&#9650;");
        $(minimise_btn).click(function() {
          //Minimise button
          $(ribbon).toggleClass("minimised");
          if ($(ribbon).hasClass("minimised")) {
            $(ribbon).addClass("hidden");
            $(ribbon).find('.ribbonbar').find("ribbon_tab").hide();
            var activeTab = $(ribbon).find(".active").find("a").attr("data-tab");
            $(activeTab).hide();
            $(minimise_btn).html("&#9660;");
            $(ribbon).find(".active").removeClass('active');
            if(options.minimiseCallback !== null){
              options.minimiseCallback(true);
            }
          } else {
            lasttab.button.addClass("active");
            lasttab.tab.show();
            $(ribbon).removeClass("hidden");
            $(minimise_btn).html("&#9650;");
            if(options.minimiseCallback !== null){
              options.minimiseCallback(false);
            }
          }

        });

        $('.ribbonbar li').on("click", function() {
          var _id = $(this).attr("id");
          var _src = $(this).find('a').text();
        });

        var h = 0;
        h = $(ribbon).height();
        //$(ribbon).css({"min-height" : h});



      });
    }
  });
})($);
