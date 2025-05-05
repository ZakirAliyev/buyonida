import './index.scss';
import {usePostRegisterCardMutation} from "../../service/paymentApi.jsx";
import {Helmet} from "react-helmet-async";

function NotFoundPage() {

    const [postRegisterCard] = usePostRegisterCardMutation()

    async function handleClick() {
        const response = await postRegisterCard({
            public_key: 'KHASGDKAGSDJHAGSD',
            language: 'az',

        }).unwrap()
    }

    return (
        <>
            <Helmet>
                <title>{'Not Found 404!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            <iframe src="https://epoint.az/az/widget?id=7070&type=users" frameBorder="0" allowTransparency="true"
                    scrolling="no" width="180" height="90"></iframe>
            <button onClick={()=>handleClick()}>Dont click me!</button>
        </>
    );
}

export default NotFoundPage;
