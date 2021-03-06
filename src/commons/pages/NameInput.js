import React, { useState } from 'react';
import Modal from '../components/Modals/Modal.js';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import "../../assets/css/NameInput.css";

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

    // const openModal = () => {
    //     setModalOpen(true);
    // }
    const closeModal = () => {
        setModalOpen(false);
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <div class="all">
                <Modal open={modalOpen} close={closeModal}>
                </Modal>
                <div class="header">
                    <img src="/HeaderMain.png" />
                </div>

                <h2 style={{ color: "#333333" }}>이름이 무엇인가요?</h2>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="standard-full-width"
                        placeholder="팀으로팡"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        borderColor="#5AA6F8"
                    />
                </form>
                <p>{match.params.invite_code}</p>
                <button className="button1"> 다음 </button>
            </div>
        </React.Fragment>
    )
}

export default NameInput