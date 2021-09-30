function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}class DistortedGallery extends React.PureComponent {
  constructor(props) {
    super(props);_defineProperty(this, "runAutochangeTO",



























    () => {
      this.changeTO = setTimeout(() => {
        this.changeImages();
        this.runAutochangeTO();
      }, this.AUTOCHANGE_TIME);
    });_defineProperty(this, "runAnimatingTO",

    () => {
      this.animatingTO = setTimeout(() =>
      this.setState({ noTransition: true, prevImgLeft: -1, prevImgRight: -1 }, () => {
        const layoutTrigger = this.galleryRef.offsetTop;
        this.setState({ noTransition: false, isAnimating: false });
      }),
      this.transitionTime);
    });_defineProperty(this, "getLimitIndex",

    () => this.props.images.length - 1);_defineProperty(this, "getImgIndex",

    targetIndex => {
      const limitIndex = this.getLimitIndex();
      if (targetIndex < 0) return limitIndex;
      if (targetIndex > limitIndex) return 0;
      return targetIndex;
    });_defineProperty(this, "changeImages",

    (back = false) => {
      window.clearTimeout(this.changeTO);
      if (this.state.isAnimating) return;
      const change = back ? -1 : 1;
      this.setState(st => {
        const activeImg = this.getImgIndex(st.activeImg + change);
        return {
          isAnimating: true,
          activeImg: activeImg,
          leftImg: this.getImgIndex(activeImg - 1),
          rightImg: this.getImgIndex(activeImg + 1),
          ...(back ? { prevImgRight: st.activeImg } : { prevImgLeft: st.activeImg }) };

      }, this.runAnimatingTO);
    });this.changeTO = null;this.animatingTO = null;this.AUTOCHANGE_TIME = 4000;this.transitionTime = 1000; // default value, updated in DidMount
    this.state = { isAnimating: false, activeImg: 0, leftImg: this.getLimitIndex(), rightImg: 1, prevImgLeft: -1, prevImgRight: -1, noTransition: false };}componentWillUnmount() {window.clearTimeout(this.changeTO);window.clearTimeout(this.animatingTO);}componentDidMount() {this.transitionTime = Number(getComputedStyle(this.galleryRef).getPropertyValue('--transition-time')); //this.runAutochangeTO();
  }render() {
    return /*#__PURE__*/(
      React.createElement("div", {
        className: classNames(
        'distorted-gallery',
        { 's--no-transition': this.state.noTransition }),

        ref: _gal => {this.galleryRef = _gal;} }, /*#__PURE__*/

      React.createElement("div", { className: "distorted-gallery__images" },
      this.props.images.map((src, i) => /*#__PURE__*/
      React.createElement("img", {
        className: classNames(
        'distorted-gallery__image',
        {
          's--active': i === this.state.activeImg,
          's--left': i === this.state.leftImg,
          's--right': i === this.state.rightImg,
          's--prev': i === this.state.prevImgLeft || i === this.state.prevImgRight,
          's--prev-left': i === this.state.prevImgLeft,
          's--prev-right': i === this.state.prevImgRight }),


        src: src,
        alt: `Cute Cat №${i + 1}` }))), /*#__PURE__*/



      React.createElement("div", {
        className: "distorted-gallery__control",
        onClick: () => this.changeImages(true) }), /*#__PURE__*/

      React.createElement("div", {
        className: "distorted-gallery__control distorted-gallery__control--right",
        onClick: () => this.changeImages() })));



  }}


const NUM_OF_IMAGES = 5;
const images = Array.from(Array(NUM_OF_IMAGES).keys()).map((i) =>
`images/${i}.jpg`);


ReactDOM.render( /*#__PURE__*/React.createElement(DistortedGallery, { images: images }), document.querySelector('#app'));