'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EditProjectForm({ id, title, summary, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newSummary, setNewSummary] = useState(summary);
  const [newDescription, setNewDescription] = useState(description);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault(e);
    if (!newTitle || !newSummary || !newDescription) {
      console.log('All fields are required.');
      return;
    }
    try {
      const res = await fetch(`http://localhost:3000/api/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newSummary, newDescription }),
      });

      if (!res.ok) {
        throw new Error('Failed to update project');
      }
      router.push('/');
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='title'
        placeholder='Project title'
        onChange={(e) => setNewTitle(e.target.value)}
        value={newTitle}
      />
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='summary'
        placeholder='Project summary'
        onChange={(e) => setNewSummary(e.target.value)}
        value={newSummary}
      />
      <input
        className='border border-slate-200 rounded-md px-8 py-2'
        type='text'
        name='description'
        placeholder='Project description'
        onChange={(e) => setNewDescription(e.target.value)}
        value={newDescription}
      />
      <button
        type='submit'
        className='ml-auto rounded-md text-orange-900 bg-orange-200 hover:bg-orange-300 py-2 px-3 w-fit '
      >
        Update project
      </button>
      ;
    </form>
  );
}
