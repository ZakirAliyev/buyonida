import './index.scss';
import {Helmet} from "react-helmet-async";

function NotFoundPage() {

    return (
        <>
            <Helmet>
                <title>{'Not Found 404!'}</title>
                <link rel="icon" href={'/src/assets/favicon-32x32.png'} />
            </Helmet>
            NOT FOUND!
        </>
    );
}

export default NotFoundPage;
