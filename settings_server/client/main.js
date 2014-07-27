Template.hello.rendered=function() {
  $('.colorSelector').ColorPicker({
    color: '#0000ff',
    onShow: function (colpkr) {
      $(colpkr).fadeIn(50);
      $(colpkr).css({
        zIndex: 10,
        left: 22,
        "margin-top": "9px",
      });
      return false;
    },
    onHide: function (colpkr) {
      $(colpkr).fadeOut(50);
      return false;
    },
    onChange: function (hsb, hex, rgb) {
      console.log($(this));
      $(this).children().css('backgroundColor', '#' + hex);
      document.getElementsByName('textInput')[0].placeholder=hex;
    }
  });

  $("#menuButton").click(function() {
    parent.close();
  });
}

Template.hello.helpers({
  colors : function() {
    return [{key: "test", value: "00FF22"}, {key: "other", value: "00FF22"}];
  }
})
