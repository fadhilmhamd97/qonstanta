import React from "react";
import { Radio, FormControl, FormLabel, RadioGroup, FormControlLabel } from '@material-ui/core'

const BankQuestionComponent = ({number, question, answers}) => {

    const PropQuestion = ({propQuestion}) => {
        
        if(propQuestion)
        {
            const {index, description} = propQuestion
            return(<>
                {`${index}.     ${description}`}
            </>)
        }

        return(<></>)
    }

    const PropAnswers = ({answers, questionCtx}) => {
        if(answers)
        {
            const {id, description} = questionCtx
            return(<>
                <FormControl component="fieldset">
                    <RadioGroup aria-label={`quiz-${id}`} name="quiz" value={id} >
                    {answers.map((v, i) => {
                        return(
                                <FormControlLabel value={`${v['option']}`} control={<Radio />} label={`${v['option']}.   ${v['description']}`} />
                            )
                    })}
                    </RadioGroup>
                </FormControl>
            </>)
        }
        return(<></>)
    }

    return(<>
        <div className="card card-custom">
        {/* Header */}
        <div className="card-header border-0" style={{minHeight: 0 + 'px'}}>
          <h3 className="card-title font-weight-bolder text-dark">
              <PropQuestion propQuestion={question} />
          </h3>
        </div>
        {/* Body */}
        <hr />
        <div className="card-body pt-0">
          <div className="mb-10">
            <div className="d-flex align-items-center">
                    <PropAnswers questionCtx={question} answers={answers} />
            </div>
          </div>
        </div>
      </div>
    </>)
}

export default BankQuestionComponent