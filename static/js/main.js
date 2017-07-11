$(document).ready(function(){
  $('.delete-offer').on('click', function(e){
    $target = $(e.target);
    const id = $target.attr('data-id');
    $.ajax({
      type: 'DELETE',
      url: '/' +id,
      success: function(response) {
        window.location.href='/profile';
      },
      error: function(err) {
        console.log(err);
      },
    });
  });
});
