import Layout from 'components/layout'
import Head from 'next/head'
import Container from '../components/container'
import PageTitle from '../components/page-title'
import ContactForm from 'components/contact-from'

export default function Contact() {
    return (
        <>
            <Layout>
                <Head>
                    <title>Contact</title>
                </Head>
                <Container>
                    <PageTitle pageTitle="Contact" />
                    <ContactForm />
                </Container>
            </Layout>
        </>
    )
}