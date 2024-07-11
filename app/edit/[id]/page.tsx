import EditProjectForm from '@/components/EditProjectForm';

//////////////////
// READ - fetch data (PROJECT) from DB, from server component
const getProjectById = async (projectId: string) => {
  //? const getProjectById = async (_id : string) => {
  try {
    // CANNOT call you API locally from server side, need the full path
    const res = await fetch(`http://localhost:3000/api/projects/${projectId}`, {
      method: 'GET',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch project');
    }

    return res.json();
  } catch (error) {
    console.log(`Error fetching project with id ${projectId} : `, error);
  }
};
//////////////////

export default async function EditProjectPage({ params }: any) {
  const { id } = params;
  const { project } = await getProjectById(id);
  console.log(project);
  const { _id, title, summary, description } = project;
  return (
    <EditProjectForm
      id={id}
      title={title}
      summary={summary}
      description={description}
    />
  );
}

/////////////////////
// // example of dynamic SEO : metadata on dynamic pages
// For example if we had a specific post on this page, dynamically served with params id:

// const fetchPost = async (postId) => {
//   const post = await fetch(`/api/posts/${postId}`, { method: 'GET' });
//   return post.json();
// };
// // we'd use this Next function:
// export async function geenrateMetadata({ params }) {
//   const { post } = await fetchPost(params.id);

//   return {
//     title: post[0].title,
//     description: post[0].description,
//     // etc
//   };
// }

// export default function PostIDPage({ params }) {
//   return <main>Post {params.id}</main>;
// }
