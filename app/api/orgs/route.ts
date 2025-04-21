import { Prisma } from '@/app/generated/prisma';
import { prisma } from '@/app/lib/utils';
import {  OrganizationFromAPI, Project, YearData } from '@/app/types/types';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const res = await fetch('https://api.gsocorganizations.dev/organizations.json');
    const orgs: OrganizationFromAPI[] = await res.json();

    for (const org of orgs) {
      await prisma.organization.upsert({
        where: { name: org.name },
        update: {
          description: org.description,
          topics: org.topics,
          technologies: org.technologies,
          url: org.url 
        },
        create: {
          name: org.name,
          description: org.description,
          topics: org.topics,
          technologies: org.technologies,
          url: org.url,
          years: {
            create: Object.entries(org.years).map(([yearKey, yearVal]: [string, YearData]) => ({
              year: yearKey,
              projectsUrl: yearVal.projects_url,
              projects: {
                create: yearVal.projects.map((project: Project) => ({
                  title: project.title,
                  shortDescription: project.short_description,
                  studentName: project.student_name,
                  projectUrl: project.project_url,
                })),
              },
            })),
          },
        },
      });
    }

    return NextResponse.json({ message: 'Organizations synced successfully.' });
  } catch (error) {
    console.error('Error during organization sync:', error);
    return NextResponse.json({ error: 'Failed to sync organizations.' }, { status: 500 });
  }
}



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '1');
  const yearFilter = searchParams.get('year');
  const techFilter = searchParams.get('technology');
  const search = searchParams.get('search')?.trim();

  const PAGE_SIZE = 12;

  const filters: Prisma.OrganizationWhereInput = {};

  if (techFilter) {
    filters.technologies = { has: techFilter };
  }

  if (yearFilter) {
    filters.years = {
      some: {
        year: yearFilter,
      },
    };
  }

  if (search) {
    filters.OR = [
      {
        name: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        description: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  try {
    const organizations = await prisma.organization.findMany({
      where: filters,
      include: {
        years: {
          include: {
            projects: true,
          },
        },
      },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      orderBy: { name: 'asc' },
    });

    const total = await prisma.organization.count({ where: filters });

    return NextResponse.json({ organizations, total });
  } catch (error) {
    console.error('Error fetching organizations:', error);
    return NextResponse.json({ error: 'Failed to fetch organizations.' }, { status: 500 });
  }
}
