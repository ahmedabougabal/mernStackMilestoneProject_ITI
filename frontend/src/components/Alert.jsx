import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CheckCircle } from 'lucide-react';

const CustomSuccessAlert = ({ message, duration = 5000 }) => {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(timer);
          setVisible(false);
          return 0;
        }
        return prevProgress - (100 / (duration / 100));
      });
    }, 100);

    return () => clearInterval(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <div className="fixed top-4 right-4 max-w-sm w-full bg-green-100 border-l-4 border-green-500 rounded-md shadow-md overflow-hidden">
      <div className="p-4 flex items-center">
        <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
        <p className="text-green-700 font-medium">{message}</p>
      </div>
      <div 
        className="h-1 bg-green-500 transition-all duration-100 ease-linear" 
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

CustomSuccessAlert.propTypes = {
  message: PropTypes.string.isRequired,
  duration: PropTypes.number
};

CustomSuccessAlert.defaultProps = {
  duration: 5000
};

export default CustomSuccessAlert;