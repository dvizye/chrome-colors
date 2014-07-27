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

Template.hello.helpers({
  colors : function() {
    return [{key: "test", value: "00FF22", id: "5"}, {key: "other", value: "00FF22", id: "6"}];
  }
})
