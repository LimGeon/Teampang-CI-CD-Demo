import React from 'react';
import "../../../assets/css/modal.css";

const Modal = (props) => {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header } = props;

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div className={open ? 'openModal modal' : 'modal'}>
            { open ? (
                <section>
                    <header>
                    </header>
                    <main>
                        <img  src="/teampang_info.png" />
                    </main>
                    <footer>
                        <button className="button1" onClick={close}> 팀프앙 앱으로 보기 </button>
                        <button className="button2" onClick={close}> 모바일 웹으로 볼래요 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal