/*
 * 	Simple Image Slider 1.0 - jQuery plugin
 *	written by Mike Fey	
 *	http://mikefey.com
 *
 *	Copyright (c) 2011 Mike Fey (mikefey.com)
 *
 *	Built for jQuery library
 *	http://jquery.com
 *
 */

(function($) {

	$.fn.simpleSlider = function(options){
	  
		// default configuration properties
		var defaults = {			
			prevId: 			'sliderPrevBtn',
			nextId: 			'sliderNextBtn',	
			speed: 				1000,
			width: 				550,
			height:				300,
			fade: 				false,
			useAddress:     	false,
			numberButtons:  	false,
			numberButtonId: 	'numberButtons',
			numberSeperator: 	'/'   
		}; 
		
		var options = $.extend(defaults, options);
		var mainDiv = $(this);
		var innerDiv = mainDiv.find('#sliderInner');
		var mainDivWidth = 0;
		var prevBtn;
		var nextBtn;
		var curItem = 0;
		var totalItemLength = mainDiv.find('li').length;
		var divArray = [];
		var itemMarginLeft = 0;
		var itemMarginRight = 0;
		var numberContainer;
		  
		this.each(function() {
			
			prevBtn = $('#' + options.prevId);
			nextBtn = $('#' + options.nextId);
   			
			mainDiv.css({'width' : options.width + 'px', 'height' : options.height + 'px', 'overflow' : 'hidden'});
			
			var sliderPos = mainDiv.find('li:first').position(); 
			var curPos = innerDiv.css('margin-left').substr(0, innerDiv.css('margin-left').length -2);
			var lPos = -(sliderPos.left - curPos);
			
			innerDiv.css({'margin-left' : lPos});  
		   
			mainDiv.find('li').each(function(intIndex){
				
				if(options.fade == true){
					if(intIndex > 0){
						$(this).css({opacity : 0.0});
					}
				}
				
				divArray.push($(this));
				
				itemMarginLeft = $(this).css('margin-left');
				itemMarginLeft = itemMarginLeft.substr(0, itemMarginLeft.length - 2);
				
				var itemMarginRight = $(this).css('margin-right');
				itemMarginRight = itemMarginRight.substr(0, itemMarginRight.length - 2);
				
		   		mainDivWidth = mainDivWidth + ($(this).width() + Number(itemMarginLeft) + Number(itemMarginRight));  
			   	$(this).css({'position' : 'relative', 'float' : 'left'});
			});
			
			mainDivWidth = (mainDivWidth + itemMarginLeft + itemMarginRight);
			
			innerDiv.css({'width' : mainDivWidth + 'px'});
			
			prevBtn.css({'cursor' : 'pointer'});
			nextBtn.css({'cursor' : 'pointer'});
			
			//layout number buttons
			if(options.numberButtons == true){
			  
			  numberContainer = $('#' + options.numberButtonId);
			  var ns = '<ul>'; 
			 
			  for(var i = 0; i<divArray.length; i++){
			  	ns += '<li id="numberButton-' + (i+1) + '" style="float:left;list-style:none;"><a href="#">' + (i + 1) + '</a></li>';
				if(i < divArray.length - 1){
				   ns += '<span style="float:left;">&nbsp;' + options.numberSeperator + '&nbsp;</span>'; 
				}
			  }
			
			  numberContainer.html(ns);
			  disableNumberButton(curItem);
			
			  numberContainer.find('a').click(function(){
				  var nId = $(this).parent().attr('id');
				  nId = nId.substr(13, nId.length - 1);
				  curItem = Number(nId - 1);
				  if(options.useAddress == true){
  					$.address.value('/' + (Number(curItem) + 1));
  				}else{
  				 	showPic();
  				}
  				
  				disableNumberButton(curItem);
  				
				  return false;
			  });
			}
			
			function disableNumberButton(num){
			  numberContainer.find('a').each(function(intIndex){
			    if(intIndex == num){
			      $(this).addClass('numberSelected');
			    }else{
			      $(this).removeClass('numberSelected');
			    }
		    });
			}
			
      prevBtn.click(function(){     
            	curItem--;
				if(curItem < 0){
				   curItem = divArray.length - 1;
				}
				
				if(options.useAddress == true){
					$.address.value('/' + (curItem + 1));
				}else{
				 	showPic();
				}
 
      });
            
			nextBtn.click(function(){
				curItem++;
				if(curItem > divArray.length - 1){
					curItem = 0;
				}
				
				if(options.useAddress == true){
					$.address.value('/' + (curItem + 1));
				}else{
				 	showPic();
				}
				
		
      });

			function showPic(){
				 
				var sliderPos = divArray[curItem].position();
				var curPos = innerDiv.css('margin-left').substr(0, innerDiv.css('margin-left').length -2);     
            	var lpos = -(sliderPos.left - curPos);

				innerDiv.stop(true, true).animate({
			      marginLeft:lpos,
			    },
			    {
			      duration: options.speed,  
			      specialEasing: {  
			        marginLeft: 'easeInOutExpo' } 
			      });
				
				if(options.fade == true){
					fadeOutDivs(curItem);
				}
			}

			function fadeOutDivs(cur){
				
				mainDiv.find('li').each(function(intIndex){
					if(intIndex != cur){
						
						divArray[intIndex].stop(true, true).animate({
							opacity:0,
						},
						{
						  duration: options.speed/2,  
						  specialEasing: {  
						    opacity: 'easeOutSine' } 
						  });
					}
				});
				
			   	divArray[cur].stop(true, true).animate({
			      opacity:1.0,
			    },
			    {
			      duration: options.speed/2,  
			      specialEasing: {  
			        opacity: 'easeOutSine' } 
			      });
				
			}
			
			//if plugin is using address
			if(options.useAddress == true){
			  	$.address.change(function(event) {
					
					if(event.value == '/'){
						curItem = 0;
					}else{
						curItem = Number(event.value.substr(1, event.value.length)) - 1;
					}
					
					disableNumberButton(curItem); 
					
					if(divArray[curItem] != undefined){
						showPic();
					}
					
					 
				});  
			}
			
			 
		})
	  
	}

})(jQuery);



