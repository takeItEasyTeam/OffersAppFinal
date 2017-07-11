$(document).ready(function(){
  $('.delete-offer').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/' +id,
      success: function(response) {
        alert('Deleting Offer');
        window.location.href='/';
      },
      error: function(err) {
        console.log(err);
      },
    });
  });
});
