import connectMongoDB from '@/libs/mongodb';
import Project from '@/models/project'; // type declarations?
import { NextResponse } from 'next/server';

// tested in Postman: returns 'Project updated' but doesn't update
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const {
    newTitle: title,
    newSummary: summary,
    newDescription: description,
  } = await req.json();
  await connectMongoDB();
  await Project.findByIdAndUpdate(id, { title, summary, description });
  return NextResponse.json({ message: 'Project updated' }, { status: 200 });
}

// Get project by id : tested in Postman: works
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  await connectMongoDB();
  const project = await Project.findOne({ _id: id });
  return NextResponse.json({ project }, { status: 200 });
}

// // Delete projects
// export async function DELETE(
//   req: Request,
//   { params }: { params: { id: string } }
// ) {
//   const { id } = params;
//   await connectMongoDB();
//   await Project.findByIdAndDelete(id);
//   return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
// }
