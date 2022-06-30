import React from 'react';

function Loading() {
    return (
        <div className="loader">
            <div className="loader-inner ball-spin-fade-loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <p className="txt_loader">LOADING</p>
        </div>
    );
}

export default Loading;
