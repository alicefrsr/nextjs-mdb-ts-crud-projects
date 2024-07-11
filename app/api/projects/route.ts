// convert to typscript nextUrl?

import connectMongoDB from '@/libs/mongodb';
import Project from '@/models/project'; // type declarations?
import { NextResponse } from 'next/server';

// tested in Postman: works - not from UI
export async function POST(req: Request) {
  const { title, summary, description } = await req.json();
  await connectMongoDB();
  await Project.create({ title, summary, description });
  return NextResponse.json({ message: 'Project created' }, { status: 201 });
}

// Get all projects // tested in Postman: works // loads on homepage
export async function GET() {
  await connectMongoDB();
  const projects = await Project.find();
  return NextResponse.json({ projects });
}

// // Delete projects
// export async function DELETE(req: Request) {
//   const id = req.nextUrl.searchParams.get('id');
//   await connectMongoDB();
//   await Project.findByIdAndDelete(id);
//   return NextResponse.json({ message: 'Project deleted' }, { status: 200 });
// }
