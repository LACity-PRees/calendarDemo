var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var today = new Date();
var next = new Date();
next.setDate(next.getDate() + 7);

var todayDate = today.getDate();
var todayMonth = today.getMonth() + 1;
var todayYear = today.getFullYear();

//console.log('today', todayYear + '-' + todayMonth + '-' + todayDate );

var nextDate = next.getDate();
var nextMonth = next.getMonth() + 1;
var nextYear = next.getFullYear();

//console.log('next', nextYear + '-' + nextMonth + '-' + nextDate );

var url = 'https://calendar.lacity.org/rest/views/calendar_rest_dynamic?display_id=services_1&display_id=services_1&filters[eventtype]=421,596,686,281,286,291,296,711,781,306,396,736,341,406,411,356&filters[department]=&filters[tags]=&filters[start][value][date]=';

url += todayYear + '-' + todayMonth + '-' + todayDate;

url += '&filters[end][value][date]=';

url += nextYear + '-' + nextMonth + '-' + nextDate;

//console.log(url);


$.getJSON(url, function req(json) {
  display(json);
});

var PRODUCTS = [{ category: "entertainment, sports", name: "Football" }, { category: "entertainment, sports", name: "Baseball" }, { category: "entertainment, sports", name: "Basketball" }, { category: "apple, entertainment, fashion, music", name: "iPod Touch" }, { category: "apple, design, phone", name: "iPhone 5" }, { category: "design", name: "Nexus 7" }, { category: "leisure", name: "Holiday" }];
//console.log(PRODUCTS);
// get unique category items

var types = [{ category: "All" }, { category: "Arts" }, { category: "Business" }, { category: "City Government" }, { category: "Culture" }, { category: "Environment" }, { category: "Fairs" }, { category: "Family" }, { category: "General" }, { category: "Holiday" }, { category: "Parks" }, { category: "Shows" }, { category: "Tours" }, { category: "Training" }];

function filter(data, filterKeys) {
  var arr = [];

  if (filterKeys === "All") {
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      arr.push(current);
    }
  } else {
    for (i = 0; i < data.length; i++) {
      var current = data[i];
      if (current.eventtypes.indexOf(filterKeys) >= 0) {
        arr.push(current);
      }
    }
  }
  if (arr.length === 0) {
    arr.push({ rawtitle: "No events to display for this category." });
  }
  return arr;
}

function display(json) {
  //console.log(json);
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
        console.log(i);
        var data = filter(json, i);
        var arr = [];
        for (j = 0; j < data.length; j++) {
          arr.push(React.createElement(
            'p',
            { key: data[j].rawtitle + j },
            data[j]["event-date"],
            ' - ',
            data[j].rawtitle,
            ' '
          ));
        }
        draw(React.createElement(
          'div',
          null,
          arr
        ), results);
        //console.log(filter(PRODUCTS, i));
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

  function draw(element, id) {
    ReactDOM.render(element, id);
  }
}
