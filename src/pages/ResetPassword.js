// styles
import '../index.css';

// components / pages / images
import Layout from '../components/others/Layout';
import ResetPasswordForm from '../components/reset_password/ResetPasswordForm';

// tools
import { Helmet } from 'react-helmet';

const ResetPassword = () => {
    return (
        <>
            <Helmet>
                <title>nineNote | Reset Password</title>
            </Helmet>

            <Layout>
                <ResetPasswordForm />
            </Layout>
        </>
    )
}

export default ResetPassword