import { ProjectEntry } from "@/types/resume";
import { formatMonthYear } from "@/lib/utils";

interface Props {
  projects: ProjectEntry[];
}

export default function PreviewProjects({ projects }: Props) {
  if (projects.length === 0) return null;

  return (
    <div className="mb-5">
      <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
        Projects
      </h2>
      <div className="space-y-3">
        {projects.map((proj) => (
          <div key={proj.id}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[11px] font-bold text-zinc-800">
                  {proj.name}
                  {proj.url && (
                    <span className="text-[8px] font-mono text-zinc-400 ml-1.5">
                      {proj.url}
                    </span>
                  )}
                </p>
                {proj.technologies.length > 0 && (
                  <p className="text-[8px] text-zinc-500">
                    {proj.technologies.join(" · ")}
                  </p>
                )}
              </div>
              <span className="text-[8px] text-zinc-400 font-mono whitespace-nowrap">
                {formatMonthYear(proj.startDate)} – {formatMonthYear(proj.endDate)}
              </span>
            </div>
            {proj.description && (
              <p className="text-[9px] text-zinc-600 mt-1 leading-relaxed">
                {proj.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
