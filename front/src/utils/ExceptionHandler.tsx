import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type ExceptionHandlerProps = {
    children: ReactNode;
};

function ExceptionHandler({ children }: ExceptionHandlerProps): JSX.Element {
    const location = useLocation();
    // console.log(location);

    return <div>{children}</div>;
}

export default ExceptionHandler;
