import { Component } from "react";
import { quizDB } from "./QuizData";

export class Quiz extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userAnswer: null,  //current user answer
            currentIndex: 0,   //current Question no
            options: [],       // 4 options
            quizEnd: false,    //if true,it's last question
            score: 0,
            disabled: true,
            type: "radio",
            multiAnswer:[]
        }
    }

    handleChange(event) {
        const checkedvalue = event.target.value;
        const {multiAnswer}=this.state;
        const index=multiAnswer.indexOf(checkedvalue);

        if(index !=-1)  //already holds a value so simply overwrite
        {
            multiAnswer.splice(index,1);
        }else{
            multiAnswer.push(checkedvalue);
        }

        this.setState({
            multiAnswer: [...multiAnswer],
            disabled: multiAnswer.length === 0
          });
    }

    //loading questions
    loadQuiz = () => {
        const { currentIndex } = this.state;
        this.setState(() => {
            return {
                Question: quizDB[currentIndex].questionText,
                options: quizDB[currentIndex].answerOptions,
                answer: quizDB[currentIndex].answer,
                answertype: quizDB[currentIndex].type
            }
        })
    }

    //load question immediately when application opens ->using react deafult function available
    componentDidMount() {
        this.loadQuiz();
    }

    //check if userAnswer is correct -> This function executes when the user select an options
    checkAnswer = (answer) => {
        this.setState({
            userAnswer: answer,
            disabled: false  //no more options could be selected
        })
    }

    //another life-cycle method which is called each time there is change in state
    componentDidUpdate(prevProps, prevState) {
        const { currentIndex } = this.state;

        if (this.state.currentIndex != prevState.currentIndex && quizDB[currentIndex])   //if current index is changed then load next ques
        {
            this.setState(() => {
                return {
                    Question: quizDB[currentIndex].questionText,
                    options: quizDB[currentIndex].answerOptions,
                    answer: quizDB[currentIndex].answer,
                    answertype: quizDB[currentIndex].type
                }
            })
        }
    }

    nextQuestionHandler = () => {
        const { userAnswer, answer, score, type, currentIndex } = this.state;

        //before going to next Ques handle the score
        if (userAnswer === answer) {
            this.setState({
                score: this.state.score + 1
            })
        }

        this.setState({
            currentIndex: this.state.currentIndex + 1,
            userAnswer: null,
        })

        this.setState({
            type: this.state.type + quizDB[currentIndex].type
        })
    }

    //here it handles the checkbox submit
    finishHandler = () => {
        const { userAnswer, answer, score ,multiAnswer,currentIndex} = this.state;

//         console.log(answer,answer.length);
//         console.log(multiAnswer,multiAnswer.length);
        
        if(quizDB[currentIndex].type==="checkbox")
        {
            // check answer
            
            if(multiAnswer.length === answer.length && answer.every(function(value, index) { return multiAnswer.indexOf[value] !== -1 }))
            {
                
                this.setState({
                    score: this.state.score + 1,
                    multiAnswer: [],
                    currentIndex: this.state.currentIndex + 1,
                    })
            }
            
            if (this.state.currentIndex === quizDB.length - 1) {
                this.setState({
                    quizEnd: true
                })
            }
        }
    }

    //return
    render() {
        const { Question, options, userAnswer, currentIndex, quizEnd, answertype ,multiAnswer} = this.state;

        if (quizEnd) {
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
                <span>{`Question ${currentIndex + 1} of ${quizDB.length}`}</span>

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




                {answertype === "radio" &&
                    options.map((option) =>
                        <div>
                            <input type="radio" key={options.id} className={`options ${userAnswer === option ? "selected" : null}`} onClick={() => this.checkAnswer(option)}/>
                            <label>{option} </label>
                        </div>
                    )

                }

                {answertype === "text" &&
                    <input className={`input-box `} onChange={(event) => this.checkAnswer(event.target.value)} value={userAnswer}></input>
                }

                {answertype === "checkbox" &&
                    options.map((option) =>
                        <form >
                            <label>
                                <input key={options.id} type="checkbox" name={option} onChange={(event) => this.handleChange(event)} value={option} checked={multiAnswer.includes(option)}/>
                                {option}
                            </label>
                        </form>
                    )

                }


                {currentIndex < quizDB.length - 1 &&
                    <button disabled={this.state.disabled} className={`btn`} onClick={this.nextQuestionHandler}>Next</button>
                }

                {currentIndex === quizDB.length - 1 &&
                    <button disabled={this.state.disabled} className={`btn`} onClick={this.finishHandler}>Finish</button>
                }

            </div>
        )
    }
}

export default Quiz;
