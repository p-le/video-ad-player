import { insertHtmlIntoIframe, insertElement } from '../shared/Ultility.js';
import { VideoManager } from '../shared/Renderer.js';
import 'promise-polyfill/src/polyfill';
import 'whatwg-fetch';
import AdManager from '../shared/AdManager.js';
import VastManager from '../shared/VastManager.js';

GNVAP.VIDEOJS_PLUGIN = 'gnvap';

((GNVAP, videojs, d) => {

    GNVAP.renderVideo = (id) => {
        const container = d.getElementById(id);
        const videoManager = new VideoManager({
            poster: '//vjs.zencdn.net/v/oceans.png',
            sources: [
                [ "//vjs.zencdn.net/v/oceans.mp4", "video/mp4" ],
                [ "//vjs.zencdn.net/v/oceans.webm", "video/webm" ],
                [ "//vjs.zencdn.net/v/oceans.ogv", "video/ogg" ],
            ]
        });
        const video = videoManager.getVideo();
        const videoNode = video.getNode();
        container.appendChild(videoNode);
 
        videojs(videoNode, {
            plugins: {
              'gnvap': {
                  AD_TAG_URL: 'http://aladdin.genieesspv.jp/yie/ld/vst?zoneid=1350732',
                  WRAPPER_REDIRECT_LIMIT: 4,
              }
            }
        }, () => {
                      
        });
    }

    /* arrow function を使わない、thisが使えなくなる */
    GNVAP.renderAd = function(opts) {
        const adManager = new AdManager(this);
        const vastManager = new VastManager(opts);
        vastManager.followAdTagUrl();
    }

    if (!videojs.getPlugin(GNVAP.VIDEOJS_PLUGIN)) {
        videojs.registerPlugin(GNVAP.VIDEOJS_PLUGIN, GNVAP.renderAd);
    }

    while(GNVAP.cmd.length) {
        const fn = GNVAP.cmd.shift();
        fn();
    }

    GNVAP.cmd.push = fn => fn();
})(window.GNVAP, window.videojs, document);