export const SKILL_CATEGORIES = {
    "Core CS": ["DSA", "OOP", "DBMS", "OS", "Networks"],
    "Languages": ["Java", "Python", "JavaScript", "TypeScript", "C", "C++", "C#", "Go"],
    "Web": ["React", "Next.js", "Node.js", "Express", "REST", "GraphQL"],
    "Data": ["SQL", "MongoDB", "PostgreSQL", "MySQL", "Redis"],
    "Cloud/DevOps": ["AWS", "Azure", "GCP", "Docker", "Kubernetes", "CI/CD", "Linux"],
    "Testing": ["Selenium", "Cypress", "Playwright", "JUnit", "PyTest"]
};

export const INTERVIEW_QUESTIONS = {
    // Core CS
    "DSA": "How would you optimize search performance in a large sorted dataset?",
    "OOP": "Explain the four pillars of Object-Oriented Programming with practical examples.",
    "DBMS": "Explain ACID properties and their importance in database transactions.",
    "OS": "Describe how CPU scheduling works and the difference between preemptive and non-preemptive.",
    "Networks": "Explain the OSI model layers and the purpose of TCP/IP handshakes.",

    // Languages
    "Java": "Explain the difference between interface and abstract class in Java.",
    "Python": "What are decorators in Python and how do they work?",
    "JavaScript": "Explain closures and how they are useful in JavaScript.",
    "TypeScript": "What are the advantages of interfaces over types in TypeScript?",
    "C": "Explain pointers and memory management in C.",
    "C++": "What is the difference between virtual functions and pure virtual functions?",
    "Go": "Explain Goroutines and how they differ from threads.",

    // Web
    "React": "Explain different state management options in React and when to use them.",
    "Next.js": "Describe the difference between Server-Side Rendering (SSR) and Incremental Static Regeneration (ISR).",
    "Node.js": "Explain the event loop mechanism and how it handles asynchronous operations.",
    "Express": "How does middleware work in Express, and can you give an example of one?",
    "REST": "Define the key constraints of RESTful architecture.",
    "GraphQL": "Compare GraphQL with REST in terms of over-fetching and under-fetching.",

    // Data
    "SQL": "Explain indexing and when it helps in database optimization.",
    "MongoDB": "What are the benefits of a document-based NoSQL database over a relational one?",
    "PostgreSQL": "What are the key features that make PostgreSQL a powerful open-source database?",
    "Redis": "Explain common use cases for Redis and its data persistence options.",

    // Cloud/DevOps
    "AWS": "What are the common core services in AWS (EC2, S3, RDS) and their purposes?",
    "Docker": "What is the difference between an image and a container in Docker?",
    "Kubernetes": "What is a Pod in Kubernetes, and how does it relate to containers?",
    "CI/CD": "Explain the benefits of a CI/CD pipeline in a modern development workflow.",
    "Linux": "Describe the Linux file system hierarchy and basic permission model.",

    // Testing
    "Selenium": "How do you handle dynamic elements and wait times in Selenium?",
    "Cypress": "What makes Cypress different from other automated testing tools?",
    "JUnit": "Explain the lifecycle of a JUnit test case."
};

export const extractSkills = (jdText) => {
    const detected = {};
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

    return { detected, categoryCount: totalDetected };
};

export const generateChecklist = (detected) => {
    const allSkills = Object.values(detected).flat();
    const hasAlgo = allSkills.includes("DSA");
    const hasWeb = detected["Web"]?.length > 0;
    const hasCloud = detected["Cloud/DevOps"]?.length > 0;

    return [
        {
            round: "Round 1: Aptitude / Basics",
            items: [
                "Quantitative Aptitude (Ratio, Time & Work, Profit/Loss)",
                "Logical Reasoning (Sequences, Puzzles, Syllogisms)",
                "Verbal Ability (Comprehension, Grammar, Flow)",
                "Basic Programming Flowcharts & Logic",
                "Speed & Accuracy timed practice rounds",
                "Company values, history, and mission alignment",
                "Current industry trends relevant to the role"
            ]
        },
        {
            round: "Round 2: DSA + Core CS",
            items: [
                "Complexity Analysis (Time and Space Big-O)",
                hasAlgo ? "Advanced Algorithms (Graph, Tree Traversals, DP Basics)" : "Core Algorithms (Search, Sort, Hash Maps)",
                "Memory Management (Stack vs Heap, Garbage Collection)",
                "Multi-threading, Processes, and Deadlocks (OS)",
                "Database Normalization and Indexing strategies (DBMS)",
                "Networking basics (HTTP/HTTPS, DNS, APIs)",
                "Object-Oriented Design patterns (Singleton, Factory)"
            ]
        },
        {
            round: "Round 3: Tech Interview (Projects + Stack)",
            items: [
                "Project Architecture & Technology Choice Justification",
                `Implementation depth in: ${allSkills.slice(0, 4).join(", ") || "General Stack"}`,
                hasWeb ? "State Management & Frontend performance optimization" : "System reliability & Exception handling",
                hasCloud ? "Deployment workflows & Infrastructure as Code basics" : "API Integration & Documentation best practices",
                "Debugging scenarios: How to approach a runtime crash",
                "Security best practices (Authentication, Input validation)",
                "Version control (Git) workflow and collaboration"
            ]
        },
        {
            round: "Round 4: Managerial / HR",
            items: [
                "Detailed walk-through of a past conflict resolution",
                "Experience working in an Agile/Scrum environment",
                "How you handle tight deadlines and shifting priorities",
                "Continuous learning: Latest tech you explored yourself",
                "Alignment with role expectations and growth path",
                "Behavioral questions (Tell me about a time when...)",
                "Expectations from the team and leadership style preference",
                "Long-term career goals and stability assessment"
            ]
        }
    ];
};

export const generatePlan = (detected) => {
    const skills = Object.values(detected).flat();
    const isFrontend = skills.some(s => ["React", "Next.js", "JavaScript"].includes(s));
    const isBackend = skills.some(s => ["Node.js", "Express", "SQL", "MongoDB"].includes(s));
    const isCloud = skills.some(s => ["AWS", "Docker", "Kubernetes"].includes(s));
    const hasDSA = skills.includes("DSA");

    return {
        "Day 1–2": "Basics + Core CS: Master OOP pillars, OS concepts (Threads/Locks), and Networking fundamentals.",
        "Day 3–4": hasDSA ? "DSA + Coding Practice: Solve 10 medium-level problems on Graphs, Trees, and DP." : "DSA + Coding Practice: focus on Arrays, Strings, HashMaps, and Basic Recursion.",
        "Day 5": `Project + Resume Alignment: Highlight practical application of ${skills.slice(0, 3).join(", ") || "your stack"} in your projects.`,
        "Day 6": "Mock Interview Questions: " + (
            isFrontend ? "Practice React lifecycle, Hook optimization, and CSS layout challenges." :
                isBackend ? "Practice API design, Database schema optimization, and Auth flows." :
                    isCloud ? "Practice Containerization concepts and CI/CD workflow explanations." :
                        "Practice general technical puzzle solving and logic-based questions."
        ),
        "Day 7": "Revision + Weak Areas: Review company-specific interview trends and do a final sweep of core definitions."
    };
};

export const generateQuestions = (detected) => {
    const detectedSkills = Object.values(detected).flat();
    const questions = [];

    detectedSkills.forEach(skill => {
        if (INTERVIEW_QUESTIONS[skill]) {
            questions.push({ skill, question: INTERVIEW_QUESTIONS[skill] });
        }
    });

    const generalQuestions = [
        { skill: "Behavioral", question: "Describe a project where you had to learn a new technology quickly." },
        { skill: "Problem Solving", question: "How do you approach a bug that you cannot reproduce locally?" },
        { skill: "Collaboration", question: "Tell me about a time you disagreed with a team member's technical choice." },
        { skill: "Culture", question: "Why do you want to work at this specific company and what do you bring to the table?" },
        { skill: "Design", question: "How would you design a rate-limiter for an API?" }
    ];

    while (questions.length < 10) {
        const nextQ = generalQuestions[questions.length % generalQuestions.length];
        questions.push(nextQ);
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

export const analyzeJD = (company, role, jdText) => {
    const { detected, categoryCount } = extractSkills(jdText);
    const readinessScore = calculateReadiness(company, role, jdText, categoryCount);

    const extractedSkills = detected;
    const checklist = generateChecklist(detected);
    const plan = generatePlan(detected);
    const questions = generateQuestions(detected);

    const result = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        company,
        role,
        jdText,
        extractedSkills,
        plan,
        checklist,
        questions,
        readinessScore
    };

    // Save as latest analysis for persistence across refresh
    localStorage.setItem('latest_analysis', JSON.stringify(result));

    return result;
};

export const saveToHistory = (analysis) => {
    const history = JSON.parse(localStorage.getItem('jd_history') || '[]');
    localStorage.setItem('jd_history', JSON.stringify([analysis, ...history]));
};

export const getHistory = () => {
    return JSON.parse(localStorage.getItem('jd_history') || '[]');
};

export const getLatestAnalysis = () => {
    return JSON.parse(localStorage.getItem('latest_analysis') || 'null');
};

export const updateAnalysis = (id, updates) => {
    // Update history
    const history = JSON.parse(localStorage.getItem('jd_history') || '[]');
    const updatedHistory = history.map(item =>
        item.id === id ? { ...item, ...updates } : item
    );
    localStorage.setItem('jd_history', JSON.stringify(updatedHistory));

    // Update latest_analysis if matches
    const latest = getLatestAnalysis();
    if (latest && latest.id === id) {
        localStorage.setItem('latest_analysis', JSON.stringify({ ...latest, ...updates }));
    }
};
