import Layout from 'components/layout'
import Head from 'next/head'
import Container from '../components/container'
import PageTitle from '../components/page-title'
import { getAboutPageData } from '../lib/graphcms'

export default function About({ title, content }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>About us</title>
                </Head>
                <Container>
                    <PageTitle pageTitle={title} />
                    <div dangerouslySetInnerHTML={{__html: content}} />
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const aboutPageData = (await getAboutPageData())
    
    const title = aboutPageData.title
    const content = aboutPageData.content.html

    return {
        props: { title, content }
    }
}