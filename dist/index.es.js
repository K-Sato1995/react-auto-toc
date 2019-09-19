import React from 'react';
import PropTypes from 'prop-types';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Toc = function (_React$Component) {
  inherits(Toc, _React$Component);

  function Toc() {
    classCallCheck(this, Toc);
    return possibleConstructorReturn(this, (Toc.__proto__ || Object.getPrototypeOf(Toc)).apply(this, arguments));
  }

  createClass(Toc, [{
    key: 'stringReplacer',
    value: function stringReplacer(string, regex, mark) {
      return string.replace(regex, mark);
    }
  }, {
    key: 'createLink',
    value: function createLink(string) {
      var shapedString = string.toLowerCase().replace(/#+\s/, '#').trimRight();
      var strArr = shapedString.split(' ');
      var anchor = strArr.join('-');
      return this.stringReplacer(anchor, /[?!]/g, '-');
    }
  }, {
    key: 'trimString',
    value: function trimString(string, limit) {
      if (string.length >= limit) {
        var slicedString = string.slice(0, limit);
        return slicedString + '..';
      }
      return string;
    }
  }, {
    key: 'returnTitle',
    value: function returnTitle(string) {
      var link = this.createLink(string);
      var titleLimit = this.props.limit ? this.props.limit : 50;
      var title = this.trimString(this.stringReplacer(string, /#+/g, ''), titleLimit);
      return React.createElement(
        'a',
        { href: '' + link },
        title,
        '}'
      );
    }
  }, {
    key: 'createAnchorLink',
    value: function createAnchorLink(string) {
      if (/^#{1}\s[\s\S]/.test(string)) {
        return React.createElement(
          'li',
          { className: 'header1' },
          this.returnTitle(string)
        );
      } else if (/^#{2}\s[\s\S]/.test(string)) {
        return React.createElement(
          'li',
          { className: 'header2' },
          this.returnTitle(string)
        );
      } else if (/^#{3}\s[\s\S]/.test(string)) {
        return React.createElement(
          'li',
          { className: 'header3' },
          this.returnTitle(string)
        );
      } else {
        return '';
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var regex = /#+\s[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf\w\s!?()//]+\n/g;
      var codeRegex = /```*([\s\S]+?)```/g;
      var content = this.stringReplacer(this.props.markdownText, codeRegex, ' ');
      var headers = void 0;
      if (typeof content === 'string') {
        headers = content.match(regex);
      }
      var toc = headers.map(function (header) {
        return React.createElement(
          'li',
          null,
          _this2.createAnchorLink(header)
        );
      });
      return React.createElement(
        'div',
        null,
        React.createElement(
          'ul',
          null,
          toc
        )
      );
    }
  }]);
  return Toc;
}(React.Component);

Toc.propTypes = {
  markdownText: PropTypes.string,
  limit: PropTypes.number
};

export default Toc;
//# sourceMappingURL=index.es.js.map
