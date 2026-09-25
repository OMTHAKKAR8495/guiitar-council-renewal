import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
export function IconCard({icon,title,text}:{icon:ReactNode;title:string;text:string}){return <article className="icon-card"><div className="icon-box">{icon}</div><h3>{title}</h3><p>{text}</p></article>}
export function FundingCard({title,text,amount}:{title:string;text:string;amount:string}){return <article className="funding-card"><div className="funding-top"></div><div className="card-body"><h3>{title}</h3><p>{text}</p><strong>{amount}</strong><span className="learn">Learn More <ChevronRight/></span></div></article>}
export function Accordion({items}:{items:{q:string,a:string}[]}){const [open,setOpen]=useState<number|null>(null);return <div className="accordion">{items.map((item,i)=><div className="accordion-item" key={item.q}><button onClick={()=>setOpen(open===i?null:i)}><span>{item.q}</span><ChevronDown className={open===i?'rotate':''}/></button>{open===i&&<p>{item.a}</p>}</div>)}</div>}
export function Pill({children}:{children:ReactNode}){return <span className="pill">{children}</span>}
