import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../components/ui/Card';
import { Play, Calendar, CheckCircle2, History as HistoryIcon, Search, PlusCircle, FileText, CalendarDays, ListChecks, HelpCircle, CheckCircle, ArrowRight, Copy, Download, Lightbulb, Target, Building2, Users, Info, Clock, ShieldCheck, Lock, Unlock, RotateCcw, Link, Github, ExternalLink, PackageCheck, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { analyzeJD, saveToHistory, getHistory, getLatestAnalysis, updateAnalysis } from '../lib/analysis';

// Mock Data for Radar Chart
const skillData = [
    { subject: 'DSA', A: 75, fullMark: 100 },
    { subject: 'System Design', A: 60, fullMark: 100 },
    { subject: 'Communication', A: 80, fullMark: 100 },
    { subject: 'Resume', A: 85, fullMark: 100 },
    { subject: 'Aptitude', A: 70, fullMark: 100 },
];

const CircularProgress = ({ value, max = 100 }) => {
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / max) * circumference;

    return (
        <div className="relative flex items-center justify-center">
            <svg className="w-48 h-48 transform -rotate-90">
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-100"
                />
                <circle
                    cx="96"
                    cy="96"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    className="text-primary transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-slate-900">{value}</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Readiness Score</span>
            </div>
        </div>
    );
};

export const DashboardHome = () => {
    const weeklyActivity = [true, true, true, false, true, false, false]; // Mon-Sun
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Overall Readiness */}
                <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-slate-50">
                    <CardHeader className="w-full text-center pb-2">
                        <CardTitle>Overall Readiness</CardTitle>
                        <CardDescription>Your current preparation level</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <CircularProgress value={72} />
                    </CardContent>
                </Card>

                {/* Skill Breakdown */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skill Breakdown</CardTitle>
                        <CardDescription>Performance across core domains</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] min-h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar
                                    name="Skills"
                                    dataKey="A"
                                    stroke="hsl(245, 58%, 51%)"
                                    fill="hsl(245, 58%, 51%)"
                                    fillOpacity={0.6}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Continue Practice */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Play className="w-5 h-5 text-primary fill-primary" />
                            Continue Practice
                        </CardTitle>
                        <CardDescription>Pick up where you left off</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <h4 className="font-bold text-lg text-slate-900">Dynamic Programming</h4>
                                <p className="text-sm text-slate-500">3/10 problems completed</p>
                            </div>
                            <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-opacity-90 transition-all">
                                Continue
                            </button>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-[30%]"></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Weekly Goals */}
                <Card>
                    <CardHeader>
                        <CardTitle>Weekly Goals</CardTitle>
                        <CardDescription>Problems Solved: 12/20 this week</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-[60%]"></div>
                        </div>
                        <div className="flex justify-between px-2">
                            {days.map((day, idx) => (
                                <div key={idx} className="flex flex-col items-center gap-2">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold",
                                        weeklyActivity[idx]
                                            ? "bg-primary text-white shadow-sm"
                                            : "bg-slate-100 text-slate-400"
                                    )}>
                                        {weeklyActivity[idx] && <CheckCircle2 className="w-4 h-4" />}
                                        {!weeklyActivity[idx] && day}
                                    </div>
                                    <span className="text-[10px] text-slate-400 font-medium uppercase">{day}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Upcoming Assessments */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Upcoming Assessments</CardTitle>
                        <CardDescription>Stay ahead of your schedule</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                { title: "DSA Mock Test", time: "Tomorrow, 10:00 AM", color: "bg-blue-50 text-blue-700" },
                                { title: "System Design Review", time: "Wed, 2:00 PM", color: "bg-purple-50 text-purple-700" },
                                { title: "HR Interview Prep", time: "Friday, 11:00 AM", color: "bg-green-50 text-green-700" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 hover:border-primary/20 transition-colors">
                                    <div className={cn("p-2 rounded-lg", item.color)}>
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-900">{item.title}</h4>
                                        <p className="text-sm text-slate-500">{item.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

            </div>
        </div>
    );
};

export const Practice = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Practice</h1>
        <p className="text-slate-600">Sharpen your skills with hundreds of problems.</p>
    </div>
);

export const Assessments = () => {
    const [formData, setFormData] = useState({ company: '', role: '', jdText: '' });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = analyzeJD(formData.company, formData.role, formData.jdText);
        saveToHistory(result);
        navigate('/dashboard/results', { state: { analysis: result } });
    };

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">JD Analysis</h1>
                    <p className="text-slate-500">Analyze a Job Description for readiness scoring and prep material.</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/history')}
                    className="flex items-center gap-2 text-primary font-semibold hover:underline"
                >
                    <HistoryIcon size={20} />
                    View History
                </button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Job Details</CardTitle>
                    <CardDescription>Enter the job details and description to get started.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Company Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Google"
                                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    value={formData.company}
                                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Role / Designation</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Software Engineer"
                                    className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">Job Description</label>
                            <textarea
                                required
                                rows={10}
                                placeholder="Paste the job description here..."
                                className="w-full p-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                                value={formData.jdText}
                                onChange={(e) => setFormData({ ...formData, jdText: e.target.value })}
                            />
                            <p className="text-xs text-slate-400">{formData.jdText.length} characters (Pro tip: {'>'}800 chars adds 10 points to readiness score)</p>
                            {formData.jdText.length > 0 && formData.jdText.length < 200 && (
                                <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 text-amber-700 text-xs">
                                    <Info size={14} className="mt-0.5" />
                                    <span>This JD is too short to analyze deeply. Paste full JD for better output.</span>
                                </div>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            Analyze Readiness
                        </button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export const AnalysisResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [analysis, setAnalysis] = useState(location.state?.analysis || null);
    const [skillConfidence, setSkillConfidence] = useState({});
    const [currentScore, setCurrentScore] = useState(0);

    useEffect(() => {
        if (!analysis) {
            const latest = getLatestAnalysis();
            if (latest) {
                setAnalysis(latest);
            } else {
                navigate('/dashboard/assessments');
            }
        } else {
            setSkillConfidence(analysis.skillConfidenceMap || {});
            setCurrentScore(analysis.finalScore || analysis.baseScore);
        }
    }, [analysis, navigate]);

    useEffect(() => {
        if (analysis) {
            const baseScore = analysis.baseScore;
            let adjustment = 0;
            const allSkills = Object.values(analysis.extractedSkills).flat();

            allSkills.forEach(skill => {
                const confidence = skillConfidence[skill] || 'practice';
                adjustment += (confidence === 'know' ? 2 : -2);
            });

            const newScore = Math.min(100, Math.max(0, baseScore + adjustment));
            setCurrentScore(newScore);

            // Debounced/Immediate save to localStorage
            const timeoutId = setTimeout(() => {
                updateAnalysis(analysis.id, {
                    skillConfidenceMap: skillConfidence,
                    finalScore: newScore
                });
            }, 500);
            return () => clearTimeout(timeoutId);
        }
    }, [skillConfidence, analysis]);

    const handleToggleSkill = (skill) => {
        setSkillConfidence(prev => ({
            ...prev,
            [skill]: prev[skill] === 'know' ? 'practice' : 'know'
        }));
    };

    const copyToClipboard = (text, title) => {
        navigator.clipboard.writeText(text);
        alert(`${title} copied to clipboard!`);
    };

    const downloadTxt = () => {
        const sections = [
            `Analysis for ${analysis.role} at ${analysis.company}`,
            `Readiness Score: ${currentScore}%`,
            `\n7-DAY PREPARATION PLAN\n${analysis.plan7Days.map(p => `${p.day} (${p.focus}):\n${p.tasks.map(t => `- ${t}`).join('\n')}`).join('\n')}`,
            `\nROUND-WISE CHECKLIST\n${analysis.checklist.map(r => `${r.roundTitle}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n')}`,
            `\nTOP 10 INTERVIEW QUESTIONS\n${analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}`
        ];
        const blob = new Blob([sections.join('\n')], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Analysis_${analysis.company}_${analysis.role}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    if (!analysis) return null;

    const weakSkills = Object.values(analysis.extractedSkills).flat().filter(s => (skillConfidence[s] || 'practice') === 'practice').slice(0, 3);

    return (
        <div className="p-8 space-y-8 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">{analysis.role} at {analysis.company}</h1>
                    <p className="text-slate-500">Analyzed on {new Date(analysis.createdAt).toLocaleDateString()} at {new Date(analysis.createdAt).toLocaleTimeString()}</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={downloadTxt}
                        className="bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                        <Download size={18} />
                        Export TXT
                    </button>
                    <button
                        onClick={() => navigate('/dashboard/assessments')}
                        className="bg-primary text-white px-4 py-2 rounded-lg hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                    >
                        <PlusCircle size={18} />
                        New Analysis
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Score & Skills */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-white to-slate-50 border-primary/10">
                        <CardHeader className="text-center p-0 mb-4">
                            <CardTitle>Overall Readiness</CardTitle>
                            <CardDescription>Live Score (Adjusted)</CardDescription>
                        </CardHeader>
                        <CircularProgress value={currentScore} />
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
                            <span>Base: {analysis.baseScore}%</span>
                            <span className={cn(currentScore >= analysis.baseScore ? "text-green-500" : "text-amber-500")}>
                                {currentScore >= analysis.baseScore ? "+" : ""}{currentScore - analysis.baseScore}%
                            </span>
                        </div>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Building2 className="text-primary" />
                                {analysis.intel?.name || "Company Profile"}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Industry</p>
                                    <p className="text-sm font-semibold text-slate-700">{analysis.intel?.industry || "Technology"}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Estimated Size</p>
                                    <p className="text-sm font-semibold text-slate-700">{analysis.intel?.size || "N/A"}</p>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Typical Hiring Focus</p>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 italic text-xs text-slate-600 leading-relaxed shadow-inner">
                                    "{analysis.intel?.focus}"
                                </div>
                            </div>
                            <div className="flex items-center gap-2 pt-2 text-[10px] text-slate-400 font-medium">
                                <Info size={12} />
                                <span>Demo Mode: Company intel generated heuristically.</span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="text-primary" />
                                Interactive Skill Map
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {Object.keys(analysis.extractedSkills).length > 0 ? (
                                Object.entries(analysis.extractedSkills).map(([cat, skills]) => (
                                    <div key={cat} className="space-y-2">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{cat}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {skills.map(s => {
                                                const isKnown = skillConfidence[s] === 'know';
                                                return (
                                                    <button
                                                        key={s}
                                                        onClick={() => handleToggleSkill(s)}
                                                        className={cn(
                                                            "text-xs font-medium px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1.5",
                                                            isKnown
                                                                ? "bg-green-50 text-green-700 border-green-200"
                                                                : "bg-amber-50 text-amber-700 border-amber-200"
                                                        )}
                                                    >
                                                        {isKnown ? <CheckCircle size={12} /> : <Target size={12} />}
                                                        {s}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-500 italic">General fresher stack detected.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Plan & Checklist */}
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <Clock className="text-primary" />
                                    Dynamic Interview Mapping
                                </CardTitle>
                                <CardDescription>Estimated round flow based on company profile</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-[1.125rem] before:h-full before:w-0.5 before:-translate-x-1/2 before:bg-slate-200">
                                {analysis.roundMapping?.map((round, idx) => (
                                    <div key={idx} className="relative flex items-start gap-6 animate-in slide-in-from-left-4 duration-300" style={{ animationDelay: `${idx * 150}ms` }}>
                                        <div className="absolute left-0 mt-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-white border-2 border-primary text-primary shadow-sm z-10 transition-transform hover:scale-110">
                                            <span className="text-xs font-bold">{idx + 1}</span>
                                        </div>
                                        <div className="ml-12 flex-1 space-y-2 pb-8 last:pb-0">
                                            <div className="flex justify-between items-center">
                                                <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors underline decoration-primary/20 decoration-2 underline-offset-4">{round.roundTitle}</h4>
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {round.focusAreas.map(f => (
                                                    <span key={f} className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md uppercase tracking-tighter">{f}</span>
                                                ))}
                                            </div>
                                            <div className="bg-primary/5 p-3 rounded-xl border border-primary/10 flex items-start gap-3">
                                                <HelpCircle size={14} className="text-primary mt-0.5 shrink-0" />
                                                <div className="space-y-1">
                                                    <p className="text-[10px] font-bold text-primary uppercase tracking-tighter">Why this round matters</p>
                                                    <p className="text-xs text-slate-500 italic leading-tight">{round.whyItMatters}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <CalendarDays className="text-primary" />
                                    7-Day Preparation Plan
                                </CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.plan7Days.map(p => `${p.day} (${p.focus}): ${p.tasks.join(', ')}`).join('\n'), "Plan")}
                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {analysis.plan7Days.map((p) => (
                                <div key={p.day} className="flex gap-4 p-4 rounded-xl border border-slate-50 hover:bg-slate-50/50 transition-colors">
                                    <div className="min-w-[100px]">
                                        <div className="font-bold text-primary">{p.day}</div>
                                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">{p.focus}</div>
                                    </div>
                                    <ul className="space-y-1 list-disc list-inside text-slate-600 text-sm">
                                        {p.tasks.map((task, i) => <li key={i}>{task}</li>)}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <ListChecks className="text-primary" />
                                    Round-wise Checklist
                                </CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.checklist.map(r => `${r.roundTitle}:\n${r.items.map(i => `- ${i}`).join('\n')}`).join('\n\n'), "Checklist")}
                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {analysis.checklist.map((round) => (
                                <div key={round.roundTitle} className="space-y-3 p-4 rounded-xl bg-slate-50/50 border border-slate-100">
                                    <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2">{round.roundTitle}</h4>
                                    <ul className="space-y-2">
                                        {round.items.map((item, i) => (
                                            <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                                                <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={14} />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2">
                                    <HelpCircle className="text-primary" />
                                    Top 10 Interview Questions
                                </CardTitle>
                            </div>
                            <button
                                onClick={() => copyToClipboard(analysis.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), "Questions")}
                                className="p-2 text-slate-400 hover:text-primary transition-colors"
                            >
                                <Copy size={18} />
                            </button>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                {analysis.questions.map((q, i) => (
                                    <div key={i} className="group p-4 rounded-xl border border-slate-100 hover:border-primary/20 hover:bg-white hover:shadow-md transition-all">
                                        <p className="text-slate-800 font-medium group-hover:text-primary transition-colors">{q}</p>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Action Next Box */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                <Lightbulb size={32} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Recommended Next Action</h3>
                                {weakSkills.length > 0 ? (
                                    <p className="text-slate-600">
                                        Focus on these weak areas: <span className="font-bold text-primary">{weakSkills.join(', ')}</span>.
                                    </p>
                                ) : (
                                    <p className="text-slate-600">You're in great shape! Ready to dominate the interview.</p>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-4 shrink-0">
                            <div className="hidden md:block h-12 w-px bg-primary/20"></div>
                            <div className="text-center md:text-right">
                                <p className="text-sm font-bold text-primary">Start Day 1 plan now.</p>
                                <p className="text-xs text-slate-500 font-medium whitespace-nowrap">Consistency is your best friend.</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export const AnalysisHistory = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    return (
        <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analysis History</h1>
                    <p className="text-slate-500">Review your past job description analyses.</p>
                </div>
                <button
                    onClick={() => navigate('/dashboard/assessments')}
                    className="bg-primary text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center gap-2"
                >
                    <PlusCircle size={20} />
                    Analyze New JD
                </button>
            </div>

            {history.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {history.map((item) => (
                        <Card
                            key={item.id}
                            className="group hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                            onClick={() => navigate('/dashboard/results', { state: { analysis: item } })}
                        >
                            <div className="flex flex-col md:flex-row items-center p-6 gap-6">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                                        {item.finalScore || item.baseScore}%
                                    </div>
                                </div>
                                <div className="flex-grow text-center md:text-left">
                                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary transition-colors">{item.role}</h3>
                                    <p className="text-slate-500 font-medium">{item.company}</p>
                                    <p className="text-xs text-slate-400 mt-1">Analyzed on {new Date(item.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex flex-wrap justify-center gap-2 max-w-xs">
                                    {Object.values(item.extractedSkills).flat().slice(0, 4).map(s => (
                                        <span key={s} className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {s}
                                        </span>
                                    ))}
                                    {Object.values(item.extractedSkills).flat().length > 4 && (
                                        <span className="text-slate-400 text-[10px] font-bold pt-0.5">+{Object.values(item.extractedSkills).flat().length - 4} more</span>
                                    )}
                                </div>
                                <div className="flex-shrink-0">
                                    <ArrowRight className="text-slate-300 group-hover:text-primary transition-colors" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-200 border-dashed py-20 rounded-2xl flex flex-col items-center justify-center text-center px-4">
                    <div className="p-4 bg-slate-50 rounded-full mb-4">
                        <Search className="text-slate-300" size={48} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No Analysis History</h3>
                    <p className="text-slate-500 max-w-xs mt-2">Start by analyzing your first job description to track your readiness.</p>
                    <button
                        onClick={() => navigate('/dashboard/assessments')}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Go to Analysis Form
                    </button>
                </div>
            )}
        </div>
    );
};

export const Resources = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Resources</h1>
        <p className="text-slate-600">Guides, cheat sheets, and preparation material.</p>
    </div>
);

export const Profile = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <p className="text-slate-600">Manage your account and view your achievements.</p>
    </div>
);

export const TestChecklist = () => {
    const [tests, setTests] = useState(() => {
        const saved = localStorage.getItem('prp_test_checklist');
        return saved ? JSON.parse(saved) : Array(10).fill(false);
    });

    const checklistItems = [
        { label: "JD required validation works", hint: "Try submitting empty JD in Analysis form." },
        { label: "Short JD warning shows for <200 chars", hint: "Type few characters in JD field and look for amber box." },
        { label: "Skills extraction groups correctly", hint: "Use sample JD with Java, React, SQL and check Results map." },
        { label: "Round mapping changes based on company + skills", hint: "Compare results for 'Google' vs 'Small Startup' names." },
        { label: "Score calculation is deterministic", hint: "Check if same JD always gives the same Base Score." },
        { label: "Skill toggles update score live", hint: "Click several skills in Results and watch 'Adjusted Score'." },
        { label: "Changes persist after refresh", hint: "Toggle skills, refresh browser, and check if toggles stay." },
        { label: "History saves and loads correctly", hint: "Complete analysis, go to History, then click the card to return." },
        { label: "Export buttons copy the correct content", hint: "Click Copy on Plan/Checklist and paste into Notepad." },
        { label: "No console errors on core pages", hint: "Right-click -> Inspect -> Console. Should be clean." }
    ];

    const toggleTest = (index) => {
        const newTests = [...tests];
        newTests[index] = !newTests[index];
        setTests(newTests);
        localStorage.setItem('prp_test_checklist', JSON.stringify(newTests));
    };

    const resetChecklist = () => {
        if (confirm("Reset all test progress?")) {
            const cleared = Array(10).fill(false);
            setTests(cleared);
            localStorage.setItem('prp_test_checklist', JSON.stringify(cleared));
        }
    };

    const passedCount = tests.filter(Boolean).length;

    return (
        <div className="p-8 max-w-3xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Test Checklist</h1>
                    <p className="text-slate-500">Verify all core features before deployment.</p>
                </div>
                <button
                    onClick={resetChecklist}
                    className="flex items-center gap-2 text-slate-400 hover:text-red-500 transition-colors text-sm font-semibold"
                >
                    <RotateCcw size={16} />
                    Reset checklist
                </button>
            </div>

            <Card className={cn(
                "border-2 transition-all",
                passedCount === 10 ? "border-green-200 bg-green-50/30" : "border-slate-200"
            )}>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="text-xl">Tests Passed: {passedCount} / 10</CardTitle>
                        {passedCount < 10 ? (
                            <p className="text-amber-600 text-sm font-medium mt-1 flex items-center gap-1">
                                <Info size={14} /> Fix issues before shipping.
                            </p>
                        ) : (
                            <p className="text-green-600 text-sm font-medium mt-1 flex items-center gap-1">
                                <ShieldCheck size={14} /> System ready for deployment.
                            </p>
                        )}
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                            className={cn(
                                "h-full transition-all duration-500 ease-out",
                                passedCount === 10 ? "bg-green-500" : "bg-primary"
                            )}
                            style={{ width: `${passedCount * 10}%` }}
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
                {checklistItems.map((item, idx) => (
                    <div
                        key={idx}
                        onClick={() => toggleTest(idx)}
                        className={cn(
                            "flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                            tests[idx]
                                ? "bg-white border-green-200 shadow-sm"
                                : "bg-white border-slate-100 hover:border-primary/20"
                        )}
                    >
                        <div className={cn(
                            "mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors",
                            tests[idx] ? "bg-green-500 border-green-500 text-white" : "border-slate-200"
                        )}>
                            {tests[idx] && <CheckCircle2 size={16} />}
                        </div>
                        <div className="flex-grow">
                            <p className={cn(
                                "font-semibold transition-colors",
                                tests[idx] ? "text-slate-900" : "text-slate-600"
                            )}>{item.label}</p>
                            <p className="text-xs text-slate-400 mt-0.5">How to test: {item.hint}</p>
                        </div>
                    </div>
                ))}
            </div>

            {passedCount === 10 && (
                <button
                    onClick={() => navigate('/dashboard/08-ship')}
                    className="w-full bg-green-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-200 animate-in zoom-in-95 duration-300"
                >
                    <Unlock size={20} />
                    Proceed to Ship
                </button>
            )}
        </div>
    );
};

export const ShipPage = () => {
    const navigate = useNavigate();
    const [isLocked, setIsLocked] = useState(true);

    useEffect(() => {
        const savedChecklist = localStorage.getItem('prp_test_checklist');
        const savedLinks = localStorage.getItem('prp_final_submission');

        let testsOk = false;
        let linksOk = false;

        if (savedChecklist) {
            const tests = JSON.parse(savedChecklist);
            testsOk = tests.filter(Boolean).length === 10;
        }

        if (savedLinks) {
            const links = JSON.parse(savedLinks);
            linksOk = links.lovable && links.github && links.deployed;
        }

        if (testsOk && linksOk) {
            setIsLocked(false);
        }
    }, []);

    if (isLocked) {
        return (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-8 text-center animate-in fade-in duration-500">
                <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-red-50">
                    <Lock size={48} />
                </div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Ship Lock Active</h1>
                <p className="text-slate-500 max-w-md mb-8">
                    Deployment is restricted until all 10 tests in the checklist are passed.
                    Please verify your implementation thoroughly.
                </p>
                <button
                    onClick={() => navigate('/dashboard/07-test')}
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    Return to Checklist
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] p-8 text-center animate-in zoom-in-95 duration-500">
            {isLocked ? (
                <>
                    <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-slate-50">
                        <Lock size={48} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Shipment Locked</h1>
                    <p className="text-slate-500 max-w-md mb-8">
                        The final shipment gate is locked. You must complete the Test Checklist and provide all Proof links before proceeding.
                    </p>
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/dashboard/07-test')}
                            className="bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl font-semibold hover:bg-slate-50 transition-all"
                        >
                            Return to Checklist
                        </button>
                        <button
                            onClick={() => navigate('/dashboard/proof')}
                            className="bg-primary text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
                        >
                            View Proof Details
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-50 animate-bounce">
                        <ShieldCheck size={48} />
                    </div>
                    <div className="mb-4">
                        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-green-200">
                            Status: Shipped
                        </span>
                    </div>
                    <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Ready for Production</h1>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm max-w-lg mb-8 text-left space-y-4">
                        <p className="text-slate-600 leading-relaxed font-medium">
                            "You built a real product.<br />
                            Not a tutorial. Not a clone.<br />
                            A structured tool that solves a real problem."
                        </p>
                        <p className="text-primary font-bold border-t border-slate-50 pt-4">This is your proof of work.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg mb-8 text-left">
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Gate Check</p>
                            <p className="text-sm font-bold text-slate-700">100% Verified</p>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Package</p>
                            <p className="text-sm font-bold text-slate-700">v1.2.5-final</p>
                        </div>
                    </div>
                    <button
                        className="bg-green-600 text-white px-12 py-4 rounded-2xl font-bold text-xl hover:bg-green-700 shadow-2xl shadow-green-200 transition-all transform hover:scale-105 active:scale-95"
                        onClick={() => alert("Deployment successful! 🚀")}
                    >
                        Deploy to Production
                    </button>
                </>
            )}
        </div>
    );
};

export const ProofPage = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('prp_final_submission');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deployed: '' };
    });
    const [errors, setErrors] = useState({});

    const steps = [
        { id: 1, name: "Project Initialization", status: "Completed" },
        { id: 2, name: "Landing Page", status: "Completed" },
        { id: 3, name: "Dashboard UI", status: "Completed" },
        { id: 4, name: "Analysis Logic", status: "Completed" },
        { id: 5, name: "Interactive Features", status: "Completed" },
        { id: 6, name: "Company Intel", status: "Completed" },
        { id: 7, name: "Hardening", status: "Completed" },
        {
            id: 8,
            name: "Test Checklist",
            status: (() => {
                const saved = localStorage.getItem('prp_test_checklist');
                if (!saved) return "Pending";
                const tests = JSON.parse(saved);
                return tests.filter(Boolean).length === 10 ? "Completed" : "Pending";
            })()
        }
    ];

    const validateUrl = (url) => {
        try {
            const parsed = new URL(url);
            return ['http:', 'https:'].includes(parsed.protocol);
        } catch {
            return false;
        }
    };

    const handleLinkChange = (key, value) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));

        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [key]: 'Invalid URL' }));
        } else {
            setErrors(prev => {
                const newErr = { ...prev };
                delete newErr[key];
                return newErr;
            });
        }
    };

    const copyFinalSubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable || 'N/A'}
GitHub Repository: ${links.github || 'N/A'}
Live Deployment: ${links.deployed || 'N/A'}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;
        navigator.clipboard.writeText(text);
        alert("Formatted submission copied to clipboard!");
    };

    const isAllLinksProvided = links.lovable && links.github && links.deployed && Object.keys(errors).length === 0;

    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Proof of Work</h1>
                    <p className="text-slate-500">Finalize your artifact links and verify completion.</p>
                </div>
                <button
                    onClick={copyFinalSubmission}
                    disabled={!isAllLinksProvided}
                    className={cn(
                        "flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all",
                        isAllLinksProvided
                            ? "bg-primary text-white hover:shadow-lg"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                    )}
                >
                    <Copy size={20} />
                    Copy Final Submission
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Step Completion */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <PackageCheck className="text-primary" />
                                Completion Overview
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {steps.map(step => (
                                <div key={step.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-100 text-sm">
                                    <span className="text-slate-600 font-medium">{step.id}. {step.name}</span>
                                    <span className={cn(
                                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                                        step.status === "Completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                                    )}>
                                        {step.status}
                                    </span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Artifact Links */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Link className="text-primary" />
                                Artifact Links
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <ExternalLink size={14} /> Lovable Project Link
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://lovable.dev/projects/..."
                                    className={cn(
                                        "w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm",
                                        errors.lovable ? "border-red-300 bg-red-50" : "border-slate-200"
                                    )}
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                />
                                {errors.lovable && <p className="text-[10px] text-red-500 font-bold">{errors.lovable}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Github size={14} /> GitHub Repository
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://github.com/..."
                                    className={cn(
                                        "w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm",
                                        errors.github ? "border-red-300 bg-red-50" : "border-slate-200"
                                    )}
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                />
                                {errors.github && <p className="text-[10px] text-red-500 font-bold">{errors.github}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                                    <Link size={14} /> Deployed URL
                                </label>
                                <input
                                    type="text"
                                    placeholder="https://..."
                                    className={cn(
                                        "w-full p-3 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm",
                                        errors.deployed ? "border-red-300 bg-red-50" : "border-slate-200"
                                    )}
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange('deployed', e.target.value)}
                                />
                                {errors.deployed && <p className="text-[10px] text-red-500 font-bold">{errors.deployed}</p>}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Shipped Status Guard Info */}
                    <div className={cn(
                        "p-4 rounded-2xl border flex items-start gap-4 transition-all duration-500",
                        isAllLinksProvided
                            ? "bg-green-50 border-green-200"
                            : "bg-amber-50 border-amber-200"
                    )}>
                        <div className={cn("p-2 rounded-lg", isAllLinksProvided ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700")}>
                            {isAllLinksProvided ? <Unlock size={20} /> : <AlertCircle size={20} />}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">Shipment Status Gate</p>
                            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
                                Provide all three valid links and complete the 10-step checklist to unlock the final "Shipped" status badge.
                            </p>
                            {isAllLinksProvided && (
                                <button
                                    onClick={() => navigate('/dashboard/08-ship')}
                                    className="mt-3 text-xs font-bold text-green-700 hover:underline flex items-center gap-1"
                                >
                                    Go to Ship Page <ArrowRight size={12} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
