import React, { useState, useEffect } from 'react';
import Modal from '../components/Modals/Modal.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../../assets/css/NameInput.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

function MeetingDetail({ match }) {

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(true);
    const [value, setValue] = useState("");

    // API 호출용
    const [meeting, setMeeting] = useState([]);
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
                console.log(response.data.data);
                setMeeting(response.data.data); // 데이터는 response.data 안에 들어있습니다.
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        };

        fetchMeeting();
    }, []);

    if (loading) return <div>로딩중..</div>;
    if (error) return <div>에러가 발생했습니다</div>;
    
    

    const handleChange = e => {
        setValue(e.target.value);
    }

    // const openModal = () => {
    //     setModalOpen(true);
    // }
    const closeModal = () => {
        setModalOpen(false);
    }
    

    return (
        <React.Fragment>
            <div className="all2">
                <Modal open={modalOpen} close={closeModal}>
                </Modal>
                <div className="container1">
                    <div className="header item11">
                        <img src="/HeaderMain.png" />
                    </div>

                    <div className="item22">
                        <pre className="font2">{meeting.name}의 일정입니다.<br></br></pre>

                        <br></br>
                        {value === "" ?
                            <button className="button33"> 다음 </button>
                            :
                            <Link to={`/join/${value}/${match.params.invite_code}`}><button className="button11"> 다음 </button></Link>
                        }

                    </div>
                    <div className="item33">
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MeetingDetail