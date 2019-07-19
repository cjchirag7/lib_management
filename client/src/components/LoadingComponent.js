import React from 'react';

const Loading = () => {
    return(
        <div className="col-12 heading justify-content-center">
            <br/>
            <br/>
            <h1 align="center">
            <span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>
            <br/>
            Loading ....</h1>
        </div>
    );
};

export default Loading;