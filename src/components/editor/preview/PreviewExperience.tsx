import { ExperienceEntry } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";

interface Props {
  experience: ExperienceEntry[];
}

export default function PreviewExperience({ experience }: Props) {
  if (experience.length === 0) return null;

  return (
    <div className="mb-5">
      <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
        Professional Experience
      </h2>
      <div className="space-y-4">
        {experience.map((exp) => (
          <div key={exp.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-800">
                  {exp.company}
                </p>
                <p className="text-[10px] text-zinc-500">
                  {exp.title}
                  {exp.location ? ` · ${exp.location}` : ""}
                </p>
              </div>
              <span className="text-[8px] text-zinc-400 font-mono whitespace-nowrap">
                {formatMonthYear(exp.startDate)} – {exp.current ? "Present" : formatMonthYear(exp.endDate)}
              </span>
            </div>
            {exp.description && (
              <ul className="mt-1.5 space-y-0.5">
                {exp.description
                  .split("\n")
                  .filter(Boolean)
                  .map((line, i) => (
                    <li key={i} className="text-[9px] text-zinc-600 flex gap-1.5">
                      <span className="text-zinc-300 flex-shrink-0 mt-0.5">•</span>
                      {line}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
