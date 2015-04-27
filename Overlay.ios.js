/**
 * @providesModule Overlay
 * @flow
 */

'use strict';

var createReactIOSNativeComponentClass = require('createReactIOSNativeComponentClass');
var ReactIOSViewAttributes = require('ReactIOSViewAttributes');
var Viewport = require('react-native-viewport');
var merge = require('merge');

var React = require('react-native');
var {
  View,
  PropTypes,
  StyleSheet,
} = React;

type Props = {
  isVisible: boolean;
}

var Overlay = React.createClass({
  getInitialState() {
    return {
      width: 0,
      height: 0
    }
  },
  getDefaultProps(): Props {
    return {
      isVisible: false,
      aboveStatusBar: true
    }
  },
  componentWillMount() {
    Viewport.getDimensions((dim) => this.setState({dim:dim}));
  },

  render() {
    var {
      isVisible,
    } = this.props;

    if (this.props.isVisible) {
      return (
        <RNOverlay visible={true} style={[styles.container, this.state.dim]} pointerEvents="none" aboveStatusBar={this.props.aboveStatusBar}>
          {React.Children.map(this.props.children, React.addons.cloneWithProps)}
        </RNOverlay>
      );
    } else {
      return <View />;
    }
  },
});

var RNOverlay = createReactIOSNativeComponentClass({
  validAttributes: merge(ReactIOSViewAttributes.UIView, {visible: true, aboveStatusBar: true}),
  uiViewClassName: 'RNOverlay',
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  },
})

module.exports = Overlay;
