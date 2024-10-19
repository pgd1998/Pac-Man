// import React, { useEffect,useRef, useState } from "react";
// import './WelcomeMsg.css';

// const WelcomeMsgModal = () => {
//     const [showMessage, setShowMessage] = useState(true);
//     const [signedUp, setSignedUp] = useState(false);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const modalRef = useRef(null);
//     const userName=localStorage.getItem('userName')
//     useEffect(() => {
//         if (localStorage.getItem('signed-up')) {
//             setSignedUp(true);
//         }
    
//         if (localStorage.getItem('logged-in')) {
//             setLoggedIn(true);
//         }

//         const handleClickOutside = (event) => {
//             if (modalRef.current && !modalRef.current.contains(event.target)) {
//                 handleCancel();
//             }
//         }

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, []);

//     const handleCancel = () => {
//             setShowMessage(false);
//             setLoggedIn(false);
//             setSignedUp(false);
//     }
    
//     return (
//         <div className="welcome-modal-backdrop">
//             {userName && showMessage && loggedIn &&
//                 < div className="message-container" ref={modalRef}>
//                     <span>Welcome Back {userName}</span>    
//                     <button onClick={handleCancel}>×</button>
//                 </div>
//             }
            
//             {userName && showMessage && signedUp &&
//                 < div className="message-container" ref={modalRef}>
//                     <span>Welcome {userName}. Enjoy the game! </span>
//                     <button onClick={handleCancel}>×</button>
//                 </div>
//             }
//             </div>
//     )
// }

// export default WelcomeMsgModal;

import React, { useEffect, useRef, useState } from "react";
import './WelcomeMsg.css';

const WelcomeMsgModal = () => {
    const [showMessage, setShowMessage] = useState(true);
    const [signedUp, setSignedUp] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const modalRef = useRef(null);
    const userName = localStorage.getItem('name');

    useEffect(() => {
        if (localStorage.getItem('signed-up')) {
            setSignedUp(true);
        }
    
        if (localStorage.getItem('logged-in')) {
            setLoggedIn(true);
        }

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                handleCancel();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleCancel = () => {
        localStorage.removeItem('logged-in');
        localStorage.removeItem('signed-up')
        setShowMessage(false);
        setLoggedIn(false);
        setSignedUp(false);
    };

    return (
        <>
        { showMessage && (
            <div className="welcome-modal-backdrop">
                <div className="message-container" ref={modalRef}>
                    {loggedIn && <span>Welcome Back <strong>{userName}</strong>!</span>}
                    {signedUp && !loggedIn && <span>Welcome <strong>{userName}</strong>. Enjoy the game!</span>}
                    <button onClick={handleCancel}>×</button>
                    </div>
                    </div>
            )}
                
                </>
    );
};

export default WelcomeMsgModal;