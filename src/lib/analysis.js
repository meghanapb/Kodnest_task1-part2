export const SKILL_CATEGORIES = {
    "coreCS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "cloud": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const INTERVIEW_QUESTIONS = {
    "DSA": "How would you optimize search performance in a large sorted dataset?",
    "OOP": "Explain the four pillars of Object-Oriented Programming with practical examples.",
    "DBMS": "Explain ACID properties and their importance in database transactions.",
    "OS": "Describe how CPU scheduling works and the difference between preemptive and non-preemptive.",
    "Networks": "Explain the OSI model layers and the purpose of TCP/IP handshakes.",
    "Java": "Explain the difference between interface and abstract class in Java.",
    "Python": "What are decorators in Python and how do they work?",
    "JavaScript": "Explain closures and how they are useful in JavaScript.",
    "TypeScript": "What are the advantages of interfaces over types in TypeScript?",
    "C": "Explain pointers and memory management in C.",
    "C++": "What is the difference between virtual functions and pure virtual functions?",
    "Go": "Explain Goroutines and how they differ from threads.",
    "React": "Explain different state management options in React and when to use them.",
    "Next.js": "Describe the difference between Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).",
    "Node.js": "Explain the event loop mechanism and how it handles asynchronous operations.",
    "Express": "How does middleware work in Express, and can you give an example of one?",
    "REST": "Define the key constraints of RESTful architecture.",
    "GraphQL": "Compare GraphQL with REST in terms of over-fetching and under-fetching.",
    "SQL": "Explain indexing and when it helps in database optimization.",
    "MongoDB": "What are the benefits of a document-based NoSQL database over a relational one?",
    "PostgreSQL": "What are the key features that make PostgreSQL a powerful open-source database?",
    "Redis": "Explain common use cases for Redis and its data persistence options.",
    "AWS": "What are the common core services in AWS (EC2, S3, RDS) and their purposes?",
    "Docker": "What is the difference between an image and a container in Docker?",
    "Kubernetes": "What is a Pod in Kubernetes, and how does it relate to containers?",
    "CI/CD": "Explain the benefits of a CI/CD pipeline in a modern development workflow.",
    "Linux": "Describe the Linux file system hierarchy and basic permission model.",
    "Selenium": "How do you handle dynamic elements and wait times in Selenium?",
    "Cypress": "What makes Cypress different from other automated testing tools?",
    "JUnit": "Explain the lifecycle of a JUnit test case."
};

export const extractSkills = (jdText) => {
    const detected = {
        coreCS: [],
        languages: [],
        web: [],
        data: [],
        cloud: [],
        testing: [],
        other: []
    };
    const lowerText = jdText.toLowerCase();
    let totalDetected = 0;

    Object.entries(SKILL_CATEGORIES).forEach(([category, skills]) => {
        const found = skills.filter(skill => {
            const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
            return regex.test(lowerText);
        });
        if (found.length > 0) {
            detected[category] = found;
            totalDetected += 1;
        }
    });

    // Handle no skills detected
    if (totalDetected === 0) {
        detected.other = ["Communication", "Problem solving", "Basic coding", "Projects"];
    }

    return { detected, categoryCount: totalDetected };
};

export const generateChecklist = (detected) => {
    const allSkills = Object.values(detected).flat();
    const hasAlgo = allSkills.includes("DSA");
    const hasWeb = detected.web?.length > 0;
    const hasCloud = detected.cloud?.length > 0;

    return [
        {
            roundTitle: "Round 1: Aptitude / Basics",
            items: [
                "Quantitative Aptitude (Ratio, Time & Work)",
                "Logical Reasoning (Sequences, Puzzles)",
                "Verbal Ability (Comprehension)",
                "Basic Programming Flowcharts & Logic",
                "Company values and mission alignment"
            ]
        },
        {
            roundTitle: "Round 2: DSA + Core CS",
            items: [
                "Complexity Analysis (Time and Space)",
                hasAlgo ? "Advanced Algorithms (Graph, Tree Traversals)" : "Core Algorithms (Search, Sort)",
                "Memory Management (Stack vs Heap)",
                "OS: Processes and Deadlocks",
                "DBMS: Normalization and Indexing"
            ]
        },
        {
            roundTitle: "Round 3: Tech Interview (Projects + Stack)",
            items: [
                "Project Architecture Justification",
                `Implementation depth: ${allSkills.slice(0, 3).join(", ") || "General Stack"}`,
                hasWeb ? "Frontend performance optimization" : "System reliability",
                hasCloud ? "Deployment workflows" : "API Integration basics",
                "Debugging scenarios and Security basics"
            ]
        },
        {
            roundTitle: "Round 4: Managerial / HR",
            items: [
                "Conflict resolution and stability",
                "Working in an Agile/Scrum environment",
                "Handling tight deadlines",
                "Behavioral questions (STAR method)"
            ]
        }
    ];
};

export const generatePlan7Days = (detected) => {
    const skills = Object.values(detected).flat();
    const isFrontend = skills.some(s => ["React", "Next.js", "JavaScript"].includes(s));
    const isBackend = skills.some(s => ["Node.js", "Express", "SQL", "MongoDB"].includes(s));
    const hasDSA = skills.includes("DSA");

    const plan = [];
    plan.push({ day: "Day 1-2", focus: "Core Fundamentals", tasks: ["Master OOP pillars", "OS concepts (Threads/Locks)", "Networking (HTTP/API basics)"] });
    plan.push({ day: "Day 3-4", focus: "DSA & Problem Solving", tasks: [hasDSA ? "Solve 10 Medium Graph/Tree problems" : "Practice Arrays, Strings, HashMaps"] });
    plan.push({ day: "Day 5", focus: "Project Review", tasks: [`Deep dive into ${skills.slice(0, 2).join(", ") || "projects"} architecture`] });
    plan.push({
        day: "Day 6",
        focus: "Advanced Topics",
        tasks: [
            isFrontend ? "React hooks and CSS layouts" :
                isBackend ? "DB optimization and Auth flows" :
                    "System design patterns and Logic puzzles"
        ]
    });
    plan.push({ day: "Day 7", focus: "Final Mock & Revision", tasks: ["Review weak areas", "Practice HR responses", "Final technical sweep"] });

    return plan;
};

export const generateQuestions = (detected) => {
    const detectedSkills = Object.values(detected).flat();
    const questions = [];

    detectedSkills.forEach(skill => {
        if (INTERVIEW_QUESTIONS[skill]) {
            questions.push(`[${skill}] ${INTERVIEW_QUESTIONS[skill]}`);
        }
    });

    const generalQuestions = [
        "Describe a project where you learned a new tech quickly.",
        "How do you approach a bug that isn't reproducible locally?",
        "Tell me about a time you disagreed with a technical choice.",
        "How would you design a simple rate-limiter?",
        "Explain your approach to optimizing slow database queries."
    ];

    while (questions.length < 10) {
        questions.push(generalQuestions[questions.length % generalQuestions.length]);
    }

    return questions.slice(0, 10);
};

export const calculateReadiness = (company, role, jdText, categoryCount) => {
    let score = 35;
    score += Math.min(categoryCount * 5, 30);
    if (company && company.trim()) score += 10;
    if (role && role.trim()) score += 10;
    if (jdText && jdText.length > 800) score += 10;
    return Math.min(score, 100);
};

const ENTERPRISE_LIST = ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Netflix", "Infosys", "TCS", "Wipro", "Accenture", "IBM", "Oracle", "SAP", "Cisco"];

export const getCompanyIntel = (company) => {
    if (!company) return null;
    const isEnterprise = ENTERPRISE_LIST.some(item => company.toLowerCase().includes(item.toLowerCase()));

    return {
        name: company,
        industry: "Technology Services",
        size: isEnterprise ? "Enterprise (2000+)" : "Startup (<200)",
        isEnterprise,
        focus: isEnterprise
            ? "Structured DSA + Engineering fundamentals."
            : "Practical problem solving + tech stack depth."
    };
};

export const getRoundMapping = (intel, detectedSkills) => {
    const rounds = [];
    const skills = Object.values(detectedSkills).flat();
    const hasDSA = skills.includes("DSA");

    if (intel?.isEnterprise) {
        rounds.push({
            roundTitle: "Round 1: Online Assessment",
            focusAreas: ["DSA", "Aptitude"],
            whyItMatters: "To filter candidates based on core problem-solving efficiency."
        });
        rounds.push({
            roundTitle: "Round 2: Technical Interview I",
            focusAreas: [hasDSA ? "Algorithms" : "Logical Thinking"],
            whyItMatters: "Verifies technical depth and understanding of optimizations."
        });
        rounds.push({
            roundTitle: "Round 3: Tech + Projects",
            focusAreas: ["System Design", "Scalability"],
            whyItMatters: "Assesses how you think about larger systems."
        });
        rounds.push({
            roundTitle: "Round 4: HR",
            focusAreas: ["Culture", "Leadership"],
            whyItMatters: "Ensures alignment with company values."
        });
    } else {
        rounds.push({
            roundTitle: "Round 1: Practical Coding",
            focusAreas: [skills[0] || "Stack Depth"],
            whyItMatters: "Ensures you can ship clean, functional code immediately."
        });
        rounds.push({
            roundTitle: "Round 2: System Discussion",
            focusAreas: ["Architecture", "Trade-offs"],
            whyItMatters: "Evaluates your decision-making processes."
        });
        rounds.push({
            roundTitle: "Round 3: Culture Fit",
            focusAreas: ["Vision", "Fast-pace"],
            whyItMatters: "Startups need people who can adapt quickly."
        });
    }
    return rounds;
};

export const analyzeJD = (company, role, jdText) => {
    const { detected, categoryCount } = extractSkills(jdText);
    const intel = getCompanyIntel(company);
    const roundMapping = getRoundMapping(intel, detected);
    const baseScore = calculateReadiness(company, role, jdText, categoryCount);

    const result = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        company: company || "",
        role: role || "",
        jdText,
        intel,
        extractedSkills: detected,
        roundMapping,
        checklist: generateChecklist(detected),
        plan7Days: generatePlan7Days(detected),
        questions: generateQuestions(detected),
        baseScore,
        skillConfidenceMap: {},
        finalScore: baseScore
    };

    localStorage.setItem('latest_analysis', JSON.stringify(result));
    return result;
};

export const saveToHistory = (analysis) => {
    const history = JSON.parse(localStorage.getItem('jd_history') || '[]');
    localStorage.setItem('jd_history', JSON.stringify([analysis, ...history]));
};

export const getHistory = () => {
    try {
        const raw = localStorage.getItem('jd_history');
        if (!raw) return [];
        const history = JSON.parse(raw);
        // Filter out corrupted entries (minimal validation)
        return history.filter(item => item && item.id && item.jdText);
    } catch (e) {
        console.error("Failed to parse history", e);
        return [];
    }
};

export const getLatestAnalysis = () => {
    try {
        const raw = localStorage.getItem('latest_analysis');
        if (!raw) return null;
        return JSON.parse(raw);
    } catch (e) {
        return null;
    }
};

export const updateAnalysis = (id, updates) => {
    const history = getHistory();
    const updatedHistory = history.map(item =>
        item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item
    );
    localStorage.setItem('jd_history', JSON.stringify(updatedHistory));

    const latest = getLatestAnalysis();
    if (latest && latest.id === id) {
        localStorage.setItem('latest_analysis', JSON.stringify({ ...latest, ...updates, updatedAt: new Date().toISOString() }));
    }
};
