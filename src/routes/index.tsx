import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { ArrowUpRight, ArrowUp, Download, Menu, X, FileText, Award, Sparkles, ArrowRight, ChevronDown, Mail, Phone, MapPin, Linkedin, Github, Briefcase, GraduationCap, Send, Printer, Eye, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { profile, courses, projects, documents, completionDate, canDownloadDocument, contactMailto, type PortfolioDocument } from "@/lib/portfolio-data";
import network from "@/assets/ai-network.jpg";
import portfolioImage from "@/assets/project-portfolio.jpg";
import aiImage from "@/assets/project-ai.jpg";
import ictImage from "@/assets/project-ict.jpg";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Phumlani Khensani Nkuna | ICT, Technology & AI Portfolio" },
    { name: "description", content: "Explore Phumlani Khensani Nkuna's professional portfolio, ICT and Information Technology profile, Google AI Essentials learning, projects, certifications and CV." },
    { property: "og:title", content: "Phumlani Khensani Nkuna | Professional Portfolio" },
    { property: "og:description", content: "ICT, technology, Artificial Intelligence and continuous learning. Discover Phumlani's professional profile and Google AI development." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

const navigation = ["Home", "About", "Experience", "Education", "Skills", "Projects", "AI", "Certifications", "CV", "Documents", "Contact"];
const projectImages = [portfolioImage, aiImage, ictImage];
const projectFields = ["Problem", "Solution", "Technologies / tools", "Skills demonstrated", "Outcome", "Project link"];

function SectionHeading({ label, title, description, center = false }: { label: string; title: string; description?: string; center?: boolean }) {
  return <div className={`section-heading${center ? " center" : ""}`}><p className="eyebrow">{label}</p><h2 className="section-title">{title}</h2>{description && <p className="section-intro">{description}</p>}</div>;
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedDocument, setSelectedDocument] = useState<PortfolioDocument | null>(null);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState("");
  const [showTop, setShowTop] = useState(false);
  const cv = documents.find(document => document.kind === "cv");
  const featured = documents.find(document => document.name === "Google AI Essentials");

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: "-15% 0px -65% 0px" });
    document.querySelectorAll("main section[id]").forEach(section => observer.observe(section));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const href = contactMailto(profile.email, String(data.get("name") || ""), String(data.get("email") || ""), String(data.get("subject") || ""), String(data.get("message") || ""));
    if (!href) { setFormStatus("Message not sent. Phumlani's contact email is awaiting the supplied CV."); return; }
    window.location.href = href;
    setFormStatus("Your email app has been opened. Review and send your message there.");
  }

  function DownloadAction({ document, label = "Download", header = false }: { document?: PortfolioDocument; label?: string; header?: boolean }) {
    if (document && canDownloadDocument(document)) return <Button variant="portfolio" className={header ? "header-download" : ""} asChild><a href={document.url} download={document.filename}><Download size={15} />{label}</a></Button>;
    return <Button variant={header ? "portfolio" : "glass"} className={header ? "header-download" : ""} disabled title="Awaiting the supplied document"><Download size={15} />{label}</Button>;
  }

  function ViewAction({ document, label = "View Certificate" }: { document: PortfolioDocument; label?: string }) {
    return <Button variant="glass" onClick={() => setSelectedDocument(document)}><Eye size={15} />{label}</Button>;
  }

  const currentProject = selectedProject === null ? null : projects[selectedProject];

  return <div className="portfolio-shell">
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <header className="site-header">
      <div className="container header-main">
        <a href="#home" className="brand" aria-label="Phumlani Khensani Nkuna home"><span className="monogram">PN</span><span className="brand-name">Phumlani K. Nkuna</span></a>
        <nav className="main-nav" aria-label="Primary navigation">{navigation.filter(item => !["Education", "CV", "Documents"].includes(item)).map(item => <a key={item} href={`#${item.toLowerCase()}`} className={activeSection === item.toLowerCase() ? "active" : ""}>{item}</a>)}</nav>
        <Button variant="quiet" size="icon" className="mobile-menu-toggle" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        <DownloadAction document={cv} label="Download CV" header />
      </div>
      <nav className="secondary-nav" aria-label="Additional navigation"><a href="#education">Education & Qualifications</a><a href="#cv">My CV</a><a href="#documents">Professional Documents</a></nav>
      {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation">{navigation.map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}</nav>}
    </header>
    <main id="main-content">
      <div className="container">
        <section id="home" className="hero">
          <div>
            <div className="hero-tag">ICT • Technology • Innovation • AI</div>
            <h1>Phumlani<br /><span>Khensani</span> Nkuna</h1>
            <p className="hero-headline">Technology-minded. AI-focused. Always learning.</p>
            <p className="hero-description">A professional portfolio at the intersection of ICT, technology and Artificial Intelligence — bringing together professional background, practical projects and a journey of continuous learning.</p>
            <div className="hero-actions"><Button variant="portfolio" asChild><a href="#projects">View My Portfolio <ArrowUpRight /></a></Button><DownloadAction document={cv} label="Download CV" /><Button variant="quiet" asChild><a href="#contact">Contact Me <ArrowRight /></a></Button></div>
            <p className="hero-note"><Info size={13} />Professional title and CV details awaiting the supplied documents.</p>
          </div>
          <div className="hero-art"><div className="art-frame"><img src={network} width={1024} height={1024} fetchPriority="high" alt="Translucent cyan neural network, a visual expression of technology and AI" /></div><div className="art-stat first"><strong>5</strong><span>Google AI courses</span></div><div className="art-stat second"><strong>2026</strong><span>AI Essentials</span></div></div>
        </section>
        <section id="ai" className="section">
          <SectionHeading label="AI & Digital Development" title="Google AI Essentials Specialization" description="Five Google-developed courses with hands-on practice in AI skills, responsible AI use and productivity. Completion information supplied by Phumlani; certificate evidence pending upload." center />
          <div className="grid-three">{courses.map((course, index) => <article className="glass-card course-card" key={course.name}><div className="course-number">0{index + 1}</div><h3>{course.name}</h3><p>{course.description}</p><span className="course-date">Completed {completionDate}</span></article>)}<article className="glass-card course-card featured-course"><Award size={27} className="mb-5" /><h3>Featured Specialization</h3><p>Google AI Essentials<br />Google / Coursera</p><span className="course-date">Five courses · October 6, 2026</span>{featured && <ViewAction document={featured} />}</article></div>
        </section>
        <section id="projects" className="section">
          <div className="section-row"><SectionHeading label="Project Portfolio" title="Selected Projects" /><span className="small-link">Ideas awaiting project evidence</span></div>
          <div className="grid-three">{projects.map((project, index) => <article className="glass-card project-card" key={project.title}><img src={projectImages[index]} width={1024} height={656} loading="lazy" alt={`Illustrative concept for ${project.title}; not evidence of completed work`} /><div className="project-body"><span className="tag">Editable placeholder</span><h3>{project.title}</h3><p>{project.description} Not presented as completed work.</p><span className="eyebrow">{project.category}</span><div><Button variant="quiet" onClick={() => setSelectedProject(index)}>Project details <ArrowUpRight /></Button></div></div></article>)}</div>
        </section>
        <section id="skills" className="section">
          <div className="skill-layout"><div><SectionHeading label="Skills Dashboard" title="A growing, honest toolkit" description="AI learning areas from the supplied Google AI Essentials course information. CV-based capabilities will be added once the source document is available." /><div className="skills-tags">{["AI Fundamentals", "Prompting", "Responsible AI", "AI-assisted productivity"].map(skill => <span key={skill}>{skill}</span>)}</div></div><div className="skill-grid"><article className="glass-card"><h3>Technical / ICT Skills</h3><p>Awaiting skills listed in the supplied CV.</p></article><article className="glass-card"><h3>IT Skills</h3><p>Awaiting IT-related skills confirmed by the CV.</p></article><article className="glass-card"><h3>Soft Skills</h3><p>Awaiting soft skills supported by the CV.</p></article><article className="glass-card"><h3>Continuous Learning</h3><p>AI learning and development through the five-course specialization.</p></article><article className="glass-card ai-skills"><h3>AI Skills</h3><p>AI fundamentals · AI productivity · Prompting · Responsible AI · AI-assisted productivity · AI learning and development</p></article></div></div>
        </section>
        <section id="about" className="section"><div className="about-layout"><SectionHeading label="About Me" title="The person behind the portfolio" description="Phumlani Khensani Nkuna · ICT, technology, Artificial Intelligence and continuous learning." /><div><div className="pending-block"><span className="tag">CV information pending</span><h3>Professional background</h3><p>Biography, career experience, ICT and IT interests, professional goals and achievements will be drawn directly from the supplied CV.</p></div><dl className="profile-facts"><div><dt>Professional title</dt><dd>Awaiting CV</dd></div><div><dt>Career interests</dt><dd>Awaiting CV</dd></div><div><dt>AI development</dt><dd>Google AI Essentials · 2026</dd></div><div><dt>Location</dt><dd>{profile.location || "Awaiting CV"}</dd></div></dl></div></div></section>
      </div>
      <div className="background-band"><div className="container">
        <section id="experience" className="section"><SectionHeading label="Professional Journey" title="Experience" description="Roles, organisations, dates and contributions will be shown exactly as documented in the CV." /><div className="timeline"><details className="glass-card"><summary><div><h3>Professional experience</h3><span>Awaiting CV · No employment history added</span></div><ChevronDown size={18} /></summary><div className="timeline-content"><dl>{["Job title", "Organisation", "Employment period", "Responsibilities", "Achievements / contributions"].map(label => <div key={label}><dt>{label}</dt><dd>Awaiting information from the supplied CV.</dd></div>)}</dl></div></details></div></section>
        <section id="education" className="section"><SectionHeading label="Education & Qualifications" title="A foundation for the future" description="Institutions, qualifications, fields of study and dates will be taken from the CV without adding unsupported credentials." /><div className="timeline"><details className="glass-card"><summary><div><h3>Education & qualifications</h3><span>Awaiting supplied CV</span></div><GraduationCap size={20} /></summary><div className="timeline-content"><dl>{["Institution", "Qualification", "Field of study", "Year / date", "Additional relevant information"].map(label => <div key={label}><dt>{label}</dt><dd>Awaiting CV.</dd></div>)}</dl></div></details></div></section>
      </div></div>
      <div className="container">
        <section id="certifications" className="section"><SectionHeading label="Certifications" title="Learning, backed by evidence" description="Google AI Essentials and its five individual courses. Original certificate images and verification links are awaiting the uploaded documents." /><div className="cert-feature"><div className="document-placeholder"><Award size={48} /><span>Original specialization certificate<br />Awaiting document upload</span></div><div><span className="tag">Featured professional development</span><h3 className="section-title">Google AI Essentials</h3><p className="section-intro">A five-course specialization developed by Google, focused on practical AI skills, responsible use and improving productivity.</p><div className="doc-meta"><span>Google / Coursera</span><span>{completionDate}</span></div>{featured && <ViewAction document={featured} />}</div></div><div className="grid-three">{documents.filter(document => document.kind === "certificate" && document.name !== "Google AI Essentials").map(document => <article className="glass-card certificate-card" key={document.filename}><div className="document-placeholder"><FileText size={30} /><span>Original certificate pending</span></div><h3>{document.name}</h3><div className="doc-meta"><span>Google / Coursera</span><span>{completionDate}</span></div><ViewAction document={document} />{document.verificationUrl && <a className="small-link" href={document.verificationUrl} target="_blank" rel="noreferrer">Verify certificate <ArrowUpRight size={14} /></a>}</article>)}</div></section>
        <section id="cv" className="section"><div className="resume-layout"><div><SectionHeading label="My CV" title="The complete professional picture" description="The original CV is the source of truth for this portfolio. No replacement CV has been generated." /><div className="hero-actions">{cv && <ViewAction document={cv} label="View CV" />}<DownloadAction document={cv} label="Download CV" /><Button variant="quiet" disabled={!cv?.previewUrl} onClick={() => { if (cv?.previewUrl) { const printWindow = window.open(cv.previewUrl, "_blank"); printWindow?.addEventListener("load", () => printWindow.print()); } }}><Printer />Print CV</Button></div></div><div className="resume-art"><FileText size={65} strokeWidth={1} /><div><strong>CV RENEW PK NKUNA</strong><p>Original document · DOCX</p><span className="tag">Awaiting CV upload</span></div></div></div></section>
        <section id="documents" className="section"><SectionHeading label="Professional Documents" title="Everything in one place" description="The original CV and Google AI certificates. Document access will become available when the seven source files are supplied." /><div className="document-list">{documents.map(document => <div className="document-row" key={document.filename}>{document.kind === "cv" ? <FileText size={24} /> : <Award size={24} />}<div className="document-info"><h3>{document.name}</h3><p>{document.filename} · {document.url ? "Available" : "Awaiting upload"}</p></div><div className="document-actions"><ViewAction document={document} label="View Document" /><DownloadAction document={document} label="Download Document" /></div></div>)}</div></section>
        <section id="contact" className="section"><div className="contact-layout"><div><SectionHeading label="Get in touch" title="Let's connect" description="For professional conversations about ICT, technology and AI. Contact information will be taken directly from the CV." /><dl className="contact-details"><div><Briefcase /><div><dt>Full name</dt><dd>{profile.name}</dd></div></div>{[{ label: "Email", value: profile.email, icon: Mail, href: profile.email ? `mailto:${profile.email}` : undefined }, { label: "Telephone", value: profile.telephone, icon: Phone, href: profile.telephone ? `tel:${profile.telephone}` : undefined }, { label: "Location", value: profile.location, icon: MapPin }, { label: "LinkedIn", value: profile.linkedin, icon: Linkedin, href: profile.linkedin }, { label: "GitHub", value: profile.github, icon: Github, href: profile.github }].map(({ label, value, icon: Icon, href }) => <div key={label}><Icon /><div><dt>{label}</dt><dd>{href ? <a href={href}>{value}</a> : value || "Awaiting CV"}</dd></div></div>)}</dl></div><form className="contact-form" onSubmit={submitContact}><div className="form-grid"><label>Name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Email<input name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} /></label></div><label>Subject<input name="subject" placeholder="Let's talk about an opportunity" required maxLength={200} /></label><label>Message<textarea name="message" placeholder="Your message…" rows={4} required maxLength={5000} /></label><Button variant="portfolio" type="submit">Send Message <Send /></Button><p className="form-note">Message delivery is pending Phumlani's verified contact email. Your message is not stored.</p>{formStatus && <p className="form-status" role="status">{formStatus}</p>}</form></div></section>
      </div>
    </main>
    <footer className="site-footer"><div className="container footer-inner"><div><strong>Phumlani Khensani Nkuna</strong><br />ICT · Technology · AI · Innovation · Continuous Learning</div><span>© 2026 Phumlani Khensani Nkuna</span></div></footer>
    {showTop && <Button variant="portfolio" className="back-top" size="icon" aria-label="Back to top" onClick={() => { document.getElementById("home")?.scrollIntoView(); }}><ArrowUp /></Button>}
    <Dialog open={Boolean(selectedDocument)} onOpenChange={open => { if (!open) setSelectedDocument(null); }}><DialogContent className="max-w-3xl"><DialogHeader><DialogTitle>{selectedDocument?.name}</DialogTitle><DialogDescription>{selectedDocument?.filename}</DialogDescription></DialogHeader>{selectedDocument?.previewUrl ? <iframe className="dialog-document-frame" src={selectedDocument.previewUrl} title={`${selectedDocument.name} document viewer`} /> : <div className="viewer-note"><FileText size={44} /><h3>Original document not yet attached</h3><p>The supplied file is needed before this document can be viewed or downloaded.</p></div>}<div className="hero-actions"><DownloadAction document={selectedDocument || undefined} label="Download Document" />{selectedDocument?.verificationUrl && <Button variant="quiet" asChild><a href={selectedDocument.verificationUrl} target="_blank" rel="noreferrer">Verify Certificate <ArrowUpRight /></a></Button>}</div></DialogContent></Dialog>
    <Dialog open={selectedProject !== null} onOpenChange={open => { if (!open) setSelectedProject(null); }}><DialogContent><DialogHeader><DialogTitle>{currentProject?.title}</DialogTitle><DialogDescription>Editable placeholder · Not a completed project</DialogDescription></DialogHeader><p className="text-sm text-muted-foreground">{currentProject?.description}</p><dl className="grid gap-3 text-sm">{projectFields.map(field => <div key={field}><dt className="font-medium text-primary">{field}</dt><dd className="text-muted-foreground">Awaiting actual project information.</dd></div>)}</dl></DialogContent></Dialog>
  </div>;
}
