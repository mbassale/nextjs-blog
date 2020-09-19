import Layout from '../../components/layout';

export default function Project({ project }) {
    return (
        <Layout>
            { project.title }
            <br />
            { project.description }
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
    return {
        props: {
            project
        }
    };
}
