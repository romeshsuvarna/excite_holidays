$(document).ready(function() {

				  var size = $("#data > p").size();
			      $(".Column1 > p").each(function (index) {
			          if (index >= size / 2) {
			              $(this).appendTo("#Column2");
			          }
			      });

				$('.infiniteCarousel').infiniteCarousel();
				var n = $("#context > div > div").size();



					if (n == 3){
						   
						    $('#context > .container_12 > div ').addClass('grid_4');
						}
					 else if (n == 2){
						   
						    $('#context > .container_12 > div ').addClass('grid_6');
						}
					 else if (n >= 4){
						   
						    $('#context > .container_12 > div ').addClass('grid_4');
							$("#context > .container_12 > div:nth-child(3n)").after("<div style='clear:both;'></div>")
							if(n % 3 == 1 ){
								$('#context > .container_12 > div').last().removeClass('grid_4').addClass('grid_12');
								
							}
							if(n % 3 == 2 ){
								$('#context > .container_12 > div:nth-last-child(-n+2)').removeClass('grid_4').addClass('grid_6');
							}
						}

						else {
						     $('#context > .container_12 > div ').addClass('grid_12');
						}



						//  When user clicks on tab, this code will be executed
					    $("#tabs li").click(function() {
					        //  First remove class "active" from currently active tab
					        $("#tabs li").removeClass('active');
					 
					        //  Now add class "active" to the selected/clicked tab
					        $(this).addClass("active");
					 
					        //  Hide all tab content
					        $(".tab_content").hide();
					 
					        //  Here we get the href value of the selected tab
					        var selected_tab = $(this).find("a").attr("href");
					 
					        //  Show the selected tab content
					        $(selected_tab).fadeIn();
					 
					        //  At the end, we add return false so that the click on the link is not executed
					        return false;
					    });




	
			});

			$.fn.infiniteCarousel = function () {

		    function repeat(str, num) {
		        return new Array( num + 1 ).join( str );
		    }
		  
		    return this.each(function () {
		        var $wrapper = $('> div', this).css('overflow', 'hidden'),
		            $slider = $wrapper.find('> ul'),
		            $items = $slider.find('> li'),
		            $single = $items.filter(':first'),
		            
		            singleWidth = $single.outerWidth(), 
		            visible = Math.ceil($wrapper.innerWidth() / singleWidth),
		             // note: doesn't include padding or border
		            	
		            currentPage = 1,
		            pages = Math.ceil($items.length / visible);


		        // 1. Pad so that 'visible' number will always be seen, otherwise create empty items
		        if (($items.length % visible) != 0) {
		            $slider.append(repeat('<li class="empty" />', visible - ($items.length % visible)));
		            $items = $slider.find('> li');
		        }

		        // 2. Top and tail the list with 'visible' number of items, top has the last section, and tail has the first
		        $items.filter(':first').before($items.slice(- visible).clone().addClass('cloned'));
		        $items.filter(':last').after($items.slice(0, visible).clone().addClass('cloned'));
		        $items = $slider.find('> li'); // reselect
		        
		        // 3. Set the left position to the first 'real' item
		        $wrapper.scrollLeft(singleWidth * visible);	
		        
		        // 4. paging function
		        function gotoPage(page) {
		            var dir = page < currentPage ? -1 : 1,
		                n = Math.abs(currentPage - page),
		                left = singleWidth * dir * visible * n;
		            
		            $wrapper.filter(':not(:animated)').animate({
		                scrollLeft : '+=' + left
		            }, 500, function () {

		                if (page == 0) {
		                    $wrapper.scrollLeft(singleWidth * visible * pages);
		                    page = pages;
		                } else if (page > pages) {
		                    $wrapper.scrollLeft(singleWidth * visible);
		                    // reset back to start position
		                    page = 1;
		                } 

		                currentPage = page;
		            });                
		            
		            return false;
		        }
		        
		        $wrapper.after('<a class="arrow back">&lt;</a><a class="arrow forward"></a>');
		        
		        // 5. Bind to the forward and back buttons
		        $('a.back', this).click(function () {
		            return gotoPage(currentPage - 1);                
		        });
		        
		        $('a.forward', this).click(function () {
		            return gotoPage(currentPage + 1);
		        });
		        
		        // create a public interface to move to a specific page
		        $(this).bind('goto', function (event, page) {
		            gotoPage(page);
		        });
		    });  
		};