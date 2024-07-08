'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RemoveBtn({ id }: { id: string }) {
  const router = useRouter();
  //////////////////
  // DELETE - fetch and delete data from DB, from client component
  const handleRemoveProject = async (id: string) => {
    const confirmed = confirm(
      'Are you sure you want to remove this project from the portfolio?'
    );
    if (confirmed) {
      await fetch(`http://localhost:3000/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      router.refresh();
    }
  };
  return (
    <button
      onClick={handleRemoveProject}
      className='text-red-800 bg-red-200 hover:bg-red-300 p-2 rounded-md'
    >
      <Trash2 size={22} />
    </button>
  );
}
