import React, { useState, useEffect } from 'react';
import "../../assets/css/NameInput.css";
import axios from 'axios';

function MeetingDetail({ match }) {

    // API 호출용
    const [meeting, setMeeting] = useState([]);
    const [confirmed_times, setConfirmed_times] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMeeting = async () => {
            try {
                // 요청이 시작 할 때에는 error 와 users 를 초기화하고
                setError(null);
                setMeeting([]);
                // loading 상태를 true 로 바꿉니다.
                setLoading(true);

                const response = await axios.get(
                    `https://api.teampang.app/meetings?code=${match.params.invite_code}`
                );
                setMeeting(response.data.data); // 데이터는 response.data 안에 들어있습니다.
                setConfirmed_times(response.data.data.confirmed_times);
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchMeeting();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;

    console.log(confirmed_times[0]);
    return (
        <React.Fragment>
            <div className="all2">
                <div className="container1">
                    <div className="header item11">
                        <img src="/HeaderMain.png" />
                    </div>

                    <div className="item22">
                        <pre className="font2">{meeting.name}의 일정입니다.<br></br></pre>
                        
                        {confirmed_times.map(confirmed_time => {
                            return <pre className="font2">{((confirmed_time.place) == null) ? 
                                "장소 미정" : (confirmed_time.place)}<br></br> 
                                {confirmed_time.start_datetime.substring(0,10)}, 
                                {(Number(confirmed_time.start_datetime.substring(11,13))<12) ? 
                                ` 오전 ${Number(confirmed_time.start_datetime.substring(11,13))}시`: (
                                    (Number(confirmed_time.start_datetime.substring(11,13)) == 12) ?
                                    ` 오후 ${Number(confirmed_time.start_datetime.substring(11,13))}시` :
                                    ` 오후 ${Number(confirmed_time.start_datetime.substring(11,13))-12}시`
                                    )}</pre>
                        })}

                        <br></br>
                        <a href={"https://www.teampang.app"}><button className="button11"> 홈으로 가기 </button></a>
                    </div>
                    <div className="item33">
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MeetingDetail