import { Component } from "react";
import { quizDB } from "./QuizData";

export class Quiz extends Component{

    constructor(props)
    {
      super(props)
  
      this.state={
        userAnswer:null,  //current user answer
        currentIndex:0,   //current Question no
        options:[],       // 4 options
        quizEnd:false,    //if true,it's last question
        score:0,
        disabled:true,
        type:"radio",
        
      }
    }

    handleChange(event) {
        const isChecked=event.target.checked;
        const checkedvalue=event.target.value;
        const checkName=event.target.name;
        console.log(isChecked,checkedvalue,checkName);

        this.setState((event)=> {
            
        })
      }

    //loading questions
    loadQuiz=()=>{
        const {currentIndex}=this.state;
        this.setState(()=>{
            return {
                Question:quizDB[currentIndex].questionText,
                options:quizDB[currentIndex].answerOptions,
                answer:quizDB[currentIndex].answer,
                answertype:quizDB[currentIndex].type
            }
        })
    }
    
    //load question immediately when application opens ->using react deafult function available
    componentDidMount(){
        this.loadQuiz();
    }

    //check if userAnswer is correct -> This function executes when the user select an options
    checkAnswer= (answer)=>{
        this.setState({
            userAnswer:answer,
            disabled:false  //no more options could be selected
        })
    }

    //another life-cycle method which is called each time there is change in state
    componentDidUpdate(prevProps,prevState){
        const {currentIndex}=this.state;

        if(this.state.currentIndex != prevState.currentIndex)   //if current index is changed then load next ques
        {
            this.setState(()=>{
                return {
                    Question:quizDB[currentIndex].questionText,
                    options:quizDB[currentIndex].answerOptions,
                    answer:quizDB[currentIndex].answer,
                    answertype:quizDB[currentIndex].type
                }
            })
        }
    }

    nextQuestionHandler=()=>{
        const {userAnswer,answer,score,type,currentIndex}=this.state;

        //before going to next Ques handle the score
        if(userAnswer===answer)
        {
            this.setState({
                score: this.state.score +1
            })
        }

        this.setState({
            currentIndex: this.state.currentIndex +1,
            userAnswer:null,
        })

        this.setState({
            type:this.state.type + quizDB[currentIndex].type
        })
    }

    //after all questions over
    finishHandler=()=>{
        const {userAnswer,answer,score}=this.state;

        //before going to next Ques handle the score
        if(userAnswer===answer)
        {
            this.setState({
                score: this.state.score +1
            })
        }

        if(this.state.currentIndex===quizDB.length-1)
        {
            this.setState({
                quizEnd:true
            })
        }
    }
  
    //return
    render(){

        var display=Object.keys(this.state.checkbox).filter((x)=>this.state.checkbox[x])

        const {Question,options,userAnswer,currentIndex,quizEnd,answertype}=this.state;

        if(quizEnd)
        {
            return (
                <div>
                    <h1>Game Over!</h1>
                    <h2>Final score is {this.state.score} </h2>
                </div>
            )
        }

      return (
        <div>
            <h1>{Question}</h1>
            <span>{`Question ${currentIndex+1} of ${quizDB.length}`}</span>

            {/* {
                options.map( (option)=>
                    <p key={options.id} className={`options ${ userAnswer ===option ?"selected" : null}`} onClick={()=> this.checkAnswer(option)}>
                        {option}
                    </p>
                )
            }

            {currentIndex< quizDB.length-1 && 
            <button disabled={this.state.disabled} className={`btn`} onClick={this.nextQuestionHandler}>Next</button>
            }

            {currentIndex===quizDB.length-1 &&
            <button disabled={this.state.disabled} className={`btn`} onClick={this.finishHandler}>Finish</button>
            } */}




            {answertype==="radio" &&
                options.map( (option)=>
                    <p key={options.id} className={`options ${ userAnswer ===option ?"selected" : null}`} onClick={()=> this.checkAnswer(option)}>
                        {option}
                    </p>
                ) 
                
            }

            {answertype==="text" && 
                <input className={`input-box `} onChange={(event)=> this.checkAnswer(event.target.value)} value={userAnswer}></input>
            }

            {answertype==="checkbox" &&
                options.map((option)=>
                <form >
                <label>
                  <input key={options.id} type="checkbox" name={option} onChange={(event)=> this.handleChange(event)} value={userAnswer} />
                  {option}
                </label>
              </form>
                )
            
            }
            

            {currentIndex< quizDB.length-1 && 
            <button disabled={this.state.disabled} className={`btn`} onClick={this.nextQuestionHandler}>Next</button>
            }

            {currentIndex===quizDB.length-1 &&
                <button disabled={this.state.disabled} className={`btn`} onClick={this.finishHandler}>Finish</button>
            }

        </div>
      )
    }
  }

  export default Quiz;