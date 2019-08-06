(function($) {

    $.fn.menumaker = function(options) {
        
        var menu = $(this), settings = $.extend({
          title: "Menu",
          format: "dropdown",
          sticky: false
        }, options);
  
        return this.each(function() {
          menu.prepend('<div id="menu-button">' + settings.title + '</div>');
          $(this).find("#menu-button").on('click', function(){
            $(this).toggleClass('menu-opened');
            var mainmenu = $(this).next('ul');
            if (mainmenu.hasClass('open')) { 
              mainmenu.hide().removeClass('open');
            }
            else {
              mainmenu.show().addClass('open');
              if (settings.format === "dropdown") {
                mainmenu.find('ul').show();
              }
            }
          });
  
          menu.find('li ul').parent().addClass('has-sub');
  
          multiTg = function() {
            menu.find(".has-sub").prepend('<span class="submenu-button"></span>');
            menu.find('.submenu-button').on('click', function() {
              $(this).toggleClass('submenu-opened');
              if ($(this).siblings('ul').hasClass('open')) {
                $(this).siblings('ul').removeClass('open').hide();
              }
              else {
                $(this).siblings('ul').addClass('open').show();
              }
            });
          };
  
          if (settings.format === 'multitoggle') multiTg();
          else menu.addClass('dropdown');
  
          if (settings.sticky === true) menu.css('position', 'fixed');
  
          resizeFix = function() {
            if ($( window ).width() > 768) {
              menu.find('ul').show();
            }
  
            if ($(window).width() <= 768) {
              menu.find('ul').hide().removeClass('open');
            }
          };
          resizeFix();
          return $(window).on('resize', resizeFix);
  
        });
    };
  })(jQuery);
  
  (function($){
  $(document).ready(function(){
  
  $(document).ready(function() {
    $("#menu").menumaker({
      title: "",
      format: "multitoggle"
    });
  
    $("#menu").prepend("<div id='menu-line'></div>");
  
  //var foundActive = false, activeElement, linePosition = 0, menuLine = $("#menu #menu-line"), lineWidth, defaultPosition, defaultWidth;
  
  $("#menu > ul > li").each(function() {
    if ($(this).hasClass('active')) {
      activeElement = $(this);
      foundActive = true;
    }
  });
  
  if (foundActive === false) {
    activeElement = $("#menu > ul > li").first();
  }
  
  defaultWidth = lineWidth = activeElement.width();
  
  defaultPosition = linePosition = activeElement.position().left;
  
  menuLine.css("width", lineWidth);
  menuLine.css("left", linePosition);
  
  $("#menu > ul > li").hover(function() {
    activeElement = $(this);
    lineWidth = activeElement.width();
    linePosition = activeElement.position().left;
    menuLine.css("width", lineWidth);
    menuLine.css("left", linePosition);
  }, 
  function() {
    menuLine.css("left", defaultPosition);
    menuLine.css("width", defaultWidth);
  });
  
  });
  
  
  });
  })(jQuery);
  
  
  
  (function($) {
      $.fn.list_nav = function(b) {
          var c,
          item,
          httpAdress;
          b = jQuery.extend({
              Speed: 220,
              autostart: 0,
              autohide: 0
          },
          b);
          c = $(this);
          item = c.children("ul").parent("li").children("em");
          httpAdress = window.location;
          item.addClass("inactive");
          function _item() {
              var a = $(this);
              if (b.autohide) {
                  a.parent().parent().find(".active").parent("li").children("ul").slideUp(b.Speed / 1.2, 
                  function() {
                      $(this).parent("li").children("em").removeAttr("class");
                      $(this).parent("li").children("em").attr("class", "inactive")
                  })
              }
              if (a.attr("class") == "inactive") {
                  a.parent("li").children("ul").slideDown(b.Speed, 
                  function() {
                      a.removeAttr("class");
                      a.addClass("active")
                  })
              }
              if (a.attr("class") == "active") {
                  a.removeAttr("class");
                  a.addClass("inactive");
                  a.parent("li").children("ul").slideUp(b.Speed)
              }
          }
          item.unbind('click').click(_item);
          if (b.autostart) {
              c.children("a").each(function() {
                  if (this.href == httpAdress) {
                      $(this).parent("li").parent("ul").slideDown(b.Speed, 
                      function() {
                          $(this).parent("li").children(".inactive").removeAttr("class");
                          $(this).parent("li").children("em").addClass("active")
                      })
                  }
              })
          }
      }
  })(jQuery);