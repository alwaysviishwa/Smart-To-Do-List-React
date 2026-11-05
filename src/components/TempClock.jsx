import { useEffect, useState } from "react";
 
function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
 
  useEffect(() => {
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
 
    return () => clearInterval(timerId);
  }, []);
 
  return (
    <div className="clock-box">
      <span className="clock-label">Current time</span>
      <strong>{currentTime.toLocaleTimeString()}</strong>
      <small>{currentTime.toLocaleDateString()}</small>
    </div>
  );
}
 
export default Clock;
