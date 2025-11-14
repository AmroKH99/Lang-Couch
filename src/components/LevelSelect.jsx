import SplitText from "./SplitText"
function LevelSelect ({onDifficultySelect, selectedLanguage }) {

    const level = [
        { id: 'beginner', name: 'Beginner'},
        { id: 'intermediate', name: 'Intermediate'},
        { id: 'advanced', name: 'Advanced'},
        { id: 'technical', name: 'Technical'},
      ];
    return(
        <div className="level w-full h-full flex flex-col justify-center items-center"> 

        <SplitText
  text="Select Your Level"
  className="mt-10 text-3xl text-white
        sm:text-3xl
        md:text-5xl md:font-normal
        lg:text-3xl"
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

<div className="btn-container"> 
                <ul>
                    <li><button  onClick={() => onDifficultySelect(level[0].id)} value={"Beginner"}>Beginner</button></li>
                    <li><button  onClick={() => onDifficultySelect(level[1].id)} value={"Intermediate"}>Intermediate</button></li>
                    <li><button  onClick={() => onDifficultySelect(level[2].id)} value={"Advanced"}>Advanced</button></li>
                    <li><button  onClick={() => onDifficultySelect(level[3].id)} disabled={selectedLanguage!=='en'} className={selectedLanguage!=='en'? "hidden": null} value={"Technical"}>Technical</button></li>
                </ul>
            </div>
        </div>  
    )
}

export default LevelSelect