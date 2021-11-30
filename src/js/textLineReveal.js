import SplitType from 'split-type';
import { wrapLines } from './utils';
import { gsap } from 'gsap';

export class TextLineReveal {
    constructor(animationElems) {
        this.DOM = {
            animationElems : Array.isArray(animationElems) ? animationElems : [animationElems]
        }
    

    this.SplitTypeInstances = [];
    this.lines = [];

    for (const el of this.DOM.animationElems) {
        const SplitTypeInstance = new SplitType(el, { types: 'lines'});

        wrapLines(SplitTypeInstance.lines, 'div', 'oh');
        this.lines.push(SplitTypeInstance.lines);

        this.SplitTypeInstances.push(SplitTypeInstance);
    }

    this.initEvents();
    }
    in() {
        this.isVisible = true;

        gsap.killTweensOf(this.lines);
        return gsap.timeline({ defaults: {duration: 1.2, ease: 'expo'}})
        .set(this.lines, {
            y: '150%',
            rotate: 15
        })
        .to(this.lines, {
            y: '0%',
            rotate: 0,
            stagger: 0.04
        })
    }

    out() {
        // lines are invisible
        this.isVisible = false;

        // animation
        gsap.killTweensOf(this.lines);
        return gsap.timeline({
            defaults: {duration: 0.7, ease: 'power2'}
        })
        .to(this.lines, {
            y: '-150%',
            rotate: -5,
            stagger: 0.02
        });
    }

    initEvents() {
        window.addEventListener('resize', () => {
            // empty the lines array
            this.lines = [];
            // re initialize the Split Text 
            for (const instance of this.SplitTypeInstances) {
                // re-split text
                // https://github.com/lukePeavey/SplitType#instancesplitoptions-void
                instance.split();

                // need to wrap again the new lines elements (div with class .oh)
                wrapLines(instance.lines, 'div', 'oh');
                this.lines.push(instance.lines);
            }
            // hide the lines
            if ( !this.isVisible ) {
                gsap.set(this.lines, {y: '-150%'});
            }
        });
    }
}