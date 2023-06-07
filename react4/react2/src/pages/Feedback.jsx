import { useState } from 'react';
import Statistics from '../component/Statistics';
export default function Feedback() {
  const [userFeedback, setUserFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  function countTotalFeedback() {
    return userFeedback.good + userFeedback.bad + userFeedback.neutral;
  }
  function onLeaveFeedback(type) {
    setUserFeedback(prev => ({ ...prev, [type]: prev[type] + 1 }));
  }
  function countPositiveFeedbackPercentage() {
    return Math.round((userFeedback.good / countTotalFeedback()) * 100) + '%';
  }
  console.log(userFeedback);
  return (
    <div>
      <h1>Please leave us a feedback</h1>
      <button onClick={() => onLeaveFeedback('good')}>Good</button>
      <button onClick={() => onLeaveFeedback('neutral')}>Neutral</button>
      <button onClick={() => onLeaveFeedback('bad')}>Bad</button>
      {countTotalFeedback() === 0 ? (
        <h3>There is no feeback</h3>
      ) : (
        <Statistics
          good={userFeedback.good}
          neutral={userFeedback.neutral}
          bad={userFeedback.bad}
          total={countTotalFeedback()}
          positivePercentage={countPositiveFeedbackPercentage()}
        />
      )}
    </div>
  );
}
