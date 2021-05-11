window.CanvasSlideshow = function (e) {
  var t = this;
  ((e = e || {}).stageWidth = e.hasOwnProperty('stageWidth')
    ? e.stageWidth
    : 2600),
    (e.stageHeight = e.hasOwnProperty('stageHeight') ? e.stageHeight : 1712),
    (e.pixiSprites = e.hasOwnProperty('sprites') ? e.sprites : []),
    (e.texts = e.hasOwnProperty('texts') ? e.texts : []),
    (e.autoPlay = !e.hasOwnProperty('autoPlay') || e.autoPlay),
    (e.autoPlaySpeed = e.hasOwnProperty('autoPlaySpeed')
      ? e.autoPlaySpeed
      : [10, 3]),
    (e.fullScreen = !e.hasOwnProperty('fullScreen') || e.fullScreen),
    (e.displaceScale = e.hasOwnProperty('displaceScale')
      ? e.displaceScale
      : [200, 70]),
    (e.displacementImage = e.hasOwnProperty('displacementImage')
      ? e.displacementImage
      : ''),
    (e.navElement = e.hasOwnProperty('navElement')
      ? e.navElement
      : document.querySelectorAll('.slider-ttl_area')),
    (e.displaceAutoFit =
      !!e.hasOwnProperty('displaceAutoFit') && e.displaceAutoFit),
    (e.wacky = !!e.hasOwnProperty('wacky') && e.wacky),
    (e.interactive = !!e.hasOwnProperty('interactive') && e.interactive),
    (e.interactionEvent = e.hasOwnProperty('interactionEvent')
      ? e.interactionEvent
      : ''),
    (e.displaceScaleTo = !1 === e.autoPlay ? [0, 0] : [20, 20]),
    (e.textColor = e.hasOwnProperty('textColor') ? e.textColor : '#fff'),
    (e.displacementCenter =
      !!e.hasOwnProperty('displacementCenter') && e.displacementCenter),
    (e.dispatchPointerOver =
      !!e.hasOwnProperty('dispatchPointerOver') && e.dispatchPointerOver);
  var a = new PIXI.autoDetectRenderer(e.stageWidth, e.stageHeight, {
      transparent: !0,
    }),
    i = new PIXI.Container(),
    n = new PIXI.Container(),
    r = new PIXI.Sprite.fromImage(e.displacementImage),
    s = new PIXI.filters.DisplacementFilter(r),
    l = new PIXI.TextStyle({
      fill: e.textColor,
      wordWrap: !0,
      wordWrapWidth: 400,
      letterSpacing: 20,
      fontSize: 14,
    });
  if (
    ((this.currentIndex = 0),
    (this.initPixi = function () {
      $('.slider-ttl_area').after(
        "<div class='transparentImg' style='z-index:90; position:absolute; width:100%; height:100vh;'><img src='/cms/wp-content/themes/feel/img/spacer.gif' style='width:100%; height:100vh'></div>"
      ),
        $('#canvas--wrap').append(a.view),
        i.addChild(n),
        (i.interactive = !0),
        !0 === e.fullScreen
          ? ((a.view.style.objectFit = 'cover'),
            (a.view.style.width = '100%'),
            (a.view.style.height = '100%'))
          : // (a.view.style.top = '50%'),
            // (a.view.style.left = '50%'),
            // (a.view.style.webkitTransform = 'translate( -50%, -50% ) scale(1)')
            // (a.view.style.transform = 'translate( -50%, -50% ) scale(1)')
            (a.view.style.maxWidth = '100%'),
        // (a.view.style.top = '50%'),
        // (a.view.style.left = '50%'),
        // (a.view.style.webkitTransform = 'translate( -50%, -50% )'),
        //       (a.view.style.transform = 'translate( -50%, -50% )')
        (r.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT),
        (i.filters = [s]),
        !1 === e.autoPlay && ((s.scale.x = 0), (s.scale.y = 0)),
        !0 === e.wacky &&
          (r.anchor.set(0.5), (r.x = a.width / 2), (r.y = a.height / 2)),
        (r.scale.x = 2),
        (r.scale.y = 2),
        (s.autoFit = e.displaceAutoFit),
        i.addChild(r);
    }),
    (this.loadPixiSprites = function (t) {
      for (var a = e.sprites, i = e.texts, r = 0; r < a.length; r++) {
        var s = new PIXI.Texture.fromImage(t[r]),
          o = new PIXI.Sprite(s);
        if (i) {
          var c = new PIXI.Text(i[r], l);
          o.addChild(c),
            c.anchor.set(0.5),
            (c.x = o.width / 2),
            (c.y = o.height / 2);
        }
        0 !== r && TweenMax.set(o, { alpha: 0 }), n.addChild(o);
      }
    }),
    !0 === e.autoPlay)
  ) {
    var o = new PIXI.ticker.Ticker();
    (o.autoStart = e.autoPlay),
      o.add(function (t) {
        (r.x += e.autoPlaySpeed[0] * t),
          (r.y += e.autoPlaySpeed[1]),
          a.render(i);
      });
  } else {
    var c = new PIXI.ticker.Ticker();
    (c.autoStart = !0),
      c.add(function (e) {
        a.render(i);
      });
  }
  var d,
    p,
    h,
    w = !1,
    u = n.children;
  function y() {
    (r.rotation += 0.001), (d = requestAnimationFrame(y));
  }
  (this.moveSlider = function (a) {
    w = !0;
    var i = new TimelineMax({
      onComplete: function () {
        (t.currentIndex = a), (w = !1), !0 === e.wacky && r.scale.set(1);
      },
      onUpdate: function () {
        !0 === e.wacky &&
          ((r.rotation += 0.02 * i.progress()), r.scale.set(3 * i.progress()));
      },
    });
    i.clear(),
      i.isActive() ||
        i
          .to(s.scale, 1.5, {
            x: e.displaceScale[0],
            y: e.displaceScale[1],
            ease: Power2.easeOut,
          })
          .to(u[t.currentIndex], 1.5, { alpha: 0, ease: Power2.easeOut }, 0)
          .to(u[a], 1, { alpha: 1, ease: Power2.easeOut }, 1)
          .to(
            s.scale,
            1.5,
            {
              x: e.displaceScaleTo[0],
              y: e.displaceScaleTo[1],
              ease: Expo.easeOut,
            },
            0.8
          );
  }),
    e.navElement,
    (this.init = function () {
      t.initPixi(), t.loadPixiSprites(e.pixiSprites), t.makeDot();
    }),
    (this.makeDot = function () {
      for (var e = 0; e < u.length; e++)
        0 == e
          ? $('.slick-dots').append(
              '<li class="slick-active"><button type="button">' +
                e +
                '</button></li>'
            )
          : $('.slick-dots').append(
              '<li><button type="button">' + e + '</button></li>'
            );
      var t = $('.slide-wrapper .slide-item').eq(0).data('txt'),
        a = $('.slide-wrapper .slide-item').eq(0).data('url');
      $('.slider-ttl_area a').text(t), $('.slider-ttl_area a').attr('href', a);
    }),
    (this.nextSlide = function () {
      if (w) return !1;
      TweenMax.set('.js-slider-progress .progress', { height: 0 }),
        TweenMax.to('.js-slider-progress .progress', 5, { height: '100%' });
      var e = 0;
      $('.slick-dots li').eq(t.currentIndex).removeClass('slick-active'),
        t.currentIndex >= 0 && t.currentIndex < u.length - 1
          ? ((e = t.currentIndex + 1), t.moveSlider(e))
          : t.moveSlider(e);
      var a = ('0' + (e + 1)).slice(-2),
        i = $('.slide-wrapper .slide-item').eq(e).data('txt'),
        n = $('.slide-wrapper .slide-item').eq(e).data('url');
      $('.slider-ttl_area a').text(i),
        $('.slider-ttl_area a').attr('href', n),
        $('.slick-dots li').eq(e).addClass('slick-active'),
        $('.slick-counter .current').text(a);
    }),
    !0 === e.interactive &&
      ((n.interactive = !0),
      (n.buttonMode = !0),
      ('hover' !== e.interactionEvent && 'both' !== e.interactionEvent) ||
        ((n.pointerover = function (e) {
          (p = e.data.global.x),
            (h = e.data.global.y),
            TweenMax.to(s.scale, 1, {
              x: '+=' + 100 * Math.sin(p),
              y: '+=' + 100 * Math.cos(h),
            }),
            y();
        }),
        (n.pointerout = function (e) {
          TweenMax.to(s.scale, 1, { x: 0, y: 0 }), cancelAnimationFrame(d);
        })),
      ('click' !== e.interactionEvent && 'both' !== e.interactionEvent) ||
        ((n.pointerup = function (t) {
          !0 === e.dispatchPointerOver
            ? TweenMax.to(s.scale, 1, {
                x: 0,
                y: 0,
                onComplete: function () {
                  TweenMax.to(s.scale, 1, { x: 20, y: 20 });
                },
              })
            : (TweenMax.to(s.scale, 1, { x: 0, y: 0 }),
              cancelAnimationFrame(d));
        }),
        (n.pointerdown = function (e) {
          (p = e.data.global.x),
            (h = e.data.global.y),
            TweenMax.to(s.scale, 1, {
              x: '+=' + 1200 * Math.sin(p),
              y: '+=' + 200 * Math.cos(h),
            });
        }),
        (n.pointerout = function (t) {
          !0 === e.dispatchPointerOver
            ? TweenMax.to(s.scale, 1, {
                x: 0,
                y: 0,
                onComplete: function () {
                  TweenMax.to(s.scale, 1, { x: 20, y: 20 });
                },
              })
            : (TweenMax.to(s.scale, 1, { x: 0, y: 0 }),
              cancelAnimationFrame(d));
        }))),
    !0 === e.displacementCenter &&
      (r.anchor.set(0.5), (r.x = a.view.width / 2), (r.y = a.view.height / 2)),
    this.init();
};
