/**
 * Created by 110 on 2018/4/18.
 */
!(function(doc, win) {
    var docEle = doc.documentElement,
        evt = "onorientationchange" in window ? "orientationchange" : "resize",
        fn = function() {
            var width = docEle.clientWidth;
            width > 750 ? (width && (docEle.style.fontSize = 100 + "px")) : (width && (docEle.style.fontSize = 100 * (width / 640) + "px"));
        };
    win.addEventListener(evt, fn, false);
    doc.addEventListener("DOMContentLoaded", fn, false);
}(document, window));