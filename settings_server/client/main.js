Template.hello.rendered=function() {
  $('.colorSelector').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
      $(this).attr("id","colorActive");
      $(colpkr).fadeIn(50);
      $(colpkr).css({
        zIndex: 10,
        left: 22,
        "margin-top": "9px",
      });
      return false;
    },
    onHide: function (colpkr) {
      $("#colorActive").attr("id","notActive");
      // $(this).css('backgroundColor', '#' + hex);
      $(colpkr).fadeOut(50);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      $("#colorActive div").css('backgroundColor', '#' + hex);
      $("#colorActive").parent().parent().children("#textInput").attr('placeholder', "#" + hex);
      parent.postMessage("hi", "*");
    }
  });

  $("#menuButton").click(function() {
    parent.close();
  });
}

// +Template.colors.helpers({
// +  colors: function() {
// +    ["a", "b"]
// +  };
// +  // colors: function() {
// +  //   if (user && url != "none") {
// +  //       var schemeId = user.urls[url]
// +  //       return Scheme.find({schemeName: schemeId});
// +  //   }
// +  //   return [];
// +  // }
// +});

var buttons = function() {
  // if (user && user["urls"] && user.urls[url] != "null") {
    var url = "www.facebook.com"
    console.log("cool", url);

    // var schemeId = user.urls["twitter.com"];
    console.log("i found", Schemes.find({name: url}).fetch())
    return Schemes.find({name: url});
  // } else {
    // console.log("ok", url);
    // return [];
  // }
}

Template.hello.helpers({
  colors : function() {
    return buttons();
    // return
    // return [{key: "test", value: "00FF22", id: "5"}, {key: "other", value: "00FF22", id: "6"}];
  }
})
