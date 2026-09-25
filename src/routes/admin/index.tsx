import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useAuth } from '@/lib/authStore';

export const Route = createFileRoute('/admin/')({
  component: AdminIndexRedirect,
});

function AdminIndexRedirect() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate({ to: '/admin/dashboard' });
    } else {
      navigate({ to: '/admin/login' });
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#090d16', color: '#ffffff' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '15px', color: '#94a3b8' }}>Redirecting to GUIITAR Admin Console...</p>
      </div>
    </div>
  );
}
