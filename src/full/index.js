import './polyfill';

const _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-asdad']);
_gaq.push(['_trackPageView']);

(url => {
    setTimeout(() => {
        const iframe = document.createElement('iframe');
        (iframe.frameElement || iframe).style.cssText =
            "width: 0; height: 0; border: 0";
        iframe.src = "javascript:false";
        const where = document.getElementsByTagName('script')[0];
        where.parentNode.insertBefore(iframe, where);
        const doc = iframe.contentWindow.document;
        doc.open().write('<body onload="'+
            'var js = document.createElement(\'script\');'+
            'js.src = \''+ url +'\';'+
            'document.body.appendChild(js);">');
        doc.close();
    }, 0)
})('//vjs.zencdn.net/7.0/video.min.js'); 