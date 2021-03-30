import React, { useState } from 'react';
import Modal from '../components/Modals/Modal.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../../assets/css/NameInput.css";
import { Link } from 'react-router-dom';

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
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [modalOpen, setModalOpen] = useState(true);
    const [value, setValue] = useState("");

    const handleChange = e => {
        console.log(e.target.value);
        setValue(e.target.value);
    }

    // const openModal = () => {
    //     setModalOpen(true);
    // }
    const closeModal = () => {
        setModalOpen(false);
    }
    const classes = useStyles();

    return (
        <React.Fragment>
            <div class="all2">
                <Modal open={modalOpen} close={closeModal}>
                </Modal>
                <div class="container1">
                    <div class="header item11">
                        <img src="/HeaderMain.png" />
                    </div>

                    <div class="item22">
                        <pre class="font2">임건님으로부터<br></br>
                    팀프앙SPRINT3 초대가 왔습니다.</pre>
                        <form className={classes.root} noValidate autoComplete="off">
                            <TextField
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
                            />
                        </form>
                        <br></br>
                        {value === "" ?
                        <button className="button33"> 다음 </button>
                        :
                        <Link to={`/join/${value}/${match.params.invite_code}`}><button className="button11"> 다음 </button></Link>
                        }
    
                    </div>
                    <div class="item33">
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default NameInput