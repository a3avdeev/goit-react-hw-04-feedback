import {FormWrapper} from "./FeedbackForm.Styled"
import { useState } from "react";
import { FeedbackOptions } from '../FeedbackOptions/FeedbackOptions'
import { Statistics } from '../Statistics/Statistics'
import { Section } from '../Section/Section'
import { Notification } from '../Notification/Notification'

export default function FeedbackForm() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const countTotal = () => {
        return good + neutral + bad;
    }

    const countPercentage = () => {
        const total = countTotal();
        if (!total) {
            return 0;
        }
        const value = good;
        const result = (value / total) * 100;
        return Number(result.toFixed(0));
    }

    const onLeaveFeedback = (propertyName) => {
        switch (propertyName) {
        case "good":
            return setGood((prevState) => prevState + 1);
        case "neutral":
            return setNeutral((prevState) => prevState + 1);
        case "bad":
            return setBad((prevState) => prevState + 1);
    
        default:
            return;
        }
    };
    
    const total = countTotal();
    const positivePercentage = countPercentage(good);
    const state = { good, neutral, bad };
    console.log(Object(state))
    return (
            <FormWrapper>
                <Section title="Please leave feedback">
                    <FeedbackOptions options={Object.keys(state)} onLeaveFeedback={onLeaveFeedback} />
                </Section>
                
                <Section title="Statistics">
                    {!total ? <Notification message="There is no feedback"></Notification> : <Statistics
                        good={good}
                        neutral={neutral}
                        bad={bad}
                        total={total}
                        positivePercentage={positivePercentage} />
                    }
                </Section>
            </FormWrapper>
            
        )
}
