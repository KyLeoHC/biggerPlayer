import logger from './logger';
import * as dom from './dom';

class Player {
    constructor(option = {}) {
        if (option.selector) {
            this.el = dom.query(option.selector)[0];
            this.videoEl = this.el;
            this.isPlaying = false;
            this.option = option;
            this._init();
            this._initEvent();
        } else {
            logger.warn('"selector" option can not be null.');
        }
    }

    _init() {
        let wrapper = '<div class="bigger-player"><div class="control-bar"></div></div>';
        this.el.insertAdjacentHTML('beforeBegin', wrapper);

        let previousEl = this.el.previousElementSibling;
        previousEl.insertBefore(this.el, previousEl.firstChild);
        this.el = previousEl;
    }

    _initEvent() {
        dom.query('.control-bar', this.el)[0].addEventListener('click', () => {
            this.toggle();
        }, false);

        this.videoEl.addEventListener('progress', (event) => {
            console.log('progress', event);
        }, false);

        this.videoEl.addEventListener('waiting', (event) => {
            console.log('waiting', event);
        }, false);
    }

    play() {
        this.isPlaying = true;
        this.videoEl.play();
    }

    pause() {
        this.isPlaying = false;
        this.videoEl.pause();
    }

    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
}

export default Player;