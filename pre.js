var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

//divs
var div1 = document.getElementById('test');
var div2 = document.getElementById('test2');

function time() {
    var element = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            'Hello!'
        ),
        React.createElement(
            'p',
            null,
            'It is ',
            new Date().toLocaleTimeString()
        )
    );
    draw(element, div1);
}

setInterval(time, 1000);

//create the element
function draw(element, id) {
    ReactDOM.render(element, id);
}

$.getJSON('http://calendar2.cityofla.acsitefactory.com/rest/views/calendar_rest_dynamic?display_id=services_1&display_id=services_1&filters[eventtype]=421,596,686,281,286,291,296,711,781,306,396,736,341,406,411,356&filters[department]=&filters[tags]=&filters[start][value][date]=2017-11-01&filters[end][value][date]=2017-11-07&filters[featured]=Yes', function req(json) {
    display(json);
});

function display(jsonData) {
    console.log(jsonData);
    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
            }
        }return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
    }();

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }return call && ((typeof call === 'undefined' ? 'undefined' : _typeof(call)) === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === 'undefined' ? 'undefined' : _typeof(superClass)));
        }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    var ProductItem = function ProductItem(_ref) {
        var category = _ref.category,
            name = _ref.name;
        return React.createElement("div", { className: "category__list-item box flex-spread" }, name, React.createElement("div", { className: "category--" + category + " circle" }));
    };

    var ProductItems = function ProductItems(_ref2) {
        var _ref2$state = _ref2.state,
            products = _ref2$state.products,
            displayCategory = _ref2$state.displayCategory;
        return React.createElement("div", null, products.filter(function (_ref3) {
            var category = _ref3.eventtypes;
            return displayCategory === category || displayCategory === "all";
        }).map(function (_ref4) {
            var category = _ref4.category,
                name = _ref4.rawtitle;
            return React.createElement(ProductItem, {
                key: "Event-" + name,
                category: category,
                name: name
            });
        }));
    };

    var ButtonCategories = function ButtonCategories(productCategories, setCategory) {
        return productCategories.map(function (category) {
            return React.createElement("button", {
                key: category,
                className: "btn-" + category,
                onClick: function onClick() {
                    return setCategory(category);
                }
            }, category);
        });
    };

    var UI = function UI(_ref5) {
        var state = _ref5.state,
            productCategories = _ref5.state.productCategories,
            setCategory = _ref5.setCategory;
        return React.createElement("div", { className: "box flex-row" }, React.createElement("div", { className: "box flex-col" }, React.createElement("h3", null, "Filter by Category"), ButtonCategories(productCategories, setCategory)), React.createElement("div", { className: "box flex-col" }, React.createElement("h3", null, "Results"), React.createElement(ProductItems, { state: state })));
    };

    var Main = function (_React$Component) {
        _inherits(Main, _React$Component);

        function Main(props) {
            _classCallCheck(this, Main);

            var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

            _this.state = {
                displayCategory: "all",
                products: props.products,
                productCategories: props.productCategories
            };
            _this.setCategory = _this.setCategory.bind(_this);
            return _this;
        }

        _createClass(Main, [{
            key: "setCategory",
            value: function setCategory(category) {
                this.setState({
                    displayCategory: category
                });
            }
        }, {
            key: "render",
            value: function render() {
                return React.createElement(UI, { setCategory: this.setCategory, state: this.state });
            }
        }]);

        return Main;
    }(React.Component);

    // data


    var PRODUCTS = jsonData;

    // get unique category items
    var uniqueItems = function uniqueItems(x, i, array) {
        return array.indexOf(x) === i;
    };
    var PRODUCT_CATEGORIES = PRODUCTS.map(function (prod) {
        return prod.eventtypes;
    }).filter(uniqueItems);

    PRODUCT_CATEGORIES.push("all");
    PRODUCT_CATEGORIES.sort();

    ReactDOM.render(React.createElement(Main, { products: PRODUCTS, productCategories: PRODUCT_CATEGORIES }), document.getElementById("test2"));
}