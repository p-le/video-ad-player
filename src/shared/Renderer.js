class VideoUI {
    constructor() {

    }
}
class Video {
    constructor(opts) {
        this.video = document.createElement('video');
        this.video.volume = true;
        this.video.preload = 'metadata';
        this.video.poster = opts.poster;
        this.video.id = 'test-video';
        this.video.classList.add('video-js');
        this.mute();
        this.autoplay();
        this.appendSources(opts.sources);
    }

    mute() {
        this.video.mute = true;
        this.video.setAttribute('muted', 'muted');
    }

    unmute() {
        this.video.mute = false;
        this.video.removeAttribute('muted');
    }

    autoplay() {
        this.video.autoplay = true;
        this.video.setAttribute('autoplay', 'autoplay');
    }

    appendSources(sources) {
        sources.map(([src, type]) => {
            const source = document.createElement('source');
            source.setAttribute('src', src);
            source.setAttribute('type', type);
            this.video.appendChild(source);
        });
    }
    removeNativePoster() {
        this.video.removeAttribute('poster');
    }
    getNode() {
        return this.video;
    }
}

export class VideoManager {
    constructor(opts) {
        this.video = new Video(opts);
        this.videoUI = new VideoUI();
    }

    getVideo() {
        return this.video;
    }
}