export interface ProjectYear {
    year: string;
  }
  
  export interface Organization {
    id?: string;
    name: string;
    description: string;
    topics: string[];
    technologies: string[];
    years: ProjectYear[];
    imageURL: string;
    githubURL?: string;
    url: string;
  }

  export interface PaginationProps {
    page: number;
    setPage: (page: number | ((prevPage: number) => number)) => void;
  }

  export interface Project {
    title: string;
    short_description: string;
    student_name: string;
    project_url: string;
  }


  export interface Project {
    title: string;
    short_description: string;
    student_name: string;
    project_url: string;
  }
  
  export interface YearData {
    projects_url: string;
    projects: Project[];
  }
  
  export interface OrganizationFromAPI {
    name: string;
    description: string;
    topics: string[];
    technologies: string[];
    url: string;
    years: {
      [year: string]: YearData;
    };
  }

  