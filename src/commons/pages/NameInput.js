import React, { useState, useEffect } from 'react';
import Modal from '../components/Modals/Modal.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../../assets/css/NameInput.css";
import { Link } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '25ch',
    },
}));    

function NameInput({ match }) {

    var check_num = /[0-9]/;
    var check_eng = /[a-zA-Z]/;
    var check_spc = /[ㄱ-ㅎ|ㅏ-ㅣ|~!@#$%^&*()_+|<>?:{}]/;
    var check_kor = /[가-힣]/;

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(true);
    const [value, setValue] = useState("");

    // API 호출용
    const [meeting, setMeeting] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const classes = useStyles();

    //const duplicateName

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
                        <pre className="font2">{meeting.author}님으로부터<br></br>
                     {meeting.name} 초대가 왔습니다.</pre>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
                                error = {false}
                                value={value}
                                onChange={handleChange}
                                id="standard-full-width"
                                placeholder="이름을 입력해주세요."
                                fullWidth
                                margin="normal"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                borderColor="#5AA6F8"
                                // error={true}
                                // helperText="안녕하세요"
                            />
                        </form>
                        <br></br>
                        {value === "" ?
                            <button className="button33"> 다음 </button>
                            :
                            (
                            (check_spc.test(value) == true) ?
                            <button className="button33"> 한글, 영문, 숫자만 입력해주세요. </button>
                            :
                            <Link to={`/join/${value}/${match.params.invite_code}`}><button className="button11"> 다음 </button></Link>
                            )
                        }

                    </div>
                    <div className="item33">
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NameInput