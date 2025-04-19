import { prisma } from '@/app/lib/utils';
import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const res = await fetch('https://api.gsocorganizations.dev/organizations.json');
        const orgs: any[] = await res.json();

        for (const org of orgs) {
            // Try to upsert the org by name, only creating years/projects if it's new
            await prisma.organization.upsert({
                where: { name: org.name },
                update: {
                    // Skip nested years/projects update to avoid redundant work
                    description: org.description,
                    topics: org.topics,
                    technologies: org.technologies,
                },
                create: {
                    name: org.name,
                    description: org.description,
                    topics: org.topics,
                    technologies: org.technologies,
                    years: {
                        create: Object.entries(org.years).map(([yearKey, yearVal]: any) => ({
                            year: yearKey,
                            projectsUrl: yearVal.projects_url,
                            projects: {
                                create: yearVal.projects.map((project: any) => ({
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

            console.log(`Upserted org: ${org.name}`);
        }

        return NextResponse.json({ message: 'Organizations synced successfully.' });
    } catch (error) {
        console.error('Error during organization sync:', error);
        return NextResponse.json({ error: 'Failed to sync organizations.' }, { status: 500 });
    }
}


export async function GET() {
    try {
        const organizations = await prisma.organization.findMany({
            include: {
                years: {
                    include: {
                        projects: true,
                    },
                },
            },
        });

        return NextResponse.json(organizations);
    } catch (error) {
        console.error('Error fetching organizations:', error);
        return NextResponse.json({ error: 'Failed to fetch organizations.' }, { status: 500 });
    }
}