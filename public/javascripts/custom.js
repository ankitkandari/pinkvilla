$(window).scroll(function () {
  if (
    Math.round($(window).scrollTop()) ==
    $(document).height() - $(window).height()
  ) {
      loadMore();
  }
});

$(document)
  .ajaxStart(function () {
    $(".pv_loader").show();
  })
  .ajaxStop(function () {
    $(".pv_loader").hide("slow");
  });

function loadMore() {
  page++;
  $.ajax({
    url: `${apiUrl}${page}`,
    success: function (res) {
      console.log(res);
      if (res?.nodes?.length > 0) {
        let feeds = res?.nodes;
        let wrapper = $(".feed_wrapper");
        feeds.forEach(function ({ node }) {
          wrapper.append(`
            <div class="feed card mb-3">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="${apiDomain}${node.ImageStyle_thumbnail}"
                    class="img-fluid rounded-start"
                    alt="${node.title}"
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${node.title}</h5>
                    <p class="card-text">
                      <small class="text-muted">${timeDiff(
                        parseInt(node.last_update)
                      )}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            `);
        });
      }
    },
  });
}

function timeDiff(unixTime) {
  var ms_Min = 60 * 1000;
  var ms_Hour = ms_Min * 60;
  var ms_Day = ms_Hour * 24;
  var ms_Mon = ms_Day * 30;
  var ms_Yr = ms_Day * 365;
  var diff = new Date() - new Date(unixTime * 1000);

  if (diff < ms_Min) {
    return Math.round(diff / 1000) + " seconds ago";
  } else if (diff < ms_Hour) {
    return Math.round(diff / ms_Min) + " minutes ago";
  } else if (diff < ms_Day) {
    return Math.round(diff / ms_Hour) + " hours ago";
  } else if (diff < ms_Mon) {
    return Math.round(diff / ms_Day) + " days ago";
  } else if (diff < ms_Yr) {
    return Math.round(diff / ms_Mon) + " months ago";
  } else {
    return Math.round(diff / ms_Yr) + " years ago";
  }
}
