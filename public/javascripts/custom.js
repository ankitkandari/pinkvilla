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
      if (res?.data?.length > 0) {
        let feeds = res?.data;
        let wrapper = $(".feed_wrapper");
        feeds.forEach(function (node) {
          wrapper.append(`
            <div class="col">
                <div class="feed card">
                    <img src="${node?.image?.url}" class="img-fluid pv_img" alt="${node?.image?.caption}" />
                    <div class="card-body">
                        <a href="${node?.url}">
                            <h5 class="card-title">
                            ${node?.title}
                            </h5>
                        </a>
                        <p class="card-text">
                            <small class="text-muted">${timeDiff(node?.date)}</small>
                        </p>
                    </div>
                </div>
            </div>
            `);
        });
      }
    },
  });
}

function timeDiff(dateTime) {
  var ms_Min = 60 * 1000;
  var ms_Hour = ms_Min * 60;
  var ms_Day = ms_Hour * 24;
  var ms_Mon = ms_Day * 30;
  var ms_Yr = ms_Day * 365;
  var diff = new Date() - new Date(dateTime);

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
