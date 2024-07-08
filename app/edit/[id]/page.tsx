'use client';
import { useState } from 'react';

export default function EditFormPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  return (
    <>
      <h2 className='text-2xl font-bold my-8'>Edit project</h2>
      <form className='flex flex-col gap-4 '>
        <input
          className='border border-slate-200 rounded-md px-4 py-1'
          type='text'
          name='title'
          placeholder='Project title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          className='border border-slate-200 rounded-md px-4 py-1'
          type='text'
          name='summary'
          placeholder='Project summary'
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
        />
        <textarea
          className='border border-slate-200 rounded-md px-4 py-1'
          // type='text'
          rows={4}
          name='description'
          placeholder='Project description'
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        ></textarea>
        <button
          type='submit'
          className='ml-auto rounded-md text-orange-900 bg-orange-200 hover:bg-orange-300 px-3 py-2 w-fit '
        >
          Update project
        </button>
      </form>
    </>
  );
}
