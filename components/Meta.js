import Head from 'next/head'

const Meta = ({title, keywords, description}) => {
    return (
        <Head>
            <meta name = 'viewport' content = 'width=device-width, initial-scale=1' />
            <meta name='keywords' content={keywords} />
            <meta name='description' content={description} />
            <meta charSet='utf-8' />
            <meta lang='en'/>
            <link rel='icon' href='/favicon.ico' />
            <title>CDS Spelling | {title}</title>
        </Head>

    )
}

Meta.defaultProps = {
    title: 'Home',
    keywords: 'education, teaching, spelling, words',
    description: 'Welcome to CDS Spelling. This app is designed for teachers to create their own online spelling quizzes and share the links with students.'
}

export default Meta