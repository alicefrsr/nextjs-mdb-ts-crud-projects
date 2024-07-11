'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateNewProjectFormPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault(e);
    if (!title || !summary || !description) {
      console.log('All fields are required.');
      return;
    }

    //////////////////
    // CREATE - send data to DB, from client component
    try {
      const res = await fetch('http://localhost:3000/api/projects', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ title, summary, description }),
      });

      if (res.ok) {
        router.push('/');
        router.refresh();
      } else {
        throw new Error('Failed to create a new project');
      }
    } catch (error) {
      console.log(error);
    }
  };
  //////////////////

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='title'
        placeholder='Project title'
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='summary'
        placeholder='Project summary'
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
      />
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='description'
        placeholder='Project description'
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <button
        type='submit'
        className='ml-auto rounded-md text-green-900 bg-green-200 hover:bg-green-300 py-2 px-3 w-fit '
      >
        Add project
      </button>
    </form>
  );
}
