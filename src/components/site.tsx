import { Link, useRouterState } from '@tanstack/react-router';
import { useState, type ReactNode } from 'react';
import { Menu, X, Instagram, Linkedin, Twitter, MapPin, Phone, Mail } from 'lucide-react';
import blackLogo from '@/assets/logo-black.svg.asset.json';
import whiteLogo from '@/assets/logo-white.svg.asset.json';

export const nav = [
  ['Home','/'],['About','/about'],['Funding','/funding'],['Events','/events'],['Partner with us','/partner'],['Resources','/resources'],['Contact','/contact'],
] as const;

export function ButtonLink({to, children, outline=false}:{to:string;children:ReactNode;outline?:boolean}) {
  return <Link to={to} className={outline?'btn btn-outline':'btn btn-primary'}>{children}</Link>;
}
export function SectionTitle({title, text, light=false}:{title:string;text?:string;light?:boolean}) {
  return <div className="section-title"><h2 className={light?'text-primary-foreground':''}>{title}</h2>{text&&<p className={light?'text-primary-foreground/80':''}>{text}</p>}</div>;
}
export function PageHero({title, text}:{title:string;text:string}) {return <section className="page-hero"><div className="container"><h1>{title}</h1><p>{text}</p></div></section>}

export function Header(){
 const [open,setOpen]=useState(false); const path=useRouterState({select:s=>s.location.pathname});
 return <header className="header"><div className="container nav-wrap"><Link to="/" aria-label="GUIITAR Council home"><img src={blackLogo.url} className="logo" alt="GUIITAR Council"/></Link><nav className="desktop-nav">{nav.map(([n,to])=><Link key={to} to={to} className={path===to?'active':''}>{n}</Link>)}<Link className="btn btn-primary nav-apply" to="/contact">Apply</Link></nav><button className="menu-button" aria-label="Toggle navigation" onClick={()=>setOpen(!open)}>{open?<X/>:<Menu/>}</button></div>{open&&<nav className="mobile-nav">{nav.map(([n,to])=><Link key={to} to={to} onClick={()=>setOpen(false)}>{n}</Link>)}<Link to="/contact" onClick={()=>setOpen(false)} className="btn btn-primary">Apply</Link></nav>}</header>
}
export function Footer(){return <footer className="footer"><div className="container footer-grid"><div><img src={whiteLogo.url} className="footer-logo" alt="GUIITAR Council"/><p>A non-profit organization founded by GSFC University, dedicated to fostering innovation, entrepreneurship, and technological advancement in Vadodara.</p><b>Follow us on</b><div className="social"><a href="https://instagram.com" aria-label="Instagram"><Instagram/></a><a href="https://linkedin.com" aria-label="LinkedIn"><Linkedin/></a><a href="https://x.com" aria-label="X"><Twitter/></a></div></div><div><h3>Quick Links</h3>{nav.filter(([n])=>n!=='Resources').map(([n,to])=><Link key={to} to={to}>{n==='About'?'About Us':n}</Link>)}</div><div><h3>Help center</h3><Link to="/funding">Gujarat industrial policy 2020</Link><Link to="/funding">IPR Grant</Link><Link to="/funding">SSIP 2.0 Grant</Link></div><div><h3>Contact Info</h3><p className="contact-line"><MapPin/>Event Room, Second Floor, Anviksha - GSFC University, Vadodara, Gujarat, 391750 - India</p><p className="contact-line"><Phone/>+91 XXX XXX XXXX</p><a className="contact-line" href="mailto:guiitar@gsfcuniversity.ac.in"><Mail/>guiitar@gsfcuniversity.ac.in</a></div></div><div className="footer-bottom container"><span>© 2026 GUIITAR Council. All Rights Reserved.</span><div><span>Privacy Policy</span><span>Terms of Service</span><span>Designed by: <b>Vedant Mistry</b></span></div></div></footer>}
export function SiteLayout({children}:{children:ReactNode}){return <><Header/><main>{children}</main><Footer/></>}
