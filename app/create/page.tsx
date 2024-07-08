'use client';
import { useState } from 'react';

export default function CreateFormPage() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  return (
    <>
      <h2 className='text-2xl font-bold my-8'>Create a new project</h2>
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
          className='ml-auto rounded-md text-green-700 bg-green-100 hover:bg-green-200 border border-green-300 px-3 py-2  w-fit '
        >
          Add project
        </button>
      </form>
    </>
  );
}
