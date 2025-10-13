import {XolaceButton , Ghost} from "@xolacekit/ui";

export const AnonymousButton = () => {
    return (
        <>
           <XolaceButton className={'w-2/3 mx-auto'} leftIcon={Ghost} iconStroke={2.75} label='Activate Ghost Mode' />
        </>
    );
};
