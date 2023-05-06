import React, {FC} from 'react';



const ErrorText = ({errorMessage, noPadding}) => {
  if (!errorMessage) {
    return null
  }
  return (
     <p
        fontFamily="normal"
        className="text-danger"
        style={{
            marginTop: noPadding ? 0 : 10,
            marginLeft: noPadding ? 0 : 10,
        }}
        >
        {errorMessage}
      </p>
  );
};

export default ErrorText
