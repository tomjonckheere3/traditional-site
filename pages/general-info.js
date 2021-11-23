import Layout from 'components/layout'
import Head from 'next/head'
import Container from '../components/container'
import PageTitle from '../components/page-title'
import { getGeneralInfoPageData } from '../lib/graphcms'
import contentStyles from '../components/content-styles.module.css'

export default function GeneralInfo({ title, content }) {
    return (
        <>
            <Layout>
                <Head>
                    <title>General Info</title>
                </Head>
                <Container>
                    <PageTitle pageTitle={title} />
                    <div
                        className={`content ${contentStyles.content}`}
                        dangerouslySetInnerHTML={{__html: content}} 
                    />
                </Container>
            </Layout>
        </>
    )
}

export async function getStaticProps() {
    const generalInfoPageData = (await getGeneralInfoPageData())

    const title = generalInfoPageData.title
    const content = generalInfoPageData.content.html

    return {
        props: { title, content }
    }
}