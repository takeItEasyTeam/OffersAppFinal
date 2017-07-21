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
  $('#sortByPrice-High').on('click', function(e){
    const currentPath ={
      path: window.location.pathname,
      order: -1,
    };
    $.ajax({
      type: 'POST',
      url: '/sort',
      data: currentPath,
      success: function(response) {
        getTemplateAjax(response);
      },
      error: function(err) {
        console.log(err);
      },
    });
  });
  $('#sortByPrice-Low').on('click', function(e){
    const currentPath ={
      path: window.location.pathname,
      order: 1,
    };
    $.ajax({
      type: 'POST',
      url: '/sort',
      data: currentPath,
      success: function(response) {
        getTemplateAjax(response);
      },
      error: function(err) {
        console.log(err);
      },
    });
  });


  function getTemplateAjax(dataFromApi) {
    let source;
    let template;
    let test;

    $.ajax({
        url: `/static/templates/testovo.handlebars`,
        cache: true,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            test = template(dataFromApi);
            $('.proba').html(test);
        }
    });
  };
});
