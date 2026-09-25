import { createFileRoute, useNavigate, Link } from '@tanstack/react-router';
import { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Link as LinkIcon,
  Shield,
  Eye,
  Save,
  Send,
  X,
  Plus,
  Trash2,
} from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { AdminDataStore, type InnovationStage, type CreatorType, type IdeaStatus } from '@/lib/adminStore';

export const Route = createFileRoute('/admin/ideas/new')({
  head: () => ({
    meta: [{ title: 'Add Innovation — GUIITAR Admin Console' }],
  }),
  component: AddIdeaPage,
});

const steps = [
  'Basic Info',
  'Creator',
  'Innovation Details',
  'Media & Links',
  'Impact & SDGs',
  'Support Required',
  'Publication',
];

export function AddIdeaPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    detailedDescription: '',
    category: 'Biotech',
    subcategory: '',
    technology: '',
    stage: 'Prototype' as InnovationStage,
    creatorType: 'Student' as CreatorType,
    creatorName: '',
    creatorEmail: '',
    creatorPhone: '',
    department: '',
    university: 'GSFC University, Vadodara',
    teamMembers: [''],
    problemStatement: '',
    proposedSolution: '',
    innovationUsp: '',
    technologyUsed: '',
    targetUsers: '',
    industry: '',
    thrustArea: 'Biotechnology & Life Sciences',
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=80',
    galleryImages: [] as string[],
    videoUrl: '',
    demoUrl: '',
    githubUrl: '',
    websiteUrl: '',
    expectedImpact: '',
    socialImpact: '',
    environmentalImpact: '',
    economicImpact: '',
    sdgAlignment: [] as string[],
    supportRequired: ['Mentorship', 'Funding', 'Lab Access'],
    visibility: 'Public' as 'Draft' | 'Private' | 'Public',
    status: 'Published' as IdeaStatus,
    isFeatured: true,
  });

  const categories = [
    'AI',
    'Robotics',
    'IoT',
    'Biotech',
    'CleanTech',
    'Healthcare',
    'Energy',
    'Cyber Security',
    'ICT',
    'Manufacturing',
    'Agriculture',
    'Water',
  ];

  const thrustAreas = [
    'Agriculture & Allied Fields',
    'Artificial Intelligence & Robotics',
    'Biotechnology & Life Sciences',
    'Clean-Tech & Circular Economy',
    'Cyber Security & Network Defense',
    'Renewable Energy & Power Systems',
    'Environmental Engineering Solutions',
    'Healthcare & Biomedical Devices',
    'Information & Communication Tech (ICT)',
    'Internet of Things (IoT) & Embedded',
    'Advanced Manufacturing & Materials',
    'Deep-Tech Services & Automation',
    'Water & Wastewater Treatment Tech',
  ];

  const sdgOptions = [
    'SDG 2: Zero Hunger',
    'SDG 3: Good Health & Well-being',
    'SDG 6: Clean Water & Sanitation',
    'SDG 7: Affordable & Clean Energy',
    'SDG 8: Decent Work & Economic Growth',
    'SDG 9: Industry, Innovation & Infrastructure',
    'SDG 11: Sustainable Cities & Communities',
    'SDG 12: Responsible Consumption & Production',
    'SDG 13: Climate Action',
  ];

  const supportOptions = [
    'Mentorship',
    'Funding / SSIP 2.0 Grant',
    'Prototype Development',
    'IPR & Patent Filing',
    'Lab & Supercomputer Access',
    'Industry Connection (GSFC Ltd)',
    'Market Access & Demo Days',
    'Co-Working Desk Space',
  ];

  const handleAddTeamMember = () => {
    setFormData({ ...formData, teamMembers: [...formData.teamMembers, ''] });
  };

  const handleUpdateTeamMember = (index: number, val: string) => {
    const updated = [...formData.teamMembers];
    updated[index] = val;
    setFormData({ ...formData, teamMembers: updated });
  };

  const handleRemoveTeamMember = (index: number) => {
    const updated = formData.teamMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, teamMembers: updated });
  };

  const toggleSdg = (sdg: string) => {
    setFormData((prev) => ({
      ...prev,
      sdgAlignment: prev.sdgAlignment.includes(sdg)
        ? prev.sdgAlignment.filter((s) => s !== sdg)
        : [...prev.sdgAlignment, sdg],
    }));
  };

  const toggleSupport = (sup: string) => {
    setFormData((prev) => ({
      ...prev,
      supportRequired: prev.supportRequired.includes(sup)
        ? prev.supportRequired.filter((s) => s !== sup)
        : [...prev.supportRequired, sup],
    }));
  };

  const handleSave = (finalStatus: IdeaStatus) => {
    const saved = AdminDataStore.saveIdea({
      ...formData,
      status: finalStatus,
      teamMembers: formData.teamMembers.filter((t) => t.trim().length > 0),
    });
    setShowPublishModal(false);
    navigate({ to: `/admin/ideas/${saved.id}` });
  };

  return (
    <AdminLayout
      title="Add Innovation"
      subtitle="Publish an innovation or student project to the GUIITAR Innovation Showcase."
      breadcrumbs={[
        { label: 'Admin', href: '/admin/dashboard' },
        { label: 'Ideas', href: '/admin/ideas' },
        { label: 'Add Innovation' },
      ]}
      actions={
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowPreviewModal(true)}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Eye className="w-4 h-4" />
            <span>Preview Public Page</span>
          </button>
          <button
            onClick={() => handleSave('Draft')}
            className="btn btn-outline btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>
          <button
            onClick={() => setShowPublishModal(true)}
            className="btn btn-primary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <Send className="w-4 h-4" />
            <span>Publish Innovation</span>
          </button>
        </div>
      }
    >
      {/* 7-STEP PROGRESS STEPPER */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
          gap: '8px',
          marginBottom: '32px',
        }}
        className="form-stepper-bar"
      >
        {steps.map((s, i) => {
          const isActive = currentStep === i;
          const isDone = currentStep > i;
          return (
            <button
              key={s}
              onClick={() => setCurrentStep(i)}
              style={{
                background: isActive ? '#2563eb' : isDone ? '#f0fdf4' : '#ffffff',
                color: isActive ? '#ffffff' : isDone ? '#059669' : '#64748b',
                border: `1px solid ${isActive ? '#2563eb' : isDone ? '#bbf7d0' : '#e2e8f0'}`,
                borderRadius: '8px',
                padding: '10px 8px',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 700,
                transition: 'all 0.2s',
              }}
            >
              <span>0{i + 1}. {s}</span>
            </button>
          );
        })}
      </div>

      {/* MULTI-STEP FORM CARD */}
      <div className="plain-card" style={{ padding: '36px', maxWidth: '960px', margin: '0 auto' }}>
        {/* STEP 1: BASIC INFORMATION */}
        {currentStep === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 1 — Basic Information
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Provide the high-level identity, domain classification, and maturity stage of the innovation.
            </p>

            <label className="field">
              <span>Idea Title *</span>
              <input
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Autonomous Drone Surveillance System for Industrial Leakages"
              />
            </label>

            <label className="field">
              <span>Short Tagline / Abstract * (1-2 sentences)</span>
              <input
                required
                value={formData.shortDescription}
                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                placeholder="e.g. Thermal edge computer vision drone providing autonomous facility pipeline safety inspection."
              />
            </label>

            <label className="field">
              <span>Detailed Project Description *</span>
              <textarea
                required
                rows={4}
                value={formData.detailedDescription}
                onChange={(e) => setFormData({ ...formData, detailedDescription: e.target.value })}
                placeholder="Elaborate on the scientific principle, fabrication methods, test benchmarks, and operational workflow..."
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Category *</span>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Core Technology *</span>
                <input
                  value={formData.technology}
                  onChange={(e) => setFormData({ ...formData, technology: e.target.value })}
                  placeholder="e.g. ArduPilot, Computer Vision"
                />
              </label>

              <label className="field">
                <span>Innovation Stage *</span>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value as InnovationStage })}
                >
                  {(['Idea', 'Research', 'Prototype', 'MVP', 'Pilot', 'Startup', 'Scale'] as InnovationStage[]).map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {/* STEP 2: CREATOR */}
        {currentStep === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 2 — Creator & Department
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Identify the primary inventor, institutional affiliation, and team members.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Creator Type *</span>
                <select
                  value={formData.creatorType}
                  onChange={(e) => setFormData({ ...formData, creatorType: e.target.value as CreatorType })}
                >
                  {(['Student', 'Faculty', 'Researcher', 'Startup', 'Alumni', 'External Innovator'] as CreatorType[]).map((ct) => (
                    <option key={ct} value={ct}>{ct}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Lead Creator Name *</span>
                <input
                  required
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  placeholder="e.g. Yashwardhan Rana"
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Email Address</span>
                <input
                  type="email"
                  value={formData.creatorEmail}
                  onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                  placeholder="yash@gsfcuniversity.ac.in"
                />
              </label>

              <label className="field">
                <span>Phone Number</span>
                <input
                  type="tel"
                  value={formData.creatorPhone}
                  onChange={(e) => setFormData({ ...formData, creatorPhone: e.target.value })}
                  placeholder="+91 98765 43210"
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Department / School</span>
                <input
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="e.g. Mechanical Engineering / School of Technology"
                />
              </label>

              <label className="field">
                <span>University / Institute</span>
                <input
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  placeholder="GSFC University, Vadodara"
                />
              </label>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#334155' }}>Team Members</span>
                <button
                  type="button"
                  onClick={handleAddTeamMember}
                  className="btn btn-outline btn-sm"
                  style={{ height: '28px', padding: '0 8px', fontSize: '12px' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Member</span>
                </button>
              </div>

              {formData.teamMembers.map((member, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    value={member}
                    onChange={(e) => handleUpdateTeamMember(i, e.target.value)}
                    placeholder={`Team Member #${i + 1} (Name & Role)`}
                    style={{ flexGrow: 1, padding: '10px 12px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
                  />
                  {formData.teamMembers.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTeamMember(i)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '8px' }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: INNOVATION DETAILS */}
        {currentStep === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 3 — Problem, Solution & USPs
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Clearly articulate the value proposition, competitive novelty, and industry relevance.
            </p>

            <label className="field">
              <span>Problem Statement *</span>
              <textarea
                required
                rows={3}
                value={formData.problemStatement}
                onChange={(e) => setFormData({ ...formData, problemStatement: e.target.value })}
                placeholder="What critical industry or societal challenge does this project solve?"
              />
            </label>

            <label className="field">
              <span>Proposed Solution *</span>
              <textarea
                required
                rows={3}
                value={formData.proposedSolution}
                onChange={(e) => setFormData({ ...formData, proposedSolution: e.target.value })}
                placeholder="How does your invention technically resolve this problem?"
              />
            </label>

            <label className="field">
              <span>Unique Selling Proposition (USP) / Novelty *</span>
              <textarea
                required
                rows={2}
                value={formData.innovationUsp}
                onChange={(e) => setFormData({ ...formData, innovationUsp: e.target.value })}
                placeholder="What makes this distinct from existing market alternatives or patents?"
              />
            </label>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Thrust Area *</span>
                <select
                  value={formData.thrustArea}
                  onChange={(e) => setFormData({ ...formData, thrustArea: e.target.value })}
                >
                  {thrustAreas.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Target Industry</span>
                <input
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="e.g. Petrochemicals & Industrial Safety"
                />
              </label>
            </div>
          </div>
        )}

        {/* STEP 4: MEDIA & LINKS */}
        {currentStep === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 4 — Media & External Links
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Upload visual assets, prototype demos, video links, or code repositories.
            </p>

            <label className="field">
              <span>Cover Image URL *</span>
              <input
                required
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </label>

            {formData.coverImage && (
              <div style={{ borderRadius: '10px', overflow: 'hidden', maxHeight: '220px', border: '1px solid #e2e8f0' }}>
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  style={{ width: '100%', height: '220px', objectFit: 'cover' }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Demo / Prototype URL</span>
                <input
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  placeholder="https://..."
                />
              </label>

              <label className="field">
                <span>Video Walkthrough URL (YouTube/Vimeo)</span>
                <input
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                />
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>GitHub / Code Repo</span>
                <input
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </label>

              <label className="field">
                <span>Project / Startup Website</span>
                <input
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://..."
                />
              </label>
            </div>
          </div>
        )}

        {/* STEP 5: IMPACT & SDGS */}
        {currentStep === 4 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 5 — Impact & SDG Alignment
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Highlight societal, environmental, and commercial value generated.
            </p>

            <label className="field">
              <span>Overall Expected Impact *</span>
              <textarea
                required
                rows={3}
                value={formData.expectedImpact}
                onChange={(e) => setFormData({ ...formData, expectedImpact: e.target.value })}
                placeholder="What tangible quantitative or qualitative impact does this project achieve?"
              />
            </label>

            <div>
              <span style={{ fontSize: '13.5px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '10px' }}>
                United Nations SDG Alignment:
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                {sdgOptions.map((sdg) => {
                  const isChecked = formData.sdgAlignment.includes(sdg);
                  return (
                    <button
                      type="button"
                      key={sdg}
                      onClick={() => toggleSdg(sdg)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '6px',
                        fontSize: '13px',
                        textAlign: 'left',
                        background: isChecked ? '#eff6ff' : '#f8fafc',
                        border: `1px solid ${isChecked ? '#2563eb' : '#e2e8f0'}`,
                        color: isChecked ? '#1d4ed8' : '#475569',
                        fontWeight: isChecked ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {isChecked ? '✓ ' : '+ '} {sdg}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: SUPPORT REQUIRED */}
        {currentStep === 5 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 6 — Incubation Support Required
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Specify the exact resources and institutional assistance needed from GUIITAR Council.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
              {supportOptions.map((sup) => {
                const isChecked = formData.supportRequired.includes(sup);
                return (
                  <button
                    type="button"
                    key={sup}
                    onClick={() => toggleSupport(sup)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: '8px',
                      fontSize: '13.5px',
                      textAlign: 'left',
                      background: isChecked ? '#ecfdf5' : '#f8fafc',
                      border: `1px solid ${isChecked ? '#059669' : '#e2e8f0'}`,
                      color: isChecked ? '#065f46' : '#334155',
                      fontWeight: isChecked ? 700 : 500,
                      cursor: 'pointer',
                    }}
                  >
                    {isChecked ? '✓ ' : '+ '} {sup}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: PUBLICATION CONTROLS */}
        {currentStep === 6 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 4px', color: '#0f172a' }}>
              Step 7 — Visibility & Publication
            </h3>
            <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
              Set showcase status, public visibility, and featured highlight position.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <label className="field">
                <span>Publication Status *</span>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as IdeaStatus })}
                >
                  <option value="Published">Published (Live on Showcase)</option>
                  <option value="Approved">Approved (Internal Only)</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Draft">Draft</option>
                </select>
              </label>

              <label className="field">
                <span>Featured on Homepage Showcase?</span>
                <select
                  value={formData.isFeatured ? 'yes' : 'no'}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.value === 'yes' })}
                >
                  <option value="yes">Yes — Highlight on Homepage & Top of Showcase</option>
                  <option value="no">No — Standard listing</option>
                </select>
              </label>
            </div>

            <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
              <strong style={{ color: '#1d4ed8', display: 'block', fontSize: '14px', marginBottom: '4px' }}>
                ⚡ Automatic Public Showcase Synchronization
              </strong>
              <p style={{ fontSize: '13px', color: '#1e3a8a', margin: 0 }}>
                When published, this innovation will automatically be indexed on <code>/innovation</code> and available at its dedicated public slug page <code>/innovation/{formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'project-slug'}</code>.
              </p>
            </div>
          </div>
        )}

        {/* STEP NAVIGATION BUTTONS */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <button
            type="button"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
            className="btn btn-outline btn-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          {currentStep < steps.length - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => Math.min(steps.length - 1, s + 1))}
              className="btn btn-primary btn-sm"
            >
              <span>Next: {steps[currentStep + 1]}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setShowPublishModal(true)}
              className="btn btn-primary btn-sm"
              style={{ background: '#059669', borderColor: '#059669' }}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Publish to Showcase</span>
            </button>
          )}
        </div>
      </div>

      {/* CONFIRMATION PUBLISH MODAL */}
      {showPublishModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 100,
            padding: '20px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '480px',
              width: '100%',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 8px', color: '#0f172a' }}>
              Publish this Innovation?
            </h3>
            <p style={{ color: '#475569', fontSize: '14.5px', lineHeight: 1.6, margin: '0 0 24px' }}>
              Once published, <strong>"{formData.title || 'Untitled Innovation'}"</strong> will become immediately visible on the public GUIITAR Innovation Showcase.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => setShowPublishModal(false)}
                className="btn btn-outline btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSave('Published')}
                className="btn btn-primary btn-sm"
                style={{ background: '#059669', borderColor: '#059669' }}
              >
                <span>Publish Innovation</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW PUBLIC PAGE MODAL */}
      {showPreviewModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            display: 'grid',
            placeItems: 'center',
            zIndex: 100,
            padding: '24px',
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '36px',
              maxWidth: '780px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="pill emerald">Live Public Preview</span>
              <button
                onClick={() => setShowPreviewModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {formData.coverImage && (
              <img
                src={formData.coverImage}
                alt="Cover"
                style={{ width: '100%', height: '260px', objectFit: 'cover', borderRadius: '12px', marginBottom: '20px' }}
              />
            )}

            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <span className="pill amber">{formData.category}</span>
              <span className="pill">{formData.stage}</span>
            </div>

            <h2 style={{ fontSize: '26px', fontWeight: 900, margin: '0 0 6px' }}>{formData.title || 'Untitled Project'}</h2>
            <p style={{ color: '#2563eb', fontWeight: 600, fontSize: '15px', margin: '0 0 16px' }}>{formData.shortDescription}</p>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>Problem Statement:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>{formData.problemStatement || 'Not specified'}</p>
            </div>

            <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <strong style={{ display: 'block', fontSize: '13px', color: '#0f172a' }}>Proposed Solution:</strong>
              <p style={{ margin: '4px 0 0', fontSize: '14px', color: '#475569' }}>{formData.proposedSolution || 'Not specified'}</p>
            </div>

            <button
              onClick={() => setShowPreviewModal(false)}
              className="btn btn-outline btn-sm"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
