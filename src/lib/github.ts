export interface GithubProject {
    name: string;
    description: string;
    url: string;
    stargazerCount: number;
    primaryLanguage: {
        name: string;
        color: string;
    } | null;
    updatedAt: string;
}

const FALLBACK_PROJECTS: GithubProject[] = [
    {
        name: "Image-based End-to-End Topological Navigation",
        description: "Developing navigation systems that leverage visual perception and topological mapping for autonomous robot navigation.",
        url: "https://github.com/CoderKai9001",
        stargazerCount: 12,
        primaryLanguage: {
            name: "Python",
            color: "#08CB00"
        },
        updatedAt: new Date().toISOString()
    },
    {
        name: "LIDAR-Vision-Portfolio",
        description: "High-tech portfolio website with 3D point cloud background and bento-grid layout.",
        url: "https://github.com/CoderKai9001/PortfolioWebsite",
        stargazerCount: 8,
        primaryLanguage: {
            name: "Astro",
            color: "#ff7e33"
        },
        updatedAt: new Date().toISOString()
    }
];

export async function fetchPinnedProjects(): Promise<GithubProject[]> {
    const token = import.meta.env.GITHUB_TOKEN || process.env.GH_API_TOKEN;

    if (!token) {
        console.warn("GITHUB_TOKEN or GH_API_TOKEN not found. Using fallback projects.");
        return FALLBACK_PROJECTS;
    }

    const query = `
    query {
      user(login: "CoderKai9001") {
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              description
              url
              stargazerCount
              primaryLanguage {
                name
                color
              }
              updatedAt
            }
          }
        }
      }
    }
  `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const json = await response.json();

        if (json.errors) {
            console.error("GraphQL Errors:", json.errors);
            return FALLBACK_PROJECTS;
        }

        const projects = json.data?.user?.pinnedItems?.nodes as GithubProject[];
        return projects?.length > 0 ? projects : FALLBACK_PROJECTS;
    } catch (error) {
        console.error("Error fetching pinned projects:", error);
        return FALLBACK_PROJECTS;
    }
}
