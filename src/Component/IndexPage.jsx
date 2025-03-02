import React, { Component } from 'react'
import Iframe from 'react-iframe'
import RotatingText from './RotatingText'
import SplitText from "./SplitText";
/* this page is customsize indexＰage for show information to viewer ex:customer/manager/web designer */
export default class IndexPage extends Component {
 
  render(){
    const index = {
      margin: 'auto',
      width: '50%',
      'overflow-x': 'hidden',
      'overflow-y': 'hidden',
      position: 'absolute',     /*絕對位置*/
      top: '25%',               /*從上面開始算，下推 50% (一半) 的位置*/
      left: '22%',
      'text-align': 'center'
    }
    const handleAnimationComplete = () => {
      console.log('All letters have animated!');
    };
    return (
      <div >
        <h1 >
    <SplitText
  text="WELCOME, MATCHTREN!"
  className="text-2xl font-semibold text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>
<SplitText
  text="WE ARE TRAINNING & ASSESSMENT CENTER!"
  className="text-2xl font-semibold text-center"
  delay={150}
  animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
  animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
  easing="easeOutCubic"
  threshold={0.2}
  rootMargin="-50px"
  onLetterAnimationComplete={handleAnimationComplete}
/>

<hr className="my-2" />
<h1>
<RotatingText
      texts={['TRAINNING!','ASSESSMENT!','MATCH JOB!']}
      staggerFrom={"last"}
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-120%" }}
      staggerDuration={0.025}
      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-3 md:pb-3"
      transition={{ type: "spring", damping: 30, stiffness: 400 }}
      rotationInterval={2000}
    />
    </h1>
    </h1>
          <hr className="my-2" />
          <hr className="my-2" />
        <h1>HERE WE ARE.</h1>
        <Iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.3390826391515!2d121.00146461483348!3d14.636683439779487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b74509509373%3A0x8f90c0140664e47e!2sMatch+Trend+training+and+assessment+center!5e0!3m2!1sfil!2sph!4v1566435916439!5m2!1sfil!2sph" width="100%" height="450" frameborder="0" style="border:0" allowfullscreen></Iframe>
      </div>
    )
  }
}