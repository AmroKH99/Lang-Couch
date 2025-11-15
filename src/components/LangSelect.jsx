import SplitText from "./SplitText";
import AnimatedContent from "./AnimatedContent"
function LangSelect ({onLanguageSelect}){


  const languages = [
    { code: 'en', name: 'English'},
    { code: 'es', name: 'Spanish',},
    { code: 'gr', name: 'German'},
  ];

    return(
    <div className="w-full h-full flex flex-col justify-center items-center">

<SplitText
  text="Hello & Welcome From THE KH"
  className="text-4xl text-center mb-2 p-2 font-semibold text-white
         sm:text-4xl
         md:text-6xl 
         lg:text-6xl"
  delay={100}
  duration={0.6}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>

<SplitText
  text="Select a Language"
  className="mt-10 text-3xl text-white
        sm:text-3xl
        md:text-4xl md:font-normal
        lg:text-3xl"
  delay={150}
  duration={0.3}
  ease="power3.out"
  splitType="chars"
  from={{ opacity: 0, y: 40 }}
  to={{ opacity: 1, y: 0 }}
  threshold={0.1}
  rootMargin="-100px"
  textAlign="center"
/>



<AnimatedContent
  distance={150}
  direction="vertecal"
  reverse={false}
  duration={2.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.4}
>
<div className='btn-container'>
            <button onClick={() => onLanguageSelect(languages[0].code)} value={"english"}>English</button>
            <br /><br />
            <button onClick={() => onLanguageSelect(languages[1].code)} value={"spanish"}>Spanish</button>
            <br /><br />
            <button onClick={() => onLanguageSelect(languages[2].code)} value={"german"}>German</button>
        </div>
</AnimatedContent>
</div>   
    )
}

export default LangSelect
