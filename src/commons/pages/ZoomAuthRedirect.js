import React from "react";
import queryString from 'query-string';
import loading from '../../../public/thumbs-up.json';

const lottieOptions = {
    animationData: Thumbs,   
    loop: false,        
    autoplay: false,   
    rendererSettings: {
      className: 'add-class', // svg에 적용
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

const ZoomAuthRedirect = ({ location }) => {
    const query = queryString.parse(location.search);
    window.location.href = `teampang.app://${query.code}`;
    return (
        <div>
            팀프하하하하하핳 리다이렉트 중!
        </div>
    );
};

export default ZoomAuthRedirect;
