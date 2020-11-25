// Code to convert select to UL
$('.select').each(function(){
  var $select = $(this).find('select'),
      $list = $('<ul />');
$select.find('option').each(function(){
    $list.append('<li>' + $(this).text() + '</li>');
});
//Remove the select after the values are taken
$select.after( $list ).remove();
 

//Append Default text to show the selected
$(this).append('<span>select</span>')
var firsttxt = $(this).find('li:first-child').text();
$(this).find('span').text(firsttxt)

// On click show the UL
$(this).on('click','span',function(e){
    e.stopPropagation();
    $(this).parent().find('ul').fadeToggle();
});

// On select of list select the item
$(this).on('click','li',function(){
    var gettext = $(this).text();
    $(this).parents('.select').find('span').text(gettext);
    $(this).parent().fadeOut();
});  
    
});


// On click out hide the UL
$(document).on('click',function(){
    $('.select ul').fadeOut();
});


$('.btn-more').on('click', function() {
   $('.gigm-routes').css({"height": "100%"}); 
});





$(document).ready(function(){
    $(".dropdown").on('hover',            
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown("fast");
            $(this).toggleClass('open');        
        },
        function() {
            $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp("fast");
            $(this).toggleClass('open');       
        }
    );
});






function isNumber(evt) {
  evt = (evt) ? evt : window.event;
  var charCode = (evt.which) ? evt.which : evt.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}



$(function() {
  $('.visitor-toggle').click(function() {
    $('.visitor-control').slideToggle();
  });

  $(".increment").on("click", function() {
    var $button = $(this);
    var $input = $button.closest('.adult').find("input.count-ctrl");
    $input.val(function(i, value) {
      return +value + (1 * +$button.data('multi'));
    });
    if (Number($input.val()) < 0) {
      $input.val(0);
    }

  });

});


///panel for faq page
function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);
