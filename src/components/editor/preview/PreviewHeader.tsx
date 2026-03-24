import { ResumeData } from "@/types/resume";

interface Props {
  data: ResumeData;
}

export default function PreviewHeader({ data }: Props) {
  const { fullName, headline, contact } = data;
  const contactParts = [contact.location, contact.email, contact.phone].filter(Boolean);

  return (
    <div className="pb-4 mb-5 border-b border-zinc-200">
      <h1 className="text-xl font-bold uppercase tracking-widest text-zinc-900">
        {fullName || <span className="text-zinc-300">Your Name</span>}
      </h1>
      <p className="text-[10px] font-mono uppercase tracking-[0.15em] text-zinc-500 mt-1">
        {headline || <span className="text-zinc-300">Your Headline</span>}
      </p>
      {contactParts.length > 0 && (
        <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-2">
          {contactParts.map((part, i) => (
            <span key={i} className="text-[9px] text-zinc-400">{part}</span>
          ))}
          {contact.linkedin && (
            <span className="text-[9px] text-zinc-400">{contact.linkedin}</span>
          )}
          {contact.website && (
            <span className="text-[9px] text-zinc-400">{contact.website}</span>
          )}
        </div>
      )}
    </div>
  );
}
