// styles
import '../index.css';

// components / pages / images
import Layout from '../components/others/Layout';
import ConfirmationForm from '../components/reset_link_sent/ConfirmationForm';

// tools
import { Helmet } from 'react-helmet';

const ResetLinkSent = () => {
    return (
        <>
            <Helmet>
                <title>nineNote | Reset Password</title>
            </Helmet>

            <Layout>
                <ConfirmationForm />
            </Layout>
        </>
    )
}

export default ResetLinkSent