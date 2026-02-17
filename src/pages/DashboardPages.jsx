import React from 'react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle
} from '../components/ui/Card';
import { Play, Calendar, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';

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
                    <CardContent className="h-[300px] w-full">
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

export const Assessments = () => (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Assessments</h1>
        <p className="text-slate-600">Test your readiness with company-specific mocks.</p>
    </div>
);

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
