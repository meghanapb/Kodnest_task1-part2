import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3 } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
            <Icon size={24} />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-slate-600">{description}</p>
    </div>
);

const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section className="py-20 px-4 flex-grow flex flex-col items-center justify-center text-center bg-gradient-to-b from-white to-slate-50">
                <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                    Ace Your <span className="text-primary">Placement</span>
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <button
                    onClick={() => navigate('/dashboard')}
                    className="bg-primary text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-opacity-90 transition-all shadow-lg hover:shadow-primary/20"
                >
                    Get Started
                </button>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Code}
                            title="Practice Problems"
                            description="Solve 500+ coding challenges from top tech companies."
                        />
                        <FeatureCard
                            icon={Video}
                            title="Mock Interviews"
                            description="Real-time simulated interviews with AI and experts."
                        />
                        <FeatureCard
                            icon={BarChart3}
                            title="Track Progress"
                            description="Monitor your growth and identify areas for improvement."
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-slate-200 text-center text-slate-500">
                <p>© {new Date().getFullYear()} Placement Readiness Platform. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
