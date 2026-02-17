import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Code, ClipboardList, Briefcase, User, GraduationCap } from 'lucide-react';

const SidebarLink = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        end={to === '/dashboard'}
        className={({ isActive }) => `
      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
      ${isActive
                ? 'bg-primary text-white shadow-md shadow-primary/20'
                : 'text-slate-600 hover:bg-slate-100'}
    `}
    >
        <Icon size={20} />
        <span className="font-medium">{children}</span>
    </NavLink>
);

const DashboardLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                        <GraduationCap size={24} />
                    </div>
                    <span className="text-xl font-bold text-slate-900 leading-tight">
                        Prep <span className="text-primary">Pro</span>
                    </span>
                </div>

                <nav className="flex-grow px-4 space-y-2 py-4">
                    <SidebarLink to="/dashboard" icon={LayoutDashboard}>Dashboard</SidebarLink>
                    <SidebarLink to="/dashboard/practice" icon={Code}>Practice</SidebarLink>
                    <SidebarLink to="/dashboard/assessments" icon={ClipboardList}>Assessments</SidebarLink>
                    <SidebarLink to="/dashboard/resources" icon={Briefcase}>Resources</SidebarLink>
                    <SidebarLink to="/dashboard/profile" icon={User}>Profile</SidebarLink>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                            JD
                        </div>
                        <div className="flex-grow">
                            <p className="text-sm font-semibold text-slate-900">John Doe</p>
                            <p className="text-xs text-slate-500">Student</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex-grow flex flex-col h-full overflow-hidden">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <h2 className="text-lg font-bold text-slate-800">Placement Prep</h2>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 overflow-hidden">
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=John"
                                alt="User Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <main className="flex-grow overflow-y-auto bg-slate-50/50">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
