import logger from './logger';
import * as dom from './dom';

class Player {
    constructor(option = {}) {
        if (option.selector) {
            this.el = dom.query(option.selector)[0];
            this.videoEl = this.el;
            this.isPlaying = false;
            this.duration = 0;
            this.option = option;
            this._init();
            this._initEvent();
        } else {
            logger.warn('"selector" option can not be null.');
        }
    }

    _init() {
        let wrapper = `
            <div class="bigger-player">
                <div class="control-bar">
                    <div class="control-left">
                        <span class="start-btn">开始</span>
                    </div>
                    <div class="control-center">
                        <div class="time-bar">
                            <div class="current-time"></div>
                            <div class="cache-time"></div>
                        </div>
                        <div class="time-text">
                            <span class="current">00:00</span>
                            <span>/</span>
                            <span class="duration">00:00</span>
                        </div>
                    </div>
                    <div class="control-right"></div>
                </div>
            </div>`;
        this.el.insertAdjacentHTML('beforeBegin', wrapper);

        let previousEl = this.el.previousElementSibling;
        previousEl.insertBefore(this.el, previousEl.firstChild);
        this.el = previousEl;
        this.startBtnEl = dom.query('.start-btn', this.el)[0];
        this.currentTimeEl = dom.query('.current-time', this.el)[0];
        this.cacheTimeEl = dom.query('.cache-time', this.el)[0];
        this.timeTextCurrentEl = dom.query('.current', this.el)[0];
        this.timeTextDurationEl = dom.query('.duration', this.el)[0];
    }

    _initEvent() {
        this.startBtnEl.addEventListener('click', () => {
            this.toggle();
        }, false);

        this.videoEl.addEventListener('durationchange', (event) => {
            this._initDuration();
            console.log('durationchange', event);
        }, false);

        this.videoEl.addEventListener('loadedmetadata', (event) => {
            this._initDuration();
            console.log('loadedmetadata', event);
        }, false);

        this.videoEl.addEventListener('canplay', (event) => {
            //this._initDuration();
            console.log('canplay', event);
        }, false);

        this.videoEl.addEventListener('progress', (event) => {
            let cacheRanges = this.videoEl.buffered;
            this.cacheTimeEl.style.width = cacheRanges.end(cacheRanges.length - 1) / this.duration * 100 + '%';

            console.log('progress', event);
        }, false);

        this.videoEl.addEventListener('loadeddata', (event) => {
            let cacheRanges = this.videoEl.buffered;
            this.cacheTimeEl.style.width = cacheRanges.end(cacheRanges.length - 1) / this.duration * 100 + '%';
            console.log('loadeddata', cacheRanges);
        }, false);

        this.videoEl.addEventListener('waiting', (event) => {
            console.log('waiting', event);
        }, false);

        this.videoEl.addEventListener('playing', (event) => {
            console.log('playing', event);
        }, false);

        this.videoEl.addEventListener('timeupdate', (event) => {
            let time = this.videoEl.currentTime;
            this.timeTextCurrentEl.innerText = this.format(time * 1000);
            this.currentTimeEl.style.width = ((time / this.duration) * 100) + '%';
            //console.log('timeupdate', event);
        }, false);

        this.videoEl.addEventListener('ended', (event) => {
            this.isPlaying = false;
            this.el.classList.add('pause');
            this.startBtnEl.innerText = '开始';
            console.log('ended', event);
        }, false);
    }

    _initDuration() {
        logger.info('readyState is ' + this.videoEl.readyState);
        if (this.videoEl.readyState !== 0) {
            this.duration = this.videoEl.duration;
            this.timeTextDurationEl.innerText = this.format(this.duration * 1000);
        }
    }

    format(date, format = 'mm:ss') {
        if (typeof date === 'string') {
            let mts = date.match(/(\/Date\((\d+)\)\/)/);
            if (mts && mts.length >= 3) {
                date = parseInt(mts[2]);
            }
        }
        date = new Date(date);
        if (!date || date.toUTCString() == 'Invalid Date') {
            return '';
        }
        let map = {
            'M': date.getMonth() + 1,
            'd': date.getDate(),
            'h': date.getHours(),
            'm': date.getMinutes(),
            's': date.getSeconds(),
            'q': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };

        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            let v = map[t];
            if (v !== undefined) {
                if (all.length > 1) {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y') {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }

    play() {
        if (this.isPlaying || this.videoEl.readyState === 0) return;
        if (!this.duration) {
            this._initDuration();
        }
        this.isPlaying = true;
        this.el.classList.add('playing');
        this.startBtnEl.innerText = '暂停';
        this.videoEl.play();
    }

    pause() {
        if (!this.isPlaying) return;
        this.isPlaying = false;
        this.el.classList.add('pause');
        this.startBtnEl.innerText = '开始';
        this.videoEl.pause();
    }

    toggle() {
        this.isPlaying ? this.pause() : this.play();
    }
}

export default Player;