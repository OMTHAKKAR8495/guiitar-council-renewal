import { Link, useRouterState, useNavigate } from '@tanstack/react-router';
import { useState, useEffect, type ReactNode } from 'react';
import {
  LayoutDashboard,
  Lightbulb,
  Rocket,
  Calendar,
  Users,
  Briefcase,
  Banknote,
  FileText,
  Handshake,
  Award,
  HelpCircle,
  Inbox,
  UserCheck,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Plus,
  Shield,
  Menu,
  X,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { useAuth } from '@/lib/authStore';
import { AdminDataStore, type AdminNotification } from '@/lib/adminStore';
import { GuiitarEmblem } from '../GuiitarBrand';

export interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

export function AdminLayout({
  children,
  title,
  subtitle,
  actions,
  breadcrumbs = [{ label: 'Admin', href: '/admin/dashboard' }],
}: AdminLayoutProps) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/admin/login' });
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const loadNotifs = () => setNotifications(AdminDataStore.getNotifications());
    loadNotifs();
    window.addEventListener('guiitar_store_update', loadNotifs);
    return () => window.removeEventListener('guiitar_store_update', loadNotifs);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    logout();
    navigate({ to: '/admin/login' });
  };

  const navSections = [
    {
      title: 'CORE',
      items: [
        { label: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
        { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
      ],
    },
    {
      title: 'INNOVATION ENGINE',
      items: [
        { label: 'Ideas & Projects', icon: Lightbulb, href: '/admin/ideas', badge: 'Active' },
        { label: 'Startups & Ventures', icon: Rocket, href: '/admin/startups' },
        { label: 'Applications Queue', icon: Inbox, href: '/admin/applications', badge: '3 New' },
      ],
    },
    {
      title: 'ECOSYSTEM & OPS',
      items: [
        { label: 'Events & Workshops', icon: Calendar, href: '/admin/events' },
        { label: 'Mentor Advisory', icon: Users, href: '/admin/mentors' },
        { label: 'Programs & Cohorts', icon: Briefcase, href: '/admin/programs' },
        { label: 'Funding & Grants', icon: Banknote, href: '/admin/funding' },
        { label: 'Partners & MOUs', icon: Handshake, href: '/admin/partners' },
        { label: 'Resource Library', icon: FileText, href: '/admin/resources' },
        { label: 'Success Stories', icon: Award, href: '/admin/startups' },
        { label: 'Help Center & FAQs', icon: HelpCircle, href: '/admin/faqs' },
      ],
    },
    {
      title: 'GOVERNANCE & SYSTEM',
      items: [
        { label: 'User & Role Access', icon: UserCheck, href: '/admin/users' },
        { label: 'Audit Log', icon: Shield, href: '/admin/audit-log' },
        { label: 'Platform Settings', icon: Settings, href: '/admin/settings' },
      ],
    },
  ];

  if (!isAuthenticated || !user) {
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#090d16', color: '#ffffff' }}>
        <div style={{ textAlign: 'center' }}>
          <div className="pulse-dot" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontSize: '15px', color: '#94a3b8' }}>Authenticating administrative session...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#f8fafc',
        color: '#0f172a',
        fontFamily: 'var(--font-sans)',
      }}
    >
      {/* SIDEBAR */}
      <aside
        style={{
          width: sidebarCollapsed ? '80px' : '280px',
          background: '#090d16',
          color: '#cbd5e1',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 50,
          flexShrink: 0,
        }}
        className="admin-sidebar"
      >
        {/* Sidebar Header Brand */}
        <div
          style={{
            height: '68px',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          <Link
            to="/admin/dashboard"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textDecoration: 'none',
              color: '#ffffff',
            }}
          >
            <GuiitarEmblem className="w-8 h-8 flex-none" />
            {!sidebarCollapsed && (
              <div style={{ lineHeight: 1.1 }}>
                <strong style={{ fontSize: '16px', fontFamily: 'var(--font-heading)', letterSpacing: '0.04em' }}>
                  GUIITAR
                </strong>
                <span style={{ fontSize: '10px', display: 'block', color: '#38bdf8', fontWeight: 800, letterSpacing: '0.2em' }}>
                  ADMIN PLATFORM
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Sidebar Navigation Items */}
        <div style={{ flexGrow: 1, overflowY: 'auto', padding: '16px 12px' }}>
          {navSections.map((sec) => (
            <div key={sec.title} style={{ marginBottom: '20px' }}>
              {!sidebarCollapsed && (
                <div
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    color: '#64748b',
                    letterSpacing: '0.06em',
                    padding: '0 12px',
                    marginBottom: '6px',
                  }}
                >
                  {sec.title}
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                {sec.items.map((item) => {
                  const isActive = path === item.href || (item.href !== '/admin/dashboard' && path.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        fontSize: '13.5px',
                        fontWeight: isActive ? 700 : 500,
                        color: isActive ? '#ffffff' : '#94a3b8',
                        background: isActive ? '#2563eb' : 'transparent',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <item.icon className="w-4 h-4 flex-none" style={{ color: isActive ? '#ffffff' : '#64748b' }} />
                      {!sidebarCollapsed && <span style={{ flexGrow: 1 }}>{item.label}</span>}
                      {!sidebarCollapsed && item.badge && (
                        <span
                          style={{
                            fontSize: '10px',
                            fontWeight: 800,
                            background: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(37, 99, 235, 0.2)',
                            color: isActive ? '#ffffff' : '#60a5fa',
                            padding: '1px 6px',
                            borderRadius: '4px',
                          }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer User Card */}
        <div
          style={{
            padding: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: '#ffffff',
                  fontWeight: 800,
                  fontSize: '12.5px',
                  display: 'grid',
                  placeItems: 'center',
                }}
              >
                {user.avatar}
              </div>
              {!sidebarCollapsed && (
                <div style={{ overflow: 'hidden' }}>
                  <span style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', display: 'block', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {user.name}
                  </span>
                  <span style={{ fontSize: '11px', color: '#60a5fa', fontWeight: 600 }}>{user.role}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              aria-label="Logout"
              style={{
                background: 'none',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '6px',
              }}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN ADMIN WORKSPACE */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* TOP BAR */}
        <header
          style={{
            height: '68px',
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 40,
          }}
        >
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px' }}>
            {breadcrumbs.map((b, i) => (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                {b.href ? (
                  <Link to={b.href} style={{ color: '#64748b', textDecoration: 'none', fontWeight: 500 }}>
                    {b.label}
                  </Link>
                ) : (
                  <strong style={{ color: '#0f172a', fontWeight: 700 }}>{b.label}</strong>
                )}
              </div>
            ))}
          </div>

          {/* Right Top Bar Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* View Public Portal */}
            <Link
              to="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#475569',
                textDecoration: 'none',
                background: '#f1f5f9',
                padding: '6px 12px',
                borderRadius: '6px',
              }}
            >
              <span>Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            {/* Notification Bell with Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotifOpen(!notifOpen)}
                style={{
                  position: 'relative',
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  display: 'grid',
                  placeItems: 'center',
                  cursor: 'pointer',
                  color: '#334155',
                }}
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '-4px',
                      right: '-4px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: '#ea580c',
                      color: '#ffffff',
                      fontSize: '10.5px',
                      fontWeight: 800,
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown Panel */}
              {notifOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '360px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                    marginTop: '8px',
                    padding: '16px',
                    zIndex: 100,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                    <strong style={{ fontSize: '14px', color: '#0f172a' }}>Admin Notifications</strong>
                    <button
                      onClick={() => AdminDataStore.markAllNotificationsRead()}
                      style={{ background: 'none', border: 'none', color: '#2563eb', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Mark all as read
                    </button>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '280px', overflowY: 'auto' }}>
                    {notifications.map((n) => (
                      <Link
                        key={n.id}
                        to={n.link}
                        onClick={() => {
                          AdminDataStore.markNotificationRead(n.id);
                          setNotifOpen(false);
                        }}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          borderRadius: '8px',
                          background: n.read ? '#ffffff' : '#f0fdf4',
                          border: `1px solid ${n.read ? '#f1f5f9' : '#bbf7d0'}`,
                          textDecoration: 'none',
                        }}
                      >
                        <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>{n.title}</strong>
                        <p style={{ margin: '2px 0 4px', fontSize: '12px', color: '#475569', lineHeight: 1.4 }}>{n.message}</p>
                        <span style={{ fontSize: '10.5px', color: '#94a3b8' }}>{n.timestamp}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Menu Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'none',
                  border: '1px solid #e2e8f0',
                  padding: '4px 10px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: '#2563eb',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: 800,
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  {user.avatar}
                </div>
                <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#0f172a' }}>{user.name}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {profileOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    width: '200px',
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    boxShadow: '0 16px 32px rgba(15, 23, 42, 0.1)',
                    marginTop: '8px',
                    padding: '8px',
                    zIndex: 100,
                  }}
                >
                  <Link
                    to="/admin/settings"
                    onClick={() => setProfileOpen(false)}
                    style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#334155', textDecoration: 'none', borderRadius: '6px' }}
                  >
                    Account Settings
                  </Link>
                  <Link
                    to="/admin/audit-log"
                    onClick={() => setProfileOpen(false)}
                    style={{ display: 'block', padding: '8px 12px', fontSize: '13px', color: '#334155', textDecoration: 'none', borderRadius: '6px' }}
                  >
                    My Activity Log
                  </Link>
                  <div style={{ borderTop: '1px solid #f1f5f9', margin: '4px 0' }} />
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '8px 12px',
                      fontSize: '13px',
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: 600,
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* WORKSPACE HEADER */}
        <div
          style={{
            background: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '24px 32px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <h1 style={{ fontSize: '26px', fontWeight: 800, margin: 0, color: '#0f172a', letterSpacing: '-0.02em' }}>
              {title}
            </h1>
            {subtitle && <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0' }}>{subtitle}</p>}
          </div>

          {actions && <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>{actions}</div>}
        </div>

        {/* WORKSPACE MAIN BODY */}
        <main style={{ padding: '32px', flexGrow: 1 }}>{children}</main>
      </div>
    </div>
  );
}
