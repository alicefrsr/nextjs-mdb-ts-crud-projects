import Link from 'next/link';
import RemoveBtn from './RemoveBtn';
import { Pencil } from 'lucide-react';
// import data from '@/data/data.json';
import Image from 'next/image';

//////////////////
// READ - fetch (ALL) data from DB, from SERVER component
const getProjects = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/projects', {
      cache: 'no-store',
    });
    if (!res.ok) {
      throw new Error('Failed to fetch projects');
    }
    return res.json();
  } catch (error) {
    console.log('Error fetching projects: ', error);
  }
};
//////////////////

export default async function ProjectsList() {
  // deconstruct (promised) data returned from MongoDB
  const { projects } = await getProjects();
  return (
    <>
      <ul className='flex flex-col gap-4 mt-4'>
        {/* {data.map((project, i) => (
          <ProjectItem key={i} project={project} />
          // <ProjectItem key={i} {...project} />
        ))} */}
        {projects.map((project: any, i: any) => (
          <ProjectItem key={i} project={project} />
        ))}
      </ul>
    </>
  );
}

function ProjectItem({ project }: any) {
  // function projectItem(project) {
  const { _id, title, image, summary, description } = project;

  return (
    <li className='flex justify-between p-4 border border-slate-200 rounded-md'>
      <div className='flex gap-5'>
        {/* column on the left: image */}
        {/* <Image src={image} width={24} height={24} alt={title} /> */}
        {/* column in the center: info */}
        <div>
          <h2 className='font-bold text-2xl'>{title}</h2>
          <div>Summary: {summary}</div>
          {/* <div>
            Status:{' '}
            <span className='bg-green-500 text-white px-5 py-1 rounded-full'>
              {status || 'unknown'}
            </span>
          </div> */}
          <div>Description: {description}</div>
        </div>
      </div>

      {/* column on the right: buttons */}
      <div className=''>
        <div className='flex gap-2 justify-start'>
          <Link href={`/edit/${_id}`}>
            <Pencil
              size={38}
              className='text-slate-800 bg-slate-200 hover:bg-slate-300 p-2 rounded-md'
            />
          </Link>
          <RemoveBtn id={_id} />
        </div>
      </div>
    </li>
  );
}
