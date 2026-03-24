import { SkillGroup } from "@/types/resume";

interface Props {
  skillGroups: SkillGroup[];
}

export default function PreviewSkills({ skillGroups }: Props) {
  if (skillGroups.length === 0) return null;

  return (
    <div className="mb-5">
      <h2 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-400 mb-2 pb-1 border-b border-zinc-100">
        Technical Skills
      </h2>
      <div className="space-y-1.5">
        {skillGroups.map((group) => (
          <div key={group.id} className="flex gap-2 items-start">
            {group.category && (
              <span className="text-[8px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5 flex-shrink-0 w-16">
                {group.category}
              </span>
            )}
            <div className="flex flex-wrap gap-1">
              {group.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-[8px] font-mono px-1.5 py-0.5 border border-zinc-200 text-zinc-500 rounded-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
