$('#memoir-search').on('input', function() {
  var search = $(this).serialize();
  if(search === "search=") {
    search = "all"
  }
  $.get('/memoirs?' + search, function(data) {
    $('#memoir-grid').html('');
    data.forEach(function(memoir) {
      $('#memoir-grid').append(`
        <div class="col-md-3 col-sm-6">
          <div class="thumbnail">
            <img src="${ memoir.image }">
            <div class="caption">
              <h4>${ memoir.name }</h4>
            </div>
            <p>
              <a href="/memoirs/${ memoir._id }" class="btn btn-primary">More Info</a>
            </p>
          </div>
        </div>
      `);
    });
  });
});

$('#memoir-search').submit(function(event) {
  event.preventDefault();
});