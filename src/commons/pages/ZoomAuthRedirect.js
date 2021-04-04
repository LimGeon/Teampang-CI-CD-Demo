import React from "react";
import queryString from 'query-string';

const ZoomAuthRedirect = ({ location }) => {
    const query = queryString.parse(location.search);
    window.location.href = `teampang://${query.code}`;
    return (
        <div>
            팀프하하하하하핳 리다이렉트 중!
        </div>
    );
};

export default ZoomAuthRedirect;
