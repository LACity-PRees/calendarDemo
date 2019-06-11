var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }


var url="https://spreadsheets.google.com/feeds/list/1lz79dMIx0s5ItD0ooRqHsncQcxcwsS7YQQ5Xk1iNzSk/od6/public/values?alt=json";


$.getJSON(url, function req(json) {
  display(json.feed.entry.reverse());
});


var types = [{ category: "All" }, { category: "Arts" }, { category: "Business" }, { category: "City Government" }, { category: "Culture" }, { category: "Environment" }, { category: "Fairs" }, { category: "Family" }, { category: "General" }, { category: "Holiday" }, { category: "Parks" }, { category: "Shows" }, { category: "Tours" }, { category: "Training" }];

function filter(data, filterKeys) {
  var arr = [];

  if (filterKeys === "All") {
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      //console.log(current);
      arr.push(current);
    }
  }
   else {
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      if (current.gsx$eventtypes.$t.indexOf(filterKeys) >= 0) {
        arr.push(current);
      }
    }
    
  }

  return arr;
}

function display(json) {
  var arrButtons = [];
  var buttonStyle = {
    margin: '10px 10px 10px 0'
  };

  var ButtonClicks = function (_React$Component) {
    _inherits(ButtonClicks, _React$Component);

    function ButtonClicks(props) {
      _classCallCheck(this, ButtonClicks);

      var _this = _possibleConstructorReturn(this, (ButtonClicks.__proto__ || Object.getPrototypeOf(ButtonClicks)).call(this, props));

      _this.onClick = _this.onClick.bind(_this);
      return _this;
    }

    _createClass(ButtonClicks, [{
      key: 'onClick',
      value: function onClick(i) {
        var data = filter(json, i);
        var arr = [];
        if(data.length > 0){
          for (j = 0; j < data.length; j++) {
          arr.push(React.createElement(
            'p',
            { key: data[j].gsx$rawtitle.$t + j },
            data[j]["gsx$event-date"].$t,
            ' - ',
            he.decode(data[j].gsx$rawtitle.$t),
            ' '
          ));
          }
          draw(React.createElement(
            'div',
            null,
            arr
          ), results);
        }
        else{
            arr.push(React.createElement(
              'p',
              { key: 'empty' },
              
              'No events to display for this category.'
            ));
            }
            draw(React.createElement(
              'div',
              null,
              arr
            ), results);
        }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _loop = function _loop(_i) {
          arrButtons.push(React.createElement(
            'button',
            { style: buttonStyle, key: types[_i].category, id: types[_i].category, onClick: function onClick() {
                return _this2.onClick(types[_i].category);
              } },
            types[_i].category
          ));
        };

        for (var _i = 0; _i < types.length; _i++) {
          _loop(_i);
        }
        return React.createElement(
          'div',
          null,
          arrButtons
        );
      }
    }]);

    return ButtonClicks;
  }(React.Component);

  var buttonDiv = document.getElementById("test");
  var results = document.getElementById("test2");
  draw(React.createElement(ButtonClicks, null), buttonDiv);

  document.getElementById("All").click();

  showPage();

}

function draw(element, id) {
  ReactDOM.render(element, id);
}


function showPage() {
	document.getElementById("loader").style.display = "none";
	document.getElementById("content").style.display = "block";
}

function showLoader() {
	document.getElementById("loader").style.display = "block";
	document.getElementById("content").style.display = "none";
}