import Layout from '../../components/layout';
import Head from 'next/head';
import remark from 'remark';
import html from 'remark-html';

export default function Project({ project, descriptionHtml }) {
    return (
        <Layout>
            <Head>
                <title>Project: {project.title}</title>
            </Head>
            <h3>{ project.title }</h3>
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
        </Layout>
    );
}

export async function getStaticPaths() {
    const res = await fetch('http://cms:1337/projects');
    const projects = await res.json();
    return {
        paths: projects.map(project => {
            return {
                params: {
                    id: project.id.toString()
                }
            };
        }),
        fallback: false
    };
}

export async function getStaticProps({ params }) {
    const res = await fetch('http://cms:1337/projects/' + params.id);
    const project = await res.json();
    const description = await remark().use(html).process(project.description)
    const descriptionHtml = description.toString();
    return {
        props: {
            project,
            descriptionHtml,
        }
    };
}
