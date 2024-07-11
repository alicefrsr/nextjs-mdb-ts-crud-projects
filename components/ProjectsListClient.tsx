'use client';

// import { ExternalLink, Pencil } from 'lucide-react';
import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
// import RemoveBtn from './RemoveBtn';
import { useEffect, useState } from 'react';

interface IProjects {
  _id: string;
  title: string;
  summary: string;
  description: string;
}
// READ - fetch (ALL) data from DB, from CLIENT component
function ProjectsList() {
  //new
  // STATE
  const [projects, setProjects] = useState<IProjects[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // CALL FETCH FUNCTION
  useEffect(() => {
    // ASYNC FETCH FUNCTION
    const getProjects = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http:/localhost:3000/api/projects', {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        // const data = await response.json();
        const { projects } = await response.json();
        // console.log(data.projects); // data returns an object not an array (so projects.map not a function)
        // setProjects(data.projects);
        console.log(projects);

        // SET STATE
        if (projects) setProjects(projects);
      } catch (error) {
        console.log(error);
        setError('Failed to load projects. Please try reloading the page');
      } finally {
        setIsLoading(false);
      }
    };
    getProjects();
  }, []);

  const handleDeleteProject = async (id: string) => {
    try {
      const confirmed = confirm(
        'Are you sure you want to remove this project from the portfolio?'
      );
      if (confirmed) {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      }
      // update UI
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== id)
      );
    } catch (error) {
      setError('Failed to delete project. Please try again');
    }
  };

  return (
    <>
      {error && <p className='py-4 text-red-500-'>{error}</p>}

      {isLoading ? (
        <p>Loading projects...</p>
      ) : (
        <ul className='flex flex-col gap-4 mt-4'>
          {projects?.map((project, i) => (
            <ProjectItem
              key={i}
              project={project}
              onDelete={handleDeleteProject}
            />
          ))}
        </ul>
      )}
    </>
  );
}

function ProjectItem(
  handleDeleteProject: any,
  { project }: { project: IProjects }
) {
  const { _id, title, summary, description } = project;
  return (
    <li className='flex justify-between px-6 py-4 border border-slate-200 rounded-md'>
      {/* column on the left: image */}
      {/* <Image src={image} width={24} height={24} alt={title} /> */}
      {/* column in the center: info */}
      <div>
        <h2 className='font-bold text-2xl'>{title}</h2>
        <div>
          <span className='font-semibold'>Summary:</span> {summary}
        </div>
        {/* <div>
            Status:{' '}
            <span className='bg-green-500 text-white px-5 py-1 rounded-full'>
              {status || 'unknown'}
            </span>
          </div> */}
        <div>
          <span className='font-semibold'>Description:</span> {description}
        </div>
      </div>

      {/* column on the right/top: buttons */}
      <div className=''>
        <div className='flex gap-2 justify-start'>
          <Link href={`/edit/${_id}`}>
            <Pencil
              size={38}
              className=' text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 p-2 rounded-md'
            />
          </Link>
          {/* <RemoveBtn onDelete={handleDeleteProject} id={_id} /> */}
          <button
            onClick={() => handleDeleteProject(_id)}
            className=' text-red-700 bg-red-100 hover:bg-red-200 border border-red-300 px-2  rounded-md'
          >
            <Trash2 size={19} />
          </button>
        </div>
      </div>
    </li>
  );
}

export default ProjectsList;
