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
                        <img src="/teampang_info2.png" />
                    </main>
                    <footer>
                        <a href={"https://apps.apple.com/kr/app/%ED%8C%80%ED%94%84%EC%95%99/id1563146145"}><button className="button1" onClick={close}> 팀프앙 앱으로 보기 </button></a>
                        <button className="button2" onClick={close}> 모바일 웹으로 볼래요 </button>
                    </footer>
                </section>
            ) : null}
        </div>
    )
}

export default Modal