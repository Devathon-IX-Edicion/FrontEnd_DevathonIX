import gsap from 'gsap';
import { useEffect } from 'react';

type Props = {
  ref: React.RefObject<HTMLDivElement | null>;
};

export default function Cauldron({ ref }: Props) {
  useEffect(() => {
    const current = ref.current;
    if (!current) return;
    const $ = (selector: string) => current.querySelectorAll(selector);
    const tlWisps = gsap.timeline({ repeat: -1, repeatDelay: 1 });

    tlWisps
      .fromTo(
        '#wisps g path',
        {
          opacity: 0,
          y: '100%',
          scale: 0.8,
          rotation: 0,
        },
        {
          opacity: 0.4,
          y: '-20%',
          scale: 1.1,
          rotation: () => gsap.utils.random(-10, 10),
          duration: 5,
          ease: 'sine.inOut',
          stagger: {
            amount: 2,
            from: 'random',
          },
        }
      )
      .to('#wisps g path', {
        opacity: 0,
        y: '-80%',
        scale: 1.5,
        rotation: () => gsap.utils.random(-20, 20),
        duration: 3,
        ease: 'sine.in',
        stagger: {
          amount: 2,
          from: 'random',
        },
      });

    const floats = $('#big-bubbles circle');
    floats.forEach((bubble) => {
      gsap.to(bubble as Element, {
        y: '+=20',
        repeat: -1,
        yoyo: true,
        duration: gsap.utils.random(1.2, 2.2),
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 1),
      });
    });

    const floatBubbles = $('#float-bubbles circle');
    floatBubbles.forEach((bubble) => {
      function shootBubble() {
        gsap.set(bubble, { x: 0, y: 0, opacity: 1 });
        const angle = gsap.utils.random(-Math.PI / 2 - 0.7, -Math.PI / 2 + 0.7);
        const velocity = gsap.utils.random(120, 220);
        const duration = gsap.utils.random(1.2, 2.2);

        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        const gravity = 200;

        gsap.to(bubble, {
          motionPath: {
            path: [
              { x: 0, y: 0 },
              { x: vx * 0.5, y: vy * 0.5 + gravity * 0.25 },
              { x: vx, y: vy + gravity * 1 },
            ],
            curviness: 1.2,
            autoRotate: false,
          },
          opacity: 0,
          duration,
          ease: 'power1.in',
          delay: gsap.utils.random(0, 1.2),
          onComplete: shootBubble,
        });
      }
      shootBubble();
    });

    gsap.utils.toArray('#fire polygon').forEach((flame) => {
      return gsap.to(flame as Element, {
        scaleY: () => gsap.utils.random(1, 1.3),
        scaleX: () => gsap.utils.random(0.9, 1.1),
        rotation: () => gsap.utils.random(-5, 5),
        y: () => gsap.utils.random(-4, -8),
        duration: () => gsap.utils.random(0.2, 0.4),
        transformOrigin: '50% 100%',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: gsap.utils.random(0, 0.5),
      });
    });
  }, [ref]);

  return (
    <svg
      style={{
        mask: 'linear-gradient(180deg, #000 99%, transparent 100%)',
      }}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 432 288'
      xmlSpace='preserve'
    >
      <g id='bg'>
        <ellipse
          className='st2 glow'
          cx='215.3'
          cy='261.7'
          rx='138.4'
          ry='18.7'
        />
        <ellipse className='st3' cx='216' cy='263.8' rx='49' ry='6.6' />
      </g>
      <g id='emitter'>
        <circle className='st4' cx='179.8' cy='158.2' rx='12.2' ry='8.5' />
        <circle className='st4' cx='236.8' cy='152.3' r='5.9' />
        <circle className='st4' cx='227.4' cy='232.3' r='20.3' />
        <circle className='st4' cx='267.5' cy='145.7' r='3.5' />
        <circle className='st4' cx='186.3' cy='177.3' r='5.7' />
      </g>
      <g id='wisps'>
        <g id='Layer_11'>
          <path
            className='st5 end'
            d='M259.8,69.4c0,0,1,0.2,1.2-3.6c0.2-3.2-1.3-11.1-1.7-15.7c-0.4-3.7,0.6-12.7,0.6-12.7
          s-1,9.3-0.5,13c0.5,4.3,2.5,15.3,1.3,18.2C259.5,71.3,259.8,69.4,259.8,69.4z'
          />
          <path
            className='st5 wisp'
            d='M262.6,132.9c0,0,5.8,0.2,7-3.6c1-3.2-7.3-11.1-10-15.7c-2.1-3.7,3.6-12.7,3.6-12.7s-5.8,9.3-3.1,13
          c3.1,4.3,14.4,15.3,7.4,18.2C260.7,134.9,262.6,132.9,262.6,132.9z'
          />
          <path
            className='st5 start'
            d='M260.6,152.2c0,0,1.6,0.1,1.9-2.2c0.3-1.9-2-6.7-2.7-9.5c-0.6-2.2,1-7.7,1-7.7
          s-1.6,5.6-0.9,7.8c0.9,2.6,4,9.2,2,10.9S260.6,152.2,260.6,152.2z'
          />
        </g>
        <g id='Layer_10'>
          <path
            className='st5 end'
            d='M236.5,32.3c0,0,4.3-5.1,3.4-9.7s-4.4-5.8-3.7-9.6c0.7-3.8,1.8-5,1.8-5s-1.9,3.8-1.4,5.9
          c0.5,2.1,5,3.9,3.9,9.2S236.5,32.3,236.5,32.3z'
          />
          <path
            className='st5 wisp'
            d='M240.1,95.4c0,0,7.4-8.8,5.8-16.6c-1.5-7.8-7.5-10-6.3-16.5c1.2-6.5,3.2-8.6,3.2-8.6s-3.3,6.6-2.4,10.1
          c0.9,3.5,8.6,6.7,6.7,15.9S240.1,95.4,240.1,95.4z'
          />
          <path
            className='st5 start'
            d='M239.5,121.7c0,0,1.2-3.4,1-6.4c-0.3-3-1.2-3.8-1-6.3c0.2-2.5,0.5-3.3,0.5-3.3
          s-0.5,2.5-0.4,3.9s1.4,2.6,1.1,6.1C240.4,119.2,239.5,121.7,239.5,121.7z'
          />
        </g>
        <g id='Layer_9'>
          <path
            className='st5 end'
            d='M180.3,39c0,0-1.7-3.1-1.6-7.8s1.6-3,1.8-6.4s-1.3-4.9-1.1-8.1s0.4-1.1,0.6-5.1
          c0.2-3.9,0.1-2.4,0.1-2.4s-0.1,4.7-0.5,6.8c-0.6,2.9,0.9,4.9,1,7.6c0.1,3.1-0.8,4.2-1.5,6.4c-0.2,0.5-0.5,2.6,0.1,4.8
          C179.8,37.1,180.3,39,180.3,39z'
          />
          <path
            className='st5 wisp'
            d='M181.1,130.3c0,0-18.1-6.6-16.4-16.5s17-6.4,18.9-13.4c1.9-7-13.2-10.2-12-17.1s4.3-2.4,6.7-10.7
          c2.4-8.3,1.3-5,1.3-5s-1.4,9.9-5.5,14.4c-5.9,6.1,9.9,10.4,10.3,15.9c0.6,6.5-8.7,8.9-15.7,13.5c-2.2,1-5,5.4,1,10.1
          C175.6,126.2,181.1,130.3,181.1,130.3z'
          />
          <path
            className='st5 start'
            d='M169.7,149.6c0,0-2.3-0.8-2-2.1c0.2-1.2,2.1-0.8,2.4-1.7s-1.7-1.3-1.5-2.1
          c0.2-0.9,0.5-0.3,0.8-1.3c0.3-1,0.2-0.6,0.2-0.6s-0.2,1.2-0.7,1.8c-0.7,0.8,1.2,1.3,1.3,2c0.1,0.8-1.1,1.1-2,1.7
          c-0.3,0.1-0.6,0.7,0.1,1.3C169,149.1,169.7,149.6,169.7,149.6z'
          />
        </g>
        <g id='wisp2'>
          <path
            className='st5 end'
            d='M217.9-3.9c0,0,0.8,1.8,0.8,3.7s-0.6,4-0.6,4.6s0,0.8,0,0.8s0-0.7,0-0.9c0-0.2,1-4,0.9-4.4
          c0-0.6-0.5-2-0.6-2.4C218.2-3,217.9-3.9,217.9-3.9z'
          />
          <path
            className='st5 wisp'
            d='M216,94.3c0,0-6.4-15.2-6.4-31.3s5.3-33.7,5.3-38.5s-0.3-6.8-0.3-6.8s0.3,6.1,0,7.8s-8.5,33.3-7.5,37.4
          c-0.1,4.7,3.9,17.3,5,20.7C213.2,87,216,94.3,216,94.3z'
          />
          <path
            className='st5 start'
            d='M209.3,100.8c0,0,1.4,4.8,1.4,9.8s-1.2,10.5-1.2,12s0.1,2.1,0.1,2.1s-0.1-1.9,0-2.4
          c0.1-0.5,1.8-10.4,1.6-11.7c0-1.5-0.9-5.4-1.1-6.5C209.9,103.1,209.3,100.8,209.3,100.8z'
          />
        </g>
        <g id='wisp1'>
          <path
            className='st5 end'
            d='M226.4,135.8c0,0,6.4-7.9,6.4-16.2s-5.3-17.4-5.3-19.9s0.3-3.5,0.3-3.5s-0.3,3.1,0,4
          c0.3,0.9,8.5,17.2,7.5,19.3c0.1,2.4-3.9,8.9-5,10.7C229.3,132,226.4,135.8,226.4,135.8z'
          />
          <path
            className='wisp'
            d='M231.5,147.6c0,0-1.1-1.8-1.1-3.6s0.9-3.9,0.9-4.5c0-0.6-0.1-0.8-0.1-0.8s0.1,0.7,0,0.9
          c-0.1,0.2-1.4,3.9-1.2,4.4c0,0.5,0.7,2,0.8,2.4C231.1,146.7,231.5,147.6,231.5,147.6z'
          />
          <path
            className='st5 start'
            d='M220,71.4c0,0,0.8-1.7,1-3.6s-0.1-4,0-4.5c0.1-0.5,0.1-0.8,0.1-0.8s-0.1,0.7-0.1,0.9
          c0,0.2,0.4,4,0.2,4.4c-0.1,0.5-0.6,2-0.7,2.3C220.3,70.5,220,71.4,220,71.4z'
          />
        </g>
      </g>
      <g id='float-bubbles'>
        <circle className='st4' cx='235.6' cy='116' r='2.6' />
        <circle className='st4' cx='228.9' cy='100.8' r='1.3' />
        <circle className='st4' cx='304.4' cy='115.5' r='1.3' />
        <circle className='st4' cx='160.5' cy='113.4' r='2.6' />
        <circle className='st4' cx='233.9' cy='139.6' r='2.6' />
        <circle className='st4' cx='199.9' cy='72.5' r='2.6' />
        <circle className='st4' cx='129' cy='96.9' r='2.6' />
        <circle className='st4' cx='187.9' cy='124.6' r='1.3' />
        <circle className='st4' cx='266.3' cy='65.9' r='1.3' />
        <circle className='st4' cx='269' cy='132' r='1.3' />
        <circle className='st4' cx='173.2' cy='30.2' r='1.3' />
      </g>
      <g id='big-bubbles'>
        <circle className='st4' cx='257.4' cy='144' r='9.7' />
        <circle className='st4' cx='273' cy='145.7' r='9.7' />
        <circle className='st4' cx='167.6' cy='140.2' r='14.7' />
        <circle className='st4' cx='223.5' cy='138.3' r='9.7' />
        <circle id='Bigbubb' className='st4' cx='187.9' cy='146.6' r='14.7' />
      </g>
      <g id='cauldron'>
        <path
          className='st7'
          d='M138.2,125.2c0,0-2.9,0.4-2.9,3.6c0,3.3,1.5,5.1,1.5,5.1h156.6c0,0,3.1,1.8,3.1-3.1c0-4.9-4.2-5.6-4.2-5.6
        H138.2z'
        />
        <g>
          <path
            className='st8'
            d='M142.7,146c0,0-18.5,40-18.5,59.3s20,60.3,85.4,60.3s94.9-29.1,94.9-59.8s-18.9-60.1-18.9-60.1L142.7,146z'
          />
          <path
            className='st8'
            d='M138.5,155.7c0,0-7.7-4.3-14.3-4.3s-13.8,4-13.8,7.3c0,3.3,0.4,4.4,4.4,4.4c4,0,5.8-1.8,9.4-1.8
          s10.8,3.5,10.8,3.5L138.5,155.7z'
          />
          <path
            className='st8'
            d='M291.3,155.7c0,0,7.7-4.3,14.3-4.3c6.5,0,13.8,4,13.8,7.3c0,3.3-0.4,4.4-4.4,4.4c-4,0-5.8-1.8-9.4-1.8
          c-3.6,0-10.8,3.5-10.8,3.5L291.3,155.7z'
          />
          <path
            className='st8'
            d='M133.2,230.9c0,0-6.7,6.5-6.7,11.1c0,4.6-0.5,4.6,1.5,6.5c2.1,1.8,9.6,4.1,9.3,8.8c-0.3,4.6-3.7,0-5.4,2.6
          c-1.8,2.6-2.3,5.8,2.5,5.7s8.4,0.2,11.7-4.7c3.4-4.9-0.5-5.7-2.6-9.8c-2.1-4.1,1-7.5,1-7.5L133.2,230.9z'
          />
          <path
            className='st8'
            d='M296.4,230.9c0,0,6.7,6.5,6.7,11.1c0,4.6,0.5,4.6-1.5,6.5s-9.6,4.1-9.3,8.8s3.7,0,5.4,2.6
          c1.8,2.6,2.3,5.8-2.5,5.7c-4.8-0.1-8.4,0.2-11.7-4.7c-3.4-4.9,0.5-5.7,2.6-9.8c2.1-4.1-1-7.5-1-7.5L296.4,230.9z'
          />
          <path d='M289.5,152.7c-2.3-4.5-4-7.1-4-7.1L142.7,146c0,0-1.2,2.6-3,6.7H289.5z' />
          <path
            className='st8'
            d='M138.2,137.7c0,0-2.9,0-2.9,2.9s0,3,0,4.3c0,1.2,0.5,1.7,1.7,1.7c2.4,0,155.3,0,155.3,0s2.4-0.5,2.4-2.4
          s0-4.1,0-4.1s-0.1-2.1-2.1-2.1C290.7,138,138.2,137.7,138.2,137.7z'
          />
        </g>
      </g>
      <g id='fire'>
        <polygon
          className='st9'
          points='166.8,272.4 160.5,267.6 167.4,251.8 173.2,267.6 	'
        />
        <polygon
          className='st10'
          points='173.3,270.5 168.5,266.8 173.2,255.2 177.9,267.1 	'
        />
        <polygon
          className='st11'
          points='228.4,268.4 223.5,264.7 228.3,253.1 233,265 	'
        />
        <polygon
          className='st9'
          points='233.2,270.4 227.6,266.1 232.8,253.1 238.3,266.6 	'
        />
        <polygon
          className='st9'
          points='151.9,268.2 144.9,262.7 151,246.6 158.3,263.6 	'
        />
        <polygon
          className='st12'
          points='161,267.4 152.9,261.1 159.6,243 168.1,262.4 	'
        />
        <polygon
          className='st13'
          points='281.6,266.5 275.3,261.8 282.1,245.9 287.9,261.8 	'
        />
        <polygon
          className='st9'
          points='257.5,264.5 252.7,260.8 257.5,249.2 262.2,261.1 	'
        />
        <polygon
          className='st14'
          points='266.7,262.3 259.6,256.8 265.7,240.7 273,257.7 	'
        />
        <polygon
          className='st9'
          points='275.7,261.5 267.6,255.2 274.3,237.1 282.9,256.5 	'
        />
      </g>
    </svg>
  );
}
